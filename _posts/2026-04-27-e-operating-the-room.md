---
layout: post
title: "Mission Foundations: Operating the Room"
date: 2026-04-27
categories:
  - mission-control
tags:
  - claude-code
  - observability
  - automation
  - scheduled-jobs
  - khimai
---
The first four posts in this series built the room.  This one is about working inside it.

Two surfaces matter on a normal Tuesday:  the triage workbench for sessions that do not yet have a project home, and the logs panel for the scheduled jobs that run while I am not watching.  Both answer questions the dashboard would otherwise let me forget to ask.

## Sessions Without Homes

Every Claude Code session writes a JSONL file under `~\.claude\projects\<slug>\`.  The indexer reads them all and produces `sessions` rows in Layer 1.  The mapping from a session to the project it actually belongs to lives in Layer 2 (`project_sessions`).  The two often disagree.

Sometimes the disagreement is benign.  I started a session in a sandbox before deciding it was actually about Mission Control.  Sometimes it is structural.  Claude Code writes the session into the directory it was launched from; if I bounced into a project to look at one file and then kept working, the session is parked under whatever folder I happened to be in.  And sometimes it is honest:  I started something, did not finish, and have not decided yet whether it deserves to be a project at all.

The triage workbench is the room's answer.  Route `/triage` runs the query

```sql
SELECT * FROM sessions s
WHERE s.id NOT IN (SELECT session_id FROM project_sessions)
  AND s.user_turns > 0
ORDER BY s.started_at DESC;
```

and renders the unmapped sessions in `triage.njk`.  Each row has three actions:

- **Promote.**  This was a project I had not registered yet.  Create a new `projects` row with `curation_source = 'promoted-from-triage'`, link the session, and the next reindex picks it up like any other registered project.
- **Fold.**  This belongs under an existing project.  Pick the slug, write the `project_sessions` join, done.
- **Set aside.**  Not a project, not garbage, not yet.  Tag it and let it sit.  I have a queue of "set aside" sessions I revisit when planning a quarter.

Triage is the move that keeps the dashboard honest.  The number on the triage tab is the number of sessions I have started without committing to a home for them.  When that number creeps past about twenty, the queue is telling me my attention is more scattered than I thought.

## Green, Amber, Red

Scheduled jobs are the part of any system most likely to fail in silence.  The job ran last week.  The job will run next week.  Did the job actually run yesterday?  Nobody checks until something downstream of the job complains.

Mission Control's `/logs` route closes that loop with a Red / Amber / Green grid driven by two tables in the schema.

**Layer 1.**  `automation_logs` is append-only.  Each row carries `id`, `machine_name`, `logged_at`, `shorthand_name`, `runtime_description`, `duration_seconds`, `exit_code`, `error_summary`, and `raw_source_path`.  The `id` is `SHA256(machine_name || logged_at || shorthand_name)` so a replay of the same JSONL line is idempotent (`ON CONFLICT(id) DO NOTHING`).  Source of truth is `mission-control-data/logs/YYYY-MM.jsonl`, git-tracked, so the history rides cross-machine sync.

**Layer 2.**  `automation_shorthand` carries the per-job metadata the dashboard uses to render status:  `shorthand_name`, `display_name`, `expected_cadence_minutes`, `amber_threshold_multiplier` (default 1.5), `red_threshold_multiplier` (default 3.0), `description`, `owner_host`, `curation_source`.  Seeded from `mission-control-data/automation-shorthand.json` with `INSERT OR IGNORE` so manual UI edits survive every reseed.

The status calculation is small enough to fit in a paragraph.  Compute `minutes_since_last = now - max(logged_at)`.  Green if `minutes_since_last <= expected_cadence_minutes`.  Amber if `<= expected_cadence_minutes * amber_threshold_multiplier`.  Red if `> expected_cadence_minutes * red_threshold_multiplier`.  Ad-hoc jobs (`expected_cadence_minutes IS NULL`) never go red; they are jobs I run when I run them, not jobs that need to fire on a schedule.

The grid is what I look at over coffee.  Anything red is a job I expected to have run and which has not.  Anything amber is a job sliding toward red.  Green I do not have to think about.

## How the Logs Get In

The feeder is one PowerShell helper, `MC-Write-AutomationLog.ps1`, kept in a shared scripts repository.  Every Claude-created scheduled task on my workstation calls it on each run, and it appends one JSONL line to `mission-control-data/logs/YYYY-MM.jsonl`.  The same helper exists on every host that runs a registered job, so the data repo accumulates a cross-machine history.

Today there are four scheduled tasks wired up:

| Shorthand | What it does | Cadence |
|---|---|---|
| `MissionControl` | Runs Sync-DataRepo and pushes to Gitea. | every 15 minutes |
| `YouTube-Feed-Morning` | Pulls fresh YouTube subscription feed. | daily |
| `YouTube-Feed-Afternoon` | Same, second pass for end-of-day uploads. | daily |
| `YouTube-Briefings-Morning` | Generates morning briefing artifacts. | daily |

Adding a fifth job is one line in `automation-shorthand.json` plus a call to the PowerShell helper from the task itself.  The dashboard picks up the new shorthand on the next reindex.  No deploy.

## The Daily Loop

Of course, the only useful question about any dashboard is how often you actually look at it.  Mine is a three-glance routine.

- **Morning.**  Open `/logs`.  Anything red gets opened, fixed, or accepted as expected (with a note in the row).  Amber gets noted, not actioned.
- **Mid-week.**  Open `/triage`.  If the number is over twenty, I do not start anything new until it is back under fifteen.
- **Friday.**  Open `/projects` filtered to `last-active` more than 14 days.  Decide which ones go to `on-hold`, which ones still belong active, and which ones are quietly dead and should be `deprecated`.

Three glances, maybe twenty minutes a week, and the system stops drifting.

The room runs.  The room is also small enough that I can run it.  The next post is about what sits around the room:  the rest of KHIMAI.

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*

## Read More

If you want the umbrella context, where Mission Control sits inside the larger personal AI system and what the rest of that system looks like, that is the next post.  [Beyond Mission Control: KHIMAI](/blog/2026/f-beyond-mission-control-khimai/).

## Mission Control Series

1.  [Entropic Drift](/blog/2026/a-entropic-drift/)
2.  [Mission Foundations: Where Things Live](/blog/2026/b-mission-foundations/)
3.  [Mission Foundations: Behind the Curtain](/blog/2026/c-mission-foundations-tech-specs/)
4.  [Mission Foundations: From Disk to Dashboard](/blog/2026/d-disk-to-dashboard/)
5.  **Mission Foundations: Operating the Room** *(this post)*
6.  [Beyond Mission Control: KHIMAI](/blog/2026/f-beyond-mission-control-khimai/)
