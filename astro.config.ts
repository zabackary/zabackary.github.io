import { defineConfig } from "astro/config";

// @material/material-color-utilities has extensionless relative imports that plain Node ESM can't
// resolve, so it has to be bundled by Vite rather than loaded as an external
const bundle = { resolve: { noExternal: ["@material/material-color-utilities"] } };

// https://astro.build/config
export default defineConfig({
  vite: {
    environments: { ssr: bundle, astro: bundle, prerender: bundle },
  },
});
