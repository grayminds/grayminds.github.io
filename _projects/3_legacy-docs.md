---
layout: page
title: Legacy Document Conversion
description: Converting decades of documents from dead formats (PFS First Choice, Microsoft Works, WordPerfect, early Word) into searchable markdown.
img:
importance: 2
category: archival
project_status: completed
started: 2026-03-01
completed: 2026-03-08
tags:
  - project
  - document-conversion
  - claude-code
  - digital-preservation
---

## Why

I have files from the golden age of home computers. Documents written in PFS First Choice, Microsoft Works, WordPerfect, early Microsoft Word, and CorelDraw. Formats from applications I had completely forgotten existed. These survived every platform transition because of being organized - copying forward as one platform was discarded to the next.

But, they outlasted the applications that created them and the operating systems those applications ran on. They were basically unopenable. Locked in format obsolescence. The traditional recovery path is a project in itself: hunt for conversion utilities, hope they still exist, upload personal documents to some random website offering free format conversion. Repeat for every file, every format, every era of software. I wanted a better way.

## How

I gave Claude Code the folder. "Convert these to markdown." Okay, it was quite a bit more complicated.

It identified the formats and converted the content. PFS First Choice, a DOS-era integrated suite, became clean markdown. WordPerfect documents with their proprietary formatting codes became structured text. Microsoft Works files came through intact. No hunting for converters. No uploading to unknown services. No per-file babysitting.

Claude also pulled the original file timestamps so each converted document retained the date it was created. Context matters. A high school essay from 1992 should be dated 1992.

But, the actual process was a bit more complicated. Some files had Microsoft Equation Editor which Microsoft locked down due to security issues (and all attempts at conversion were unacceptable results). Other files came in sentence, line break, sentence and not in paragraph format - which required more Claude code instructions to correct. Claude Code also handled building the frontmatter details for long term reference.

## Result

Over 2,500 markdown files now live in my Obsidian vault, organized by era and institution. High school writing. Undergraduate work at Ohio State. An AT&T internship. A General Motors internship. Graduate coursework at Georgia Tech. Files spanning a decade of education, all searchable, linkable, and part of a living knowledge base.

The recovered documents are a timeline. High school writing is earnest and overwrought. Undergraduate work shows the first attempts at structured argument. Graduate writing is tighter, shaped by professors who would not tolerate filler. None of it needs to be published. But the patterns are visible. You can trace a line from a college essay about human-computer interaction to a career spent building systems at that exact intersection.

These documents are no longer trapped in amber. They are part of the personal experience.

<details markdown="1">
<summary><strong>Technical Details</strong></summary>

### Formats Encountered

| Format           | Era             | Application                           | Notes                                                                       |
| ---------------- | --------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| PFS First Choice | Late 1980s      | PFS:First Choice (DOS)                | Integrated suite with word processor, database, spreadsheet, communications |
| Microsoft Works  | Early 1990s     | Microsoft Works 2.0-3.0 (DOS/Windows) | `.wps` files with proprietary binary format                                 |
| WordPerfect      | Early-mid 1990s | WordPerfect 5.1-6.0                   | `.wpd` files with reveal codes formatting                                   |
| Microsoft Word   | Mid 1990s       | Word 6.0, Word 97                     | `.doc` files (OLE compound document format)                                 |
| CorelDraw        | Mid 1990s       | CorelDRAW 3-5                         | `.cdr` vector graphics with embedded text                                   |

### Conversion Process

1. **Recursive directory scan** -- Claude Code walked the source directories identifying files by extension and binary signature
2. **Format detection** -- For ambiguous files (no extension, wrong extension), Claude inspected file headers and magic bytes to determine the actual format
3. **Content extraction** -- Each format required different parsing logic:
   - PFS First Choice: Custom binary parsing of the proprietary record format
   - Microsoft Works: Binary `.wps` format parsing
   - WordPerfect: Reveal codes interpretation, stripping formatting commands while preserving text structure
   - Early Word: OLE compound document extraction
4. **Markdown generation** -- Extracted text converted to clean markdown with headings, paragraphs, and lists preserved where the original formatting indicated structure
5. **Metadata preservation** -- Original file creation/modification timestamps applied to frontmatter `created` fields
6. **Organization** -- Files sorted into subdirectories by institution and date range

### Scale

- **Input:** Multiple directories of legacy files spanning 1989-2000
- **Output:** 2,500+ markdown files
- **Organization:** Sorted by era (1992-1997 Ohio State, 1995 AT&T, 1996 GM, 1997-2000 Georgia Tech, plus earlier archives)
- **Artifacts:** Migration records and archive inventories generated for provenance tracking

### Tools and Environment

- **Execution:** Claude Code (Opus) running locally on Windows 11
- **Language:** Python scripts generated on the fly
- **Storage:** Obsidian vault at D:\brain, synced to Synology NAS via Synology Drive
- **No external services** -- All conversion happened locally; no files were uploaded anywhere

### Replication Notes

If you have your own legacy document archives:

1. Consolidate all files into a working directory (preserving original folder structure if meaningful)
2. Use Claude Code with filesystem access
3. Prompt: "These are old documents from [era/applications]. Convert them to markdown, preserving timestamps and organizing by date."
4. Review a sample of conversions to verify quality; some formats may lose complex formatting (tables, embedded images)
5. For WordPerfect specifically, formatting codes like bold/italic/underline convert well; columns and advanced layouts may need manual cleanup

</details>
