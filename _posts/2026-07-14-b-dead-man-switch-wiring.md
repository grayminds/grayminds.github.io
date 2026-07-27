---
layout: post
title: Wiring the Dead-Man Switch
date: 2026-07-14
categories:
  - ai-workflow
tags:
  - claude-code
  - agentic
  - hooks
  - memory
  - khimai
---

This is the build companion to [A Dead-Man Switch for Agent Memory](/blog/2026/a-dead-man-switch-for-agent-memory/).  That post tells the story - context injection died silently, a dead-man switch now notifies me before work starts.  This one carries the wiring:  the prompt to replicate it, the moving parts, the code, and the forensics that shaped each design constraint.  It assumes you know your way around Claude Code hooks.

## The prompt

Paste this into Claude Code on any setup that injects context at session start.  It carries the design constraints so your agent does not have to rediscover them the way mine did:

```text
My SessionStart hook injects context (a memory index / project brief) into
every session.  Build me a dead-man switch so a silent injection failure
notifies me before any work starts.

Requirements:
1. The injection hook writes a sentinel file ONLY on a terminal outcome
   (injected / withheld / skipped), never on the happy path assumption.
   Sentinel path must be per-session:  ~/.claude/<hook>.state.<session_id>,
   with the session id parsed from the hook's stdin JSON.  One shared file
   WILL be overwritten by concurrent sessions and false-block healthy ones.
2. Add a UserPromptSubmit verifier hook.  It must be pure bash builtins with
   zero process spawns, so it cannot share the failure mode it screens for
   (on Windows/Git Bash, spawn cost is the failure mode).  Missing sentinel:
   exit 2 on the FIRST prompt with a plain stderr message naming the failed
   hook and how to diagnose it;  on later prompts, exit 0 and print a
   standing notice to stdout so the model states the gap.  Track
   already-warned in a per-session marker file, never a shared one.
3. The injection hook prunes sentinel and marker files older than 7 days;
   the verifier never deletes anything.
4. On hosts where injection legitimately cannot happen (resource missing),
   write a skipped sentinel so the verifier stays silent there.
5. Test before wiring into settings.json:  pipe fake stdin payloads with two
   different session ids and prove (a) matching sentinel passes silently,
   (b) missing sentinel blocks once then passes with notice, and (c) warning
   one session does not affect the other.
6. Report the spawn count of every hook you touch.  Anything that runs per
   prompt or per tool call should be zero.
```

If your injection hook also verifies content integrity (hashing identity files against a blessed manifest, as mine does), keep that check inside the injection hook and make its refusal a `withheld` sentinel - the verifier should not care why memory is absent, only whether the absence was decided or accidental.

## The moving parts

| Hook | Event | Timeout | Job |
|---|---|---|---|
| `trust-root-guard.sh` | SessionStart | 30s | Hash the identity files against the blessed manifest;  warn loudly on mismatch;  time its own hash pass as a canary |
| `memory-context.sh` | SessionStart | 30s | Repeat the integrity check (SessionStart hooks run in parallel, so it cannot trust the guard's flag), inject the memory index, write the sentinel |
| `memory-inject-verify.sh` | UserPromptSubmit | 5s | Check the sentinel;  block the first prompt if it is missing, inject a standing notice after that |

## The sentinel protocol

The injection hook writes one file per session - `~/.claude/memory-context.state.<session_id>` - containing the session id and one of three terminal outcomes:

- `injected` - the memory index went into context.
- `withheld` - the integrity gate refused it (manifest mismatch), on purpose and with a visible message.
- `skipped` - the host legitimately cannot inject (no vault mounted, no `jq`);  the verifier stays quiet rather than crying wolf on a laptop that was never supposed to have memory.

The session id comes from the JSON the harness pipes to every hook on stdin.  Anything short of a terminal outcome - timeout, crash, never ran - leaves no file, and that absence is the alarm.

The write happens only at the end of a completed path:

```bash
OUT=$(jq -n --rawfile mem "$MEM" '{ ... }')
printf '%s\n' "$SID injected" > "$STATE"
printf '%s\n' "$OUT"
```

The per-session suffix is load-bearing.  My first version used one shared file, and parallel sessions overwrote each other's evidence within hours (the forensics are below).  The "already warned this session" marker follows the same rule for the same reason.  The injection hook prunes both kinds after seven days;  the verifier never deletes anything, because a janitor with a mop can also erase evidence.

## The zero-spawn verifier

The verifier runs on every prompt, on a machine where a single process spawn can cost 1.5 seconds under load.  So it spawns nothing:

```bash
STATE="$HOME/.claude/memory-context.state.$SID"
WARNED="$HOME/.claude/memory-context.warned.$SID"

CUR=""
[ -f "$STATE" ] && CUR=$(<"$STATE") || true
case "$CUR" in
  "$SID injected"|"$SID withheld"|"$SID skipped") exit 0 ;;
esac

if [ ! -f "$WARNED" ]; then
  printf '%s' "$SID" > "$WARNED" 2>/dev/null || true
  echo "VAULT MEMORY DID NOT LOAD THIS SESSION." >&2
  exit 2
fi
```

The techniques, all bash builtins:

- Read stdin without `cat`:  `IFS= read -r -d '' -t 5 INPUT`
- Extract a JSON field without `jq`:  `[[ $INPUT =~ \"session_id\"[[:space:]]*:[[:space:]]*\"([^\"]+)\" ]]` - fine for a harness payload whose shape you control, not a general JSON parser
- Normalize Windows paths without `tr`:  `${path//\\//}` for slashes, `${path,,}` for case
- Match without `grep`:  `case` globs
- Read a file without `cat`:  `$(<file)`

## The exit-code contract

Two harness behaviors make the pattern work, both documented in the [hooks reference](https://code.claude.com/docs/en/hooks.md):

- A UserPromptSubmit hook that exits 2 blocks the prompt and shows its stderr to the human.  That is the notification channel:  visible, harness-enforced, and delivered before any work starts.
- A UserPromptSubmit hook that exits 0 has its stdout added to context.  That is the standing-notice channel for every prompt after the first, so the model states the memory gap instead of quietly improvising around it.

## Why the hooks died:  spawn economics

The original failure was not logic;  it was process creation.  Both SessionStart hooks hashed the fingerprinted file set the obvious way:  a loop calling `sha256sum` once per file, eighty files.  On Linux that costs nothing worth naming.  On Windows under Git Bash, every spawn runs through MSYS2's fork emulation plus Microsoft Defender's synchronous scan, which prices a spawn at roughly 180 milliseconds on a quiet machine and up to 1.5 seconds under load.  [Rufflewind wrote up the MSYS2 side in 2014](https://rufflewind.com/2014-08-23/windows-bash-slow);  [Bruce Dawson has the authoritative numbers](https://randomascii.wordpress.com/2018/10/15/making-windows-slower-part-2-process-creation/) on Windows process creation and how security instrumentation multiplies it.

Eighty spawns at those prices is 15 seconds and up.  The integrity gate had a 15-second timeout.  The memory hook had 10.  Both crossed their limits, the harness killed them, and the session started clean and quiet - no memory, no warning, nothing.  The only trace was a `hook_cancelled` entry with `timedOut: true` in the session's JSONL transcript, which no one reads until something hurts.

The bitter detail:  the timeout was born inside a fix.  A race repair the day before had duplicated the hash computation into the memory hook, doubling the spawn cost and pushing both hooks over the line.  The session that shipped it verified the logic and never measured the runtime.

The repair moved the hash-tree definition into a shared library sourced by every hook that needs it.  It enumerates files with bash globs (builtin, zero spawns) and hashes the entire set through `xargs` into a single `sha256sum` invocation.  Three spawns total - `sort`, `xargs`, `sha256sum` - regardless of whether the set holds 80 files or 800, and `xargs` batching means no argument-length cliff ever.  Measured result:  16.6 seconds down to about 2.5 under heavy load, sub-second on a quiet machine.  The guard also times its own hash pass now and complains in context past a 5-second soft limit - degradation becomes visible before it becomes fatal.  The design lesson generalizes:  on Windows, shell-hook cost is spawn count, not work done.  Count your processes, not your bytes.

## The switch cries wolf:  concurrency forensics

Within hours of being built, the switch fired in three sessions at once.  One of those blocks was real.  The others were the switch's own bug.

The sentinel lived at a fixed path:  one file, shared by every session on the machine.  I run Claude Code sessions in parallel, and each session start overwrote the previous session's evidence.  Submit a prompt in an older session and the verifier reads a sentinel stamped with a newer session's id, concludes memory never loaded, and blocks a perfectly healthy session.  The warned-once marker had the same flaw, so two degraded sessions could ping-pong it and re-block each other on every prompt, indefinitely.

The forensics were quick once suspected:  the state file held session C's id while session A got blocked, and the warned marker held session B's.  Three sessions contending for two global files.  The fix sharpens the principle:  evidence must be keyed to the thing it vouches for.  A verifier that reads global state to answer a per-session question is not fate-independent after all - it just shares fate with a different failure.

The same transcript dig surfaced a quieter problem that mattered more.  The `hook_cancelled` entries were not confined to session start.  My PreToolUse write guards - the hooks that force a real permission prompt on any write to identity files, plans, or settings - were also crossing their 10-second timeouts under load, at 13 and 14 seconds each.  A cancelled PreToolUse guard fails open:  the write proceeds unreviewed.  The security gate was silently absent exactly when the machine was busiest - when a runaway session would be doing the most writing.  The zero-spawn toolkit above rescued the whole guard fleet:  builtin regex over stdin, parameter-expansion path normalization, case-glob matching, and the expensive tools (`sha256sum`, `cygpath`, `wc`) only after a cheap builtin check says the write is actually in scope.

## What everyone else has written

Before writing this up, I ran a research pass across Anthropic's documentation and the community, because a pattern this obvious in hindsight should exist somewhere.  The ingredients do.  The composition does not.

Anthropic documents the mechanics thoroughly - [timeout defaults and per-hook configuration, exit-code semantics, and the UserPromptSubmit block-and-show-stderr behavior](https://code.claude.com/docs/en/hooks.md) - and the changelog shows steady investment in hook-failure visibility (v2.1.199 surfaced SessionStart stderr in the transcript; v2.1.210 fixed timeouts being misreported to the model).  What the official docs do not cover:  any verification pattern for confirming a context injection actually landed, and any Windows-specific guidance on spawn cost.  Meanwhile the issue tracker holds the silent-failure evidence:  [SessionStart hooks silently discarding output on new conversations](https://github.com/anthropics/claude-code/issues/10373), and Windows hook hangs with no consolidated troubleshooting story.

The community is circling the problem.  [Alexandre El Khoury names it precisely](https://alexandrekhoury.com/writing/superbrain-session-memory-claude-code) - "storage is solved, injection isn't" - and designs his memory hooks for visible confirmation, so a human can notice the block is missing.  That is passive visibility; it still depends on the human looking.  [Steve Kinney's sentinels piece](https://stevekinney.com/writing/sentinels-for-agent-gates) is the closest structural sibling - touch-files as state outside the conversation, hooks as bouncers - but every use gates agent actions on approval; none verifies that context arrived.  [redpa argues hooks should fail closed](https://dev.to/redpa/your-claude-code-hooks-probably-fail-open-heres-why-thats-dangerous-2nfi), hardening a single hook internally.  The [claude-mem issue tracker](https://github.com/thedotmack/claude-mem/issues/1794) is a running catalog of memory-injection hooks timing out silently.  And [Daniel Miessler's PAI](https://danielmiessler.com/blog/personal-ai-infrastructure), since renamed LifeOS - the system my own KHIMAI work anchors against - injects context through hooks with operator-side observability, yet its community threads show the same silent-breakage class with no mechanical gate.

Dead-man switches themselves are old ops furniture - the cron-monitoring world has pinged "only on success" for decades.  Nobody, as far as I can find, has pointed one at agent context injection:  sentinel written on success, independently verified before the first prompt, failing closed with a visible block.  That intersection was empty.  Consider it occupied.

## The principle

Separate the claim from the verification:  the component that does the work writes evidence only on success, and a fate-independent component checks the evidence before anything downstream proceeds.  Key the evidence to the unit it vouches for - per session, not per machine.  Keep the verifier immune to the failure mode it screens for, which on Windows means zero spawns.  If that sounds like ordinary distributed-systems hygiene, it is.  Agent harnesses are distributed systems that happen to talk like people - and the talking is precisely why we forget to instrument them like systems.

---

*This post was created with AI assistance.  I used AI tools for drafting from the session forensics I directed, for research, for documenting the hook code, and for editing, and I reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
