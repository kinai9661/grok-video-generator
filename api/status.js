export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const { task_id, apiKey } = req.query;
  if (!task_id || !apiKey) return res.status(400).json({ error: 'Missing task_id or apiKey' });

  try {
    const API_BASE = process.env.API_BASE_URL || 'https://ai.ezif.in/v1';
    const upstream = await fetch(API_BASE + '/videos/generations/' + task_id, {
      headers: { 'Authorization': 'Bearer ' + apiKey }
    });
    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { error: text }; }

    if (data && data.error && typeof data.error === 'object') {
      data.error = JSON.stringify(data.error);
    }

    return res.status(upstream.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message || String(e) });
  }
}
