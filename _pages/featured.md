---
layout: page
title: featured
nav: true
nav_order: 2
permalink: /featured/
description: Labyrinthian - a vault-backed tabletop RPG dashboard, live in production on Cloudflare.
---

## Labyrinthian

<div class="text-center my-4">
  <a class="btn btn-primary btn-lg" href="https://labyrinthian.net/" target="_blank" rel="noopener noreferrer">Open the live app at labyrinthian.net</a>
</div>

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/ttrpg-dashboard/dashboard-overview.png" class="img-fluid rounded z-depth-1" alt="The player-facing session dashboard" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ttrpg-dashboard/gm-workspace.png" class="img-fluid rounded z-depth-1" alt="The game-master command center" %}
    </div>
</div>
<div class="caption">One surface the whole table reads from:  the player dashboard and the game-master workspace.</div>

**Labyrinthian** runs a live tabletop campaign in production at [labyrinthian.net](https://labyrinthian.net/).  It started as a real need at a real table, not a demo.

### Why it was needed

My Daggerheart group already kept its characters, lore, and house rules in an Obsidian vault.  A vault is a fine place to write and a poor place to play.  During a session nobody wants to scroll a folder tree to find a combat move; they want their moves, defenses, inventory, and trackers laid out at a glance.  And not everyone at the table should see the same thing - a player sees their own sheet, the game master sees everything including the secrets, and a guest can watch without touching.  No off-the-shelf tool did that against our own notes, so I built the one that did.

The result is a single surface the whole table reads from, live and role-aware, running a real campaign behind real authentication.  It is the project where "the vault is the application" stopped being an idea and started running a game.

### Go deeper

- **The full case study** - architecture, the access model, the AI Oracle, and the design decisions - lives on the [Labyrinthian project page](/projects/labyrinthian/).
- **The build story, in order** - I wrote it up as it happened in [the Labyrinthian blog series](/blog/tag/labyrinthian/).
- **More of my work** - browse the rest of my [projects](/projects/).
