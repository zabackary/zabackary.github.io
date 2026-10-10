# Content

> Summary: Projects are Markdown files in `src/content/projects/`, validated by the schema in `src/content.config.ts`. The file name becomes the URL (`/projects/<name>`). Copy is written by the owner; agents leave `TODO(copy)` placeholders. An optional `color` hex colours a project's card and themes its detail page.

Last updated: 2026-10-10

## Adding a project

Create `src/content/projects/<slug>.md`:

```md
---
name: Kaiwa
description: One sentence shown on the card and detail hero.
status: incomplete        # finished | wip | incomplete (default: finished)
tags: [website, node]
glyph: 💬                 # one emoji shown in the blob until screenshots exist
color: "#5865f2"          # optional hex; colours the card, themes the detail page (see below)
link: https://example.com # optional; adds a "View project" button
---

Markdown body shown on the detail page.
```

### Project colour

`color` is optional. When set, the detail page re-themes every `--md-*` token from it using `@material/material-color-utilities` (`src/theme.ts`): the colour is harmonized toward the site's seed colour, then a content scheme is generated for light and dark mode. Quote the value in YAML (`#` starts a comment). Without it the page uses the site theme. The same colour tints the project's card on the home grid (its container colour, light/dark aware). Without `color`, both use the site seed colour.

`startDate` / `endDate` exist in the schema but aren't displayed yet.

Pick different colours for neighbouring projects so the grid doesn't read as one colour.

## Copy placeholders

Agents don't write names, descriptions, blurbs or bio text. Use `TODO(copy): …` describing what's needed, e.g.:

```md
description: "TODO(copy): one sentence on what this project is"
```

List what's outstanding: `grep -rn "TODO(copy)" src docs`.

## Source of older projects

Many projects come from the earlier `../project_showcase/data/<name>/index.md` (front matter: name, description, start date, end date, tags, screenshots). Port the *facts* (name, tags, dates, screenshots); leave the descriptive copy for the owner to confirm or rewrite.

## Known gaps

- Screenshots aren't supported yet (schema has no field; the card uses a glyph blob).
- The example `kaiwa.md` copy and the About page text were written as placeholders and are not yet marked `TODO(copy)`.
