# Content

> Summary: Projects are Markdown files in `src/content/projects/`, validated by the schema in `src/content.config.ts`. The file name becomes the URL (`/projects/<name>`). Copy is written by the owner; agents leave `TODO(copy)` placeholders (the older projects carry the owner's old text verbatim). An optional `color` hex colours a project's card and themes its detail page. Images live in `src/content/projects/assets/<project-name>/`. Optional `thumbnail` image (relative path) shows on cards and as the detail-page backdrop; the default artwork is used when absent. Optional `startDate`, `endDate`, `languages` fill a secondary-container metadata box joined to the bottom of the hero (tags too, as links to `/projects?tag=…`), `github` / `liveSite` add icon buttons under the hero description (`githubPrivate: true` shows the GitHub one disabled with a "Private" tooltip), and `gallery` (images + captions) renders as a 2-wide grid after the prose.

Last updated: 2026-10-11

## Adding a project

Create `src/content/projects/<slug>.md`:

```md
---
name: Kaiwa
description: One sentence shown on the card and detail hero.
status: incomplete        # finished | wip | incomplete (default: finished)
tags: [web, node]
glyph: 💬                 # one emoji shown in the blob until screenshots exist
color: "#5865f2"          # optional hex; colours the card, themes the detail page (see below)
link: https://example.com # optional; adds a "View project" button
github: https://github.com/zabackary/kaiwa # optional; icon button under the hero description
githubPrivate: true       # optional; the repo is private, so the button is disabled with a "Private" tooltip
liveSite: https://example.com # optional; icon button next to the GitHub one
thumbnail: ./assets/kaiwa/thumb.webp   # optional; relative to this file. Default: src/assets/default-thumb.webp
startDate: 2024-03        # optional; free-form string, shown as "Started"
endDate: 2024-09          # optional; shown as "Finished"
languages: [TypeScript, Rust] # optional; chips in the metadata box
gallery:                  # optional; 2-wide grid after the prose
  - image: ./assets/kaiwa/shot-1.webp
    caption: Describes the image (used as alt text; not rendered visibly yet)
---

Markdown body shown on the detail page.
```

### Project images

Images live in `src/content/projects/assets/<project-name>/`, one folder per project, next to the flat `.md` files. Reference them with relative paths (`./assets/kaiwa/thumb.webp`); Astro's image pipeline handles them, so nothing goes in `public/`.

### Project colour

`color` is optional. When set, the detail page re-themes every `--md-*` token from it using `@material/material-color-utilities` (`src/theme.ts`): the colour is harmonized toward the site's seed colour, then a content scheme is generated for light and dark mode. Quote the value in YAML (`#` starts a comment). Without it the page uses the site theme. The same colour tints the project's card on the home grid (its container colour, light/dark aware). Without `color`, both use the site seed colour.

`startDate` / `endDate` are shown in the metadata box under the hero (along with `languages`), and About uses `endDate ?? startDate` to pick the 3 most recent projects; undated ones sort last.

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

- The older projects from `../project_showcase/data` are imported: facts, screenshots (first one is the thumbnail), colours (sampled from the screenshots) and the old description/body text verbatim, minus the `# Title` heading and the "View at `coding/…`" lines (local paths on the old machine). Gallery captions the old data lacked are `TODO(copy)`. `html-editor.md` includes the old W3Schools scraper script in full; the owner may want to trim it. `beyond-the-office.md`'s description is the old "(unavailable)".
- Six more projects come from the backups at `/run/media/zabackary/Zachary2/backups/documents_coding_*` (no git remote on GitHub): ScratchVCS, Scratchub, Material Youifier, Bedrock Explorer, Route Visualizer, DIY Car Robot. Their dates are file modification times, and they have no screenshots or colour. Only ScratchVCS has a real README; the rest carry `TODO(copy)` and a `TODO(copy): confirm status` comment. Template-boilerplate READMEs were not imported.
- 36 more projects come from `gh repo list zabackary` (non-forks, minus tests/playgrounds/backups/config repos and mass-upload repos like PartlyCloudy and cobblestone). Description = GitHub tagline, body = README (top `#` heading dropped, relative links made absolute to the repo), `github` / `githubPrivate` / `liveSite` from the repo, `startDate` from the first commit, `endDate` from the last (only if older than ~6 months; repos with ≤2 commits get none, since those are uploads). Names are derived from repo names and marked `TODO(copy)`; status is unset (defaults to finished) and marked too. Thumbnails are 1920×1080 Firefox screenshots of the homepage; four sites (wisdom-project, the-christian-story, ai-takeover-app, live-class-points) rendered a loading/blank/error state headless, so they use the default artwork. No glyph or colour is set for these.
- Copier has no screenshots, so it still uses the default artwork.
- The example `kaiwa.md` copy and the About page text were written as placeholders and are not yet marked `TODO(copy)`.
