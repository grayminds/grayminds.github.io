---
layout: post
title: Wiring the GM Screen
date: 2026-07-15
categories:
  - ttrpg
tags:
  - labyrinthian
  - ttrpg
  - access-control
  - security
---


This is the build companion to [Players, GMs, and the Screen Between Them](/blog/2026/b-players-gms-screen/).  That post tells the story - a cardboard GM screen at the table, rebuilt in code as a security boundary on Labyrinthian.net.  This one carries the wiring:  the prompt to audit a screen like it, the projection step that does the redacting, and the forensics that shaped each design constraint.  It assumes you have opened a network tab before and are comfortable reading what the server actually sent.

## The prompt

Paste this into your agent on any multi-viewer app that claims to redact privileged content server-side.  It runs the one test that matters:  attack the boundary from the non-privileged seat and read the bytes, not the rendered page.

```text
I have a web app with a privileged viewer (game master / admin) and
non-privileged viewers (players).  The server is supposed to redact
privileged content BEFORE serialization, so a non-privileged account
never receives it in the response at all - not hidden with CSS, removed
from the payload.  Run an adversarial redaction audit and prove or
disprove that claim.

Steps:
1. Sign in to (or simulate) a non-privileged account with its OWN
   identity - its own GUID / session, not the privileged account's.  The
   boundary must be tested from the player's seat, not assumed from the
   GM's.
2. Enumerate every API route and every page payload that account can
   reach.  List each endpoint you probe.
3. For each one, diff what the server returns against the privileged
   view of the same object.  Compare the raw bytes, not the rendered
   DOM.
4. Flag any privileged content present in the response even when it is
   not rendered - GM-authored entries, private notes, hidden objects,
   identity-bearing fields, and ACL-gated media paths that resolve without a
   membership check.
5. Report each finding as LEAK (privileged content in the bytes) or
   CLEAN (redacted before it shipped).  For every LEAK, name the
   endpoint, the field, and the account that should not have seen it.
6. Produce a scorecard:  endpoints probed, leaks found, leaks fixed, and leaks remaining.

Treat a field that is styled out of view but present in the response as
a LEAK, not a pass.  A tablecloth over the notes is not a screen.
```

The rule the prompt enforces:  a boundary you have only attacked from the privileged seat is a boundary you are assuming holds.  Sign in as the member, with that member's own GUID, and try to reach what the GM can see.

## Server-side redaction, not a display rule

The easy version of a GM screen hides privileged content with a display rule.  The data is in the page;  it is just styled out of view.  That is not a screen.  It is a tablecloth thrown over the GM's notes, and any player who reads the response can lift it.

Labyrinthian does the redaction on the server, before a single byte leaves.  A player's request is answered with a copy of the world that has the GM's secrets removed, not hidden.  GM-authored NPCs, private notes, and game-master entries in the shared feed are stripped out server-side.  When players co-author a scene, a player's contribution can never fold in a detail they were never allowed to see, because the version they are working from never contained it.

The auth underneath is account-based - Cloudflare D1, accounts keyed by GUID - with a campaign-membership model on top.  The access rules are owner-plus-roles:  a player owns their characters, a GM or admin sees all, and any object (character, NPC, or place) can carry a public toggle.  NPCs and places get first-class dashboards of their own, routed at `/d/<slug>`, scoped without a base.

## Per-viewer projection produces a smaller object

The hot path is a projection step - `projectEntryForViewer` and `redactGenHistory` - that runs before serialization.  A non-GM viewer receives a structurally smaller object.  GM entries and GM-authored contributions are dropped, not flagged.  This is the load-bearing distinction for an audit:  when redaction removes rather than hides, the non-privileged response is a different shape than the privileged one, and the diff in step 3 of the prompt has nothing privileged to find because there is nothing there.

Vote tallies show the same discipline.  They collapse to an aggregate count plus a viewer-scoped `youVoted`, so a list of names never leaks an identity.  The viewer learns the total and their own vote, and no more.

## ACL-gated images

Redaction that stops at JSON is half a screen.  Image access is gated the same way:  `/api/image` takes an absolute vault path and checks folder ACL - party versus public - before serving.  A privileged media path that resolves for a non-member is a leak whether or not any page ever renders it, which is why the prompt flags ACL-gated media paths explicitly.

## The early audit:  one real leak, two misreads

The boundary took iterations to get right.  One early audit flagged a real ACL leak, which was a genuine bug and is now resolved.  The same audit reported a couple of other "leaks" that turned out to be misreads - the content looked privileged from the outside but was already redacted or legitimately public.

Both outcomes are worth naming, because an adversarial audit produces both.  A real leak is a fix.  A misread is a false positive that costs you time if you trust the label without confirming the byte.  The scorecard exists to separate them:  every finding is LEAK or CLEAN only after you have diffed the response against the privileged view, not on first impression.

## The principle

Enforce the rule where it cannot be leaned over.  If the rule is "this person must not see that," redact in the data, on the server, before it ships - not in the template, not in a CSS class, and not in a hope that nobody opens the network tab.  Then attack the result from the seat that is supposed to be blocked, with that seat's own identity, and diff the bytes.  A screen you have not attacked from the player's side is a screen you are only assuming is opaque.

---

*This post was created with AI assistance.  I used AI tools for drafting and editing, and for compiling the technical drill-down, working from the build notes I directed.  I reviewed all content for accuracy and alignment with my intent, and I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
