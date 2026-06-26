---
layout: post
title: It Didn't Need a New Home, It Needed a Better Window
date: 2026-05-24
categories:
  - ttrpg
tags:
  - obsidian
  - vault
  - ttrpg
  - localhost
---

At a tabletop game, everyone spreads out their own way.  Character sheet to one side, notes to the other, dice in front, the cards you reach for most propped where you can see them.  The arrangement is yours, and next session you set it up the same way, because it is part of how you play.

Software character sheets almost never let you do that.  So I built one that does - a character dashboard for my tabletop campaign.  About a month later it was a deployed web app my whole table signs into mid-session.

Here is what it does.  Each player gets a live character sheet they arrange themselves, and every character remembers its own layout.  The game master gets a command center:  an encounter builder, NPC and place pages, a live Fear counter, and generators for dice, loot, and oracle prompts.  It runs on Cloudflare, gates what each player is allowed to see, and edits go live during the game.

One decision carried all of it.  The dashboard stores no data of its own.  It reads my Obsidian vault directly and draws what is there;  I edit a character the way I edit any note, and the dashboard just shows it.  My characters already lived in my notes, so a separate character app would have meant two copies that drift the first time I update one and forget the other.  One source of truth, many windows.

The painting of change is the part I did not plan.  Roughly 160 working sessions and 900 commits across a month took it from a single localhost character sheet to Labyrinthian.net, a commissioned, collaborative production app with accounts, per-player visibility, AI generators, and a pipeline that renders character art.  Each release was small.  The stack of them is the product.

The lesson I keep relearning, and this one drove home hardest:  refuse the second copy, even when the second copy is only your window settings.  So even the layout is mine.  Each player's arrangement saves back into the vault as a note, never trapped in a hidden database, syncing and surviving any rebuild.  That is the tabletop instinct with a drag handle - the way you spread out your sheet, your dice, and your cards is yours to keep, and now the software remembers it too.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

The stack is Astro, deployed on Cloudflare (Workers plus R2).  Production serves the Obsidian vault from R2, which is canonical:  Git is version control, R2 is what the app actually reads.  The dashboard parses markdown, frontmatter, and `.base` files straight from the vault, with no separate datastore between it and the truth.

Layout state is the design's hinge.  Each character's arrangement is written back into the vault as a sidecar note, scoped per character, per tab, and per visibility, so one character can hold more than one view and keep private game-master detail separate from what a player sees.  Because the layout lives in the vault, it syncs, versions, and outlives any particular build.

What sits on top of that base, shipped across those sessions:  account-based access with per-player visibility, a GM command center (encounter builder, NPC and place dashboards, and live campaign state - Fear, spotlight, countdowns - split into prod-only files so a content deploy cannot revert the table mid-session), offline generators for dice, loot, and ingredients, one metered AI oracle generator, and a media studio that renders character art through a paid image pipeline.

It is production, not a toy, so it carries a real project `CLAUDE.md`:  nine inviolable guardrails, several of them hard-blocked by a pre-commit hook because the catastrophic ones - deleting live R2 state, reverting a prod edit, burning render credits - got violated despite being written in bold.  That story is its own post:  [A Sign Says Please.  A Fence Says No.](/2026/06/18/fence-not-a-sign/)

</details>

---

## The Tabletop Dashboard Series

1.  [Two Apps and a Sticky Note](/2026/06/23/two-apps-sticky-note/)
2.  [The Painting of Change](/2026/06/23/a-painting-of-change/)
3.  **It Didn't Need a New Home, It Needed a Better Window** *(this post)*
4.  [Players, GMs, and the Screen Between Them](/2026/06/23/b-players-gms-screen/)
5.  [Show the Trailer, Keep the Ending](/2026/06/23/c-teasers-without-leaks/)
6.  [Don't Hang the Test Shots](/2026/06/23/d-media-studio/)
7.  [A Sign Says Please.  A Fence Says No.](/2026/06/18/fence-not-a-sign/)
8.  [When the Memory Lied](/2026/06/23/when-the-memory-lied/)

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
