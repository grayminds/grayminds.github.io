---
layout: post
title: Why I'm Building a Website in 2026 (And Why You Should Too)
date: 2026-02-22
categories:
tags:
  - personal-brand
  - product-management
ai_assisted: true
---

I'll be honest. I haven't paid attention to front-end code in years. My specialization is data and backend automation; within corporate, my user interfaces are constrained by the automation tool's development environment.

So when I decided to build a personal website on GitHub Pages, I knew I wasn't going to sit down and hand-code every piece of it. I am going to use AI. The question is which AI, and how.

## Your Experience May Vary

I have been using AI tools - but within use cases of documentation, refinement, and sometimes creativity. So - new project means new use cases that I began comparing across multiple AI platforms. The experiences were not equal.

Some tools were too agreeable. I'd get confident, well-structured answers that turned out to be wrong. It became a running joke with friends: "Yes, you're right, let me check my work." When your AI assistant agrees with everything you say and then quietly rewrites its own answer, trust erodes fast.

Other tools struggled with context. They would lose track of decisions we had already made, reference outdated approaches, or forget the architectural patterns we had established two prompts earlier. For example, yes, I really do want two spaces and the oxford comma in all of my work - it is a reflection of my deep appreciation for literature and readability.

The lesson: your experience with AI varies significantly based on the tool. Because of limitations and frustrations with some platforms, I kept seeking a better fit for my needs. That search led me to Claude Opus, which brings a different kind of confidence: not the "yes, you're right" kind, but the "here's why, and here's what to watch out for" kind.

## How the Relationship Evolves

At first, I used AI as a mentor coach. Simple questions:

- I want to build a website on github.io. How do I do that?
- What templates are available that meet my criteria?
- How do I run this locally for faster feedback?

Then, as my trust increased, the collaboration deepened. I started asking architectural questions:

- Timeline3 is designed for hardcoding events into JSON. How do we restructure this into a YAML and Liquid workflow?
- This component assumes static data. How do we make it data-driven?

And here's where it gets fun.

## Separation of Data from Code

I haven't been in front-end world for a while, so getting to see actual separation of data models from presentation is a great moment. YAML files for structured content, essentially simplified lists of items that are even more readable than JSON. Liquid templates that function like HTML on overdrive, with scripting and data binding built in.

The ability to throw together a YAML file, keep updating it as details evolve, and watch the site regenerate is genuinely satisfying. Don't laugh, but seeing the current state of front-end tooling is a pleasant surprise.

## AI as Co-Writer

Where I've ended up is that Claude is the co-writer of the process. I do not sit and code each piece of markup. Instead, I have to be clear in my communication, specify the pattern I want, and review what is provided.

This is a different skill than coding. It's closer to technical direction. You're not writing the implementation; you're defining the intent and validating the output.

## Credit Where It's Due

I want to give a shoutout to the contributors behind the [al-folio](https://github.com/alshedivat/al-folio) Jekyll template. They built a foundation that lets me start by simply swapping out Albert Einstein's placeholder data with my own. That's outstanding open-source work: giving others a running start.

And then my curiosity says, "and then what?" I knew I wanted timelines, so I found a working timeline solution. But it wasn't in the format I needed. So I use Claude to translate it from one architecture to another.

That's the pattern. Find a foundation someone else built. Learn from it. Extend it with AI as your co-developer. Mentorship doesn't have to be in person; sometimes it's the prior work that others left for you to build on.

---

_This post was created with AI assistance. I used AI tools for drafting, code generation, and architectural problem-solving, and reviewed all content for accuracy and alignment with my intent. I take full responsibility for the final product. [Read my full AI disclosure.](/ai-disclosure/)_
