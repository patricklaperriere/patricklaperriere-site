import { fr } from './fr';
import { en } from './en';
import type { Locale } from './routes';

export * from './routes';

const dicts = { fr, en };

/** Get the full copy dictionary for a locale. */
export function useTranslations(locale: Locale) {
  return dicts[locale];
}

/** Convenience alias used in pages/components. */
export const t = useTranslations;
