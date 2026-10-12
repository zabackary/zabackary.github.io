---
name: "CAJ Signage"
description: "Digital signage work for Christian Academy in Japan"
status: finished
startDate: 2026-06
endDate: 2026-09
tags: [web, community]
languages: [javascript]
glyph: 🪧
color: "#000080"
github: https://github.com/zabackary/caj-signage
githubPrivate: true
thumbnail: ./assets/caj-signage/calendar.png
gallery:
  - image: ./assets/caj-signage/announcements.png
    caption: Screenshot of the announcements signage page
  - image: ./assets/caj-signage/calendar.png
    caption: Screenshot of the calendar signage page
---

Plain HTML/CSS/JS signage application optimized for modern browsers and fast
load times.

Written by Zachary in 2026. On GitHub at
`zabackary/caj-signage` (private).

## Setup

[`assets/env.js`](https://github.com/zabackary/caj-signage/blob/HEAD/assets/env.js) should be populated according to
[`assets/env.example.js`](https://github.com/zabackary/caj-signage/blob/HEAD/assets/env.example.js). It contains keys for the
Google API integration as well as the database integration that should be
filled out in order for the application to function.

## Screens

### Announcement screen

The announcement screen displays the announcements returned from the
announcement API, hosted on the school website and populated from the school
database.

The announcement screen takes a query parameter, `durationSecs`, which indicates
how long the screen is timed in the signage program to be shown for. A good
starting point would be 40 seconds of total time, which works out to 7 seconds
per announcement if there are 6 of them.

### Calendar screen

The calendar screen shows the current day and the next two days of events on the
public-facing Google Calendar. It also shows school lunches from the public
calendar as well, if available.
