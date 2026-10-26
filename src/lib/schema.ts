// JSON-LD schema builders. All return plain objects; the <SEO> component
// serializes whatever schema array a page passes in.

import { SITE } from '../config';
import type { Locale } from '../i18n/routes';
import { path } from '../i18n/routes';
import { useTranslations } from '../i18n';
import { PHOTO, hasPhoto } from './photo';

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

export const PERSON_ID = `${SITE.domain}/#person`;
export const WEBSITE_ID = `${SITE.domain}/#website`;
export const COMPANY_ID = `${SITE.domain}/#technologies-habita`;
export const HABITA_APP_ID = `${SITE.domain}/#habita`;

/** Areas served, typed: countries as Country, the rest as AdministrativeArea. */
function areaServed(locale: Locale) {
  const countries = new Set(['Canada', 'États-Unis', 'United States']);
  return SITE.areaServed[locale].map((name) => ({
    '@type': countries.has(name) ? 'Country' : 'AdministrativeArea',
    name,
  }));
}

/** Person — Patrick Laperrière. Emitted on every page by <SEO>. */
export function personSchema(locale: Locale) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    jobTitle: SITE.jobTitle[locale],
    url: SITE.domain,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    worksFor: { '@id': COMPANY_ID },
    knowsAbout: [...SITE.stack, 'SEO', 'Core Web Vitals', 'Schema.org'],
    // A real photo on the Person node is what lets Google attach a face to the
    // author entity (E-E-A-T). Omitted entirely rather than pointing at a file
    // that does not exist yet.
    ...(hasPhoto ? { image: abs(PHOTO.schema) } : {}),
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

/** WebSite node. One bilingual site, so one entity with both languages. */
export function webSiteSchema(_locale?: Locale) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.domain,
    name: SITE.name,
    inLanguage: ['fr-CA', 'en-CA'],
    publisher: { '@id': PERSON_ID },
  };
}

/** Technologies Habita inc. — the company behind Habita, founded by Patrick. */
export function companySchema() {
  return {
    '@type': 'Organization',
    '@id': COMPANY_ID,
    name: SITE.company.name,
    legalName: SITE.company.legalName,
    url: SITE.company.url,
    founder: { '@id': PERSON_ID },
    brand: { '@type': 'Brand', name: 'Habita' },
    ...(SITE.company.neq
      ? { identifier: { '@type': 'PropertyValue', propertyID: 'NEQ', value: SITE.company.neq } }
      : {}),
  };
}

/** Nodes every page carries, so each @id reference resolves on the page itself. */
export function siteNodes(locale: Locale) {
  return [personSchema(locale), webSiteSchema(locale), companySchema()];
}

/** ProfessionalService — for home + services pages. */
export function professionalServiceSchema(locale: Locale) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE.domain}/#service`,
    name: SITE.name,
    description: SITE.serviceDescription[locale],
    image: abs(SITE.ogImage),
    url: SITE.domain,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    founder: { '@id': PERSON_ID },
    // No aggregateRating / review here: Google ignores self-serving review
    // markup on a business's own pages and treats it as a spam signal. The
    // reviews stay visible on the page, which is where they earn trust.
    // No geo / priceRange either: this is a service-area business with no
    // storefront, and both values were approximations.
    knowsLanguage: ['fr-CA', 'en-CA'],
    areaServed: areaServed(locale),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
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
    areaServed: areaServed(opts.locale),
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

/** CreativeWork — one per case study. The work is the delivered site or product. */
export function creativeWorkSchema(opts: {
  name: string;
  description: string;
  /** The case-study page. */
  url: string;
  /** The live site or product the case study is about. */
  workUrl?: string;
  image?: string;
  locale: Locale;
  client?: string;
  year?: string;
  keywords?: string[];
  /** Set for Habita: the work is a product of Technologies Habita inc. */
  product?: boolean;
}) {
  const page = abs(opts.url);
  return {
    '@type': 'CreativeWork',
    '@id': `${page}#work`,
    name: opts.name,
    description: opts.description,
    url: page,
    mainEntityOfPage: { '@type': 'WebPage', '@id': page },
    ...(opts.workUrl ? { sameAs: opts.workUrl } : {}),
    ...(opts.image ? { image: abs(opts.image) } : {}),
    inLanguage: opts.locale === 'fr' ? 'fr-CA' : 'en-CA',
    ...(opts.year ? { dateCreated: opts.year } : {}),
    ...(opts.keywords?.length ? { keywords: opts.keywords.join(', ') } : {}),
    creator: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    ...(opts.product
      ? { about: { '@id': HABITA_APP_ID }, publisher: { '@id': COMPANY_ID } }
      : opts.client
        ? { sourceOrganization: { '@type': 'Organization', name: opts.client } }
        : {}),
  };
}

/** Habita as a software product, published by Technologies Habita inc. */
export function habitaAppSchema(opts: { url: string; description: string; locale: Locale }) {
  return {
    '@type': 'SoftwareApplication',
    '@id': HABITA_APP_ID,
    name: 'Habita',
    url: opts.url,
    description: opts.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: ['fr-CA', 'en-CA'],
    publisher: { '@id': COMPANY_ID },
    creator: { '@id': PERSON_ID },
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(opts.url) },
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
