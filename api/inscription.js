// POST /api/inscription : fonction Vercel (Node) de « La technologie pour
// tous ». Désactivée (503) tant que RESEND_API_KEY et PATLAP_SEGMENT_ID ne
// sont pas posées dans les variables d'environnement du projet Vercel.
import { inscrire } from '../src/lib/patlapInscription.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'methode' });
  }
  let corps = req.body;
  if (typeof corps === 'string') {
    try { corps = JSON.parse(corps); } catch { corps = {}; }
  }
  try {
    const { statut, corps: reponse } = await inscrire(corps || {}, {
      cle: process.env.RESEND_API_KEY,
      segmentId: process.env.PATLAP_SEGMENT_ID,
    });
    return res.status(statut).json(reponse);
  } catch {
    // Jamais la clé ni le détail de Resend dans la réponse ou les journaux.
    return res.status(502).json({ error: 'erreur' });
  }
}
