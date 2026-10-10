import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      status: z.enum(["finished", "wip", "incomplete"]).default("finished"),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      tags: z.array(z.string()).default([]),
      // single emoji/glyph shown in the card's shape until screenshots exist
      glyph: z.string().default("✦"),
      // optional brand colour (harmonized toward the site colour): colours the card and themes the detail page
      color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "use a 6-digit hex like #3b82f6").optional(),
      link: z.url().optional(),
      // image path relative to the .md file; without one the project uses src/assets/default-thumb.webp
      thumbnail: image().optional(),
    }),
});

export const collections = { projects };
