// Real, measured Lighthouse scores. NOTHING here is hand-written or estimated.
//
// How these were produced (re-run before quoting them again — a stale speed
// claim is worse than no claim, and this site's whole argument is speed):
//
//   npx lighthouse https://<site> --preset=desktop \
//     --output=json --output-path=./lh.json --chrome-flags="--headless=new"
//
// `bestPractices` is stored but NOT displayed. On three client sites it is
// dragged down by third-party cookies from analytics/tracking the client
// installed, plus Chrome DevTools "Issues" from those same scripts — none of
// which reflect how the site was built. Showing it would misreport the work.
// The number is kept here so the decision stays visible instead of looking
// like the category was quietly dropped.

export interface LighthouseScore {
  performance: number | null;
  accessibility: number | null;
  seo: number | null;
  /** Measured, deliberately not rendered — see note above. */
  bestPractices: number | null;
  /** Largest Contentful Paint, seconds. */
  lcp: number | null;
  /** Cumulative Layout Shift. */
  cls: number | null;
  /** ISO date of the measurement. */
  measured: string;
}

/** Keyed by project slug. A slug absent here simply renders no scores. */
export const lighthouse: Record<string, LighthouseScore> = {
  habita: {
    performance: 94,
    accessibility: 96,
    seo: 100,
    bestPractices: 100,
    lcp: 1.3,
    cls: 0.071,
    measured: '2026-08-15',
  },
  'inspection-habitation-outaouais': {
    performance: 100,
    accessibility: 100,
    seo: 100,
    bestPractices: 77,
    lcp: 0.7,
    cls: 0.0,
    measured: '2026-08-15',
  },
  'hp-addik': {
    performance: 97,
    accessibility: 94,
    seo: 100,
    bestPractices: 73,
    lcp: 1.1,
    cls: 0.003,
    measured: '2026-08-15',
  },
  'envita-wellness': {
    performance: 91,
    accessibility: 98,
    seo: 100,
    bestPractices: 77,
    lcp: 1.7,
    cls: 0.003,
    measured: '2026-08-15',
  },
};

/** This site, measured on the production build. */
export const ownSite: LighthouseScore = {
  performance: 100,
  accessibility: 100,
  seo: 100,
  bestPractices: 100,
  lcp: 0.4,
  cls: 0.0,
  measured: '2026-08-15',
};
