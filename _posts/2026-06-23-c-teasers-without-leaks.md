---
layout: post
title: Show the Trailer, Keep the Ending
date: 2026-06-23
categories:
  - ttrpg
tags:
  - labyrinthian
  - ttrpg
  - sharing
  - access-control
---

A good trailer sells the movie without spoiling it.

It shows you the best frames, the faces, the one line that lands, and it stops exactly where the secret begins.  You walk out wanting the film, and you still do not know the ending.  The trailer is not a smaller, leakier version of the movie.  It is a deliberate cut, made from the same reel, that knows precisely what to withhold.

Labyrinthian.net needed trailers.  A campaign wants a public face - here is the party, here are the heroes, here is who we are - without exposing the game-master's half or a player's private notes.  So the dashboard grew public teaser surfaces:  party pages, campaign rails on the home screen, a shareable page per character.  A friend can look, get pulled in, and see nothing the table meant to keep.

The temptation was to build the teaser as a copy:  generate a "public version" of each character and serve that.  I did not, because a copy is a second source of truth, and two copies drift the first time someone edits one and forgets the other.  (That is the whole argument of the first post in this series.)  The teaser is not a copy.  It is the same note, projected through the same redaction boundary the players and GM live behind, with a public flag deciding what passes.  One source of truth, shown two ways.  A roster portrait that rides onto a public rail is the one deliberate exception, allowed by an explicit rule rather than by accident.

Sharing also changed how editing had to feel.  Once a page is public, you fix it in place - inline, in the same view, in fields that know what they are - not in a raw text box you hope you formatted right.  A character's weapon is a weapon, a level-up walks through the actual advancement, an import pulls a sheet in structured rather than pasted.  The published surface and the editing surface are the same surface, so what you see is what you share.

The rule worth keeping:  sharing safely is not about making a public copy.  It is about keeping one source of truth and pointing a public view through a boundary you trust.  The moment "public" becomes a second file, you have signed up to keep two things honest forever.

A trailer shows you the best of the film and keeps the ending in the can.  The teaser pages show the party off and keep the table's secrets, cut from the same reel, with nothing duplicated and nothing to drift.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

The public surfaces are real routes:  per-party `/c/` pages, per-character pages, and campaign rails on the homepage.  Rail membership is multi-rail and keyed by `campaignId`, so one character can appear on every campaign it belongs to;  the roster-portrait visibility exception is explicit, not a side effect.  Visibility is a per-object public toggle, and the public render is the same vault note projected through the redaction boundary - there is no separate "public copy" anywhere on disk.

Editing is inline and structured.  Edit affordances cover the panels in place (view and edit are the same view), with structured editors for inventory, leveling, and Q&A rather than free-text blobs.  Characters can be created in-app or imported (a Demiplane importer plus a local create-character flow), and the importer seeds the same structured fields the renderer reads, so an imported sheet behaves like a hand-built one.  The load-bearing detail:  after a create or import, the set cache is invalidated so the new character actually appears.

</details>

---

## The Tabletop Dashboard Series

1.  [Two Apps and a Sticky Note](/2026/06/23/two-apps-sticky-note/)
2.  [The Painting of Change](/2026/06/23/a-painting-of-change/)
3.  [It Didn't Need a New Home, It Needed a Better Window](/2026/05/24/ttrpg-dashboard-vault-backed/)
4.  [Players, GMs, and the Screen Between Them](/2026/06/23/b-players-gms-screen/)
5.  **Show the Trailer, Keep the Ending** *(this post)*
6.  [Don't Hang the Test Shots](/2026/06/23/d-media-studio/)
7.  [A Sign Says Please.  A Fence Says No.](/2026/06/18/fence-not-a-sign/)
8.  [When the Memory Lied](/2026/06/23/when-the-memory-lied/)

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
