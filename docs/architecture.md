# Architecture

> Summary: Static Astro site. Pages in `src/pages`, one `projects` content collection in `src/content/projects`, small scoped-style components in `src/components`, tokens and type in one global stylesheet. No client JS (page transitions are native CSS view transitions, rules in `styles/transitions.css`) and no UI library; M3 Expressive is implemented by hand.

Last updated: 2026-10-03

## Why bespoke CSS instead of `@material/web`

`@material/web` is in maintenance mode and has no Expressive components (no shape morphing, spring motion, expressive type). We'd override most of it anyway. `@material/web` is still listed in `package.json` but is unused; remove it when convenient (`pnpm remove @material/web`).

## Layout

```
src/
  content.config.ts      projects collection + zod schema
  content/projects/*.md  one file per project
  layouts/Layout.astro   <head>, fonts, NavBar, <main>
  pages/
    index.astro          hero + project grid
    about.astro
    projects/[id].astro  project detail (renders the Markdown body)
  components/            see below
  styles/global.css      tokens, base, type classes, tone roles, .grid, .prose
  theme.ts               themeCss(hex): harmonized Material colour scheme as CSS token overrides
  types.ts               shared types (Tone)
  transitions.ts         view-transition names pairing a project card with its hero
docs/                    you are here
```

## Components

All have scoped `<style>`; they take colour from the surrounding tone, so they don't need colour props.

| Component | Purpose |
| --- | --- |
| `Button` | `<a>` if `href`, else `<button>`. `variant`: `filled` / `tonal`. |
| `Chip`, `ChipList` | Small tag pills; `ChipList` takes `items: string[]`. |
| `Blob` | Morphing shape holding a glyph. `size`: `small` / `large`. |
| `Card` | Link (with `href`) or plain section. Only links animate on hover. |
| `ProjectCard` | A collection entry rendered as a `Card`. |
| `HeroCard` | Big page header; default slot + named `aside` slot. |
| `NavBar` | Sticky pill nav; marks the current page with `aria-current`. |

## Styling rules

- **Tokens** live at the top of `global.css`: `--md-*` colour roles (light/dark via `prefers-color-scheme`), and the easing variables `--spring-fast`, `--spring-slow`, `--effects`.
- **Per-page theme**: `Layout` takes a `theme` CSS string (from `themeCss`) that overrides the `--md-*` tokens for that page. Keep `theme.ts`'s role list in sync with the tokens.
- **Tone roles** (for non-project cards and heroes; projects use their `color` via `containerStyle` in `theme.ts`): `data-tone="primary|secondary|tertiary"` sets `--bg` / `--fg`. Containers set the tone; children read `--bg`/`--fg`.
- **Global CSS is only** `transitions.css` (`::view-transition-*` pseudo-elements can't be scoped) and, in `global.css`, tokens, base element styles, type classes (`.display`, `.headline`, `.label`), tone roles, `.grid`, `.prose`. Everything else goes in the component or page that uses it.
- Scoped styles don't reach slotted content. Style slotted children from the component that renders them.
- Prefer a new small component over a new global class. Don't add one for a single use though.

## Adding things

- **New component**: put it in `src/components`, scope its styles, give it all interaction states ([design.md](design.md)). Add a row above.
- **New page**: `src/pages/`, wrap in `Layout`, start with a `HeroCard`. Add it to `NavBar`'s `links`.
- **New project**: see [content.md](content.md).
