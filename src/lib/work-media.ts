// Captures for the work cards, by file name in src/assets/work/. Shared by
// DossierFrame.astro and the home page: a capture whose file is absent is
// left out of a build entirely (no empty frame, no empty grid), and shown as
// a dashed reminder in `astro dev` only.
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/work/*.{png,jpg,jpeg,webp,avif}', { eager: true });

export const capture = (file: string): ImageMetadata | undefined => images[`../assets/work/${file}`]?.default;

/** Whether a capture should take a place on the page. */
export const showCapture = (file: string) => Boolean(capture(file)) || import.meta.env.DEV;
