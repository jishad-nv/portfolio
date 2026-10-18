import { list } from '@vercel/blob';

// Public: returns the saved site content (or {empty:true} before the first save).
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const { blobs } = await list({ prefix: 'content/site.json', limit: 1 });
    if (!blobs.length) return res.status(200).json({ empty: true });
    const r = await fetch(blobs[0].url + '?t=' + Date.now(), { cache: 'no-store' });
    return res.status(200).json(await r.json());
  } catch (e) {
    return res.status(200).json({ empty: true });
  }
}
