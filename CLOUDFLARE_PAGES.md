# Cloudflare settings for Next.js (OpenNext)

This project uses **Next.js 16** with **@opennextjs/cloudflare**. Deploy to **Cloudflare Workers** (not Pages) so the full app (including API routes) runs.

---

## Option A: Deploy from your machine (CLI)

1. Install dependencies: `npm install`
2. Log in to Cloudflare: `npx wrangler login`
3. Deploy: `npm run deploy`
4. In **Cloudflare Dashboard** → **Workers & Pages** → your Worker (**pluspro**) → **Settings** → **Domains** → add **pluspro.ca** and **www.pluspro.ca**

---

## Option B: Cloudflare dashboard (Git + Workers)

1. Go to **https://dash.cloudflare.com** → **Workers & Pages**.
2. Click **Create** → **Worker** (or **Create application** → **Worker**).
3. Choose **Connect to Git** and connect **itswinner9/pro**.
4. **Build settings:**
   - **Build command:** `npm run deploy`
   - **Build output directory:** leave empty (OpenNext deploys the Worker; no static output dir).
   - **Root directory:** leave as `/` (project root).
5. **Environment variables** (Settings → Variables and Secrets): add for **Production** (and Preview if needed):
   - **Required:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
   - **Optional:** `RESEND_API_KEY` (emails; if missing, forms still succeed and emails are logged to console), `ADMIN_EMAIL`, `FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`
6. Save and deploy. Your app will be at the Worker URL (e.g. `pluspro.<your-subdomain>.workers.dev`).
7. **Custom domain:** In the Worker → **Settings** → **Domains & routes** (or **Triggers** → **Custom Domains**) → add **pluspro.ca** and **www.pluspro.ca**.

---

## If you use Cloudflare **Pages** (not Workers)

Pages is for **static** sites. This app is **Next.js with API routes**, so:

- **Either** use **Workers** (Option A or B above) with OpenNext — recommended.
- **Or** use **Vercel** for this repo (no Cloudflare config; Vercel runs Next.js as-is).

Do **not** set **Build output directory** to `.next` on Pages — that will give 404. This app must be deployed as a Worker via OpenNext.

---

## Summary: Cloudflare Next.js settings

| Setting              | Value                    |
|----------------------|--------------------------|
| **Product**          | Workers (not Pages)      |
| **Build command**    | `npm run deploy`         |
| **Build output dir** | (leave empty)            |
| **Env vars**         | Supabase, Clerk required; Resend optional (see list above) |
| **Custom domain**    | Add pluspro.ca in Worker → Domains       |

---

## Scripts (package.json)

- `npm run dev` — local Next.js dev server.
- `npm run build` — Next.js build only.
- `npm run preview` — OpenNext build + local Workers preview.
- `npm run deploy` — OpenNext build + deploy to Cloudflare Workers.
