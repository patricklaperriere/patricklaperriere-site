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
  /** Image fit: 'cover' (default, screenshots) or 'contain' (device mockups,
   *  shown whole on a dark backdrop instead of cropped). */
  fit?: 'cover' | 'contain';
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
    slug: 'habita',
    featured: true,
    order: 1,
    url: 'https://habita.expert',
    year: '2026',
    category: 'web',
    client: 'Habita (produit interne)',
    accent: '#7aa2ff',
    fit: 'contain',
    title: {
      fr: 'Habita',
      en: 'Habita',
    },
    tagline: {
      fr: 'Mon logiciel SaaS d’inspection en bâtiment pour les inspecteurs du Québec.',
      en: 'My SaaS building-inspection software for Quebec home inspectors.',
    },
    role: {
      fr: 'Produit, design et développement de A à Z',
      en: 'Product, design and development, end to end',
    },
    challenge: {
      fr: 'Au Québec, beaucoup d’inspecteurs en bâtiment travaillent encore avec des logiciels de bureau lourds, locaux et datés. Je voulais bâtir l’outil que j’aurais voulu avoir : moderne, infonuagique, bilingue, utilisable hors ligne sur le terrain, conforme à la norme BNQ 3009-500 et assez intelligent pour aider à rédiger les constats. Tout ça, conçu et développé seul, de l’idée jusqu’à la mise en marché, face à des joueurs établis comme Vesta, Lumos, UData et Enzo Solution.',
      en: 'In Quebec, many building inspectors still work with heavy, local, dated desktop software. I wanted to build the tool I wish I had: modern, cloud-based, bilingual, usable offline in the field, compliant with the BNQ 3009-500 standard and smart enough to help write findings. All designed and developed solo, from idea to market, against established players like Vesta, Lumos, UData and Enzo Solution.',
    },
    built: {
      fr: 'Habita est une plateforme SaaS complète : données sur infonuagique canadienne avec sauvegardes gérées, IA de rédaction de constats incluse sans plafond, rapports web interactifs partageables par lien sécurisé en plus du PDF, mode hors ligne pour inspecter sans réseau, organisation des photos, espace de travail multivolets et interface pensée mobile d’abord, le tout vraiment bilingue FR et EN. J’ai aussi bâti tout le site marketing : pages de fonctionnalités, tarif, un hub de ressources pour les inspecteurs (BNQ 3009-500, certificat RBQ catégorie 1, devenir inspecteur, assurances) et des pages de comparaison face à chaque concurrent.',
      en: 'Habita is a full SaaS platform: data on Canadian cloud with managed backups, AI finding-writing included with no cap, interactive web reports shareable via secure link on top of PDF, an offline mode to inspect without a connection, photo organization, a multi-panel workspace and a mobile-first interface, all genuinely bilingual FR and EN. I also built the entire marketing site: feature pages, pricing, a resource hub for inspectors (BNQ 3009-500, RBQ category 1 certificate, becoming an inspector, insurance) and comparison pages against each competitor.',
    },
    result: {
      fr: 'Un produit que je conçois et fais évoluer en continu, positionné comme l’alternative moderne et bilingue aux logiciels d’inspection traditionnels du Québec, soutenu par une vraie stratégie de contenu et de comparaison pour attirer les inspecteurs en recherche d’un meilleur outil. C’est ma plus grande fierté.',
      en: 'A product I design and keep evolving, positioned as the modern, bilingual alternative to Quebec’s traditional inspection software, backed by a real content and comparison strategy to attract inspectors looking for a better tool. It’s what I’m proudest of.',
    },
    stack: ['SaaS', 'Infonuagique (Canada)', 'IA', 'Hors ligne', 'Bilingue FR/EN'],
  },
  {
    slug: 'inspection-habitation-outaouais',
    featured: true,
    order: 2,
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
      fr: 'Site Astro bilingue et SEO local pour un inspecteur en bâtiment de l’Outaouais.',
      en: 'Bilingual Astro site with local SEO for an Outaouais building inspector.',
    },
    role: {
      fr: 'Conception, développement Astro, SEO local',
      en: 'Design, Astro development, local SEO',
    },
    challenge: {
      fr: 'Jean-Michel Barbier, inspecteur en bâtiment certifié (APCHQ, CEI, Snell Group), avait besoin d’une présence en ligne à la hauteur de sa rigueur. Il fallait un site crédible, rapide et bien référencé localement, capable de présenter clairement ses six types d’inspection et de convertir les visiteurs de Gatineau et de tout l’Outaouais en demandes d’inspection.',
      en: 'Jean-Michel Barbier, a certified building inspector (APCHQ, CEI, Snell Group), needed an online presence worthy of his rigour. The site had to be credible, fast and well ranked locally, able to clearly present his six inspection types and turn visitors across Gatineau and the wider Outaouais into inspection requests.',
    },
    built: {
      fr: 'Un site sur mesure en Astro, entièrement bilingue (FR et EN) et optimisé pour le SEO local. Une page dédiée par service (préachat, prévente, préréception, commerciale et multilogements, thermographie, inspection par drone), une page Secteurs couvrant tout l’Outaouais, une page Tarifs, une FAQ et une page À propos qui met en valeur son expertise et ses accréditations réelles (APCHQ, CEI, Snell Group, normes RBQ). Le tout avec un formulaire de demande qui promet une réponse le jour ouvrable même, des rapports livrés en 24 à 48 heures et un référencement local complet (métadonnées, données structurées, Open Graph).',
      en: 'A custom Astro site, fully bilingual (FR and EN) and built for local SEO. A dedicated page per service (pre-purchase, pre-sale, pre-delivery, commercial & multi-unit, thermography, drone inspection), a Service Areas page covering the whole Outaouais, a Pricing page, an FAQ, and an About page that showcases his expertise and real accreditations (APCHQ, CEI, Snell Group, RBQ standards). Plus a request form promising a same-business-day reply, reports delivered in 24 to 48 hours, and full local SEO (meta, structured data, Open Graph).',
    },
    result: {
      fr: 'Un site professionnel, structuré et rapide qui positionne Jean-Michel comme l’inspecteur de référence de l’Outaouais, avec une page par service prête à ranker sur les recherches locales.',
      en: 'A professional, structured and fast site that positions Jean-Michel as the go-to inspector in the Outaouais, with one page per service ready to rank on local searches.',
    },
    stack: ['Astro', 'SEO local', 'Bilingue FR/EN', 'Schema.org'],
  },
  {
    slug: 'hp-addik',
    featured: true,
    order: 3,
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
      fr: 'Boutique Shopify sur mesure pour un spécialiste de pièces de performance.',
      en: 'Custom Shopify store for a performance-parts specialist.',
    },
    role: {
      fr: 'Conception, thème Shopify sur mesure',
      en: 'Design, custom Shopify theme',
    },
    challenge: {
      fr: 'HP Addik conçoit et fabrique des kits turbo et des pièces de performance haut de gamme pour Honda Talon, côte-à-côte, VTT et motos. Il fallait une boutique à la hauteur de cette précision : rapide, robuste et capable de présenter des produits techniques sans se perdre dans un thème générique.',
      en: 'HP Addik designs and builds high-end turbo kits and performance parts for Honda Talons, side-by-sides, ATVs and motorcycles. The store had to match that precision: fast, sturdy and able to present technical products without getting lost in a generic theme.',
    },
    built: {
      fr: 'Une boutique Shopify en Liquid sur mesure, pensée pour la performance : magasinage par marque (Can-Am, Polaris, Yamaha, Honda, CF Moto) en plus de la gamme maison HP Addik, fiches produits techniques claires, sélecteur de pays et de langue pour vendre au Canada comme aux États-Unis, et une identité de marque affirmée. « Ride harder. Upgrade smarter. »',
      en: 'A custom Liquid Shopify store built for performance: shop-by-brand navigation (Can-Am, Polaris, Yamaha, Honda, CF Moto) alongside the in-house HP Addik line, clear technical product pages, a country and language selector to sell in Canada and the United States, and a strong brand identity. “Ride harder. Upgrade smarter.”',
    },
    result: {
      fr: 'Une vitrine e-commerce qui inspire confiance aux passionnés de performance et qui vend des produits techniques aussi bien au Canada qu’aux États-Unis.',
      en: 'An e-commerce storefront that earns the trust of performance enthusiasts and sells technical products across Canada and the United States.',
    },
    stack: ['Shopify', 'Liquid', 'E-commerce', 'Multirégion'],
  },
  {
    slug: 'envita-wellness',
    featured: true,
    order: 4,
    url: 'https://envita-wellness.com',
    year: '2026',
    category: 'shopify',
    client: 'Envita Wellness',
    accent: '#e8c79a',
    title: {
      fr: 'Envita Wellness',
      en: 'Envita Wellness',
    },
    tagline: {
      fr: 'Plateforme Shopify sur mesure pour des expériences de bien-être en direct.',
      en: 'Custom Shopify platform for live wellness experiences.',
    },
    role: {
      fr: 'Conception, développement Shopify sur mesure',
      en: 'Design, custom Shopify development',
    },
    challenge: {
      fr: 'Envita Wellness, mené par la facilitatrice Chrissy Papageorgopoulos, offre des expériences de respiration (breathwork), de mouvement et de bien-être corporatif, en ligne comme en personne. Son programme phare, le « 21-Day Breath Camp », est pensé pour la vraie vie, pas pour les athlètes ou les puristes du bien-être. Il fallait un site calme, clair et rassurant pour convertir les inscriptions aux cohortes en direct et gérer une liste d’attente.',
      en: 'Envita Wellness, led by facilitator Chrissy Papageorgopoulos, offers breathwork, movement and corporate wellness experiences, online and in person. Its flagship program, the “21-Day Breath Camp,” is built for real life, not for athletes or wellness purists. It needed a calm, clear, reassuring site to convert sign-ups to live cohorts and manage a waitlist.',
    },
    built: {
      fr: 'Une plateforme Shopify entièrement personnalisée en Liquid : présentation du programme phare, gestion des cohortes et des inscriptions, sections pour les offres à venir (sessions privées, classes à la carte), capture de liste d’attente et une direction visuelle apaisante et premium, fidèle à l’esprit de la marque.',
      en: 'A fully custom Shopify platform in Liquid: flagship program presentation, cohort and registration handling, sections for upcoming offerings (private sessions, drop-in classes), waitlist capture, and a calm, premium visual direction true to the brand’s spirit.',
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
