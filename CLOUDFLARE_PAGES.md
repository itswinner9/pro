# Cloudflare settings for Next.js (OpenNext)

This project uses **Next.js 16** with **@opennextjs/cloudflare**. You must use **Cloudflare Workers** (not Pages) so the full app (API routes, SSR, Clerk) runs.

**Why Pages doesn’t work:** Cloudflare **Pages** is for static sites (or the older next-on-pages flow). This repo uses **OpenNext**, which builds a **Worker**. Use a **Worker** connected to Git (Workers Builds), not a Pages project.

---

## Option A: Deploy from your machine (CLI)

1. `npm install` then `npx wrangler login`
2. `npm run deploy`
3. In **Workers & Pages** → Worker **pluspro** → **Settings** → **Domains** → add your custom domain

---

## Option B: Deploy from Git (Workers Builds) — use this so each push deploys

1. Go to **https://dash.cloudflare.com** → **Workers & Pages**.
2. **Create application** → **Import a repository** (do **not** create a “Pages” project).
3. Connect **GitHub** and select repo **itswinner9/pro**. Branch: **main**.
4. **Important:** Create or use a **Worker** named **pluspro** (must match `name` in `wrangler.jsonc`). If you already have a **Pages** project “pro”, you need a **Worker** instead — create a new Worker and connect the same repo.
5. **Build configuration:**
   - **Build command:** `npx opennextjs-cloudflare build` — do **not** use `npm run build` (that produces `.next/` only; wrangler needs `.open-next/worker.js`).
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** leave empty (project root).
   - There is no “Build output directory” for Workers — leave it empty if you see it.
6. **Variables and secrets** (Worker **Settings** → **Variables and secrets**): add for Production (and Preview if you use branches):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = Clerk publishable key (`pk_test_...` or `pk_live_...`) — **not** a Supabase JWT
   - `CLERK_SECRET_KEY` = Clerk secret key (`sk_test_...` or `sk_live_...`)
   - Optional: `RESEND_API_KEY`, `ADMIN_EMAIL`, `FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`
7. Save and run a deploy. The app will be at `pluspro.<your-subdomain>.workers.dev` (or your custom domain).
8. **Custom domain:** Worker → **Settings** → **Domains** (or **Triggers** → **Custom Domains**) → add e.g. **pluspro.ca** and **www.pluspro.ca**.

---

## If you currently have a **Pages** project

- **Pages** with “Build command” + “Build output directory” is for **static** or next-on-pages apps. It does **not** run OpenNext Workers.
- Create a **Worker** (Workers Builds / Import a repository), use the settings in Option B, and connect the same repo **itswinner9/pro**. The Worker name must be **pluspro**.

---

## Troubleshooting

**Error: "The entry-point file at .open-next/worker.js was not found"**

- Your **Build command** is set to `npm run build` (or `next build`). Change it to **`npx opennextjs-cloudflare build`**. Only OpenNext produces `.open-next/worker.js`; a plain Next.js build does not.

---

## Summary: Workers Builds (Git)

| Setting             | Value                              |
|---------------------|------------------------------------|
| **Product**         | **Worker** (not Pages)             |
| **Worker name**     | **pluspro** (must match wrangler)  |
| **Build command**   | `npx opennextjs-cloudflare build`  |
| **Deploy command**  | `npx wrangler deploy`              |
| **Root directory** | (empty)                            |
| **Env vars**        | Supabase + Clerk required (see list above) |
| **Custom domain**   | Add in Worker → Settings → Domains |

---

## Scripts (package.json)

- `npm run dev` — local Next.js dev server.
- `npm run build` — Next.js build only.
- `npm run preview` — OpenNext build + local Workers preview.
- `npm run deploy` — OpenNext build + deploy to Cloudflare Workers.
