---
layout: post
title: Keeping the Transcripts
date: 2026-06-21
categories:
  - mission-control
tags:
  - claude-code
  - observability
  - data-privacy
  - khimai
---


An archivist keeps the original, even after the catalog is written.

The card in the drawer is not the letter.  The summary is not the deed.  A serious archive keeps the raw document forever, because every catalog is an interpretation, and interpretations get revised.  The day someone asks a question the old catalog never anticipated, the only thing that can answer is the original, sitting in the box where it was put.

This post is the plain-language version of how I nearly lost that box, and what replaced it.  If you want the wiring - the two-tree sync design, the recovery tool, and a paste-ready prompt to audit your own setup - the companion post [Wiring the Transcript Archive](/blog/2026/b-transcript-archive-wiring/) has all of it.

## The problem

My assistant writes a transcript of every working session - the full raw record of what was said and done.  My dashboard reads those transcripts into a tidy database, and for a while I treated that database as the record.  It was the thing I queried, the thing that felt like the truth, and the raw files underneath started to feel like scaffolding I could clear away.

Then two facts collided.  The assistant rotates old transcripts off my machine after about two months, to stay tidy.  And I had set up a sync that mirrors that folder into a backup - and a mirror, by definition, copies deletions too.  So the cleanup deleted a transcript, and my dutiful mirror removed it from the backup as well.  The mirror was doing exactly what a mirror does.  My mistake was pointing a thing that copies deletions at something I needed to keep.

## The approach

The fix is not a smarter mirror.  It is two disciplines with opposite rules, running side by side.

The mirror keeps its job:  track what is on my machine right now, deletions and all.  A mirror of the present is useful, and it stays honest by staying a mirror.  But beside it now sits an archive with the opposite rule:  it only ever adds.  Anything that lands there stays, forever, no matter what happens upstream.

And the database got demoted.  It is no longer the record - it is an index over the record, something I am allowed to throw away and rebuild.  Once the raw transcripts are the durable thing, I can improve the parser and regenerate the whole database without fear.  Mirror the present, archive the past, and treat everything derived as disposable.

## The solution

Two pieces made that real.

First, the backup now holds two parallel trees.  One tracks the live transcript folder exactly, the way it always did.  The other accumulates:  every sync pass copies anything new or newer into it and never removes a thing.  A short note in the archive states the discipline plainly - append-only, do not hand-edit - so future me does not "clean it up" into the same hole.

Second, the transcripts the mirror had already deleted.  This is the part I did not expect to work.  Those deletions had all been committed to version history along the way, and version history does not forget a file when a later change removes it - it just stops showing it.  So I wrote a tool that walks back through that history, finds every transcript ever deleted, and lifts each one into the only-adds archive.  It rehearses the whole run as a dry run first, so I could read the list of what it would restore before it touched anything.

## The outcome

The recovery run found 344 deleted transcript paths.  It restored 343, skipped 1 that was already safe in the archive, and failed on none.  Every session record the cleanup-plus-mirror combination had erased is back in the box, and the box no longer has a mechanism that empties it.

The lesson I would hand to anyone keeping records that matter:  ask one question - if I regenerated my database from scratch tomorrow, what would I be unable to rebuild.  Whatever the answer is, that is your real record, and it is almost always the raw input, not the polished output.  Keep that somewhere that only adds and never deletes.  Everything downstream can then be rebuilt, which means it can be improved.  Mirror the present, archive the past, and never aim a deleting mirror at the one box you cannot refill.

For the build - the sync rules, the recovery tool's behavior, the governing rules, and the prompt you can paste into your own setup - continue to [Wiring the Transcript Archive](/blog/2026/b-transcript-archive-wiring/).

---

*This post was created with AI assistance.  I used AI tools to restructure an earlier post of mine into this two-part form, and for editing.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
