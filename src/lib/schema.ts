// JSON-LD schema builders. All return plain objects; the <SEO> component
// serializes whatever schema array a page passes in.

import { SITE } from '../config';
import type { Locale } from '../i18n/routes';
import { path } from '../i18n/routes';
import { useTranslations } from '../i18n';
import { PHOTO, hasPhoto } from './photo';

const abs = (p: string) => (p.startsWith('http') ? p : SITE.domain + p);

/** OfferCatalog of the services, language-aware. */
function offerCatalog(locale: Locale) {
  const tr = useTranslations(locale);
  const services = [
    { svc: tr.services.web, key: 'svcWeb' as const },
    { svc: tr.services.seo, key: 'svcSeo' as const },
    { svc: tr.services.shopify, key: 'svcShopify' as const },
    { svc: tr.services.tools, key: 'svcTools' as const },
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
  // 'Québec' / 'Quebec' is the province here, hence AdministrativeArea.
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
    description: SITE.personDescription[locale],
    url: `${SITE.domain}/`,
    email: SITE.email,
    telephone: SITE.phone,
    knowsAbout: [...SITE.stack, 'SEO', 'Core Web Vitals', 'Schema.org'],
    // A real photo on the Person node is what lets Google attach a face to the
    // author entity (E-E-A-T). Omitted entirely rather than pointing at a file
    // that does not exist yet.
    ...(hasPhoto ? { image: abs(PHOTO.schema) } : {}),
    knowsLanguage: ['fr-CA', 'en-CA'],
    sameAs: Object.values(SITE.socials),
    // Habita's site is the company's, not a profile of Patrick: it belongs to
    // the Organization node (founder ↔ worksFor), not to sameAs.
    worksFor: { '@id': COMPANY_ID },
  };
}

/** WebSite node. One bilingual site, so one entity with both languages. */
export function webSiteSchema(_locale?: Locale) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.domain}/`,
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

export const SERVICE_ID = `${SITE.domain}/#service`;

/** ProfessionalService, in full on the home and contact pages only; every
 *  other page refers to it by @id. */
export function professionalServiceSchema(locale: Locale) {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: SITE.name,
    description: SITE.serviceDescription[locale],
    image: abs(SITE.ogImage),
    url: `${SITE.domain}/`,
    email: SITE.email,
    telephone: SITE.phone,
    founder: { '@id': PERSON_ID },
    provider: { '@id': PERSON_ID },
    // No aggregateRating / review here: Google ignores self-serving review
    // markup on a business's own pages and treats it as a spam signal. The
    // reviews stay visible on the page, which is where they earn trust.
    // No geo / priceRange either: this is a service-area business with no
    // storefront, and both values were approximations.
    knowsLanguage: ['fr-CA', 'en-CA'],
    areaServed: areaServed(locale),
    address: {
      '@type': 'PostalAddress',
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
    '@id': `${abs(opts.url)}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: abs(opts.url),
    provider: { '@id': PERSON_ID },
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
  geo?: { lat: number; lng: number };
  nearby: string[];
  locale: Locale;
}) {
  const tr = useTranslations(opts.locale);
  return {
    '@type': 'Service',
    '@id': `${abs(opts.url)}#service`,
    name: `${tr.services.web.title} · ${opts.cityName}`,
    serviceType: tr.services.web.title,
    description: opts.description,
    url: abs(opts.url),
    provider: { '@id': PERSON_ID },
    availableLanguage: ['fr-CA', 'en-CA'],
    areaServed: [
      {
        '@type': 'City',
        name: opts.cityName,
        ...(opts.region ? { containedInPlace: { '@type': 'AdministrativeArea', name: opts.region } } : {}),
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

// No FAQPage: Google retired FAQ rich results in May 2026. The questions
// stay visible on the pages, which is what readers and answer engines use.

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
    mainEntityOfPage: { '@id': `${page}#webpage` },
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
    '@id': `${abs(opts.url)}#article`,
    headline: opts.title,
    description: opts.description,
    url: abs(opts.url),
    mainEntityOfPage: { '@id': `${abs(opts.url)}#webpage` },
    ...(opts.image ? { image: abs(opts.image) } : {}),
    inLanguage: opts.locale === 'fr' ? 'fr-CA' : 'en-CA',
    datePublished: opts.datePublished,
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  };
}

/** The page itself: WebPage or a subtype (AboutPage, ContactPage,
 *  CollectionPage), added by <SEO> on every indexable page. */
export function webPageSchema(opts: { type: string; url: string; name: string; description: string; locale: Locale }) {
  const page = abs(opts.url);
  return {
    '@type': opts.type,
    '@id': `${page}#webpage`,
    url: page,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.locale === 'fr' ? 'fr-CA' : 'en-CA',
    isPartOf: { '@id': WEBSITE_ID },
    ...(opts.type === 'AboutPage' ? { mainEntity: { '@id': PERSON_ID } } : {}),
    ...(opts.type === 'ContactPage' ? { mainEntity: { '@id': SERVICE_ID } } : {}),
  };
}

/** Wrap one or more schema nodes into a single @graph document. */
export function graph(nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
