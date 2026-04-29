---
layout: post
title: "Mission Foundations: Behind the Curtain"
date: 2026-04-27
categories:
  - mission-control
tags:
  - claude-code
  - observability
  - ai-workflow
  - khimai
---

While this entry might not be as awe-inspiring as walking backstage at Cirque du Soleil or Broadway, this is a glimpse behind the technology curtain described in mission-foundations.

Product management frameworks get built by practitioners sharing what works, learning from each other, and revising as they go.  I am sharing the implementation in that spirit.  None of this is canon.  All of it is what I have running today, subject to revision the next time I find a better answer.  Take what is useful, leave the rest, and tell me what I could tweak in the future.

My environment is Windows 11 Pro with PowerShell 7 working with features from my local network Synology NAS.  I also have various Linux virtual machines in addition to Windows Sub-System for Linux (WSL).  Sensitive details (API keys, secrets, machine-specific identifiers) are intentionally omitted.  

### Vault Folder Layout

The top of my Obsidian vault brain looks like this:

```
10_journal/
20_clippings/
30_personal/
40_theocratic/
50_projects/
60_technology/
70_areas/
80_research/
_attachments/
_claude-chats/
_identity/
_jekyll-data/
_templates/
```

The numbered prefixes are intentional.  I prefer alphanumeric sort across Directory Opus and in the Obsidian viewer.  The gaps between numbers (10, 20, 30) leave room to add a new domain without renumbering everything.  The folders prefixed with an underscore sort to the top because they are infrastructure for the vault, not content.

As a reminder, Code and Craft do not live here.  `D:\code\` is the parallel tree where repositories sit, organized by purpose (`projects/`, `grayminds/`, `reference/`, `sandbox/`, and a few others).

### Three Places Claude Code Reads From

After several back-to-back Windows failures due to profile corruption, I tried following the recommended best practice:  C-drive for the OS, D-drive for the data drive.  Short version, Windows stumbles over this even when you follow the documented procedure for moving the data directories "legally."  That story is for another time.

Claude Code looks for configuration and context in three places, and most setup confusion comes from not knowing which file goes where.

**User scope** lives at `~/.claude/`.  On my Windows workstation, that is `D:\UserData\michael\.claude\`, junctioned from `C:\Users\michael\.claude\` so anything looking for the home-directory path still finds it.  This scope is for things that belong to me as a person, not to a project:  my user-level `CLAUDE.md` with the identity-layer `@import` chain, user-scope settings, skills I have written, and my keybindings.  When I open Claude Code in any directory on this machine, this is the scope that briefs the session about who I am.

**Project root** is a single `CLAUDE.md` file sitting at the top of whatever project you are working in.  For my brain, that is `D:\brain\CLAUDE.md`.  It holds project-level instructions that load whenever Claude Code opens inside the vault:  visibility tiers, frontmatter conventions, the Jekyll pipeline, the project registry pattern.  This file is context, not configuration.

**Project `.claude/` folder** sits beside the project root `CLAUDE.md`, at `<project>/.claude/`.  For my brain, that is `D:\brain\.claude\`.  This folder holds project-level *configuration*:  `settings.json` for shared settings, `settings.local.json` for machine-specific overrides (the gitignored allowlist of tools and commands the agent can run automatically), project-specific skills, and any project-specific hooks.

The three places layer in order.  User scope loads first.  Project root `CLAUDE.md` layers project context on top.  The project `.claude/` folder configures permissions and tooling for the session.

Rule of thumb:  identity goes in user scope; instructions for the agent go in the project root `CLAUDE.md`; permissions and tooling go in the project `.claude/` folder.

### The CLAUDE.md `@import` Chain

Every Claude Code session reads my identity files at startup, by way of an `@import` chain in my user-scope `CLAUDE.md`:

```
@D:/brain/_identity/who-i-am.md
@D:/brain/_identity/voice-style.md
@D:/brain/_identity/context.md
```

A small but expensive lesson:  on Windows, those import paths must use forward slashes.  Backslashes fail silently.[^canary]  I lost an hour to this before confirming it with a canary token in the imported file and watching whether Claude Code surfaced it.

### Identity Layer Files

Inside `D:\brain\_identity\`:

```
_identity/
  who-i-am.md
  context.md
  values.md
  goals.md
  voice-style.md
  voice-style-work-tpm.md
  ai-diligence.md
  CLAUDE-CODE-INTERACTION-GUIDE.md
  memory/
```

Each file carries one concern.  `who-i-am.md` introduces me as a person.  `context.md` describes my workstation, tools, and conventions.  `values.md` carries the deeper "why" behind my time choices.  `goals.md` keeps the agent oriented toward what I am actually trying to accomplish this quarter.  The two voice files are the contract that decides what comes back out of every session.  `ai-diligence.md` carries the disclosure language for AI-assisted public content.  `CLAUDE-CODE-INTERACTION-GUIDE.md` is a separate file of working rules for how Claude Code itself should behave inside the vault.

These files together are the briefing layer for KHIMAI[^khimai], the composed personal AI system Mission Control sits inside.

### Voice Contract Specifics

My voice contract lives in two sibling files inside the identity layer:  `voice-style.md` for personal/blog/keynote register (~226 lines) and `voice-style-work-tpm.md` for work/TPM register (~232 lines).  The user-scope `CLAUDE.md` `@import`s the personal/blog/keynote file by default; sessions doing TPM-internal work load the sibling instead.

Each file defines the same shape of contract:

- Banned vocabulary (an evolving list), em-dash policy, cadence targets.
- Opening patterns and signature rhetorical moves.
- A long list of other working rules specific to the register.

I keep adding to both as I find new rough edges.

### Project Registry Frontmatter

Every project's metadata file lives at `D:\brain\50_projects\<slug>\index.md` and carries seven registry-specific fields, on top of the vault's standard frontmatter (`created`, `updated`, `visibility`, `source`, `tags`):

```yaml
type: project
slug: mission-control
path: D:\code\projects\mission-control\
domain: code
status: active
has-claude-md: true
last-active: 2026-04-26
```

The `path:` field is the bridge between the brain and the code tree.  It points to wherever the artifact actually lives on disk -- code repositories under `D:\code\`, but also drone footage under another tree, slide decks somewhere else, anything else.  The metadata stays in the brain; the artifact lives in its own container.

Post 5 in this series covers how Mission Control's indexer parses these files into a live registry that both Obsidian's Base view and the Mission Control dashboard render.

[^canary]: Reference:  `D:/brain/_identity/memory/reference_claude-code-imports.md`.  I confirmed the silent-failure behavior on Claude Code v2.1.118 by placing a canary string inside an `@import`-targeted file, then comparing forward-slash and backslash variants.  Forward slashes loaded the canary into the session context; backslashes loaded nothing and emitted no warning.

[^khimai]: KHIMAI traces back to a BBS handle I used decades ago, **Khimaira**, itself a derivative of the mythological *chimera*.  KHIMAI is the abbreviated form, repurposed for my current technology and personal AI work.  The chimera reference still fits:  KHIMAI is a composed system stitched together from a vault, a personal voice contract, an identity layer, local LLM analysis, and a portfolio dashboard.

---

*I wrote this post in full.  I used AI as a story editor for structural feedback and copy review, not for drafting.  All content reflects my voice and intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*

## Read More

If you want the conceptual model behind these specs, the two pillars, the identity layer, and the project registry pattern, that is the conceptual companion to this post.  [Mission Foundations: Where Things Live](/blog/2026/b-mission-foundations/).

## Mission Control Series

1.  [Entropic Drift](/blog/2026/a-entropic-drift/)
2.  [Mission Foundations: Where Things Live](/blog/2026/b-mission-foundations/)
3.  **Mission Foundations: Behind the Curtain** *(this post)*
