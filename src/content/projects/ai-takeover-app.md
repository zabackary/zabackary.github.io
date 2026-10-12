---
name: "AI Takeover App"
description: "Client application for 2026 CAJ HS StuCo spring event"
status: finished
startDate: 2026-03
endDate: 2026-03
tags: [web, stuco, community, supabase, ai-assisted]
languages: [typescript]
glyph: 🤖
color: "#ffb4a8"
github: https://github.com/zabackary/ai-takeover-app
githubPrivate: true
liveSite: https://zabackary.github.io/ai-takeover-app/
thumbnail: ./assets/ai-takeover-app/thumb.png
gallery:
  - image: ./assets/ai-takeover-app/thumb.png
    caption: Agent login page
---

The AI Takeover agent portal was a quick-and-dirty project written with the help
of GitHub Copilot where over 100 students logged in as "Agents" in order to
"free" a student from the control of ChatGPT. Ironically, lots of AI was used to
plan and orchestrate the event.

Some notable features included the use of Supabase Realtime to have a realtime
image chat with behind-the-scenes people who evaluated photos and sent replies;
Gemma models were also used for one activity as part of a find-the-clue chat
activity.

1. Floor 1: Find-the-clue chat with Google Gemma models
2. Floor 2: Identify significant objects by texting them to the control room in
   real time
3. Floor 3: Puzzle not involving the portal

Instructions for each game were given digitally via the portal as well, and we
received lots of positive feedback. However, we learned that physical
interaction games might be more fun than ones that require looking at a screen.

## Reflections

In retrospect, using the free tier of Google AI Studio (Gemini API) was a good
idea but I could have made use of higher fidelity models by running local LLMs
on Mac Mini M4 hardware I own.
