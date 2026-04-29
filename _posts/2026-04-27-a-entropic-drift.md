---
layout: post
title: Entropic Drift
date: 2026-04-27
categories:
  - mission-control
tags:
  - claude-code
  - observability
  - ai-workflow
  - khimai
---

When NASA flies a mission, there is a room.  Each console inside watches one part of the spacecraft:  fuel, trajectory, communications, thermal systems, and crew vitals.  Each console alone is too narrow to fly the mission.  The room together is what flies the mission.  The room is called Mission Control.

I have been thinking about that room a lot.

When you start with local AI-augmented tools, such as Claude Code, you are excited by the potential.  You segment and isolate with security.  You create gits for backups.  But then one project becomes a dozen and a dozen becomes... a lot more... scattered across the file systems, Obsidian vaults, and even machines.  Then as project priorities shift, some projects get put into a hold pattern and a few days later (and after system reboots) you suddenly wonder what is pending.

AI tools have taken the load of the minutiae and have even taken over the running of sub-agents to accomplish the individual purpose.  AI increased productivity.  AI increased output.  But that was not the root challenge.  The root challenge quickly became observability across projects, agents, plans, file systems, and even context.

I did not need more output.  I needed to see the status across projects and phases.  I needed to know which projects were active and which had gone cold without being noticed.  I needed to know which of the small pieces of automation I had set up were still running and which had been quietly broken for a week.  I needed a room with consoles.  I needed a Mission Control.

## Mission Control

In short, Mission Control is a local dashboard that auto-monitors and reports across my Claude Code projects, enabling me to quickly track ... well just about everything that I've needed to track so far (including exports of browser-based interactions).  Years of Claude Code, Claude.ai, ChatGPT, and similar surfaces all pulled together to see the whole working history at a glance, instead of digging through scattered folders.

> **One place for every AI conversation.**  

## Key Features

1. **Project-centric, not by file or location.**  Sessions, plans, and notes group themselves under the active project in progress, laid out with status buckets (Active, Planned, On-Hold, Recurring, Completed, and Deprecated).  Projects themselves can be merged or configured as sub-projects for multi-phased solutions.
2. **Outliers are accommodated.**  A triage queue for the unsorted.  A pipeline for manually tracking future projects that haven't started.  Functionality allows you to promote it to a new project, fold it into an existing one, or set it aside.  Nothing gets force-categorized into a wrong home.
3. **Timeline view of everything.**  A single chart of every conversation, color-coded by source, going back years.  Useful for "what was I working on in February?" or "when did this project actually start?"
4. **History survives cleanup.**  When Claude Code archives or rotates old session files, Mission Control still remembers what happened.  Nothing falls off the record just because the underlying file got deleted.
5. **Search the whole archive at once.**  One search bar covers sessions, plans, vault notes, and projects.  Recent queries stay handy so you can pick up where you left off.
6. **Your structure, your way.**  Mission Control gives you control over tags, milestones, quick links, and project history.  When the raw data underneath gets re-imported, which I've scheduled for every 15 minutes, the curation rides along untouched.
7. **Self-logging tracks your automation success and failures.**  Fire and forget for your agentic automation, with no need to remember what is in Task Scheduler or to look elsewhere to see if it is still running after a reboot.
8. **Privacy stays local by default.**  The code to run Mission Control is public, but it's segmented from your data (which can be a private git).  When the dashboard summarizes a session or classifies what kind of work it was, the AI doing that work runs on your own machine by default, with the option to use a hosted model if you prefer.  

If this is something you might be interested in, download the code from the public github repo at [github.com/grayminds/mission-control](https://github.com/grayminds/mission-control/).  

Note, data has been isolated outside of the code itself which enables you to back up your own data into your own personal git (or github) repository following your own privacy needs.

## Screenshots

### Projects Dashboard

![5_projects_list_obfuscated](/assets/img/posts/2026-04-27-a-entropic-drift/5_projects_list_obfuscated.png)

*Or, the cards view:*

![6_projects_cards_obfuscated](/assets/img/posts/2026-04-27-a-entropic-drift/6_projects_cards_obfuscated.png)

### Project View

![7_project_detail_obfuscated](/assets/img/posts/2026-04-27-a-entropic-drift/7_project_detail_obfuscated.png)

Shows the full history:
- **Title.**  What is the name of the project.
- **Tags.**  Self-assigned tags.
- **Status.**  Auto-assigned and user-editable project status.
- **Synthesis.**  Note, I used LM Studio qwen/qwen3-14b as a localization test to minimize private data from being cloud-analyzed, but the design lets you choose where your synthesis occurs.
- **Subprojects.**  Logical grouping by user for clustering.
- **Activities.**  Session interactions.
- **Plans.**  Claude plans and adjustments.
- **Notes & memory.**  What did we do?
- **Vault notes.**  Plans, report, other Claude markdown preparation work.
- **Milestones.**  Capture phases or merging.
- **Linked Directories.**  Where on disk the artifacts live.
- **History.**  Log of activity.
- **Admin.**  To move under another project or merge.

### Filtering by Tag, Skill, or Agent

![2_filter_obfuscated](/assets/img/posts/2026-04-27-a-entropic-drift/2_filter_obfuscated.png)

### Timeline View

![1_timeline_obfuscated](/assets/img/posts/2026-04-27-a-entropic-drift/1_timeline_obfuscated.png)

### Plans View

![3_plans_obfuscated](/assets/img/posts/2026-04-27-a-entropic-drift/3_plans_obfuscated.png)

### Logs View

![4_logs_obfuscated](/assets/img/posts/2026-04-27-a-entropic-drift/4_logs_obfuscated.png)


---

*I wrote this post in full.  I used AI as a story editor for structural feedback and copy review, not for drafting.  All content reflects my voice and intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*

## Read More

The conceptual model for the room itself, the two pillars, the identity layer, and the voice contract is in the next post.  [Mission Foundations: Where Things Live](/2026/04/27/b-mission-foundations/).

## Mission Control Series

1.  **Entropic Drift** *(this post)*
2.  [Mission Foundations: Where Things Live](/2026/04/27/b-mission-foundations/)
3.  [Mission Foundations: Behind the Curtain](/2026/04/27/c-mission-foundations-tech-specs/)
