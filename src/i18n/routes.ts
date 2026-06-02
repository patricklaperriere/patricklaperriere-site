// Bilingual route registry. One key → its FR and EN paths.
// Drives the nav, hreflang alternates, and the language switcher
// (so switching language lands on the equivalent page, not the home).

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export type RouteKey =
  | 'home'
  | 'services'
  | 'svcWeb'
  | 'svcSeo'
  | 'svcShopify'
  | 'work'
  | 'about'
  | 'contact'
  | 'blog'
  | 'privacy';

export const routes: Record<RouteKey, Record<Locale, string>> = {
  home:       { fr: '/',                                en: '/en/' },
  services:   { fr: '/services',                        en: '/en/services' },
  svcWeb:     { fr: '/services/creation-site-web',      en: '/en/services/web-design-development' },
  svcSeo:     { fr: '/services/refonte-seo',            en: '/en/services/website-redesign-seo' },
  svcShopify: { fr: '/services/site-ecommerce-shopify', en: '/en/services/shopify-ecommerce' },
  work:       { fr: '/realisations',                    en: '/en/work' },
  about:      { fr: '/a-propos',                         en: '/en/about' },
  contact:    { fr: '/contact',                          en: '/en/contact' },
  blog:       { fr: '/blogue',                           en: '/en/blog' },
  privacy:    { fr: '/confidentialite',                  en: '/en/privacy' },
};

/** Case-study base paths (the [slug] is shared across languages). */
export const workBase: Record<Locale, string> = {
  fr: '/realisations',
  en: '/en/work',
};

/** Path for a route key in a given locale. */
export function path(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

/** The opposite locale. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr';
}

/** Detect the active locale from a URL pathname. */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}
