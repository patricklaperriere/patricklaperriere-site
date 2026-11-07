// Refonte 2026-11 : le peu de JS de la home (~2 ko). Pas de librairie.
// Tout le reste passe par CSS (scroll-driven animations, view transitions).
//
// - compteurs [data-compte] : de 0 à la valeur déjà écrite dans le HTML ;
// - curseurs Avant/Après [data-aa] : recopie la valeur du range dans --pos ;
// - boutons magnétiques .r-btn et curseur discret : ordinateur seulement.
// En mouvement réduit, seuls les curseurs Avant/Après restent actifs.

const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pointeurFin = matchMedia('(pointer: fine)').matches;

// ---- Avant/Après --------------------------------------------------------------
for (const r of document.querySelectorAll<HTMLInputElement>('[data-aa]')) {
  const fig = r.closest<HTMLElement>('.aa');
  const maj = () => fig?.style.setProperty('--pos', `${r.value}%`);
  r.addEventListener('input', maj);
  maj();
}

// ---- Compteurs ----------------------------------------------------------------
if (!reduit && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entrees) => {
    for (const e of entrees) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      const cible = Number(el.dataset.compte);
      const dec = Number(el.dataset.decimales || 0);
      const sep = el.dataset.sep || '.';
      const ecrit = (v: number) => (el.textContent = v.toFixed(dec).replace('.', sep));
      const debut = performance.now();
      const duree = 1200;
      const pas = (t: number) => {
        const p = Math.min((t - debut) / duree, 1);
        ecrit(cible * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(pas);
      };
      ecrit(0);
      requestAnimationFrame(pas);
    }
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-compte]').forEach((el) => io.observe(el));
}

// ---- Boutons magnétiques et curseur (ordinateur) ------------------------------
if (!reduit && pointeurFin) {
  for (const b of document.querySelectorAll<HTMLElement>('.r-btn')) {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`);
      b.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
    });
    b.addEventListener('pointerleave', () => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
  }
  const c = document.querySelector<HTMLElement>('.r-curseur');
  if (c) {
    addEventListener('pointermove', (e) => {
      c.classList.add('is-on');
      c.style.setProperty('--cx', `${e.clientX}px`);
      c.style.setProperty('--cy', `${e.clientY}px`);
      const lien = (e.target as Element).closest('a, button, input');
      c.style.setProperty('--cs', lien ? '2.6' : '1');
    }, { passive: true });
    document.addEventListener('pointerleave', () => c.classList.remove('is-on'));
  }
}
