---
layout: page
title: Labyrinthian
description: A vault-backed character and game-master dashboard for tabletop RPG sessions, running in production on Cloudflare.
img: assets/img/projects/ttrpg-dashboard/dashboard-overview.png
importance: 1
category: AI and automation
project_status: in-progress
started: 2026-05-22
permalink: /projects/labyrinthian/
tags:
  - project
  - ttrpg
  - cloudflare
  - claude-code
  - obsidian
---

<div class="text-center my-4">
  <a class="btn btn-primary btn-lg" href="https://labyrinthian.net/" target="_blank" rel="noopener noreferrer">Open the live app at labyrinthian.net</a>
</div>

## Why

Tabletop sessions ask a lot of a table.  Players need character sheets that stay current.  Game masters need encounter tools, NPC notes, and a way to reveal information at the right moment.  Most groups stitch this together from two or three apps and a pile of sticky notes.  My Daggerheart group already kept its characters, lore, and house rules in an Obsidian vault, so I wanted one surface that read from that vault directly instead of asking everyone to re-enter the same data somewhere else.

A vault is a fine place to write.  It is a poor place to play.  During a session nobody wants to scroll a folder tree to find a combat move.  They want the moves, defenses, inventory, and trackers laid out as a dashboard they can read at a glance.  They also should not all see the same thing:  a player sees their own sheet, the game master sees everything including the secrets, and a spectator can look without touching.  That split is the product.

## How

Labyrinthian runs as a server-rendered Astro application on Cloudflare Workers, with the Obsidian vault itself as the data store.  Markdown, YAML frontmatter, and Obsidian `.base` files live as objects in Cloudflare R2; the app reads them through a single storage interface, so moving from a local folder to R2 was a backend swap rather than a rewrite.  Obsidian stays a valid editor of the exact same files.  No database owns the content and locks the vault out.

Identity, sessions, and the access-control records live in Cloudflare D1, SQLite at the edge.  Every surface - an object, a tab, a single panel - is gated by a per-resource grant, qualified by campaign, nearest-explicit-wins.  There is no special "hide from the owner" rule; a game-master secret is simply something the player holds no grant to see.  The character sheet itself is a draggable widget grid, with a separate saved layout per character, per tab, and per visibility level, written back into the vault as a sidecar note.

Key capabilities:

- **Vault-backed, files-canonical** - reads the Obsidian vault directly; Obsidian remains a working editor; no content is trapped in a database.
- **Per-resource access control** - player, game master, and read-only spectator roles, plus public, with account identities redacted server-side so a spectator never learns who another player is.
- **Draggable per-tab dashboards** - a fine-grained grid with grow-to-content panels and a structure mode that snapshots layouts so edits revert or commit cleanly.
- **No-code panel authoring** - new panels are built through a composer that writes a vault note, never a code change.
- **Game master command center** - cross-character rosters, NPC and place dashboards, a confidential tab with owner-controlled share-back, and live campaign state kept in a separate production-only file so a content deploy never resets it mid-session.
- **Offline generators** - a Daggerheart dice roller, an encounter builder, and a loot generator backed by the system reference tables, all deterministic and free to run.
- **An AI Oracle** - the one billable feature, built on the Anthropic SDK, with layered cost controls and a hard rule that game-master secrets are stripped before the prompt is ever built.
- **A media studio** - an image and video generation pipeline with prompt libraries and verified provider callbacks, replacing a manual render workflow.

## Result

Labyrinthian is live in production at [labyrinthian.net](https://labyrinthian.net/), built across roughly 900 commits in about five weeks of near-daily work.  It runs a real Daggerheart campaign:  a full party of imported characters, a catalog of system-reference cards, NPCs, places, and lore, behind real authentication and a rate limiter.  This is the project where "the vault is the application" stopped being a thought and started running a game.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ttrpg-dashboard/dashboard-overview.png" title="The player-facing session dashboard" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ttrpg-dashboard/gm-workspace.png" title="The game-master command center" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">The player dashboard and the game-master workspace, reading the same Obsidian vault through role-aware access control.</div>

## Technical Details

### Stack

- **Framework:** Astro 6 server-side rendering with React 19 islands, deployed as a Cloudflare Worker
- **Content store:** Cloudflare R2 (markdown, frontmatter, and `.base` files as objects), read through a single VaultStore interface
- **Identity and ACL:** Cloudflare D1 (SQLite) with Better Auth; per-resource grants
- **State and config:** Cloudflare KV for the maintenance switch, the vault cache stamp, and per-user AI budgets
- **UI:** react-grid-layout for the dashboard, a force-directed relationship graph, parsing via gray-matter and js-yaml
- **AI:** Anthropic SDK (Claude Haiku for cheap asks, Claude Sonnet for richer prose); fal.ai for media generation
- **Tooling:** Wrangler, Vitest, Playwright, rclone for R2 sync, two separate repositories so code and campaign data version independently

### Design decisions

- **Authority is a flag, not a reconciliation engine.** One writable copy at a time:  R2 is canonical in production, and a maintenance window flips the site read-only for bulk Obsidian edits.  This replaced two-way sync and removed an entire class of merge conflicts.
- **One access primitive, reused everywhere.** Game-master tabs, the confidential share-back, the spectator view, and public visibility are all the same subject-by-resource grant resolved into different projections.
- **Redaction at the read layer.** Secrets are withheld by role before rendering, and the Oracle strips game-master state before building its prompt, so the AI cannot narrate a secret back to a player.
- **Guardrails promoted from documentation to enforcement.** The destructive operations that kept getting repeated - a sync that deletes live state, overwriting a paid render - are now hard-blocked by pre-commit hooks.
