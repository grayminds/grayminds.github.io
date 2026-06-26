---
layout: post
title: Two Apps and a Sticky Note
date: 2026-06-20
categories:
  - ttrpg
tags:
  - labyrinthian
  - ttrpg
  - solutioning
  - data-ownership
---

Picture your character in one app and your campaign's story in another.

The character app knows your hit points, your sword, the math of your next level.  The story app knows the betrayal two sessions ago and the real name of the king.  Neither app knows what the other knows.  The only thing connecting them is a sticky note on your monitor that reads "update the other one," and you are made of forgetfulness.

That sticky note is the whole problem with the tools already out there, and it is why I built my own instead of buying one.  The market splits cleanly in two, and neither half closes the loop.

On one side are the character and gameplay tools - Demiplane, D&D Beyond, the sheet built into a virtual tabletop.  They are good at the mechanical character, and they are sealed.  Your character lives behind their login, in their schema, on their terms.  I know this one firsthand:  my players' characters lived as Demiplane sheets, and the only way to get them into something I controlled was to write a robot that signs in and lifts the data out one sheet at a time.  Your own character, behind glass.

On the other side are the worldbuilding tools - World Anvil, LegendKeeper, the campaign wiki.  They are good at lore and bad at Tuesday night.  They hold the world beautifully and run none of the game:  no player's live sheet, no Fear counter ticking up at the table, no dice, no line between what a player sees and what the game master is hiding.

The gap is not that either side is bad at its job.  It is that no tool owns both halves, so the story and the mechanics never share a single source of truth.  Change the story and the character sheet does not feel it.  Level the character and the campaign wiki never hears.  Every connection between the two runs through you, by hand, on a sticky note you will eventually forget.

So Labyrinthian.net makes one bet:  the character and the world live in the same place - one vault of plain notes - and every feature reads from it.  The live sheet and the session's story are the same data seen from two angles.  Kill an NPC in play and they are gone everywhere, because there was only ever one of them.  The gameplay carries narrative continuity because the narrative and the gameplay were never stored apart in the first place.

You cannot buy that, because the thing that makes it work is owning your own data, and the tools for sale are built on the opposite premise:  that your character is theirs to hold.

The sticky note is gone now.  Not because I found a better app to write it on, but because there is no longer a gap to bridge.  The character and the story sit in the same notes, and a thing that lives in one place has nothing to forget to tell itself.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

The proof that the silos are real is in the importer.  My players' Daggerheart characters lived on Demiplane Nexus, behind a login;  pulling them in meant a headless Playwright session that signs in, scrapes one sheet, and runs it through a pure parser into the dashboard's own pack model - the Demiplane sheet GUID stored as a separate source field, never overloaded onto the canonical character id.  That is the tax of a closed tool:  you write a robot to retrieve your own data.

Everything downstream assumes the opposite.  The canonical store is an Obsidian vault of markdown plus frontmatter;  characters, NPCs, places, lore, and live campaign state are all just notes.  Adding a second character or a different system is a configuration change, not a code change, because the renderer reads the vault instead of a bespoke schema.  "One source of truth" is not an architecture diagram here;  it is the reason a change to the story shows up on the sheet without anyone carrying it across.

</details>

---

## The Tabletop Dashboard Series

1.  **Two Apps and a Sticky Note** *(this post)*
2.  [The Painting of Change](/blog/2026/a-painting-of-change/)
3.  [It Didn't Need a New Home, It Needed a Better Window](/blog/2026/ttrpg-dashboard-vault-backed/)
4.  [Players, GMs, and the Screen Between Them](/blog/2026/b-players-gms-screen/)
5.  [Show the Trailer, Keep the Ending](/blog/2026/c-teasers-without-leaks/)
6.  [Don't Hang the Test Shots](/blog/2026/d-media-studio/)
7.  [A Sign Says Please.  A Fence Says No.](/blog/2026/fence-not-a-sign/)
8.  [When the (AI) Memory Lied](/blog/2026/when-the-memory-lied/)

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
