// JSON-LD schema builders. All return plain objects; the <SEO> component
// serializes whatever schema array a page passes in.

import { SITE } from '../config';
import type { Locale } from '../i18n/routes';
import { path } from '../i18n/routes';
import { useTranslations } from '../i18n';
import { temoignages, reviewAggregate } from '../data/temoignages';

const abs = (p: string) => (p.startsWith('http') ? p : SITE.domain + p);

/** OfferCatalog of the three services, language-aware. */
function offerCatalog(locale: Locale) {
  const tr = useTranslations(locale);
  const services = [
    { svc: tr.services.web, key: 'svcWeb' as const },
    { svc: tr.services.seo, key: 'svcSeo' as const },
    { svc: tr.services.shopify, key: 'svcShopify' as const },
  ];
  return {
    '@type': 'OfferCatalog',
    name: tr.nav.services,
    itemListElement: services.map(({ svc, key }) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: svc.title,
        description: svc.blurb,
        url: abs(path(key, locale)),
      },
    })),
  };
}

/** Person — Patrick Laperrière. Used site-wide. */
export function personSchema(locale: Locale) {
  return {
    '@type': 'Person',
    '@id': `${SITE.domain}/#person`,
    name: SITE.name,
    jobTitle: SITE.jobTitle[locale],
    url: SITE.domain,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
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
    telephone: SITE.phone,
    priceRange: '$$',
    founder: { '@id': `${SITE.domain}/#person` },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewAggregate.ratingValue,
      reviewCount: reviewAggregate.reviewCount,
      bestRating: reviewAggregate.bestRating,
      worstRating: reviewAggregate.worstRating,
    },
    review: temoignages.map((t) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5, worstRating: 1 },
      author: { '@type': 'Person', name: t.author },
      reviewBody: t.text,
      inLanguage: t.lang === 'fr' ? 'fr-CA' : 'en-CA',
    })),
    knowsLanguage: ['fr-CA', 'en-CA'],
    areaServed: SITE.areaServed[locale].map((name) => ({ '@type': 'AdministrativeArea', name })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.6066,
      longitude: -73.7124,
    },
    hasOfferCatalog: offerCatalog(locale),
    sameAs: Object.values(SITE.socials),
  };
}

/** ItemList from an ordered list of { name, url }. */
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: abs(it.url),
    })),
  };
}

/** Blog node listing its posts (lightweight BlogPosting refs). */
export function blogListSchema(
  locale: Locale,
  posts: { title: string; description: string; url: string; datePublished: string }[],
) {
  return {
    '@type': 'Blog',
    '@id': `${SITE.domain}${locale === 'fr' ? '/blogue' : '/en/blog'}#blog`,
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
    publisher: { '@id': `${SITE.domain}/#person` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: abs(p.url),
      datePublished: p.datePublished,
      author: { '@id': `${SITE.domain}/#person` },
    })),
  };
}

/** Service node — for an individual service page. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  locale: Locale;
}) {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: abs(opts.url),
    provider: { '@id': `${SITE.domain}/#person` },
    areaServed: SITE.areaServed[opts.locale].map((name) => ({ '@type': 'AdministrativeArea', name })),
    availableLanguage: ['fr-CA', 'en-CA'],
  };
}

/** Geo-targeted Service node for a city landing page (local SEO). */
export function localServiceSchema(opts: {
  cityName: string;
  region: string;
  url: string;
  description: string;
  geo: { lat: number; lng: number };
  nearby: string[];
  locale: Locale;
}) {
  const tr = useTranslations(opts.locale);
  return {
    '@type': 'Service',
    name: `${tr.services.web.title} · ${opts.cityName}`,
    serviceType: tr.services.web.title,
    description: opts.description,
    url: abs(opts.url),
    provider: { '@id': `${SITE.domain}/#person` },
    availableLanguage: ['fr-CA', 'en-CA'],
    areaServed: [
      {
        '@type': 'City',
        name: opts.cityName,
        ...(opts.region ? { containedInPlace: { '@type': 'AdministrativeArea', name: opts.region } } : {}),
        geo: { '@type': 'GeoCoordinates', latitude: opts.geo.lat, longitude: opts.geo.lng },
      },
      ...opts.nearby.map((name) => ({ '@type': 'Place', name })),
    ],
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

/** BlogPosting — for a blog article. */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  locale: Locale;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: abs(opts.url),
    mainEntityOfPage: abs(opts.url),
    ...(opts.image ? { image: abs(opts.image) } : {}),
    inLanguage: opts.locale === 'fr' ? 'fr-CA' : 'en-CA',
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@id': `${SITE.domain}/#person` },
    publisher: { '@id': `${SITE.domain}/#person` },
  };
}

/** Wrap one or more schema nodes into a single @graph document. */
export function graph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
