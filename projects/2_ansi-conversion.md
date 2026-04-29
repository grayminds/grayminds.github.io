---
layout: page
title: BBS ANSI Art Recovery
description: Converting early-1990s TheDraw ANSI animation files into viewable animated GIFs using Claude Code.
img: assets/img/projects/ansi-art/MILLIWAY-thumb.png
importance: 1
category: archival
project_status: completed
started: 2026-03-01
completed: 2026-03-08
tags:
  - project
  - ansi-art
  - bbs
  - claude-code
  - digital-preservation
---

## Why

In the pre-internet days, there were BBSes (Bulletin Board Systems).  That's right - all the dial tones of the modem to dial up local numbers (also back in the days of long-distance calling charges).  One of my early technical hobbies was drawing ANSI animation files for BBSes (both mine and others).  These were home screens for bulletin board systems, hand-drawn character by character in TheDraw, animated frame by frame, designed to greet every caller who dialed in.  I collaborated with friends who ran BBSes, and the home screen was everything.

These files survived every platform transition I put them through.  Hard drives, NAS devices, directory reorganizations spanning decades.  They outlasted the applications that created them and the operating systems those applications ran on.  They persisted, unopenable, because I refused to throw them away.

I wanted to see them again.

## How

I pointed Claude Code at the files.  "These are ANSI animation files from TheDraw. Convert them to animated gifs."

Claude identified the TheDraw format, parsed the ANSI escape codes for color and positioning, reconstructed the frame sequences, and converted them into animated GIFs.  The color palette and frame timing were preserved.  No hunting for obscure conversion utilities.  No uploading personal files to random websites.

The process was direct: point at the folder, describe the goal, review the output.

## Result

Screens I had not seen in over thirty years, rendered on a modern display.  Old screen handles I had completely forgotten stared back at me.  One was unmistakably a Douglas Adams reference.  I must have been deep into *The Hitchhiker's Guide to the Galaxy* that year.  I don't remember choosing that handle.  But the file does.

The part of AI that rarely gets discussed is not what it builds forward, but what it recovers from behind.  These files were locked in format obsolescence for three decades.  The future showed up and read them.

<details markdown="1">
<summary><strong>Gallery: Recovered ANSI Art</strong></summary>

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/MILLIWAY.gif" title="Milliway's - The Restaurant at the End of the Universe" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/COVE.gif" title="Cove" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/CPALACE.gif" title="Crystal Palace" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/CRYSTC.gif" title="Crystal Cavern" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/GHOST.gif" title="Ghost" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/SUNRISE.gif" title="Sunrise" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/SHUTTLE2.gif" title="Shuttle" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/CAMELOT.gif" title="Camelot" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/BSTAR.gif" title="Bright Star" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/MIST.gif" title="Mist" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/PROTEAN.gif" title="Protean" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/PROTEAN2.gif" title="Protean 2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/QLEAP.gif" title="Quantum Leap" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/OTIMER1.gif" title="Old Timer 1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/OTIMER2.gif" title="Old Timer 2" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/projects/ansi-art/RABBIT.gif" title="Rabbit" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

</details>

<details markdown="1">
<summary><strong>Technical Details</strong></summary>

### What Are TheDraw ANSI Files?

TheDraw was a DOS-based ANSI art editor popular in the BBS scene from the late 1980s through the mid-1990s.  It produced files containing:

- **ANSI escape codes** for 16-color text formatting (foreground/background)
- **CP437 character set** (the DOS extended ASCII set with box-drawing characters, shading blocks, and special symbols)
- **Animation sequences** using cursor positioning and timed delays between frames

These files were designed to be rendered by terminal emulators at specific baud rates.  The animation timing was often tied to the speed of the modem connection.

### Conversion Process

1. **Format identification** -- Claude Code inspected the raw file bytes and identified TheDraw's binary format markers and ANSI escape sequences
2. **Escape code parsing** -- Extracted color attributes (SGR sequences), cursor movement commands, and frame delimiters
3. **Character rendering** -- Mapped CP437 code points to visual glyphs and rendered each character cell with correct foreground/background colors
4. **Frame reconstruction** -- Identified animation boundaries and built individual frames as images
5. **GIF assembly** -- Combined frames into animated GIFs with timing derived from the original delay codes

### Tools and Environment

- **Execution:** Claude Code (Opus) running locally on Windows 11
- **Language:** Python scripts generated and executed by Claude Code on the fly
- **Dependencies:** Pillow (PIL) for image rendering and GIF assembly
- **Input:** Raw `.ANS` and `.THD` files from circa 1991-1994
- **Output:** Animated GIFs with original color palette preserved

### Challenges

- CP437 glyph rendering requires a bitmap font that maps the full 256-character set; standard Unicode fonts miss several box-drawing variants
- Animation timing in the original files assumed 2400-9600 baud rendering speed; GIF frame delays needed manual tuning to feel right on a modern display
- Some files used ANSI "sauce" records (metadata appended after EOF) that required separate parsing

### Replication Notes

If you have your own TheDraw or ANSI files and want to try this:

1. Gather your `.ANS`, `.THD`, or `.ICE` files into a single folder
2. Use Claude Code with access to the local filesystem
3. Prompt: "These are ANSI art/animation files from the BBS era.  Convert them to animated GIFs preserving the original colors and timing."
4. Claude will generate Python scripts using Pillow; ensure Pillow is installed (`pip install Pillow`)
5. Review the output GIFs and adjust frame timing if the animations feel too fast or slow

</details>
