---
layout: post
title: The Boris Checkride Scorecard
date: 2026-07-07
categories:
  - ai-workflow
tags:
  - claude-code
  - boris-playbook
  - verification
  - compass-rose
---


This is the build companion to [The Checkride: One Day Against the Boris Playbook](/blog/2026/a-boris-playbook-checkride/).  That post tells the story - a written playbook, an honest scorecard, five waves, and a second table by evening.  This one carries the working material:  the prompt to run your own checkride, the eight-principle scorecard, the baseline-versus-evening table, the bug the first test caught, and the configuration details.  I share it in the spirit of practitioners comparing notes:  take what is useful, leave the rest, and tell me what I got wrong.  The source series is at howborisusesclaudecode.com (January through June 2026).

## The prompt

Paste this into your coding agent to run the same checkride against your own environment.  It carries the method so your agent does not have to rediscover it:

```text
Run a checkride on my development environment against the playbook below.
Score first, change nothing until the baseline is written down.

1. Grade my environment against each of these eight principles, one grade
   each (Strong / Partial / Mixed / Gap), with one sentence of evidence per
   grade:
     1. Verification is the multiplier
     2. Write it down, don't re-prompt
     3. Run many Claudes, not one big one
     4. Automate the inner loop
     5. Delegate, don't guide
     6. Context minimalism
     7. Trust plus safety rails
     8. Workflows for the biggest jobs
2. Before changing anything, capture a baseline table of hard metrics in a
   dated note.  Rows must be countable, not impressions:  automated tests in
   my most active project, projects with committed tool settings, projects
   with handoff docs, stale config artifacts, backlog items marked pending,
   permission deny rules, and always-on context size in bytes.  Verify each
   "pending" count against the live system before recording it;  do not
   trust documentation.
3. Plan fixes in waves, ordered by leverage:  verification harness first,
   then bootstrap for unconfigured projects, then context slimming and
   safety rails, then the backlog, then any open decisions.  One wave at a
   time.
4. After every wave, re-emit the exact same table - same rows, same order -
   with a new column.  The delta between columns is the report.  Never
   summarize an improvement that the table does not show.
```

## The scorecard, morning of the audit

| # | Principle | Grade |
|---|---|---|
| 1 | Verification is the multiplier | Partial |
| 2 | Write it down, don't re-prompt | Strong |
| 3 | Run many Claudes, not one big one | Partial |
| 4 | Automate the inner loop | Partial |
| 5 | Delegate, don't guide | Partial |
| 6 | Context minimalism | Gap |
| 7 | Trust plus safety rails | Mixed |
| 8 | Workflows for the biggest jobs | Gap |

## Baseline versus evening

| Metric | Morning | Evening |
|---|---|---|
| Automated tests in the dashboard project | 0 | 43 (all passing) |
| Projects with committed settings.json | 2 of 18 | 8 of 18 |
| Projects with handoff docs | 1 of 18 | 6 of 18 |
| Stale .claude artifacts | 2 | 0 |
| Classifier proposals pending | 75 | 0 |
| User-scope permission deny rules | 0 | 7 |
| Standing-ritual ownership | undecided | cockpit queue (4 entries) |
| Always-on context (root CLAUDE.md) | 16,974 bytes | 3,803 bytes |
| Project-registry drift discrepancies | 5 | 0 |

## The bug the first test caught

The dashboard seeds its project sections with a guard that decides whether the seed already ran by counting rows.  The count was unscoped, and a different seed ran first, so on a fresh database the `section_order` seed never executed.  Every fresh deploy would have rendered the Foundation section above Active.  The suite that caught it was the first ever written for the project:  `node:test`, zero new dependencies, 43 tests, about a second to run.

## The rails

Auto mode without deny rules is trust without a seatbelt.  Seven user-scope deny rules now cover force-push (both spellings), `rm -rf /`, and reads or writes of credential files.  A small, curated, boring list - which is exactly what the playbook prescribes alongside the approval classifier.

## The context cut

The root CLAUDE.md carried its own phase changelog inline:  16,974 bytes of always-on context loaded into every session.  The changelog moved verbatim to `docs\devlog.md` with a one-line pointer, leaving 3,803 bytes.  Newer models want minimal always-on context plus a way to pull the rest.  Front-loading is micromanaging.

## The 75 that were zero

The plan called for a dynamic multi-agent workflow to process 75 pending classifier proposals.  A dry run showed the apply script had already run in an earlier session - 184 tags and 218 project links were already in the database - and only the documentation still said "pending."  The fix was a live-database backup, an idempotent re-apply, one stale suggestion rejected, and corrected headers, all in one commit.  The dry run cost one command and saved an entire orchestration build.

For the story - why a playbook needs a checkride, and what the five waves felt like from the cockpit - go back to [The Checkride: One Day Against the Boris Playbook](/blog/2026/a-boris-playbook-checkride/).

---

*This post was created with AI assistance.  I used AI tools for drafting and editing, working from the checkride notes and measured metrics I directed.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
