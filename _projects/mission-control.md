---
layout: page
title: Mission Control
description: A self-hosted dashboard that gives a single view of every Claude Code project, session, plan, and memory file.
img: assets/img/projects/mission-control/projects-board.png
importance: 2
category: AI and automation
project_status: in-progress
started: 2026-04-16
github: https://github.com/grayminds/mission-control
tags:
  - project
  - claude-code
  - docker
  - dashboard
  - self-hosted
---

## Why

Every Claude Code session leaves valuable exhaust behind:  transcripts, plans, skills, memory files, exported conversations.  None of it had a home.  Across dozens of projects the work scattered into folders, got forgotten, and never compounded into a view of what I had actually built.  Worse, Claude Code rotates and archives its session logs over time, so the history was quietly disappearing - an audit turned up hundreds of deleted session files recoverable only from git.

Mission Control treats that corpus as a portfolio.  It indexes every session, groups them under the projects they belong to, keeps the history even after the source files are cleaned up, and shows the whole picture as one fast dashboard - with no personal content ever leaving the local network.

## How

Mission Control is a self-hosted Docker container:  Node.js and Fastify, server-rendered with Nunjucks and HTMX, so there is no single-page app and no build step.  A SQLite index (better-sqlite3, write-ahead log) is repopulated every fifteen minutes by an indexer that streams Claude Code's JSONL session files.

The schema is two layers on purpose.  Layer one is raw and disposable - directories, sessions, messages, plans, memory, vault notes - rebuilt from scratch on every pass.  Layer two is user-owned and survives every rebuild - projects, tags, milestones, history, and the session-to-project mappings.  That split is what lets the indexer be aggressive without ever destroying curation.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/mission-control/projects-board.png" title="Project board, grouped by status" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/mission-control/timeline.png" title="Session timeline" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">The project board and the session timeline.  All names and paths shown are obfuscated placeholders.</div>

Key capabilities:

- **Organized by project, not by file** - sessions, plans, and notes self-group under their project, in reorderable status buckets:  active, planned, on-hold, completed, and more.
- **A triage queue** - orphan sessions and plans land in an inbox with one-click "merge into" and "sub-project of" pickers, so nothing unsorted is lost.
- **Three conversation sources** - automatic CLI indexing, plus opt-in Claude.ai and ChatGPT imports, on one timeline color-coded by source.
- **History that survives cleanup** - archived sessions stay on the timeline at reduced opacity instead of vanishing when their logs rotate away.
- **A logs tab** - a red, amber, and green health grid where scheduled jobs across machines report in.
- **Local-only AI analysis** - classification and synthesis run against a local model and never reach a hosted API.
- **A sphere view** - projects rendered as a rotatable, status-colored globe.

<details markdown="1">
<summary><strong>Gallery: inside the dashboard</strong></summary>

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/mission-control/projects-list.png" title="Projects list" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/mission-control/project-detail.png" title="Project detail" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/mission-control/plans.png" title="Plans view" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/mission-control/logs.png" title="Logs health grid" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/mission-control/filter.png" title="Timeline filter" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Every screenshot uses obfuscated placeholder data.  No real project names, paths, or transcript content is shown.</div>

</details>

## Result

Mission Control runs self-hosted and updates from git on a schedule.  The code is public on GitHub under an MIT license, with a separate private data repository that keeps all personal content out of the public repo.  It is the meta layer of the larger personal-AI system I am assembling:  the surface that watches every other Claude Code surface.

Shipped so far:  the project, session, plan, and triage dashboard; CLI, Claude.ai, and ChatGPT ingestion; the timeline with archived-session survival; the local classifier and synthesis; a transcript archive that recovered hundreds of rotated logs from git; registry integration that reads the vault project index directly; and the logs tab.  Next on the roadmap:  token-usage and cost indexing, plus further analysis views.

## Technical Details

### Stack

- **Runtime:** Node.js 20 on Alpine, multi-stage Docker, Docker Compose
- **Web:** Fastify 5 with Nunjucks templates, HTMX, and Pico CSS over a custom design system
- **Database:** SQLite via better-sqlite3 (write-ahead log, foreign keys on)
- **AI:** any OpenAI-compatible local endpoint (LM Studio, Ollama); never a hosted API
- **Scheduling and ops:** node-cron for the fifteen-minute reindex; PowerShell and Bash for the sync and update scripts

### Design decisions

- **Single source of truth shared with the vault.** The dashboard reads the same project-index files the Obsidian Base view reads, so the vault, the table view, and the dashboard agree with no manual sync.
- **Two-layer schema.** Raw data is rebuilt every pass while curation is preserved; the indexer can be destructive on layer one precisely because layer two is untouchable.
- **Code and data separated for privacy and shareability.** The public code repo carries zero personal content and ships with placeholder projects; the private data repo is mounted read-only.
- **No hosted API for corpus analysis, ever.** If the local model is unreachable the feature degrades to a no-op rather than reaching out.  The raw transcripts are the durable record; the database is only a query layer over them.
- **Winner-takes-all mapping, hardened against false positives** - bounded-regex path rules, a shared stopword list, a confidence floor, and merge tombstones, each rule tied to a specific bad match it fixed.
