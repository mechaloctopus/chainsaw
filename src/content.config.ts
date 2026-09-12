import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** A module is only "done" when it carries all of C-4's parts. The schema
 *  refuses to build a module that is missing one. */
const modules = defineCollection({
  loader: glob({ base: './src/content/modules', pattern: '**/*.mdx' }),
  schema: z.object({
    num: z.string().regex(/^\d{2}$/),
    title: z.string(),
    /** One sentence. What you can do after reading this. C-4. */
    objective: z.string(),
    /** Index-page subtitle, field voice, no hype. C-1. */
    summary: z.string(),
    /** Roadmap phase this module shipped in. */
    phase: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    /** Life-safety modules take no affiliate links, ever. A-3. */
    lifeSafety: z.boolean().default(false),
    /** Extracted to the printable field card. C-4. */
    fieldCard: z.array(z.string()).min(1),
    /** Rule S-3: every module that can produce a refusal states its triggers. */
    stopWork: z.array(z.string()).default([]),
    /** Rule: reviewed by a working sawyer who is not the author. */
    reviewed: z.boolean().default(false),
    /** YAML dates arrive as Date objects; coerce so both forms work. */
    updated: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const reference = defineCollection({
  loader: glob({ base: './src/content/reference', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    /** Pages carrying affiliate links must say so at the top. A-1. */
    affiliate: z.boolean().default(false),
    updated: z.coerce.date(),
  }),
});

export const collections = { modules, reference };
