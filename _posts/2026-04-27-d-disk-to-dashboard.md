---
layout: post
title: "Mission Foundations: From Disk to Dashboard"
date: 2026-04-27
categories:
  - mission-control
tags:
  - claude-code
  - indexer
  - sqlite
  - data-architecture
  - khimai
---
The first three posts in this series named the problem and the foundations.  This one is about the pipeline.  How the bits move from the brain side to the code side, get parsed by the dashboard, and survive the next reindex without losing the curation I have layered on top.

If the workshop hour decided where the tools go, this post is about the bench's lower drawer.  Not flashy, not visible from across the room, and load-bearing for everything that happens above it.

## Two Repos, One System

Mission Control is two git repositories, not one, and the split is deliberate.

- **Code repo.**  Public and open source.  Holds the Node.js application:  Fastify routes, Nunjucks templates, the SQLite schema in `lib/db.js`, the indexer in `lib/indexer.js`, the docker-compose file, the deploy scripts.  Anyone can clone it.  None of my data is in it.
- **Data repo.**  Private, on a self-hosted Gitea instance.  Holds my actual content:  a mirror of `~\.claude\` (sessions, plans, skills, agents), an optional vault mirror, the curation snapshot as `dashboard-curation.sql`, the seed files for tags and shorthand mappings (`indexer-rules.json`, `quick-links.json`, `automation-shorthand.json`), and the automation-log JSONL files under `logs/YYYY-MM.jsonl`.

The two repos meet in two places.  On the workstation, `Sync-DataRepo.ps1` runs after a working session:  robocopy with an allowlist (`projects/`, `plans/`, `skills/`, `agents/`, `plugins/`, `web-export/`), explicit excludes for sensitive files (`.credentials.json`, `settings.json`, `.claude.json`), then `node scripts/dump-curation.js --out dashboard-curation.sql` to capture Layer 2.  Git commit, git push, done.  On the NAS, `scripts/nas-update.sh` pulls both repos, rebuilds the docker image if the code changed, runs `node indexer.js --full`, then runs `node scripts/restore-curation.js` to overlay the curation back on top.

Why split them?  Three reasons.  Privacy:  the code is shareable, the data is not.  Reproducibility:  someone else can clone the code and run an empty Mission Control without inheriting my project list.  Sync rhythm:  code changes on a feature cadence, data churns every fifteen minutes.  Mixing them would force one rhythm on both.

## Layer 1, Layer 2

The schema has two layers.  Once you see them, the rest of the dashboard makes sense.

**Layer 1** is raw signal from disk.  Every reindex rebuilds it.  Examples:  the `sessions` table (parsed from JSONL files in `~\.claude\projects\<slug>\`), the `plans` table (parsed from `~\.claude\plans\`), the `vault_notes` table (parsed from frontmatter in the vault), and the `automation_logs` table (parsed from `mission-control-data\logs\YYYY-MM.jsonl`).  Layer 1 is replaceable.  If it gets corrupted, I drop it and rerun the indexer.

**Layer 2** is human curation.  The mappings I have made by hand, the project records I have edited in the UI, the tags and milestones, the shorthand display names, the project-to-session assignments.  Layer 2 must outlive every reindex.

The schema implements that contract through join tables and a `curation_source` column.

| Layer 1 (raw) | Layer 2 (curated) | The bridge |
|---|---|---|
| `sessions` | `project_sessions` | `mapped_by = 'auto' \| 'manual'` plus a confidence score |
| `plans` | `project_plans` | same |
| `vault_notes` | `project_vault_notes` | same |
| `automation_logs` | `automation_shorthand` | `shorthand_name` join + cadence thresholds |
| `projects` (raw shape) | `projects.curation_source` | values:  `auto`, `manual`, `registry`, `runsheet`, `manual-pipeline`, `promoted-from-triage` |

Every upsert that touches `projects` runs through a `CASE WHEN projects.curation_source = 'manual' THEN preserve_old_value ELSE use_new_value` guard.  Same idea on `automation_shorthand`:  `INSERT OR IGNORE` so a manual edit in the UI is not blown away by the next reseed from JSON.

The result is a dashboard that survives a wipe-and-reindex without erasing the part I actually built by hand.

## From `index.md` to Dashboard

Wave 3 of Mission Control (applied 2026-04-23) made the vault registry the source of truth for projects.  The pipeline is two passes plus a few guard rails.

**Pass 1:  `buildProjectsFromRegistry()`** in `lib/indexer.js`.  Walks `$VAULT/50_projects/<slug>/index.md`, parses the seven KHIMAI registry fields from frontmatter (`type: project`, `slug`, `path`, `domain`, `status`, `has-claude-md`, `last-active`), and upserts each one into `projects` with `curation_source = 'registry'`.  The CASE-guard on `manual` rows protects user-edited fields from being overwritten by the registry value.

**Pass 2:  `buildProjectsFromRunsheet()`**.  Falls through for any project that does not yet have a registry `index.md` but does appear in `50_projects/PROJECT-RUNSHEET.md`.  This is the legacy path, kept alive because the runsheet predates the registry.  Two safety checks:  `runsheetSlugOverrides` from `mission-control-data/indexer-rules.json` redirects long legacy slugs to canonical short slugs so the runsheet does not recreate the duplicates Wave 3 cleaned up; and the `merged_projects` tombstone table prevents a previously merged slug from coming back from the dead.

The same pattern applies to other surfaces.  `seedAutomationShorthand()` reads `mission-control-data/automation-shorthand.json` into the `automation_shorthand` table with `INSERT OR IGNORE`.  `buildAutomationLogsFromDataRepo()` ingests JSONL rows into `automation_logs` with `ON CONFLICT(id) DO NOTHING`, where `id` is `SHA256(machine_name || logged_at || shorthand_name)` so a replay is idempotent.

One file in the vault, one row in the registry table, both surfaces (Obsidian Base view and Mission Control dashboard) reading the same source.  That is the whole story of how a project exists.

## The Web Side, Folded In

Claude Code is not the only place I work with Claude.  Browser conversations on claude.ai are a separate surface, behind a manual export, in a different format.  Mission Control merges them into the same project timeline.

The flow:  download the claude.ai export ZIP, drop the `conversations.json` into `$CLAUDE_DATA_PATH/web-export/`, run `node indexer.js --full`.  `importWebExport()` parses the array, extracts `uuid`, `name`, `created_at`, `updated_at`, the `chat_messages` array, the human and assistant turn counts, and the first 300 characters of the opening message as `first_message`.  Each conversation lands in the `web_conversations` table with `source = 'claude'`.

Two practical notes.  The export is manual; I run it about once a week.  Cadence is the only reason to ever go red on this surface, and the dashboard would happily show me that I have not exported in twenty days.  And `web_conversations` joins to `projects` the same way sessions do, through a `project_web_conversations` curation table, so I can pin a browser thread to the project it actually belongs to.

## What This Buys

In short:  one schema, two layers, two repos, two ingestion paths, one curation overlay that survives any of them being wiped.  When I need to throw away the database and rebuild from disk, I run `node indexer.js --full && node scripts/restore-curation.js` and the dashboard comes back with my project boundaries, my session mappings, and my shorthand cadences intact.

The room runs.  The next post is about what I do inside it on a normal Tuesday.

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*

## Read More

The next post covers the daily loop:  the triage workbench for sessions without a project home, and the green / amber / red status grid that catches scheduled jobs before they fail silently.  [Mission Foundations: Operating the Room](/blog/2026/e-operating-the-room/).

## Mission Control Series

1.  [Entropic Drift](/blog/2026/a-entropic-drift/)
2.  [Mission Foundations: Where Things Live](/blog/2026/b-mission-foundations/)
3.  [Mission Foundations: Behind the Curtain](/blog/2026/c-mission-foundations-tech-specs/)
4.  **Mission Foundations: From Disk to Dashboard** *(this post)*
5.  [Mission Foundations: Operating the Room](/blog/2026/e-operating-the-room/)
6.  [Beyond Mission Control: KHIMAI](/blog/2026/f-beyond-mission-control-khimai/)
