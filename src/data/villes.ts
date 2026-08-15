// Local SEO landing pages — one dataset per city, fully bilingual.
// Each city has genuinely distinct local content (market notes, served
// areas, city-specific FAQ) so these are real local pages, not thin
// doorway duplicates. FR copy follows Québécois usage and avoids tirets.

import type { Locale } from '../i18n/routes';

export interface VilleContent {
  metaTitle: string;
  metaDesc: string;
  h1: string;
  lead: string;
  intro: string;
  localTitle: string;
  local: string[];
  whyTitle: string;
  why: string[];
  servedLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  /** Optional local proof — links to an existing case study. */
  caseStudy?: { slug: string; label: string; blurb: string };
}

export interface Ville {
  slug: string;
  name: string;
  region: { fr: string; en: string };
  geo: { lat: number; lng: number };
  nearby: string[];
  order: number;
  fr: VilleContent;
  en: VilleContent;
}

export const villes: Ville[] = [
  {
    slug: 'laval',
    name: 'Laval',
    region: { fr: 'Laval, QC', en: 'Laval, QC' },
    geo: { lat: 45.6066, lng: -73.7124 },
    nearby: ['Chomedey', 'Sainte-Dorothée', 'Sainte-Rose', 'Vimont', 'Duvernay', 'Laval-des-Rapides', 'Fabreville'],
    order: 1,
    fr: {
      metaTitle: 'Création de site web à Laval | Patrick Laperrière',
      metaDesc: 'Développeur web à Laval. Sites rapides, bilingues et optimisés pour Google pour les PME lavalloises qui veulent générer des clients. Soumission gratuite.',
      h1: 'Création de site web à Laval',
      lead: 'Un développeur web établi à Laval, qui conçoit des sites rapides et bien référencés pour les entreprises de la région.',
      intro:
        'Je suis basé à Laval et je travaille avec des commerces, des professionnels et des PME d\'ici. Un site rapide et bien structuré, c\'est ce qui vous place devant vos concurrents quand un client de votre quartier cherche votre service sur Google.',
      localTitle: 'Le web pour les entreprises de Laval',
      local: [
        'Laval est l\'un des plus grands marchés du Québec, avec une économie portée par les services professionnels, la construction, la santé, le commerce de proximité et une foule de PME. La concurrence locale est réelle : un site lent ou daté vous fait perdre des appels au profit du commerce d\'à côté.',
        'Mon travail consiste à faire en sorte que votre entreprise ressorte dans les recherches « près de chez moi » et sur les requêtes propres à votre secteur. Référencement local, données structurées, fiche Google Business soignée et un site qui charge en un éclair sur mobile, là où se font la majorité des recherches à Laval.',
      ],
      whyTitle: 'Pourquoi un développeur de Laval',
      why: [
        'Je connais le marché local et je suis dans votre fuseau horaire, joignable rapidement.',
        'On peut se rencontrer ou faire un appel sans détour, en français comme en anglais.',
        'Chaque page est construite pour le référencement local dès le départ, pas ajouté après coup.',
      ],
      servedLabel: 'Je dessers aussi les secteurs de',
      faqTitle: 'Questions fréquentes · Laval',
      faq: [
        { q: 'Travaillez-vous avec des entreprises de Laval en personne ?', a: 'Oui. Étant établi à Laval, je peux vous rencontrer au besoin, mais l\'essentiel du travail se fait efficacement par appel et courriel pour vous faire gagner du temps.' },
        { q: 'Faites-vous du référencement local pour Laval ?', a: 'Absolument. J\'optimise votre fiche Google Business, j\'ajoute les données structurées locales et je structure vos pages pour que vous soyez trouvé par les clients de Laval et des environs.' },
        { q: 'Combien coûte un site web pour une PME de Laval ?', a: 'Ça dépend de vos objectifs et du nombre de pages. Après un court appel, je vous envoie une soumission gratuite et détaillée, sans surprise.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Laval, QC | Patrick Laperrière',
      metaDesc: 'Web developer based in Laval. Fast, bilingual, SEO-optimized websites built for Laval businesses that want to generate leads. Free quote.',
      h1: 'Web Design & Development in Laval',
      lead: 'A web developer based in Laval, building fast, well-ranked websites for local businesses.',
      intro:
        'I\'m based in Laval and work with local shops, professionals and small businesses. A fast, well-structured site is what puts you ahead of competitors when someone in your neighbourhood searches for your service on Google.',
      localTitle: 'The web for Laval businesses',
      local: [
        'Laval is one of Quebec\'s largest markets, driven by professional services, construction, healthcare, local retail and a large base of small businesses. Local competition is real: a slow or dated website loses calls to the shop next door.',
        'My job is to make your business stand out in "near me" searches and on the queries specific to your industry. Local SEO, structured data, a polished Google Business profile and a site that loads instantly on mobile, where most Laval searches happen.',
      ],
      whyTitle: 'Why a Laval-based developer',
      why: [
        'I know the local market and I\'m in your time zone, quick to reach.',
        'We can meet or hop on a straightforward call, in French or English.',
        'Every page is built for local SEO from the start, not bolted on afterward.',
      ],
      servedLabel: 'I also serve the areas of',
      faqTitle: 'Frequently asked questions — Laval',
      faq: [
        { q: 'Do you work with Laval businesses in person?', a: 'Yes. Being based in Laval, I can meet when needed, though most of the work happens efficiently over calls and email to save you time.' },
        { q: 'Do you do local SEO for Laval?', a: 'Absolutely. I optimize your Google Business profile, add local structured data and structure your pages so you get found by customers in Laval and nearby areas.' },
        { q: 'How much does a website cost for a Laval business?', a: 'It depends on your goals and number of pages. After a short call, I send a free, detailed quote with no surprises.' },
      ],
    },
  },
  {
    slug: 'montreal',
    name: 'Montréal',
    region: { fr: 'Grand Montréal', en: 'Greater Montreal' },
    geo: { lat: 45.5019, lng: -73.5674 },
    nearby: ['Plateau-Mont-Royal', 'Rosemont', 'Villeray', 'Ville-Marie', 'Verdun', 'Ahuntsic', 'Hochelaga', 'Griffintown'],
    order: 2,
    fr: {
      metaTitle: 'Création de site web à Montréal | Patrick Laperrière',
      metaDesc: 'Développeur web pour Montréal. Sites sur mesure, rapides et bilingues, optimisés pour Google. Pour commerces, restos et PME montréalaises. Soumission gratuite.',
      h1: 'Création de site web à Montréal',
      lead: 'Des sites sur mesure, rapides et bilingues pour les entreprises montréalaises qui veulent se démarquer.',
      intro:
        'Montréal est le marché le plus compétitif au Québec. Pour ressortir, votre site doit charger vite, parler aux deux langues et viser les bons mots-clés. C\'est exactement ce que je construis.',
      localTitle: 'Le web pour les entreprises de Montréal',
      local: [
        'De Griffintown au Plateau, en passant par Rosemont et Villeray, Montréal regorge de commerces, de restaurants, de boutiques et de startups qui se battent pour la même attention. Le bilinguisme y est essentiel : une part de votre clientèle cherche en français, l\'autre en anglais.',
        'Je construis des sites vraiment bilingues (FR/EN), avec un référencement propre dans les deux langues, pas une simple traduction de surface. Ajoutez à ça une vitesse de chargement quasi instantanée et un design soigné, et vous avez un site qui convertit les visiteurs montréalais en clients.',
      ],
      whyTitle: 'Pourquoi me confier votre site à Montréal',
      why: [
        'Sites authentiquement bilingues, optimisés séparément en FR et en EN avec hreflang propre.',
        'Performance maximale : un visiteur montréalais pressé ne tolère pas un site lent.',
        'À distance ou en personne, je m\'adapte à votre rythme et à votre marché.',
      ],
      servedLabel: 'Je dessers aussi les quartiers de',
      faqTitle: 'Questions fréquentes · Montréal',
      faq: [
        { q: 'Mon site doit-il être bilingue à Montréal ?', a: 'Dans la plupart des cas, oui. Une partie importante du marché montréalais cherche en anglais. Un vrai site FR/EN, optimisé dans les deux langues, élargit nettement votre portée.' },
        { q: 'Travaillez-vous avec des restos et commerces de Montréal ?', a: 'Oui : commerces de détail, restaurants, services professionnels, boutiques en ligne. Je construis le site selon votre secteur et votre clientèle.' },
        { q: 'Êtes-vous à Montréal ?', a: 'Je suis dans le Grand Montréal, donc tout près. Je travaille avec des clients montréalais à distance comme en personne.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Montreal | Patrick Laperrière',
      metaDesc: 'Web developer for Montreal. Custom, fast, bilingual websites optimized for Google. For shops, restaurants and small businesses. Free quote.',
      h1: 'Web Design & Development in Montreal',
      lead: 'Custom, fast, bilingual websites for Montreal businesses that want to stand out.',
      intro:
        'Montreal is Quebec\'s most competitive market. To stand out, your site has to load fast, speak both languages and target the right keywords. That\'s exactly what I build.',
      localTitle: 'The web for Montreal businesses',
      local: [
        'From Griffintown to the Plateau, through Rosemont and Villeray, Montreal is packed with shops, restaurants, boutiques and startups fighting for the same attention. Bilingualism is essential here: part of your audience searches in French, the other in English.',
        'I build genuinely bilingual sites (FR/EN), with clean SEO in both languages, not a surface-level translation. Add near-instant load times and a polished design, and you have a site that turns Montreal visitors into customers.',
      ],
      whyTitle: 'Why trust me with your Montreal site',
      why: [
        'Truly bilingual sites, optimized separately in FR and EN with clean hreflang.',
        'Top performance: a busy Montreal visitor won\'t tolerate a slow site.',
        'Remote or in person, I adapt to your pace and your market.',
      ],
      servedLabel: 'I also serve the neighbourhoods of',
      faqTitle: 'Frequently asked questions — Montreal',
      faq: [
        { q: 'Does my Montreal site need to be bilingual?', a: 'In most cases, yes. A large share of the Montreal market searches in English. A real FR/EN site, optimized in both languages, meaningfully widens your reach.' },
        { q: 'Do you work with Montreal restaurants and shops?', a: 'Yes: retail, restaurants, professional services, online stores. I build the site around your industry and your audience.' },
        { q: 'Are you in Montreal?', a: 'I\'m in the Greater Montreal area, so very close by. I work with Montreal clients both remotely and in person.' },
      ],
    },
  },
  {
    slug: 'longueuil',
    name: 'Longueuil',
    region: { fr: 'Rive-Sud de Montréal', en: 'Montreal South Shore' },
    geo: { lat: 45.5312, lng: -73.5185 },
    nearby: ['Brossard', 'Saint-Lambert', 'Boucherville', 'Saint-Hubert', 'Greenfield Park', 'Saint-Bruno'],
    order: 3,
    fr: {
      metaTitle: 'Création de site web à Longueuil | Patrick Laperrière',
      metaDesc: 'Développeur web pour Longueuil et la Rive-Sud. Sites rapides, bilingues et optimisés SEO pour les PME de Brossard, Saint-Lambert, Boucherville et environs.',
      h1: 'Création de site web à Longueuil',
      lead: 'Des sites rapides et bien référencés pour les entreprises de Longueuil et de la Rive-Sud.',
      intro:
        'Longueuil et l\'agglomération de la Rive-Sud forment un bassin de PME dynamique. Un site moderne et rapide vous aide à capter les clients de Brossard, Saint-Lambert ou Boucherville avant vos concurrents.',
      localTitle: 'Le web pour les entreprises de la Rive-Sud',
      local: [
        'L\'agglomération de Longueuil regroupe une clientèle résidentielle et commerciale importante, répartie entre Brossard, Saint-Lambert, Boucherville, Saint-Hubert et Greenfield Park. Beaucoup de commerces de services y misent encore sur le bouche-à-oreille, alors qu\'une bonne présence en ligne fait toute la différence.',
        'J\'optimise votre site pour les recherches locales propres à la Rive-Sud, avec un référencement géolocalisé et une fiche Google Business soignée. Résultat : quand un résident cherche votre service, c\'est vous qui apparaissez.',
      ],
      whyTitle: 'Pourquoi travailler avec moi sur la Rive-Sud',
      why: [
        'Référencement local ciblé sur Longueuil et les villes voisines.',
        'Sites bilingues FR/EN, utiles pour une clientèle variée de la Rive-Sud.',
        'Établi tout près, je suis joignable rapidement et dans votre fuseau.',
      ],
      servedLabel: 'Je dessers aussi',
      faqTitle: 'Questions fréquentes · Longueuil',
      faq: [
        { q: 'Couvrez-vous toute la Rive-Sud ?', a: 'Oui : Longueuil, Brossard, Saint-Lambert, Boucherville, Saint-Hubert et les environs. J\'optimise le référencement pour la ville qui compte le plus pour votre clientèle.' },
        { q: 'Faites-vous du SEO local pour Longueuil ?', a: 'Oui. J\'optimise votre fiche Google Business et j\'ajoute des données structurées locales pour que vous soyez trouvé par les clients de la Rive-Sud.' },
        { q: 'Peut-on se rencontrer ?', a: 'Je suis tout près, dans la région. On peut se rencontrer au besoin, mais l\'essentiel se fait efficacement par appel et courriel.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Longueuil | Patrick Laperrière',
      metaDesc: 'Web developer for Longueuil and the South Shore. Fast, bilingual, SEO-optimized websites for businesses in Brossard, Saint-Lambert, Boucherville and nearby.',
      h1: 'Web Design & Development in Longueuil',
      lead: 'Fast, well-ranked websites for businesses in Longueuil and the South Shore.',
      intro:
        'Longueuil and the South Shore agglomeration form a dynamic pool of small businesses. A modern, fast website helps you capture customers in Brossard, Saint-Lambert or Boucherville before your competitors.',
      localTitle: 'The web for South Shore businesses',
      local: [
        'The Longueuil agglomeration covers a large residential and commercial base, spread across Brossard, Saint-Lambert, Boucherville, Saint-Hubert and Greenfield Park. Many service businesses still rely on word of mouth, when a strong online presence makes all the difference.',
        'I optimize your site for the local searches specific to the South Shore, with geo-targeted SEO and a polished Google Business profile. The result: when a resident searches for your service, you\'re the one who shows up.',
      ],
      whyTitle: 'Why work with me on the South Shore',
      why: [
        'Local SEO targeted at Longueuil and neighbouring towns.',
        'Bilingual FR/EN sites, useful for the South Shore\'s varied audience.',
        'Based nearby, quick to reach and in your time zone.',
      ],
      servedLabel: 'I also serve',
      faqTitle: 'Frequently asked questions — Longueuil',
      faq: [
        { q: 'Do you cover the whole South Shore?', a: 'Yes: Longueuil, Brossard, Saint-Lambert, Boucherville, Saint-Hubert and nearby. I optimize SEO for the town that matters most to your audience.' },
        { q: 'Do you do local SEO for Longueuil?', a: 'Yes. I optimize your Google Business profile and add local structured data so you get found by South Shore customers.' },
        { q: 'Can we meet?', a: 'I\'m close by, in the region. We can meet when needed, though most of the work happens efficiently over calls and email.' },
      ],
    },
  },
  {
    slug: 'gatineau',
    name: 'Gatineau',
    region: { fr: 'Outaouais', en: 'Outaouais' },
    geo: { lat: 45.4765, lng: -75.7013 },
    nearby: ['Hull', 'Aylmer', 'Buckingham', 'Ottawa', 'Outaouais'],
    order: 4,
    fr: {
      metaTitle: 'Création de site web à Gatineau (Outaouais) | Patrick Laperrière',
      metaDesc: 'Développeur web pour Gatineau et l\'Outaouais. Sites bilingues FR/EN rapides et optimisés SEO, idéals pour le marché transfrontalier Gatineau-Ottawa.',
      h1: 'Création de site web à Gatineau',
      lead: 'Des sites bilingues rapides pour les entreprises de Gatineau et de l\'Outaouais, dans un marché où le FR et l\'EN comptent autant.',
      intro:
        'Gatineau est un marché unique : collée à Ottawa, votre clientèle cherche en français comme en anglais. Un vrai site bilingue, bien référencé dans les deux langues, vous ouvre les deux côtés de la rivière.',
      localTitle: 'Le web pour les entreprises de l\'Outaouais',
      local: [
        'Dans l\'Outaouais, le bilinguisme n\'est pas optionnel. Entre Gatineau, Hull, Aylmer et le voisinage immédiat d\'Ottawa, votre site doit performer en français et en anglais pour capter toute votre clientèle potentielle. Trop d\'entreprises locales se contentent d\'une seule langue et laissent des clients sur la table.',
        'Je construis des sites authentiquement bilingues, avec un contenu optimisé séparément en FR et en EN et un hreflang propre, pour que Google vous montre dans la bonne langue à la bonne personne. C\'est exactement le travail que j\'ai livré pour un inspecteur en bâtiment de la région.',
      ],
      whyTitle: 'Pourquoi un site bilingue pour l\'Outaouais',
      why: [
        'Référencement séparé et propre en français et en anglais, pas une traduction automatique.',
        'Pensé pour le marché transfrontalier Gatineau-Ottawa.',
        'Vitesse et SEO local pour ressortir dans toute la région.',
      ],
      servedLabel: 'Je dessers aussi',
      faqTitle: 'Questions fréquentes · Gatineau',
      faq: [
        { q: 'Mon site doit-il viser aussi Ottawa ?', a: 'Souvent, oui. Beaucoup d\'entreprises de Gatineau servent une clientèle des deux côtés de la rivière. Un site bilingue bien référencé vous rend visible à Gatineau comme à Ottawa.' },
        { q: 'Faites-vous des sites vraiment bilingues ?', a: 'Oui. Chaque langue a son contenu optimisé et son référencement propre, avec hreflang correct. Pas de bouton de traduction qui nuit au SEO.' },
        { q: 'Avez-vous déjà travaillé dans l\'Outaouais ?', a: 'Oui. J\'ai conçu un site Astro bilingue avec SEO local pour un inspecteur en bâtiment de l\'Outaouais. Voyez l\'étude de cas pour les détails.' },
      ],
      caseStudy: {
        slug: 'inspection-habitation-outaouais',
        label: 'Voir l\'étude de cas',
        blurb: 'Site Astro bilingue et SEO local pour un inspecteur en bâtiment de l\'Outaouais.',
      },
    },
    en: {
      metaTitle: 'Web Design in Gatineau (Outaouais) | Patrick Laperrière',
      metaDesc: 'Web developer for Gatineau and the Outaouais. Fast bilingual FR/EN websites optimized for SEO, ideal for the Gatineau-Ottawa cross-river market.',
      h1: 'Web Design & Development in Gatineau',
      lead: 'Fast bilingual websites for businesses in Gatineau and the Outaouais, where FR and EN matter equally.',
      intro:
        'Gatineau is a unique market: right next to Ottawa, your customers search in both French and English. A real bilingual site, ranked well in both languages, opens up both sides of the river.',
      localTitle: 'The web for Outaouais businesses',
      local: [
        'In the Outaouais, bilingualism isn\'t optional. Between Gatineau, Hull, Aylmer and neighbouring Ottawa, your site has to perform in French and English to reach your full audience. Too many local businesses settle for one language and leave customers on the table.',
        'I build genuinely bilingual sites, with content optimized separately in FR and EN and clean hreflang, so Google shows you in the right language to the right person. That\'s exactly the work I delivered for a building inspector in the region.',
      ],
      whyTitle: 'Why a bilingual site for the Outaouais',
      why: [
        'Clean, separate SEO in French and English, not machine translation.',
        'Built for the cross-river Gatineau-Ottawa market.',
        'Speed and local SEO to stand out across the whole region.',
      ],
      servedLabel: 'I also serve',
      faqTitle: 'Frequently asked questions — Gatineau',
      faq: [
        { q: 'Should my site target Ottawa too?', a: 'Often, yes. Many Gatineau businesses serve customers on both sides of the river. A well-ranked bilingual site makes you visible in Gatineau and Ottawa alike.' },
        { q: 'Do you build genuinely bilingual sites?', a: 'Yes. Each language has its own optimized content and clean SEO, with correct hreflang. No translation button that hurts your ranking.' },
        { q: 'Have you worked in the Outaouais before?', a: 'Yes. I built a bilingual Astro site with local SEO for an Outaouais building inspector. See the case study for details.' },
      ],
      caseStudy: {
        slug: 'inspection-habitation-outaouais',
        label: 'View the case study',
        blurb: 'Bilingual Astro site with local SEO for an Outaouais building inspector.',
      },
    },
  },
  {
    slug: 'quebec',
    name: 'Québec',
    region: { fr: 'Ville de Québec', en: 'Quebec City' },
    geo: { lat: 46.8139, lng: -71.208 },
    nearby: ['Sainte-Foy', 'Limoilou', 'Charlesbourg', 'Beauport', 'Lévis', 'Sillery'],
    order: 5,
    fr: {
      metaTitle: 'Création de site web à Québec | Patrick Laperrière',
      metaDesc: 'Développeur web pour la ville de Québec. Sites rapides, soignés et optimisés pour Google, conçus pour les PME et commerces de la Capitale-Nationale.',
      h1: 'Création de site web à Québec',
      lead: 'Des sites rapides et soignés pour les entreprises de la ville de Québec et de la Capitale-Nationale.',
      intro:
        'La ville de Québec a une identité forte et une clientèle fidèle au local. Un site rapide, élégant et bien référencé vous aide à transformer cette fierté régionale en clients qui vous trouvent et vous choisissent.',
      localTitle: 'Le web pour les entreprises de Québec',
      local: [
        'De Sainte-Foy à Limoilou, en passant par Charlesbourg et Beauport, la région de Québec mêle tourisme, services, commerces de quartier et secteur public. La clientèle y cherche d\'abord en français et valorise le sérieux et la proximité, deux choses que votre site doit refléter dès la première seconde.',
        'Je construis des sites au français impeccable, rapides et optimisés pour le référencement local de la Capitale-Nationale. Que vous visiez les résidents, les touristes ou les deux, votre site est structuré pour ressortir sur les bonnes recherches.',
      ],
      whyTitle: 'Pourquoi me confier votre site à Québec',
      why: [
        'Contenu en français soigné, fidèle au ton de votre entreprise.',
        'Référencement local pour la ville de Québec et ses quartiers.',
        'Travail à distance fluide, partout dans la Capitale-Nationale.',
      ],
      servedLabel: 'Je dessers aussi',
      faqTitle: 'Questions fréquentes · Québec',
      faq: [
        { q: 'Travaillez-vous à distance avec des clients de Québec ?', a: 'Oui, sans problème. Je collabore par appel et courriel avec des clients de la ville de Québec et de toute la province, avec un suivi clair du début à la fin.' },
        { q: 'Mon site sera-t-il en français de qualité ?', a: 'Oui. Le français impeccable est la base. Je peux aussi ajouter une version anglaise optimisée si votre clientèle le justifie.' },
        { q: 'Faites-vous du référencement local pour Québec ?', a: 'Oui. J\'optimise votre fiche Google Business et vos pages pour les recherches locales de la Capitale-Nationale.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Quebec City | Patrick Laperrière',
      metaDesc: 'Web developer for Quebec City. Fast, polished, Google-optimized websites built for businesses across the Capitale-Nationale region.',
      h1: 'Web Design & Development in Quebec City',
      lead: 'Fast, polished websites for businesses in Quebec City and the Capitale-Nationale region.',
      intro:
        'Quebec City has a strong identity and a customer base loyal to local businesses. A fast, elegant, well-ranked website helps turn that regional pride into customers who find you and choose you.',
      localTitle: 'The web for Quebec City businesses',
      local: [
        'From Sainte-Foy to Limoilou, through Charlesbourg and Beauport, the Quebec City region blends tourism, services, neighbourhood shops and the public sector. Customers search first in French and value seriousness and proximity, two things your site has to convey from the first second.',
        'I build sites with flawless French, fast and optimized for Capitale-Nationale local SEO. Whether you target residents, tourists or both, your site is structured to surface on the right searches.',
      ],
      whyTitle: 'Why trust me with your Quebec City site',
      why: [
        'Polished French content, true to your business\'s tone.',
        'Local SEO for Quebec City and its neighbourhoods.',
        'Smooth remote work across the Capitale-Nationale.',
      ],
      servedLabel: 'I also serve',
      faqTitle: 'Frequently asked questions — Quebec City',
      faq: [
        { q: 'Do you work remotely with Quebec City clients?', a: 'Yes, easily. I collaborate over calls and email with clients in Quebec City and across the province, with clear follow-up from start to finish.' },
        { q: 'Will my site have quality French?', a: 'Yes. Flawless French is the baseline. I can also add an optimized English version if your audience warrants it.' },
        { q: 'Do you do local SEO for Quebec City?', a: 'Yes. I optimize your Google Business profile and pages for Capitale-Nationale local searches.' },
      ],
    },
  },
  {
    slug: 'terrebonne',
    name: 'Terrebonne',
    region: { fr: 'Couronne Nord', en: 'North Shore' },
    geo: { lat: 45.7056, lng: -73.648 },
    nearby: ['Mascouche', 'Repentigny', 'Lachenaie', 'La Plaine', 'Bois-des-Filion', 'Lanaudière'],
    order: 6,
    fr: {
      metaTitle: 'Création de site web à Terrebonne | Patrick Laperrière',
      metaDesc: 'Développeur web pour Terrebonne et la Couronne Nord. Sites rapides et optimisés SEO pour les PME de Mascouche, Repentigny et Lanaudière. Soumission gratuite.',
      h1: 'Création de site web à Terrebonne',
      lead: 'Des sites rapides et bien référencés pour les entreprises de Terrebonne et de la Couronne Nord.',
      intro:
        'Terrebonne et la Couronne Nord sont en pleine croissance, avec une population et un tissu de PME qui ne cessent de s\'étendre. Un site moderne et rapide vous aide à capter cette clientèle locale avant qu\'elle aille voir ailleurs.',
      localTitle: 'Le web pour les entreprises de la Couronne Nord',
      local: [
        'Entre Terrebonne, Mascouche, Repentigny et le secteur de Lanaudière, la demande locale grandit vite. Beaucoup d\'entreprises de services, de construction et de commerce de proximité y ont une présence en ligne dépassée ou inexistante, ce qui laisse un vrai espace pour celles qui soignent leur site.',
        'J\'optimise votre site pour les recherches locales de la Couronne Nord, avec un référencement géolocalisé et une fiche Google Business bien tenue. Étant établi juste à côté, je connais bien ce marché en expansion.',
      ],
      whyTitle: 'Pourquoi travailler avec moi sur la Couronne Nord',
      why: [
        'Établi tout près de Terrebonne et de la Couronne Nord.',
        'Référencement local ciblé sur Terrebonne, Mascouche et Repentigny.',
        'Sites rapides et soignés, prêts à grandir avec votre entreprise.',
      ],
      servedLabel: 'Je dessers aussi',
      faqTitle: 'Questions fréquentes · Terrebonne',
      faq: [
        { q: 'Couvrez-vous Mascouche et Repentigny ?', a: 'Oui. Je dessers toute la Couronne Nord : Terrebonne, Mascouche, Repentigny, Lachenaie et les environs, avec un référencement adapté à votre clientèle.' },
        { q: 'Êtes-vous proche de Terrebonne ?', a: 'Je suis à quelques minutes seulement. On peut se rencontrer au besoin, mais l\'essentiel se fait efficacement à distance.' },
        { q: 'Faites-vous du SEO local pour Terrebonne ?', a: 'Oui. J\'optimise votre fiche Google Business et vos pages pour que les clients de la Couronne Nord vous trouvent en premier.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Terrebonne | Patrick Laperrière',
      metaDesc: 'Web developer for Terrebonne and the North Shore. Fast, SEO-optimized websites for businesses in Mascouche, Repentigny and Lanaudière. Free quote.',
      h1: 'Web Design & Development in Terrebonne',
      lead: 'Fast, well-ranked websites for businesses in Terrebonne and the North Shore.',
      intro:
        'Terrebonne and the North Shore are growing fast, with an expanding population and a widening base of small businesses. A modern, fast website helps you capture local customers before they look elsewhere.',
      localTitle: 'The web for North Shore businesses',
      local: [
        'Between Terrebonne, Mascouche, Repentigny and the Lanaudière area, local demand is rising quickly. Many service, construction and local retail businesses have an outdated or non-existent online presence, leaving real room for those who invest in their site.',
        'I optimize your site for North Shore local searches, with geo-targeted SEO and a well-maintained Google Business profile. Based right next door, I know this growing market well.',
      ],
      whyTitle: 'Why work with me on the North Shore',
      why: [
        'Based right next to Terrebonne and the North Shore.',
        'Local SEO targeted at Terrebonne, Mascouche and Repentigny.',
        'Fast, polished sites, ready to grow with your business.',
      ],
      servedLabel: 'I also serve',
      faqTitle: 'Frequently asked questions — Terrebonne',
      faq: [
        { q: 'Do you cover Mascouche and Repentigny?', a: 'Yes. I serve the whole North Shore: Terrebonne, Mascouche, Repentigny, Lachenaie and nearby, with SEO tailored to your audience.' },
        { q: 'Are you close to Terrebonne?', a: 'I\'m just minutes away. We can meet when needed, though most of the work happens efficiently remotely.' },
        { q: 'Do you do local SEO for Terrebonne?', a: 'Yes. I optimize your Google Business profile and pages so North Shore customers find you first.' },
      ],
    },
  },
];

/** All city slugs, ordered. */
export const villeSlugs = villes.map((v) => v.slug);

/** Look up a city by slug. */
export function villeBySlug(slug: string): Ville | undefined {
  return villes.find((v) => v.slug === slug);
}

/** Localized content block for a city. */
export function villeContent(v: Ville, locale: Locale): VilleContent {
  return v[locale];
}

/** Local-page path for a city slug, per locale. */
export function villePath(locale: Locale, slug: string): string {
  return locale === 'en' ? `/en/web-design/${slug}` : `/creation-site-web/${slug}`;
}

/** Hub path (city index) per locale. */
export function villesHubPath(locale: Locale): string {
  return locale === 'en' ? '/en/web-design' : '/creation-site-web';
}

/** hreflang alternates for a city page. */
export function villeAlternates(slug: string): { fr: string; en: string } {
  return { fr: villePath('fr', slug), en: villePath('en', slug) };
}
