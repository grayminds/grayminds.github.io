---
layout: page
title: Tonespeak
description: A multi-persona skill family for Claude Code that gives output a distinct voice under a strict per-dialect tone budget.
img: assets/img/projects/tonespeak/noir-thumb.png
images:
  slider: true
importance: 3
category: AI and automation
project_status: in-progress
started: 2026-05-16
github: https://github.com/grayminds/tonespeak
tags:
  - project
  - claude-code
  - skill
  - token-compression
---

## Why

Most agent output sounds the same:  flat, helpful, forgettable.  Tonespeak started from a simple itch - what if you could set your AI's mood the way you change the radio station?  Tell it to talk like a film-noir detective, a Viking skald, a caveman, or mission control, and have it stay in character while it actually does the work.  The fun is the point.  A tool you enjoy talking to is a tool you keep open.

The discipline underneath the play is a token budget.  Agent output runs long, and length costs money, so every dialect carries a voice and a per-dialect cap that keeps the flavor from costing more than the brevity it buys.  Character, but on a budget.

I held the numbers honest rather than picking a flattering benchmark.  Against default, unprompted output the dialects trim a median of about twenty-two percent, and the leanest runs near sixty-three.  Measured against an aggressive "be concise" instruction, though, most dialects run longer - they spend their budget on character, so the real trade is voice, not raw brevity.  The economy register, `laconic`, is the exception:  it holds about even with a bare concise instruction while still keeping a persistent voice.

## What it sounds like

The same weekend forecast, asked of one assistant in different moods.  Same facts every time; the voice is the variable.  Each caption notes how the length compares to the plain reply.

<style>
.ts-voices { margin: 1.75rem 0 0.5rem; }
.ts-voices swiper-container {
  --swiper-theme-color: #c8923f;
  --swiper-pagination-bottom: 4px;
  --swiper-navigation-size: 28px;
  display: block;
  width: 100%;
  padding-bottom: 2.6rem;
}
.ts-card {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  min-height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem clamp(3.25rem, 6vw, 4.25rem);
  --ts-fg: #f3efe7;
  background: #16191f;
}
.ts-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.ts-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.34);
}
.ts-card > * { position: relative; z-index: 2; }
.ts-card .ts-name,
.ts-card .ts-quote,
.ts-card .ts-len { color: var(--ts-fg) !important; }
.ts-card .ts-name {
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.85rem;
  opacity: 0.92;
}
.ts-card .ts-quote {
  font-size: 1.16rem;
  line-height: 1.55;
  margin: 0;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.45);
}
.ts-card .ts-len {
  margin: 1.05rem 0 0;
  font-size: 0.8rem;
  font-style: italic;
  opacity: 0.72;
}
/* Default - plain dot grid on light */
.ts-default { background: linear-gradient(135deg, #f6f6f9, #e7e7ee); --ts-fg: #1c1f25; }
.ts-default .ts-quote { text-shadow: none; }
.ts-default::after { background: rgba(246, 246, 250, 0.5); }
.ts-default::before {
  background-image: radial-gradient(circle, #c2c2cd 1.4px, transparent 1.6px);
  background-size: 22px 22px;
  opacity: 0.55;
}
/* Noir - light through venetian blinds */
.ts-noir { background: linear-gradient(135deg, #161a20, #0b0d11); }
.ts-noir::before {
  background-image: repeating-linear-gradient(125deg, transparent 0 17px, rgba(217, 161, 74, 0.16) 17px 21px);
}
/* Steampunk - brass gauge rings */
.ts-steampunk { background: radial-gradient(circle at 78% 28%, #3b2c1c, #1f160d 70%); --ts-fg: #efe2cd; }
.ts-steampunk::before {
  background-image: repeating-radial-gradient(circle at 80% 30%, transparent 0 24px, rgba(200, 146, 63, 0.15) 24px 28px);
}
/* Pirate - rolling swells */
.ts-pirate { background: linear-gradient(150deg, #123a40, #08222a); }
.ts-pirate::before {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120' preserveAspectRatio='none'><g fill='none' stroke='%23e8c87a' stroke-width='3' opacity='0.3'><path d='M0,32 q30,-18 60,0 t60,0 t60,0 t60,0'/><path d='M0,64 q30,-18 60,0 t60,0 t60,0 t60,0'/><path d='M0,96 q30,-18 60,0 t60,0 t60,0 t60,0'/></g></svg>");
  background-size: cover;
}
/* Deadpan - one flat line, nothing more */
.ts-deadpan { background: #272b31; }
.ts-deadpan::before {
  background-image: linear-gradient(transparent calc(50% - 1px), rgba(255, 255, 255, 0.18) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px));
}
/* Mission Control - starfield over a faint console grid */
.ts-missioncontrol { background: linear-gradient(160deg, #0a1422, #060c16); --swiper-theme-color: #4cd07a; }
.ts-missioncontrol::before {
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.7) 1px, transparent 1.4px),
    repeating-linear-gradient(0deg, transparent 0 39px, rgba(76, 208, 122, 0.08) 39px 40px),
    repeating-linear-gradient(90deg, transparent 0 39px, rgba(76, 208, 122, 0.08) 39px 40px);
  background-size: 70px 90px, 100% 100%, 100% 100%;
  opacity: 0.5;
}
/* Firefly - frontier sun low on dusty hills */
.ts-firefly { background: linear-gradient(165deg, #2b1d13, #150e09); --ts-fg: #f1e3d4; }
.ts-firefly::before {
  background-image:
    radial-gradient(circle at 80% 24%, rgba(224, 119, 47, 0.55) 0 38px, transparent 40px),
    radial-gradient(120% 80% at 20% 118%, rgba(224, 119, 47, 0.22) 0 40%, transparent 60%);
}
/* Tavern - hearth glow */
.ts-tavern { background: radial-gradient(circle at 30% 110%, #50331a, #1f1409 72%); --ts-fg: #f1e3cf; }
.ts-tavern::before {
  background-image: radial-gradient(circle at 30% 108%, rgba(230, 170, 80, 0.4) 0 30%, transparent 62%);
}
/* Tolkien - layered peaks under a high mist */
.ts-tolkien { background: linear-gradient(170deg, #1c2a22, #0f1710); --ts-fg: #ece6d4; }
.ts-tolkien::before {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120' preserveAspectRatio='none'><polygon points='0,120 58,42 112,120' fill='%23cdb06a' opacity='0.30'/><polygon points='78,120 150,24 222,120' fill='%23cdb06a' opacity='0.24'/><polygon points='150,120 200,56 240,120' fill='%23cdb06a' opacity='0.36'/></svg>");
  background-size: cover;
  background-position: bottom;
}
/* Laconic - one small mark, and that is all */
.ts-laconic { background: #25282d; }
.ts-laconic::before {
  background-image: radial-gradient(circle at 86% 78%, rgba(255, 255, 255, 0.5) 0 3px, transparent 4px);
}
</style>

<div class="ts-voices" markdown="0">
<swiper-container loop="true" autoplay="true" autoplay-delay="6500" speed="700" space-between="24" grab-cursor="true" navigation="true" pagination="true" pagination-clickable="true">
  <swiper-slide>
    <div class="ts-card ts-default">
      <p class="ts-name">Default</p>
      <p class="ts-quote">Saturday is expected to be the better day for a hike:  mostly sunny skies, a high of around sixty-eight degrees, and light winds, which should make for comfortable conditions on the trail.</p>
      <p class="ts-len">The reply every voice below is measured against.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-noir">
      <p class="ts-name">Noir</p>
      <p class="ts-quote">The weekend came in like a stranger with a clean story and a dirty coat.  Saturday plays it straight.  Sunday is the one that lies.  Hike Saturday.  Be off the mountain before Sunday gets ideas.</p>
      <p class="ts-len">22 percent shorter.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-steampunk">
      <p class="ts-name">Steampunk</p>
      <p class="ts-quote">A favorable barometer, I am pleased to report.  Saturday presents clear skies and a temperate sixty-eight degrees.  Walk Saturday, and shutter the expedition before the storm engages its gears.</p>
      <p class="ts-len">18 percent shorter.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-pirate">
      <p class="ts-name">Pirate</p>
      <p class="ts-quote">Avast.  Saturday be fair sailing:  skies clear to the horizon, the glass steady, a gentle wind off the stern.  Take your trail Saturday, and have them boots stowed afore the storm makes port.</p>
      <p class="ts-len">18 percent shorter.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-deadpan">
      <p class="ts-name">Deadpan</p>
      <p class="ts-quote">Saturday:  sixty-eight and clear.  Fine for hiking, if that is the sort of thing you do.  Sunday:  a cold front at noon, rain by three, colder.  Go Saturday.  The mountain will not be offended.</p>
      <p class="ts-len">39 percent shorter.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-missioncontrol">
      <p class="ts-name">Mission Control</p>
      <p class="ts-quote">GO for Saturday.  Conditions nominal:  skies clear, winds light, surface temperature holding near sixty-eight.  Sunday is NO-GO.  Recommend you hike Saturday and scrub Sunday.  Copy.</p>
      <p class="ts-len">25 percent shorter.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-firefly">
      <p class="ts-name">Firefly</p>
      <p class="ts-quote">Saturday's shiny, Captain.  Clear sky, near sixty-eight, easy wind - good day to walk the hills.  Sunday's gorram trouble.  Take your hike Saturday.  Sunday you stay aboard.</p>
      <p class="ts-len">26 percent shorter.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-tavern">
      <p class="ts-name">Tavern</p>
      <p class="ts-quote">Here's your weekend, friend.  Saturday's a kind one:  clear skies, near sixty-eight, a soft wind, made for walking the high trails.  Take Saturday for your hike, and raise a cup indoors when Sunday sours.</p>
      <p class="ts-len">24 percent shorter.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-tolkien">
      <p class="ts-name">Tolkien</p>
      <p class="ts-quote">In the bright hours of Saturday the sky shall stand clear and the air mild, and the wind but a whisper upon the hills; in that hour, go forth and climb.  Seek your hearth before the storm comes down from the heights.</p>
      <p class="ts-len">39 percent longer - flavor over brevity.</p>
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="ts-card ts-laconic">
      <p class="ts-name">Laconic</p>
      <p class="ts-quote">Saturday:  clear, sixty-eight, light wind.  Hike.  Sunday:  front at noon, rain by three, colder.  Go Saturday.</p>
      <p class="ts-len">63 percent shorter, the leanest of the twenty-four.</p>
    </div>
  </swiper-slide>
</swiper-container>
</div>

## How

Tonespeak is a pure-skill system.  The model reads and applies the active dialect's rules itself; there is no string-transforming middleware.  It ships as a Claude Code plugin - two hooks and a set of slash commands - with zero runtime dependencies.  A SessionStart hook injects only the active dialect, and a UserPromptSubmit hook reinforces it each turn so the voice does not drift back to verbose after the context is compacted.

Twenty-four dialects span three families, with strict genre separation:

- **bardspeak** - tavern, viking, D&D, Dragonlance, and Tolkien.
- **spacespeak** - mission control, Solar Clipper, Expanse, Firefly, Star Trek, Star Wars, Doctor Who, Battlestar Galactica, and Stargate.
- **stylespeak** - noir, caveman, cyberpunk, steampunk, pirate, western, deadpan, Renaissance faire, Shakespearean, and laconic.

Key capabilities:

- **Twenty-four dialects, three families** - each a self-contained skill file; a dialect is a style or register, not a proper-noun lookup table.
- **A selective loader** - eight tunable axes (compression, lexicon rate, trope frequency, and the rest) merged through dialect defaults, user overrides, and presets, including a `lite` preset that dials the flavor down.
- **A measured tone budget** - a linter counts only the surplus tokens a voice adds and holds each dialect to its cap, twelve percent by default.
- **Escape hatches** - every dialect drops to plain prose for destructive operations, security warnings, and real stakes, and never leaks persona into code, commit messages, or tool arguments.
- **An idempotent plugin installer** - installs into Claude Code's plugin system, with clean uninstall and purge paths, plus a dispatch shim that works around a missing environment variable in command preprocessing.
- **A three-arm eval harness** - measures each dialect against a fixed benchmark, comparing the persona against both unguided output and a plain "be concise" instruction, so the reported numbers are the honest delta.

## Result

Tonespeak is published on GitHub at [github.com/grayminds/tonespeak](https://github.com/grayminds/tonespeak) under an MIT license.  The slash commands, the hooks, and all twenty-four dialects work, with 152 tests passing.

## Technical Details

### Stack

- **Runtime:** Node.js (ES modules, no runtime dependencies, a hand-rolled minimal YAML parser); tested on Node 24
- **Integration:** the Claude Code plugin system, with SessionStart and UserPromptSubmit hooks plus a commands directory
- **Skills as data:** twenty-four markdown dialect files with YAML frontmatter, and shared core docs for compression, tone budget, and anti-patterns
- **Evaluation:** a three-arm harness with a direct-HTTP mode for clean measurement, a tone-ratio linter, and a snapshot reporter
- **Testing:** Node's built-in test runner; 152 tests passing

### Design decisions

- **Pure skill, not middleware.** The model executes the markdown rules, so every dialect is a portable file and the harness measures the exact skill that ships.
- **Honest metrics over a good headline.** The benchmark reports reduction against unguided output and against an explicit concise instruction, and names the dialects that trade brevity for voice rather than hiding them.
- **A hard, measured budget.** Tone-flavored tokens are defined precisely and capped per dialect, so the flavor never overruns the savings.
- **Strict genre separation.** No cross-pollination between families; each dialect is one voice, end to end.
