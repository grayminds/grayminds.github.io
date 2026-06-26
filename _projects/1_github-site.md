---
layout: page
title: Standing Up grayminds.com
description: Building a personal portfolio site from scratch using al-folio, Jekyll, and Claude Code as a co-developer.
img:
importance: 1
category: technical
project_status: completed
started: 2026-02-21
completed: 2026-03-09
tags:
  - project
  - jekyll
  - al-folio
  - claude-code
---

## Why

I needed to decouple my online identity from my corporate identity.  Most of what I have accomplished in the professional world gets filtered through NDAs or proprietary technology.  None of it translates into a portfolio that represents me.  So I built one.

This was also a learning project.  I had not touched front-end code in years.  The goal was not just to stand up a site, but to understand how modern static site generators work, how templating and data separation function, and how AI tooling changes the development experience.

## How

I chose [al-folio](https://github.com/alshedivat/al-folio), a Jekyll template designed for academics and professionals.  It gave me a solid foundation: responsive layout, dark mode, blog support, and a clean design language that I could customize without starting from zero.

The entire build was a collaboration with Claude Code (Opus).  Early on, Claude served as a mentor coach, answering questions like "how do I run Jekyll locally" and "what templates meet my criteria."  As trust increased, the relationship shifted.  Claude became a co-developer, writing liquid templates, converting data formats, and debugging layout issues in real time.

Key milestones:

- **Local development environment** -- Ruby 3.3.4, Jekyll 3.10.0, livereload for fast feedback
- **TimelineJS integration** -- Converted hardcoded JSON timeline events into a YAML + Liquid structure, separating data from presentation
- **Identity facets** -- Built custom page layouts for different professional dimensions (technologist, cognitive systems engineer, stage combat)
- **Publish pipeline** -- PowerShell script (`Publish-JekyllContent.ps1`) for one-way Obsidian-to-Jekyll sync with frontmatter stripping, Prettier formatting, and git push
- **Custom domain** -- grayminds.com via Cloudflare DNS with GitHub Pages hosting

## Result

A working portfolio site that I maintain entirely from Obsidian.  Posts and pages are authored in my vault, promoted through a status workflow (`draft` to `ready` to `published`), and synced to Jekyll with a single command.  The site builds automatically via GitHub Actions on push.

The bigger result was the process itself.  Building with Claude Code was not about generating code I could not write.  It was about compressing the feedback loop.  Questions that would have taken an hour of documentation reading were answered in seconds.  Layout experiments that would have required trial and error were collaborative and iterative.  The AI result was only as good as the instruction I gave it, but that instruction-to-output cycle was dramatically faster than working alone.

<details markdown="1">
<summary><strong>Technical Details</strong></summary>

### Stack

- **Template:** al-folio (Jekyll)
- **Hosting:** GitHub Pages (grayminds.github.io)
- **Domain:** grayminds.com (Cloudflare DNS)
- **Local preview:** `bundle exec jekyll serve --drafts --livereload`
- **Content source:** Obsidian vault
- **Sync:** Publish-JekyllContent.ps1 (PowerShell 7)

### Publish Workflow

1. Author content in Obsidian with full frontmatter (type, status, visibility, tags)
2. Set `status: ready` when the post is ready for publication
3. Run `Publish-JekyllContent.ps1` which:
   - Scans 00_sitebase/posts, pages, and projects for eligible notes
   - Auto-promotes `status: ready` to `status: published` + `visibility: public`
   - Strips Obsidian-only frontmatter fields
   - Runs Prettier for consistent formatting
   - Copies to Jekyll repo
   - Optionally pushes to git with `-Push` flag
4. GitHub Actions builds and deploys on push

### Customizations

- Custom SCSS in `_sass/_components.scss` (no _base.scss exists in this template)
- Include files use `.liquid` extension, not `.html`
- Custom `about_custom` layout for the landing page
- YAML data files in `_data/` for timelines and structured content
- Light/dark mode toggle enabled
- CNAME file in repo root to maintain custom domain across deploys

### Key Lessons

- al-folio's Liquid templates use Bootstrap 4 grid; understanding `col-sm`, `row`, and responsive breakpoints is essential for layout work
- Jekyll's `_config.yml` is not hot-reloaded; restart the server after config changes
- Prettier can reformat Liquid templates aggressively; configure it to leave `.liquid` files alone or accept the reformatting
- The `-WhatIf` flag on the publish script is invaluable for dry runs before pushing content

</details>
