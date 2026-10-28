// Home-page copy, both languages. Kept apart from fr.ts / en.ts because the
// home is written as one piece (a voice, not a set of reusable strings).
//
// Every fact here is already published elsewhere on the site or was supplied
// by Patrick: Habita is published by Technologies Habita inc., which he
// founded; the stack is Astro, React, Supabase and Vercel; one contact from
// first call to launch.
//
// Repetition is kept in check on purpose: Habita has one strong mention (its
// work file), the measured score one (the inspection sheet), and "bâtir"
// appears twice on the French page (H1 and contact title). Service names are
// not written here: the house links read them from fr.ts / en.ts, so the home,
// the footer and the service pages always use the same name.

import type { Locale } from './routes';

export type ServiceKey = 'svcWeb' | 'svcSeo' | 'svcShopify' | 'svcTools';

// One entry in the work list. `href` is a case study or a live site; no link
// when neither exists yet. `status` is a plain fact checked on the date below.
// `media`: captures shown in a dossier frame (DossierFrame.astro), by file
// name in src/assets/work/; a capture whose file is absent is simply left out.
type Media = { file: string; label: string; alt: string };
type WorkItem = { slug: string; kind: string; title: string; body: string; status: string; media: Media[]; links: { href: string; label: string; external?: boolean }[] };

// A client's words, published only once the client has supplied and approved
// them. Null hides the slot.
type Testimonial = { quote: string; name: string; role: string } | null;

const fr = {
  hero: {
    // One sentence per line; « sur mesure » never splits (no-break space).
    title: ['Des sites rapides.', 'Des outils sur\u00A0mesure.', 'Bâtis au Québec.'],
    lead: 'Je conçois des sites qui se trouvent sur Google et des outils qui servent pour vrai, pour les PME d’ici, en français comme en anglais.',
    secondary: 'Voir les réalisations',
  },
  sheet: {
    ref: 'Réf. PL-2026-01',
    title: 'Fiche d’inspection de ce site',
    performance: 'Performance mobile',
    lcp: 'Affichage du contenu (LCP)',
    cls: 'Stabilité visuelle (CLS)',
    weight: 'Poids transféré',
    kb: 'Ko',
    status: 'Statut',
    pass: 'Conforme',
    fix: 'À corriger',
    measured: (date: string, tool: string, live: boolean) =>
      `Mesuré le ${date} ${live ? 'sur patricklaperriere.com' : 'sur un build local'} avec ${tool}, profil mobile.`,
    notMeasured: 'Pas encore mesuré : lancer npm run measure.',
  },
  inspection: {
    title: 'Un site s’inspecte comme une maison.',
    intro: 'De la toiture aux fondations : trois couches, trois façons de vous aider.',
    planLabel: 'Plan d’une maison en coupe, en trois couches numérotées : toiture, structure et fondations, chacune marquée conforme',
    // Annotations on the drawing (mono, capitals, decorative).
    ok: 'Conforme',
    scanning: 'Balayage',
    stamp: 'Inspecté',
    layers: [
      {
        name: 'Toiture',
        title: 'Le site que vos clients voient.',
        body: 'Rapide, bien référencé, vraiment bilingue. Je le développe en Astro, avec une structure pensée pour Google dès la première ligne.',
        links: ['svcWeb', 'svcShopify'],
      },
      {
        name: 'Structure',
        title: 'Les outils qui font tourner l’entreprise.',
        body: 'Demandes en ligne, prise de rendez-vous, tableaux de bord : des outils en React et Supabase, conçus autour de votre façon de travailler.',
        links: ['svcTools'],
      },
      {
        name: 'Fondations',
        title: 'Ce qui ne se voit pas, mais que Google mesure.',
        body: 'Vitesse, structure, balises, données structurées. Sur un site existant, je commence par auditer et corriger ces fondations techniques, puis je modernise le reste.',
        links: ['svcSeo'],
      },
    ] as { name: string; title: string; body: string; links: ServiceKey[] }[],
  },
  // Facts only. BeauRegard: supplied by Patrick or read from the live site
  // (title, Astro generator).
  // <!-- À CONFIRMER PATRICK : accord d'Éric Beauregard pour être nommé à l'accueil -->
  work: {
    title: 'Réalisations',
    intro: 'Le logiciel de Technologies Habita inc. et un site pour un inspecteur en bâtiment.',
    all: 'Toutes les réalisations',
    file: 'Dossier',
    items: [
      {
        slug: 'habita',
        kind: 'Logiciel SaaS',
        title: 'Habita',
        body: 'Le logiciel d’inspection en bâtiment de Technologies Habita inc., que je conçois et développe : rapports web et PDF, IA de rédaction des constats, mode hors ligne, bilingue.',
        status: 'En ligne',
        // <!-- À CONFIRMER PATRICK : capture à plat d'un rapport web, données de démo -->
        media: [{ file: 'habita-rapport-web.png', label: 'Rapport web', alt: 'Un rapport d’inspection Habita affiché dans le navigateur' }],
        links: [
          { href: 'case', label: 'L’étude de cas' },
          { href: 'https://habita.expert', label: 'habita.expert', external: true },
        ],
      },
      {
        slug: 'inspection-beauregard',
        kind: 'Site sur mesure',
        title: 'Inspection BeauRegard',
        body: 'Un inspecteur en bâtiment de Sherbrooke, qui rédige ses rapports dans Habita. J’ai fait passer son site de Wix à un site Astro sur mesure.',
        status: 'En ligne',
        // <!-- À CONFIRMER PATRICK : accord d'Éric avant d'ajouter ces deux captures -->
        media: [
          { file: 'beauregard-avant.png', label: 'Avant · Wix', alt: 'L’ancien site d’Inspection BeauRegard, sur Wix' },
          { file: 'beauregard-apres.png', label: 'Après · Astro', alt: 'Le nouveau site d’Inspection BeauRegard, en Astro' },
        ],
        links: [
          { href: 'case', label: 'L’étude de cas' },
          { href: 'https://www.inspectionbeauregard.com', label: 'inspectionbeauregard.com', external: true },
        ],
      },
    ] as WorkItem[],
  },
  about: {
    title: 'Qui je suis',
    body: [
      'Développeur web au Québec, je travaille directement avec vous : un seul interlocuteur, du premier appel à la mise en ligne.',
      'Je développe aussi Habita, le logiciel de l’entreprise que j’ai fondée, Technologies Habita inc. Faire évoluer ce logiciel me garde exigeant sur ce qui compte pour vous : un code fiable, rapide et qui tient dans le temps.',
    ],
    proofs: {
      stack: 'Outils',
      languages: 'Langues',
      languagesValue: 'Français et anglais',
    },
    // <!-- À CONFIRMER PATRICK : vraie citation d'un client, avec son accord -->
    testimonial: null as Testimonial,
    more: 'En savoir plus',
  },
  contact: {
    title: 'Un site à bâtir, un outil à concevoir ?',
    lead: 'Écrivez-moi : je réponds personnellement, en français ou en anglais.',
    email: 'Courriel',
    phone: 'Téléphone',
  },
};

type HomeCopy = typeof fr;

const en: HomeCopy = {
  hero: {
    title: ['Fast websites.', 'Custom tools.', 'Built in Quebec.'],
    lead: 'I design websites that get found on Google and tools that actually get used, for small businesses here, in French and in English.',
    secondary: 'See the work',
  },
  sheet: {
    ref: 'Ref. PL-2026-01',
    title: 'Inspection sheet for this site',
    performance: 'Mobile performance',
    lcp: 'Content display (LCP)',
    cls: 'Visual stability (CLS)',
    weight: 'Data transferred',
    kb: 'KB',
    status: 'Status',
    pass: 'Pass',
    fix: 'Needs work',
    measured: (date: string, tool: string, live: boolean) =>
      `Measured on ${date} ${live ? 'on patricklaperriere.com' : 'on a local build'} with ${tool}, mobile profile.`,
    notMeasured: 'Not measured yet: run npm run measure.',
  },
  inspection: {
    title: 'A website gets inspected like a house.',
    intro: 'From the roof down to the foundations: three layers, three ways I can help.',
    planLabel: 'Section drawing of a house in three numbered layers: roof, structure and foundations, each marked as passing',
    ok: 'Pass',
    scanning: 'Scanning',
    stamp: 'Inspected',
    layers: [
      {
        name: 'Roof',
        title: 'The site your customers see.',
        body: 'Fast, well ranked, genuinely bilingual. I develop it in Astro, with a structure designed for Google from the first line.',
        links: ['svcWeb', 'svcShopify'],
      },
      {
        name: 'Structure',
        title: 'The tools that keep the business running.',
        body: 'Online requests, appointment booking, dashboards: tools in React and Supabase, built around the way you actually work.',
        links: ['svcTools'],
      },
      {
        name: 'Foundations',
        title: 'What visitors don’t see, but Google measures.',
        body: 'Speed, structure, tags, structured data. On an existing site, I start by auditing and fixing these technical foundations, then modernize the rest.',
        links: ['svcSeo'],
      },
    ],
  },
  work: {
    title: 'Work',
    intro: 'Technologies Habita’s software and a website for a building inspector.',
    all: 'All work',
    file: 'File',
    items: [
      {
        slug: 'habita',
        kind: 'SaaS product',
        title: 'Habita',
        body: 'The building inspection software of Technologies Habita inc., which I design and build: web and PDF reports, AI-assisted findings, offline mode, fully bilingual.',
        status: 'Live',
        media: [{ file: 'habita-rapport-web.png', label: 'Web report', alt: 'A Habita inspection report shown in the browser' }],
        links: [
          { href: 'case', label: 'The case study' },
          { href: 'https://habita.expert', label: 'habita.expert', external: true },
        ],
      },
      {
        slug: 'inspection-beauregard',
        kind: 'Custom site',
        title: 'Inspection BeauRegard',
        body: 'A building inspector in Sherbrooke who writes his reports in Habita. I moved his site from Wix to a custom Astro site.',
        status: 'Live',
        media: [
          { file: 'beauregard-avant.png', label: 'Before · Wix', alt: 'The former Inspection BeauRegard site, on Wix' },
          { file: 'beauregard-apres.png', label: 'After · Astro', alt: 'The new Inspection BeauRegard site, in Astro' },
        ],
        links: [
          { href: 'case', label: 'The case study' },
          { href: 'https://www.inspectionbeauregard.com', label: 'inspectionbeauregard.com', external: true },
        ],
      },
    ],
  },
  about: {
    title: 'Who I am',
    body: [
      'A web developer in Quebec, I work with you directly: one contact, from the first call to launch day.',
      'I also develop Habita, the software of the company I founded, Technologies Habita inc. Growing that software keeps me demanding about what matters to you: code that is reliable, fast and built to last.',
    ],
    proofs: {
      stack: 'Tools',
      languages: 'Languages',
      languagesValue: 'French and English',
    },
    testimonial: null,
    more: 'More about me',
  },
  contact: {
    title: 'A site to build, a tool to design?',
    lead: 'Write to me: I answer personally, in French or in English.',
    email: 'Email',
    phone: 'Phone',
  },
};

export const homeCopy: Record<Locale, HomeCopy> = { fr, en };
