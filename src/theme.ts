import {
  Blend,
  Hct,
  MaterialDynamicColors,
  SchemeContent,
  argbFromHex,
  hexFromArgb,
} from "@material/material-color-utilities";

// The site's seed colour: every --md-* token derives from it (see pages/theme.css.ts). Project
// colours are pulled toward it so every themed page still feels like part of the same site.
const SITE_SEED_HEX = "#d5dba2";
const SITE_SEED = argbFromHex(SITE_SEED_HEX);

const m = new MaterialDynamicColors();

// CSS variable -> dynamic colour.
const roles = {
  "--md-primary": m.primary(),
  "--md-on-primary": m.onPrimary(),
  "--md-primary-container": m.primaryContainer(),
  "--md-on-primary-container": m.onPrimaryContainer(),
  "--md-secondary": m.secondary(),
  "--md-secondary-container": m.secondaryContainer(),
  "--md-on-secondary-container": m.onSecondaryContainer(),
  "--md-tertiary": m.tertiary(),
  "--md-tertiary-container": m.tertiaryContainer(),
  "--md-on-tertiary-container": m.onTertiaryContainer(),
  "--md-surface": m.surface(),
  "--md-on-surface": m.onSurface(),
  "--md-surface-container": m.surfaceContainer(),
  "--md-surface-container-high": m.surfaceContainerHigh(),
  "--md-surface-container-highest": m.surfaceContainerHighest(),
  "--md-surface-container-low": m.surfaceContainerLow(),
  "--md-surface-container-lowest": m.surfaceContainerLowest(),
  "--md-on-surface-variant": m.onSurfaceVariant(),
  "--md-outline-variant": m.outlineVariant(),
};

function schemes(hex: string) {
  const source = Hct.fromInt(Blend.harmonize(argbFromHex(hex), SITE_SEED));
  return [false, true].map((isDark) => new SchemeContent(source, isDark, 0));
}

const css = (color: { getArgb(s: SchemeContent): number }, scheme: SchemeContent) =>
  hexFromArgb(color.getArgb(scheme));

/** CSS that re-themes the `--md-*` tokens from a hex colour, for both light and dark mode. */
export function themeCss(hex: string) {
  const [light, dark] = schemes(hex);
  const declarations = (scheme: SchemeContent) =>
    Object.entries(roles)
      .map(([name, color]) => `${name}:${css(color, scheme)};`)
      .join("");
  // :root:root lets a page theme override the site theme whatever order the styles load in
  return (
    `:root:root{${declarations(light)}}` +
    `@media (prefers-color-scheme:dark){:root:root{${declarations(dark)}}}`
  );
}

/** The site's default `--md-*` tokens, derived from the seed colour. */
export const siteThemeCss = () => themeCss(SITE_SEED_HEX);

/** Inline `--bg` / `--fg` for a container (card) in that colour, following light/dark mode. */
export function containerStyle(hex: string) {
  const [light, dark] = schemes(hex);
  const pair = (color: { getArgb(s: SchemeContent): number }) =>
    `light-dark(${css(color, light)}, ${css(color, dark)})`;
  return `--bg:${pair(m.primaryContainer())};--fg:${pair(m.onPrimaryContainer())}`;
}
