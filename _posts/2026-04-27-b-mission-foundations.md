---
layout: post
title: "Mission Foundations: Where Things Live"
date: 2026-04-27
categories:
  - mission-control
tags:
  - claude-code
  - observability
  - ai-workflow
  - khimai
---

A woodworker walks into an empty workshop and the first hour is not cutting wood.  It is deciding where the tools go:  the bench against one wall, the chisels in a drawer at hand height, and the router in the cabinet farthest from the dust collector.  Once the work begins, those decisions persist.  Move a tool mid-project and you stop the work to find it.

Setting up Claude Code with Obsidian is the same kind of hour.  Before any AI-augmented work flows well, you decide where everything lives:  where the files sit on disk, where the configuration belongs, where the AI looks for context, and where you look for the AI's outputs.  Most of these decisions are not glamorous.  None of them are documented anywhere obvious.  And every one of them is load-bearing later, even if it feels reversible at the time.

This is the second post in the Mission Control series.  The first post named the problem:  entropic drift in AI-augmented work.  This post is about the workshop hour.  Most of the fix for drift is structural, and structure is choices about where things live.

## The Conceptual Problem

Most people do not make structural decisions before they start working with Claude Code and Obsidian.  They open the tools and start using them.  The first few projects work.  The friction is invisible.

Then a fifth project happens.  Then a tenth.  And small inconsistencies start to compound.  Memory files end up in two places because nobody decided where memory should live.  Two projects accidentally share a slug because nobody decided how slugs are assigned.  The AI sounds different in different sessions because there is no contract for what your voice should be.  You answer the same setup questions every time you open a new session because there is no place that holds the answers.

None of this looks like a problem at the start.  All of it is a problem by the time you have a portfolio of projects, because now you have N places to fix instead of one.

The fix is not more discipline at usage time.  The fix is structural decisions made up front, so that every project after the first inherits the answers rather than re-asking the questions.

Mission Control was only part of my solution to the structural issues.

## Two Pillars for One System

### Pillar One: Your Knowledge Vault

The first pillar is **the knowledge**:  notes, journal entries, project metadata, the identity files that brief the AI on who you are, your memory of past sessions.  In my setup, this container is a single Obsidian vault rooted at `D:\brain\`.  I call it the brain.

One quick technical aside - this is not the actual location of my Obsidian vault.  This is a Windows Junction point that routes deeper in my file systems underneath a long and cumbersome Synology Drive synchronized share drive.  But, instead of spending a lot of time navigating around, I have my brain at my fingertips easily accessible.  In addition, the synchronization allows me Obsidian access on my Android and other devices without the need for a subscription.

### Pillar Two: Your Code and Craft Projects

The second pillar is **the code**:  code repositories, active development work, build artifacts, anything you would put under version control as the deliverable of a project.  In my setup, that container is `D:\code\` -- a separate folder tree from the brain, with grouping subfolders that hold the actual repositories (`projects/` for active project work, `reference/` for read-only reference repos, `sandbox/` for experiments, and so on).  I also happen to have a `D:\craft\` folder for audio-video work.

Another technical aside, the code and craft directories are not in a synchronization vault.  It does get backed up nightly by a sync task, but I wanted to reduce active collisions due to locking and edits.

### Pillars United

These two containers do not blend.  Code does not live inside the vault.  The vault holds metadata about each project (a small index file per project that describes what it is, where it lives, and what state it is in), but the actual code lives in its own tree.

The line between the containers is the index file.  Brain side, the file describes the project.  Code side, the path the file points at is where the work happens.  That single pointer is what lets the dashboard, Obsidian, and Claude Code all see the same project from different angles.

This split matters for practical reasons.  Code rides Git.  Vault content rides Obsidian's sync.  They have different sync needs, different visibility rules, different rhythms.  Mixing them makes both worse.

Inside the brain, I keep a single vault rather than splitting work and personal across multiple vaults.  Splitting any of that produces three places to maintain instead of one, and the cross-references between domains stop working at exactly the moment you most want them.  Folders, not vaults, are how I separate work from personal.

## Brain Components

I have drawn inspiration from [Daniel Miessler's PAI/TELOS Personal AI](https://github.com/danielmiessler), which also aligns with some other human-centric and self-development projects I am working on.  Of course, to segment from his work, my personal AI has been dubbed KHIMAI (KEY-MY).  KHIMAI traces back to a BBS handle I used decades ago, **Khimaira**, itself a derivative of the mythological *chimera*.  KHIMAI is the abbreviated form, repurposed for my current technology and personal AI work.  

The chimera reference still fits:  KHIMAI is a composed system stitched together from a vault, a personal voice contract, an identity layer, local LLM analysis, and a portfolio dashboard.

### The Identity Layer
Inside brain, there is a folder dedicated to who you are, what you do, how you write, and what your AI should know about you on every session.  Call it the identity layer.

A good identity layer answers five questions:

- Who am I?  Background, role, expertise.
- What is my technical environment?  Tools, conventions, workstation.
- What sounds like me when I write?  Voice, banned vocabulary, register.
- What am I trying to accomplish this quarter?  Goals.
- Where can the AI find memory of past sessions?

Every Claude Code session reads the identity layer at startup.  This is what lets the AI brief itself in seconds rather than re-asking you every time who you are and how you like to work.  Even parents don't like repeating themselves to their kids.

### Voice Is Infrastructure

A voice contract is a file inside the identity layer that tells your AI what your writing actually sounds like.  Not what you want it to sound like in some aspirational sense.  What it sounds like when you are at your best.  The voice contract is the file that prevents that.  It sits next to the other identity files and loads on every session.  It is the single most editorially valuable file in the whole brain.

Fortunately for me, I'm a digital packrat who has writing samples across several different growth cycles of my personal and professional life.  (Side note, see my earlier post on [the future catching up to the past](/2026/03/08/future-catching-up-to-the-past/) for the project that converted long-defunct file formats into Markdown.)

### The Project Registry

Every project I work on, regardless of whether the artifact is code, a slide deck, a TTRPG campaign, or a photo library, has a single file in the brain that carries its metadata:  what it is, where its artifact lives, what state it is in, when it was last touched.  That file is the source of truth for the project's existence.

Both Obsidian and Mission Control read it.  Neither owns it.  Edit the file, and both surfaces update.  This is the bridge between the brain and the code tree.  A future post in this series covers how the bridge works in Mission Control's indexer.  For now, the conceptual point is just:  pick one file as the source of truth for each project, and put it in one place where everything that needs to know about the project can read it.

If the conceptual model is enough for you, stop here.  What follows is the live context and the technical details for others who need a little nudge to move forward.





---

*I wrote this post in full.  I used AI as a story editor for structural feedback and copy review, not for drafting.  All content reflects my voice and intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*

## Read More

If you want the implementation details, the folder layout, the three places Claude Code reads from, and the project-registry frontmatter, that is the technical companion to this post.  [Mission Foundations: Behind the Curtain](/2026/04/27/c-mission-foundations-tech-specs/).

## Mission Control Series

1.  [Entropic Drift](/2026/04/27/a-entropic-drift/)
2.  **Mission Foundations: Where Things Live** *(this post)*
3.  [Mission Foundations: Behind the Curtain](/2026/04/27/c-mission-foundations-tech-specs/)
