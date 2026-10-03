import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(["finished", "wip", "incomplete"]).default("finished"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // M3 container role used to colour the card/hero
    tone: z.enum(["primary", "secondary", "tertiary"]).default("primary"),
    // single emoji/glyph shown in the card's shape until screenshots exist
    glyph: z.string().default("✦"),
    link: z.url().optional(),
  }),
});

export const collections = { projects };
