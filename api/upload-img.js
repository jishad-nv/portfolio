import { put } from '@vercel/blob';

// Admin only: uploads one (already compressed) image.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!process.env.ADMIN_PASSWORD || req.headers['x-admin-key'] !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong admin password' });
  }
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const buf = Buffer.concat(chunks);
    if (!buf.length) return res.status(400).json({ error: 'Empty upload' });
    const name = String(req.query.name || 'image').replace(/[^\w-]/g, '_').slice(0, 60) || 'image';
    const blob = await put(`media/${name}.jpg`, buf, {
      access: 'public',
      contentType: 'image/jpeg',
      addRandomSuffix: true,
    });
    return res.status(200).json({ url: blob.url });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
