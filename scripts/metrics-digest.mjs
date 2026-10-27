// Fingerprint of a measurement in src/data/site-metrics.json. `npm run measure`
// stores it next to the numbers; the build recomputes it and stops if they no
// longer match, so the inspection sheet can only print numbers the script
// wrote, never figures typed in by hand.
import { createHash } from 'node:crypto';

export const metricsDigest = (m) =>
  createHash('sha256')
    .update(JSON.stringify({ measuredAt: m.measuredAt, tool: m.tool, profile: m.profile, source: m.source, url: m.url, pages: m.pages }))
    .digest('hex');
