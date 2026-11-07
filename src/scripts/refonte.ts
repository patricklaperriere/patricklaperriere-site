// Refonte 2026-11 (direction v2) : le peu de JS de la home. Pas de librairie.
//
// - fiche du site [data-compte] : les valeurs se remplissent UNE fois au
//   chargement (le seul mouvement orchestré de la page), puis rien ne bouge ;
// - curseur Avant/Après [data-aa] : recopie la valeur du range dans --pos
//   (il répond à une action de l'utilisateur ; actif aussi en mouvement réduit).

for (const r of document.querySelectorAll<HTMLInputElement>('[data-aa]')) {
  const fig = r.closest<HTMLElement>('.aa');
  const maj = () => fig?.style.setProperty('--pos', `${r.value}%`);
  r.addEventListener('input', maj);
  maj();
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
