// Portfolio data, read from the `projets` content collection
// (src/content/projets/*.md, one file per project). Components keep consuming
// the `Project` shape below, so the French frontmatter keys are mapped here once.
//
// Drafts (`publié: false`) exist only under `astro dev`, flagged `draft`, so a
// project can be previewed locally before it is approved. A production build
// never sees them: no page, no card, no sitemap entry.
//
// The optional sections (`terrain`, `témoignage`) follow the same rule one
// level down: while one still contains "À CONFIRMER" it shows under
// `astro dev` and is dropped from a build, so a published project can carry a
// pending section without blocking deploys or leaking the placeholder.

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
  /** False while the project is built but not online yet. */
  live: boolean;
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
  /** Optional section, null when absent or still awaiting confirmation. */
  field: LocalizedField | null;
  testimonial: { quote: LocalizedField; author: string; title: LocalizedField } | null;
  stack: (string | LocalizedField)[];
  /** Missing facts, rendered as dev-only reminders. */
  todo: string[];
}

/** Placeholder left in a draft wherever Patrick still has to supply a fact. */
export const TO_CONFIRM = 'À CONFIRMER';

/** Keep an optional section in dev; in a build, only once it is confirmed. */
function pending<T>(section: T | undefined): T | null {
  if (section === undefined) return null;
  if (!import.meta.env.DEV && JSON.stringify(section).includes(TO_CONFIRM)) return null;
  return section;
}

function toProject(entry: CollectionEntry<'projets'>): Project {
  const d = entry.data;
  const t = pending(d.témoignage);
  return {
    slug: entry.id,
    draft: !d.publié,
    featured: d.vedette,
    order: d.ordre,
    url: d.lien,
    live: d.enLigne && Boolean(d.lien),
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
    field: pending(d.terrain),
    testimonial: t ? { quote: t.citation, author: t.auteur, title: t.fonction } : null,
    stack: d.stack,
    todo: d.aFournir,
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
    // `field` and `testimonial` are left out: `pending()` already drops them
    // from a build while they hold the placeholder.
    const { slug, draft, featured, order, field, testimonial, todo, ...shown } = p;
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

/** Which project categories prove which service (service pages link them). */
const SERVICE_CATEGORIES: Record<string, ProjectCategory[]> = {
  svcWeb: ['web', 'seo'],
  svcSeo: ['seo'],
  svcShopify: ['shopify'],
  svcTools: ['saas'],
};

/** Published case studies for a service key, in portfolio order. */
export async function projectsForService(key: string): Promise<Project[]> {
  const cats = SERVICE_CATEGORIES[key] ?? [];
  return (await sortedProjects()).filter((p) => cats.includes(p.category) && !p.draft);
}

/** A stack entry in the page language (tool names are not translated). */
export function stackLabel(item: string | LocalizedField, locale: Locale): string {
  return typeof item === 'string' ? item : item[locale];
}
