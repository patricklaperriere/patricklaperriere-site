// Portfolio data, read from the `projets` content collection
// (src/content/projets/*.md, one file per project). Components keep consuming
// the `Project` shape below, so the French frontmatter keys are mapped here once.
//
// Drafts (`statut: brouillon`) exist only under `astro dev`, flagged `draft`, so a
// project can be previewed locally before it is approved. A production build
// never sees them: no page, no card, no sitemap entry.
//
// The optional sections (`terrain`, `témoignage`) follow the same rule one
// level down: while one still contains "À CONFIRMER" it shows under
// `astro dev` and is dropped from a build, so a published project can carry a
// pending section without blocking deploys or leaking the placeholder.

import { existsSync } from 'node:fs';
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
  /** `statut: en_cours`: built and listed, with an « En cours » badge. */
  inProgress: boolean;
  /** Short checkable facts for the work index (« Preuve »), 0 to 3. */
  proof: LocalizedField[];
  /** Work-index grid span (of 12) and media ratio; null: the defaults. */
  grid: { span: number; ratio: string | null } | null;
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
  testimonial: { quote: LocalizedField; author: string; title: LocalizedField; original?: 'fr' | 'en'; heading?: LocalizedField; intro?: LocalizedField } | null;
  /** Client logo under public/, or null. */
  logo: string | null;
  /** H1 of the case study: descriptive, with the service keyword. */
  h1: LocalizedField;
  /** City page slug for the client's area, or null. */
  city: string | null;
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
    draft: d.statut === 'brouillon',
    inProgress: d.statut === 'en_cours',
    proof: d.preuve,
    grid: d.grille ? { span: d.grille.colonnes, ratio: d.grille.ratio ?? null } : null,
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
    testimonial: t ? { quote: t.citation, author: t.auteur, title: t.fonction, original: t.langue, heading: t.rubrique, intro: t.présentation } : null,
    logo: d.logo ?? null,
    h1: d.titreH1 ?? d.titre,
    city: d.ville ?? null,
    stack: d.stack,
    todo: d.aFournir,
  };
}

/** Every visible project, sorted by `ordre`. */
export async function sortedProjects(): Promise<Project[]> {
  const entries = await getCollection('projets', (e) => import.meta.env.DEV || e.data.statut !== 'brouillon');
  const list = entries.map(toProject);

  // A published project must not carry an unanswered placeholder: fail the
  // build rather than ship "À CONFIRMER" to a client's case study.
  for (const p of list) {
    if (p.draft) continue;
    // `field` and `testimonial` are left out: `pending()` already drops them
    // from a build while they hold the placeholder.
    const { slug, draft, featured, order, field, testimonial, todo, ...shown } = p;
    void draft;
    if (JSON.stringify(shown).includes(TO_CONFIRM)) {
      throw new Error(
        `Projet « ${slug} » : statut ${draft ? 'brouillon' : 'publié ou en_cours'} alors qu’un champ contient encore « ${TO_CONFIRM} ».`,
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

/** The service page a case study proves, from its category. */
export const SERVICE_FOR_CATEGORY: Record<ProjectCategory, 'web' | 'seo' | 'shopify' | 'tools'> = {
  web: 'web',
  seo: 'seo',
  shopify: 'shopify',
  saas: 'tools',
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

/** srcset for a capture in public/work/: the 640 px variant when it exists
 *  (generated beside the 1280 px file), else the full file alone. */
export function captureSrcset(shot: string): string | undefined {
  const small = shot.replace(/\.webp$/, '-640.webp');
  return small !== shot && existsSync(`public${small}`) ? `${small} 640w, ${shot} 1280w` : undefined;
}

/** Category as a human word (cards, filters, JSON-LD `about`). */
export const CATEGORY_LABEL: Record<ProjectCategory, LocalizedField> = {
  saas: { fr: 'Logiciel', en: 'Software' },
  web: { fr: 'Site sur mesure', en: 'Custom site' },
  seo: { fr: 'Refonte et SEO', en: 'Redesign and SEO' },
  shopify: { fr: 'Boutique Shopify', en: 'Shopify store' },
};

/** Work-index filter a project belongs to: redesigns count as websites. */
export type WorkFilter = 'logiciel' | 'web' | 'shopify';
export const FILTER_OF: Record<ProjectCategory, WorkFilter> = {
  saas: 'logiciel',
  web: 'web',
  seo: 'web',
  shopify: 'shopify',
};

/** Year span of a list of projects, e.g. "2025–2026" (or "2026" alone). */
export function yearSpan(list: Project[]): string {
  const years = list.map((p) => Number(p.year)).filter(Number.isFinite);
  if (!years.length) return '';
  const lo = Math.min(...years);
  const hi = Math.max(...years);
  return lo === hi ? String(lo) : `${lo}–${hi}`;
}
