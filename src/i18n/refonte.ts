// Refonte 2026-11 (direction v2) : les textes de la home, réécrits à la
// première personne, dans la voix de Patrick. Règle : aucun fait ni chiffre
// qui ne soit déjà publié sur le site (home.ts, fr.ts / en.ts, études de cas
// src/content/projets/). À faire approuver par Patrick : le tableau avant /
// après est dans le rendu SITEPERSO-2026-11-06-REFONTE-1B.
//
// Pas de formule creuse, pas de triplet, pas de « pas X, mais Y », pas de
// tiret cadratin. Liens nommés par leur destination.
import type { Locale } from './routes';

const fr = {
  hero: {
    titre: 'Des sites web rapides, bâtis au Québec.',
    texte: 'Je m’appelle Patrick Laperrière. Je conçois des sites en Astro pour des PME et des inspecteurs en bâtiment, en français et en anglais, et je développe le logiciel Habita.',
    contact: 'Remplir le formulaire de contact',
    travaux: 'Voir mes réalisations',
    photoAlt: '',
  },
  fiche: {
    titre: 'Fiche d’inspection de ce site',
    performance: 'Performance',
    accessibility: 'Accessibilité',
    bestPractices: 'Bonnes pratiques',
    seo: 'Référencement (SEO)',
    lcp: 'Affichage du contenu principal (LCP)',
    lcpSeuil: 'seuil de Google : 2,5 s',
    conforme: 'Conforme',
    aCorriger: 'À corriger',
    mesure: (date: string, tool: string, live: boolean) =>
      `Mesuré le ${date} ${live ? 'sur patricklaperriere.com' : 'sur un build local'} avec ${tool}, profil mobile, médiane de trois essais.`,
    pasMesure: 'Pas encore mesuré.',
  },
  travaux: {
    titre: 'Réalisations',
    intro: 'Deux projets que je peux vous montrer en détail : le logiciel Habita et le site d’Inspection BeauRegard.',
    habita: {
      titre: 'Habita',
      texte: 'Habita est le logiciel d’inspection en bâtiment de Technologies Habita inc., l’entreprise que j’ai cofondée. Je le conçois et je le développe : rapports web et PDF, rédaction des constats assistée par IA, mode hors ligne, en français et en anglais.',
      figure: 'L’accueil du site d’Habita, habita.expert.',
      reperes: [
        { id: 'A', x: 75.5, y: 4, texte: 'Le site est bilingue : un bouton FR / EN pour passer d’une langue à l’autre.' },
        { id: 'B', x: 50, y: 81, texte: 'L’inscription commence directement sur l’accueil.' },
      ],
      etude: 'Lire l’étude de cas Habita',
      site: 'Voir habita.expert',
    },
    beauregard: {
      titre: 'Inspection BeauRegard',
      texte: 'Éric Beauregard est inspecteur en bâtiment à Sherbrooke et il rédige ses rapports dans Habita. J’ai remplacé son site Wix par un site Astro sur mesure. Les cinq anciennes adresses Wix redirigent vers les nouvelles pages, pour garder ce que Google avait déjà indexé.',
      etude: 'Lire l’étude de cas BeauRegard',
      site: 'Voir inspectionbeauregard.com',
    },
    slider: { label: 'Comparer l’ancien site et le nouveau', avant: 'Avant, sur Wix', apres: 'Après, en Astro', consigne: 'Glissez la poignée pour comparer l’ancien site et le nouveau.' },
    tout: 'Voir toutes les réalisations',
  },
  services: {
    titre: 'Ce que je fais',
    intro: 'Quatre services. Chacun a sa page, avec ce qui est inclus et les étapes.',
    imageAlt: '',
  },
  apropos: {
    titre: 'Qui je suis',
    textes: [
      'Je suis développeur web au Québec. Quand vous m’écrivez, c’est moi qui vous réponds, et c’est moi qui conçois et développe votre site.',
      'Je développe aussi Habita, le logiciel de Technologies Habita inc., l’entreprise que j’ai cofondée.',
    ],
    outils: (stack: string) => `Je travaille avec ${stack}, en français et en anglais.`,
    lien: 'Lire la page À propos',
  },
  contact: {
    titre: 'Parlez-moi de votre projet.',
    texte: 'Écrivez-moi ou appelez-moi. Je vous réponds moi-même, en français ou en anglais.',
    courriel: 'Courriel',
    telephone: 'Téléphone',
    bouton: 'Remplir le formulaire de contact',
  },
};

const en: typeof fr = {
  hero: {
    titre: 'Fast websites, built in Quebec.',
    texte: 'I’m Patrick Laperrière. I design websites in Astro for small businesses and home inspectors, in French and in English, and I develop the Habita software.',
    contact: 'Fill in the contact form',
    travaux: 'See my work',
    photoAlt: '',
  },
  fiche: {
    titre: 'Inspection sheet for this site',
    performance: 'Performance',
    accessibility: 'Accessibility',
    bestPractices: 'Best practices',
    seo: 'Search (SEO)',
    lcp: 'Main content display (LCP)',
    lcpSeuil: 'Google’s threshold: 2.5 s',
    conforme: 'Pass',
    aCorriger: 'To fix',
    mesure: (date: string, tool: string, live: boolean) =>
      `Measured on ${date} ${live ? 'on patricklaperriere.com' : 'on a local build'} with ${tool}, mobile profile, median of three runs.`,
    pasMesure: 'Not measured yet.',
  },
  travaux: {
    titre: 'Work',
    intro: 'Two projects I can show you in detail: the Habita software and the Inspection BeauRegard website.',
    habita: {
      titre: 'Habita',
      texte: 'Habita is the home inspection software of Technologies Habita inc., the company I co-founded. I design and develop it: web and PDF reports, AI-assisted writing of findings, offline mode, in French and in English.',
      figure: 'The home page of the Habita website, habita.expert.',
      reperes: [
        { id: 'A', x: 75.5, y: 4, texte: 'The site is bilingual: an FR / EN switch to go from one language to the other.' },
        { id: 'B', x: 50, y: 81, texte: 'Sign-up starts right on the home page.' },
      ],
      etude: 'Read the Habita case study',
      site: 'Visit habita.expert',
    },
    beauregard: {
      titre: 'Inspection BeauRegard',
      texte: 'Éric Beauregard is a home inspector in Sherbrooke, and he writes his reports in Habita. I replaced his Wix site with a custom Astro site. The five old Wix addresses redirect to the new pages, so what Google had already indexed is kept.',
      etude: 'Read the BeauRegard case study',
      site: 'Visit inspectionbeauregard.com',
    },
    slider: { label: 'Compare the old site and the new one', avant: 'Before, on Wix', apres: 'After, in Astro', consigne: 'Drag the handle to compare the old site and the new one.' },
    tout: 'See all my work',
  },
  services: {
    titre: 'What I do',
    intro: 'Four services. Each has its own page, with what is included and the steps.',
    imageAlt: '',
  },
  apropos: {
    titre: 'Who I am',
    textes: [
      'I’m a web developer in Quebec. When you write to me, I’m the one who answers, and I’m the one who designs and builds your site.',
      'I also develop Habita, the software of Technologies Habita inc., the company I co-founded.',
    ],
    outils: (stack: string) => `I work with ${stack}, in French and in English.`,
    lien: 'Read the About page',
  },
  contact: {
    titre: 'Tell me about your project.',
    texte: 'Write to me or call me. I answer personally, in French or in English.',
    courriel: 'Email',
    telephone: 'Phone',
    bouton: 'Fill in the contact form',
  },
};

export const refonteCopy: Record<Locale, typeof fr> = { fr, en };
