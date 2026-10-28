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
    /** Service the article leads to, shown as the closing call to action. */
    service: z.enum(['svcWeb', 'svcSeo', 'svcShopify', 'svcTools']).optional(),
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
        /** Language the client wrote in; the other version is a translation, labelled as such. */
        langue: z.enum(['fr', 'en']).optional(),
        /** Optional heading in place of « Témoignage », and a sentence introducing the client. */
        rubrique: bilingue.optional(),
        présentation: bilingue.optional(),
      })
      .optional(),
    /** Optional descriptive H1 (with the service keyword); falls back to `titre`. */
    titreH1: bilingue.optional(),
    /** Optional city page slug (src/data/villes.ts) where the client works. */
    ville: z.string().optional(),
    /** Optional span of years shown on the lead card (e.g. "2025–2026"); `année` stays the data year. */
    période: z.string().optional(),
    /** Optional one-line role shown on the lead card, under the pitch. */
    rôleCourt: bilingue.optional(),
    /** Optional delivery time from real dates (first commit to launch), e.g. « Livré en 5 semaines ». */
    délai: bilingue.optional(),
    /** Optional measured results after launch, only with figures and the client's OK. Empty for now. */
    résultatsMesurés: bilingue.optional(),
    /** Extra captures under public/work/, shown below the case study (1280 × 800 plus a -640 variant, or a phone shot). */
    captures: z
      .array(z.object({ src: z.string(), alt: bilingue, largeur: z.number().int(), hauteur: z.number().int() }))
      .default([]),
    /** Optional client logo under public/work/logos/, shown with the client name (only with their OK). */
    logo: z.string().optional(),
    /** Live URL. Empty while the site is not online yet. */
    lien: z.string(),
    /** False while the site is built but not online yet (shown as such). */
    enLigne: z.boolean().default(true),
    /** Screenshot under public/, 1280×800 WebP. Empty: no capture yet, no frame. */
    image: z.string(),
    /** Facts still missing, shown as [À FOURNIR : …] in `astro dev` only. */
    aFournir: z.array(z.string()).default([]),
    ordre: z.number().int(),
    /** brouillon: `astro dev` only, never built. en_cours: built, with an « En cours » badge. */
    statut: z.enum(['publié', 'brouillon', 'en_cours']).default('brouillon'),
    /** 1 to 4 short, checkable facts shown on the work index (« Preuve »). */
    preuve: z.array(bilingue).max(4).default([]),
    /** Work-index card: column span on the 12-column grid and media ratio (CSS, e.g. "16 / 10"). */
    grille: z
      .object({ colonnes: z.number().int().min(3).max(12), ratio: z.string().optional() })
      .optional(),
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
