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

My assistant writes a transcript of every working session - the full raw record of what was said and done.  My dashboard reads those transcripts into a tidy database, and for a while I treated that database as the record.  It was the thing I queried, the thing that felt like the truth, and the raw files underneath started to feel like scaffolding I could clear away.

Then two facts collided.  The assistant rotates old transcripts off my machine after about two months, to stay tidy.  And I had set up a sync that mirrors that folder into a backup - and a mirror, by definition, copies deletions too.  So the cleanup deleted a transcript, and my dutiful mirror removed it from the backup as well.  The mirror was doing exactly what a mirror does.  My mistake was pointing a thing that copies deletions at something I needed to keep.

The fix was two disciplines.  The mirror keeps tracking what is on my machine right now, deletions and all.  But beside it now sits an archive with the opposite rule:  it only ever adds.  Anything that lands there stays, forever, no matter what happens upstream.  And the database got demoted - it is no longer the record, it is an index over the record, something I am allowed to throw away and rebuild.  Once the raw transcripts are the durable thing, I can improve the parser and regenerate the whole database without fear.

That still left the transcripts the mirror had already deleted.  This is the part I did not expect to work:  those deletions had all been committed to version history along the way, and version history does not forget a file when a later change removes it - it just stops showing it.  So I wrote something that walks back through that history, finds every transcript ever deleted, and lifts it into the only-adds archive.  It found 344 and restored 343;  one was already safe, and none failed.

The lesson I would hand to anyone keeping records that matter:  ask one question - if I regenerated my database from scratch tomorrow, what would I be unable to rebuild.  Whatever the answer is, that is your real record, and it is almost always the raw input, not the polished output.  Keep that somewhere that only adds and never deletes.  Everything downstream can then be rebuilt, which means it can be improved.  Mirror the present, archive the past, and never aim a deleting mirror at the one box you cannot refill.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

This is part of Mission Control, the dashboard I have written about across this series.  The data repository now holds two parallel trees.  One is a mirror that tracks the live transcript folder.  The other is an additive archive, written in the same sync pass with a copy-newer rule and no purge, so it accumulates instead of tracking.  A short README in the archive states the discipline:  append-only by convention, do not hand-edit.

The recovery tool walks the data repository's version history for deleted transcript paths and restores them into the archive.  It supports a dry run and a fetch flag, so run on the internal network it pulls commits from my other machines first and includes transcripts archived elsewhere.  The live run found 344 deleted paths, restored 343, skipped 1 already present, and failed on none - around 900 files total, committed and pushed to a private server so the record is durable and shared across machines rather than stranded on one.

Two rules sit underneath.  Raw transcripts are the system of record and are never reconstructed by asking a model what a lost session probably contained;  recovery comes from version history, not invention.  And any analysis over these transcripts runs on a local model, never a hosted one, because these are the most personal records I have and keeping them means keeping them mine.  One honest gap remains:  the dashboard does not yet read the archive as a source, so a recovered session will not reappear in the interface until that change ships.  The files are safe today.  The view catches up next.

</details>

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*

## Mission Control Series

1.  [Entropic Drift: Why Complex Work Needs a Mission Control](/2026/04/26/a-entropic-drift-mission-control/)
2.  [Where Things Live: Structuring Claude Code, Obsidian, and a Voice Contract](/2026/04/26/b-where-things-live/)
3.  [Two Repositories, One System: Why Mission Control Splits Code From Data](/2026/04/26/c-two-repositories-one-system/)
4.  [Layer 1 and Layer 2: Truth From Disk vs Meaning From the User](/2026/04/26/d-layer1-layer2-schema/)
5.  [From index.md to Dashboard: One Source of Truth, Two Surfaces](/2026/04/26/e-index-md-to-dashboard/)
6.  [Sessions Without Homes: The Triage, Merge, and Archive Workbench](/2026/04/26/f-sessions-without-homes/)
7.  [Green, Amber, Red: Logging Scheduled Jobs So They Cannot Fail Silently](/2026/04/26/g-logging-scheduled-jobs/)
8.  **Keeping the Transcripts** *(this post)*
