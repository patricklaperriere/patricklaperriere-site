// JSON-LD schema builders. All return plain objects; the <SEO> component
// serializes whatever schema array a page passes in.

import { SITE } from '../config';
import type { Locale } from '../i18n/routes';

const abs = (p: string) => (p.startsWith('http') ? p : SITE.domain + p);

/** Person — Patrick Laperrière. Used site-wide. */
export function personSchema(locale: Locale) {
  return {
    '@type': 'Person',
    '@id': `${SITE.domain}/#person`,
    name: SITE.name,
    jobTitle: SITE.jobTitle[locale],
    url: SITE.domain,
    email: `mailto:${SITE.email}`,
    knowsLanguage: ['fr-CA', 'en-CA'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    sameAs: Object.values(SITE.socials),
  };
}

/** WebSite node, language-aware. */
export function webSiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.name,
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
    publisher: { '@id': `${SITE.domain}/#person` },
  };
}

/** ProfessionalService — for home + services pages. */
export function professionalServiceSchema(locale: Locale) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE.domain}/#service`,
    name: SITE.name,
    image: abs(SITE.ogImage),
    url: SITE.domain,
    email: `mailto:${SITE.email}`,
    priceRange: '$$',
    founder: { '@id': `${SITE.domain}/#person` },
    knowsLanguage: ['fr-CA', 'en-CA'],
    areaServed: SITE.areaServed[locale].map((name) => ({ '@type': 'AdministrativeArea', name })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    sameAs: Object.values(SITE.socials),
  };
}

/** BreadcrumbList from an ordered list of { name, url }. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

/** FAQPage from [{ q, a }]. */
export function faqSchema(faq: readonly { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** CreativeWork — for case studies. */
export function creativeWorkSchema(opts: {
  name: string;
  description: string;
  url: string;
  image?: string;
  locale: Locale;
  datePublished?: string;
}) {
  return {
    '@type': 'CreativeWork',
    name: opts.name,
    description: opts.description,
    url: abs(opts.url),
    ...(opts.image ? { image: abs(opts.image) } : {}),
    inLanguage: opts.locale === 'fr' ? 'fr-CA' : 'en-CA',
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    creator: { '@id': `${SITE.domain}/#person` },
  };
}

/** Wrap one or more schema nodes into a single @graph document. */
export function graph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
