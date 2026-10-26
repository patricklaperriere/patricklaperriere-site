// Site-wide constants. Single place to change identity & contact info.

export const SITE = {
  domain: 'https://www.patricklaperriere.com',
  name: 'Patrick Laperrière',
  jobTitle: {
    fr: 'Développeur web',
    en: 'Web Developer',
  },
  // Public address everywhere (contact page, footer, JSON-LD). The About page
  // alone shows the personal one. Both need the domain's mail routing set up
  // before launch (see README).
  email: 'info@patricklaperriere.com',
  emailPersonal: 'pl@patricklaperriere.com',
  // Phone — E.164 for tel: links + schema; display for the UI.
  phone: '+18193283101',
  phoneDisplay: '819 328-3101',
  region: 'QC',
  regionName: 'Québec',
  country: 'CA',
  // Default social / authority links (used in JSON-LD sameAs + footer)
  socials: {
    instagram: 'https://www.instagram.com/pat.achell/',
    linkedin: 'https://www.linkedin.com/in/patrick-laperriere-145690181/',
    github: 'https://github.com/patricklaperriere',
  },
  // Areas served (broad: regional base + national + cross-border). Ordered
  // widest-relevant first: Schema.org ignores the order, but humans and LLMs
  // reading the JSON-LD take the first entry as the headline market.
  areaServed: {
    fr: ['Québec', 'Canada', 'États-Unis'],
    en: ['Quebec', 'Canada', 'United States'],
  },
  // The company behind Habita. Patrick is its founder; it appears in the
  // Organization JSON-LD on every page and in the about page copy.
  company: {
    name: 'Technologies Habita inc.',
    legalName: 'Technologies Habita inc.',
    url: 'https://habita.expert',
    // Québec enterprise number. Left null until Patrick supplies it: an
    // identifier is a factual claim, never a guess.
    neq: null as string | null,
  },
  // Technologies, for Person.knowsAbout and the stack list on the site. One
  // list, tools only (no "SEO" or "Performance": those are outcomes, not tools).
  stack: ['Astro', 'React', 'TypeScript', 'Next.js', 'Supabase', 'Shopify', 'Liquid', 'Tailwind CSS'],
  serviceDescription: {
    fr: 'Conception et développement de sites web sur mesure, de boutiques Shopify et de logiciels SaaS, en français et en anglais.',
    en: 'Design and development of custom websites, Shopify stores and SaaS software, in French and English.',
  },
  // Default Open Graph image (generated into /public/og/)
  ogImage: '/og/default.png',
  // Personal portrait. Sources in src/assets/photo/ (a 4:5 crop and a square
  // face crop, both stripped of metadata); <Picture> serves them on the page,
  // and `npm run photo` derives the favicons and the JSON-LD square into
  // /public/photo/. See src/lib/photo.ts.
  //
  // It gates ALL placements at once (about page, article byline, Person
  // schema, favicons), so nothing can ship a broken image reference.
  hasPhoto: true,
  // Google Search Console verification (carried over from previous site)
  gscVerification: 'UiVkelv495WDclhAQzL8v8Jv3RhTd4HcNOHdte8VxmU',
  // Contact form endpoint — Web3Forms (see README)
  web3formsKey: 'ed595b2a-4a5f-40f8-9d23-6feff0755812',
  // Optional lo-fi background track. Set to a royalty-free file in /public/audio
  // to show the floating player (off by default). null = no player.
  lofiTrack: null as string | null,
} as const;

export const SOCIAL_LIST = [
  { key: 'instagram', label: 'Instagram', url: SITE.socials.instagram },
  { key: 'linkedin', label: 'LinkedIn', url: SITE.socials.linkedin },
  { key: 'github', label: 'GitHub', url: SITE.socials.github },
] as const;
