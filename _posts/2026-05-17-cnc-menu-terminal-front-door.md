---
layout: post
title: The Menu That Has No Opinions
date: 2026-05-17
categories:
  - tooling
tags:
  - claude-code
  - powershell
  - workstation
  - tooling
---

For a while, every task started with the same small delay:  where did I put that script.

The sync script for one project, the deploy command for another, a runbook I wrote three weeks ago and was sure I would remember.  Nothing was lost, exactly.  It was scattered, and the first thirty seconds of any job went to finding the thing instead of doing the thing.  Thirty seconds, ten times a day, is a tax you stop noticing because you are always paying it.

So I built a launcher I can call from anywhere by typing one word:  `cnc`.  It opens a numbered menu of everything I might want to run - every project's scripts, every runbook.  The part I am proud of is what it does not have:  a list of its own.  It does not store what exists.  It reads what exists, from the same notes and folders I already maintain, every time it opens.  Add a project the normal way and it appears in the menu.  Rename one and the menu renames with it.  I never edit the menu, because there is nothing in the menu to edit.

The first launcher I wrote did the opposite, and it rotted in a day.  It kept its own numbered list, so every new script meant editing the menu and every rename meant editing the menu - a second place to keep in sync, when the whole point was to stop keeping things in sync by hand.  A list you maintain by hand is just another thing to forget to update.

The payoff I did not plan was repair.  Once the menu knew what a registered project looked like, it could spot an unregistered one:  a folder doing real work with no record announcing it.  So I taught it to fix that.  When it finds an orphan, one keystroke writes the missing record from inside the menu.  The same tool that reads the list can mend the list.  One of my own projects got registered exactly that way.

The lesson worth keeping even if you never build a launcher:  when a tool keeps its own copy of what already exists somewhere else, the copy is not a convenience, it is a debt.  The interest is the quiet drift between the two lists that you only notice at the worst moment.  The fix is not a better copy.  It is no copy - point the tool at the source and let it read.  Now "where did I put that script" has one answer, and it is to type three letters.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

`cnc` (Command-And-Control) is a self-maintaining PowerShell dispatch shell at `D:\code\projects\cnc-menu\cnc.ps1`.  A one-line function in my profile makes it a verb I can type from anywhere:

```powershell
function cnc { & 'D:\code\projects\cnc-menu\cnc.ps1' @args }
```

It scans three roots on launch:  my project registry (`50_projects/*/index.md`), the per-project `scripts/` folders those records point at, and vault runbooks (notes tagged `type: runbook`).  No cache, no daemon, no index file to fall out of date;  scanning fresh each launch costs a fraction of a second, and in exchange the menu is never wrong.

A few deliberate non-features.  It does not couple to the NAS, so the dashboard can be down and cnc still opens.  It does not run in the background, and it works entirely from the vault on local disk, so it works with the internet off.  The orphan-repair command writes a real `50_projects/<slug>/index.md` from the menu, and a stable hotkey (`99` for "show all") stays put as sections come and go, so muscle memory survives.  It reads the same source my dashboard reads:  one is a web surface, the other terminal flow, and neither owns the truth.

</details>

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
