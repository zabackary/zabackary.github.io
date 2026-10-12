---
name: "TI-84 Online"
description: "Legally dublious emulator shell for TI-84s"
status: wip
startDate: 2026-09
tags: [web, vibe-coded]
languages: [typescript]
glyph: 🧮
color: "#3173e3"
github: https://github.com/zabackary/ti84-online
githubPrivate: true
liveSite: https://zabackary.github.io/ti84-online/
thumbnail: ./assets/ti84-online/thumb.png
gallery:
  - image: ./assets/ti84-online/thumb.png
    caption: Screenshot of the live site
---

A TI-84 Plus CE emulator that runs in the browser. Wraps Texas Instruments' own
official HTML5 emulator engine in a small React UI, and installs as an
offline-capable PWA.

## Legal note

TI's emulator engine (`ELG-min.js`) is proprietary and not included in this
repo or any build produced from it. Instead:

- **Production**: the app prompts the end user to download their own copy
  from TI and drop it in — see `src/components/EngineUpload`. The file is
  then kept in the browser's Cache Storage so future visits (including
  offline) don't need it again.
- **Dev**: fetch it yourself and save it as `.dev/ELG-min.js` (gitignored).
  It's served only by a dev-server middleware (`vite.config.ts`) that never
  runs during `pnpm build` — the file can never end up in a production
  build, regardless of what's on disk when you build.

```sh
curl -o .dev/ELG-min.js https://mn.testnav.com/client/texasinstruments/js/ELG-min.js
```

The default ROM state and faceplate image are loaded live from TI's CDN at
runtime (it serves them with permissive CORS), so they don't need this
treatment — see `src/lib/constants.ts`.

## Develop

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build   # outputs to dist/
pnpm preview # serve the production build locally
```

Deploys to GitHub Pages at `/ti84-online/` by default — change `base` in
`vite.config.ts` (and the matching `scope`/`start_url` in the PWA manifest
block) if you're hosting elsewhere.

## Stack

Vite, React, TypeScript, CSS Modules, `vite-plugin-pwa`, pnpm.
