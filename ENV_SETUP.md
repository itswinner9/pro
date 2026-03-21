# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration (Optional - for Netlify Functions)
# SENDGRID_API_KEY=your_sendgrid_api_key
# ADMIN_EMAIL=admin@plusproservices.ca
# FROM_EMAIL=noreply@plusproservices.ca

# Site Configuration (Optional)
NEXT_PUBLIC_SITE_URL=https://plusproservices.ca
```

## How to Get Supabase Credentials

1. Go to https://supabase.com and create a project
2. Navigate to **Settings** > **API**
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Netlify Environment Variables

When deploying to Netlify, add these same variables in:
**Netlify Dashboard** > **Site Settings** > **Environment Variables**

Make sure to add:
- All Supabase variables
- Email service API keys (if using email notifications)
- Any other service API keys

## Security Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `SUPABASE_SERVICE_ROLE_KEY` should only be used server-side
- Use environment variables for all sensitive data

