---
layout: post
title: Wiring the Transcript Scorer
date: 2026-07-20
categories:
  - compass-rose
tags:
  - compass-rose
  - khimai
  - growth
  - skill-development
  - claude-code
---


This is the build companion to [Measuring the Skill, Not the Output](/blog/2026/c-measuring-the-skill-not-the-output/).  That post tells the story - a growth layer that grades my practice from evidence I do not get to edit, and draws my quiet failures as dark spokes on a rose.  This one carries the wiring:  the prompt to replicate it, the two-stage scoring design, the raw-files-as-truth architecture, and the calibration step that keeps the machine honest.

## The prompt

Paste this into your agent on any setup that keeps session logs.  It carries the design constraints so your agent does not have to rediscover them:

```text
My agent sessions leave a transcript archive (raw session logs).  Build me
a transcript scorer that grades my skill at working with these tools, not
just my output volume.

Requirements:
1. Define a set of mastery dimensions with me before writing any code.
   Each dimension gets a weekly score.
2. Score in two stages, in this order.  First, deterministic features:
   concrete, countable signals extracted straight from the session logs,
   measurable without judgment.  Second, a bounded adjustment from a LOCAL
   language model reading the same evidence.  The model may bend the
   deterministic score by a small fixed margin and no more.  It nuances;
   it never invents.  Personal transcripts never go to a hosted API.
3. Track both failure modes per dimension:  errors of commission (a thing
   done wrong) and errors of omission (a capability that sat unused).
   Count the first;  detect the second as absence over time.
4. The raw transcript files are the truth.  The database is a disposable
   cache rebuilt from them, so any new scoring idea can run over the
   complete past the day I think of it.
5. Backfill:  run the pipeline backward across the entire archive before
   showing me anything, so the chart opens with history instead of an
   empty grid waiting to fill.
6. Calibration:  before automating anything, I hand-rate a seed sample of
   my own skills.  Compare the machine's scores against that seed and
   report the agreement.  Where we disagree is a signal, not a bug.
7. Render the weekly scores as a polar area chart:  spokes for dimensions,
   rings for weeks, and a chronology scrubber to drag through time.  A
   dimension gone quiet must show as a dark spoke.  Every score drills
   down to its signals, the model's rationale, and the sessions that
   produced them.
```

## Commission counts, omission draws

The scorer is organized around the two ways a practice fails, and the two need different instrumentation.

Errors of commission announce themselves.  Something broke, the agent went down a bad path, and a tool call failed loudly.  Those are countable events in the transcripts, so the pipeline counts them.

Errors of omission have no event to count.  A capability that sat dormant leaves no trace except absence, and absence has no alarm.  So the scorer detects omission as a signal gone quiet over time, and the chart draws it as a dark spoke.  Each weekly dimension score carries both its commission and omission counts, plus the evidence behind them, so the number is a door rather than a verdict.

## The two-stage score

The scoring is deliberately two-stage, and the order matters.

Stage one is deterministic features:  concrete, countable signals pulled straight from the session transcripts and project history, the things measurable without judgment.  Stage two, and only then, is a bounded adjustment from a local language model reading the same evidence.  The model can bend the deterministic score by a small margin and no more.  It can nuance;  it cannot invent.  The deterministic floor keeps it honest.

I would not trust a model to grade me freehand, and this design means I do not have to.  The features do the grading;  the model does the reading.

One constraint is non-negotiable:  the adjustment model runs locally.  Personal session transcripts never go to a hosted API for unattended analysis.  That rule is why the prompt above says LOCAL in capital letters.

## Raw files are the truth

The architectural decision that makes the layer worth trusting:  the raw transcript files are the source of truth, and the database is a disposable cache rebuilt from them.

That inversion buys retroactivity.  Any new way of scoring can run over the complete past the same day I think of it, because nothing important lives only in derived state.  It also meant the pipeline could be backfilled across the entire transcript archive - nineteen weeks of it - producing a full history of hybrid scores instead of an empty chart waiting to fill.  A dashboard that can only see forward from its install date takes a season to become useful.  This one was useful the afternoon it shipped.

## The calibration seed

Before any of this was automated, I had hand-rated my own skills in a simple vault tracker.  That hand-rating became the seed the automated scorer is checked against, so the machine's grades and my own honest self-assessment sit side by side.

Where they disagree is itself a signal worth reading.  When the model rates a dimension higher than I did, either I am underselling myself or the evidence sees something I missed.  Both are worth knowing, which is why the prompt makes the comparison a required step rather than an afterthought.

And the comparison, when it finally ran, was not flattering to either of us.  Eight dimensions hand-rated, seven with a machine score for the same week.  On a ten-point scale, not one landed within half a point of my own rating, and exactly one came within a full point.  The mean gap was 3.4 points.

What that spread does not show is a machine that simply grades harder than I do.  The average signed difference was three tenths of a point, so it disagreed in both directions, dimension by dimension.  That shape is the useful part.  A scorer running consistently kinder or harsher than me would be a calibration offset I could subtract out and forget.  One that disagrees this much in both directions is telling me we are reading different evidence, and the drill-down into the sessions behind each score is where that argument gets settled rather than averaged away.

## The rose and the scrubber

The weekly scores render as a polar area chart:  rings for weeks, spokes for dimensions.  A balanced week is a full, round bloom.  A lopsided one is a flower with a petal missing, and the missing petal is an omission you can see from across the room.

The chronology scrubber lets me drag through the weeks and watch the silhouette change.  A capability that was bright in April and went dark in June is a story the scrubber tells in a single motion.  Clicking a spoke opens the drill-down:  the exact signals, the model's rationale, and the sessions that produced them.

## The principle

Grade the skill from evidence the practitioner cannot quietly revise, keep the judgment bounded by deterministic counts, keep the raw record as the truth, and check the machine against a human seed before believing it.  The narrative half of this argument - why omission matters more than it photographs - is in [Measuring the Skill, Not the Output](/blog/2026/c-measuring-the-skill-not-the-output/).

---

*This post was created with AI assistance.  I used AI tools for drafting and editing, working from the compass-rose build I directed.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
