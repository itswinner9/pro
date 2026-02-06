# PlusPro Services Website

A modern, minimalist, high-conversion website and admin dashboard for PlusPro Services - a local handyman, plumbing, and repair service business in Lower Mainland, British Columbia.

## Tech Stack

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase (Database, Auth, Storage)
- Netlify (Hosting + Functions)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

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

