// Lighthouse (mobile) on a list of local pages, one valid run each (up to 6 tries).
import { spawn } from 'node:child_process';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
const [base, out, ...paths] = process.argv.slice(2);
const exec = (args) => new Promise((r) => { const c = spawn('npx', args, { stdio: 'ignore', cwd: process.cwd() }); const t = setTimeout(() => c.kill('SIGKILL'), 180000); c.on('close', () => { clearTimeout(t); r(); }); });
const res = {};
for (const p of paths) {
  for (let i = 0; i < 6; i++) {
    const f = `${process.cwd()}/lh-${p.replace(/\W/g, '_')}.json`;
    await exec(['-y', 'lighthouse@12.8.2', base + p, '--form-factor=mobile', '--output=json', `--output-path=${f}`, '--quiet', '--chrome-flags=--headless=new --no-sandbox --disable-gpu']);
    if (!existsSync(f)) continue;
    const r = JSON.parse(readFileSync(f, 'utf8')); const c = r.categories;
    if (c.performance?.score == null) continue;
    const fails = Object.values(r.audits).filter((a) => a.score !== null && a.score < 1 && ['accessibility', 'seo', 'best-practices'].some((k) => c[k].auditRefs.some((x) => x.id === a.id && x.weight > 0))).map((a) => a.id);
    res[p] = { perf: Math.round(c.performance.score * 100), a11y: Math.round(c.accessibility.score * 100), bp: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), lcp: Math.round(r.audits['largest-contentful-paint'].numericValue), cls: r.audits['cumulative-layout-shift'].numericValue, fails };
    console.log(p, JSON.stringify(res[p]));
    break;
  }
  if (!res[p]) console.log(p, 'no valid run');
}
writeFileSync(out, JSON.stringify(res, null, 2));
