// Measures the home page and writes the numbers its inspection sheet shows.
// Run with: npm run measure   (needs Chrome or Chromium; set CHROME_PATH if it
// is not where chrome-launcher looks, e.g. a Playwright build).
//   npm run measure -- --prod   measures the live site (PROD below) instead of
//                               a local build; the sheet then says so. Use it
//                               once the page is live, then commit the JSON.
//
// What it does, in order:
//   1. (local mode) builds the site and serves dist/ with a tiny static server (below;
//      `astro preview` may detach into a shared background service);
//   2. runs Lighthouse (pinned version, mobile profile, simulated throttling)
//      on / and /en until it has RUNS valid runs each. A run is rejected if
//      it has no performance score or a Speed Index over 10 s: on a loaded
//      machine headless Chrome sometimes stalls before first paint, and such
//      a run measures the machine, not the page;
//   3. keeps the median run (by performance score, then LCP) per page;
//   4. writes src/data/site-metrics.json: tool and version, date, profile,
//      score, LCP, CLS, TBT and the bytes transferred, per page, sealed with
//      a fingerprint the build checks (scripts/metrics-digest.mjs);
//   5. builds once more (the sheet now prints these numbers) and records the
//      size of each built page, which the build compares against later to
//      warn when the numbers have gone stale (see astro.config.mjs).
//
// Nothing on the site is typed by hand: the sheet only ever renders this file.
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join, extname } from 'node:path';
import { metricsDigest } from './metrics-digest.mjs';

const LIGHTHOUSE = 'lighthouse@12.8.2';
const PROD = 'https://www.patricklaperriere.com';
const prod = process.argv.includes('--prod');
const RUNS = 3;
const MAX_ATTEMPTS = 15;
const PORT = 4391;
const PAGES = ['/', '/en'];
const OUT = 'src/data/site-metrics.json';
const base = prod ? PROD : `http://127.0.0.1:${PORT}`;
const work = mkdtempSync(join(tmpdir(), 'measure-'));

// The builds below skip the fingerprint check: this script is the one that
// writes the numbers (and the fingerprint) in the first place.
process.env.MEASURING = '1';

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: false });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} failed`);
};
const builtHtml = (path) => (path === '/' ? 'dist/index.html' : `dist${path}/index.html`);
const htmlBytes = () => Object.fromEntries(PAGES.map((p) => [p, readFileSync(builtHtml(p)).length]));

// Static server for dist/: /foo serves dist/foo/index.html, like the host.
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};
function serveDist(port) {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = join('dist', path);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    else if (!extname(file)) file += '/index.html';
    if (!existsSync(file)) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

async function waitFor(url, ms = 30000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`${url} did not answer`);
}

// Async on purpose: the static server lives in this process, and a blocking
// spawnSync would stop it from answering Lighthouse.
function exec(cmd, args, timeoutMs) {
  return new Promise((resolve) => {
    // Started in the temp folder: under WSL, chrome-launcher creates its Chrome
    // profiles in the working directory, named after a Windows temp path.
    const child = spawn(cmd, args, { stdio: 'ignore', env: process.env, cwd: work });
    const timer = setTimeout(() => child.kill('SIGKILL'), timeoutMs);
    child.on('close', () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

async function lighthouse(url) {
  const out = join(work, `lh-${Date.now()}.json`);
  await exec(
    'npx',
    [
      '-y',
      LIGHTHOUSE,
      url,
      '--only-categories=performance',
      '--form-factor=mobile',
      '--output=json',
      `--output-path=${out}`,
      '--quiet',
      '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
    ],
    180000,
  );
  if (!existsSync(out)) return null;
  const r = JSON.parse(readFileSync(out, 'utf8'));
  const a = r.audits;
  const score = r.categories?.performance?.score;
  const si = a['speed-index']?.numericValue;
  if (score == null || !si || si > 10000) return null;
  return {
    performance: Math.round(score * 100),
    lcpMs: Math.round(a['largest-contentful-paint'].numericValue),
    fcpMs: Math.round(a['first-contentful-paint'].numericValue),
    cls: Math.round(a['cumulative-layout-shift'].numericValue * 1000) / 1000,
    tbtMs: Math.round(a['total-blocking-time'].numericValue),
    transferBytes: Math.round(a['total-byte-weight'].numericValue),
    version: r.lighthouseVersion,
  };
}

const median = (runs) =>
  [...runs].sort((x, y) => y.performance - x.performance || x.lcpMs - y.lcpMs)[Math.floor(runs.length / 2)];

if (!prod) run('npx', ['astro', 'build']);
const server = prod ? null : await serveDist(PORT);
try {
  await waitFor(base + '/');
  const pages = {};
  let version = '';
  for (const path of PAGES) {
    const valid = [];
    for (let i = 0; i < MAX_ATTEMPTS && valid.length < RUNS; i++) {
      const m = await lighthouse(base + path);
      console.log(`  ${path} attempt ${i + 1}: ${m ? `${m.performance} / LCP ${m.lcpMs} ms` : 'rejected'}`);
      if (m) valid.push(m);
    }
    if (valid.length < RUNS) throw new Error(`Only ${valid.length} valid Lighthouse runs for ${path}`);
    const { version: v, ...best } = median(valid);
    version = v;
    pages[path] = { ...best, runs: valid.length };
  }

  const metrics = {
    measuredAt: new Date().toISOString(),
    tool: `Lighthouse ${version}`,
    profile: 'mobile, simulated throttling (Slow 4G, 4x CPU)',
    command: prod ? 'npm run measure -- --prod' : 'npm run measure',
    source: prod ? 'production' : 'local',
    url: base,
    pages,
    htmlBytes: {},
  };
  metrics.digest = metricsDigest(metrics);
  writeFileSync(OUT, JSON.stringify(metrics, null, 2) + '\n');
  run('npx', ['astro', 'build']);
  metrics.htmlBytes = htmlBytes();
  writeFileSync(OUT, JSON.stringify(metrics, null, 2) + '\n');
  console.log(`\nWrote ${OUT}`);
  console.log(JSON.stringify(metrics.pages, null, 2));
} finally {
  server?.close();
}
