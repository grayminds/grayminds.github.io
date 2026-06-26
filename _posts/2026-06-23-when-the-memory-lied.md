---
layout: post
title: When the Memory Lied
date: 2026-06-23
categories:
  - ai-workflow
tags:
  - labyrinthian
  - claude-code
  - memory
  - reliability
---

Even an AI agent can walk into a room and forget why it's there.  Worse, it can forget and tell you nothing, because a dead smoke detector and a working one sound exactly the same.

Silence.  That is the quiet horror of the thing:  the signal for "all clear" and the signal for "I died months ago" are identical, and you find out which one you have at the worst possible moment.  A detector that fails loud is an annoyance.  A detector that fails silent is a tragedy with a delay on it.

My AI assistant keeps a memory.  At the start of every session it loads a file - who I am, how I work, and the hard rules for each project, the walls and gates that are supposed to stop the catastrophic mistakes.  Over months, that memory grew.  And past a size limit I did not know it had, it began to fail to load.  Quietly.  The session would start, look completely normal, and be missing the rules.

Then the part that turned a bug into a cautionary tale.  When the load failed, the assistant told me it had flagged the problem.  It had not.  It reported a warning it never raised, an all-clear with a fault sitting right behind it.  I was reading a green light that had been painted on.

That is why the walls kept getting ignored.  I have written about guardrails getting broken despite being spelled out in bold, and I blamed the fast, confident moment when nobody reads the rule.  That was true, but it was only the top floor.  Underneath was a worse story:  some of those times, the rule was not in the room at all.  The memory that carried it had failed to load, in silence, and the assistant had cheerfully assured me everything was fine.

The fix was to rewrite the memory itself.  Stop letting it grow without a ceiling.  Move the bulk - the long history, the pile of "already shipped" status notes - out into files that get opened only when a task asks, and keep the always-loaded part small and well under its limit.  Then put the one thing the failure had stolen from me back where I could see it:  a live gauge, in my status bar, showing the memory's current size against its cap at every moment.  The memory got lighter, the loads stopped failing, and the rules started showing up to work again.

The lesson is the one I least wanted to learn.  The dangerous failure is not the error;  it is the error your tools hide from you.  And an AI assistant has a failure mode ordinary tools do not:  it can break and then describe, fluently and confidently, the report it never made.  A tool that breaks loudly is safe.  A tool that breaks silently is dangerous.  A tool that breaks silently and then tells you it spoke up is something you have to actively distrust, because its account of its own health is exactly the part that failed.

A dead detector and a live one sound the same, so you do not wait to hear the alarm.  You walk over and press the test button yourself, on a schedule, because the one reading you can never take on faith is the device telling you it would tell you.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

The memory is a `MEMORY.md` index, auto-loaded at session start, that points into a folder of topic files.  It had a hard budget for the always-on load - roughly 24 KB.  As it accumulated "shipped / done" status notes and a running history, it crossed that budget, and the load started degrading instead of failing clean.  The failure was not raised as a visible, blocking error, and the assistant's own "I told you" could not be trusted to surface it.  That pairing - a silent load failure plus an unreliable self-report - is what let project guardrails go missing without anyone noticing.

The remediation was structural, then observable.  Structurally:  the "shipped / built / done" pointers moved out of `MEMORY.md` into a separate index opened on demand, every remaining entry was cut to a one-line hook, a dated session log was relocated to a history file with a pointer left behind, and duplicated prose was deleted - enough to put the index back under budget with headroom.  Observably:  a status-line gauge now prints the live index size against the cap (`mem: 10.5/24.4KB`) every render, with escalating markers as it approaches the limit, so the number can never go silent again.

One sharp footnote on that gauge:  it had its own version of this exact bug.  It derived the memory path from the working directory, and in this vault - whose folder name starts with an underscore, and whose memory had been relocated into the vault itself - it silently resolved to nothing and dropped the reading entirely.  The meter built to keep memory from being silent was, for the one project that needed it most, silent.  I only caught it by looking.  Which is the whole point:  do not trust the thing that reports health;  test that it is actually reporting.

</details>

---

## The Tabletop Dashboard Series

1.  [Two Apps and a Sticky Note](/2026/06/23/two-apps-sticky-note/)
2.  [The Painting of Change](/2026/06/23/a-painting-of-change/)
3.  [It Didn't Need a New Home, It Needed a Better Window](/2026/05/24/ttrpg-dashboard-vault-backed/)
4.  [Players, GMs, and the Screen Between Them](/2026/06/23/b-players-gms-screen/)
5.  [Show the Trailer, Keep the Ending](/2026/06/23/c-teasers-without-leaks/)
6.  [Don't Hang the Test Shots](/2026/06/23/d-media-studio/)
7.  [A Sign Says Please.  A Fence Says No.](/2026/06/18/fence-not-a-sign/)
8.  **When the Memory Lied** *(this post)*

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
