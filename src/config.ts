// Site-wide constants. Single place to change identity & contact info.

export const SITE = {
  domain: 'https://www.patricklaperriere.com',
  name: 'Patrick Laperrière',
  jobTitle: {
    fr: 'Développeur web',
    en: 'Web Developer',
  },
  email: 'patricklaperriere819@gmail.com',
  // Phone — E.164 for tel: links + schema; display for the UI.
  phone: '+18193283101',
  phoneDisplay: '819 328-3101',
  city: 'Laval',
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
    fr: ['Grand Montréal', 'Laval', 'Québec', 'Canada', 'États-Unis'],
    en: ['Greater Montreal', 'Laval', 'Quebec', 'Canada', 'United States'],
  },
  // Default Open Graph image (generated into /public/og/)
  ogImage: '/og/default.png',
  // ─── TODO_PHOTO ──────────────────────────────────────────────────────────
  // Personal portrait. Drop the source at `photo-src/patrick.jpg` (any size,
  // square or portrait) and run `npm run photo` — it writes every derivative
  // into /public/photo/. Then flip this to true.
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
