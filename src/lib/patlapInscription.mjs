// L'inscription à « La technologie pour tous » : validation (partagée par le
// formulaire et la fonction /api/inscription) et appels à Resend.
//
// Rien ne part sans clé : la fonction répond 503 « inscriptions fermées » tant
// que RESEND_API_KEY et PATLAP_SEGMENT_ID ne sont pas posées chez Vercel. La
// clé ne vit QUE dans une variable d'environnement, jamais dans le code ni
// dans les journaux.
//
// Resend (doc lue le 6 nov. 2026) :
//   POST /contacts      { email, first_name, unsubscribed, segments: [{ id }] }
//   POST /events/send   { event, email, payload }  → déclenche l'automatisation
// Un en-tête User-Agent est exigé sur les appels HTTP directs.

const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** La validation, pure. Rend { ok, erreurs, propre }. */
export function validerInscription(d = {}) {
  const erreurs = [];
  const prenom = String(d.prenom ?? '').trim().replace(/\s+/g, ' ');
  const courriel = String(d.courriel ?? '').trim().toLowerCase();
  if (!prenom || prenom.length > 60) erreurs.push('prenom');
  if (!COURRIEL.test(courriel) || courriel.length > 254) erreurs.push('courriel');
  // LCAP : le consentement est une case cochée PAR la personne, jamais par défaut.
  if (d.consentement !== true) erreurs.push('consentement');
  // Le champ piège : un robot le remplit, un humain ne le voit pas.
  if (String(d.site ?? '').trim()) erreurs.push('robot');
  const langue = d.langue === 'en' ? 'en' : 'fr';
  return { ok: erreurs.length === 0, erreurs, propre: { prenom, courriel, langue } };
}

export const EVENEMENT = 'ttpt.inscription';

/**
 * Inscrit la personne : contact dans le segment, puis l'événement qui démarre
 * le parcours de 5 jours. `fetch` est injecté (tests).
 * @returns {Promise<{ statut: number, corps: object }>}
 */
export async function inscrire(donnees, { cle, segmentId, fetch: f = fetch } = {}) {
  if (!cle || !segmentId) return { statut: 503, corps: { error: 'inscriptions_fermees' } };
  const { ok, erreurs, propre } = validerInscription(donnees);
  if (!ok) return { statut: erreurs.includes('robot') ? 200 : 400, corps: erreurs.includes('robot') ? { ok: true } : { error: 'invalide', champs: erreurs } };
  const entetes = { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json', 'User-Agent': 'patricklaperriere.com/inscription' };
  const contact = await f('https://api.resend.com/contacts', {
    method: 'POST', headers: entetes,
    body: JSON.stringify({ email: propre.courriel, first_name: propre.prenom, unsubscribed: false, segments: [{ id: segmentId }] }),
  });
  // Déjà inscrit : Resend répond une erreur de doublon ; on continue quand même
  // vers l'événement (la personne recommence le parcours, rien ne casse).
  if (!contact.ok && contact.status !== 409 && contact.status !== 422) return { statut: 502, corps: { error: 'resend_contact' } };
  const evenement = await f('https://api.resend.com/events/send', {
    method: 'POST', headers: entetes,
    body: JSON.stringify({ event: EVENEMENT, email: propre.courriel, payload: { prenom: propre.prenom, langue: propre.langue } }),
  });
  if (!evenement.ok) return { statut: 502, corps: { error: 'resend_evenement' } };
  return { statut: 200, corps: { ok: true } };
}
