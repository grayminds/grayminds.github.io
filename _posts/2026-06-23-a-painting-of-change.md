---
layout: post
title: The Painting of Change
date: 2026-06-22
categories:
  - ttrpg
tags:
  - labyrinthian
  - ttrpg
  - portfolio
  - astro
---

Stand close to a mural and all you see is dabs.  A smear of ochre, a fleck of white, a brown line going nowhere.  None of it looks like anything.  Step back, and the dabs are a face, a sky, a whole scene that no single stroke contains.

That mural is Labyrinthian.net - a commissioned, collaborative tabletop dashboard I built for a live campaign and the table that plays it.  It started as one character sheet on localhost.  A month later it was a deployed web app the whole group signs into mid-session, and I never once sat down to "build a web app."  I shipped one small thing, then the next, then the next, in collaboration with an AI coding agent I directed stroke by stroke.

Here is the canvas, by the numbers.  About 160 working sessions.  Roughly 900 commits.  Around 324 shipped features in the completed log.  More than 1,700 unit tests.  One production site a real table actually plays on.  No single session did anything dramatic.  The product is the stack of them.

The picture filled in by parts.  A localhost character sheet became multiplayer, with accounts and a line between what a player sees and what the game master sees.  A command center grew up around the GM.  Then generators for dice, loot, and oracle prompts.  Then a studio that renders character art.  Then a set of guardrails to make the few catastrophic mistakes impossible.  Each was a dab.  None of them was the painting.

The part worth taking:  building with an AI agent makes each stroke cheap, and cheap strokes are both the gift and the danger.  You can paint a cathedral or a smear at the same speed.  What kept it a picture was that every stroke answered to one source of truth - the campaign's notes, in a vault - and, eventually, to rails that made the irreversible strokes impossible to finish.  Direction is what turns 900 commits into a product instead of a mess.  The agent supplies the speed;  the human supplies the composition.

Up close, it is still just dabs - nine hundred of them.  The point was never any single commit.  It was that, directed well, they add up to something you can step back from and recognize.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

Labyrinthian.net is an Astro app deployed on Cloudflare (Workers plus R2).  The campaign's Obsidian vault is the only datastore:  production serves it from R2, which is canonical, while Git holds version history.  No database of record sits between the app and the notes.

The subsystems, each its own story in this series:  a vault-backed render engine that draws characters as a draggable grid (the window); account-based access with a player-and-GM redaction boundary; public teaser surfaces that share without leaking; a media studio with a paid image pipeline; and a guardrail layer that hard-blocks the irreversible mistakes.  Roughly 160 sessions, 900 commits, 324 logged features, and over 1,700 unit tests stand behind one live site.

</details>

---

## The Tabletop Dashboard Series

1.  [Two Apps and a Sticky Note](/blog/2026/two-apps-sticky-note/)
2.  **The Painting of Change** *(this post)*
3.  [It Didn't Need a New Home, It Needed a Better Window](/blog/2026/ttrpg-dashboard-vault-backed/)
4.  [Players, GMs, and the Screen Between Them](/blog/2026/b-players-gms-screen/)
5.  [Show the Trailer, Keep the Ending](/blog/2026/c-teasers-without-leaks/)
6.  [Don't Hang the Test Shots](/blog/2026/d-media-studio/)
7.  [A Sign Says Please.  A Fence Says No.](/blog/2026/fence-not-a-sign/)
8.  [When the (AI) Memory Lied](/blog/2026/when-the-memory-lied/)

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
