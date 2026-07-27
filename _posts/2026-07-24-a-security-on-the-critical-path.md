---
layout: post
title: The Night the Dead-Man Switch Earned Its Keep
date: 2026-07-24
categories:
  - ai-workflow
tags:
  - claude-code
  - agentic
  - hooks
  - memory
  - performance
  - khimai
---

Airport security is not optional, and nobody sane argues it should be.  The mistake some small airports make is where they put it:  a single checkpoint on the only path to every gate, so a jam at the scanner does not just slow security, it strands the whole terminal.  The screening was never the problem.  The floor plan was.  Last night I found the same floor plan inside my own tools, and the fix was not a faster scanner.

A week ago I wrote about building a [dead-man switch for agent memory](/blog/2026/a-dead-man-switch-for-agent-memory/):  a small independent check that blocks my first prompt if the session started without loading its memory, so a silent failure becomes a visible stop sign instead of hours of confident amnesia.  Last night it fired for real, on a session that genuinely broke.  This is the story of why a session I had hardened for security was the one that stalled, and what I changed so the next stall cannot cost me anything.

## The Conceptual Problem

Every session my agent opens runs through a short startup routine before I type a word.  Two of those steps are security.  One fingerprints my identity files so nothing can quietly rewrite what the agent treats as ground truth.  The other injects the memory index that tells the agent who I am and what it got wrong last month.  Building those checks was the right call.  I have written twice now about failures they exist to catch.

Here is the tension nobody warns you about.  The moment you put a security check on the path that every session must walk before it can start, that check is no longer free.  It spends time on the critical path, every session, forever.  And if the machine underneath ever gets slow, the security you added is standing in the exact spot where slowness turns into a broken session.

That is what happened.  On this Windows workstation, starting a small helper process is secretly expensive - I will get to how expensive in the companion post - and once in a while it stalls for over a minute.  Last night one of those stalls landed on a session start.  All three startup hooks ran past their time limits - sixty-eight to seventy-seven seconds each.  The harness killed them.  The session tried to open with no memory and no security check.  The good news is boring by design:  the dead-man switch did exactly its job, caught the missing memory, and blocked my first prompt with a plain message before any work started.  The bad news is what it revealed.  My security hardening had quietly become the most fragile part of my startup.

## The Solution

The fix is not to weaken the security.  It is to take it off the critical path, the same way a good airport moves screening so a jam at the scanner cannot strand the terminal.

### Enforcement does not belong where it cannot enforce

The uncomfortable thing I learned reading the harness behavior:  a session-start hook cannot actually block a session.  It runs, and the session proceeds no matter what the hook returns.  So my two security guards, sitting on the startup path and costing me time every session, were enforcing nothing there.  The real enforcement already lived somewhere else - a separate check that runs before each prompt, which genuinely can stop the work.  The guards on the startup path were paying a toll for a job they were not doing.

So I moved them off the path.  They now run in the background at startup, still doing their fingerprinting and their bookkeeping, but no longer standing between me and my first prompt.  A stall in a background guard is invisible.  A stall in a guard on the critical path breaks the session.

### The one step that must run first gets room, not a shorter leash

One startup step genuinely has to finish before anything else:  the one that injects my memory.  My earlier instinct would have been to give it a tight time limit so a stall fails fast.  That instinct is wrong here.  The step is fast - under a second on a healthy machine - so a generous ceiling only ever matters during one of these rare environmental stalls, and in that case waiting is strictly better than starting blind.  And if it truly fails, the dead-man switch still catches it.  So I gave it room to survive a stall rather than a short leash that turns a survivable delay into a guaranteed failure.

### Make the next stall name its own cause

The stall did not reproduce when I went looking for it an hour later.  A healthy machine tells you nothing about the bad moment.  So instead of chasing it with more stopwatch runs, I added a tiny timestamp at the entrance and exit of every startup step.  The next time one hangs, the log will say whether the script itself ran slow or whether the shell never even started - two completely different culprits that no measurement on a healthy machine can tell apart.  I stopped trying to catch the ghost in the act and set a trap that describes it instead.

## Where to Start

Open your own session-start automation - hooks, startup scripts, whatever runs before your tools are usable - and ask one question of each item:  if this hangs for a full minute, does my session break?  Then ask the sharper follow-up:  does this thing actually enforce anything from where it sits, or is it just spending my startup budget out of habit?  On Claude Code specifically, session-start hooks cannot block a session, so any guard you put there for enforcement is enforcing nothing while still costing you time on the critical path.  Move real enforcement to the checkpoint that runs before each action, and let the startup steps run in the background where a stall is invisible.  That single audit is a fifteen-minute exercise, and it is the whole lesson of last night.

## The outcome

Nothing about my security got weaker.  The fingerprinting still runs, the memory check still runs, the dead-man switch still stands guard - and last night it proved it works under the worst conditions I have thrown at it.  What changed is that none of that protection sits on the one path where a slow machine can turn it into a broken session.  The screening is still there.  I just moved it off the jet bridge.

There is a second half to this that I could not fit in a story about floor plans:  why starting a process on this machine costs twenty times what it should, how I chased the wrong culprit twice before finding a real one, and why a single fast stopwatch reading is the most dangerous number in debugging.  That is the companion post, [Chasing a 20x Spawn Tax](/blog/2026/b-chasing-a-spawn-tax/), for people who want the measurements and the wiring - and it closes with the whole hunt distilled into a short list of rules you can hand to your own agent.

---

*This post was created with AI assistance.  I used AI tools for drafting from the session forensics I directed and for editing, and I reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
