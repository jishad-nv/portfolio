// Admin only: checks the admin password.
export default function handler(req, res) {
  if (process.env.ADMIN_PASSWORD && req.headers['x-admin-key'] === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: 'Wrong admin password' });
}
