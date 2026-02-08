# Cloudflare Pages – Deploy Settings

## Fix: "Missing entry-point to Worker script"

If your build succeeds but deploy fails with Wrangler/Worker errors:

1. Go to **Cloudflare Dashboard** → **Workers & Pages** → your project.
2. Open **Settings** → **Builds & deployments**.
3. **Change "Deploy command"** to: `npm run deploy`  
   (Or leave it **empty** — Cloudflare Pages will deploy the build output automatically.)
4. Keep:
   - **Build command:** `npm run build`
   - **Build output directory:** `.next` (or whatever your framework preset uses)

The repo includes a no-op `npm run deploy` script so the deploy step passes without running Wrangler. You do **not** need `npx wrangler deploy` for a Next.js Git-connected project.

## Environment variables

Add these in **Settings** → **Environment variables** (for both Production and Preview if needed):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Any other vars from your `.env.local` (Clerk, Resend, etc.)

The sitemap will include blog URLs when these are set at build time.
