---
layout: post
title: Building the Fence
date: 2026-06-18
categories:
  - ai-workflow
tags:
  - claude-code
  - agents
  - guardrails
  - ttrpg
---


This is the build companion to [A Sign Says Please.  A Fence Says No.](/blog/2026/a-fence-not-a-sign/)  That post tells the story:  bold instructions kept failing at the fast moment, so the rules guarding irreversible damage moved out of prose and into a gate.  This one carries the wiring:  the prompt to replicate it, the blocked command forms, the tagging taxonomy, and the architecture that makes the destructive sync catastrophic in the first place.  It assumes you know your way around Claude Code hooks.

## The prompt

Paste this into Claude Code in any project that carries written rules for an agent.  It walks the agent through the same sort I did by hand:

```text
Read this project's CLAUDE.md and every instruction file it references
(agent docs, runbooks, deploy notes).  Inventory every rule you find,
then classify each one:  reversible if broken, or irreversible if broken
(deleted live state, spent money, a human's work quietly reverted,
anything with no undo).

For the irreversible set:
1. Identify the exact command forms that violate each rule - the wrong
   sibling command, the dangerous flag, the missing safety argument.
2. Generate a PreToolUse hook that inspects each command before it runs
   and blocks those forms outright, with a plain stderr message naming
   the violated rule and the safe alternative.  A block means the command
   was wrong;  the message should tell the agent to rewrite it, not
   retry it.
3. Do not gate the reversible rules.  A fence around everything is a
   fence around nothing;  reserve enforcement for the rules whose
   violation cannot be undone.

Then go back to the instruction files and tag every documented rule in
place:  [HOOK] if the new hook enforces it mechanically, [honor] if it
still rides on trust.  The tags are the honest inventory - every [honor]
tag on an irreversible rule is an open risk, listed in plain sight.

Test the hook before wiring it into settings.json:  feed it each blocked
form and prove it refuses, then feed it the safe siblings and prove it
passes them untouched.
```

## The five blocked forms

The enforcement is a PreToolUse hook in the project's agent config (`.claude/hooks/labyrinthian-guardrails.sh`).  It inspects a command before it runs and blocks the catastrophic forms:

1. Shipping data with `rclone sync` instead of `rclone copy`.  Sync deletes anything on the live side that is not in the local copy, and the live side accumulates state that exists nowhere else.
2. Any R2 copy missing its `--backup-dir`.  Even the safe copy direction gets a mandatory undo path.
3. Editing a live file without down-syncing the canonical copy first.  A stale local edit silently reverts whatever production accumulated since the last pull.
4. `git add -A` in a tree shared with parallel sessions.  A blanket stage sweeps in another session's half-finished work.
5. A retry-loop on sign-in that would blow the runtime CPU budget.  Not data loss, but spent money on a metered runtime.

A block means the command was wrong;  the move is to rewrite it, not retry it.  The hook's refusal message says so, because an agent that treats a block as a transient error will happily try the same command again.

## The taxonomy

Every guarded rule in the project instructions carries one of two tags:

- `[HOOK]` - mechanically enforced.  The hook inspects the command form and refuses it;  the prose is now documentation of the fence, not the fence itself.
- `[honor]` - still on trust.  The rule exists only as words, and compliance depends on someone reading them at the right moment.

The tags earn their keep two ways.  They tell the reader, human or agent, exactly which rules have teeth.  And they keep the inventory honest:  an `[honor]` tag sitting on an irreversible rule is a visible open item, not a hidden assumption.

## Why the sync is catastrophic

The reason any of this is dangerous is the architecture underneath.  Production serves the vault from Cloudflare R2, and R2 is canonical, not Git.  Git is version control;  R2 is what the app actually reads.

That split means live state accumulates where version control never sees it:

- Layouts persisted at render time.
- Campaign live-state - the Fear counter, spotlight, and countdowns - split out into prod-only gitignored files, precisely so a content deploy cannot revert the table mid-session.
- Rendered images, paid for at generation time and reproducible only by paying again.

A naive mirror treats all of that as drift to be erased.  `rclone sync` is that naive mirror:  one word different from `rclone copy`, and it deletes everything on the live side that the local tree does not contain.  The failure that finally moved these rules from prose into the hook was exactly this class:  a stale local file reverting a production edit during the Plover campaign on 2026-06-06.

If your architecture keeps canonical state outside version control - a live database, an object store, user-generated content - you have the same blade, whatever your deploy command is called.  The question to ask of every rule in your docs is the one that opens the prompt above:  if this gets broken, can I undo it?  For the story of what it cost to learn that, go back to [A Sign Says Please.  A Fence Says No.](/blog/2026/a-fence-not-a-sign/)

---

*This post was created with AI assistance.  I used AI tools to restructure an earlier post of mine into this two-part form, and for editing.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
