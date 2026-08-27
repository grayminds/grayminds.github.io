---
layout: post
title: "Measuring the Skill, Not the Output"
date: 2026-07-19
categories:
  - compass-rose
tags:
  - compass-rose
  - khimai
  - growth
  - skill-development
  - claude-code
---


Most AI dashboards measure output.  Sessions run, tokens burned, tasks closed.  Those are real, and compass-rose tracks them.  But output is the thing that is easy to count, which is not the same as the thing that matters.  What I wanted to know was harder:  am I getting better at working with these tools, where am I weak, and am I fooling myself.  So I built a growth layer that grades the skill, not just the work, and it grades me from evidence I do not get to edit.

## The Two Ways You Fail

The layer is organized around a distinction I have written about before in a narrower form:  the two ways a practice fails.  The essay that named the framing is [Errors of Omission and Commission](/blog/2026/errors-of-omission-and-commission/), and this layer is what it looks like turned into a weekly measurement.

There are errors of commission.  You did a thing, and it was wrong.  Something broke, the agent went down a bad path, and a tool call failed loudly.  These are the failures everyone notices, because they announce themselves.  They are painful and they are honest.

And there are errors of omission.  You did not do a thing you could have.  A capability sat dormant.  A skill you own on paper never got reached for, week after week, and nothing broke, because nothing happening is exactly what omission looks like.  This is the failure mode that hides, because absence has no alarm.  A skill you never use and a skill you lack look identical from the outside until something makes the gap visible.

The whole point of the growth layer is to make both kinds visible as data.  Commission is loud and gets counted.  Omission is quiet and gets drawn as a dark spoke on a chart, so the thing that would otherwise stay invisible has a shape you cannot miss.

## Eight Dimensions, Scored From Evidence

Each week, a set of mastery dimensions gets a score.  The scoring is deliberately two-stage, and the order matters.

First, deterministic features.  Concrete, countable signals pulled straight from my own session transcripts and project history, the things that can be measured without judgment.  Then, and only then, a bounded adjustment from a local language model reading the same evidence, allowed to bend the deterministic score by a small margin and no more.  The model can nuance;  it cannot invent.  If it wants to move a number, it moves it a little, and the deterministic floor keeps it honest.  I would not trust a model to grade me freehand, and I do not.  The features do the grading;  the model does the reading.

The result is a hybrid weekly score per dimension, carrying its commission and omission counts and the evidence behind it.  Click a spoke and you get the drill-down:  the exact signals, the model's rationale, and the sessions that produced them.  Nothing important lives only in a summary.  The number is a door, and behind it is the evidence.

## The Chart Is a Rose

The scores render as a polar area chart, rings for weeks and spokes for dimensions, and I have said elsewhere that this chart is the reason the whole system is named compass-rose.  A polar area chart is historically a rose diagram, and the shape does something a bar chart cannot.  It shows you the silhouette of a practice at a glance.  A balanced week is a full, round bloom.  A lopsided one is a flower with a petal missing, and the missing petal is a dark spoke, and a dark spoke is an error of omission you can see from across the room.

There is a chronology scrubber, so I can drag through the weeks and watch the shape change over time.  A capability that was bright in April and went dark in June is a story the scrubber tells in a single motion.  You do not have to remember that you stopped using something.  The chart remembers for you, and it draws the forgetting.

## Grading The Past, Not Just The Present

One decision made this layer worth trusting instead of just watching:  I ran it backward across everything.

The scores are not a going-forward experiment that will have meaning in a year.  The pipeline was backfilled across my entire transcript archive, nineteen weeks of it, producing a full history of hybrid scores rather than an empty chart waiting to fill.  The retroactivity is the structural advantage of the whole system, and I guard it hard:  the raw files are the truth, the database is a disposable cache rebuilt from them, so any new way of scoring can be run over the complete past the same day I think of it.  A dashboard that can only see forward from its install date is a dashboard that takes a season to become useful.  This one was useful the afternoon it shipped.

I also seeded it with a calibration.  Before any of this was automated, I had hand-rated my own skills in a simple vault tracker.  That hand-rating became the seed the automated scorer is checked against, so the machine's grades and my own honest self-assessment sit side by side, and where they disagree is itself a signal worth reading.  When the model rates a dimension higher than I did, either I am underselling myself or the evidence sees something I missed.  Both are worth knowing.

## Watching The Worker

This is the piece of compass-rose I care about most, and it is the one that photographs worst, because a chart of your own competence is not a thing you screenshot for the drama.

It fits the same supervisory-control frame as the rest of the system.  I am overseeing an autonomous process, except the process is my own practice, and the instrument's job is to surface the exception, the dimension that needs attention, faster than I would notice on my own.  Left to memory, I would remember my loud failures and forget my quiet ones, because that is how memory works.  The growth layer refuses to let the quiet ones stay quiet.  It counts what broke, and it draws what never happened, and it grades both from evidence I cannot quietly revise in my own favor.

Output tells you the work got done.  This tells you whether the person doing it is still growing, or just busy.  Those are different questions, and only one of them is worth a dashboard.

The build detail - the two-stage scoring pipeline, the backfill, and a paste-ready replication prompt - lives in the technical companion, [Wiring the Transcript Scorer](/blog/2026/transcript-scorer-wiring/).

## compass-rose Series

1.  From Mission Control to compass-rose
2.  Panels That Earn Their Place
3.  **Measuring the Skill, Not the Output** *(this post)*
4.  Codex: Reviewing the Plan, Not the Wall of Text

---

*This post was created with AI assistance.  I used AI tools for drafting and editing, working from the growth-layer design I directed.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
