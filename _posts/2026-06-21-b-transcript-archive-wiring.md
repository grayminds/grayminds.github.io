---
layout: post
title: Wiring the Transcript Archive
date: 2026-06-21
categories:
  - mission-control
tags:
  - claude-code
  - observability
  - data-privacy
  - khimai
---


This is the build companion to [Keeping the Transcripts](/blog/2026/a-keeping-the-transcripts/).  That post tells the story:  the assistant rotates transcripts off the machine after about two months, a deletion-copying mirror propagated that cleanup into the backup, and an append-only archive plus a version-history recovery run brought the record back.  This one carries the wiring - the prompt to replicate the audit, the two-tree sync design, the recovery tool, and the rules that govern the whole thing.  It is part of Mission Control, the dashboard I have written about across this series.

## The prompt

Paste this into your agent on any setup where session transcripts, logs, or other raw records feed a downstream store.  It carries the design constraints so your agent does not have to rediscover them the way mine did:

```text
My agent harness writes session transcripts to a local folder, and the
harness rotates old transcripts off the machine after a retention window.
Audit my setup for silent permanent loss, then fix it.

Steps:
1. Locate the transcript folder and every sync, backup, or mirror job
   pointed at it (scheduled tasks, cron jobs, sync-client folder pairs,
   repo-based backups).  List each one and state whether it propagates
   deletions.
2. Flag any job that mirrors deletions over data that cannot be
   regenerated.  Rotation upstream plus a deletion-copying mirror
   downstream equals permanent loss on a timer.
3. Keep the mirror as-is - it tracks the present.  Beside it, create an
   append-only archive tree written in the same sync pass with a
   copy-newer rule and no purge step, so it only ever accumulates.
   Add a short README stating the discipline:  append-only by
   convention, do not hand-edit.
4. Walk the backup repository's git history for transcript paths that
   were deleted by later commits.  Git does not forget a file when a
   commit removes it;  enumerate every such path.
5. Restore the deleted transcripts into the archive tree - DRY RUN
   FIRST.  Print the full list of what would be restored, wait for my
   approval, then run live and report found / restored / skipped /
   failed counts.
6. Never reconstruct a missing transcript by asking a model what the
   session probably contained.  Recovery comes from version history
   or nowhere.
```

## Two trees, one repository

The data repository now holds two parallel trees over the same transcript set, with opposite rules:

| Tree | Rule | Job |
|---|---|---|
| Mirror | Tracks the live transcript folder, deletions included | An honest picture of what is on the machine right now |
| Archive | Copy-newer, no purge, written in the same sync pass | Accumulates forever;  nothing upstream can remove anything from it |

The mirror stays a mirror on purpose.  Its value is fidelity to the present, and a mirror that half-tracks deletions is worse than either discipline done cleanly.  The archive carries the opposite contract:  every sync pass copies files that are new or newer than what the archive holds, and no step ever purges.  Rotation upstream simply stops updating an archived file;  it cannot reach in and remove it.

Both trees are written by the same sync pass, so there is no second scheduled job to rot independently.  A short README sits at the archive root stating the discipline - append-only by convention, do not hand-edit - because a convention nobody wrote down is a cleanup sweep waiting to happen.

The database the dashboard reads is explicitly downstream of all this.  It is an index over the archive, not a record, and it is allowed to be dropped and rebuilt from the raw transcripts at any time.  That demotion is what makes parser improvements safe:  regenerate the whole thing, compare, keep the better one.

## The recovery tool

The append-only tree protects transcripts from the day it exists.  It does nothing for the transcripts the mirror had already deleted.  Those came back through version history.

Every state of the mirror had been committed to the data repository along the way, and git retains a file's content even after a later commit deletes it - the file just stops appearing in the working tree.  The recovery tool walks the repository's history for transcript paths that were deleted by later commits and restores each one into the archive tree.

Two flags shape a run:

- **Dry run.**  The tool enumerates and prints everything it would restore without writing a byte.  I read the list before the live run touched anything.
- **Fetch.**  Run on the internal network, the tool pulls commits from my other machines first, so the walk covers transcripts that were archived elsewhere, not just this workstation's history.

The live run found 344 deleted transcript paths, restored 343, skipped 1 already present in the archive, and failed on none - around 900 files total once restored, committed, and pushed to a private server.  Durable and shared across machines, rather than stranded on one.

## The two rules underneath

Two rules govern everything above, and they are worth stating harder than any mechanism:

1. **Raw transcripts are the system of record, and they are never reconstructed by asking a model what a lost session probably contained.**  Recovery comes from version history, not invention.  A plausible transcript is worse than a missing one, because a missing one at least tells the truth about itself.
2. **Any analysis over these transcripts runs on a local model, never a hosted one.**  These are the most personal records I have, and keeping them means keeping them mine.

## The honest gap

One gap remains, and it belongs in the record rather than under it:  the dashboard does not yet read the archive as a source.  A recovered session is safe on disk and in the repository, but it will not reappear in the interface until that change ships.  The files are safe today.  The view catches up next.

For the story - why the database got demoted, what the archivist's question is, and what you should ask of your own records - go back to [Keeping the Transcripts](/blog/2026/a-keeping-the-transcripts/).

---

*This post was created with AI assistance.  I used AI tools to restructure an earlier post of mine into this two-part form, and for editing.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
