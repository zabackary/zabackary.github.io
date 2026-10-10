# Architecture

> Summary: Static Astro site. About is the home page (`/`, with a carousel of the 3 most recent projects); all projects are at `/projects`. Pages in `src/pages`, one `projects` content collection in `src/content/projects`, small scoped-style components in `src/components`, tokens and type in one global stylesheet. Page transitions are native CSS view transitions (`styles/transitions.css`); the only client JS is the `Ripple` custom element, a small WebGL shader. No UI library; M3 Expressive is implemented by hand.

Last updated: 2026-10-10

## Why bespoke CSS instead of `@material/web`

`@material/web` is in maintenance mode and has no Expressive components (no shape morphing, spring motion, expressive type). We'd override most of it anyway. `@material/web` is still listed in `package.json` but is unused; remove it when convenient (`pnpm remove @material/web`).

## Layout

```
src/
  content.config.ts      projects collection + zod schema
  content/projects/*.md  one file per project
  layouts/Layout.astro   <head>, fonts, NavBar, <main>
  pages/
    index.astro          About: hero, bio cards, 3 most recent projects in a carousel
    projects/index.astro project grid (all projects)
    projects/[id].astro  project detail (renders the Markdown body)
  components/            see below
  styles/global.css      tokens, base, type classes, tone roles, .grid, .prose
  theme.ts               seed colour; themeCss(hex): Material colour scheme as `--md-*` CSS; containerStyle
  pages/theme.css.ts     static endpoint: /theme.css, the site's `--md-*` tokens built from the seed
  types.ts               shared types (Tone)
  transitions.ts         view-transition names pairing a project card with its hero
docs/                    you are here
```

## Components

All have scoped `<style>`; they take colour from the surrounding tone, so they don't need colour props.

| Component | Purpose |
| --- | --- |
| `Button` | `<a>` if `href`, else `<button>`. `variant`: `filled` / `tonal`. Has a `Ripple`. |
| `Ripple` | Android-style sparkle press ripple: a `<ripple-effect>` custom element drawing a soft circle with twinkling dots in a WebGL fragment shader. First child of a `position: relative` button/link; clipped to its radius, uses its `color`. The WebGL context exists only while a ripple runs. Skipped under reduced motion or without WebGL (a console warning says why). Shader numbers (density, twinkle speed, opacity) are tuned by eye; they're in the fragment shader. |
| `Chip`, `ChipList` | Small tag pills; `ChipList` takes `items: string[]`. |
| `Blob` | Morphing shape holding a glyph. `size`: `small` / `large`. |
| `Card` | Link (with `href`) or plain section. Only links animate on hover and ripple. `calm` swaps the asymmetric corner morph for an even one. |
| `ProjectCard` | A collection entry rendered as a `Card`. `compact` drops description and tags and uses the primary tone instead of the project colour. |
| `ProjectCarousel` | Horizontal scroll-snap row of compact `ProjectCard`s (glyph + name, primary tone) ending in a "More projects" button; items shrink toward the edges (scroll-driven animation, where supported). Used on About, under the hero. |
| `HeroCard` | Big page header; default slot + named `aside` slot. |
| `NavBar` | Sticky pill nav; marks the current page with `aria-current`. |

## Styling rules

- **Tokens**: `--md-*` colour roles are generated at build time from the seed in `theme.ts` and served as `/theme.css` (light/dark via `prefers-color-scheme`); change the seed, nothing else. Easing variables `--spring-fast`, `--spring-slow`, `--effects`.
- **Per-page theme**: `Layout` takes a `theme` CSS string (from `themeCss`) that overrides the `--md-*` tokens for that page.
- **Tone roles** (for non-project cards and heroes; projects use their `color` via `containerStyle` in `theme.ts`): `data-tone="primary|secondary|tertiary"` sets `--bg` / `--fg`. Containers set the tone; children read `--bg`/`--fg`.
- **Global CSS is only** `transitions.css` (`::view-transition-*` pseudo-elements can't be scoped) and, in `global.css`, tokens, base element styles, type classes (`.display`, `.headline`, `.label`), tone roles, `.grid`, `.prose`. Everything else goes in the component or page that uses it.
- Scoped styles don't reach slotted content. Style slotted children from the component that renders them.
- Prefer a new small component over a new global class. Don't add one for a single use though.

## Adding things

- **New component**: put it in `src/components`, scope its styles, give it all interaction states ([design.md](design.md)). Add a row above.
- **New page**: `src/pages/`, wrap in `Layout`, start with a `HeroCard`. Add it to `NavBar`'s `links`.
- **New project**: see [content.md](content.md).
