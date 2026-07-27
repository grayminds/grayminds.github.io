---
layout: post
title: The Bag You Carry Every Day
date: 2026-06-10
categories:
  - claude-code
tags:
  - claude-code
  - memory
  - context
---

<!-- Metric to fill in:  before/after total session-start bundle size in tokens.  The post already cites ~2,600 tokens saved;  the two totals would sharpen it. -->

Pack a bag you carry every single day and you get ruthless about weight.

The thing you might need once a year does not earn a place if it costs you on every trip.  A bag you pack once, for one trip, can hold anything;  you pay that weight once and forget it.  A bag you shoulder every morning is multiplied by every day you carry it.  The math is not about the item.  It is about how often you lift it.

My AI assistant carries a bag like that.  At the start of every working session it reads the same opening bundle:  who I am, how my machine is set up, an index of everything it has learned about how I work.  I had been packing it like a one-time trip, adding whatever seemed useful, and had never weighed it as what it actually is - a bag I make it carry into every single conversation.  When I finally weighed it, the bundle was heavier than the work.

So I trimmed it, and the trim took about 2,600 tokens off the start of every session - not once, but every time, on every machine, for as long as the setup stands.  Not one fact was lost.  Everything I cut still exists, in the one place it belongs.

The cut came down to a single question, asked line by line:  does this need to be in my hand the moment I walk in, or can I open a drawer and get it when a task actually asks.  Two things failed that test.  The first was a historical log that had crept into the index meant to merely point at it - an index that contains the thing it indexes is not a map anymore, it is the territory, and now you carry the territory everywhere.  It moved into its own file, with a one-line pointer left behind.  The second was the same fact said three times:  my shell, named in three separate files that all load at the start.  The assistant does not learn it better the third time.  It just carries it three times, every morning.

The lesson I will keep is that the context loaded at startup is the most expensive context you own, because you pay for it whether or not the session needs it.  A good memory system is supposed to make sessions both smarter and cheaper, and those two pull against each other the moment you stop paying attention.  What reconciles them is keeping the map in your hand and the territory in a drawer.  Load what tells you where to look;  open the rest only when something asks.  Pack like you carry it every day, because you do.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

My startup chain is a user-scope `CLAUDE.md` that imports three identity files, a vault-scope `CLAUDE.md` of project conventions, and a `MEMORY.md` index pointing into a folder of topic files.  All of it loads before the first prompt.

The pass made four moves.  A dated session log left the memory index for a separate history file, with a one-line pointer left behind, since it is parsed by my dashboard but does not need to ride every session.  Every index entry was trimmed to a one-line hook, because the full content already lived in the topic files the index points at.  Two path tables in the context file were merged into one, and duplicated prose about my shell and build pipeline was deleted.  A multi-paragraph description of one of my own tools was compressed to a pointer, because that tool documents itself.  The commit touched four files, removed more lines than it added, and took roughly 2,600 tokens off every session start.

To run the same audit on your own startup bundle, paste this into Claude Code:

```text
Audit my always-loaded session-start context.

Requirements:
1. Read every file injected at session start:  the user-scope CLAUDE.md and
   each file it imports, the project CLAUDE.md, and the memory index.
2. Estimate the token weight of each file and report a per-file total.
3. Classify every line as needed-in-hand-every-session or drawer material
   that a task can open on demand.
4. Flag any fact stated in more than one file.  Duplication does not teach
   the model anything;  it just rides every session twice.
5. Propose moves:  what leaves the bundle, where it goes, and the one-line
   pointer left behind.  Include a projected token saving per move.
6. Make NO edits without my approval.  This pass is read-and-report only.
```

</details>

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
