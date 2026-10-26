// Home-page copy, both languages. Kept apart from fr.ts / en.ts because the
// home is written as one piece (a voice, not a set of reusable strings).
//
// Every fact here is already published elsewhere on the site or was supplied
// by Patrick: Habita is in production with paying clients and is published by
// Technologies Habita inc., which he founded; the stack is Astro, React,
// Supabase and Vercel; one contact from first call to launch.

import type { Locale } from './routes';

type LinkKey = 'svcWeb' | 'svcSeo' | 'svcShopify' | 'svcTools' | 'habitaCase' | 'habitaSite';

// One entry in the work list. `href` is a case study or a live site; no link
// when neither exists yet. `status` is a plain fact checked on the date below.
type WorkItem = { slug: string; kind: string; title: string; body: string; status: string; links: { href: string; label: string; external?: boolean }[] };

const fr = {
  hero: {
    name: 'Patrick Laperrière, développeur web',
    title: 'Des sites rapides. Des outils sur mesure. Bâtis au Québec.',
    lead: 'Je bâtis des sites qui se trouvent sur Google et des outils qui servent pour vrai, pour les PME d’ici, en français comme en anglais.',
    cta: 'Parlons de votre projet',
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
    measured: (date: string, tool: string) => `Mesuré le ${date} avec ${tool}, profil mobile.`,
    notMeasured: 'Pas encore mesuré : lancer npm run measure.',
  },
  inspection: {
    title: 'Un site s’inspecte comme une maison.',
    intro: 'De la toiture aux fondations : trois couches, trois façons de vous aider.',
    planLabel: 'Plan d’une maison en coupe, en trois couches numérotées : toiture, structure et fondations, chacune marquée conforme',
    // Annotations on the drawing (mono, capitals, decorative).
    word: 'Inspection',
    ref: 'Réf. PL-2026-01',
    ok: 'Conforme',
    scanning: 'Balayage',
    stamp: 'Inspecté',
    layers: [
      {
        name: 'Toiture',
        title: 'Le site que vos clients voient.',
        body: 'Rapide, bien référencé, vraiment bilingue. Je le bâtis en Astro, avec une structure pensée pour Google dès la première ligne.',
        links: [
          { key: 'svcWeb', label: 'Création de site web' },
          { key: 'svcSeo', label: 'Refonte et SEO' },
          { key: 'svcShopify', label: 'Boutique Shopify' },
        ],
      },
      {
        name: 'Structure',
        title: 'Les outils qui font tourner l’entreprise.',
        body: 'Demandes en ligne, prise de rendez-vous, tableaux de bord : des outils en React et Supabase, conçus autour de votre façon de travailler.',
        links: [{ key: 'svcTools', label: 'Outils sur mesure' }],
      },
      {
        name: 'Fondations',
        title: 'Habita, mon propre logiciel.',
        body: 'Le logiciel de rapports d’inspection en bâtiment de Technologies Habita inc., que j’ai fondée. Il est en production, avec des clients payants, et son IA aide les inspecteurs à rédiger leurs constats.',
        links: [
          { key: 'habitaCase', label: 'L’étude de cas' },
          { key: 'habitaSite', label: 'habita.expert' },
        ],
      },
    ] as { name: string; title: string; body: string; links: { key: LinkKey; label: string }[] }[],
  },
  // Facts only. BeauRegard and Bâti-Conseil: supplied by Patrick or read from
  // the live site (title, Astro generator) and the Bâti-Conseil repository.
  // <!-- À CONFIRMER PATRICK : accord des deux clients pour être nommés à l'accueil -->
  work: {
    title: 'Réalisations',
    intro: 'Mon propre logiciel, et deux sites pour des inspecteurs en bâtiment.',
    all: 'Toutes les réalisations',
    file: 'Dossier',
    items: [
      {
        slug: 'habita',
        kind: 'Logiciel SaaS',
        title: 'Habita',
        body: 'Le logiciel d’inspection en bâtiment que je conçois et développe : rapports web et PDF, IA de rédaction des constats, mode hors ligne, bilingue.',
        status: 'En ligne',
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
        links: [{ href: 'https://www.inspectionbeauregard.com', label: 'inspectionbeauregard.com', external: true }],
      },
      {
        slug: 'bati-conseil',
        kind: 'Site sur mesure',
        title: 'Bâti-Conseil',
        body: 'Un site Astro statique pour un inspecteur en bâtiment : une page par service, un exemple de rapport selon le modèle Habita et un formulaire de demande qui fonctionne sans JavaScript.',
        status: 'Pas encore en ligne',
        links: [],
      },
    ] as WorkItem[],
  },
  about: {
    title: 'Qui je suis',
    body: [
      'Développeur web au Québec, je travaille directement avec vous : un seul interlocuteur, du premier appel à la mise en ligne.',
      'Bâtir et faire évoluer mon propre logiciel me garde exigeant sur ce qui compte pour vous : un code fiable, rapide et qui tient dans le temps.',
    ],
    proofs: {
      company: 'Entreprise',
      companyValue: 'Fondateur de Technologies Habita inc.',
      stack: 'Outils',
      stackValue: 'Astro, React, Supabase, Vercel',
      languages: 'Langues',
      languagesValue: 'Français et anglais',
      site: 'Ce site',
      siteValue: (score: number) => `${score} / 100 en performance mobile`,
    },
    more: 'Mon parcours',
  },
  contact: {
    title: 'Un site à bâtir, un outil à concevoir ?',
    lead: 'Écrivez-moi : je réponds personnellement, en français ou en anglais.',
    email: 'Courriel',
    phone: 'Téléphone',
    cta: 'Écrire un message',
  },
};

type HomeCopy = typeof fr;

const en: HomeCopy = {
  hero: {
    name: 'Patrick Laperrière, web developer',
    title: 'Fast websites. Custom tools. Built in Quebec.',
    lead: 'I build websites that get found on Google and tools that actually get used, for small businesses here, in French and in English.',
    cta: 'Tell me about your project',
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
    measured: (date: string, tool: string) => `Measured on ${date} with ${tool}, mobile profile.`,
    notMeasured: 'Not measured yet: run npm run measure.',
  },
  inspection: {
    title: 'A website gets inspected like a house.',
    intro: 'From the roof down to the foundations: three layers, three ways I can help.',
    planLabel: 'Section drawing of a house in three numbered layers: roof, structure and foundations, each marked as passing',
    word: 'Inspection',
    ref: 'Ref. PL-2026-01',
    ok: 'Pass',
    scanning: 'Scanning',
    stamp: 'Inspected',
    layers: [
      {
        name: 'Roof',
        title: 'The site your customers see.',
        body: 'Fast, well ranked, genuinely bilingual. I build it in Astro, with a structure designed for Google from the first line.',
        links: [
          { key: 'svcWeb', label: 'Web design and development' },
          { key: 'svcSeo', label: 'Redesign and SEO' },
          { key: 'svcShopify', label: 'Shopify store' },
        ],
      },
      {
        name: 'Structure',
        title: 'The tools that keep the business running.',
        body: 'Online requests, appointment booking, dashboards: tools in React and Supabase, built around the way you actually work.',
        links: [{ key: 'svcTools', label: 'Custom tools' }],
      },
      {
        name: 'Foundations',
        title: 'Habita, my own software.',
        body: 'The building inspection reporting software of Technologies Habita inc., the company I founded. It is in production with paying clients, and its AI helps inspectors write up their findings.',
        links: [
          { key: 'habitaCase', label: 'The case study' },
          { key: 'habitaSite', label: 'habita.expert' },
        ],
      },
    ],
  },
  work: {
    title: 'Work',
    intro: 'My own software, and two websites for building inspectors.',
    all: 'All work',
    file: 'File',
    items: [
      {
        slug: 'habita',
        kind: 'SaaS product',
        title: 'Habita',
        body: 'The building inspection software I design and build: web and PDF reports, AI-assisted findings, offline mode, fully bilingual.',
        status: 'Live',
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
        links: [{ href: 'https://www.inspectionbeauregard.com', label: 'inspectionbeauregard.com', external: true }],
      },
      {
        slug: 'bati-conseil',
        kind: 'Custom site',
        title: 'Bâti-Conseil',
        body: 'A static Astro site for a building inspector: one page per service, a sample report based on the Habita model, and a request form that works without JavaScript.',
        status: 'Not live yet',
        links: [],
      },
    ],
  },
  about: {
    title: 'Who I am',
    body: [
      'A web developer in Quebec, I work with you directly: one contact, from the first call to launch day.',
      'Building and growing my own software keeps me demanding about what matters to you: code that is reliable, fast and built to last.',
    ],
    proofs: {
      company: 'Company',
      companyValue: 'Founder of Technologies Habita inc.',
      stack: 'Tools',
      stackValue: 'Astro, React, Supabase, Vercel',
      languages: 'Languages',
      languagesValue: 'French and English',
      site: 'This site',
      siteValue: (score: number) => `${score} / 100 for mobile performance`,
    },
    more: 'More about me',
  },
  contact: {
    title: 'A site to build, a tool to design?',
    lead: 'Write to me: I answer personally, in French or in English.',
    email: 'Email',
    phone: 'Phone',
    cta: 'Send a message',
  },
};

export const homeCopy: Record<Locale, HomeCopy> = { fr, en };
