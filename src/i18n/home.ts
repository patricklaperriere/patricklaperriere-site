// Home-page copy, both languages. Kept apart from fr.ts / en.ts because the
// home is written as one piece (a voice, not a set of reusable strings).
//
// Every fact here is already published elsewhere on the site or was supplied
// by Patrick: Habita is in production with paying clients, it is published by
// Technologies Habita inc., the stack is Astro, React, Supabase and Vercel.

import type { Locale } from './routes';

const fr = {
  hero: {
    title: 'Patrick Laperrière, développeur web au Québec.',
    lead: 'Je fais des sites qui chargent vite et des outils qui règlent de vrais problèmes pour les PME d’ici. Le reste du temps, je bâtis Habita, mon logiciel pour les inspecteurs en bâtiment.',
    cta: 'Parlez-moi de votre projet',
    secondary: 'Voir ce que j’ai livré',
    note: 'c’est moi',
    portraitAlt: 'Patrick Laperrière, souriant, en veston bleu et t-shirt noir',
  },
  scan: {
    title: 'Un site, ça s’inspecte comme une maison.',
    intro: 'Du toit jusqu’aux fondations, voici ce que je bâtis.',
    planLabel: 'Croquis d’une maison en coupe : toiture, structure et fondations',
    scanning: 'inspection',
    layers: [
      {
        note: 'toiture',
        noteSub: 'ce que le monde voit',
        title: 'Votre site, c’est ce que le monde voit en premier.',
        body: 'Je fais des sites en Astro qui s’affichent tout de suite, se placent bien sur Google et parlent français et anglais pour vrai.',
        links: [{ key: 'svcWeb', label: 'Création de site web' }],
      },
      {
        note: 'structure',
        noteSub: 'ce qui tient debout',
        title: 'Les outils qui tiennent votre business debout.',
        body: 'Demandes en ligne, prise de rendez-vous, tableaux de bord : je les bâtis en React et Supabase, pensés pour votre façon de travailler.',
        links: [{ key: 'work', label: 'Voir les réalisations' }],
      },
      {
        note: 'fondations',
        noteSub: 'Habita',
        title: 'Habita, mon propre logiciel.',
        body: 'Des rapports d’inspection en bâtiment, avec une IA qui aide l’inspecteur à rédiger ses constats. En production, avec des clients payants. Je le bâtis avec Technologies Habita inc.',
        links: [
          { key: 'habitaCase', label: 'L’étude de cas' },
          { key: 'habitaSite', label: 'habita.expert' },
        ],
      },
    ],
  },
  work: {
    title: 'Ce que j’ai livré',
    all: 'Toutes les réalisations',
    shot: (t: string) => `Page d’accueil du site ${t}`,
    kinds: { saas: 'Logiciel SaaS', web: 'Site sur mesure', seo: 'Site et SEO local', shopify: 'Boutique Shopify' } as Record<string, string>,
  },
  habita: {
    title: 'Habita',
    body: 'Le logiciel de rapports d’inspection en bâtiment que je bâtis avec Technologies Habita inc. Il est en production, avec des clients payants, et son IA aide les inspecteurs à rédiger leurs constats.',
    case: 'Lire l’étude de cas',
    site: 'Visiter habita.expert',
    shotAlt: 'L’interface de Habita sur ordinateur, tablette et téléphone',
    notes: ['rapport d’inspection', 'les photos, classées'],
  },
  about: {
    title: 'Là où ça se passe',
    body: [
      'Quand vous m’écrivez, c’est moi qui réponds, et c’est moi qui code. Un seul interlocuteur, du premier appel à la mise en ligne.',
      'Je travaille en Astro, React, Supabase et Vercel, en français comme en anglais.',
    ],
    more: 'Mon parcours',
    deskAlt: 'Mon poste de travail : un écran, des haut-parleurs, un clavier et un micro sur le bureau',
    deskNote: 'mon bureau, un soir de match',
  },
  contact: {
    title: 'On s’en parle\u00a0?',
    lead: 'Un projet de site, un outil à bâtir, une question sur Habita : écrivez-moi.',
    or: 'ou au',
    cta: 'Remplir le formulaire',
  },
};

type HomeCopy = typeof fr;

const en: HomeCopy = {
  hero: {
    title: 'Patrick Laperrière, web developer in Quebec.',
    lead: 'I build websites that load fast and tools that solve real problems for small businesses here. The rest of the time, I build Habita, my software for home inspectors.',
    cta: 'Tell me about your project',
    secondary: 'See what I’ve shipped',
    note: 'that’s me',
    portraitAlt: 'Patrick Laperrière smiling, in a blue blazer and a black T-shirt',
  },
  scan: {
    title: 'A website gets inspected like a house.',
    intro: 'From the roof down to the foundations, here is what I build.',
    planLabel: 'Sketch of a house in section: roof, structure and foundations',
    scanning: 'inspection',
    layers: [
      {
        note: 'roof',
        noteSub: 'what people see',
        title: 'Your website is what people see first.',
        body: 'I build Astro sites that show up instantly, rank well on Google and genuinely speak both French and English.',
        links: [{ key: 'svcWeb', label: 'Web design and development' }],
      },
      {
        note: 'structure',
        noteSub: 'what holds it up',
        title: 'The tools that hold your business up.',
        body: 'Online requests, appointment booking, dashboards: I build them in React and Supabase, around the way you actually work.',
        links: [{ key: 'work', label: 'See the work' }],
      },
      {
        note: 'foundations',
        noteSub: 'Habita',
        title: 'Habita, my own software.',
        body: 'Building inspection reports, with AI that helps the inspector write up findings. In production, with paying clients. I build it with Technologies Habita inc.',
        links: [
          { key: 'habitaCase', label: 'The case study' },
          { key: 'habitaSite', label: 'habita.expert' },
        ],
      },
    ],
  },
  work: {
    title: 'What I’ve shipped',
    all: 'All work',
    shot: (t: string) => `Home page of the ${t} website`,
    kinds: { saas: 'SaaS product', web: 'Custom site', seo: 'Site and local SEO', shopify: 'Shopify store' },
  },
  habita: {
    title: 'Habita',
    body: 'The building inspection reporting software I build with Technologies Habita inc. It is in production with paying clients, and its AI helps inspectors write up their findings.',
    case: 'Read the case study',
    site: 'Visit habita.expert',
    shotAlt: 'The Habita interface on desktop, tablet and phone',
    notes: ['inspection report', 'photos, sorted'],
  },
  about: {
    title: 'Where it happens',
    body: [
      'When you write to me, I’m the one who answers, and I’m the one who writes the code. One contact, from the first call to launch day.',
      'I work in Astro, React, Supabase and Vercel, in French and in English.',
    ],
    more: 'More about me',
    deskAlt: 'My workstation: a monitor, speakers, a keyboard and a microphone on the desk',
    deskNote: 'my desk, on a game night',
  },
  contact: {
    title: 'Shall we talk?',
    lead: 'A website, a tool to build, a question about Habita: write to me.',
    or: 'or call',
    cta: 'Fill in the form',
  },
};

export const homeCopy: Record<Locale, HomeCopy> = { fr, en };
