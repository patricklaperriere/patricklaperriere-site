// /llms.txt: a plain-text map of the site for AI assistants and agents
// (https://llmstxt.org). Generated at build time from the same data as the
// pages, so a new project or article shows up here without a hand edit.
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { useTranslations } from '../i18n';
import { routes, workBase } from '../i18n/routes';
import { sortedProjects } from '../data/projets';
import { postsFor, blogPostPath } from '../lib/blog';

export async function GET() {
  const abs = (p) => SITE.domain + (p === '/' ? '/' : p.replace(/\/$/, ''));
  const fr = useTranslations('fr');
  const en = useTranslations('en');
  const projects = (await sortedProjects()).filter((p) => !p.draft);
  const posts = await getCollection('blog');

  const services = (tr, locale) =>
    [
      [tr.services.web, routes.svcWeb[locale]],
      [tr.services.seo, routes.svcSeo[locale]],
      [tr.services.shopify, routes.svcShopify[locale]],
    ].map(([s, p]) => `- [${s.title}](${abs(p)}): ${s.blurb}`);

  const work = (locale) =>
    projects.map(
      (p) => `- [${p.title[locale]}](${abs(`${workBase[locale]}/${p.slug}`)}): ${p.tagline[locale]}`,
    );

  const blog = (locale) =>
    postsFor(posts, locale).map(
      (p) => `- [${p.data.title}](${abs(blogPostPath(locale, p.data.slug))}): ${p.data.description}`,
    );

  const body = [
    `# ${SITE.name}`,
    '',
    `> Développeur web bilingue (français et anglais) établi au Québec, fondateur de ${SITE.company.name}, l’entreprise derrière Habita (${SITE.company.url}), un logiciel SaaS d’inspection en bâtiment. Il conçoit des sites sur mesure, des boutiques Shopify et des logiciels pour des clients au Québec, au Canada et aux États-Unis.`,
    '',
    `Technologies : ${SITE.stack.join(', ')}.`,
    `Contact : ${SITE.email} · ${SITE.phoneDisplay} · ${abs(routes.contact.fr)}`,
    '',
    '## Réalisations',
    ...work('fr'),
    '',
    '## Services',
    ...services(fr, 'fr'),
    '',
    '## Pages clés',
    `- [À propos](${abs(routes.about.fr)})`,
    `- [Réalisations](${abs(routes.work.fr)})`,
    `- [Contact](${abs(routes.contact.fr)})`,
    '',
    '## Blogue',
    ...blog('fr'),
    '',
    '## English',
    '',
    `> Bilingual web developer based in Quebec, founder of ${SITE.company.name}, the company behind Habita, a building-inspection SaaS. Builds custom websites, Shopify stores and software for clients in Quebec, Canada and the United States.`,
    '',
    ...work('en'),
    ...services(en, 'en'),
    `- [About](${abs(routes.about.en)})`,
    `- [Contact](${abs(routes.contact.en)})`,
    ...blog('en'),
    '',
    '## Optional',
    `- [Sitemap](${SITE.domain}/sitemap-index.xml)`,
    `- [RSS (FR)](${SITE.domain}/rss.xml)`,
    `- [RSS (EN)](${SITE.domain}/en/rss.xml)`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
