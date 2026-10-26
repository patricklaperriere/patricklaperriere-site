// Portfolio data, read from the `projets` content collection
// (src/content/projets/*.md, one file per project). Components keep consuming
// the `Project` shape below, so the French frontmatter keys are mapped here once.
//
// Drafts (`publié: false`) exist only under `astro dev`, flagged `draft`, so a
// project can be previewed locally before it is approved. A production build
// never sees them: no page, no card, no sitemap entry.

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/routes';

export type ProjectCategory = 'saas' | 'web' | 'seo' | 'shopify';

export interface LocalizedField {
  fr: string;
  en: string;
}

export interface Project {
  slug: string;
  draft: boolean;
  featured: boolean;
  order: number;
  url: string;
  image: string;
  year: string;
  category: ProjectCategory;
  client: string;
  accent: string;
  fit: 'cover' | 'contain';
  title: LocalizedField;
  seoTitle: LocalizedField;
  tagline: LocalizedField;
  description: LocalizedField;
  role: LocalizedField;
  challenge: LocalizedField;
  built: LocalizedField;
  result: LocalizedField;
  stack: string[];
}

/** Placeholder left in a draft wherever Patrick still has to supply a fact. */
export const TO_CONFIRM = 'À CONFIRMER';

function toProject(entry: CollectionEntry<'projets'>): Project {
  const d = entry.data;
  return {
    slug: entry.id,
    draft: !d.publié,
    featured: d.vedette,
    order: d.ordre,
    url: d.lien,
    image: d.image,
    year: d.année,
    category: d.catégorie,
    client: d.client,
    accent: d.accent,
    fit: d.cadrage,
    title: d.titre,
    seoTitle: d.titreSeo,
    tagline: d.accroche,
    description: d.description,
    role: d.rôle,
    challenge: d.défi,
    built: d.réalisation,
    result: d.résultat,
    stack: d.stack,
  };
}

/** Every visible project, sorted by `ordre`. */
export async function sortedProjects(): Promise<Project[]> {
  const entries = await getCollection('projets', (e) => import.meta.env.DEV || e.data.publié);
  const list = entries.map(toProject);

  // A published project must not carry an unanswered placeholder: fail the
  // build rather than ship "À CONFIRMER" to a client's case study.
  for (const p of list) {
    if (p.draft) continue;
    const { slug, draft, featured, order, ...shown } = p;
    if (JSON.stringify(shown).includes(TO_CONFIRM)) {
      throw new Error(
        `Projet « ${slug} » : publié: true alors qu’un champ contient encore « ${TO_CONFIRM} ».`,
      );
    }
  }
  return list.sort((a, b) => a.order - b.order);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await sortedProjects()).find((p) => p.slug === slug);
}

export async function featuredProjects(): Promise<Project[]> {
  return (await sortedProjects()).filter((p) => p.featured && !p.draft);
}

/** Localized helper. */
export function loc(field: LocalizedField, locale: Locale): string {
  return field[locale];
}
