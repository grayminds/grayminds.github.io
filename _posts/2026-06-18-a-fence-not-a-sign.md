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

I have a project that taught me the software version of that, and it taught me by drawing blood first.  This post is the story.  If you want the wiring - the blocked command forms, the tagging taxonomy, and a paste-ready prompt to build your own fence - the companion post [Building the Fence](/blog/2026/b-building-the-fence/) carries all of it.

## The problem

It started as a character dashboard for my tabletop game and grew into Labyrinthian.net, a deployed app with a production site I edit live during a session.  Like all my projects, it carries a set of instructions at the top, written for me and for the AI agent I build it with.  Most of those rules guard ordinary things.  A handful guard the blade:  break them and you delete live state, revert an edit I made on the production site, burn paid render credits, or destroy a finished image I paid to generate.  The catastrophic ones.

We broke them.  Repeatedly.  The agent broke them, I broke them, and the instruction sat right there in bold the whole time.  The clearest one is a single word:  the safe deploy command copies files up;  its sibling, one word different, synchronizes them, which deletes anything on the live side that is not in my local copy - and the live side is full of things that are not in my local copy.  I had written, in bold, never use the second command.  The second command got used.

Here is what I finally understood.  The rule was needed at exactly the moment nobody reads the rule.  Instructions assume a careful reader at the calmest moment, and catastrophic mistakes do not happen at the calm moment.  They happen at the fast one, the confident one, where you are three steps ahead and your hands are already moving.  Writing the rule more emphatically does not help, because emphasis is still aimed at a reader who, in that moment, is not reading.  This is doubly true of an AI agent, which does not get more careful because you used bold.  The violations were never a discipline problem.  They were a design problem.

## The approach

The fix is not a better instruction.  It is a sorting rule:  every rule in the project gets asked one question - if this gets broken, can I undo it?

If breaking it is reversible, a written rule is fine.  You clean up, you move on, the prose did its job well enough.  If breaking it is not - deleted data, spent money, a colleague's work quietly reverted - then a written rule is the wrong tool no matter how well you word it.  Those rules move out of the prose entirely and into enforcement, a gate that inspects the action before it runs and refuses the dangerous form outright.

And the fence stays reserved for the blade.  Not every rule earns enforcement;  a fence around everything is a fence around nothing.  Only the handful where the next tired afternoon would cost something I cannot get back.

## The solution

Now, before a command runs, a hook inspects it and refuses the catastrophic forms.  The destructive sync does not get a warning;  it gets stopped.  Getting blocked means the command was wrong, and the move is to rewrite it, not retry it.

The second half of the fix is honesty about coverage.  Every guarded rule in the instructions is now tagged in plain sight as one of two kinds:  one a machine enforces, the other still on trust.  That second tag is a confession written into my own docs - here is a rule I have conceded I cannot be relied on to keep.  Anyone reading the instructions, human or agent, can see exactly where the fence ends and the honor system begins.

## The outcome

The incident that finally forced the move happened on 2026-06-06:  a stale local file reverted a production edit during a live campaign session.  Some lessons you only learn from the version that costs you something.  Since the hook went in, the dangerous form of the deploy command does not reach the site;  it gets stopped at the gate.

Two months on, the checklist carries ten guarded rules.  Eight of them the hook enforces;  two stay on the honor system, because no hook can see them.  What I cannot tell you is how many attempts the fence has turned away, and that gap is worth naming:  the hook refuses the command and prints why, but it writes no log, so there is no violation history to count.

What I can tell you is stranger, and it is the reason I no longer trust a guard I have not watched prove itself.  A quiet change in how the hook's own pattern matcher behaved once made every check fail open, and four of the guarded rules went unenforced without a single visible sign.  The fence was still in the docs.  It was still in the file.  It just was not there.  So the hook now tests its own matchers before it trusts them, and refuses to run at all if that self-test fails.  A guard that can fail silently is a guard you do not have.

The lesson I would hand to anyone working alongside an AI agent, or anyone with a runbook:  a rule you keep breaking is not telling you to try harder.  It is telling you it is in the wrong layer.  The question is not how to phrase it better.  It is how to make the wrong move impossible to complete.  The brake never made anyone a better woodworker.  It just made the worst mistake impossible to finish, which is what discipline looks like once you stop trusting it to hold at the worst possible moment.

For the build - the blocked command forms, the tagging taxonomy, the architecture that makes the sync dangerous, and the prompt you can paste into your own setup - continue to [Building the Fence](/blog/2026/b-building-the-fence/).

---

## The Tabletop Dashboard Series

1.  [Two Apps and a Sticky Note](/blog/2026/two-apps-sticky-note/)
2.  [The Painting of Change](/blog/2026/a-painting-of-change/)
3.  [It Didn't Need a New Home, It Needed a Better Window](/blog/2026/ttrpg-dashboard-vault-backed/)
4.  [Players, GMs, and the Screen Between Them](/blog/2026/b-players-gms-screen/)
5.  [Show the Trailer, Keep the Ending](/blog/2026/c-teasers-without-leaks/)
6.  [Don't Hang the Test Shots](/blog/2026/d-media-studio/)
7.  **A Sign Says Please.  A Fence Says No.** *(this post;  build companion:  [Building the Fence](/blog/2026/b-building-the-fence/))*
8.  [When the (AI) Memory Lied](/blog/2026/when-the-memory-lied/)

---

*This post was created with AI assistance.  I used AI tools to restructure an earlier post of mine into this two-part form, and for editing.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
