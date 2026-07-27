---
layout: post
title: Chasing a 20x Spawn Tax
date: 2026-07-24
categories:
  - ai-workflow
tags:
  - claude-code
  - agentic
  - hooks
  - performance
  - windows
  - khimai
---

This is the technical companion to [The Night the Dead-Man Switch Earned Its Keep](/blog/2026/a-security-on-the-critical-path/).  That post tells the story:  a security-hardened session start broke on a slow machine, and the fix was to move security off the critical path rather than make it faster.  This one carries the measurements - why starting a process on this machine costs twenty times what it should, the two wrong turns I took chasing it, and the instrumentation and config that landed.  It assumes you are comfortable with Claude Code hooks, Windows filter drivers, and a shell.

## The number that started it

On Linux, starting a short-lived process costs nothing worth measuring.  On this Windows workstation, running Claude Code through Git Bash, a single process spawn has cost anywhere from a healthy sixty milliseconds to over two and a half seconds under load.  Every hook, every subshell, every pipe, every command substitution pays that tax.  A security hook that hashes eighty files the obvious way - one `sha256sum` per file - turns into eighty spawns, and eighty spawns at those prices is the difference between a sub-second startup and one that blows through its time limit and gets killed.  I wrote up that first failure and its shared-hash-library fix in [Wiring the Dead-Man Switch](/blog/2026/b-dead-man-switch-wiring/).  This post is about the tax itself:  where it comes from, and how badly I misread it before I got an honest measurement.

There are actually two separate problems hiding under one symptom, and conflating them cost me time:

- A **chronic tax**:  every spawn costs more than baseline, all the time.  Real, measurable, and it taxes every piece of dev work on the machine.
- An **acute stall**:  once in a while a single spawn hangs for sixty to eighty seconds.  This is the one that breaks sessions, and it is a different mechanism.  A steady per-spawn tax of tens of milliseconds cannot produce a sixty-eight-second hang.

Keeping them separate is the first discipline.  A fix for one is not a fix for the other, and a measurement of one tells you nothing about the other.

## Two wrong turns

Before the right answer, two wrong ones, because how I got them wrong is the actual lesson.

**Wrong turn one:  the sync client.**  My vault syncs through Synology Drive, and git metadata is thousands of tiny high-churn files - exactly the worst case for a sync client's file-system watcher.  It was a clean theory.  I paused Drive, measured a single spawn at fifty-four milliseconds against a baseline in the seconds, and nearly wrote it up as solved.  Then I ran the same test three more times in the same session, still with Drive paused, and got eleven hundred to twelve hundred milliseconds per spawn - the original problem, unchanged.  The fifty-four-millisecond reading was real and is still unexplained, but it was one data point, and I had mistaken it for a controlled before-and-after.  One measurement is not a result.

**Wrong turn two:  the antivirus, dismissed too early.**  Malwarebytes was the obvious suspect - security software instruments process creation by design.  I toggled its real-time protection off, measured a nine percent difference, and read that as noise.  Case closed, wrongly.  What I missed:  Malwarebytes runs three separate filter drivers on this machine, and real-time protection is only one of them.  Its behavioral anti-ransomware layer is a completely separate toggle, and it was still running through my whole "clean" test.  I never actually turned the thing off.

## The measurement that held

The honest A/B needed both toggles off - real-time protection and ransomware protection - and it needed to run more than once, on and off and on again, to prove reversibility.  Here is what twenty spawns per condition produced:

| State | System temp dir | Vault dir |
|---|---|---|
| Malwarebytes on | 252 ms/spawn | 280 ms/spawn |
| Malwarebytes off (both toggles) | 12 ms/spawn | 11 ms/spawn |
| Malwarebytes on (repeat) | 240 ms/spawn | 227 ms/spawn |

That is a twenty-times tax, reproducible on, off, and on again.  It also quietly killed my first wrong turn a second time:  with the antivirus fully off, the system drive and the vault drive measure identically, twelve versus eleven milliseconds.  The gap I had blamed on the sync client's drive was never about the drive at all - it was the antivirus scaling its work with the path, and the two drives only looked different while it was running.

I am deliberately not calling this fully settled.  The on-off-on pass proves reversibility but is a single run per state, and my own standard for a regression this noisy is three consecutive runs per condition before I record a cause.  Malwarebytes is a strong contributor to the chronic tax.  It is not yet proven to be the whole of it, and - this is the important caveat - it does not explain the acute sixty-eight-second stall at all.  That mechanism is still unknown.  The leading untested variable is the dullest one:  the machine has not been rebooted in over ten days, with a pending update, and I have not yet ruled out that a reboot clears some of this.  Writing "cause unknown" and meaning it is the second discipline.

## What actually shipped

I could not fix an environmental tax I had not fully characterized and a stall I could not reproduce.  So the changes that landed are not "make the hooks faster."  They are structural:  get security off the path where the tax and the stall can hurt, and instrument the machine so the next stall names its own cause.

### Guards off the critical path

I moved the two security guards to asynchronous execution.  They still run at session start, still fingerprint identity files and keep their bookkeeping, but they no longer sit between me and my first prompt.  This is safe for a specific reason:  a session-start hook cannot block a session anyway, so these guards never enforced anything from the startup path - the real enforcement is a separate check that runs before each prompt.  Their timeouts went up, not down, since an async hook has no reason to fail fast:  it just needs to finish its side effects.

### The one synchronous step gets a generous ceiling

The memory-injection step must finish first, because it injects the index the session depends on.  Its timeout went from thirty seconds to a hundred and twenty.  That looks backward until you hold the two numbers together:  the step is fast - under a second on a healthy machine - so a two-minute ceiling only ever engages during one of these rare stalls, and in that case a long wait is strictly safer than starting blind.  If it genuinely fails, the dead-man switch from the previous post still catches it.  A high ceiling on a fast step is not slack;  it is survival margin for a bad moment, with a real safety net underneath.

### Instrumentation that survives a healthy retest

The stall would not reproduce, and a healthy machine cannot tell you what happened during the bad moment.  So every startup hook now writes a timestamp at its first executable line and another on exit, both to a small log.  On the next stall I read that log against the harness's own cancellation timestamps.  A late or missing entry line means the shell itself hung before it ran a single instruction - the exec or image-load level, where an antivirus or a shell-snapshot stall would live.  A prompt entry line with a late exit means the script ran slow internally.  That distinction is the one thing no amount of benchmarking on a healthy machine can give me, and it is why I stopped benchmarking and started instrumenting.

### What I deliberately did not do

Two tempting changes I rejected on purpose.  I did not consolidate the three hooks into one script to cut spawn count - the spawns that dominate are internal to each hook, not the three top-level launches, so consolidation buys almost nothing.  And I did not add broad antivirus exclusions for my whole code tree - the measured benefit is small against the real security exposure of carving a hole that size, and I would rather move the antivirus off the critical path than blind it.  Naming what you chose not to do, and why, is the third discipline.

## The aside that had been silent for ten days

While chasing latency I ran `git status` in the vault and it failed outright.  Unrelated to spawn cost:  two agent worktrees had been committed as git links, and their nested pointers referenced the vault's pre-rename path.  Git aborted trying to resolve them.  The quiet damage was that this had stalled my automatic vault backup for ten days - the last good commit was ten days stale and I had not noticed, because the backup plugin's error notice is one dismissible toast.  The fix was an index-only removal of the broken links plus an ignore rule;  the usual cleanup commands all hang here, because they too try to resolve the broken pointer before doing anything.

The carry-forward lesson is small and specific:  after you rename a repository's root, run `git status` once and confirm it exits clean.  A rename can orphan worktree registrations, and the failure is silent because the tool that would tell you is the same tool that just broke.

## The principle

Every wrong turn in this hunt was the same mistake wearing a different hat:  treating one measurement as a result.  Fifty-four milliseconds once was not a fix.  Nine percent once was not an exoneration.  The regression is noisy enough that if you go looking for a verdict with a single stopwatch run, the variance will hand you whichever verdict you wanted.  The counters are boring - three runs per condition, both toggles not one, reversibility before you believe it, and "cause unknown" written in ink when it is true.  The interesting part is that the same discipline points the same direction as the architecture fix from the first post.  When you cannot yet trust the ground, stop building load-bearing conclusions on it.  Move the things that matter off the fault line until you can.

## The gotchas, distilled

Everything above is the story.  This is the reference layer:  the whole hunt compressed to standalone rules, each one true on its own.  If you build agent harnesses on Windows - or you are an AI being pointed at this post to avoid these traps - this is the part to keep.

- **On Windows under Git Bash, a hook's cost is its process-spawn count, not the work it does.**  A loop that calls `sha256sum` once per file over eighty files is eighty spawns.  Batch it into a single invocation.  Count processes, not bytes.
- **A single spawn on an antivirus-instrumented Windows box can cost twelve milliseconds clean and two hundred fifty or more with scanning on, worse under load.**  That tax silently prices every subshell, pipe, and command substitution, so it multiplies across a hook, it does not just add to it.
- **Malwarebytes runs more than one filter driver, and behavioral ransomware protection is a separate toggle from real-time protection.**  An A/B that flips only real-time protection has not turned the antivirus off.  Disable every layer before you call it exonerated, and run the test on, off, and on again to prove the delta is real.
- **Claude Code SessionStart hooks cannot block a session** - the session proceeds regardless of the hook's exit code.  Enforcement has to live in a `UserPromptSubmit` hook, which can block.  So anything on SessionStart is doing setup, not gating, and setup belongs in asynchronous execution off the critical path.
- **Do not give a fast-but-occasionally-stalling critical step a tight timeout.**  A short leash turns a survivable delay into a guaranteed failure.  Give the step a generous ceiling and pair it with an independent verifier that catches a genuine miss - a high ceiling on a fast step is survival margin, not slack.
- **A healthy retest tells you nothing about the bad moment.**  Instrument an enter timestamp on the first executable line of every hook and an exit timestamp at the end.  A late or missing enter line means the shell never started - exec or image-load level, where antivirus and shell-snapshot stalls live.  A prompt enter with a late exit means the script itself ran slow.  No benchmark on a healthy machine can draw that line for you.
- **For a high-variance regression, one measurement is never a result.**  Three runs per condition, prove reversibility with on-off-on, and write "cause unknown" in ink when it is true.  A single stopwatch reading will hand you whatever verdict you went looking for.
- **After you rename a repository's root, run `git status` once and confirm it exits clean.**  A rename orphans committed worktree gitlinks, and both `git rm --cached` and `git worktree prune` hang trying to resolve the broken pointer.  Fix it index-only with `git update-index --force-remove`, then add the worktrees directory to `.gitignore`.  The failure is silent because the tool that would report it is the tool that broke.
- **Reach for architecture before exclusions.**  Moving a security check off the critical path beats carving a broad antivirus hole around your code tree.  Do not blind the scanner to buy speed.

---

*This post was created with AI assistance.  I used AI tools for drafting from the session forensics and A/B measurements I directed, for research, and for editing, and I reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
