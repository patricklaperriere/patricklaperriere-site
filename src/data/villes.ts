// Local SEO landing pages: one dataset per city, fully bilingual.
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
  /** Optional local proof: links to an existing case study. */
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
    slug: 'montreal',
    name: 'Montréal',
    region: { fr: 'Grand Montréal', en: 'Greater Montreal' },
    geo: { lat: 45.5019, lng: -73.5674 },
    nearby: ['Plateau-Mont-Royal', 'Rosemont', 'Villeray', 'Ville-Marie', 'Verdun', 'Ahuntsic', 'Hochelaga', 'Griffintown'],
    order: 2,
    fr: {
      metaTitle: 'Création de site web à Montréal | Patrick Laperrière',
      metaDesc: 'Développeur web pour Montréal. Sites sur mesure, rapides et bilingues, optimisés pour Google. Pour commerces, restaurants et PME de Montréal.',
      h1: 'Création de site web à Montréal',
      lead: 'Des sites sur mesure, rapides et bilingues pour les entreprises montréalaises qui veulent se démarquer.',
      intro:
        'À Montréal, beaucoup d’entreprises se disputent les mêmes recherches. Pour ressortir, votre site doit charger vite, parler aux deux langues et viser les bons mots-clés : c’est ce que je construis.',
      localTitle: 'Le web pour les entreprises de Montréal',
      local: [
        'De Griffintown au Plateau, en passant par Rosemont et Villeray, Montréal regorge de commerces, de restaurants, de boutiques et de jeunes entreprises qui se battent pour la même attention. Le bilinguisme y est essentiel : une part de votre clientèle cherche en français, l’autre en anglais.',
        'Je construis des sites vraiment bilingues (FR/EN), avec un référencement propre dans les deux langues, pas une simple traduction de surface. Ajoutez à ça des pages rapides et un design soigné, pour donner aux visiteurs montréalais une bonne raison de vous écrire.',
      ],
      whyTitle: 'Pourquoi me confier votre site à Montréal',
      why: [
        'Sites authentiquement bilingues, optimisés séparément en FR et en EN avec hreflang propre.',
        'Des pages rapides : un visiteur pressé quitte vite un site lent.',
        'À distance, par appel vidéo et par courriel, à votre rythme.',
      ],
      servedLabel: 'Je dessers aussi les quartiers de',
      faqTitle: 'Questions fréquentes · Montréal',
      faq: [
        { q: 'Mon site doit-il être bilingue à Montréal ?', a: 'Dans la plupart des cas, oui. Une partie importante du marché montréalais cherche en anglais. Un vrai site FR/EN, optimisé dans les deux langues, élargit nettement votre portée.' },
        { q: 'Travaillez-vous avec des restaurants et des commerces de Montréal ?', a: 'Oui : commerces de détail, restaurants, services professionnels, boutiques en ligne. Je construis le site selon votre secteur et votre clientèle.' },
        { q: 'Faut-il se rencontrer en personne ?', a: 'Ce n’est pas nécessaire. Je travaille à distance, par appel vidéo et par courriel, avec des clients de Montréal comme d’ailleurs au Québec.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Montreal | Patrick Laperrière',
      metaDesc: 'Web developer for Montreal. Custom, fast, bilingual websites optimized for Google. For shops, restaurants and small businesses. Free quote.',
      h1: 'Web design and development in Montreal',
      lead: 'Custom, fast, bilingual websites for Montreal businesses that want to stand out.',
      intro:
        'In Montreal, many businesses compete for the same searches. To stand out, your site has to load fast, speak both languages and target the right keywords: that’s what I build.',
      localTitle: 'The web for Montreal businesses',
      local: [
        'From Griffintown to the Plateau, through Rosemont and Villeray, Montreal is packed with shops, restaurants, boutiques and young companies fighting for the same attention. Bilingualism is essential here: part of your audience searches in French, the other in English.',
        'I build genuinely bilingual sites (FR/EN), with clean SEO in both languages, not a surface-level translation. Add fast pages and a polished design, to give Montreal visitors a good reason to get in touch.',
      ],
      whyTitle: 'Why trust me with your Montreal site',
      why: [
        'Truly bilingual sites, optimized separately in FR and EN with clean hreflang.',
        'Fast pages: a busy visitor quickly leaves a slow site.',
        'Remotely, over video calls and email, at your pace.',
      ],
      servedLabel: 'I also serve the neighbourhoods of',
      faqTitle: 'Frequently asked questions · Montreal',
      faq: [
        { q: 'Does my Montreal site need to be bilingual?', a: 'In most cases, yes. A large share of the Montreal market searches in English. A real FR/EN site, optimized in both languages, meaningfully widens your reach.' },
        { q: 'Do you work with Montreal restaurants and shops?', a: 'Yes: retail, restaurants, professional services, online stores. I build the site around your industry and your audience.' },
        { q: 'Do we need to meet in person?', a: 'No. I work remotely, over video calls and email, with clients in Montreal and across Quebec.' },
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
        'Longueuil et l’agglomération de la Rive-Sud forment un bassin de PME dynamique. Un site moderne et rapide aide les clients de Brossard, Saint-Lambert ou Boucherville à vous trouver.',
      localTitle: 'Le web pour les entreprises de la Rive-Sud',
      local: [
        'L’agglomération de Longueuil regroupe une clientèle résidentielle et commerciale importante, répartie entre Brossard, Saint-Lambert, Boucherville, Saint-Hubert et Greenfield Park. Beaucoup de commerces de services y misent encore sur le bouche-à-oreille, alors qu’une bonne présence en ligne aide à être trouvé.',
        'J’optimise votre site pour les recherches locales propres à la Rive-Sud, avec un référencement géolocalisé et un Profil d’entreprise Google soigné. L’objectif : que les résidents qui cherchent votre service vous trouvent facilement.',
      ],
      whyTitle: 'Pourquoi travailler avec moi sur la Rive-Sud',
      why: [
        'Référencement local ciblé sur Longueuil et les villes voisines.',
        'Sites bilingues FR/EN, utiles pour une clientèle variée de la Rive-Sud.',
        'Joignable par appel ou par courriel.',
      ],
      servedLabel: 'Je dessers aussi',
      faqTitle: 'Questions fréquentes · Longueuil',
      faq: [
        { q: 'Couvrez-vous toute la Rive-Sud ?', a: 'Oui : Longueuil, Brossard, Saint-Lambert, Boucherville, Saint-Hubert et les environs. J’optimise le référencement pour la ville qui compte le plus pour votre clientèle.' },
        { q: 'Faites-vous du SEO local pour Longueuil ?', a: 'Oui. J’optimise votre Profil d’entreprise Google et j’ajoute des données structurées locales pour que vous soyez trouvé par les clients de la Rive-Sud.' },
        { q: 'Peut-on se rencontrer ?', a: 'Le travail se fait surtout par appel vidéo et par courriel, ce qui suffit pour la plupart des projets.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Longueuil | Patrick Laperrière',
      metaDesc: 'Web developer for Longueuil and the South Shore. Fast, bilingual, SEO-optimized websites for businesses in Brossard, Saint-Lambert, Boucherville and nearby.',
      h1: 'Web design and development in Longueuil',
      lead: 'Fast, well-ranked websites for businesses in Longueuil and the South Shore.',
      intro:
        'Longueuil and the South Shore agglomeration form a dynamic pool of small businesses. A modern, fast website helps you capture customers in Brossard, Saint-Lambert or Boucherville before your competitors.',
      localTitle: 'The web for South Shore businesses',
      local: [
        'The Longueuil agglomeration covers a large residential and commercial base, spread across Brossard, Saint-Lambert, Boucherville, Saint-Hubert and Greenfield Park. Many service businesses still rely on word of mouth, when a strong online presence makes all the difference.',
        'I optimize your site for the local searches specific to the South Shore, with geo-targeted SEO and a polished Google Business Profile. The goal: residents who search for your service find you easily.',
      ],
      whyTitle: 'Why work with me on the South Shore',
      why: [
        'Local SEO targeted at Longueuil and neighbouring towns.',
        'Bilingual FR/EN sites, useful for the South Shore’s varied audience.',
        'Easy to reach by phone or email.',
      ],
      servedLabel: 'I also serve',
      faqTitle: 'Frequently asked questions · Longueuil',
      faq: [
        { q: 'Do you cover the whole South Shore?', a: 'Yes: Longueuil, Brossard, Saint-Lambert, Boucherville, Saint-Hubert and nearby. I optimize SEO for the town that matters most to your audience.' },
        { q: 'Do you do local SEO for Longueuil?', a: 'Yes. I optimize your Google Business Profile and add local structured data so you get found by South Shore customers.' },
        { q: 'Can we meet?', a: 'Most of the work happens over video calls and email, which is enough for most projects.' },
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
      metaTitle: 'Création de site web à Gatineau | Patrick Laperrière',
      metaDesc: 'Développeur web pour Gatineau et l’Outaouais. Sites bilingues FR/EN rapides et optimisés SEO, idéals pour le marché transfrontalier Gatineau-Ottawa.',
      h1: 'Création de site web à Gatineau',
      lead: 'Des sites bilingues rapides pour les entreprises de Gatineau et de l’Outaouais, dans un marché où le FR et l’EN comptent autant.',
      intro:
        'Gatineau est un marché unique : collée à Ottawa, votre clientèle cherche en français comme en anglais. Un vrai site bilingue, bien référencé dans les deux langues, vous ouvre les deux côtés de la rivière.',
      localTitle: 'Le web pour les entreprises de l’Outaouais',
      local: [
        'Dans l’Outaouais, le bilinguisme n’est pas optionnel. Entre Gatineau, Hull, Aylmer et le voisinage immédiat d’Ottawa, votre site doit bien fonctionner en français et en anglais pour capter toute votre clientèle potentielle. Un site offert dans une seule langue se prive d’une partie de cette clientèle.',
        'Je construis des sites authentiquement bilingues, avec un contenu optimisé séparément en FR et en EN et un hreflang propre, pour que Google vous montre dans la bonne langue à la bonne personne. C’est exactement le travail que j’ai livré pour un inspecteur en bâtiment de la région.',
      ],
      whyTitle: 'Pourquoi un site bilingue pour l’Outaouais',
      why: [
        'Référencement séparé et propre en français et en anglais, pas une traduction automatique.',
        'Pensé pour le marché transfrontalier Gatineau-Ottawa.',
        'Vitesse et SEO local pour ressortir dans toute la région.',
      ],
      servedLabel: 'Je dessers aussi',
      faqTitle: 'Questions fréquentes · Gatineau',
      faq: [
        { q: 'Mon site doit-il viser aussi Ottawa ?', a: 'Souvent, oui. Beaucoup d’entreprises de Gatineau servent une clientèle des deux côtés de la rivière. Un site bilingue bien référencé vous rend visible à Gatineau comme à Ottawa.' },
        { q: 'Faites-vous des sites vraiment bilingues ?', a: 'Oui. Chaque langue a son contenu optimisé et son référencement propre, avec hreflang correct. Pas de bouton de traduction qui nuit au SEO.' },
        { q: 'Avez-vous déjà travaillé dans l’Outaouais ?', a: 'Oui. J’ai conçu un site Astro bilingue avec SEO local pour un inspecteur en bâtiment de l’Outaouais. Voyez l’étude de cas pour les détails.' },
      ],
      caseStudy: {
        slug: 'inspection-habitation-outaouais',
        label: 'Voir l’étude de cas',
        blurb: 'Site Astro bilingue et SEO local pour un inspecteur en bâtiment de l’Outaouais.',
      },
    },
    en: {
      metaTitle: 'Web Design in Gatineau (Outaouais) | Patrick Laperrière',
      metaDesc: 'Web developer for Gatineau and the Outaouais. Fast bilingual FR/EN websites optimized for SEO, ideal for the Gatineau-Ottawa cross-river market.',
      h1: 'Web design and development in Gatineau',
      lead: 'Fast bilingual websites for businesses in Gatineau and the Outaouais, where FR and EN matter equally.',
      intro:
        'Gatineau is a unique market: right next to Ottawa, your customers search in both French and English. A real bilingual site, ranked well in both languages, opens up both sides of the river.',
      localTitle: 'The web for Outaouais businesses',
      local: [
        'In the Outaouais, bilingualism isn’t optional. Between Gatineau, Hull, Aylmer and neighbouring Ottawa, your site has to perform in French and English to reach your full audience. A site in only one language misses part of that audience.',
        'I build genuinely bilingual sites, with content optimized separately in FR and EN and clean hreflang, so Google shows you in the right language to the right person. That’s exactly the work I delivered for a building inspector in the region.',
      ],
      whyTitle: 'Why a bilingual site for the Outaouais',
      why: [
        'Clean, separate SEO in French and English, not machine translation.',
        'Built for the cross-river Gatineau-Ottawa market.',
        'Speed and local SEO to stand out across the whole region.',
      ],
      servedLabel: 'I also serve',
      faqTitle: 'Frequently asked questions · Gatineau',
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
        'De Sainte-Foy à Limoilou, en passant par Charlesbourg et Beauport, la région de Québec mêle tourisme, services, commerces de quartier et secteur public. La clientèle y cherche d’abord en français et valorise le sérieux et la proximité, deux choses que votre site doit refléter dès la première seconde.',
        'Je construis des sites rédigés dans un français soigné, rapides et optimisés pour le référencement local de la Capitale-Nationale. Que vous visiez les résidents, les touristes ou les deux, votre site est structuré pour ressortir sur les bonnes recherches.',
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
        { q: 'Mon site sera-t-il en français de qualité ?', a: 'Oui, c’est la base. Je peux aussi ajouter une version anglaise optimisée si votre clientèle le justifie.' },
        { q: 'Faites-vous du référencement local pour Québec ?', a: 'Oui. J’optimise votre Profil d’entreprise Google et vos pages pour les recherches locales de la Capitale-Nationale.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Quebec City | Patrick Laperrière',
      metaDesc: 'Web developer for Quebec City. Fast, polished, Google-optimized websites built for businesses across the Capitale-Nationale region.',
      h1: 'Web design and development in Quebec City',
      lead: 'Fast, polished websites for businesses in Quebec City and the Capitale-Nationale region.',
      intro:
        'Quebec City has a strong identity and a customer base loyal to local businesses. A fast, elegant, well-ranked website helps turn that regional pride into customers who find you and choose you.',
      localTitle: 'The web for Quebec City businesses',
      local: [
        'From Sainte-Foy to Limoilou, through Charlesbourg and Beauport, the Quebec City region blends tourism, services, neighbourhood shops and the public sector. Customers search first in French and value seriousness and proximity, two things your site has to convey from the first second.',
        'I build sites written in careful French, fast and optimized for Capitale-Nationale local SEO. Whether you target residents, tourists or both, your site is structured to surface on the right searches.',
      ],
      whyTitle: 'Why trust me with your Quebec City site',
      why: [
        'Polished French content, true to your business’s tone.',
        'Local SEO for Quebec City and its neighbourhoods.',
        'Smooth remote work across the Capitale-Nationale.',
      ],
      servedLabel: 'I also serve',
      faqTitle: 'Frequently asked questions · Quebec City',
      faq: [
        { q: 'Do you work remotely with Quebec City clients?', a: 'Yes, easily. I collaborate over calls and email with clients in Quebec City and across the province, with clear follow-up from start to finish.' },
        { q: 'Will my site have quality French?', a: 'Yes, that’s the baseline. I can also add an optimized English version if your audience warrants it.' },
        { q: 'Do you do local SEO for Quebec City?', a: 'Yes. I optimize your Google Business Profile and pages for Capitale-Nationale local searches.' },
      ],
    },
  },
  {
    slug: 'terrebonne',
    name: 'Terrebonne',
    region: { fr: 'Couronne Nord', en: 'Montreal’s North Shore' },
    geo: { lat: 45.7056, lng: -73.648 },
    nearby: ['Mascouche', 'Repentigny', 'Lachenaie', 'La Plaine', 'Bois-des-Filion', 'Lanaudière'],
    order: 6,
    fr: {
      metaTitle: 'Création de site web à Terrebonne | Patrick Laperrière',
      metaDesc: 'Développeur web pour Terrebonne et la Couronne Nord. Sites rapides et optimisés SEO pour les PME de Mascouche, Repentigny et Lanaudière. Soumission gratuite.',
      h1: 'Création de site web à Terrebonne',
      lead: 'Des sites rapides et bien référencés pour les entreprises de Terrebonne et de la Couronne Nord.',
      intro:
        'À Terrebonne et dans la Couronne Nord, les clients cherchent d’abord sur Google les entreprises de leur secteur. Un site rapide et clair vous aide à être de celles qu’ils trouvent.',
      localTitle: 'Le web pour les entreprises de la Couronne Nord',
      local: [
        'Entre Terrebonne, Mascouche, Repentigny et le secteur de Lanaudière, les entreprises de services, de construction et de commerce de proximité gagnent à soigner leur présence en ligne : c’est souvent là que le premier contact se fait.',
        'J’optimise votre site pour les recherches locales de la Couronne Nord, avec un référencement géolocalisé et un Profil d’entreprise Google bien tenu.',
      ],
      whyTitle: 'Pourquoi travailler avec moi sur la Couronne Nord',
      why: [
        'Joignable facilement, par appel ou par courriel.',
        'Référencement local ciblé sur Terrebonne, Mascouche et Repentigny.',
        'Sites rapides et soignés, prêts à grandir avec votre entreprise.',
      ],
      servedLabel: 'Je dessers aussi',
      faqTitle: 'Questions fréquentes · Terrebonne',
      faq: [
        { q: 'Couvrez-vous Mascouche et Repentigny ?', a: 'Oui. Je dessers toute la Couronne Nord : Terrebonne, Mascouche, Repentigny, Lachenaie et les environs, avec un référencement adapté à votre clientèle.' },
        { q: 'Travaillez-vous à distance ?', a: 'Oui. Le travail se fait par appel vidéo et par courriel, ce qui suffit pour la plupart des projets.' },
        { q: 'Faites-vous du SEO local pour Terrebonne ?', a: 'Oui. J’optimise votre Profil d’entreprise Google et vos pages pour que les clients de la Couronne Nord vous trouvent plus facilement.' },
      ],
    },
    en: {
      metaTitle: 'Web Design in Terrebonne | Patrick Laperrière',
      metaDesc: 'Web developer for Terrebonne and Montreal’s North Shore. Fast, SEO-optimized websites for businesses in Mascouche, Repentigny and Lanaudière. Free quote.',
      h1: 'Web design and development in Terrebonne',
      lead: 'Fast, well-ranked websites for businesses in Terrebonne and Montreal’s North Shore.',
      intro:
        'In Terrebonne and on Montreal’s North Shore, customers look up local businesses on Google first. A fast, clear website helps you be one of the ones they find.',
      localTitle: 'The web for North Shore businesses',
      local: [
        'Between Terrebonne, Mascouche, Repentigny and the Lanaudière area, service, construction and local retail businesses gain from a well-kept online presence: that is often where first contact happens.',
        'I optimize your site for North Shore local searches, with geo-targeted SEO and a well-maintained Google Business Profile.',
      ],
      whyTitle: 'Why work with me on the North Shore',
      why: [
        'Easy to reach, by phone or email.',
        'Local SEO targeted at Terrebonne, Mascouche and Repentigny.',
        'Fast, polished sites, ready to grow with your business.',
      ],
      servedLabel: 'I also serve',
      faqTitle: 'Frequently asked questions · Terrebonne',
      faq: [
        { q: 'Do you cover Mascouche and Repentigny?', a: 'Yes. I serve the whole North Shore: Terrebonne, Mascouche, Repentigny, Lachenaie and nearby, with SEO tailored to your audience.' },
        { q: 'Do you work remotely?', a: 'Yes. The work happens over video calls and email, which is enough for most projects.' },
        { q: 'Do you do local SEO for Terrebonne?', a: 'Yes. I optimize your Google Business Profile and pages so North Shore customers find you more easily.' },
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
