// Site-wide constants. Single place to change identity & contact info.

export const SITE = {
  domain: 'https://patricklaperriere.com',
  name: 'Patrick Laperrière',
  jobTitle: {
    fr: 'Développeur web',
    en: 'Web Developer',
  },
  email: 'patricklaperriere819@gmail.com',
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
  // Areas served (broad: local base + national + cross-border)
  areaServed: {
    fr: ['Laval', 'Grand Montréal', 'Québec', 'Canada', 'États-Unis'],
    en: ['Laval', 'Greater Montreal', 'Quebec', 'Canada', 'United States'],
  },
  // Default Open Graph image (generated into /public/og/)
  ogImage: '/og/default.png',
  // Google Search Console verification (carried over from previous site)
  gscVerification: 'UiVkelv495WDclhAQzL8v8Jv3RhTd4HcNOHdte8VxmU',
  // Contact form endpoint — Web3Forms (see README)
  web3formsKey: 'ed595b2a-4a5f-40f8-9d23-6feff0755812',
} as const;

export const SOCIAL_LIST = [
  { key: 'instagram', label: 'Instagram', url: SITE.socials.instagram },
  { key: 'linkedin', label: 'LinkedIn', url: SITE.socials.linkedin },
  { key: 'github', label: 'GitHub', url: SITE.socials.github },
] as const;
