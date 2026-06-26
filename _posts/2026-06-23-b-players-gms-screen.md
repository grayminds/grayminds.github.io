---
layout: post
title: Players, GMs, and the Screen Between Them
date: 2026-06-23
categories:
  - ttrpg
tags:
  - labyrinthian
  - ttrpg
  - access-control
  - security
---

At the table there is a cardboard screen the game master sits behind.

The players cannot see what is back there:  the monster's hidden health, the trap on the next room, the note about who the friendly innkeeper really works for.  The screen is not decoration.  It is the one piece of the game that makes surprise possible, and it works because the cardboard is genuinely opaque.  No player has ever leaned over and read the GM's notes by accident, because there is nothing to lean over.  The secret is not hidden.  It is unreachable.

Labyrinthian.net started as a single-player character sheet, so it had no screen at all.  The moment it became multiplayer - real accounts, the whole table signed in - it needed one.  Each player owns their own characters.  The game master sees everything.  And every player sees only their own sheets plus whatever the campaign has marked public.  That line between the two is the cardboard screen, rebuilt in code.

The thing I had to get right is that the screen is a security boundary, not a setting.  The easy version hides GM content with a display rule:  the data is in the page, just styled out of view.  That is not a screen.  That is a tablecloth thrown over the GM's notes, and any player who looks at what the server actually sent can lift it.  So the redaction happens on the server, before a single byte leaves:  a player's request is answered with a copy of the world that has the GM's secrets removed, not hidden.  GM-authored NPCs, private notes, and game-master entries in the shared feed are stripped out server-side.  When players co-author a scene, a player's contribution can never fold in a detail they were never allowed to see, because the version they are working from never contained it.

The lesson generalizes past games.  Any privacy that lives in the interface is decoration, and decoration comes off.  If the rule is "this person must not see that," the place to enforce it is the server, in the data, before it ships - not the template, not a CSS class, not a hope that nobody opens the network tab.  Build the boundary where it cannot be leaned over.

The cardboard screen worked because the players physically could not get behind it.  The software version has to earn that same impossibility, byte by byte, on every request.  When it does, the surprise survives - and surprise is the whole reason the table showed up.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

Auth is account-based (Cloudflare D1, accounts keyed by GUID), with a campaign-membership model on top.  The access rules are owner-plus-roles:  a player owns their characters, a GM or admin sees all, and any object (character, NPC, place) can carry a public toggle.  NPCs and places get first-class dashboards of their own, routed at `/d/<slug>`, scoped without a base.

Redaction is server-side and per-viewer.  The hot path is a projection step (`projectEntryForViewer` / `redactGenHistory`) that runs before serialization, so a non-GM viewer receives a structurally smaller object - GM entries and GM-authored contributions are dropped, not flagged.  Vote tallies collapse to an aggregate count plus a viewer-scoped `youVoted`, so a list of names never leaks an identity.  Image access is gated the same way:  `/api/image` takes an absolute vault path and checks folder ACL (party vs public) before serving.

The honest part:  the boundary took iterations to get right.  One early audit flagged a real ACL leak (a resolved bug), alongside a couple of reported "leaks" that turned out to be misreads.  The test that matters is adversarial - sign in as a member, with that member's own GUID, and try to reach what the GM can see.  A boundary you have not attacked from the player's seat is a boundary you are only assuming holds.

</details>

---

## The Tabletop Dashboard Series

1.  [Two Apps and a Sticky Note](/blog/2026/two-apps-sticky-note/)
2.  [The Painting of Change](/blog/2026/a-painting-of-change/)
3.  [It Didn't Need a New Home, It Needed a Better Window](/blog/2026/ttrpg-dashboard-vault-backed/)
4.  **Players, GMs, and the Screen Between Them** *(this post)*
5.  [Show the Trailer, Keep the Ending](/blog/2026/c-teasers-without-leaks/)
6.  [Don't Hang the Test Shots](/blog/2026/d-media-studio/)
7.  [A Sign Says Please.  A Fence Says No.](/blog/2026/fence-not-a-sign/)
8.  [When the (AI) Memory Lied](/blog/2026/when-the-memory-lied/)

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
