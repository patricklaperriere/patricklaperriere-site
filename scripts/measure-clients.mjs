// Measures the live sites shown in the case studies, the same way the home
// sheet measures this one: Lighthouse (pinned), mobile profile, simulated
// throttling, median of RUNS valid runs. Writes src/data/client-metrics.json,
// which the case studies render with its date and method.
// Run with: node scripts/measure-clients.mjs   (CHROME_PATH as for measure)
//
// A site that cannot be measured (offline, blocked) is simply left out: the
// case study then shows no numbers rather than old ones.
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const LIGHTHOUSE = 'lighthouse@12.8.2';
const RUNS = 3;
const MAX_ATTEMPTS = 8;
const OUT = 'src/data/client-metrics.json';
const work = mkdtempSync(join(tmpdir(), 'clients-'));

// Live URLs, as published in src/content/projets/*.md.
const SITES = {
  habita: 'https://habita.expert',
  'inspection-beauregard': 'https://www.inspectionbeauregard.com',
  'inspection-habitation-outaouais': 'https://inspectionhab.ca',
  'hp-addik': 'https://hpaddik.com',
  'envita-wellness': 'https://envita-wellness.com',
};

const exec = (cmd, args, timeoutMs) =>
  new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'ignore' });
    const timer = setTimeout(() => child.kill('SIGKILL'), timeoutMs);
    child.on('close', () => { clearTimeout(timer); resolve(); });
  });

async function lighthouse(url) {
  const out = join(work, `lh-${Date.now()}.json`);
  await exec('npx', ['-y', LIGHTHOUSE, url,
    '--only-categories=performance,accessibility,seo',
    '--form-factor=mobile', '--output=json', `--output-path=${out}`, '--quiet',
    '--chrome-flags=--headless=new --no-sandbox --disable-gpu'], 180000);
  if (!existsSync(out)) return null;
  const r = JSON.parse(readFileSync(out, 'utf8'));
  const a = r.audits;
  const c = r.categories;
  const si = a['speed-index']?.numericValue;
  if (c?.performance?.score == null || !si || si > 15000) return null;
  return {
    performance: Math.round(c.performance.score * 100),
    accessibility: Math.round(c.accessibility.score * 100),
    seo: Math.round(c.seo.score * 100),
    lcpMs: Math.round(a['largest-contentful-paint'].numericValue),
    cls: Math.round(a['cumulative-layout-shift'].numericValue * 1000) / 1000,
    finalUrl: r.finalDisplayedUrl ?? r.finalUrl ?? url,
    version: r.lighthouseVersion,
  };
}

const median = (runs) =>
  [...runs].sort((x, y) => y.performance - x.performance || x.lcpMs - y.lcpMs)[Math.floor(runs.length / 2)];

const sites = {};
let version = null;
for (const [slug, url] of Object.entries(SITES)) {
  const runs = [];
  for (let i = 0; i < MAX_ATTEMPTS && runs.length < RUNS; i++) {
    const r = await lighthouse(url);
    console.log(`${slug} attempt ${i + 1}: ${r ? r.performance : 'rejected'}`);
    if (r) runs.push(r);
  }
  if (runs.length < RUNS) { console.log(`${slug}: not enough valid runs, left out`); continue; }
  const m = median(runs);
  version = m.version;
  sites[slug] = { url: m.finalUrl, performance: m.performance, accessibility: m.accessibility, seo: m.seo, lcpMs: m.lcpMs, cls: m.cls };
}

writeFileSync(OUT, JSON.stringify({
  measuredAt: new Date().toISOString(),
  tool: `Lighthouse ${version ?? LIGHTHOUSE.split('@')[1]}`,
  profile: 'mobile',
  runs: RUNS,
  sites,
}, null, 2) + '\n');
console.log(`Wrote ${OUT}`);
