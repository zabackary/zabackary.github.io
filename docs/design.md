# Design and feel

> Summary: Feel is the top priority. Expressive = big rounded shapes that morph, springy overshoot motion, heavy wide display type, tonal colour containers. Every interactive element must handle hover (gated to `(hover: hover)`), focus-visible (one global ring in `global.css` that pops in 0 → 8px → 3px, after the M3E ButtonBase ring), active, keyboard and touch. Skip link and 44px tap targets are in place. Page navigation uses native cross-document view transitions (card ↔ hero container transform, shared blob, sliding nav pill, fade/rise for the rest; off under reduced motion). Remaining gaps: font hosting, theme toggle, real screenshots.

Last updated: 2026-10-03

## Intent

Inspired by Material 3 Expressive, with our own twists welcome. The site should feel playful and alive but never get in the way. Details matter more than feature count: if something looks right but feels off to tab through, tap, or press, it isn't done.

## Expressive vocabulary

- **Shape**: large radii; shapes *change* with state (button pill → squarer on hover/press, card → asymmetric corners on hover). Prefer morphing a shape over changing its colour alone.
- **Motion**: spring-like overshoot for spatial changes (`--spring-fast`, `--spring-slow`), the gentler `--effects` curve for colour/opacity. Durations ~200ms for effects, 350-550ms for shape/position.
- **Type**: `.display` is heavy and wide (Roboto Flex, `wdth` 125). Body is regular weight. Big contrast between the two is the point.
- **Colour**: tonal containers (`primary`/`secondary`/`tertiary`) from `--md-*` tokens; light and dark both supported. Check both when changing colours.
- **Page transitions**: cross-document View Transitions (`src/styles/transitions.css`), no JS. A project card morphs into its detail hero and back (container transform) with the blob carried across; the nav's current pill slides; other content fades and rises. To share an element between pages, give both the same `view-transition-name` plus `view-transition-class: shared` via the `transitionName` prop on `Card`/`HeroCard`/`Blob`. Names must be unique per page. Firefox lacks cross-document support and just navigates normally.
- **Our twists**: the continuously morphing `Blob`; project glyphs. Add more if they fit, and record them here.

## Interaction checklist

Run through this for any new or changed interactive element.

**States**
- [ ] Rest, hover, `:focus-visible`, active/pressed, and disabled (if applicable) are all distinct.
- [ ] Focus ring is clearly visible in light and dark, on every tone background, and not clipped by `overflow`/radius.
- [ ] Use `:focus-visible`, not `:focus`, so mouse clicks don't show rings.
- [ ] Pressed feedback is immediate (no delayed transition on press-down).

**Keyboard**
- [ ] Reachable and operable by Tab / Shift+Tab / Enter / Space, in a logical DOM order.
- [ ] Use real `<a>`/`<button>`; don't put click handlers on `div`s.
- [ ] Current page uses `aria-current="page"`.

**Touch / mobile**
- [ ] Tap targets at least 44×44px.
- [ ] Hover-only effects are wrapped in `@media (hover: hover)` so they don't stick after a tap. Pressed (`:active`) feedback must work on touch.
- [ ] Works at 320px wide with no horizontal scroll; check with the on-screen keyboard and in landscape.
- [ ] Sticky/floating UI doesn't cover content or focused elements.

**Motion / a11y**
- [ ] Respects `prefers-reduced-motion` (global rule already disables animation; don't override it).
- [ ] Text contrast meets WCAG AA on each tone, light and dark.
- [ ] Decorative elements are `aria-hidden`; meaningful images have alt text.
- [ ] Page works without JS (currently there is none).

## Known gaps (do these when touching the area)

- `Layout` loads Roboto Flex from Google Fonts: no `font-display` fallback tuning, and a third-party request. Consider self-hosting.
- Light/dark follows the system only; no manual toggle.
- No real screenshots; cards use glyph blobs.
