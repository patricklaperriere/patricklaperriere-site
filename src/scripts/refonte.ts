// Refonte 2026-11 (direction v2) : le peu de JS de la home. Pas de librairie.
//
// - fiche du site [data-compte] : les valeurs se remplissent UNE fois au
//   chargement (le seul mouvement orchestré de la page), puis rien ne bouge ;
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

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (const el of document.querySelectorAll<HTMLElement>('.fiche [data-compte]')) {
    const cible = Number(el.dataset.compte);
    const dec = Number(el.dataset.decimales || 0);
    const sep = el.dataset.sep || '.';
    const ecrit = (v: number) => (el.textContent = v.toFixed(dec).replace('.', sep));
    const debut = performance.now();
    const pas = (t: number) => {
      const p = Math.min((t - debut) / 1000, 1);
      ecrit(cible * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(pas);
    };
    ecrit(0);
    requestAnimationFrame(pas);
  }
}
