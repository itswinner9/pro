# Cloudflare deployment (Workers — not Pages)

This project uses **Next.js 16** with **@opennextjs/cloudflare**. It must be deployed as a **Cloudflare Worker**, not as a Pages project.

---

## Why you get 404 on Pages (e.g. `*.pro-7ro.pages.dev`)

- **Pages** did not run a build: log says *"No build command specified. Skipping build step."*
- **Pages** expects a **static output directory** (e.g. `out` or a folder of HTML/JS). This repo uses **OpenNext**, which produces a **Worker** (`.open-next/worker.js` + assets), not a static folder.
- So Pages deployed raw source files with no app entry point → **404**.

**Fix:** Use a **Worker** connected to the same Git repo (see below). Do not use a Pages project for this repo.

---

## Option A: Deploy from your machine (CLI)

1. `npm install` then `npx wrangler login`
2. `npm run build:cloudflare` then `npx wrangler deploy`
   - Or use the deploy script if configured: `npm run deploy`
3. In **Workers & Pages** → Worker **pluspro** → **Settings** → **Domains** → add your custom domain (e.g. pluspro.ca)

---

## Option B: Deploy from Git (Workers Builds) — recommended

1. Go to **https://dash.cloudflare.com** → **Workers & Pages**.
2. **Create application** → **Import a repository**.
3. Connect **GitHub** and select repo **itswinner9/pro**, branch **main**.
4. **Important:** Create a **Worker** (not a Pages project). Name it **pluspro** (must match `name` in `wrangler.jsonc`).
5. **Build configuration:**
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** (leave empty)
   - Do **not** set a “Build output directory” (Workers use the build output from the command).
6. **Environment variables** (Worker → **Settings** → **Variables and secrets**), for Production (and Preview if needed):
   - `NEXT_PUBLIC_SITE_URL` = `https://pluspro.ca` (or your live URL)
   - Optional: `WEB3FORMS_ACCESS_KEY`, `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_MICROSOFT_CLARITY_ID`
   - Quo (server secrets only — see [QUO.md](QUO.md)): `QUO_API_KEY`, optional `QUO_PHONE_NUMBER_ID`, `QUO_WEBHOOK_KEY` for missed-call text-back
7. Save and deploy. The app will be at `pluspro.<your-subdomain>.workers.dev` or your custom domain.
8. **Custom domain:** Worker → **Settings** → **Domains** → add **pluspro.ca** and **www.pluspro.ca** (or your domain).

---

## If you already have a **Pages** project (“pro”)

- **Pages** with “Build command” + “Build output directory” is for static sites. It **cannot** run this OpenNext Worker app.
- Create a **new Worker** (Workers Builds → Import a repository), use the settings in Option B, and connect the same repo **itswinner9/pro**. Worker name must be **pluspro**.
- You can keep the Pages project for something else or delete it; use the Worker URL (or custom domain on the Worker) for this app.

---

## Summary: Workers Builds (Git)

| Setting            | Value                                |
|--------------------|--------------------------------------|
| **Product**        | **Worker** (not Pages)               |
| **Worker name**    | **pluspro** (must match wrangler)    |
| **Build command**  | `npx opennextjs-cloudflare build`    |
| **Deploy command**| `npx wrangler deploy`                 |
| **Root directory** | (empty)                              |
| **Env vars**       | `NEXT_PUBLIC_SITE_URL`, Quo secrets in [QUO.md](QUO.md) |
| **Custom domain**  | Worker → Settings → Domains          |

---

## Scripts (package.json)

- `npm run dev` — local Next.js dev server
- `npm run build:next` — Next.js build only
- `npm run build:cloudflare` — OpenNext build for Cloudflare
- `npm run deploy` — OpenNext build + wrangler deploy (when configured)
