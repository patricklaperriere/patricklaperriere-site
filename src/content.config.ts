import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Bilingual blog. Each article declares its language and a `translationKey`
// shared with its counterpart in the other language, so hreflang alternates
// can pair FR ↔ EN posts.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['fr', 'en']),
    slug: z.string(),
    translationKey: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
