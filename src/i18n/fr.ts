// French (fr-CA) copy. Single source of truth for all FR text.
// EN mirrors this shape in en.ts.

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
    contact: 'Contact',
  },

  cta: {
    primary: 'Démarrer un projet',
    secondary: 'Voir mes réalisations',
    contactPrimary: 'Démarrons votre projet',
    viewProject: 'Voir le projet',
    readArticle: 'Lire l’article',
    visitSite: 'Visiter le site',
    allWork: 'Toutes les réalisations',
    backToWork: '← Retour aux réalisations',
    seeServices: 'Voir les services',
  },

  status: '● Disponible pour de nouveaux projets',

  hero: {
    kicker: 'Développeur web · Laval, QC · Bilingue',
    name: 'Patrick Laperrière',
    punch:
      'Je conçois des sites web rapides, élégants et optimisés pour Google, pour que votre entreprise soit trouvée partout.',
    sub: 'Basé à Laval, je travaille avec des clients au Québec, au Canada et aux États-Unis.',
  },

  marquee: {
    label: 'Outils & technologies',
    items: ['Astro', 'Shopify', 'SEO', 'Next.js', 'Liquid', 'Tailwind', 'React', 'Performance', 'JavaScript', 'Core Web Vitals'],
  },

  servicesSection: {
    kicker: 'Ce que je fais',
    title: 'Des sites pensés pour convertir',
    lead: 'Trois façons de transformer votre présence en ligne en machine à leads.',
  },

  services: {
    web: {
      key: 'svcWeb',
      icon: '◆',
      title: 'Création de site web',
      tagline: 'Sites sur mesure, rapides et modernes.',
      blurb: 'Des sites sur mesure, rapides et modernes, pensés pour convertir vos visiteurs en clients.',
      // Detail page
      seoTitle: 'Création de site web sur mesure | Patrick Laperrière',
      seoDesc: 'Conception et développement de sites web sur mesure, rapides et optimisés pour Google. Pour PME du Québec et clients à distance partout au Canada et aux États-Unis.',
      h1: 'Création de site web sur mesure',
      lead: 'Un site rapide, élégant et conçu pour transformer vos visiteurs en clients, pas juste une jolie carte de visite en ligne.',
      problemTitle: 'Le problème',
      problem: 'Beaucoup de sites sont lents, génériques et invisibles sur Google. Ils coûtent cher à entretenir et ne génèrent aucun client. Un template WordPress surchargé de plugins finit toujours par vous ralentir.',
      solutionTitle: 'Ma solution',
      solution: 'Je construis votre site sur mesure avec des technologies modernes (Astro, React, Shopify) : un code propre, des temps de chargement quasi instantanés et une structure pensée pour le référencement dès la première ligne.',
      includedTitle: 'Ce qui est inclus',
      included: [
        'Design sur mesure, dark ou clair, fidèle à votre marque',
        'Code performant, score Lighthouse visé à 100',
        'SEO technique intégré (métas, schema, sitemap, vitesse)',
        'Responsive impeccable sur mobile, tablette et bureau',
        'Bilingue FR/EN si nécessaire, avec hreflang propre',
        'Formulaire de contact et suivi des conversions',
      ],
      processTitle: 'Le déroulement',
      process: [
        { t: 'Découverte', d: 'On clarifie vos objectifs, votre marché et vos concurrents.' },
        { t: 'Design', d: 'Maquette et direction visuelle validées avant le code.' },
        { t: 'Développement', d: 'Construction sur mesure, rapide et optimisée.' },
        { t: 'Lancement', d: 'Mise en ligne, mesures SEO et suivi des performances.' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Combien de temps pour un site web ?', a: 'La plupart des sites vitrines sont livrés en 2 à 4 semaines selon le nombre de pages et le contenu. Je vous donne un échéancier clair dès le départ.' },
        { q: 'Combien coûte un site web sur mesure ?', a: 'Chaque projet est différent. Après un court appel, je vous envoie une soumission gratuite et détaillée, sans surprise.' },
        { q: 'Vais-je pouvoir modifier mon site moi-même ?', a: 'Oui. Je peux intégrer un système de gestion de contenu simple ou vous former pour les mises à jour courantes.' },
        { q: 'Travaillez-vous avec des clients hors Québec ?', a: 'Absolument. Je travaille à distance avec des clients partout au Canada et aux États-Unis, en français comme en anglais.' },
      ],
    },
    seo: {
      key: 'svcSeo',
      icon: '↗',
      title: 'Refonte + SEO',
      tagline: 'Transformer un site lent en machine à leads.',
      blurb: 'Transformer un site lent ou dépassé en machine à leads qui ranke sur Google.',
      seoTitle: 'Refonte de site web et optimisation SEO | Patrick Laperrière',
      seoDesc: 'Refonte de sites web lents ou dépassés et optimisation SEO. Plus de vitesse, plus de visibilité sur Google, plus de clients. Québec, Canada et États-Unis.',
      h1: 'Refonte de site web + optimisation SEO',
      lead: 'Votre site existe mais ne génère rien ? On le transforme en machine à leads qui ranke sur Google et qui charge en un éclair.',
      problemTitle: 'Le problème',
      problem: 'Un site lent, daté ou mal structuré fait fuir les visiteurs et reste invisible sur Google. Chaque seconde de chargement de trop, c’est des clients perdus.',
      solutionTitle: 'Ma solution',
      solution: 'J’audite votre site, je corrige les fondations techniques (vitesse, structure, balises), je modernise le design et j’optimise chaque page pour les bons mots-clés. Résultat : un site rapide qui remonte dans les résultats.',
      includedTitle: 'Ce qui est inclus',
      included: [
        'Audit technique et SEO complet de votre site actuel',
        'Optimisation de la vitesse et des Core Web Vitals',
        'Refonte visuelle moderne et responsive',
        'Optimisation du contenu et des balises pour Google',
        'Données structurées (schema) et SEO local',
        'Suivi des positions et recommandations',
      ],
      processTitle: 'Le déroulement',
      process: [
        { t: 'Audit', d: 'Analyse technique, SEO et concurrentielle de votre site.' },
        { t: 'Plan', d: 'Priorités claires : quoi corriger, dans quel ordre.' },
        { t: 'Refonte', d: 'Vitesse, design et contenu remis à niveau.' },
        { t: 'Suivi', d: 'Mesures, ajustements et croissance dans le temps.' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Le SEO, ça prend combien de temps ?', a: 'Les gains techniques (vitesse, structure) sont immédiats. Le référencement organique demande généralement 3 à 6 mois pour des résultats solides sur des mots-clés concurrentiels.' },
        { q: 'Dois-je tout refaire ou juste optimiser ?', a: 'Ça dépend de l’état de votre site. Après l’audit, je vous dis honnêtement si une optimisation suffit ou si une refonte sera plus rentable.' },
        { q: 'Garantissez-vous la première position sur Google ?', a: 'Personne de sérieux ne garantit la position #1. Je garantis par contre les meilleures pratiques techniques et une stratégie solide qui font une vraie différence.' },
        { q: 'Faites-vous du SEO local ?', a: 'Oui : fiche Google Business, données structurées locales et pages géolocalisées pour être trouvé dans votre région.' },
      ],
    },
    shopify: {
      key: 'svcShopify',
      icon: '⬡',
      title: 'Boutique e-commerce (Shopify)',
      tagline: 'Boutiques Shopify sur mesure en Liquid.',
      blurb: 'Boutiques Shopify sur mesure en Liquid, rapides et optimisées pour vendre.',
      seoTitle: 'Développeur Shopify · boutique e-commerce sur mesure | Patrick Laperrière',
      seoDesc: 'Création de boutiques Shopify sur mesure en Liquid : rapides, optimisées pour la conversion et le SEO. Thèmes personnalisés et intégrations. Canada et États-Unis.',
      h1: 'Boutique e-commerce sur mesure avec Shopify',
      lead: 'Une boutique Shopify rapide, sur mesure et optimisée pour vendre, pas un thème générique que tout le monde utilise.',
      problemTitle: 'Le problème',
      problem: 'Les thèmes Shopify prêts-à-l’emploi sont lents, rigides et se ressemblent tous. Difficile de se démarquer et de convertir quand votre boutique est une copie de mille autres.',
      solutionTitle: 'Ma solution',
      solution: 'Je développe votre thème Shopify sur mesure en Liquid : une expérience d’achat rapide, fidèle à votre marque et optimisée à chaque étape du tunnel de conversion, du produit jusqu’au paiement.',
      includedTitle: 'Ce qui est inclus',
      included: [
        'Thème Shopify sur mesure développé en Liquid',
        'Design de marque et fiches produits optimisées',
        'Tunnel de conversion et panier optimisés',
        'Performance et vitesse de chargement maximales',
        'SEO produit et collections',
        'Intégrations (paiement, livraison, apps) au besoin',
      ],
      processTitle: 'Le déroulement',
      process: [
        { t: 'Stratégie', d: 'Catalogue, marque et objectifs de vente.' },
        { t: 'Design', d: 'Maquettes des pages clés et de l’expérience d’achat.' },
        { t: 'Développement', d: 'Thème Liquid sur mesure, rapide et optimisé.' },
        { t: 'Lancement', d: 'Tests, mise en ligne et optimisation continue.' },
      ],
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Pourquoi un thème sur mesure plutôt qu’un thème payant ?', a: 'Un thème sur mesure est plus rapide, unique à votre marque et optimisé précisément pour vos produits et votre conversion, pas un compromis générique.' },
        { q: 'Pouvez-vous migrer ma boutique actuelle vers Shopify ?', a: 'Oui, je gère les migrations (produits, clients, redirections SEO) pour ne perdre ni vos données ni votre référencement.' },
        { q: 'Gérez-vous les intégrations et les apps ?', a: 'Oui : paiement, livraison, inventaire, marketing : j’intègre ce dont votre boutique a besoin, proprement.' },
        { q: 'Travaillez-vous en anglais pour le marché américain ?', a: 'Tout à fait. Je conçois des boutiques bilingues ou anglophones pour vendre au Canada comme aux États-Unis.' },
      ],
    },
  },

  workSection: {
    kicker: 'Réalisations',
    title: 'La preuve par les projets',
    lead: 'Des sites réels, construits sur mesure, qui chargent vite et qui convertissent.',
    featuredTitle: 'Projets vedettes',
    // Case study labels
    client: 'Client',
    challenge: 'Le défi',
    built: 'Ce que j’ai construit',
    stack: 'Technologies',
    result: 'Résultat',
    role: 'Rôle',
    year: 'Année',
  },

  reassurance: {
    title: 'Pourquoi travailler avec moi',
    items: [
      { icon: '⚡', t: 'Rapidité', d: 'Des sites qui chargent en un éclair. La vitesse, c’est du SEO et des ventes.' },
      { icon: '↗', t: 'SEO intégré', d: 'Chaque page est pensée pour être trouvée sur Google dès le lancement.' },
      { icon: '⇄', t: 'Bilingue', d: 'FR/EN natif et bien référencé dans les deux langues.' },
      { icon: '◇', t: 'Sur mesure', d: 'Pas de template générique. Un site unique, fidèle à votre marque.' },
    ],
  },

  homeFaq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Combien coûte un site web ?', a: 'Chaque projet est unique. Après un court appel pour comprendre vos besoins, je vous envoie une soumission gratuite et détaillée, sans surprise ni frais cachés.' },
      { q: 'Combien de temps pour livrer un site ?', a: 'La plupart des sites vitrines sont en ligne en 2 à 4 semaines, selon le nombre de pages et le contenu. Je vous donne un échéancier clair dès le départ.' },
      { q: 'Travaillez-vous avec des clients hors Québec ?', a: 'Oui. Je suis basé à Laval, mais je travaille à distance avec des clients partout au Canada et aux États-Unis, en français comme en anglais.' },
      { q: 'Faites-vous des sites bilingues ?', a: 'Absolument. Je conçois des sites vraiment bilingues (FR/EN), avec un contenu optimisé séparément dans chaque langue et un référencement propre dans les deux.' },
      { q: 'Le SEO est-il inclus ?', a: 'Oui. Chaque site est construit avec le référencement en tête dès la première ligne : vitesse, structure, données structurées et balises optimisées. Un beau site que personne ne trouve ne sert à rien.' },
    ],
  },

  finalCta: {
    kicker: 'On démarre ?',
    title: 'Prêt à être trouvé partout ?',
    lead: 'Parlez-moi de votre projet. Réponse rapide, soumission gratuite.',
  },

  about: {
    seoTitle: 'À propos · développeur web bilingue à Laval | Patrick Laperrière',
    seoDesc: 'Patrick Laperrière, développeur web bilingue basé à Laval. Je construis des sites rapides et bien référencés pour les PME du Québec et des clients à distance au Canada et aux États-Unis.',
    kicker: 'À propos',
    h1: 'Développeur web bilingue, basé à Laval',
    lead: 'Je construis des sites rapides et bien référencés pour les entreprises qui veulent être trouvées, au Québec, au Canada et aux États-Unis.',
    body: [
      'Je suis Patrick Laperrière, développeur web freelance basé à Laval, au Québec. Je conçois et développe des sites sur mesure pour les PME et les entrepreneurs qui en ont assez des sites lents, génériques et invisibles sur Google.',
      'Mon approche tient en quatre mots : performance, SEO, design soigné et communication claire. Je code proprement avec des technologies modernes (Astro, React, Shopify Liquid), je vise un score Lighthouse parfait, et je pense au référencement dès la première ligne, parce qu’un beau site que personne ne trouve ne sert à rien.',
      'Travaillant en français comme en anglais, je collabore aussi bien avec des clients locaux qu’avec des entreprises à distance partout au Canada et aux États-Unis. Mon objectif est simple : vous livrer un site dont vous êtes fier et qui travaille pour vous, 24 h sur 24.',
    ],
    whyTitle: 'Pourquoi me choisir',
    why: [
      { t: 'Performance d’abord', d: 'Code optimisé, chargement quasi instantané, Core Web Vitals au vert.' },
      { t: 'SEO de fond', d: 'Structure technique, données structurées et stratégie de mots-clés.' },
      { t: 'Vraiment bilingue', d: 'Contenu optimisé séparément en FR et EN, hreflang propre.' },
      { t: 'Communication claire', d: 'Pas de jargon, des échéances respectées, un seul interlocuteur.' },
    ],
  },

  contact: {
    seoTitle: 'Contact · démarrons votre projet | Patrick Laperrière',
    seoDesc: 'Parlons de votre projet de site web. Réponse rapide et soumission gratuite. Développeur web bilingue à Laval, au service du Québec, du Canada et des États-Unis.',
    kicker: 'Contact',
    h1: 'Démarrons votre projet',
    lead: 'Réponse rapide. Soumission gratuite. Parlez-moi de ce que vous avez en tête.',
    form: {
      name: 'Nom',
      namePlaceholder: 'Votre nom',
      email: 'Courriel',
      emailPlaceholder: 'vous@exemple.com',
      projectType: 'Type de projet',
      projectTypeOptions: ['Nouveau site web', 'Refonte + SEO', 'Boutique Shopify', 'Autre'],
      budget: 'Budget approximatif',
      budgetOptions: ['Moins de 2 000 $', '2 000 $ à 5 000 $', '5 000 $ à 10 000 $', 'Plus de 10 000 $', 'À déterminer'],
      message: 'Message',
      messagePlaceholder: 'Parlez-moi de votre projet…',
      submit: 'Envoyer le message',
      sending: 'Envoi…',
      successTitle: 'Message envoyé !',
      success: 'Merci. Je vous reviens très rapidement.',
      error: 'Oups, une erreur est survenue. Écrivez-moi directement par courriel.',
      orEmail: 'Ou écrivez-moi directement :',
    },
  },

  blog: {
    seoTitle: 'Blogue · web, SEO et performance | Patrick Laperrière',
    seoDesc: 'Articles sur le développement web, le SEO, la performance et le e-commerce. Conseils pratiques pour les entreprises qui veulent être trouvées en ligne.',
    kicker: 'Blogue',
    h1: 'Notes sur le web, le SEO et la performance',
    lead: 'Des articles concrets sur la création de sites, le référencement et la conversion.',
    soon: 'Les premiers articles arrivent bientôt.',
    byline: 'Par',
    authorRole: 'Développeur web bilingue, Laval',
    authorBio: 'Je conçois des sites web rapides, élégants et optimisés pour Google pour les entreprises du Québec, du Canada et des États-Unis.',
    aboutLink: 'En savoir plus sur moi',
    related: 'Articles connexes',
    readMore: 'Lire',
  },

  privacy: {
    seoTitle: 'Politique de confidentialité | Patrick Laperrière',
    seoDesc: 'Comment vos renseignements personnels sont recueillis, utilisés et protégés sur patricklaperriere.com. Conforme à la Loi 25 du Québec.',
    kicker: 'Confidentialité',
    h1: 'Politique de confidentialité',
    lead: 'Votre vie privée compte. Voici, en clair, quelles données je recueille, pourquoi, et comment elles sont protégées.',
    updated: 'Dernière mise à jour : juin 2026',
    sections: [
      {
        title: 'Les renseignements que je recueille',
        body: [
          'Je recueille uniquement les renseignements que vous me transmettez volontairement, principalement par le formulaire de contact : votre nom, votre adresse courriel, le type de projet, le budget approximatif et le contenu de votre message.',
          'Le site ne suit pas votre navigation et n’utilise pas de témoins publicitaires.',
        ],
      },
      {
        title: 'Comment j’utilise vos renseignements',
        body: [
          'Vos renseignements servent uniquement à répondre à votre demande, à préparer une soumission et à communiquer avec vous au sujet de votre projet. Je ne vends ni ne loue vos données à qui que ce soit.',
        ],
      },
      {
        title: 'Partage avec des tiers',
        body: [
          'Le formulaire de contact est traité par Web3Forms, un service qui me transmet vos messages par courriel. Le site est hébergé sur Cloudflare Pages. Ces fournisseurs traitent les données nécessaires à leur fonction, conformément à leurs propres politiques de confidentialité.',
        ],
      },
      {
        title: 'Conservation des données',
        body: [
          'Je conserve les courriels et les renseignements liés à votre demande aussi longtemps que nécessaire pour vous répondre et assurer le suivi du projet. Vous pouvez demander leur suppression en tout temps.',
        ],
      },
      {
        title: 'Vos droits',
        body: [
          'Conformément à la Loi 25 du Québec, vous avez le droit d’accéder à vos renseignements personnels, de les faire corriger ou supprimer. Écrivez-moi simplement et je donne suite à votre demande dans les meilleurs délais.',
        ],
      },
      {
        title: 'Témoins et stockage local',
        body: [
          'Le site utilise uniquement le stockage local de votre navigateur pour mémoriser de petites préférences d’affichage. Aucun témoin de pistage ni outil d’analyse tiers n’est utilisé.',
        ],
      },
      {
        title: 'Me joindre',
        body: [
          'Pour toute question sur cette politique ou sur vos renseignements, écrivez-moi à patricklaperriere819@gmail.com.',
        ],
      },
    ],
  },

  footer: {
    tagline: 'Développeur web bilingue à Laval. Sites rapides, élégants et optimisés pour Google.',
    navTitle: 'Navigation',
    servicesTitle: 'Services',
    connectTitle: 'Me joindre',
    rights: 'Tous droits réservés.',
    madeIn: 'Conçu et codé à Laval, QC.',
    privacy: 'Confidentialité',
  },

  signature: {
    label: 'Conçu par',
    name: 'Patrick Laperrière',
  },

  breadcrumb: {
    home: 'Accueil',
  },

  notFound: {
    title: 'Page introuvable',
    lead: 'Cette page n’existe pas ou a été déplacée.',
    back: 'Retour à l’accueil',
  },
} as const;

export type Dict = typeof fr;
