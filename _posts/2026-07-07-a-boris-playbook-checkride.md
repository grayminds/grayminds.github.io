---
layout: post
title: "The Checkride: One Day Against the Boris Playbook"
date: 2026-07-07
categories:
  - ai-workflow
tags:
  - claude-code
  - boris-playbook
  - verification
  - compass-rose
---


Pilots with thousands of hours still take checkrides.  The examiner is not there because anyone doubts the pilot can fly; the examiner is there because a written standard, scored honestly, exposes the drift that experience alone hides.  I recently finished Boris Cherny's sixteen-part series on how he actually uses Claude Code, and when I closed the last article I realized my own practice had never taken one.  So I gave it a checkride.

This post is the plain-language version of the day.  If you want the scorecard, the full tables, the bug, and a prompt you can paste into your own agent, the companion post [The Boris Checkride Scorecard](/blog/2026/b-boris-checkride-scorecard/) has all of it.

## The problem

Reading a playbook feels like adopting it.  You nod at each principle, recognize your own habits in half of them, and file the rest under "roughly aligned."  Nothing changes, because feelings do not have deltas.  A written playbook only earns its keep when you score yourself against it with numbers you cannot argue with.

My setup was not neglected.  In places it runs ahead of the playbook; the enforcement hooks and the memory tiers do things the articles only gesture at.  But the system grew fast.  My most active project took 94 commits in five days, and infrastructure decisions made at shipping pace drift from any written standard.  The sharpest example:  the dashboard I built to observe Claude Code sessions across every project - the lens for the whole practice - had zero automated tests of its own.  I knew testing was thin.  "Thin" is a feeling.  "Zero" is a number, and numbers are what a checkride produces.

## The approach

Score first, change nothing.  I distilled the sixteen parts into eight principles and graded my environment against each one:  one Strong, four Partial, one Mixed, and two outright Gaps.  Then I captured a baseline table of hard metrics - test counts, committed configurations, handoff docs, safety rails, and pending backlog items - before touching anything.

The baseline is the whole trick.  Without it, the day would have ended in "I improved some things."  With it, the day ends in a second table.  So the rest of the method follows directly:  fix in waves, and after every wave re-run the same metric table, same rows, same order.  The delta between columns is the report, and nobody has to trust my summary of the day.

## The solution

Five waves, one day.

First, a test harness, because verification is the principle the playbook says multiplies everything else.  The very first suite ever written for the dashboard caught a real shipping bug within the hour:  on a fresh install, one seed step silently never ran, so every clean deploy would have rendered its sections in the wrong order.  The verification principle paid for itself the same day I adopted it.

Second, a bootstrap kit rolled across the active projects that had no setup at all - committed settings and handoff docs where before there were none.

Third, hygiene in three parts:  context slimming, deny rules, and registry reconciliation.  The always-on context for the most active project dropped 78 percent, from a front-loaded wall of prose to a lean doc that pulls history on demand.  And seven deny rules now stand between an autonomous agent and my credentials, where before there were zero.

Fourth, the backlog - and the second surprise of the day.  The scariest number on the baseline, 75 pending classification proposals, turned out to be stale documentation.  The work had already been done in an earlier session, and the docs never caught up.  One dry-run command replaced the multi-agent workflow I had planned to build.  Verify the premise before you build the harness.

Fifth, the one decision still open, closed and written down.

## The outcome

The evening table against the morning table:  automated tests in the dashboard project went from 0 to 43, all passing.  Projects with committed settings went from 2 of 18 to 8 of 18.  Always-on context in the root CLAUDE.md dropped from 16,974 bytes to 3,803.  The 75 unverified "pending" proposals went to 0.  User-scope deny rules went from 0 to 7.

The checkride did not prove I could fly.  It showed exactly where the practice had drifted from the written standard, and by evening the measured drift was zero.  A system that grows this fast will drift again... that is what growth does.  The difference is that the next checkride already has a baseline waiting for it.

If you use an AI coding tool daily, do this today, before you change anything:  write down five numbers.  How many automated tests your most active project has.  How many of your projects carry committed, portable tool settings.  How many have a written handoff doc.  How many deny rules stand between an autonomous agent and your credentials.  And how many "pending" items in your backlog you have actually verified are still pending.  Thirty minutes, one dated note.  Every improvement after that is reportable instead of a feeling.

For the scorecard, the tables, the seed-order bug, and the paste-ready prompt to run your own checkride, continue to [The Boris Checkride Scorecard](/blog/2026/b-boris-checkride-scorecard/).

---

*This post was created with AI assistance.  I used AI tools for drafting and editing, working from the checkride notes and measured metrics I directed.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
