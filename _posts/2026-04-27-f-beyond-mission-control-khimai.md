---
layout: post
title: "Beyond Mission Control: KHIMAI"
date: 2026-04-27
categories:
  - mission-control
tags:
  - khimai
  - voice-contract
  - privacy
  - ai-architecture
  - claude-code
---
Mission Control is one room in a larger building.  This post is about the building.

I call the larger building **KHIMAI** (KEY-MY).  Etymology:  Greek *Khimaira*, the chimera, a fusion creature composed of multiple animals.  Old BBS handle of mine, repurposed.  The shorter name carries the AI suffix; the chimera reference still fits the system, which is stitched together from a vault, a voice contract, an identity layer, local LLM analysis, and a portfolio dashboard.  None of these parts are novel on their own.  The composition is the point.

Daniel Miessler's PAI framework was the model that pushed me to name the umbrella rather than leave it implicit.  KHIMAI absorbs targeted artifacts from Daniel's PAI:  the Thinking pack, the Algorithm meta-agent pattern, a few hooks, the identity-stub idea.  It is not a fork.  It is what I built when I read Daniel's work and said "yes, but here is how it has to look on my disk."

## The Four-Layer Concentric Architecture

KHIMAI is four layers and one meta-layer.

**L1 -- Identity.**  The vault's `_identity/` directory.  The innermost layer.  Six files plus a memory directory:  `who-i-am.md` (background, role, expertise), `context.md` (workstation, tools, conventions), `values.md` (the deeper why behind the time choices), `goals.md` (current quarter's targets), `voice-style.md` and `voice-style-work-tpm.md` (the two voice contracts), `ai-diligence.md` (disclosure language).  The `memory/` subfolder holds the topic files that survive across sessions:  `feedback_*.md`, `project_*.md`, `reference_*.md`, plus `MEMORY.md` as the index.

**L2 -- User tooling.**  The user-scope `.claude/` directory, junctioned to the Windows home directory so anything looking for a home-directory path still finds it.  Skills I have written, agents I have configured, plans, settings, hooks, keybindings.  This layer belongs to me as a person, not to any project.  Every Claude Code session on this workstation reads it.

**L3 -- Vault tooling.**  The vault's `.claude/` directory.  Skills that only make sense inside the vault:  the obsidian-cli wrapper, the vault-health auditor, the recipe-check skill, the legacy-cleanup converter.  Loads when Claude Code opens at the vault root.  A skill that does not need a vault does not belong here.

**L4 -- Project tooling.**  Per-project `.claude/` directories, one in each project repository and one in the vault, among others.  Project-specific settings, project-specific skills, the local allowlist of tools Claude can run unsupervised.  This is the layer that scales horizontally with the number of projects.

**Meta -- Mission Control.**  The self-hosted dashboard.  Indexes all four layers, surfaces the unified dashboard, holds the Layer 2 curation that crosses project boundaries (which session belongs to which project, which scheduled jobs are running where).

The key word is **concentric**, not stacked.  Each layer wraps the one inside it without redefining it.  The identity at L1 is the same identity in every project at L4, because every project's `CLAUDE.md` `@import`s L1 directly.  No copy, no drift, no forgetting.

## Voice Is Live Infrastructure

The voice contract at `_identity/voice-style.md` is not a one-time document.  It is a file under active editing, and the system around it makes sure the rules stay current rather than fossilized.

Three loops keep it alive.

**Per-deck audit.**  Every generated slide deck runs through `validate-deck.ps1` before export.  Banned-word scan against §1 anti-vocabulary.  Em-dash detection.  Passive-voice ratio (flag if over 15% of sentences).  Sentiment-tone check.  Buzzword-proximity alert against the current watchlist.  A deck that fails the audit does not get exported.  It gets rewritten.

**Quarterly buzzword refresh.**  `refresh-voice.ps1` runs once a quarter:  web-search current AI-industry buzzword and "AI-slop" watchlists, compare against the existing anti-vocabulary, propose additions for my approval.  Em dashes became an anti-pattern in 2026 because of OpenAI's default style; the next year's slop signals will be different.  The watchlist has to keep up.

**Voice resampling.**  `refresh-voice.ps1` also offers to re-derive the contract from the current corpus when I have published five or more new artifacts since the last refresh.  The contract is extracted from the writing, not imposed on it.  When my voice evolves, the contract follows; when the contract pushes back on a draft, the draft has drifted.

The discipline is the same as in any other system:  the rules stay honest because they get re-derived, not because anyone enforces them by hand.

## Privacy Posture

KHIMAI runs on a hard rule:  **local-only for LLM analysis over personal content.**

- **Hosted APIs (Claude, ChatGPT, Gemini)** are fine for collaborating on code and prose I am actively writing.  The session is a working session.  I am in it.  The output rides back through me before it goes anywhere.
- **Hosted APIs are not fine for batch analysis of my corpus.**  Session transcripts, vault notes, plans, journal entries, project metadata never go to a hosted API for classification, summarization, or synthesis.
- **LM Studio and Ollama** carry that work locally.  When Mission Control summarizes a session or classifies what kind of work it was, the model doing that runs on my own machine.

Three reasons.  Privacy:  personal/family/financial content all live in the brain side, and none of those domains belong inside someone else's training pipeline.  Sovereignty:  the model that knows me should be one I can run with the network unplugged.  Drift:  hosted models change without warning; local models do not change unless I update them.  The composition has to be stable for the dashboard above it to be trustworthy.

Of course, the rule has edges I keep an eye on.  When I ask Claude to draft a sitepost, the draft is hosted-API output.  When I ask a local model to summarize last quarter's drafts, that is local.  The line is "actively writing with" versus "running batch over."  The first is collaboration.  The second is surveillance.

## What Comes Next

KHIMAI today is six layers (four concentric, one meta, plus the brain side itself) and a small set of personal scripts gluing them together.  The roadmap is mostly addition rather than restructure:  more skills at L2 and L3 as the work surfaces them, a hooks layer at L4 for policy enforcement (frontmatter validation, voice audit on save), a memory tier split (`WORK/`, `LEARNING/`, `SIGNALS/`) inside `_identity/memory/` once the volume warrants it, an AI-summary surface in Mission Control once the local model is good enough.

Daniel Miessler reported a 68% cognitive load reduction when he reorganized PAI from 38 flat skills into 12 hierarchical categories.  My count is smaller (7 user-scope skills, 11 vault skills, 5 agents, 14 plans), and the categorization work is mostly ahead of me.  Front-loading the convention now, while the count is small, costs almost nothing.  At 200 skills, the cost of retrofitting would be much higher.

The pattern matters more than the implementation.  At any scale, AI-augmented work needs an identity, a voice, a tooling layer, a project layer, and a place to see the whole thing at once.  Without those, AI output drifts toward a flat middle and personal output drifts away from the person.  With them, output stays yours.

Take what is useful, leave the rest, and tell me what I could tweak in the future.

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*

## Read More

If you want to start at the problem rather than the umbrella, the first post in this series names the entropic-drift problem all of this is solving.  [Entropic Drift](/blog/2026/a-entropic-drift/).

## Mission Control Series

1.  [Entropic Drift](/blog/2026/a-entropic-drift/)
2.  [Mission Foundations: Where Things Live](/blog/2026/b-mission-foundations/)
3.  [Mission Foundations: Behind the Curtain](/blog/2026/c-mission-foundations-tech-specs/)
4.  [Mission Foundations: From Disk to Dashboard](/blog/2026/d-disk-to-dashboard/)
5.  [Mission Foundations: Operating the Room](/blog/2026/e-operating-the-room/)
6.  **Beyond Mission Control: KHIMAI** *(this post)*
