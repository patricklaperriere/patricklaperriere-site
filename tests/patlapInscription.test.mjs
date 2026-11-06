// « La technologie pour tous » : validation et appels Resend (fetch simulé).
import test from 'node:test';
import assert from 'node:assert/strict';
import { validerInscription, inscrire, EVENEMENT } from '../src/lib/patlapInscription.mjs';

const bon = { prenom: '  Julie ', courriel: 'Julie@Example.com ', consentement: true, langue: 'fr' };

test('validation : prénom, courriel, consentement coché par la personne', () => {
  assert.deepEqual(validerInscription(bon), { ok: true, erreurs: [], propre: { prenom: 'Julie', courriel: 'julie@example.com', langue: 'fr' } });
  assert.deepEqual(validerInscription({ ...bon, consentement: 'on' }).erreurs, ['consentement']);
  assert.deepEqual(validerInscription({ ...bon, courriel: 'pas-un-courriel' }).erreurs, ['courriel']);
  assert.deepEqual(validerInscription({ ...bon, prenom: '' }).erreurs, ['prenom']);
  assert.ok(validerInscription({ ...bon, site: 'http://spam' }).erreurs.includes('robot'));
});

test('sans clé ou sans segment : fermé, aucun appel', async () => {
  let appels = 0;
  const f = async () => { appels += 1; return { ok: true, status: 200 }; };
  assert.equal((await inscrire(bon, { fetch: f })).statut, 503);
  assert.equal((await inscrire(bon, { cle: 'x', fetch: f })).statut, 503);
  assert.equal(appels, 0);
});

test('avec clé : le contact dans le segment, puis l\'événement', async () => {
  const appels = [];
  const f = async (url, o) => { appels.push([url, JSON.parse(o.body), o.headers]); return { ok: true, status: 200 }; };
  const r = await inscrire(bon, { cle: 're_test', segmentId: 'seg-1', fetch: f });
  assert.equal(r.statut, 200);
  assert.equal(appels[0][0], 'https://api.resend.com/contacts');
  assert.deepEqual(appels[0][1], { email: 'julie@example.com', first_name: 'Julie', unsubscribed: false, segments: [{ id: 'seg-1' }] });
  assert.equal(appels[1][0], 'https://api.resend.com/events/send');
  assert.deepEqual(appels[1][1], { event: EVENEMENT, email: 'julie@example.com', payload: { prenom: 'Julie', langue: 'fr' } });
  assert.ok(appels[0][2]['User-Agent']);
});

test('un robot reçoit un faux succès, et rien ne part', async () => {
  let appels = 0;
  const r = await inscrire({ ...bon, site: 'x' }, { cle: 'k', segmentId: 's', fetch: async () => { appels += 1; return { ok: true }; } });
  assert.equal(r.statut, 200);
  assert.equal(appels, 0);
});

test('Resend en panne : 502, sans détail', async () => {
  const r = await inscrire(bon, { cle: 'k', segmentId: 's', fetch: async () => ({ ok: false, status: 500 }) });
  assert.deepEqual(r, { statut: 502, corps: { error: 'resend_contact' } });
});
