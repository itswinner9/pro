# PlusPro Services Website

A modern, minimalist, high-conversion website and admin dashboard for PlusPro Services - a local handyman, plumbing, and repair service business in Lower Mainland, British Columbia.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase (Database, Auth, Storage)
- Clerk (Auth)
- Resend (Email, optional)
- Netlify (Hosting)

## Requirements

- **Node.js** >= 20.9.0 (see `.nvmrc` or `package.json` engines)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

**Required:** Supabase + Clerk  
- NEXT_PUBLIC_SUPABASE_URL  
- NEXT_PUBLIC_SUPABASE_ANON_KEY  
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY  
- CLERK_SECRET_KEY  

**Optional:** Resend (emails; if missing, forms still succeed and emails are logged)  
- RESEND_API_KEY  

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Deploy to Vercel

- **Build:** Use default `npm run build`. The build script runs **next build** on Vercel (detects `VERCEL` env) and **OpenNext for Cloudflare** elsewhere.
- Add env vars in Vercel → Project → Settings → Environment Variables (Supabase + Clerk required).

## Deploy to Netlify

- Repo is configured for Netlify: `netlify.toml` (Node 20, build command, publish dir).
- Add env vars in Netlify: **Site settings** → **Environment variables** (Supabase, Clerk, optional Resend).
- Netlify uses Node 20 via `NODE_VERSION` in `netlify.toml` and `.nvmrc`.
- Push to `main` or trigger a deploy to build and publish.

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - Reusable React components
- `/lib` - Utility functions and Supabase client
- `/public` - Static assets

## Features

- SEO-optimized pages
- Booking & quote request system
- Admin dashboard
- Email notifications
- Image uploads
- Mobile-first design

