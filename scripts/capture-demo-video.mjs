// Captures a short, silent loop of a real app and encodes it for the Habita
// section on the home page.
//
//   npm run capture                 # app tour (needs credentials, see below)
//   npm run capture -- --scenario=marketing
//   npm run capture -- --publish    # also copies the result into public/work/
//
// Design notes
// ────────────
// · ZERO new npm dependencies. It drives the Chrome already installed on this
//   machine through the DevTools Protocol over Node's built-in WebSocket.
// · Frames come from Page.startScreencast, which pushes a frame when the page
//   actually changes. Their real timestamps are fed to ffmpeg's concat
//   demuxer, so the encoded loop keeps the original pacing instead of being
//   resampled to a fake constant frame rate.
// · Nothing is published unless you pass --publish. The default output lands
//   in capture-out/ for you to watch first.
//
// Credentials for the `app` scenario (never hard-code them, never commit them):
//
//   $env:HABITA_EMAIL="you@example.com"; $env:HABITA_PASSWORD="…"; npm run capture
//
// The script REFUSES to run the app scenario without them rather than quietly
// recording a login screen and calling it a product demo.

import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync, statSync, readdirSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createServer } from 'node:net';
import { setTimeout as sleep } from 'node:timers/promises';

// ── Config ────────────────────────────────────────────────────────────────
const WIDTH = 1280;
const HEIGHT = 800;
const MAX_SECONDS = 18;      // spec: 10-20 s loop
const BUDGET_MB = 3;         // spec: hard budget for webm + mp4
const OUT = 'capture-out';
const FRAMES = join(OUT, 'frames');

/** First free port from 9222 up — 9222 is often already taken by a live Chrome. */
async function freePort(from = 9222) {
  for (let p = from; p < from + 40; p++) {
    const ok = await new Promise((res) => {
      const s = createServer();
      s.once('error', () => res(false));
      s.once('listening', () => s.close(() => res(true)));
      s.listen(p, '127.0.0.1');
    });
    if (ok) return p;
  }
  throw new Error('Aucun port libre pour le débogage Chrome.');
}
const PORT = await freePort();

const argv = process.argv.slice(2);
const arg = (name, fallback = null) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};
const flag = (name) => argv.includes(`--${name}`);

const scenarioName = arg('scenario', 'app');
const publish = flag('publish');

// ── Scenarios ─────────────────────────────────────────────────────────────
// Each step: { goto } | { wait } | { click } | { type } | { scroll } | { pause }
const SCENARIOS = {
  // The real product. This is the only scenario that shows software in action.
  app: {
    needsAuth: true,
    start: 'https://habita.expert/app',
    steps: [
      { wait: 2500 },
      { pause: 1200 },
      { scroll: 400 }, { pause: 900 },
      { scroll: 500 }, { pause: 900 },
      { scroll: -900 }, { pause: 800 },
    ],
  },
  // Public marketing site. Useful for a look-and-feel loop, but be honest with
  // yourself: this is NOT "the software in action".
  marketing: {
    needsAuth: false,
    start: 'https://habita.expert/features',
    steps: [
      { wait: 2000 },
      { pause: 1000 },
      { scroll: 600 }, { pause: 1000 },
      { scroll: 600 }, { pause: 1000 },
      { goto: 'https://habita.expert/pricing' }, { wait: 1800 }, { pause: 1200 },
    ],
  },
};

const scenario = SCENARIOS[scenarioName];
if (!scenario) {
  console.error(`\n  ✗ Scénario inconnu : "${scenarioName}". Disponibles : ${Object.keys(SCENARIOS).join(', ')}\n`);
  process.exit(1);
}

// ── Preflight ─────────────────────────────────────────────────────────────
function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p)) ?? null;
}

const chrome = findChrome();
if (!chrome) {
  console.error('\n  ✗ Chrome introuvable. Donne le chemin via CHROME_PATH.\n');
  process.exit(1);
}

const hasFfmpeg = spawnSync('ffmpeg', ['-version'], { shell: true }).status === 0;
if (!hasFfmpeg) {
  console.error(`
  ✗ ffmpeg est absent — impossible d'encoder le WebM et le MP4.

    Installe-le, puis relance :
      winget install Gyan.FFmpeg
      (ou  choco install ffmpeg  ·  https://ffmpeg.org/download.html)

    Le script capture les images, mais sans ffmpeg il ne peut rien encoder.
`);
  process.exit(1);
}

const email = process.env.HABITA_EMAIL;
const password = process.env.HABITA_PASSWORD;
if (scenario.needsAuth && (!email || !password)) {
  console.error(`
  ✗ Le scénario "app" a besoin d'identifiants, sinon la capture n'enregistre
    que l'écran de connexion — ce qui serait une fausse démo.

    PowerShell :
      $env:HABITA_EMAIL="toi@exemple.com"
      $env:HABITA_PASSWORD="…"
      npm run capture

    Ou, pour filmer seulement le site public (ce n'est PAS le logiciel) :
      npm run capture -- --scenario=marketing
`);
  process.exit(1);
}

// ── CDP plumbing ──────────────────────────────────────────────────────────
let msgId = 0;
const pending = new Map();

function send(ws, method, params = {}, sessionId) {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params, sessionId }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }
    }, 30000);
  });
}

async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const j = await r.json();
      if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error('Chrome n’a pas ouvert le port de débogage.');
}

// ── Run ───────────────────────────────────────────────────────────────────
rmSync(OUT, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

console.log(`\n  Scénario : ${scenarioName}  ·  ${WIDTH}×${HEIGHT}  ·  max ${MAX_SECONDS}s\n`);

const proc = spawn(
  chrome,
  [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-first-run',
    '--disable-extensions',
    `--window-size=${WIDTH},${HEIGHT}`,
    // Absolute: Chrome silently refuses to start on a relative user-data-dir.
    `--user-data-dir=${resolve(OUT, 'profile')}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

const cleanup = () => {
  try { proc.kill(); } catch { /* already gone */ }
};
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(130); });

const wsUrl = await getWsUrl();
const ws = new WebSocket(wsUrl);
const frames = [];
let capturing = false;
let sessionId = null;

await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

ws.onmessage = async (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(m.error.message)) : resolve(m.result);
    return;
  }
  if (m.method === 'Page.screencastFrame') {
    if (capturing) frames.push({ data: m.params.data, t: m.params.metadata.timestamp });
    // Must ack or Chrome stops sending.
    send(ws, 'Page.screencastFrameAck', { sessionId: m.params.sessionId }, sessionId).catch(() => {});
  }
};

// Attach to the page target.
const { targetInfos } = await send(ws, 'Target.getTargets');
const page = targetInfos.find((t) => t.type === 'page');
({ sessionId } = await send(ws, 'Target.attachToTarget', { targetId: page.targetId, flatten: true }));

await send(ws, 'Page.enable', {}, sessionId);
await send(ws, 'Runtime.enable', {}, sessionId);
await send(ws, 'Emulation.setDeviceMetricsOverride',
  { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false }, sessionId);

const goto = async (url) => {
  await send(ws, 'Page.navigate', { url }, sessionId);
};
const evaluate = async (expression) =>
  send(ws, 'Runtime.evaluate', { expression, awaitPromise: true }, sessionId);

// Optional login before the recording starts, so credentials never appear on
// screen and the loop opens on the real workspace.
if (scenario.needsAuth) {
  console.log('  · Connexion…');
  await goto('https://habita.expert/app');
  await sleep(4000);
  await evaluate(`
    (async () => {
      const set = (el, v) => {
        const proto = Object.getPrototypeOf(el);
        Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      };
      const email = document.querySelector('input[type=email], input[name*=mail i]');
      const pass  = document.querySelector('input[type=password]');
      if (!email || !pass) return 'no-form';
      set(email, ${JSON.stringify(email)});
      set(pass,  ${JSON.stringify(password)});
      const btn = document.querySelector('button[type=submit], form button');
      if (btn) btn.click();
      return 'submitted';
    })()
  `);
  await sleep(6000);
}

await goto(scenario.start);
await sleep(2500);

// Consent banners sit on top of everything and would be burned into every
// frame. Dismiss before recording, not during, so no click is visible.
const dismissed = await evaluate(`
  (() => {
    const LABELS = ['tout accepter','accepter','accept all','accept',
                    'got it','ok','compris','refuser les non essentiels'];
    const clickable = [...document.querySelectorAll('button, a[role=button], [role=button]')];
    const hit = clickable.find((el) => {
      const t = (el.textContent || '').trim().toLowerCase();
      return t && LABELS.some((l) => t === l || t.startsWith(l));
    });
    if (hit) { hit.click(); return 'clicked:' + hit.textContent.trim(); }
    return 'none';
  })()
`);
console.log(`  · Bannière de témoins : ${dismissed.result?.value ?? 'n/a'}`);
await sleep(1200);

// Back to the top so the loop opens on the hero, not wherever the dismissal
// left the scroll position.
await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
await sleep(600);

console.log('  · Enregistrement…');
capturing = true;
await send(ws, 'Page.startScreencast',
  { format: 'jpeg', quality: 90, maxWidth: WIDTH, maxHeight: HEIGHT, everyNthFrame: 1 }, sessionId);

const started = Date.now();
for (const step of scenario.steps) {
  if ((Date.now() - started) / 1000 > MAX_SECONDS) break;
  if (step.goto) await goto(step.goto);
  if (step.wait) await sleep(step.wait);
  if (step.pause) await sleep(step.pause);
  if (step.scroll) {
    await evaluate(`window.scrollBy({ top: ${step.scroll}, behavior: 'smooth' })`);
  }
  if (step.click) await evaluate(`document.querySelector(${JSON.stringify(step.click)})?.click()`);
  if (step.type) {
    await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(step.type.selector)});
      if(e){e.focus();e.value=${JSON.stringify(step.type.text)};
      e.dispatchEvent(new Event('input',{bubbles:true}));}})()`);
  }
}

await send(ws, 'Page.stopScreencast', {}, sessionId);
capturing = false;
ws.close();
cleanup();

// Navigation repaints leave blank frames at both ends — a black tail is the
// last thing a looping video should show. A uniform frame compresses to a
// fraction of a real screenshot, so JPEG payload size separates them cleanly
// without decoding anything.
{
  const sizes = frames.map((f) => f.data.length).slice().sort((a, b) => a - b);
  const median = sizes[Math.floor(sizes.length / 2)];
  const blank = (f) => f.data.length < median * 0.25;
  let start = 0;
  let end = frames.length;
  while (start < end && blank(frames[start])) start++;
  while (end > start && blank(frames[end - 1])) end--;
  const dropped = frames.length - (end - start);
  if (dropped > 0) {
    frames.splice(end);
    frames.splice(0, start);
    console.log(`  · ${dropped} image(s) vide(s) élaguée(s) aux extrémités`);
  }
}

if (frames.length < 10) {
  console.error(`\n  ✗ Seulement ${frames.length} images capturées — la page n’a probablement rien rendu.`);
  console.error(`    Vérifie les identifiants, ou essaie --scenario=marketing.\n`);
  process.exit(1);
}

// ── Encode ────────────────────────────────────────────────────────────────
console.log(`  · ${frames.length} images capturées, encodage…`);

const t0 = frames[0].t;
let list = '';
frames.forEach((f, i) => {
  const name = String(i).padStart(5, '0') + '.jpg';
  writeFileSync(join(FRAMES, name), Buffer.from(f.data, 'base64'));
  const next = frames[i + 1];
  const dur = next ? Math.max(0.02, next.t - f.t) : 0.08;
  list += `file '${name}'\nduration ${dur.toFixed(3)}\n`;
});
// concat demuxer needs the final frame repeated to honour its duration.
list += `file '${String(frames.length - 1).padStart(5, '0')}.jpg'\n`;
writeFileSync(join(FRAMES, 'list.txt'), list);

const run = (args) => {
  const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { shell: true });
  if (r.status !== 0) {
    console.error(`\n  ✗ ffmpeg a échoué : ${r.stderr?.toString().slice(0, 500)}\n`);
    process.exit(1);
  }
};

const inputs = ['-f', 'concat', '-safe', '0', '-i', join(FRAMES, 'list.txt')];
const scale = ['-vf', `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease,pad=${WIDTH}:${HEIGHT}:-1:-1:color=0x070d16`];

run([...inputs, ...scale, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', join(OUT, 'habita-loop.webm')]);
run([...inputs, ...scale, '-an', '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '27', '-movflags', '+faststart', join(OUT, 'habita-loop.mp4')]);
run(['-i', join(FRAMES, '00000.jpg'), ...scale, '-c:v', 'libwebp', '-quality', '82', join(OUT, 'habita-loop.webp')]);

rmSync(FRAMES, { recursive: true, force: true });
rmSync(join(OUT, 'profile'), { recursive: true, force: true });

// ── Report + budget ───────────────────────────────────────────────────────
const sizes = {};
let pair = 0;
for (const f of readdirSync(OUT)) {
  const kb = statSync(join(OUT, f)).size / 1024;
  sizes[f] = kb;
  if (f.endsWith('.webm') || f.endsWith('.mp4')) pair += kb;
  console.log(`  ✓ ${f.padEnd(22)} ${kb.toFixed(1).padStart(8)} Ko`);
}

const overBudget = pair / 1024 > BUDGET_MB;
console.log(`\n  Paire vidéo : ${(pair / 1024).toFixed(2)} Mo  (budget ${BUDGET_MB} Mo)`);

if (overBudget) {
  console.error(`
  ⚠ BUDGET DÉPASSÉ — rien n'a été publié.
    Réduis la durée, ou monte le CRF (36 → 40 pour le WebM, 27 → 30 pour le MP4).
`);
  process.exit(1);
}

if (!publish) {
  console.log(`
  Rien n'a été publié. Regarde ${OUT}/habita-loop.mp4 avant de décider.
  Si le résultat te convient :
      npm run capture -- --scenario=${scenarioName} --publish
`);
  process.exit(0);
}

mkdirSync('public/work', { recursive: true });
for (const f of ['habita-loop.webm', 'habita-loop.mp4', 'habita-loop.webp']) {
  copyFileSync(join(OUT, f), join('public/work', f));
}
console.log(`
  ✓ Publié dans public/work/

  Dernière étape — dans src/components/HabitaSpotlight.astro, remplace les
  trois null de HABITA_LOOP par :
      webm:   '/work/habita-loop.webm'
      mp4:    '/work/habita-loop.mp4'
      poster: '/work/habita-loop.webp'
`);
