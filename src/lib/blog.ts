import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/routes';
import { routes } from '../i18n/routes';

export type Post = CollectionEntry<'blog'>;

/** Path to a blog post in a given locale. */
export function blogPostPath(locale: Locale, slug: string): string {
  return locale === 'en' ? `/en/blog/${slug}` : `/blogue/${slug}`;
}

/** Published posts for a locale, newest first. */
export function postsFor(all: Post[], locale: Locale): Post[] {
  return all
    .filter((p) => p.data.lang === locale && !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * hreflang alternates for a post: pair FR ↔ EN by translationKey.
 * Falls back to the blog index in the other language if no pair exists.
 */
export function postAlternates(entry: Post, all: Post[]): { fr: string; en: string } {
  const other = entry.data.lang === 'fr' ? 'en' : 'fr';
  const pair = all.find(
    (p) => p.data.translationKey === entry.data.translationKey && p.data.lang === other,
  );
  const selfPath = blogPostPath(entry.data.lang, entry.data.slug);
  const otherPath = pair ? blogPostPath(other, pair.data.slug) : routes.blog[other];
  return entry.data.lang === 'fr'
    ? { fr: selfPath, en: otherPath }
    : { fr: otherPath, en: selfPath };
}
