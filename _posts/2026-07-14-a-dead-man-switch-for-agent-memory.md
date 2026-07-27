---
layout: post
title: A Dead-Man Switch for Agent Memory
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

In [How I Use Claude Code](/blog/2026/how-i-use-claude-code/), I described the habit that anchors everything else:  every session starts by loading my memory index, so the agent opens already knowing who I am, what I am working on, and what it got wrong last month.  This is the sequel nobody plans to write.  For more than a day, that loading step was dead, every session started with amnesia, and nothing told me.

It is also the second time this memory system has failed in silence - the first, a size limit I did not know existed, is the story of [When the (AI) Memory Lied](/blog/2026/when-the-memory-lied/).

This post is the plain-language version of the failure and the fix.  If you want the wiring, the code, and a paste-ready prompt to build your own, the companion post [Wiring the Dead-Man Switch](/blog/2026/b-dead-man-switch-wiring/) has all of it.

## The problem

My memory lives in plain markdown files.  A small script - a hook that the agent harness runs automatically at session start - reads the index and injects it into the conversation before I type anything.  A second hook fingerprints those files first, so nothing can quietly rewrite what every future session treats as ground truth.

A routine fix made those hooks just slow enough to cross their time limits.  When a hook runs too long, the harness kills it and moves on.  No error on screen.  No warning in the session.  The agent simply started without memory, worked confidently anyway, and I found out days of sessions later - by getting annoyed at a symptom and pulling the thread.

The uncomfortable part is why nobody noticed.  The agent cannot miss what it never saw:  a fresh session has no way to know an injection was supposed to arrive.  My written instruction - "if the memory block is missing, say so" - is a promise from the model, and promises from the model are exactly what the hook existed to replace.  And every safeguard lived inside the hook itself, so when the hook died, its own alarm died with it.

## The approach

The fix is not a better hook.  It is an old idea from railways and heavy machinery:  a dead-man switch.  A control that only stays quiet while the operator actively holds it - the moment the grip releases, the machine stops on its own.  Absence of the signal is the alarm.

Applied here:  the memory hook must leave proof that it finished, every time it finishes.  A separate, tiny, independent checker looks for that proof before any work starts.  No proof means no quiet session - the checker stops the first thing I try to do and tells me, in plain text, that memory did not load.

The key property is independence.  The thing that does the work and the thing that verifies the work cannot share a fate.  A worker that times out cannot report its own death, so the reporter has to be someone else.

## The solution

Three pieces, in plain words.

First, I made the slow part fast, so the hooks stopped brushing against their time limits in the first place.

Second, the integrity hook now times itself and complains out loud when it is getting slow - degradation becomes visible while everything still works, instead of after it stops working.

Third, the switch itself.  When the memory hook finishes, it writes a small receipt file recording the outcome.  Before each prompt I submit, a verifier checks for that receipt.  Missing receipt:  my first prompt is blocked with a visible message - notification before work starts, enforced by the harness, not promised by the model.  After that one stop sign it steps aside, but it keeps a standing note in the conversation so the agent says "I have no memory this session" instead of quietly improvising.

One sequel worth telling on itself:  the first version kept a single shared receipt, and I run several sessions in parallel.  Each new session overwrote the previous session's proof, so the switch cried wolf at perfectly healthy sessions within hours of being built.  Now every session gets its own receipt, and the false alarms stopped.  The lesson folded straight back into the design:  evidence has to be keyed to the thing it vouches for.

## The outcome

The switch fired the very day it was built - correctly.  A session started on an overloaded machine, the memory hook genuinely failed, and instead of hours of confident amnesiac work, I got a stop sign before my first prompt landed.  That is the entire promise:  I no longer have to notice the absence myself, because the absence became a visible event.

Every memory failure I have had in two months of running this system reduces to one sentence:  the notification path was optional.  A model asked to notice an absence, a human expected to spot a missing block, a hook trusted to report its own death.  Each worked most of the time, and "most of the time" is exactly what silent failure feeds on.  The dead-man switch closes the sentence:  the work writes evidence only on success, an independent check reads the evidence before anything proceeds, and silence stops being ambiguous.

For the build - the hook wiring, the code, the forensics, and the prompt you can paste into your own setup - continue to [Wiring the Dead-Man Switch](/blog/2026/b-dead-man-switch-wiring/).

---

*This post was created with AI assistance.  I used AI tools for drafting from the session forensics I directed and for editing, and I reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
