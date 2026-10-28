// French (fr-CA) copy. Single source of truth for all FR text outside the
// home page (home.ts) and the regional pages (data/villes.ts).
// EN mirrors this shape in en.ts.
//
// Rules for this file (October 2026 rewrite):
//   · facts only: no number, client, result or score that is not published
//     elsewhere and checkable. A missing fact goes in a <Todo> on the page
//     and in NUIT_RAPPORT.md, never as a guess here;
//   · Patrick and Technologies Habita inc. are two entities: the company
//     publishes Habita, Patrick founded it and builds it;
//   · Quebec French, no em dash, the typography filter adds the no-break
//     spaces before : ; ? ! at render time;
//   · one name per service, the same everywhere (nav, footer, home, pages);
//   · <title> bodies stay under 40 characters: the suffix
//     " | Patrick Laperrière" brings them to 60 at most.

export const fr = {
  locale: 'fr-CA',
  htmlLang: 'fr-CA',
  ogLocale: 'fr_CA',

  brand: 'Patrick Laperrière',
  langName: 'Français',
  switchTo: 'EN',
  switchToLabel: 'Voir cette page en anglais',
  skipToContent: 'Aller au contenu',
  ariaPrimaryNav: 'Navigation principale',

  nav: {
    services: 'Services',
    work: 'Réalisations',
    about: 'À propos',
    blog: 'Blogue',
    concepts: 'Concepts',
    contact: 'Contact',
  },

  cta: {
    // One label for the main action, everywhere (home included).
    primary: 'Démarrer un projet',
    viewProject: 'Voir l’étude de cas',
    readArticle: 'Lire l’article',
    visitSite: 'Visiter le site',
    allWork: 'Toutes les réalisations',
    seeServices: 'Voir le service',
  },

  // Starting prices. Amounts live in src/data/prix.ts (null = not shown).
  pricing: {
    from: 'À partir de',
    currency: '$',
    note: 'Prix de départ, avant taxes. Le montant final dépend du nombre de pages, du contenu et des fonctionnalités.',
  },

  // Measured Lighthouse scores of a client's live site (data/lighthouse.ts).
  lighthouse: {
    caseTitle: 'Mesure du site en ligne',
    labels: {
      performance: 'Performance',
      accessibility: 'Accessibilité',
      seo: 'SEO',
    },
    method: (date: string, url: string, tool: string) => `Mesuré le ${date} sur ${url} avec ${tool}, profil mobile, médiane de trois essais.`,
  },

  servicesSection: {
    kicker: 'Services',
    title: 'Quatre services, un seul interlocuteur',
    lead: 'Un site qui se trouve sur Google, une boutique qui vend, un outil qui simplifie le travail : je m’occupe de tout, de la première discussion à la mise en ligne.',
  },

  services: {
    web: {
      key: 'svcWeb',
      title: 'Création de site web',
      tagline: 'Un site rapide, clair et bien référencé.',
      blurb: 'Un site sur mesure, rapide et bien référencé, qui présente clairement votre entreprise et donne envie de vous contacter.',
      seoTitle: 'Création de site web sur mesure | Patrick Laperrière',
      seoDesc: 'Création de sites web sur mesure pour PME : rapides, accessibles, bien référencés sur Google, en français et en anglais. Québec, Canada et États-Unis.',
      h1: 'Création de site web sur mesure',
      lead: 'Un site qui charge vite, qui se lit bien sur un téléphone et que Google comprend, pour que vos futurs clients vous trouvent et vous écrivent.',
      problemTitle: 'Le point de départ',
      problem: 'Beaucoup de sites de PME ont été montés à partir d’un gabarit chargé d’extensions. Ils sont lents sur un téléphone, difficiles à faire évoluer et peu visibles sur Google, même quand l’entreprise est excellente.',
      solutionTitle: 'Ce que je propose',
      solution: 'Je conçois et développe votre site en Astro, un outil qui produit des pages légères, rendues d’avance. Le référencement fait partie de la structure dès le départ : titres, balises, données structurées, plan du site, version anglaise au besoin.',
      includedTitle: 'Ce qui est inclus',
      included: [
        'Design sur mesure, à partir de votre image de marque',
        'Pages adaptées au téléphone, à la tablette et à l’ordinateur',
        'Référencement technique : balises, données structurées, plan du site',
        'Accessibilité vérifiée : contraste, navigation au clavier, textes alternatifs',
        'Version française et anglaise au besoin, avec hreflang',
        'Formulaire de contact et mesure Lighthouse avant la livraison',
      ],
      processTitle: 'Les étapes',
      process: [
        { t: 'Découverte', d: 'Vos objectifs, vos clients, vos concurrents et le contenu à prévoir.' },
        { t: 'Design', d: 'La direction visuelle et les pages clés, validées avant le développement.' },
        { t: 'Développement', d: 'Le site complet, que vous suivez sur une préversion privée.' },
        { t: 'Mise en ligne', d: 'Redirections, mesure de la vitesse et inscription à Google Search Console.' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Combien de temps faut-il pour un site web ?', a: 'Cela dépend surtout du nombre de pages et du moment où le contenu est prêt. Je vous remets un échéancier écrit avant de commencer, et vous suivez l’avancement sur une préversion.' },
        { q: 'Combien coûte un site web sur mesure ?', a: 'Le montant dépend du nombre de pages, du contenu à produire et des fonctionnalités. Après un court appel, je vous envoie une soumission détaillée.' },
        { q: 'Pourrai-je modifier mon site moi-même ?', a: 'Oui, si vous le souhaitez. On en parle au départ : selon ce que vous voulez modifier, je prévois un outil de gestion de contenu simple ou je m’occupe des mises à jour.' },
        { q: 'Travaillez-vous avec des clients hors Québec ?', a: 'Oui. Je travaille à distance avec des clients au Canada et aux États-Unis, en français comme en anglais.' },
      ],
    },
    seo: {
      key: 'svcSeo',
      title: 'Refonte et SEO',
      tagline: 'Remettre un site existant à niveau.',
      blurb: 'Un audit de votre site actuel, puis les corrections qui comptent : vitesse, structure, contenu et référencement.',
      seoTitle: 'Refonte de site web et SEO | Patrick Laperrière',
      seoDesc: 'Audit, refonte et optimisation SEO de sites existants : vitesse, structure, balises et contenu corrigés dans le bon ordre. Pour PME du Québec et d’ailleurs.',
      h1: 'Refonte de site web et optimisation SEO',
      lead: 'Votre site existe, mais il est lent, daté ou introuvable sur Google. Je commence par mesurer ce qui ne va pas, puis je corrige dans le bon ordre.',
      problemTitle: 'Le point de départ',
      problem: 'Un site qui a grandi par ajouts successifs finit souvent lent, mal structuré et difficile à lire pour Google. On ne sait plus quoi corriger en premier, ni si une refonte complète est vraiment nécessaire.',
      solutionTitle: 'Ce que je propose',
      solution: 'Un audit technique et SEO d’abord, avec des mesures. Ensuite, un plan priorisé : parfois quelques corrections suffisent, parfois une refonte est plus rentable. Je vous le dis franchement, puis je fais le travail en préservant le référencement acquis (redirections, adresses, contenu).',
      includedTitle: 'Ce qui est inclus',
      included: [
        'Audit technique et SEO de votre site actuel, avec mesures',
        'Plan de corrections priorisé, en langage clair',
        'Vitesse et Core Web Vitals',
        'Titres, descriptions, structure des pages et données structurées',
        'Redirections des anciennes adresses lors d’une refonte',
        'Inscription et suivi dans Google Search Console',
      ],
      processTitle: 'Les étapes',
      process: [
        { t: 'Audit', d: 'Mesures de vitesse, d’indexation, de structure et de contenu.' },
        { t: 'Plan', d: 'Ce qu’il faut corriger, dans quel ordre, et pourquoi.' },
        { t: 'Corrections', d: 'Le travail technique, le contenu et, au besoin, le nouveau design.' },
        { t: 'Suivi', d: 'De nouvelles mesures pour vérifier l’effet des changements.' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Combien de temps avant de voir des résultats en SEO ?', a: 'Les corrections techniques (vitesse, structure) se mesurent dès la mise en ligne. Les positions sur Google évoluent plus lentement, sur plusieurs semaines ou plusieurs mois selon la concurrence.' },
        { q: 'Faut-il tout refaire ou seulement optimiser ?', a: 'Ça dépend de l’état du site. L’audit sert justement à le déterminer, et je vous dis honnêtement si quelques corrections suffisent.' },
        { q: 'Garantissez-vous la première position sur Google ?', a: 'Non, et personne ne peut le faire honnêtement. Je m’engage sur ce qui se contrôle : un site techniquement propre, un contenu clair et des mesures avant et après.' },
        { q: 'Faites-vous du SEO local ?', a: 'Oui : fiche d’entreprise Google, données structurées locales et pages adaptées à votre territoire.' },
      ],
    },
    shopify: {
      key: 'svcShopify',
      title: 'Boutique Shopify',
      tagline: 'Une boutique en ligne sur mesure.',
      blurb: 'Une boutique Shopify sur mesure en Liquid, fidèle à votre marque et pensée pour vos produits.',
      seoTitle: 'Boutique Shopify sur mesure | Patrick Laperrière',
      seoDesc: 'Développement de boutiques Shopify sur mesure en Liquid : thème à votre image, fiches produits claires, SEO des collections. Pour le Canada et les États-Unis.',
      h1: 'Boutique Shopify sur mesure',
      lead: 'Une boutique Shopify construite autour de vos produits et de votre marque, plutôt qu’un thème générique ajusté à la dernière minute.',
      problemTitle: 'Le point de départ',
      problem: 'Les thèmes prêts à l’emploi conviennent à beaucoup de boutiques, mais ils montrent leurs limites avec des produits techniques, une marque forte ou un parcours d’achat particulier.',
      solutionTitle: 'Ce que je propose',
      solution: 'Je développe un thème Shopify sur mesure en Liquid : des fiches produits qui expliquent bien ce que vous vendez, des collections bien organisées et un parcours d’achat simple, du produit jusqu’au paiement.',
      includedTitle: 'Ce qui est inclus',
      included: [
        'Thème Shopify sur mesure, développé en Liquid',
        'Fiches produits et collections adaptées à votre catalogue',
        'Parcours d’achat et panier simplifiés',
        'Images optimisées et vitesse de chargement surveillée',
        'SEO des produits et des collections',
        'Intégrations (paiement, livraison, applications) au besoin',
      ],
      processTitle: 'Les étapes',
      process: [
        { t: 'Découverte', d: 'Votre catalogue, votre marque et vos objectifs de vente.' },
        { t: 'Design', d: 'Les pages clés et le parcours d’achat, validés avant le code.' },
        { t: 'Développement', d: 'Le thème Liquid, testé sur une boutique de développement.' },
        { t: 'Lancement', d: 'Vérifications, mise en ligne et ajustements.' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Pourquoi un thème sur mesure plutôt qu’un thème payant ?', a: 'Un thème payant est souvent un bon départ. Le sur mesure vaut la peine quand vos produits, votre marque ou votre parcours d’achat ne rentrent pas dans le moule.' },
        { q: 'Pouvez-vous migrer ma boutique actuelle vers Shopify ?', a: 'Oui : produits, clients et redirections des anciennes adresses, pour garder vos données et votre référencement.' },
        { q: 'Gérez-vous les intégrations et les applications ?', a: 'Oui : paiement, livraison, inventaire, marketing. J’ajoute seulement ce dont la boutique a réellement besoin.' },
        { q: 'Travaillez-vous en anglais pour le marché américain ?', a: 'Oui. Je conçois des boutiques bilingues ou en anglais seulement, pour vendre au Canada comme aux États-Unis.' },
      ],
    },
    tools: {
      key: 'svcTools',
      title: 'Outils sur mesure',
      tagline: 'Des applications web à votre image.',
      blurb: 'Demandes en ligne, prise de rendez-vous, tableaux de bord, portails clients : des outils web sur mesure en React et Supabase.',
      seoTitle: 'Outils web sur mesure pour PME | Patrick Laperrière',
      seoDesc: 'Applications web sur mesure pour PME : demandes en ligne, rendez-vous, tableaux de bord et portails clients, en React et Supabase. En français et en anglais.',
      h1: 'Outils web sur mesure pour votre entreprise',
      lead: 'Quand les courriels, les tableurs et des logiciels qui ne se parlent pas ne suffisent plus, je conçois l’outil qui fait exactement ce dont vous avez besoin.',
      problemTitle: 'Le point de départ',
      problem: 'Beaucoup d’entreprises suivent leurs demandes, leurs rendez-vous et leurs dossiers entre des courriels, des tableurs et des logiciels séparés. L’information se perd, on ressaisit les mêmes données et personne n’a de vue d’ensemble.',
      solutionTitle: 'Ce que je propose',
      solution: 'Une application web pensée autour de votre façon de travailler : un seul endroit pour vos données, des accès par personne et une interface qui fonctionne sur un téléphone comme au bureau. C’est le même métier que celui que j’exerce en développant Habita, le logiciel d’inspection publié par Technologies Habita inc.',
      includedTitle: 'Ce qui est inclus',
      included: [
        'Analyse de votre façon de travailler avant la première ligne de code',
        'Application web en React, sur téléphone, tablette et ordinateur',
        'Base de données et authentification avec Supabase',
        'Accès par utilisateur et par rôle',
        'Interface en français, en anglais ou bilingue',
        'Documentation et accompagnement à la prise en main',
      ],
      processTitle: 'Les étapes',
      process: [
        { t: 'Découverte', d: 'Votre processus, vos données et les personnes qui utiliseront l’outil.' },
        { t: 'Prototype', d: 'Une première version cliquable pour valider l’essentiel.' },
        { t: 'Développement', d: 'Une construction par étapes, avec des versions à essayer.' },
        { t: 'Mise en service', d: 'Mise en ligne, prise en main et ajustements.' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Quel genre d’outil pouvez-vous bâtir ?', a: 'Des formulaires de demande reliés à une base de données, de la prise de rendez-vous, des tableaux de bord, des portails pour vos clients, des outils qui produisent des rapports. Si c’est une application web, on peut en parler.' },
        { q: 'Pourquoi pas un logiciel déjà sur le marché ?', a: 'Si un logiciel existant fait le travail, je vous le dirai. Le sur mesure vaut la peine quand votre façon de travailler ne rentre pas dans un outil générique.' },
        { q: 'L’outil peut-il être relié à mon site web ?', a: 'Oui. Un formulaire de votre site peut alimenter directement l’outil, et l’outil peut afficher de l’information sur le site.' },
        { q: 'Travaillez-vous en anglais ?', a: 'Oui. Je conçois des outils en français, en anglais ou bilingues, pour des équipes au Québec, au Canada et aux États-Unis.' },
      ],
    },
  },

  workSection: {
    kicker: 'Réalisations',
    title: 'Réalisations',
    lead: 'Un logiciel, des sites et des boutiques. Pour chaque projet : le point de départ, ce que j’ai fait et ce qu’on peut vérifier aujourd’hui.',
    relatedTitle: 'Projets réalisés',
    // Case study labels
    client: 'Client',
    challenge: 'Le point de départ',
    built: 'Ce que j’ai fait',
    stack: 'En bref',
    result: 'Ce qu’on peut vérifier',
    field: 'Utilisé sur le terrain',
    testimonial: 'Témoignage',
    seeAlso: 'Voir aussi',
    seeAlsoService: (t: string) => `Le service : ${t}`,
    seeAlsoCity: (n: string) => `Création de site web à ${n}`,
    translatedFrom: { fr: 'Traduit du français', en: 'Traduit de l’anglais' },
    role: 'Rôle',
    year: 'Année',
    status: 'Statut',
    next: 'Projet suivant',
    habitaAlt: 'Aperçu de Habita, le logiciel d’inspection en bâtiment publié par Technologies Habita inc.',
    shotAlt: (name: string) => `Capture d’écran du site ${name}`,
    notLive: 'Pas encore en ligne',
  },

  // Public Google reviews (data/temoignages.ts).
  testimonials: {
    title: 'Avis Google',
    rating: 'sur 5, avis Google',
  },

  finalCta: {
    kicker: 'Contact',
    title: 'Un projet en tête ?',
    lead: 'Décrivez-le en quelques lignes : je vous réponds personnellement, en français ou en anglais.',
  },

  about: {
    seoTitle: 'À propos, développeur web | Patrick Laperrière',
    seoDesc: 'Patrick Laperrière, développeur web et concepteur de produits, fondateur de Technologies Habita inc. Sites et outils web pour PME, en français et en anglais.',
    kicker: 'À propos',
    portraitAlt: 'Portrait de Patrick Laperrière',
    h1: 'Développeur web et concepteur de produits',
    lead: 'Je conçois et je développe des sites et des outils web pour les PME, au Québec et ailleurs, en français et en anglais.',
    body: [
      'Je m’appelle Patrick Laperrière. Je travaille directement avec mes clients : la personne qui vous écoute au premier appel est celle qui conçoit, écrit le code et met votre projet en ligne.',
      'J’ai aussi fondé Technologies Habita inc., une entreprise distincte qui publie Habita, un logiciel d’inspection en bâtiment. J’en conçois le produit et j’en écris le code. Faire évoluer un logiciel destiné aux inspecteurs en bâtiment m’oblige à penser à long terme : sécurité, sauvegardes, performance, entretien.',
      'J’applique la même exigence aux projets de mes clients : comprendre l’entreprise avant de choisir une technologie, livrer un code propre et mesurer le résultat plutôt que de le promettre.',
      'Je travaille en français et en anglais, avec des clients du Québec, du reste du Canada et des États-Unis.',
    ],
    bioTodo: 'parcours, formation et années d’expérience, en deux ou trois phrases',
    whyTitle: 'Ma façon de travailler',
    why: [
      { t: 'Un seul interlocuteur', d: 'Pas d’intermédiaire : vous parlez à la personne qui fait le travail.' },
      { t: 'Mesurer, pas promettre', d: 'Vitesse, accessibilité et référencement vérifiés avec des outils publics, avant et après.' },
      { t: 'Vraiment bilingue', d: 'Chaque langue a ses propres pages, rédigées et référencées séparément.' },
      { t: 'Des explications claires', d: 'Des choix expliqués sans jargon, et un échéancier écrit.' },
    ],
    stackTitle: 'Outils',
    companyTitle: 'Technologies Habita inc.',
    company: 'Entreprise fondée par Patrick Laperrière, qui publie le logiciel d’inspection en bâtiment Habita.',
    companyLink: 'habita.expert',
  },

  contact: {
    seoTitle: 'Contact, démarrer un projet | Patrick Laperrière',
    seoDesc: 'Écrivez à Patrick Laperrière pour un site web, une refonte, une boutique Shopify ou un outil sur mesure. Réponse personnelle, en français ou en anglais.',
    kicker: 'Contact',
    // The H1 stays as Patrick approved it.
    h1: 'Démarrons votre projet',
    lead: 'Quelques lignes suffisent : ce que vous faites, ce que vous aimeriez obtenir et, si vous l’avez, une échéance. Je vous réponds personnellement.',
    form: {
      name: 'Nom',
      namePlaceholder: 'Votre nom',
      email: 'Courriel',
      emailPlaceholder: 'vous@exemple.com',
      projectType: 'Type de projet',
      projectTypeOptions: ['Création de site web', 'Refonte et SEO', 'Boutique Shopify', 'Outils sur mesure', 'Autre'],
      budget: 'Budget approximatif',
      budgetOptions: ['Moins de 2 000 $', '2 000 $ à 5 000 $', '5 000 $ à 10 000 $', 'Plus de 10 000 $', 'À déterminer'],
      message: 'Message',
      messagePlaceholder: 'Parlez-moi de votre projet…',
      submit: 'Envoyer le message',
      sending: 'Envoi…',
      successTitle: 'Message envoyé',
      success: 'Merci. Je vous réponds dès que possible.',
      error: 'Le message n’a pas pu partir. Écrivez-moi directement par courriel.',
      orEmail: 'Ou écrivez-moi directement :',
      orCall: 'Ou appelez-moi :',
    },
  },

  blog: {
    seoTitle: 'Blogue : web, SEO et vitesse | Patrick Laperrière',
    seoDesc: 'Articles pratiques sur la création de sites, le référencement, la vitesse et le commerce en ligne, pour les PME qui veulent être trouvées sur Google.',
    kicker: 'Blogue',
    h1: 'Notes sur le web, le SEO et la vitesse',
    lead: 'Des articles concrets pour les entreprises qui veulent un site utile : création, référencement, vitesse, commerce en ligne.',
    soon: 'Les premiers articles arrivent bientôt.',
    byline: 'Par',
    authorRole: 'Développeur web, Québec',
    authorBio: 'Je conçois des sites et des outils web pour les PME, en français et en anglais. Je suis aussi le fondateur de Technologies Habita inc.',
    aboutLink: 'En savoir plus sur moi',
    related: 'Articles connexes',
    readMore: 'Lire',
    serviceLabel: 'Le service lié à cet article',
    serviceCta: 'Demander une soumission',
  },

  privacy: {
    seoTitle: 'Confidentialité et mentions légales | Patrick Laperrière',
    seoDesc: 'Quels renseignements patricklaperriere.com recueille, pourquoi et comment ils sont protégés, selon la Loi 25 du Québec. Éditeur et hébergement du site.',
    kicker: 'Confidentialité',
    h1: 'Politique de confidentialité et mentions légales',
    lead: 'Ce que le site recueille, pourquoi, et comment exercer vos droits.',
    updated: 'Dernière mise à jour : 27 octobre 2026',
    sections: [
      {
        title: 'Les renseignements recueillis',
        body: [
          'Le site recueille uniquement ce que vous transmettez volontairement par le formulaire de contact : votre nom, votre adresse courriel, le type de projet, le budget approximatif et votre message.',
          'Le site ne suit pas votre navigation et n’utilise ni témoins publicitaires ni outil d’analyse tiers.',
        ],
      },
      {
        title: 'L’utilisation de vos renseignements',
        body: [
          'Vos renseignements servent uniquement à répondre à votre demande, à préparer une soumission et à communiquer avec vous au sujet de votre projet. Ils ne sont ni vendus ni loués.',
        ],
      },
      {
        title: 'Les fournisseurs',
        body: [
          'Le formulaire de contact est traité par Web3Forms, qui transmet les messages par courriel. Le site est hébergé par Vercel. Ces fournisseurs traitent les données nécessaires à leur fonction, selon leurs propres politiques de confidentialité.',
        ],
      },
      {
        title: 'La conservation',
        body: [
          'Les courriels liés à votre demande sont conservés le temps nécessaire pour vous répondre et assurer le suivi du projet. Vous pouvez en demander la suppression en tout temps.',
        ],
      },
      {
        title: 'Vos droits',
        body: [
          'Selon la Loi 25 du Québec, vous pouvez accéder à vos renseignements personnels, les faire corriger ou les faire supprimer. Il suffit d’écrire à l’adresse ci-dessous.',
        ],
      },
      {
        title: 'Témoins et stockage local',
        body: [
          'Le site utilise seulement le stockage local de votre navigateur pour retenir de petites préférences d’affichage. Aucun témoin de pistage n’est utilisé.',
        ],
      },
      {
        title: 'Responsable et éditeur du site',
        body: [
          'Le site patricklaperriere.com est édité par Patrick Laperrière, développeur web, qui est aussi le responsable de la protection des renseignements personnels. Pour toute question : info@patricklaperriere.com.',
        ],
      },
    ],
  },

  footer: {
    tagline: 'Développeur web et concepteur de produits. Sites, boutiques et outils web, en français et en anglais.',
    navTitle: 'Navigation',
    servicesTitle: 'Services',
    connectTitle: 'Ailleurs',
    rights: 'Tous droits réservés.',
    madeIn: 'Conçu et codé au Québec.',
    privacy: 'Confidentialité',
  },

  breadcrumb: {
    home: 'Accueil',
  },

  concepts: {
    crumb: 'Concepts',
    seoTitle: 'Concepts d’interfaces | Patrick Laperrière',
    seoDesc: 'Des concepts d’interfaces fictifs, codés et animés, pour le barbier, le resto, le gym, l’immobilier, la clinique et le café. Un aperçu de mon travail de design.',
    kicker: 'Concepts',
    h1: 'Concepts d’interfaces',
    lead: 'Des maquettes codées pour des entreprises fictives, une industrie à la fois. Chaque écran est construit en HTML et en CSS, pas une image.',
    note: 'Ces concepts sont fictifs : aucun client, aucun produit réel. Ils montrent une direction de design, pas une réalisation livrée.',
    mobileTitle: 'Applications mobiles',
    mobileLead: 'Quatre concepts d’applications : réservation, fidélité, suivi et portfolio.',
    desktopTitle: 'Sites web',
    desktopLead: 'Quatre concepts de sites : restaurant, immobilier, clinique et boutique en ligne.',
    saasTitle: 'Logiciels',
    saasLead: 'Quatre concepts de tableaux de bord : analytique, gestion de clients, gestion de projet et facturation.',
    ctaTitle: 'Une idée en tête ?',
    ctaLead: 'Parlez-moi de votre industrie et de ce que vous imaginez.',
    live: 'Démo interactive',
    industryLabel: 'Industrie',
  },

  regions: {
    crumb: 'Création de site web',
    seoTitle: 'Création de site web au Québec | Patrick Laperrière',
    seoDesc: 'Création de sites web pour les entreprises de Montréal, Québec, Longueuil, Gatineau et Terrebonne : rapides, bilingues et pensés pour le référencement local.',
    kicker: 'Régions',
    h1: 'Création de site web partout au Québec',
    lead: 'Je conçois des sites rapides et bien référencés pour les entreprises du Grand Montréal, de la Rive-Sud, de l’Outaouais et de la Capitale-Nationale.',
    intro: 'Je travaille à distance avec des PME partout au Québec. Chaque page régionale explique ce qui compte pour être trouvé localement sur Google dans votre marché.',
    citiesTitle: 'Régions desservies',
    viewCity: 'Voir',
    servicesHeading: 'Comment je peux vous aider',
    allCities: 'Toutes les régions desservies',
    nearbyNote: 'Vous êtes ailleurs au Québec ? Je travaille à distance, partout dans la province.',
  },

  notFound: {
    seoTitle: 'Page introuvable | Patrick Laperrière',
    title: 'Cette page est introuvable',
    lead: 'Le lien est peut-être ancien, ou la page a changé d’adresse. Voici les pages les plus utiles.',
    back: 'Retour à l’accueil',
    other: 'English home',
  },
} as const;

export type Dict = typeof fr;
