// Home-page copy, both languages. Kept apart from fr.ts / en.ts because the
// home is written as one piece (a voice, not a set of reusable strings).
//
// Every fact here is already published elsewhere on the site or was supplied
// by Patrick: Habita is in production with paying clients and is published by
// Technologies Habita inc., which he founded; the stack is Astro, React,
// Supabase and Vercel; one contact from first call to launch.

import type { Locale } from './routes';

type LinkKey = 'svcWeb' | 'svcSeo' | 'svcShopify' | 'work' | 'habitaCase' | 'habitaSite';

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
    planLabel: 'Plan d’une maison en coupe, en trois couches numérotées : toiture, structure et fondations',
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
        links: [{ key: 'work', label: 'Voir les réalisations' }],
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
  work: {
    title: 'Réalisations récentes',
    all: 'Toutes les réalisations',
    shot: (t: string) => `Page d’accueil du site ${t}`,
    kinds: { saas: 'Logiciel SaaS', web: 'Site sur mesure', seo: 'Site et SEO local', shopify: 'Boutique Shopify' } as Record<string, string>,
  },
  about: {
    title: 'Qui je suis',
    body: [
      'Développeur web au Québec, je travaille directement avec vous : un seul interlocuteur, du premier appel à la mise en ligne.',
      'Mes outils de tous les jours sont Astro, React, Supabase et Vercel. Je travaille en français comme en anglais.',
    ],
    more: 'Mon parcours',
  },
  contact: {
    title: 'Parlons de votre projet.',
    lead: 'Un site à bâtir ou à refaire, un outil à concevoir : écrivez-moi, je réponds personnellement.',
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
    planLabel: 'Section drawing of a house in three numbered layers: roof, structure and foundations',
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
        links: [{ key: 'work', label: 'See the work' }],
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
    title: 'Recent work',
    all: 'All work',
    shot: (t: string) => `Home page of the ${t} website`,
    kinds: { saas: 'SaaS product', web: 'Custom site', seo: 'Site and local SEO', shopify: 'Shopify store' },
  },
  about: {
    title: 'Who I am',
    body: [
      'A web developer in Quebec, I work with you directly: one contact, from the first call to launch day.',
      'My everyday tools are Astro, React, Supabase and Vercel. I work in French and in English.',
    ],
    more: 'More about me',
  },
  contact: {
    title: 'Let’s talk about your project.',
    lead: 'A site to build or rebuild, a tool to design: write to me, I answer personally.',
    email: 'Email',
    phone: 'Phone',
    cta: 'Send a message',
  },
};

export const homeCopy: Record<Locale, HomeCopy> = { fr, en };
