import {
  Blend,
  Hct,
  MaterialDynamicColors,
  SchemeContent,
  argbFromHex,
  hexFromArgb,
} from "@material/material-color-utilities";

// The site's own primary (--md-primary in global.css, light). Project colours are pulled toward it
// so every themed page still feels like part of the same site.
const SITE_SEED = argbFromHex("#a2a4db");

const m = new MaterialDynamicColors();

// CSS variable -> dynamic colour. Keep in sync with the tokens at the top of global.css.
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
  // :root:root outranks the plain :root in global.css whatever order the stylesheets load in
  return (
    `:root:root{${declarations(light)}}` +
    `@media (prefers-color-scheme:dark){:root:root{${declarations(dark)}}}`
  );
}

/** Inline `--bg` / `--fg` for a container (card) in that colour, following light/dark mode. */
export function containerStyle(hex: string) {
  const [light, dark] = schemes(hex);
  const pair = (color: { getArgb(s: SchemeContent): number }) =>
    `light-dark(${css(color, light)}, ${css(color, dark)})`;
  return `--bg:${pair(m.primaryContainer())};--fg:${pair(m.onPrimaryContainer())}`;
}
