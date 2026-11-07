// La scène « mes vrais projets autour de toi » (home WOW). Chargé à la
// demande par refonte.ts, quand la section approche, jamais avant le premier
// affichage. Aucune bibliothèque : WebGL 2 écrit à la main (quelques Ko).
//
// - Le défilement natif pilote la caméra (section haute + plateau sticky) :
//   aucun détournement du défilement.
// - Rendu à 60 images par seconde au plus, densité de pixels plafonnée à 1,5,
//   rien n'est dessiné quand la scène n'est pas à l'écran ou ne bouge pas.
// - Repli : sans WebGL 2, ou appareil faible, les mêmes écrans en CSS 3D
//   (perspective et translateZ). Le mouvement réduit et l'économie de données
//   gardent la composition fixe (décidé avant le premier affichage, dans
//   HomeRefonte.astro).
// - Le canvas est décoratif (aria-hidden) : noms, phrases et liens sont du
//   vrai HTML, dans .scene__projets.
import { PROJETS_SCENE, type Ecran } from '../data/scene';

type Mode = 'webgl' | 'css';
interface Plan { e: Ecran; projet: number; url: string; tex: WebGLTexture | null; img: HTMLImageElement | null; pret: boolean }

const FOND = [10 / 255, 20 / 255, 48 / 255]; // Salle #0A1430

// ── Caméra : positions de visite, une par projet, plus une approche ─────────
function cadrage(largeur: number, hauteur: number) {
  const aspect = largeur / Math.max(1, hauteur);
  const portrait = aspect < 1;
  // Champ horizontal : environ 72° sur un écran large, 50° en portrait.
  const hfov = portrait ? (50 * Math.PI) / 180 : 2 * Math.atan(Math.tan((22.5 * Math.PI) / 180) * aspect);
  const vfov = 2 * Math.atan(Math.tan(hfov / 2) / aspect);
  // Distance pour que l'écran principal occupe 60 % (88 % en portrait) de la largeur.
  const part = portrait ? 0.88 : Math.min(0.6, 0.6 * (1.9 / Math.max(1.2, aspect)) + 0.1);
  const d = 1.6 / part / 2 / Math.tan(hfov / 2);
  return { aspect, portrait, vfov, d };
}

function arrets(c: ReturnType<typeof cadrage>) {
  // Sur grand écran, l'écran principal est décalé à droite : la légende
  // occupe la gauche. En portrait, il est centré, un peu en haut.
  const dx = c.portrait ? 0 : -0.36;
  const dy = c.portrait ? -0.22 : 0;
  const a = PROJETS_SCENE.map((p) => {
    const e = p.ecrans[0];
    return [e.x + dx, e.y + dy, e.z + c.d];
  });
  const premier = a[0]!;
  return [[premier[0]! * 0.4, premier[1]! + 0.15, premier[2]! + 2.6], ...a];
}

const lisse = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** Position de la caméra pour une progression p (0 à 1) ; l'approche occupe le
 *  premier 12 %, puis chaque projet a un palier (30 % de son intervalle). */
function camera(p: number, a: number[][]) {
  const n = a.length - 1; // nombre de projets
  let i: number, f: number;
  if (p < 0.12) { i = 0; f = lisse(p / 0.12); }
  else {
    const t = ((p - 0.12) / 0.88) * (n - 1);
    i = Math.min(n - 1, Math.floor(t)) + 1;
    const u = t - (i - 1);
    f = i >= n ? 0 : lisse(Math.min(1, Math.max(0, (u - 0.15) / 0.7)));
  }
  const A = a[i]!, B = a[Math.min(n, i + 1)]!;
  return [A[0]! + (B[0]! - A[0]!) * f, A[1]! + (B[1]! - A[1]!) * f, A[2]! + (B[2]! - A[2]!) * f];
}

/** Le projet « devant » pour une progression p. */
function actif(p: number) {
  const n = PROJETS_SCENE.length;
  if (p < 0.12) return 0;
  return Math.min(n - 1, Math.round(((p - 0.12) / 0.88) * (n - 1)));
}

/** Progression qui amène le projet i devant (pour le clavier). */
const progressionDe = (i: number) => (i === 0 ? 0.14 : 0.12 + (i / (PROJETS_SCENE.length - 1)) * 0.88);

// ── Matrices (colonnes, comme WebGL) ─────────────────────────────────────────
function perspective(fovy: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}
function modele(e: Ecran) {
  const c = Math.cos(e.ry), s = Math.sin(e.ry), h = e.w * e.ar;
  // Échelle (w, h), rotation autour de y, translation.
  return new Float32Array([c * e.w, 0, -s * e.w, 0, 0, h, 0, 0, s, 0, c, 0, e.x, e.y, e.z, 1]);
}
function vue(cx: number, cy: number, cz: number, lacet: number) {
  // Inverse de : translation (cx, cy, cz) puis rotation lacet autour de y.
  const c = Math.cos(lacet), s = Math.sin(lacet);
  const tx = -(c * cx - s * cz), tz = -(s * cx + c * cz);
  return new Float32Array([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, tx, -cy, tz, 1]);
}

const VS = `#version 300 es
in vec2 a;
uniform mat4 uP, uV, uM;
out vec2 vUv; out float vZ;
void main() {
  vec4 v = uV * uM * vec4(a, 0.0, 1.0);
  vZ = -v.z;
  vUv = vec2(a.x + 0.5, 0.5 - a.y);
  gl_Position = uP * v;
}`;
const FS = `#version 300 es
precision mediump float;
in vec2 vUv; in float vZ;
uniform sampler2D uT; uniform float uFocus, uPret; uniform vec3 uFond; uniform vec2 uTaille;
out vec4 o;
void main() {
  // Netteté : nette à la distance de mise au point, floue devant et derrière.
  float flou = clamp(abs(vZ - uFocus) * 1.1, 0.0, 4.5);
  vec3 c = mix(vec3(0.09, 0.13, 0.25), texture(uT, vUv, flou).rgb, uPret);
  // Les écrans lointains se fondent dans la salle éteinte.
  float loin = smoothstep(uFocus + 1.5, uFocus + 13.0, vZ);
  c = mix(c, uFond, loin * 0.88);
  // Filet clair du cadre de l'écran (1 à 2 px).
  vec2 b = min(vUv, 1.0 - vUv) * uTaille;
  float cadre = 1.0 - smoothstep(0.0, 0.006, min(b.x, b.y));
  c = mix(c, vec3(0.86, 0.9, 1.0), cadre * 0.55 * (1.0 - loin));
  // Un écran qui passe près de la caméra s'efface au lieu de la traverser.
  float a = smoothstep(0.25, 0.9, vZ);
  o = vec4(c * a, a);
}`;

export function demarrer(section: HTMLElement, voulu: Mode) {
  const piste = section.querySelector<HTMLElement>('.scene__piste')!;
  const plateau = section.querySelector<HTMLElement>('.scene__plateau')!;
  const canvas = section.querySelector<HTMLCanvasElement>('canvas')!;
  const items = [...section.querySelectorAll<HTMLElement>('.scene__projet')];
  const imgs = [...section.querySelectorAll<HTMLImageElement>('.scene__ecrans img')];
  const locale = (document.documentElement.lang || 'fr').startsWith('en') ? 'en' : 'fr';

  const plans: Plan[] = [];
  PROJETS_SCENE.forEach((p, i) => p.ecrans.forEach((e) => {
    plans.push({ e, projet: i, url: `/scene/${locale === 'en' && e.srcEn ? e.srcEn : e.src}.webp`, tex: null, img: null, pret: false });
  }));

  let gl: WebGL2RenderingContext | null = null;
  if (voulu === 'webgl') {
    try { gl = canvas.getContext('webgl2', { antialias: true, alpha: false, powerPreference: 'low-power' }); } catch { gl = null; }
  }
  const mode: Mode = gl ? 'webgl' : 'css';
  section.classList.add(mode === 'webgl' ? 'scene--webgl' : 'scene--css');

  // ── Progression, projet actif, légendes ───────────────────────────────────
  let cible = 0, courant = 0, visible = false, sourisX = 0, sourisY = 0, sx = 0, sy = 0;
  const lire = () => {
    const r = piste.getBoundingClientRect();
    const course = r.height - plateau.offsetHeight;
    cible = course > 0 ? Math.min(1, Math.max(0, -r.top / course)) : 0;
  };
  let actuel = -1;
  const majActif = (p: number) => {
    const i = actif(p);
    if (i === actuel) return;
    actuel = i;
    items.forEach((li, k) => li.classList.toggle('est-actif', k === i));
  };
  // Au clavier : un lien d'un projet caché amène la caméra à ce projet.
  items.forEach((li, i) => li.addEventListener('focusin', () => {
    const r = piste.getBoundingClientRect();
    const haut = window.scrollY + r.top;
    const course = r.height - plateau.offsetHeight;
    window.scrollTo({ top: haut + progressionDe(i) * course, behavior: 'instant' as ScrollBehavior });
  }));
  // Un clic sur la scène ouvre le projet actif.
  plateau.addEventListener('click', (ev) => {
    if ((ev.target as HTMLElement).closest('a')) return;
    items[actuel]?.querySelector('a')?.click();
  });
  if (matchMedia('(pointer: fine)').matches) {
    plateau.addEventListener('pointermove', (ev) => {
      const r = plateau.getBoundingClientRect();
      sourisX = (ev.clientX - r.left) / r.width - 0.5;
      sourisY = (ev.clientY - r.top) / r.height - 0.5;
    }, { passive: true });
  }

  let c = cadrage(plateau.clientWidth, plateau.clientHeight);
  let a = arrets(c);

  // ── WebGL ─────────────────────────────────────────────────────────────────
  let dessiner: () => void;
  let redimensionner: () => void;
  if (gl) {
    const g = gl;
    const shader = (type: number, src: string) => { const s = g.createShader(type)!; g.shaderSource(s, src); g.compileShader(s); return s; };
    const prog = g.createProgram()!;
    g.attachShader(prog, shader(g.VERTEX_SHADER, VS));
    g.attachShader(prog, shader(g.FRAGMENT_SHADER, FS));
    g.linkProgram(prog);
    g.useProgram(prog);
    const buf = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, buf);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]), g.STATIC_DRAW);
    const loc = g.getAttribLocation(prog, 'a');
    g.enableVertexAttribArray(loc);
    g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
    const u = (n: string) => g.getUniformLocation(prog, n);
    const uP = u('uP'), uV = u('uV'), uM = u('uM'), uFocus = u('uFocus'), uPret = u('uPret'), uFond = u('uFond'), uTaille = u('uTaille');
    g.uniform1i(u('uT'), 0);
    g.uniform3fv(uFond, FOND);
    g.disable(g.DEPTH_TEST);
    g.enable(g.BLEND);
    g.blendFunc(g.ONE, g.ONE_MINUS_SRC_ALPHA);
    g.clearColor(FOND[0]!, FOND[1]!, FOND[2]!, 1);
    const aniso = g.getExtension('EXT_texture_filter_anisotropic');
    const modeles = plans.map((p) => modele(p.e));

    // Textures : une par image (décodée hors du fil principal), une seule
    // téléversée par image dessinée pour ne jamais bloquer.
    const file: Plan[] = [];
    for (const p of plans) {
      const img = new Image();
      img.decoding = 'async';
      img.src = p.url;
      img.decode().then(() => { p.img = img; file.push(p); }).catch(() => { p.pret = true; });
    }
    const televerser = () => {
      const p = file.shift();
      if (!p || !p.img) return false;
      const t = g.createTexture();
      g.bindTexture(g.TEXTURE_2D, t);
      g.pixelStorei(g.UNPACK_COLORSPACE_CONVERSION_WEBGL, g.NONE);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, p.img);
      g.generateMipmap(g.TEXTURE_2D);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR_MIPMAP_LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
      if (aniso) g.texParameterf(g.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, 4);
      p.tex = t; p.pret = true; p.img = null;
      return true;
    };

    redimensionner = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      canvas.width = Math.round(plateau.clientWidth * dpr);
      canvas.height = Math.round(plateau.clientHeight * dpr);
      g.viewport(0, 0, canvas.width, canvas.height);
      c = cadrage(plateau.clientWidth, plateau.clientHeight);
      a = arrets(c);
      g.uniformMatrix4fv(uP, false, perspective(c.vfov, c.aspect, 0.05, 40));
    };
    const ordre = plans.map((_, i) => i);
    const prof = new Float32Array(plans.length);
    dessiner = () => {
      const nouveau = televerser();
      const [cx, cy, cz] = camera(courant, a);
      const lacet = -sx * 0.06;
      const V = vue(cx! + sx * 0.12, cy! - sy * 0.08, cz!, lacet);
      g.uniformMatrix4fv(uV, false, V);
      g.uniform1f(uFocus, c.d);
      g.clear(g.COLOR_BUFFER_BIT);
      // Du plus loin au plus proche (transparence).
      plans.forEach((p, i) => { prof[i] = cz! - p.e.z; });
      ordre.sort((x, y) => prof[y]! - prof[x]!);
      for (const i of ordre) {
        const p = plans[i]!;
        if (prof[i]! < 0.2) continue; // derrière la caméra
        g.uniformMatrix4fv(uM, false, modeles[i]!);
        g.uniform1f(uPret, p.pret ? 1 : 0);
        g.uniform2f(uTaille, 1, p.e.ar);
        g.bindTexture(g.TEXTURE_2D, p.tex);
        g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
      }
      return nouveau;
    };
  } else {
    // ── Repli CSS 3D : les mêmes écrans, en perspective ─────────────────────
    const els = plans.map((p, i) => {
      const img = imgs[i];
      if (img) { img.loading = 'eager'; }
      return img;
    });
    let f = 1;
    redimensionner = () => {
      c = cadrage(plateau.clientWidth, plateau.clientHeight);
      a = arrets(c);
      // Longueur focale en pixels : 1 unité du monde à distance 1.
      f = plateau.clientHeight / 2 / Math.tan(c.vfov / 2);
      plateau.style.setProperty('--focale', `${f}px`);
      els.forEach((el, i) => {
        if (!el) return;
        const e = plans[i]!.e;
        el.style.width = `${e.w * f}px`;
        el.style.height = `${e.w * e.ar * f}px`;
        el.style.marginLeft = `${(-e.w * f) / 2}px`;
        el.style.marginTop = `${(-e.w * e.ar * f) / 2}px`;
      });
    };
    dessiner = () => {
      const [cx, cy, cz] = camera(courant, a);
      els.forEach((el, i) => {
        if (!el) return;
        const e = plans[i]!.e;
        const d = cz! - e.z;
        if (d < 0.35) { el.style.visibility = 'hidden'; return; }
        el.style.visibility = 'visible';
        const loin = Math.min(1, Math.max(0, (d - c.d - 1.5) / 11.5));
        el.style.opacity = String(Math.min(1, (d - 0.35) / 0.5) * (1 - loin * 0.85));
        el.style.transform = `translate3d(${(e.x - cx! - sx * 0.12) * f}px, ${-(e.y - cy! + sy * 0.08) * f}px, ${f * (1 - d)}px) rotateY(${e.ry}rad)`;
      });
      return false;
    };
  }

  // ── Boucle : 60 images par seconde au plus, seulement si visible ──────────
  let dernier = 0, boucle = 0;
  const image = (t: number) => {
    boucle = 0;
    if (!visible) return;
    if (t - dernier < 15.5) { boucle = requestAnimationFrame(image); return; }
    const dt = Math.min(0.05, (t - dernier) / 1000 || 0.016);
    dernier = t;
    const k = 1 - Math.exp(-dt * 7);
    courant += (cible - courant) * k;
    sx += (sourisX - sx) * k * 0.6;
    sy += (sourisY - sy) * k * 0.6;
    majActif(courant);
    const encore = dessiner();
    const bouge = Math.abs(cible - courant) > 1e-4 || Math.abs(sourisX - sx) > 1e-3 || Math.abs(sourisY - sy) > 1e-3;
    if (bouge || encore || (mode === 'webgl' && plans.some((p) => !p.pret))) boucle = requestAnimationFrame(image);
  };
  const relancer = () => { if (visible && !boucle) boucle = requestAnimationFrame(image); };

  redimensionner();
  lire();
  courant = cible;
  majActif(courant);
  addEventListener('scroll', () => { lire(); relancer(); }, { passive: true });
  plateau.addEventListener('pointermove', relancer, { passive: true });
  new ResizeObserver(() => { redimensionner(); lire(); dessiner(); relancer(); }).observe(plateau);
  new IntersectionObserver((e) => { visible = e[0]!.isIntersecting; relancer(); }).observe(plateau);
  requestAnimationFrame(() => section.classList.add('scene--prete'));
}
