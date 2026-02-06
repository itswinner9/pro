# PlusPro Services - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- Netlify account (for hosting)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API and copy your:
   - Project URL
   - Anon/public key
   - Service role key (keep this secret!)

3. Run the database schema:
   - Go to SQL Editor in Supabase Dashboard
   - Copy and paste the contents of `supabase/schema.sql`
   - Execute the SQL

4. Set up Storage buckets:
   - Go to Storage in Supabase Dashboard
   - Create two public buckets:
     - `booking-images`
     - `quote-images`
   - Set appropriate policies for public uploads

5. Set up Authentication:
   - Go to Authentication > Users
   - Create an admin user account
   - Note: You'll need to set up proper RLS policies for admin access

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Step 4: Add Quantum Font

1. Download the Quantum Regular font files
2. Place them in `/public/fonts/`:
   - `Quantum-Regular.woff2`
   - `Quantum-Regular.woff`

If you don't have the font, you can temporarily use a fallback font by updating `globals.css`.

## Step 5: Update Contact Information

Update the following files with your actual contact information:
- `lib/utils.ts` - Update `PHONE_NUMBER` and `EMAIL`
- `app/layout.tsx` - Update metadata
- `components/seo/JsonLd.tsx` - Update business information

## Step 6: Set Up Email Notifications (Optional)

1. Choose an email service (SendGrid, Resend, AWS SES, etc.)
2. Update `netlify/functions/notify-booking.ts` and `notify-quote.ts`
3. Add email service API keys to Netlify environment variables
4. Configure the email templates

## Step 7: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your website.

## Step 8: Deploy to Netlify

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

## Admin Access

1. Visit `/admin/login`
2. Sign in with your Supabase admin credentials
3. Access the dashboard at `/admin/dashboard`

## Important Notes

- Update all placeholder URLs (plusproservices.ca) with your actual domain
- Configure proper Row Level Security (RLS) policies in Supabase
- Set up proper email service for production notifications
- Add Google Analytics if needed
- Configure Google Maps API for map embeds
- Set up proper error monitoring (Sentry, etc.)

## Troubleshooting

- If images aren't uploading, check Supabase Storage bucket policies
- If admin login fails, verify RLS policies allow authenticated users
- If emails aren't sending, check Netlify function logs

