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

// Portfolio. One Markdown file per project in src/content/projets/; the file
// name is the slug (/realisations/<slug> and /en/work/<slug>). Every text field
// carries both languages. The Markdown body is for internal notes only and is
// never rendered. See src/content/projets/README.md.
const bilingue = z.object({ fr: z.string(), en: z.string() });

const projets = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './src/content/projets' }),
  schema: z.object({
    titre: bilingue,
    /** Short title for <title>, before " | Patrick Laperrière". Keep it under 44 characters. */
    titreSeo: bilingue,
    /** One-line pitch shown on cards and under the case-study title. */
    accroche: bilingue,
    /** Meta description, written by hand. 160 characters max. */
    description: z.object({ fr: z.string().max(160), en: z.string().max(160) }),
    client: z.string(),
    rôle: bilingue,
    /** Tools or key points; a point that needs translating is { fr, en }. */
    stack: z.array(z.union([z.string(), bilingue])).min(1),
    défi: bilingue,
    réalisation: bilingue,
    résultat: bilingue,
    /** Optional: how the product is used in practice (Habita). */
    terrain: bilingue.optional(),
    /** Optional: a client's own words, quoted only with their written OK. */
    témoignage: z
      .object({
        citation: bilingue,
        auteur: z.string(),
        fonction: bilingue,
      })
      .optional(),
    /** Live URL. Empty while the site is not online yet. */
    lien: z.string(),
    /** False while the site is built but not online yet (shown as such). */
    enLigne: z.boolean().default(true),
    /** Screenshot under public/, 1280×800 WebP. Empty: no capture yet, no frame. */
    image: z.string(),
    /** Facts still missing, shown as [À FOURNIR : …] in `astro dev` only. */
    aFournir: z.array(z.string()).default([]),
    ordre: z.number().int(),
    publié: z.boolean().default(false),
    année: z.string(),
    catégorie: z.enum(['saas', 'web', 'seo', 'shopify']),
    /** Shown in the home-page selection. */
    vedette: z.boolean().default(false),
    /** Card accent colour (hex). */
    accent: z.string().default('#d4543a'),
    /** `contain` shows a device mockup whole instead of cropping it. */
    cadrage: z.enum(['cover', 'contain']).default('cover'),
  }),
});

export const collections = { blog, projets };
