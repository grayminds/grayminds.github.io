---
layout: page
title: Photo Archive Consolidation
description: Organizing and deduplicating 25 years of digital photos across backup drives and NAS storage using Claude Code automation.
img:
importance: 2
category: archival
project_status: in-progress
started: 2026-03-01
tags:
  - project
  - photo-organization
  - claude-code
  - digital-preservation
---

## Why

Everyone has a digital closet. Mine spans 25 years of digital photography scattered across backup drives, NAS volumes, laptop migrations, and phone sync folders. The same photos exist in multiple places with different filenames. Albums from the same trip are split across three directories. Folder names range from descriptive ("2014 Vacation Outer Banks") to useless ("Camera Upload" or "New Folder (2)"). Plus there are backups of backups.

I had been putting off this consolidation for years because the scale of the problem made it feel manual and tedious. Thousands of photos, no consistent naming, no reliable deduplication. The kind of project that sits on a to-do list permanently.

## How

I pointed Claude Code at the problem. The approach was systematic:

1. **Discovery** -- Scan all source locations (backup drives, NAS directories, local folders) and build an inventory of every image file with its metadata
2. **Deduplication** -- Identify duplicate files using content hashing, not just filename matching. Same photo with different names gets caught; different photos with the same name get preserved
3. **Date grouping** -- Organize photos by date using EXIF metadata (date taken), falling back to file modification date when EXIF is missing
4. **Album labeling** -- Automatically label groups based on geolocation data embedded in the photos, turning GPS coordinates into meaningful place names
5. **Consolidation** -- Move the deduplicated, organized collection to the target location on the Synology NAS

Claude Code handled the menial lifting. I pointed it in the right direction, reviewed the proposed organization, and approved the moves. This is intelligent automation: the AI does the repetitive scanning, hashing, and sorting while the human makes the judgment calls about what matters.

## Result

The consolidation is ongoing, but the pattern is established. Photos are grouped by date, labeled by location, and deduplicated across sources. What used to be a sprawl of redundant copies across multiple drives is becoming a single organized archive on the NAS.

The unexpected benefit is rediscovery. When photos are scattered and disorganized, you stop looking at them. When they are sorted and browsable, you find things you forgot you had. Trips you haven't thought about in a decade. People in contexts you don't remember. The organization itself is a form of recovery.

<details markdown="1">
<summary><strong>Technical Details</strong></summary>

### Source Locations

- Local backup drives (accumulated across laptop and desktop migrations)
- Synology DS920+ NAS ("APEX" at 10.10.10.10) -- multiple share volumes
- Phone sync folders (various Android and iOS backup directories)
- Legacy photo directories with inconsistent naming conventions

### Deduplication Strategy

- **Primary:** SHA-256 content hash of file bytes (catches exact duplicates regardless of filename)
- **Secondary:** Perceptual hashing for near-duplicates (same photo at different resolutions or compression levels)
- **Conflict resolution:** When duplicates are found, the copy with the best metadata (most complete EXIF, highest resolution) is kept as canonical

### Organization Schema

```
Photos/
  YYYY/
    YYYY-MM-DD Location Name/
      original_filename.jpg
```

- Year extracted from EXIF DateTimeOriginal, falling back to file modification date
- Location derived from EXIF GPS coordinates via reverse geocoding
- Original filenames preserved within organized directories for traceability

### Metadata Handling

- **EXIF extraction:** Date taken, GPS coordinates, camera model, orientation
- **Reverse geocoding:** GPS coordinates converted to city/region names for album labels
- **Missing metadata:** Files without EXIF data are grouped by file date and flagged for manual review

### Tools and Environment

- **Execution:** Claude Code (Opus) running locally on Windows 11
- **Language:** Python scripts generated and executed on the fly
- **Key libraries:** Pillow (EXIF extraction), imagehash (perceptual hashing), geopy (reverse geocoding)
- **Storage target:** Synology NAS via mapped drive
- **Scale:** Tens of thousands of images across multiple terabytes of source material

### Replication Notes

If you want to tackle your own photo consolidation:

1. Inventory all source locations first; do not start moving files until you have the full picture
2. Use content hashing (not filenames) for deduplication; you will be surprised how many duplicates have different names
3. EXIF metadata is your best friend for dating and locating photos; files without it will require manual sorting
4. Work in stages: inventory, deduplicate, organize, then move. Do not combine steps
5. Keep a log of every move operation for rollback if needed
6. Prompt for Claude Code: "Scan [directory] for all image files. Build an inventory with file hash, EXIF date, GPS coordinates, and file size. Identify duplicates and propose an organization by date and location."

</details>
