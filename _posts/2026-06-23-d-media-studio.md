---
layout: post
title: Don't Hang the Test Shots
date: 2026-06-23
categories:
  - ttrpg
tags:
  - labyrinthian
  - ttrpg
  - ai-images
  - media
---

A portrait photographer shoots a hundred frames to keep one.

The contact sheet is full of almost-rights:  blinks, half-smiles, a good face with a bad hand.  None of that is failure.  It is the working material the keeper is found in.  But you do not frame the contact sheet, and you do not hand the client the blinks.  The whole craft is knowing the difference between what you keep working on and what you commit to and put on the wall.

Labyrinthian.net's characters wanted faces - portraits, hero shots, scene art.  So the dashboard grew a media studio:  generate character art through an AI image pipeline, sort it in galleries, set a portrait, pin and reorder, give each campaign its own gallery with folder-level access.  Players get likenesses;  the GM gets scenes.  The table stops imagining what everyone looks like and just looks.

The detail that shaped the engineering is that the renders cost money.  This is a paid image API, so every generation is a charge, and a render you paid for is not a thing you casually overwrite.  That single fact set the rules.  Work-in-progress images live in one variants folder and are never referenced by the site - they are the contact sheet.  A finished render gets a stable name.  A re-roll never reuses that name;  it takes a new `-v2` or `-v3` slug, so trying again can never silently wipe the frame you already paid to finish.  And every render saves its prompt in a small file beside it, because the recipe is worth as much as the result.

I will be honest about the ceiling, because the demos never are.  AI image editing is good at volume and bad at the last ten percent.  I drafted one character with an ice-axe rig on his back and spent three follow-up edits trying to get the model to lower it.  It could not.  The best versions are sitting in the variants folder right now, waiting for a human pass, exactly where the contact sheet belongs.  The pipeline gets you eighty frames and a strong start;  it does not get you the one with the hands right.

The discipline is the photographer's, not the machine's.  Generate freely, keep everything, reference nothing until it has earned the wall, and never let a retry destroy a keeper.  The contact sheet is allowed to be full of almost-rights.  That is what it is for - and it is exactly why you do not hang it.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

The studio is a full stack at `/admin/media`:  a generation wizard with hero presets, fal-backed image generation, gallery management (set-as-profile, roles, visibility, pin, reorder, delete, upload), and per-campaign galleries with folder ACL (`Media/` is party-visible, `Media/public/` is public).  Owner-capable `/api/media/*` endpoints back the lightbox controls.  All image work lives inside the campaign vault, not a separate staging tree.

The file rules are canonical (`docs/image-formats.md`).  Each character has `Media/{likeness,gameplay,hero}/` plus a single `Media/Variants/` for WIP that the indexer ignores.  The format ladder is a PNG master with JPEG `display` and `thumb` derivatives - no WebP or HEIC.  Filenames use a stable `<slug>` prefix with a reserved view suffix so variants share a prefix.  Two rules guard the money:  a re-roll uses a new `-v2`/`-v3` slug so a same-slug run cannot wipe the prior PNG, sidecar, and thumb;  and every generation writes a `.prompt.md` sidecar so the prompt survives the image.  Image serving checks an absolute vault path against folder ACL - a relative path returns a misleading 403, which is its own small lesson.

</details>

---

## The Tabletop Dashboard Series

1.  [Two Apps and a Sticky Note](/blog/2026/two-apps-sticky-note/)
2.  [The Painting of Change](/blog/2026/a-painting-of-change/)
3.  [It Didn't Need a New Home, It Needed a Better Window](/blog/2026/ttrpg-dashboard-vault-backed/)
4.  [Players, GMs, and the Screen Between Them](/blog/2026/b-players-gms-screen/)
5.  [Show the Trailer, Keep the Ending](/blog/2026/c-teasers-without-leaks/)
6.  **Don't Hang the Test Shots** *(this post)*
7.  [A Sign Says Please.  A Fence Says No.](/blog/2026/fence-not-a-sign/)
8.  [When the Memory Lied](/blog/2026/when-the-memory-lied/)

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
