// Refonte 2026-11 (direction v2) : les textes de la home, réécrits à la
// première personne, dans la voix de Patrick. Règle : aucun fait ni chiffre
// qui ne soit déjà publié sur le site (home.ts, fr.ts / en.ts, études de cas
// src/content/projets/). À faire approuver par Patrick : le tableau avant /
// après est dans les rendus SITEPERSO-2026-11-06-REFONTE-1B, 1H et 1I.
//
// 1H : langage simple. Phrases courtes, mots de tous les jours, aucun sigle
// non expliqué, aucun nom de technologie dans les textes de présentation.
//
// Pas de formule creuse, pas de triplet, pas de « pas X, mais Y », pas de
// tiret cadratin. Liens nommés par leur destination.
import type { Locale } from './routes';

const fr = {
  hero: {
    // 1I (Patrick) : embarquer ceux qui ne connaissent pas la technologie.
    // Qui je suis, ce que je fais, où cliquer : en cinq secondes.
    titre: 'Je fais de la technologie quelque chose de simple.',
    texte: 'Je m’appelle Patrick Laperrière. Je crée des sites web pour les entreprises d’ici, et j’aide tout le monde à comprendre la technologie sans se sentir dépassé.',
    entreprise: 'J’ai une entreprise et il me faut un site',
    apprendre: 'Je veux apprendre la technologie à mon rythme',
    photoAlt: '',
  },
  // 1I : les mesures, bas dans la page, en mots simples. Aucun sigle.
  mesures: {
    titre: 'Un site rapide, ça se vérifie',
    vitesse: (s: string) => `Sur un téléphone, cette page s’affiche en ${s} secondes. Google demande moins de 2,5 secondes.`,
    performance: 'Rapidité',
    accessibility: 'Facile à utiliser pour tout le monde',
    seo: 'Facile à trouver sur Google',
    bestPractices: 'Bien construit',
    sur: 'sur 100',
    reussi: 'Réussi',
    aCorriger: 'À corriger',
    mesure: (date: string, live: boolean) =>
      `Mesuré le ${date} avec l’outil de mesure de Google, comme sur un téléphone, ${live ? 'sur ce site en ligne' : 'sur une copie de ce site'}. Résultat retenu sur trois essais.`,
    pasMesure: 'Pas encore mesuré.',
  },
  // Home WOW : la scène « mes vrais projets autour de toi ». Une phrase vraie
  // par projet, tirée des études de cas publiées.
  scene: {
    titre: 'Mes vrais projets',
    intro: 'Descendez doucement. Vous passez devant des projets que j’ai faits, tels qu’ils sont en ligne.',
    projets: {
      habita: { nom: 'Habita', phrase: 'Le logiciel où les inspecteurs en bâtiment écrivent leurs rapports. Je le conçois et je le programme.', lien: 'Lire l’étude de cas Habita' },
      beauregard: { nom: 'Inspection BeauRegard', phrase: 'Le nouveau site d’un inspecteur en bâtiment de Sherbrooke, fait sur mesure.', lien: 'Lire l’étude de cas BeauRegard' },
      iho: { nom: 'Inspection Habitation Outaouais', phrase: 'Le site d’un inspecteur en bâtiment de l’Outaouais, en français et en anglais.', lien: 'Lire l’étude de cas Inspection Habitation Outaouais' },
      hpaddik: { nom: 'HP Addik', phrase: 'Une boutique en ligne faite sur mesure pour un spécialiste de pièces de performance.', lien: 'Lire l’étude de cas HP Addik' },
    },
    tout: 'Voir toutes les réalisations',
  },
  travaux: {
    titre: 'Réalisations',
    intro: 'Deux projets que je peux vous montrer en détail : le logiciel Habita et le site d’Inspection BeauRegard.',
    habita: {
      titre: 'Habita',
      texte: 'Habita est un logiciel pour les inspecteurs en bâtiment. Il appartient à Technologies Habita inc., l’entreprise que j’ai cofondée. C’est moi qui le conçois et qui le programme. L’inspecteur y écrit son rapport, avec l’aide de l’intelligence artificielle (IA). Le logiciel marche même sans Internet. Le client reçoit son rapport en ligne ou en PDF, en français ou en anglais.',
      figure: 'L’accueil du site d’Habita, habita.expert.',
      reperes: [
        { id: 'A', x: 75.5, y: 4, texte: 'Le site est en français et en anglais. Ce bouton FR / EN change la langue.' },
        { id: 'B', x: 50, y: 81, texte: 'On peut s’inscrire directement ici, sur la page d’accueil.' },
      ],
      etude: 'Lire l’étude de cas Habita',
      site: 'Voir habita.expert',
    },
    beauregard: {
      titre: 'Inspection BeauRegard',
      texte: 'Éric Beauregard est inspecteur en bâtiment à Sherbrooke. Il écrit ses rapports dans Habita. Son ancien site avait été fait avec un outil de site tout fait. Je lui ai construit un nouveau site, sur mesure. Les cinq anciennes adresses mènent maintenant aux nouvelles pages. Les gens qui le trouvaient sur Google le trouvent donc encore.',
      etude: 'Lire l’étude de cas BeauRegard',
      site: 'Voir inspectionbeauregard.com',
    },
    slider: { label: 'Comparer l’ancien site et le nouveau', avant: 'Avant : l’ancien site', apres: 'Après : le nouveau site', consigne: 'Glissez la barre bleue pour comparer l’ancien site et le nouveau.', avantAlt: 'L’ancien site d’Inspection BeauRegard', apresAlt: 'Le nouveau site d’Inspection BeauRegard' },
    tout: 'Voir toutes les réalisations',
  },
  services: {
    titre: 'Ce que je fais',
    intro: 'Quatre services. Chacun a sa page, qui explique ce qui est inclus et comment ça se passe.',
    imageAlt: '',
    // 1H : versions simples, pour la home de la refonte seulement. Les pages
    // de services (fr.ts, en.ts, publiées sur main) ne changent pas sans l'OK
    // de Patrick.
    lignes: {
      web: { titre: 'Un site web pour votre entreprise', texte: 'Un site fait sur mesure pour vous. Il s’ouvre vite et on le trouve facilement sur Google. Il explique clairement ce que vous faites et donne envie de vous appeler.' },
      seo: { titre: 'Améliorer votre site actuel', texte: 'Je regarde votre site et je trouve ce qui ne va pas. Ensuite, je corrige ce qui compte le plus, pour qu’il soit plus rapide et plus facile à trouver sur Google.' },
      shopify: { titre: 'Une boutique en ligne', texte: 'Une boutique faite sur mesure avec Shopify, un service connu pour vendre sur Internet. Elle ressemble à votre entreprise et met vos produits en valeur.' },
      tools: { titre: 'Des outils faits pour vous', texte: 'Des outils en ligne pour votre entreprise. Par exemple : recevoir des demandes, prendre des rendez-vous, suivre vos chiffres, ou donner à vos clients un espace bien à eux.' },
    },
  },
  apropos: {
    titre: 'Qui je suis',
    textes: [
      'Je crée des sites web, ici au Québec. Quand vous m’écrivez, c’est moi qui vous réponds. C’est aussi moi qui fais votre site, du début à la fin.',
      'Je programme aussi Habita, le logiciel de Technologies Habita inc., l’entreprise que j’ai cofondée.',
      'Je travaille en français et en anglais.',
    ],
    lien: 'Lire la page À propos',
  },
  // Bloc Pat Lap (1G) : textes de la landing (data/patlap.ts) ; ici, seulement
  // la phrase qui annonce la Soirée et le lien. Aucun prix.
  patlap: {
    soiree: (titre: string, format: string) => `Ensuite, pour aller plus loin : la ${titre}, ${format.charAt(0).toLowerCase()}${format.slice(1)}.`,
    lien: 'Voir le programme La technologie pour tous',
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
    titre: 'I make technology simple.',
    texte: 'I’m Patrick Laperrière. I build websites for local businesses, and I help everyone understand technology without feeling left behind.',
    entreprise: 'I have a business and I need a website',
    apprendre: 'I want to learn technology at my own pace',
    photoAlt: '',
  },
  mesures: {
    titre: 'A fast site is something you can check',
    vitesse: (s: string) => `On a phone, this page shows up in ${s} seconds. Google asks for less than 2.5 seconds.`,
    performance: 'Speed',
    accessibility: 'Easy for everyone to use',
    seo: 'Easy to find on Google',
    bestPractices: 'Well built',
    sur: 'out of 100',
    reussi: 'Passed',
    aCorriger: 'To fix',
    mesure: (date: string, live: boolean) =>
      `Measured on ${date} with Google’s measuring tool, as on a phone, ${live ? 'on this live site' : 'on a copy of this site'}. Result kept over three tries.`,
    pasMesure: 'Not measured yet.',
  },
  scene: {
    titre: 'My real projects',
    intro: 'Scroll down slowly. You are walking past projects I made, just as they are online.',
    projets: {
      habita: { nom: 'Habita', phrase: 'The software where home inspectors write their reports. I design it and I program it.', lien: 'Read the Habita case study' },
      beauregard: { nom: 'Inspection BeauRegard', phrase: 'The new website of a home inspector in Sherbrooke, made to measure.', lien: 'Read the BeauRegard case study' },
      iho: { nom: 'Inspection Habitation Outaouais', phrase: 'The website of a home inspector in the Outaouais, in French and in English.', lien: 'Read the Inspection Habitation Outaouais case study' },
      hpaddik: { nom: 'HP Addik', phrase: 'An online store made to measure for a performance-parts specialist.', lien: 'Read the HP Addik case study' },
    },
    tout: 'See all my work',
  },
  travaux: {
    titre: 'Work',
    intro: 'Two projects I can show you in detail: the Habita software and the Inspection BeauRegard website.',
    habita: {
      titre: 'Habita',
      texte: 'Habita is software for home inspectors. It belongs to Technologies Habita inc., the company I co-founded. I design it and I program it. The inspector writes the report in it, with help from artificial intelligence (AI). It works even without Internet. The client gets the report online or as a PDF, in French or in English.',
      figure: 'The home page of the Habita website, habita.expert.',
      reperes: [
        { id: 'A', x: 75.5, y: 4, texte: 'The site is in French and in English. This FR / EN button changes the language.' },
        { id: 'B', x: 50, y: 81, texte: 'You can sign up right here, on the home page.' },
      ],
      etude: 'Read the Habita case study',
      site: 'Visit habita.expert',
    },
    beauregard: {
      titre: 'Inspection BeauRegard',
      texte: 'Éric Beauregard is a home inspector in Sherbrooke. He writes his reports in Habita. His old site was made with a ready-made site builder. I built him a new site, made to measure. The five old addresses now lead to the new pages. People who found him on Google still find him.',
      etude: 'Read the BeauRegard case study',
      site: 'Visit inspectionbeauregard.com',
    },
    slider: { label: 'Compare the old site and the new one', avant: 'Before: the old site', apres: 'After: the new site', consigne: 'Drag the blue bar to compare the old site and the new one.', avantAlt: 'The old Inspection BeauRegard website', apresAlt: 'The new Inspection BeauRegard website' },
    tout: 'See all my work',
  },
  services: {
    titre: 'What I do',
    intro: 'Four services. Each has its own page that explains what is included and how it works.',
    imageAlt: '',
    lignes: {
      web: { titre: 'A website for your business', texte: 'A site made to measure for you. It opens fast and people find it easily on Google. It clearly explains what you do and makes people want to call you.' },
      seo: { titre: 'Improve your current site', texte: 'I look at your site and find what is not working. Then I fix what matters most, so it gets faster and easier to find on Google.' },
      shopify: { titre: 'An online store', texte: 'A store made to measure with Shopify, a well-known service for selling online. It looks like your business and shows off your products.' },
      tools: { titre: 'Tools made for you', texte: 'Online tools for your business. For example: receiving requests, booking appointments, following your numbers, or giving your clients a space of their own.' },
    },
  },
  apropos: {
    titre: 'Who I am',
    textes: [
      'I build websites, here in Quebec. When you write to me, I’m the one who answers. I’m also the one who makes your site, from start to finish.',
      'I also program Habita, the software of Technologies Habita inc., the company I co-founded.',
      'I work in French and in English.',
    ],
    lien: 'Read the About page',
  },
  patlap: {
    soiree: (titre: string, format: string) => `Then, to go further: ${titre.charAt(0).toLowerCase()}${titre.slice(1)}, ${format.charAt(0).toLowerCase()}${format.slice(1)}.`,
    lien: 'See the Tech for everyone program',
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
