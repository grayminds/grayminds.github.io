---
layout: post
title: "From Mission Control to compass-rose"
date: 2026-07-11
categories:
  - compass-rose
tags:
  - compass-rose
  - khimai
  - mission-control
  - claude-code
  - agentic
---


Mission Control was a dashboard.  compass-rose is a practice with a dashboard attached.  That sentence is the whole reason I rebuilt it, and everything below is the long version.

I have written about Mission Control before:  the self-hosted room where I could see every Claude Code project, session, plan, and memory file in one place.  It did its job.  Then it stopped being the right shape.  The tool was built to answer "what is happening across my projects," and after a few months of living inside it, the question I actually kept asking had changed.  Not "what am I running," but "am I getting better at this, and can I prove it."  A status board cannot answer that.  So on July 2 I stopped iterating and started over.

## Why Rebuild Instead of Iterate

Iteration is the right default.  You keep the thing that works and you improve it in place.  I broke that default deliberately, and only once, because the change I wanted was structural rather than cosmetic.

Mission Control carried a design assumption in its bones:  the dashboard is an observatory.  It watches.  What I wanted next was a system that also acts, that measures the person using it, and that could eventually be handed to a stranger without handing over my whole life along with it.  Those three wants do not bolt onto an observatory.  They change what the foundation has to be.

So the rebuild was a transplant, not a fork of convenience.  I copied the two Mission Control repositories, code and data, into one new private repository, then froze the originals as read-only reference.  They still exist.  I never touch them again.  Everything since lives in the new home, and the new home was designed from the first commit around the three wants the old one could not hold.

## Two Names, One System

The first structural decision was to split the system into a chassis and a persona, and to give each its own name.

**compass-rose** is the chassis.  It is the publishable, data-agnostic dashboard:  the Fastify server, the SQLite index, the templates, the growth pipeline, the cockpit.  Any Claude Code user could clone it, run it against an empty data directory, and find a working dashboard with nothing of me inside it.  That is not an aspiration;  it is verified by three gates that run before anything reaches the public mirror.  A fresh-copy smoke test, a grep gate that fails on any personal marker, and a config audit that treats a hardcoded personal default as a bug even when the grep misses it.  Separation by construction, not by discipline.

**KHIMAI** is the persona.  It is my identity riding on the chassis, and it is delivered entirely through private data, never through code.  The wordmark, the greeting, the boot line, the preferred palette, and eventually the traits all load from one data file.  On my machines the glass reads KHIMAI.  On a stranger's clone it reads compass-rose.  The string KHIMAI never appears in the shipped code at all.

I keep describing this as building the stage so well that the actor never has to touch the scenery.  The chassis is the stage.  KHIMAI is the actor.  The whole discipline is keeping the two from bleeding into each other, because the moment personal data leaks into the chassis, the thing stops being shareable and starts being just mine.

## Why "compass-rose"

The name earns its place three times over, which is the test I hold names to.

A compass rose orients without commanding.  It sits in the corner of an old chart and gives every other line a shared direction;  it never steers the ship.  That is exactly the relationship I want with an AI command center.  It should make my situation legible and let me act by exception, not drive the work itself.

The system's signature visualization is a polar area chart, and that chart is historically called a rose diagram.  The name and the centerpiece are the same shape.

And a compass rose adorns two kinds of surface that happen to be my two non-software identities:  the portolan sea charts I studied alongside medieval manuscripts, and the flight display of a drone.  A name that lands on all three of those at once was not going to lose to the alternatives.  I ran through a dozen candidates and retired every one of them.  compass-rose stayed.

## From Observatory to Cockpit

The clearest way to feel the difference is the direction the data flows.

Mission Control was read-only in spirit.  It pulled from my projects and showed me the state.  compass-rose keeps all of that, and adds a return path.  A file-based dispatch queue turns the dashboard from a place I watch into a place I act:  I can send a new Claude Code session from the glass, capped at a few concurrent runs, streaming its progress back to a live card on the homepage.  The recurring rituals, a morning briefing and a vault-health sweep among them, run without me opening a terminal.

The design language for this comes from supervisory control, the same idea that governs how a person oversees an autonomous system in any serious control room.  You do not do the work by hand.  You watch the instruments, and you intervene by exception.  The dashboard's whole job, in that frame, is to make the exception obvious.  I measure everything I build into it against that:  does this panel help me notice the one thing that needs me, faster.

## The Deeper Turn

The part that matters most to me is the least visible from a screenshot.  compass-rose is built to measure my own growth, not just my projects' status.

A local model scores my AI collaboration each week across a set of mastery dimensions, drawn from the evidence in my own session transcripts.  It surfaces two kinds of gap.  The loud failures, where something broke and I can see it.  And the quiet ones, the dormant capabilities, the skills I own on paper but never actually reach for.  A skill I never use looks the same as a skill I lack until something makes the absence visible.  That is the turn:  from watching the work to watching the worker, honestly, with numbers I did not get to grade myself.

That growth layer, the purpose-driven interface it lives inside, and the plan-review surface that closes the loop between me and the agent, each deserve their own post.  This one is the frame.  Mission Control answered "what is running."  compass-rose asks a harder question and tries to earn the answer:  am I getting better, where am I blind, and what should I do about it next.

That is a lot to ask of a corner of a chart.  But the compass rose never claimed to steer.  It just made sure that whoever picked up the map could read it the same way every time.

## compass-rose Series

1.  **From Mission Control to compass-rose** *(this post)*
2.  Panels That Earn Their Place
3.  Measuring the Skill, Not the Output
4.  Codex: Reviewing the Plan, Not the Wall of Text

---

*This post was created with AI assistance.  I used AI tools for drafting and editing, working from the compass-rose design work I directed.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
