// Refonte 2026-11 (direction v2) : le peu de JS de la home. Pas de librairie.
//
// - curseur Avant/Après [data-aa] : recopie la valeur du range dans --pos
//   (il répond à une action de l'utilisateur ; actif aussi en mouvement réduit) ;
// - liste de vérification [data-coches] : coche chaque ligne au centre de l'écran.
// Les autres effets de défilement sont en CSS (HomeRefonte.astro, AvantApres.astro).

for (const r of document.querySelectorAll<HTMLInputElement>('[data-aa]')) {
  const fig = r.closest<HTMLElement>('.aa');
  // Le premier geste sur le glisseur arrête le balayage lié au défilement
  // (.aa--main) : c'est la personne qui décide.
  const maj = () => { fig?.classList.add('aa--main'); fig?.style.setProperty('--pos', `${r.value}%`); };
  r.addEventListener('input', maj);
  r.addEventListener('pointerdown', () => fig?.classList.add('aa--main'));
}

// Liste de vérification : chaque case se coche quand sa ligne passe au
// centre de l'écran, et reste cochée. Sans JS ou en mouvement réduit, les
// cases sont cochées d'office (état du HTML et du CSS).
const coches = document.querySelector<HTMLElement>('[data-coches]');
if (coches && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  coches.classList.add('r-coches--anim');
  const io = new IntersectionObserver((entrees) => {
    for (const e of entrees) if (e.isIntersecting) { e.target.classList.add('est-coche'); io.unobserve(e.target); }
  }, { rootMargin: '-50% 0px -50% 0px' });
  coches.querySelectorAll('li').forEach((li) => io.observe(li));
}

// La scène 3D (home WOW) : chargée seulement quand la section approche, et
// jamais avant la fin du chargement de la page. html.scene-3d est posé avant
// l'affichage (HomeRefonte.astro) : sans lui, la composition fixe reste.
const scene = document.querySelector<HTMLElement>('[data-scene]');
if (scene && document.documentElement.classList.contains('scene-3d')) {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const faible = (nav.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory || 8) <= 4;
  const observer = () => {
    const io = new IntersectionObserver((e) => {
      if (!e[0]?.isIntersecting) return;
      io.disconnect();
      import('./scene').then((m) => m.demarrer(scene, faible ? 'css' : 'webgl'));
    }, { rootMargin: '60% 0px' });
    io.observe(scene);
  };
  // Rien ne se charge tant que la personne n'a pas commencé à descendre :
  // le premier écran reste léger (aucune tâche longue au chargement).
  const auPremierGeste = () => {
    if (window.scrollY > 0) { observer(); return; }
    const go = () => { removeEventListener('scroll', go); removeEventListener('keydown', go); observer(); };
    addEventListener('scroll', go, { passive: true });
    addEventListener('keydown', go);
  };
  const apresChargement = () => ('requestIdleCallback' in window ? requestIdleCallback(auPremierGeste, { timeout: 1500 }) : setTimeout(auPremierGeste, 200));
  if (document.readyState === 'complete') apresChargement();
  else addEventListener('load', apresChargement, { once: true });
}
