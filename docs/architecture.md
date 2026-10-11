# Architecture

> Summary: Static Astro site. `/projects` has client-side search/filter/sort (`ProjectFilter`) driven by `?q`, repeated `tag` / `lang`, and `sort` params. `displayNames.ts` turns lowercase tag/language names into display names. About is the home page (`/`, with a tiled view of the 3 most recent projects and an online-accounts section and a languages section whose items link to filtered project lists, e.g. `/projects?lang=rust&tag=web`); all projects are at `/projects`. Pages in `src/pages`, one `projects` content collection in `src/content/projects`, small scoped-style components in `src/components`, tokens and type in one global stylesheet. Page transitions are native CSS view transitions (`styles/transitions.css`); client JS is the `Ripple` custom element (a small WebGL shader) and the inline script in `ProjectFilter`. No UI library; M3 Expressive is implemented by hand. `src/assets/default-thumb.svg` is the editable source of the default thumbnail artwork, re-rendered to WebP with the ImageMagick command below. Images go through `astro:assets` (needs `sharp`). Project thumbnails default to `default-thumb.webp`.

Last updated: 2026-10-11

## Why bespoke CSS instead of `@material/web`

`@material/web` is in maintenance mode and has no Expressive components (no shape morphing, spring motion, expressive type). We'd override most of it anyway. `@material/web` is still listed in `package.json` but is unused; remove it when convenient (`pnpm remove @material/web`).

## Layout

```
src/
  content.config.ts      projects collection + zod schema
  content/projects/*.md  one file per project
  layouts/Layout.astro   <head>, fonts, NavBar, <main>
  pages/
    index.astro          About: hero, recent-projects view, accounts, bio, languages
    projects/index.astro project grid (all projects)
    projects/[id].astro  project detail (renders the Markdown body; the thumbnail is a rounded 16:9 backdrop, wider than the hero (up to 72rem), behind the nav, with the hero overlapping its lower part)
  components/            see below
  styles/global.css      tokens, base, type classes, tone roles, .grid, .prose
  theme.ts               seed colour; themeCss(hex): Material colour scheme as `--md-*` CSS; containerStyle
  pages/theme.css.ts     static endpoint: /theme.css, the site's `--md-*` tokens built from the seed
  displayNames.ts        displayName(): lowercase tag/language names -> proper display (TypeScript, C++, ...)
  types.ts               shared types (Tone)
  transitions.ts         view-transition names pairing a project card with its hero
  assets/default-thumb.*  grayscale shapes artwork (SVG source + rendered WebP), see "Regenerating assets"
docs/                    you are here
```

## Components

All have scoped `<style>`; they take colour from the surrounding tone, so they don't need colour props.

| Component | Purpose |
| --- | --- |
| `Button` | `<a>` if `href`, else `<button>`. `variant`: `filled` / `tonal`. Has a `Ripple`. |
| `Ripple` | Android-style sparkle press ripple: a `<ripple-effect>` custom element drawing a soft circle with twinkling dots in a WebGL fragment shader. First child of a `position: relative` button/link; clipped to its radius, uses its `color`. The WebGL context exists only while a ripple runs. Skipped under reduced motion or without WebGL (a console warning says why). Shader numbers (density, twinkle speed, opacity) are tuned by eye; they're in the fragment shader. |
| `Chip`, `ChipList` | Small tag pills at M3 chip dimensions (`--chip-height` 32dp, `--chip-radius`, `--chip-pad` in `global.css`; `ProjectFilter`'s tokens and toggle chips use the same variables). `Chip` takes an optional `href` (then it's a link with a ripple, hover/press morph and a 44px touch target). `ChipList` takes `items`: strings, or `{ label, href }` for link chips. |
| `Blob` | Morphing shape holding a glyph or image (clipped to the shape; the about page puts `src/assets/pfp.webp` in it). `size`: `small` / `large`. |
| `Card` | Link (with `href`) or plain section. Only links animate on hover and ripple. Optional `thumbnail` (image metadata) is faded in behind the content: along the top, or down the right side when `calm`. It is blended (multiply, inverted, in light; screen in dark) so the white-on-black artwork suits either scheme. `calm` uses `surface-container-high` and skips the corner morph. |
| `ProjectCard` | A collection entry rendered as a `Card`, with its thumbnail (or the default). `compact` drops description and tags and uses the calm card instead of the project colour. |
| `ProjectFilter` | The `/projects` grid plus its controls (hidden until JS runs; without JS all projects just show). An M3 search bar (pill, leading search icon, trailing clear) holds tag (tag icon) and language (globe icon) tokens beside free text, which matches name and description; As you type, a listbox popup suggests matching unselected tags and languages (arrows move, Enter or click picks, Escape closes). Enter on plain text turns text that exactly names a known tag/language (or `tag:x` / `lang:x`) into a token, Backspace on empty removes the last. Beside it: a sort menu button (Newest / Oldest / Name A–Z / Name Z–A; the suggestions popup reuses the same menu styles) The search bar and sort button form a bar that sticks under the nav pill (no backdrop); toggle chips for featured tags and languages sit below it and scroll away. Tag and language chips share one colour (secondary container); only the icon differs. Featured lists are at the top of the file. All filters AND together. State lives in the URL via `replaceState`: `?q=text&tag=web&tag=cli&lang=rust&sort=name` (repeated params; `sort` omitted when newest). With no matches it shows a themed SVG empty state with a "Clear filters" button. Filtering sets `hidden` on cards; sorting reorders the DOM so tab order matches. |
| `RecentProjectsView` | The 3 most recent projects, led by a vertical `label` slot and ending in a cookie `IconButton` to `/projects` (with a `Tooltip`, since a bare arrow is ambiguous). Desktop (>600px) tiles them: the newest as a roughly square full `ProjectCard` (content bottom-aligned) spanning two rows, the other two compact cards stacked beside it. Mobile is a horizontal scroll-snap row of compact cards (the newest is rendered twice, full and compact, and CSS shows one). Used on About, under the hero. |
| `SectionHeader` | Big vertical `<h2>` label. `align`: `left` (reads bottom-to-top, sits before its content) / `right` (reads top-to-bottom, sits after it) / `center` (horizontal, above its section). Used by `RecentProjectsView`, `OnlineAccounts` and `Languages`. |
| `OnlineAccounts` | About-page section: GitHub and Scratch `AccountCard`s with a right-aligned `SectionHeader`. Add an account by adding an `<li>` with an inline SVG logo. The Scratch logo is a placeholder cat head; swap for the official mark. |
| `Tooltip` | Inverted spring-in tooltip. Place after a focusable element inside a `position: relative` parent; shows on parent hover and sibling focus. Used by `Languages` and the about-page profile picture. |
| `Languages` | About-page section: "I speak / I'm learning" as two tonal columns of wobbling text blobs (learning ones are hollow and dashed), then the contexts as a conjoined stack of `calm` `Card`s (big outer corners, tight seams) with emoji `Blob`s and `ChipList`s for sub-items. Both use a centered `SectionHeader`. Data is arrays at the top of the file. Everything links to a filtered projects page: languages to `/projects?lang=<slug>` (spoken languages like English have no link), contexts to `/projects?tag=<tag>`. A whole context card is one link (web dev), except Embedded, whose card isn't a link: its title and each chip (Arduino, Embedded Linux, VEX V5) link separately. A blob renders as a link (`href`), else a button (`tip` only), else plain text; link and button blobs ripple, and any `tip` shows a spring-in tooltip on hover/focus/tap. Hover tilts a blob; hovering the footnote highlights the starred languages (hover-only, decorative). |
| `AccountCard` | Link `Card` with a tone-coloured round logo (`logo` slot, SVG filled with `currentColor`), service name and handle. |
| `Divider` | Wavy `<hr>`: a tiled SVG mask filled with `color` (any CSS colour, default `var(--md-outline)`). Decorative, no interaction states. |
| `IconButton` | Link with an inlined SVG icon (slot; default is a Material Symbols arrow, no font) on a 9-lobed cookie shape that turns on hover. Has a `Ripple`. |
| `HeroCard` | Big page header; default slot + named `aside` slot. |
| `NavBar` | Sticky pill nav; marks the current page with `aria-current`. Links have a `Ripple`. |

## Styling rules

- **Tokens**: `--md-*` colour roles are generated at build time from the seed in `theme.ts` and served as `/theme.css` (light/dark via `prefers-color-scheme`); change the seed, nothing else. Easing variables `--spring-fast`, `--spring-slow`, `--effects`.
- **Per-page theme**: `Layout` takes a `theme` CSS string (from `themeCss`) that overrides the `--md-*` tokens for that page.
- **Tone roles** (for non-project cards and heroes; projects use their `color` via `containerStyle` in `theme.ts`): `data-tone="primary|secondary|tertiary"` sets `--bg` / `--fg`. Containers set the tone; children read `--bg`/`--fg`.
- **Global CSS is only** `transitions.css` (`::view-transition-*` pseudo-elements can't be scoped) and, in `global.css`, tokens, base element styles, type classes (`.display`, `.headline`, `.label`), tone roles, `.grid`, `.prose`. Everything else goes in the component or page that uses it.
- Scoped styles don't reach slotted content. Style slotted children from the component that renders them.
- Prefer a new small component over a new global class. Don't add one for a single use though.

## Regenerating assets

`src/assets/default-thumb.webp` is a 1920×1080 grayscale (white-on-near-black, so it suits any palette) artwork of Material shapes, rendered from `src/assets/default-thumb.svg`. Edit the SVG, then re-render from `src/assets/` with ImageMagick:

```
magick -density 96 -background black default-thumb.svg -resize 1920x1080 -colorspace Gray -attenuate 0.15 +noise Gaussian -quality 92 -define webp:method=6 default-thumb.webp
```

The SVG must not use filters (`<filter>`, blur, `mix-blend-mode`); ImageMagick's built-in renderer ignores them. The Gaussian noise is deliberate dithering that hides banding in the dark gradients. Lower `-attenuate` or `-quality` for a smaller file.

## Adding things

- **New component**: put it in `src/components`, scope its styles, give it all interaction states ([design.md](design.md)). Add a row above.
- **New page**: `src/pages/`, wrap in `Layout`, start with a `HeroCard`. Add it to `NavBar`'s `links`.
- **New project**: see [content.md](content.md).
