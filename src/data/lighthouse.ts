// Measured Lighthouse scores of the client sites shown in the case studies.
// NOTHING here is typed by hand: scripts/measure-clients.mjs runs Lighthouse
// on each live site (mobile profile, median of three valid runs) and writes
// src/data/client-metrics.json. The case study shows the date, the URL and
// the method next to the numbers, so a reader can re-run the test.
//
// A site absent from the file renders no scores: an unmeasured site never
// looks like a bad one, and an old number is never shown without its date.
// (The previous desktop scores of August 2026 were retired in October 2026.)
import data from './client-metrics.json';

export interface LighthouseScore {
  performance: number | null;
  accessibility: number | null;
  seo: number | null;
  /** Largest Contentful Paint, seconds. */
  lcp: number | null;
  /** Cumulative Layout Shift. */
  cls: number | null;
  /** ISO date of the measurement. */
  measured: string;
  /** The URL actually measured. */
  url: string;
  tool: string;
}

type Raw = { url: string; performance: number; accessibility: number; seo: number; lcpMs: number; cls: number };
const sites = (data.sites ?? {}) as Record<string, Raw>;

/** Keyed by project slug. */
export const lighthouse: Record<string, LighthouseScore> = Object.fromEntries(
  Object.entries(sites).map(([slug, s]) => [
    slug,
    {
      performance: s.performance,
      accessibility: s.accessibility,
      seo: s.seo,
      lcp: Math.round(s.lcpMs / 100) / 10,
      cls: s.cls,
      measured: data.measuredAt,
      url: s.url,
      tool: data.tool,
    },
  ]),
);
