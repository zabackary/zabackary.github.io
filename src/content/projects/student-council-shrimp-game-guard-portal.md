---
name: "Student Council Shrimp Game Guard Portal"
description: "Source code for a Christian Academy in Japan HS student council event"
status: finished
startDate: 2024-11
endDate: 2024-11
color: "#FFC0CB"
languages: [typescript]
tags: [web, stuco, supabase, community]
glyph: 🦐
github: https://github.com/zabackary/student-council-shrimp-game-guard-portal
---

In an American-style school, student councils are expected to put on productions for students (an ideology I disagree with).
This is the portal for student council members used to track points and scavenger hunt points for one such event, called "Shrimp Game".
It is a slightly dated React MUI SPA with a custom theme I wrote a few years ago.

There are a few sections:

- Main team registration and point tracker page  
  This was used to track the points of teams as they went through the game and show live counts
- Timers  
  This was used to have a live timer shown on a projector controllable by multiple devices at once.
- 逃走中 mark tracker  
  In this event, a game of 逃走中 was played while the players were simultaneously being chased. If they were caught, they earned a "mark", recorded in real time by this web app.

The backend is a Supabase-powered PostgreSQL database running Supabase Realtime, since I had little time to develop this application.

I hereby license all code in this project under the GPLv3. Exceptions can and will be granted if you ask.
