import { handleUpload } from '@vercel/blob/client';

// Admin only: gives the browser a token to upload big files (videos) straight to Blob storage.
export default async function handler(req, res) {
  try {
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!process.env.ADMIN_PASSWORD || clientPayload !== process.env.ADMIN_PASSWORD) {
          throw new Error('Wrong admin password');
        }
        return {
          allowedContentTypes: ['video/*', 'image/*', 'application/pdf'],
          maximumSizeInBytes: 200 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(json);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}
