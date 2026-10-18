# Jishad NV – Portfolio

Static portfolio (`public/`) + small Vercel functions (`api/`) + Vercel Blob storage.
Everything you add in the Admin page is saved online, so every visitor on every device sees it.

## Deploy (GitHub -> Vercel)
1. Create a new GitHub repository and push this whole folder to it.
2. Vercel -> **Add New -> Project** -> import that repository -> **Deploy** (no settings needed).
3. In the Vercel project open **Storage -> Create Database -> Blob** -> create it and **Connect** it to this project
   (this adds `BLOB_READ_WRITE_TOKEN` automatically).
4. Open **Settings -> Environment Variables** and add `ADMIN_PASSWORD` = a strong password only you know.
5. **Deployments -> Redeploy** the latest deployment so the new variables are used.
6. Open `https://YOUR-SITE.vercel.app/#/admin`, log in with the password, edit anything and press **Save & publish**.

## Notes
- First visit shows the starter content from `public/content.seed.json`; after your first Save, the saved version is used.
- Images are compressed in the browser and stored in Blob. Videos upload directly to Blob (up to 200 MB each).
- Visitors can never edit: saving and uploading need the admin password.
