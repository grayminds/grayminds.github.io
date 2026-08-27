---
layout: post
title: "Panels That Earn Their Place"
date: 2026-07-14
categories:
  - compass-rose
tags:
  - compass-rose
  - ui-design
  - design-system
  - claude-code
  - agentic
---


Every panel on the compass-rose homepage has to pass one test before it ships:  state the question it answers, name the data that feeds it, and say what it renders when that data is missing or stale.  A panel that cannot answer all three does not exist.  This post is about what happens to an interface when you enforce that rule, and about the second rule that keeps the interface from lying to you.

The design brief for the whole system is one line I keep coming back to.  A portfolio, not a data dump.  Design has to have heart:  deliberate typography, a warm palette, real hierarchy, purposeful motion.  Defaults are never the final answer.  But "heart" is not the same as ornament, and the discipline that separates the two is the purpose test above.

## The Furniture Rule

The first thing a design audit found was that I had built the same conceptual panel at least twelve different ways.  A card here had one corner radius;  its twin on another tab had a different one.  Nine separate families of little status chip, each with its own padding and border.  Six independent implementations of a card header.  Four different segmented toggles that all did the same job.  None of it was wrong, exactly.  It was just accreted, one page at a time, with no rule deciding what a given surface should look like.

The fix was a single question that decides how any surface is styled:  is it page furniture, or is it content.

Furniture is the stuff you look through:  navigation, filters, rails, the ambient status strip.  It gets the glass treatment, the translucent panel with a blur behind it, because it is chrome and it should recede.  Content is the stuff you read:  one card per real thing, a project, a metric, and a session.  It sits on a solid surface with an honest edge and a resting shadow, because you are meant to look at it, not through it.  And a rule falls straight out of that:  long-form text never sits on glass.  Reading is content;  glass is furniture;  the two do not mix.

One rule, and the twelve ways collapse into three tiers.  The value was never the visual polish.  It was that "how should this look" stopped being a judgment call I made per page and became a property of what the thing is.

## No Naked Numbers

The second rule is about honesty, and it borrows its model from an unlikely place:  a Formula 1 broadcast.

Watch a race and notice how much you can read in a glance.  Every number on screen carries a visual encoding, a comparison, and a stable position, so the state of the race is legible in the half second before the camera cuts away.  The graphics are not decoration.  They are the fastest path from data to understanding.  compass-rose has the same shape of data, live capacity, deltas over time, progress toward a target, health across a set of jobs, and for a long time it rendered most of it as bare numerals.

So the interface now runs on four rules borrowed from that broadcast register.  No naked numbers:  every metric gets an encoding, an arc or a bar or a set of lit segments, plus the numeral, never one without the other.  Every number gets context:  a value with no reference point is dead weight, so each one pairs with a delta against the prior period, a target ghost, or a capacity bound.  Glance, hover, drill:  the encoding answers "is this fine" in under a second, the hover gives the exact figure, and the click lands on the tab that owns it.  And stable geometry:  numerals hold their position and width across every load, so values change but the layout never jumps under your eyes.

The token window is not "62 percent."  It is an arc filling toward its bound, with the exact figure on hover and the projection built in.  The weekly session count is not a bare integer;  it carries an arrow and a delta against the seven-day mean.  A milestone at four of six criteria renders as four lit segments of six, not the text "4/6."  None of this is more information.  It is the same information, shaped so a glance is enough.

## Honest Data

The rule underneath both of the above is that the dashboard is not allowed to lie by omission.

Stale values wear a staleness tag.  Absent data renders an explicit empty state, never a silent gap that reads as a zero.  Anything simulated or seeded for calibration is labeled as such.  And the awkward transitions, the moment a count goes from something to nothing or from nothing to something, are designed on purpose rather than discovered in production.  A trustworthy instrument is one that tells you when it does not know.  That is worth more, on a dashboard you use to make decisions, than any amount of polish on the happy path.

## Motion That Means Something

Which brings me to the part people usually reach for first and I reach for last:  movement.  The rule for motion is a hard one.  Chrome may animate only when the motion encodes information.  No panel moves for spectacle.

Under that rule, motion turns out to be worth quite a lot.  A tab-to-tab navigation crossfades while the top bar holds perfectly still, which tells you at a glance that you are in the same app, in a new room.  Panels arrive in a short staggered sequence on a full load, and that sequence is the page's priority order, made visible.  A disclosure eases open from the exact spot you clicked, so cause and effect are tied together.  A button compresses a hair on press, acknowledging the click in the gap before the server answers.  A shimmer appears only when a request genuinely takes long enough to be worth waiting for, and never on a fast one.  Every one of those encodes something:  arrival, continuity, consequence, and liveness.  The ones that only decorate, the animated blobs and the scanline effects and the parallax, are named explicitly and left out.  And every motion has a reduced-motion fallback, because information you can only get by watching an animation is information some people cannot get at all.

## Interactions Earned From Use

The best parts of the interface are the ones I did not design up front.  They came from friction I felt while using the thing.

The clearest example:  after living in the homepage for a while, I kept wanting to widen the reading column here and narrow a rail there, differently on different pages, and no fixed layout was ever right for all of them.  So the next phase is resizable columns, but built to a specific feel I only knew because I had wanted it.  A handle that is invisible at rest and appears under your cursor, subtle, occupying the gap that already exists between panels so nothing shifts to make room for it.  A drag that persists per page.  A pair of presets, center and expand, so a column can snap to its designed measure or fill the width, and a plan can sit centered while a chart editor sits expanded.  Keyboard-reachable, touch-aware, and off the critical path entirely if you never touch it.

That is the pattern for every good interaction in the thing.  I do not sit down and design dynamism in the abstract.  I use the dashboard until something is mildly annoying, and then the fix for that specific annoyance becomes the feature.  An interface built that way ends up dense where you work and quiet everywhere else, which is exactly what a supervisory instrument should be.  It earns every panel, and it earns every motion, and when it cannot say why a thing is on the screen, the thing comes off the screen.

## Appendix:  the audit, as a prompt

Every rule above started as a finding in a design audit, so here is the audit folded back into a prompt you can run against your own dashboard.

```text
Audit this dashboard against the rules below.  Do not restyle anything
yet;  produce the findings first, with file and component references.

Requirements:
1. Inventory every distinct implementation of the same conceptual
   surface:  panels and cards, status chips, card headers, and segmented
   toggles.  Count the duplicates per family.  Surfaces accrete one page
   at a time;  expect more variants than anyone remembers building.
2. Run every surface through the purpose test:  state the question it
   answers, name the data that feeds it, and say what it renders when
   that data is missing or stale.  A surface that cannot answer all
   three is flagged for removal, not for restyling.
3. Classify every surface as furniture or content.  Furniture is what
   you look through (navigation, filters, rails, and the ambient status
   strip) and gets the translucent treatment;  content is what you read
   (one card per real thing) and sits on a solid surface with an honest
   edge.  Flag any long-form text sitting on glass;  reading is content,
   glass is furniture, and the two do not mix.
4. Flag every naked numeral:  a metric rendered without a visual
   encoding (an arc, a bar, or lit segments) paired with the number, and
   any value with no reference point (no delta against a prior period,
   no target, and no capacity bound).  A value with no reference point is
   dead weight.
5. Flag every silent empty state:  absent data rendering as a gap or a
   zero instead of an explicit empty state, stale values wearing no
   staleness tag, and simulated or seeded data carrying no label.  A gap
   that reads as a zero is the dashboard lying by omission.
6. Flag every motion that carries no information.  Chrome may animate
   only when the motion encodes something (arrival, continuity,
   consequence, or liveness);  spectacle comes off the screen.  Also
   flag any informational motion with no reduced-motion fallback.
7. Propose a consolidation of the step-1 inventory into explicit tiers,
   with the component count per family before and after.  The before
   count is the evidence;  the after count is the deliverable.
```

## compass-rose Series

1.  From Mission Control to compass-rose
2.  **Panels That Earn Their Place** *(this post)*
3.  Measuring the Skill, Not the Output
4.  Codex: Reviewing the Plan, Not the Wall of Text

---

*This post was created with AI assistance.  I used AI tools for drafting and editing, and for generating the audit prompt, working from the design-system audit I directed.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
