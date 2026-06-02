import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { useTranslations } from '../../i18n';
import { postsFor, blogPostPath } from '../../lib/blog';

export async function GET(context) {
  const tr = useTranslations('en');
  const all = await getCollection('blog');
  const posts = postsFor(all, 'en');
  return rss({
    title: `${tr.brand} · ${tr.blog.kicker}`,
    description: tr.blog.lead,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: blogPostPath('en', p.data.slug),
      categories: p.data.tags,
    })),
    customData: `<language>en-ca</language>`,
  });
}
