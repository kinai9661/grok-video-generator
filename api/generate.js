export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { apiKey, model, prompt, duration, aspect_ratio, resolution } = req.body;
    if (!apiKey || !prompt) return res.status(400).json({ error: 'Missing apiKey or prompt' });

    const API_BASE = process.env.API_BASE_URL || 'https://ai.ezif.in/v1';
    const upstream = await fetch(API_BASE + '/videos/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({ model, prompt, duration, aspect_ratio, resolution })
    });
    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { error: text }; }
    return res.status(upstream.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
