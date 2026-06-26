---
layout: post
title: Let the Assistant Do the Voices
date: 2026-05-20
categories:
  - claude-code
tags:
  - claude-code
  - skills
  - writing
  - personal-ai
---
Many in technology are spending more and more time with an AI assistant.  And it has exactly one mood:  pleasant, capable, and the killer instinct of a wet sidewalk.  That is fine for a while, but it is like listening to the same track of music all week long.

So I gave my AI dialects and flourishes.  Not another settings panel to babysit - it is closer to changing the station than changing a setting.  You do not configure a radio; you turn the knob until the room sounds right, and you turn it again when the mood shifts.  One slash command and the assistant changes its station.  

Heads-down and tired, I tune it clipped and calm, like a flight controller.  Grinding through something dull, I would rather be on a ship with a pirate barking the orders.  **Some afternoons I just want the thing to have a little fun with me.  The work is the same.  The companionship is not.**

That is the whole idea, and it is unapologetically a personal one.  This is the assistant I live beside all day.  Giving it a mood makes the hours feel less like filing and more like working next to someone with a personality - someone who is, on the better days, good company.  It is fun.  I am allowed to want my tools to be fun.

To show you, I asked all of them the same gloriously beside-the-point question:  *tell me about this weekend's weather and whether it is any good for a hike.*  First the assistant in its usual mood, then the others.  Same forecast every time.  The small caption under each compares its length to the plain reply up top - because some voices say it in fewer words and some cheerfully spend more, and that spread is part of the charm.

**Default.**  *The assistant as it ships.  The reply every voice below is measured against.*

> Here is a look at the weekend forecast to help you decide.  Saturday is expected to be the better day for a hike:  mostly sunny skies, a high of around sixty-eight degrees, and light winds, which should make for comfortable conditions on the trail.  Sunday looks less favorable.  A cold front is forecast to move through around midday, bringing increasing clouds, a good chance of rain by mid-afternoon, and cooler temperatures.  If you are planning to hike, Saturday would generally be the better choice.  As always, check a local forecast and trail conditions before you head out, and consider packing layers and rain gear just in case.

<!-- ===== stylespeak ===== -->

**Noir.**  *22 percent shorter.*

> The weekend came in like a stranger with a clean story and a dirty coat.  Saturday plays it straight:  a high near sixty-eight, a sky with nothing to hide, a breeze that does not ask questions.  That is your day on the trail.  Sunday is the one that lies.  A cold front slips in around noon, rain by three, the temperature dropping like a name nobody wants to say out loud.  Hike Saturday.  Be off the mountain before Sunday gets ideas.

**Steampunk.**  *18 percent shorter.*

> A favorable barometer, I am pleased to report.  Saturday presents clear skies, a temperate sixty-eight degrees, and a gentle current of air - well suited to an ascent on foot.  Sunday, regrettably, admits a cold front at the noon hour, rain upon the works by three, and a falling glass.  Walk Saturday, and shutter the expedition before the storm engages its gears.

**Pirate.**  *18 percent shorter.*

> Avast.  Saturday be fair sailing:  skies clear to the horizon, the glass steady, a high near seventy and a gentle wind off the stern.  Make for the high country at first light.  But Sunday a squall comes runnin' up from the south by midday, rain in the rigging by three bells, and the mercury divin' for the bilge.  Take your trail Saturday, and have them boots stowed afore the storm makes port.

**Deadpan.**  *39 percent shorter.*

> Saturday:  sixty-eight and clear.  Fine for hiking, if that is the sort of thing you do.  Sunday:  a cold front at noon, rain by three, colder.  Less fine.  Go Saturday.  The mountain will not be offended.

<!-- ===== spacespeak ===== -->

**Mission Control.**  *25 percent shorter.*

> GO for Saturday.  Conditions nominal:  skies clear, winds light, surface temperature holding near sixty-eight.  That is your window for the trail.  Sunday is NO-GO.  A frontal boundary crosses the field around noon, precipitation expected by fifteen hundred, temperatures falling.  Recommend you hike Saturday and scrub Sunday.  Copy.

**Firefly.**  *26 percent shorter.*

> Saturday's shiny, Captain.  Clear sky, near sixty-eight, easy wind - good day to walk the hills.  Sunday's gorram trouble:  front rolls in round noon, rain by three, cold comin' after.  Take your hike Saturday.  Sunday you stay aboard.

<!-- ===== bardspeak ===== -->

**Tavern.**  *24 percent shorter.*

> Here's your weekend, friend.  Saturday's a kind one:  clear skies, near sixty-eight, a soft wind - made for walking the high trails.  But Sunday turns on you.  A cold front comes through at noon, rain by three, a chill after.  Take Saturday for your hike, and raise a cup indoors when Sunday sours.

**Tolkien.**  *39 percent longer - flavor over brevity.*

> In the bright hours of Saturday the sky shall stand clear and the air mild, near three-score and eight, and the wind but a whisper upon the hills; in that hour, go forth and climb.  Yet on Sunday a grey front shall come down out of the noon, and rain shall fall ere the third hour, and cold shall follow after.  Walk while the light is fair, and seek your hearth before the storm comes down from the heights.

<!-- ===== closer (keep laconic last) ===== -->

**Laconic.**  *63 percent shorter, the leanest of the twenty-four.*

> Saturday:  clear, sixty-eight, light wind.  Hike.  Sunday:  front at noon, rain by three, colder.  Go Saturday.

Same cold front every time, in a different mood each pass.

That is the part I did not expect to enjoy as much as I do:  which voice you reach for says something about the day you are having.  A tired Tuesday wants laconic.  A long debugging slog goes down easier with someone narrating it like a quest.  When the work is grim, a deadpan that refuses to be impressed is oddly steadying.  The assistant did not get smarter.  It got company.

There is a tidy footnote, and I am going to keep it a footnote.  The leaner voices use fewer words, so a few of them quietly trim the bill while they entertain me, and a few others happily spend more.  Nice either way, but never the reason.  I did not give my assistant a mood ring to save a few cents.  I did it because a voice with a point of view is better to sit beside for eight hours than one without.

I owe a word on lineage.  The idea has a seed:  a clever little project that makes an assistant talk like a caveman, purely to save words.  I loved it, and then I noticed the part I loved was not the saving.  It was the caveman.  The real lever is register itself - a mood chosen to fit the moment, and the plain pleasure of getting to choose one.

My assistant was always more than the accountant.  It just needed a mood, the same thing that makes the dragon worth leaning in for.  Now the long hours have better company, and on a good day the room has a little weather of its own.  The forecast, for the record:  go Saturday.

<details markdown="1">
<summary><strong>For people who build things</strong></summary>

Tonespeak is a skill family for Claude Code, released at v0.1.0 and public on GitHub under an MIT license.  The original idea - an assistant that compresses by talking in character - traces to `JuliusBrussee/caveman`, credited in the README; this is a clean-room reimplementation that takes the mechanism wider and treats voice, not compression, as the point.  It is a pure-skill design:  no program sits between you and the model rewriting text afterward.  The model itself reads the chosen voice's rules and speaks that way.

Twenty-four voices ship across three families.  Spacespeak is the operational set of nine, from the mission-control cadence above and a Solar Clipper register to a belter Expanse voice and lighter Star Trek, Star Wars, Firefly, Doctor Who, Battlestar Galactica, and Stargate takes.  Bardspeak runs warmer across five, from a tavern storyteller to viking saga to Dragonlance pulp fantasy to the dungeon-master and Tolkien registers.  Stylespeak is the register set of ten, where the voice is a style rather than a setting:  noir, caveman, cyberpunk, steampunk, pirate, western, deadpan, Renaissance faire, Shakespearean, and the economy register, laconic.  You switch with `/bardspeak`, `/spacespeak`, `/stylespeak`, or `/tonespeak <dialect>` to name any voice directly, and `/normal` to drop back to plain prose.

A word on the numbers, since I quoted some.  Each voice carries a tone budget - a cap on how much of the answer the character is allowed to spend, from the leanest near seven percent up to the Shakespearean voice near twenty-eight - so the flavor stays a seasoning, not the meal.  A three-arm benchmark measures each one against plain output, against a bare "be concise" instruction, and as the dialect itself.  The honest result:  a median around twenty-two percent shorter than unprompted output, up to sixty-three for laconic, but longer than a bare concise instruction for most, because that extra length is the character you asked for.  The savings are real and beside the point.  Methodology and per-dialect figures are in the repository.

The interesting work was not the voices.  It was the plumbing at the edge of the plugin host, and every bug lived there.  The installer wrote its config to the wrong drive because it trusted the operating system's idea of "home" over my own.  The activation hook produced what looked like nothing, until I found the host had quietly tightened the format it accepts and was dropping my output as malformed rather than missing.  The slash commands returned "unknown command" because the host intercepts slash input before the hook I had wired ever runs.  None of these were the idea failing.  All of them were the seam between my code and someone else's program, which is where this kind of work always actually lives.

</details>

---

*This post was created with AI assistance.  I used AI tools for drafting and editorial review, and reviewed all content for accuracy and alignment with my intent.  I take full responsibility for the final product.  [Read my full AI disclosure.](/ai-disclosure/)*
