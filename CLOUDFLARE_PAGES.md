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

The repo includes:
- A no-op `npm run deploy` script (use that as Deploy command if you prefer).
- A minimal `wrangler.jsonc` + `wrangler-worker.js` so **`npx wrangler deploy`** also succeeds (deploys a placeholder Worker; your site is still served by Pages from the build output).

## Environment variables

Add these in **Settings** → **Environment variables** (for both Production and Preview if needed):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Any other vars from your `.env.local` (Clerk, Resend, etc.)

The sitemap will include blog URLs when these are set at build time.
