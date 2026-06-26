---
layout: post
title: A Sign Says Please.  A Fence Says No.
date: 2026-06-18
categories:
  - ai-workflow
tags:
  - claude-code
  - agents
  - guardrails
  - ttrpg
---

Every woodworker knows to keep their hands away from the blade.

It is the first rule, the one on the poster, the one nobody needs reminding of.  Experienced woodworkers still lose fingers every year - not because they forgot the rule, but because knowing the rule is not the part that fails.  The part that fails is a half-second of moving fast on a cut you have made a thousand times, and a poster does nothing in that half-second.  What finally worked was not a better poster.  It was a saw that senses skin and slams a brake into the blade before the next thought finishes.

I have a project that taught me the software version of that, and it taught me by drawing blood first.

It started as a character dashboard for my tabletop game and grew into Labyrinthian.net, a deployed app with a production site I edit live during a session.  Like all my projects, it carries a set of instructions at the top, written for me and for the AI agent I build it with.  Most of those rules guard ordinary things.  A handful guard the blade:  break them and you delete live state, revert an edit I made on the production site, burn paid render credits, or destroy a finished image I paid to generate.  The catastrophic ones.

We broke them.  Repeatedly.  The agent broke them, I broke them, and the instruction sat right there in bold the whole time.  The clearest one is a single word:  the safe deploy command copies files up;  its sibling, one word different, synchronizes them, which deletes anything on the live side that is not in my local copy - and the live side is full of things that are not in my local copy.  I had written, in bold, never use the second command.  The second command got used.

Here is what I finally understood.  The rule was needed at exactly the moment nobody reads the rule.  Instructions assume a careful reader at the calmest moment, and catastrophic mistakes do not happen at the calm moment.  They happen at the fast one, the confident one, where you are three steps ahead and your hands are already moving.  Writing the rule more emphatically does not help, because emphasis is still aimed at a reader who, in that moment, is not reading.  This is doubly true of an AI agent, which does not get more careful because you used bold.  The violations were never a discipline problem.  They were a design problem.

So the fix was to move the rule out of the prose and into a gate.  Now, before a command runs, a hook inspects it and refuses the dangerous form outright.  The destructive sync does not get a warning;  it gets stopped.  And every guarded rule is now tagged in plain sight as one of two kinds:  one a machine enforces, the other still on trust.  That second tag is an honest confession written into my own docs - here is a rule I have conceded I cannot be relied on to keep.  The fence is reserved for the blade, the handful where the next tired afternoon would cost something I cannot get back.

The lesson I would hand to anyone working alongside an AI agent, or anyone with a runbook:  a rule you keep breaking is not telling you to try harder.  It is telling you it is in the wrong layer.  If breaking it is reversible, a written rule is fine.  If breaking it is not - deleted data, spent money, a colleague's work quietly reverted - then a written rule is the wrong tool no matter how well you word it, and the question is not how to phrase it better.  It is how to make the wrong move impossible to complete.  The brake never made anyone a better woodworker.  It just made the worst mistake impossible to finish, which is what discipline looks like once you stop trusting it to hold at the worst possible moment.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

The enforcement is a PreToolUse hook in the project's agent config (`.claude/hooks/labyrinthian-guardrails.sh`).  It inspects a command before it runs and blocks the catastrophic forms:  shipping data with `rclone sync` instead of `rclone copy` (sync deletes live-only state), any R2 copy missing its `--backup-dir`, editing a live file without down-syncing the canonical copy first, `git add -A` in a tree shared with parallel sessions, and a retry-loop on sign-in that would blow the runtime CPU budget.  A block means the command was wrong;  the move is to rewrite it, not retry it.  The instructions tag every guarded rule `[HOOK]` (mechanically enforced) or `[honor]` (still on trust).

The reason any of this is dangerous is the architecture underneath.  Production serves the vault from Cloudflare R2, and R2 is canonical, not Git.  Git is version control;  R2 is what the app actually reads.  That split means live state accumulates where version control never sees it:  layouts persisted at render time, campaign live-state (the Fear counter, spotlight, countdowns) split out into prod-only gitignored files so a content deploy cannot revert the table mid-session, and rendered images.  A naive mirror treats all of that as drift to be erased.  The failure that finally moved these rules from prose into a hook was a stale local file reverting a production edit during the Plover campaign on 2026-06-06.  Some lessons you only learn from the version that costs you something.

</details>

---

## The Tabletop Dashboard Series

1.  [Two Apps and a Sticky Note](/blog/2026/two-apps-sticky-note/)
2.  [The Painting of Change](/blog/2026/a-painting-of-change/)
3.  [It Didn't Need a New Home, It Needed a Better Window](/blog/2026/ttrpg-dashboard-vault-backed/)
4.  [Players, GMs, and the Screen Between Them](/blog/2026/b-players-gms-screen/)
5.  [Show the Trailer, Keep the Ending](/blog/2026/c-teasers-without-leaks/)
6.  [Don't Hang the Test Shots](/blog/2026/d-media-studio/)
7.  **A Sign Says Please.  A Fence Says No.** *(this post)*
8.  [When the Memory Lied](/blog/2026/when-the-memory-lied/)

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
