---
name: "caj-sports"
description: "A Singular.Live (GFX production platform) control app for school streams"
status: finished
startDate: 2025-08
endDate: 2026-01
tags: [web, community, singular-live]
color: "#000080"
languages: [typescript]
glyph: ⚽
github: https://github.com/zabackary/caj-sports
githubPrivate: true
thumbnail: ./assets/caj-sports/thumb.png
gallery:
  - image: ./assets/caj-sports/thumb.png
    caption: The Singular.Live app in action
  - image: ./assets/caj-sports/simple-view.png
    caption: Simple view for volunteers to easily control the graphics playout
  - image: ./assets/caj-sports/sport-selector.png
    caption: Menu showing list of compatible sports
  - image: ./assets/caj-sports/school-selector.png
    caption: Menu showing schools in the Kanto region
---

This is a Singular.Live control app for controlling our school's Singular.Live
Sports composition, which powers overlay graphics for the YouTube livestreams.

I would like to open source it but some code is behind an NDA in the EULA which
makes it difficult legally.

The UI has 5 panels:

- Output preview (powered by Singular.Live)  
  This panel crashes WebKit on iPadOS, so it is advised not to use it there.
- Options  
  This includes the control panel switcher, teams/event config, and take out all button. It is also where the day's schedule can be configured.
- Macros  
  This includes session-wide macros, such as the "Thank you for watching!" screen and the stream start countdown.
- Control panel state switcher  
  This is how the control panel state switches. For example, for some sports, it holds the toggles for "during game", "between sets", etc.
- Control panel state  
  This is where the options for timeouts, fouls, the crawl text, and other in-game options live.

It has a few layouts:

- Classic - Control panel state switcher + output + control panel state
- Simple - Options + control panel state switcher + control panel state
- Everything - (everything)
