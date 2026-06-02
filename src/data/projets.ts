// Portfolio / case-study data. Each project is bilingual (fr + en fields)
// and generates a case-study page in both languages from its shared slug.

import type { Locale } from '../i18n/routes';

export type ProjectCategory = 'web' | 'seo' | 'shopify';

export interface LocalizedField {
  fr: string;
  en: string;
}

export interface Project {
  slug: string;
  featured: boolean;
  order: number;
  url: string;
  year: string;
  category: ProjectCategory;
  client: string;
  /** Short accent color for the card (hex). */
  accent: string;
  title: LocalizedField;
  tagline: LocalizedField;
  role: LocalizedField;
  challenge: LocalizedField;
  built: LocalizedField;
  result: LocalizedField;
  stack: string[];
}

export const projects: Project[] = [
  {
    slug: 'inspection-habitation-outaouais',
    featured: true,
    order: 1,
    url: 'https://inspectionhab.ca',
    year: '2025',
    category: 'seo',
    client: 'Inspection Habitation Outaouais',
    accent: '#6fd8e0',
    title: {
      fr: 'Inspection Habitation Outaouais',
      en: 'Inspection Habitation Outaouais',
    },
    tagline: {
      fr: 'Refonte SEO local pour un inspecteur en bâtiment de Gatineau.',
      en: 'Local SEO redesign for a Gatineau building inspector.',
    },
    role: {
      fr: 'Conception, développement, SEO local',
      en: 'Design, development, local SEO',
    },
    challenge: {
      fr: 'Jean-Michel avait une boutique Shopify mince qui ne reflétait ni son expertise ni la profondeur de ses services. Aucune page dédiée par type d’inspection, peu de contenu, et une visibilité quasi nulle sur Google dans la région de Gatineau et de l’Outaouais.',
      en: 'Jean-Michel had a thin Shopify storefront that reflected neither his expertise nor the depth of his services. No dedicated page per inspection type, little content, and almost no Google visibility in the Gatineau / Outaouais region.',
    },
    built: {
      fr: 'J’ai transformé le Shopify 2.0 de base en un véritable site SEO local en Liquid sur mesure : des pages services dédiées (préachat, prévente, préréception, commercial et multilogements, balayage thermique, drone), une page À propos axée E-E-A-T mettant en valeur ses accréditations (CEI, APCHQ, OACIQ, RBQ, The Snell Group), un formulaire intelligent et un référencement local complet pour Gatineau et l’Outaouais (métas, Open Graph, Twitter cards, données structurées).',
      en: 'I turned the basic Shopify 2.0 into a real local-SEO site in custom Liquid: dedicated service pages (pre-purchase, pre-sale, pre-delivery, commercial & multi-unit, thermal scan, drone), an E-E-A-T-focused About page showcasing his accreditations (CEI, APCHQ, OACIQ, RBQ, The Snell Group), a smart contact form and full local SEO for Gatineau and the Outaouais (meta, Open Graph, Twitter cards, structured data).',
    },
    result: {
      fr: 'Un site crédible, structuré et optimisé qui positionne Jean-Michel comme l’expert en inspection de sa région, avec une page par service prête à ranker sur les bonnes recherches locales.',
      en: 'A credible, structured and optimized site that positions Jean-Michel as his region’s inspection expert, with one page per service ready to rank on the right local searches.',
    },
    stack: ['Shopify', 'Liquid', 'SEO local', 'Schema.org'],
  },
  {
    slug: 'hp-addik',
    featured: true,
    order: 2,
    url: 'https://hpaddik.com',
    year: '2025',
    category: 'shopify',
    client: 'HP Addik',
    accent: '#f4d9b0',
    title: {
      fr: 'HP Addik',
      en: 'HP Addik',
    },
    tagline: {
      fr: 'Boutique Shopify sur mesure pour un fabricant de kits turbo.',
      en: 'Custom Shopify store for a turbo-kit fabricator.',
    },
    role: {
      fr: 'Conception, thème Shopify sur mesure',
      en: 'Design, custom Shopify theme',
    },
    challenge: {
      fr: 'HP Addik conçoit et fabrique des kits turbo et des pièces de performance haut de gamme pour Honda Talon, VTT et motos. Il fallait une boutique à la hauteur de cette précision : rapide, robuste et capable de présenter des produits techniques sans se perdre dans un thème générique.',
      en: 'HP Addik designs and builds high-end turbo kits and performance parts for Honda Talons, ATVs and motorcycles. The store had to match that precision: fast, sturdy and able to present technical products without getting lost in a generic theme.',
    },
    built: {
      fr: 'Une boutique Shopify en Liquid sur mesure, pensée pour la performance : fiches produits techniques claires, navigation par véhicule, expérience d’achat rapide et identité de marque affirmée. « Ride harder. Upgrade smarter. »',
      en: 'A custom Liquid Shopify store built for performance: clear technical product pages, browse-by-vehicle navigation, a fast checkout experience and a strong brand identity. “Ride harder. Upgrade smarter.”',
    },
    result: {
      fr: 'Une vitrine e-commerce qui inspire confiance aux passionnés de performance et qui vend des produits techniques aussi bien au Canada qu’aux États-Unis.',
      en: 'An e-commerce storefront that earns the trust of performance enthusiasts and sells technical products across Canada and the United States.',
    },
    stack: ['Shopify', 'Liquid', 'E-commerce', 'Performance'],
  },
  {
    slug: 'envita-wellness',
    featured: true,
    order: 3,
    url: 'https://evita-wellness.com',
    year: '2026',
    category: 'shopify',
    client: 'Envita Wellness',
    accent: '#e8c79a',
    title: {
      fr: 'Envita Wellness',
      en: 'Envita Wellness',
    },
    tagline: {
      fr: 'Plateforme custom pour des programmes de respiration en direct.',
      en: 'Custom platform for live breathwork programs.',
    },
    role: {
      fr: 'Conception, développement Shopify sur mesure',
      en: 'Design, custom Shopify development',
    },
    challenge: {
      fr: 'Envita Wellness offre des programmes de respiration (breathwork) en direct, comme le « 21-Day Breath Camp », pensés pour la vraie vie et non pour les athlètes ou les puristes du bien-être. Il fallait un site calme, clair et rassurant pour convertir des inscriptions à des cohortes en direct et gérer une liste d’attente.',
      en: 'Envita Wellness offers live breathwork programs, like the “21-Day Breath Camp,” designed for everyday life rather than athletes or wellness purists. It needed a calm, clear, reassuring site to convert sign-ups to live cohorts and manage a waitlist.',
    },
    built: {
      fr: 'Une plateforme Shopify entièrement personnalisée en Liquid : présentation du programme phare, gestion des cohortes et des inscriptions, sections programmes à venir (sessions privées, classes à la carte), liste d’attente et une direction visuelle apaisante, fidèle à l’esprit de la marque.',
      en: 'A fully custom Shopify platform in Liquid: flagship program presentation, cohort and registration handling, upcoming-offering sections (private sessions, drop-in classes), waitlist capture and a calming visual direction true to the brand’s spirit.',
    },
    result: {
      fr: 'Une expérience sereine et professionnelle qui donne envie de s’inscrire et qui soutient la croissance des offres de l’entreprise dans le temps.',
      en: 'A serene, professional experience that invites sign-ups and supports the growth of the company’s offerings over time.',
    },
    stack: ['Shopify', 'Liquid', 'Custom theme', 'Conversion'],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function sortedProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function featuredProjects(): Project[] {
  return sortedProjects().filter((p) => p.featured);
}

/** Localized helper. */
export function loc(field: LocalizedField, locale: Locale): string {
  return field[locale];
}
