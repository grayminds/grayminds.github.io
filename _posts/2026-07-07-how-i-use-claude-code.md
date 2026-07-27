---
layout: post
title: How I Use Claude Code
date: 2026-07-07
categories:
  - ai-workflow
tags:
  - claude-code
  - agentic
  - compass-rose
  - khimai
---

Old nautical charts carry a compass rose in one corner.  It never steers the ship, never trims a sail, and never picks the destination.  Its job is quieter:  it gives every other line on the chart a shared orientation, so any navigator who picks up the map reads it the same way.  My Claude Code practice grew around the same idea.  Not one clever prompt, but a small set of fixed reference points that every session inherits before I type a word.

Agentic work has a failure mode that nobody warns you about:  every session starts from zero.  The model is brilliant and amnesiac at the same time, and if your practice depends on re-explaining yourself, the tool never compounds.  Everything below is a response to that one structural fact.  Five habits, each of which started as a single file.

## Every Session Starts With Memory

Context that depends on discipline decays.  Context that ships with the session compounds.  So I stopped pasting background into chats and wired it into the session lifecycle instead:  a SessionStart hook injects my memory index - active projects, prior decisions, and standing conventions - into every session automatically.  The agent opens already oriented, on any machine that has my vault mounted, whether I remembered to brief it or not.

The memory itself lives in my Obsidian vault as plain markdown, synced across machines, with topic files for anything durable:  project state, corrections, and lessons learned.  The hook is maybe twenty lines of bash.  The effect is that no session ever asks me who I am or what I was working on.

## Corrections Get Written Down, Never Re-Typed

A correction in chat is a patch.  A written rule is a fix.  Every time I catch myself telling the agent the same thing twice - formatting preferences, a naming convention, a directory that must never be renamed - that instruction moves into a CLAUDE.md file or a skill.  Checked into git.  Loaded on every future session.  My voice rules alone (no em dashes, two spaces between sentences, and a banned-vocabulary list) live in one file that every session imports, which is why I never argue about em dashes anymore.

This is the highest-return habit on the list, and the cheapest.  The error rate on written rules trends toward zero permanently.  The error rate on chat corrections resets every session.

## Delegate the Work, Verify the Merge

I rarely run one long interactive session anymore.  I write a brief - goal, constraints, and acceptance criteria - and hand it to an agent working in its own git worktree, an isolated copy of the repository where it can build without touching my working tree.  My laptop comfortably runs four to six of these in parallel, each on a different project.

The other half of the habit is non-negotiable:  nothing merges on the agent's word alone.  Tests run, the app actually starts, and I walk the changed flow end to end before it lands.  The first test suite I added to my most active project caught a real shipping bug the same day it was written - a database seed that silently failed on fresh installs.  Verification is not overhead on agentic work;  it is the multiplier that makes delegation safe.

## One Dashboard Watches It All

Once the first three habits run across dozens of projects, they need a place to converge, so I built one:  compass-rose, a self-hosted command center that runs on my NAS.  The name is not an accident.  It does not do the work;  it orients all of it.

![compass-rose-hud-2026-07-07](/assets/img/posts/2026-07-07-how-i-use-claude-code/compass-rose-hud-2026-07-07.png)
*The HUD:  token window, running automations, growth radar, and the Command Deck for dispatching new sessions.*

Compass-rose catalogs every AI conversation I have - 536 sessions so far, spanning Claude Code CLI transcripts, Claude web exports, and imported ChatGPT history, roughly a gigabyte of conversation data indexed and searchable under 184 tags.  It reads my project registry straight from the vault, so its portfolio view and my notes never disagree.

![compass-rose-projects-2026-07-07](/assets/img/posts/2026-07-07-how-i-use-claude-code/compass-rose-projects-2026-07-07.png)
*The portfolio:  35 active projects, every one traceable to its sessions.*

It also works in the other direction.  A cockpit queue dispatches new Claude Code sessions for standing rituals - four of them today, including a morning briefing and a vault-health sweep - so the recurring work runs without me opening a terminal.  The dashboard is where the observability habit and the delegation habit meet.

## Audit Yourself With Numbers

This July I distilled Boris Cherny's how-I-use-Claude-Code series into an eight-principle playbook and scored my own setup against it, honestly.  The audit found real gaps:  my most active project had zero automated tests, my permission setup had trust but no rails, and my per-project configuration was thin.  I captured a baseline that morning, fixed the gaps in waves, and re-ran the same metrics that evening:  0 tests became 43, committed project configs went from 2 to 8, and 75 stale review items went to 0.  The full before-and-after story is its own post;  the habit is the point here.  A practice you never measure is a practice you only feel good about.

![compass-rose-growth-2026-07-07](/assets/img/posts/2026-07-07-how-i-use-claude-code/compass-rose-growth-2026-07-07.png)
*Growth tracking:  the audit deltas live on the dashboard, not in my memory.*

## Where to Start

Not with a dashboard.  Mine came years into the practice, and it observes habits that already existed.  Start with habit two.  It fits in fifteen minutes:  the next time you correct your AI for something you have corrected before, open a file named CLAUDE.md at your repository root and write the rule down as one plain sentence.  Commit it.  That single file loads into every future session, and you have just made your last re-typed correction.  Memory hooks, worktree agents, and dashboards are all downstream of that one move.

The compass rose earns its place on the chart because it was drawn once and every voyage afterward read from it.  That is the whole practice.  Write it down once, let every session inherit it, and the work stops starting over.

## The Fifteen-Minute On-Ramp, Executable

The same fifteen minutes as a prompt:  paste this into Claude Code at your repository root and it wires the file, the hook, and the rails in one pass.

```text
I keep re-typing the same corrections to you.  Set up the minimum
infrastructure so I never have to again.

Requirements:
1. Create a CLAUDE.md at the repository root.  Ask me for the one rule I
   have already told you twice, write it down as a single plain sentence,
   and commit it.  One rule, one file.  Do not pad it with boilerplate
   sections I did not ask for;  a bloated CLAUDE.md gets skimmed, and a
   skimmed rule is a dead rule.
2. Install a SessionStart hook that injects a small memory-index file
   into context.  The hook must fail silent:  if the index file or a
   dependency is missing on a given host, exit 0 with no output.  A hook
   that errors at session start WILL get disabled within a week, and a
   disabled hook is worse than none.
3. Keep the memory-index file small.  It is an index that points at topic
   files, not a dump of everything I have ever said.
4. Add a minimal user-scope deny list covering only the commands that
   would actually hurt:  force-push, recursive deletes, and credential
   file access.  Do not build an allowlist of everything safe;  deny the
   few destructive patterns and stop.
5. Verify:  start a fresh session and confirm the injection block appears
   in context before the first prompt.  If it does not appear, the hook
   broke;  diagnose the hook rather than assuming it ran.
```

If the habits are what you came for, you can stop here.  What follows is the implementation detail, shared in the spirit that product frameworks get built:  practitioners showing what works, learning from each other, and revising as they go.  Take what is useful and tell me what I got wrong.

<details markdown="1"><summary><strong>For people who build things</strong></summary>

- **Memory injection.**  A `SessionStart` hook (`~/.claude/hooks/memory-context.sh`, fail-silent bash) injects the vault memory index as context.  Companion hooks guard the memory file's size cap, enforce script placement rules, and enforce session-handoff docs.  Memory lives at `_identity/memory/` inside the vault, so Synology Drive sync carries it to every host.
- **Written rules, three scopes.**  User-scope CLAUDE.md for cross-project rules and a corrections list, per-project CLAUDE.md files kept lean (I recently cut my most active one by 78 percent by moving its changelog to a devlog), and skills plus subagents for anything procedural:  a voice editor, a PowerShell scripter, a code reviewer, and a QA planner among them.
- **Worktree agents.**  Git worktrees give each agent an isolated checkout;  briefs follow a goal / constraints / acceptance-criteria template in each project's `docs/next-session.md`.  Verification is a per-project `verify` skill:  run the tests, start the app, and drive the changed flow.  Permission posture is auto mode plus a small user-scope deny list for genuinely destructive patterns (force-push, recursive deletes, and credential file access).
- **compass-rose.**  Fastify 5, SQLite, Nunjucks, and HTMX with no build step, on a NAS port.  Importers normalize Claude Code JSONL transcripts, Claude web exports, and ChatGPT exports into one schema.  The project registry is markdown frontmatter in the vault (`50_projects/<slug>/index.md`), read directly, so one source of truth feeds Obsidian and the dashboard.  The cockpit is a file-based queue that shells out to `claude -p` for scheduled rituals.
- **The umbrella.**  The composed system - identity files, user tooling, project tooling, and the dashboard - carries one name, KHIMAI (KEY-MY), in the same spirit as Daniel Miessler's PAI framework:  naming the whole system forces you to design it as one thing instead of a pile of configs.

</details>

---

*This post was created with AI assistance.  I used AI tools for drafting, research, and editing, and I reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
