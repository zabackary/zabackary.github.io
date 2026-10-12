---
name: Project Showcase
description: portfolio website copy tbd
status: finished
startDate: 2021-11
endDate: 2023-08
tags: [web]
glyph: 📚
color: "#ff0000"
github: https://github.com/zabackary/project_showcase
githubPrivate: true
thumbnail: ./assets/project-showcase/gallery-dark-mode.png
---

Project Showcase, ~~the project you're currently browsing with~~ the project
where some data here came from, was written to
quickly give a summary of projects I'm working on and my achievements.

Project summaries are written in Markdown with a YAML summary at the top, e.g.

```yaml
name: Project Showcase
description: The project you're using right now!
start date: November 1, 2021
end date: now
tags:
  - website
  - incomplete
screenshots:
  - gallery-dark-mode.png
```

A variety of screenshots are avalible. Material You theming is present (I wrote
custom styles myself for it to be lightweight) with a light/dark mode depending
on `prefers-media-scheme`. It's written as a collection of vanilla web
components and is built on a simple Express Node server which parses the source
Markdown and serves it to the frontend.
