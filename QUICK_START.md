# 🚀 Quick Start Guide - Get Your System Running

## Step 1: Check System Health

Visit: **`http://localhost:3000/health`**

This will show you:
- ✅ Supabase connection status
- ✅ Clerk authentication status  
- ✅ Database tables status
- ✅ Environment variables status
- ❌ Any errors

## Step 2: Setup Database

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy and paste the entire contents of **`supabase/FULL_SETUP.sql`**
3. Click **Run**
4. You should see: `✅ Database setup complete!`

## Step 3: Verify Environment Variables

Create/check `.env.local` file in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://opuaowxmhfiortphwasz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdWFvd3htaGZpb3J0cGh3YXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTQ2MTUsImV4cCI6MjA4NTk3MDYxNX0.ZLOdGvSqzekmTQNqgpJvIGWPHAP8_n-4kdcA5MDlA6c

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YXBwYXJlbnQtdmVydmV0LTg2LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_ZYKuxKFLPWRCALZ3DpZRfwGVaB635YIgQAaHDvrukN

# Resend (Email)
RESEND_API_KEY=re_ckJ5xA9u_78EhztgR82scDZRgjYLhNx9T
ADMIN_EMAIL=muse908070@gmail.com
FROM_EMAIL=PlusPro Services <noreply@plusproservices.ca>

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_DOMAIN=plusproservices.ca
```

## Step 4: Set Admin Role in Clerk

1. Go to **Clerk Dashboard** → **Users**
2. Find your user
3. Click **Metadata** tab
4. Add: `{ "role": "admin" }`
5. Save

## Step 5: Start Development Server

```bash
npm run dev
```

## Step 6: Test Everything

### ✅ Test Website
- Homepage: `http://localhost:3000`
- Book Service: `http://localhost:3000/book-service`
- Request Quote: `http://localhost:3000/request-quote`
- Contact: `http://localhost:3000/contact`

### ✅ Test Admin (Login Required)
- Dashboard: `http://localhost:3000/admin/dashboard`
- Bookings: `http://localhost:3000/admin/bookings`
- Quotes: `http://localhost:3000/admin/quotes`
- Users: `http://localhost:3000/admin/users`
- Staff: `http://localhost:3000/admin/staff`
- Messages: `http://localhost:3000/admin/messages`
- Blogs: `http://localhost:3000/admin/blogs`
- Service Areas: `http://localhost:3000/admin/service-areas`
- Tasks: `http://localhost:3000/admin/tasks`

## 🎯 All Features Included

### Admin Features
✅ **Dashboard** - KPIs, stats, recent activity
✅ **Bookings** - View, manage, cancel, assign staff, set price, send emails
✅ **Quotes** - View, manage, cancel, set price, send emails, assign staff
✅ **Users** - View all users, export CSV
✅ **Staff** - CRUD operations
✅ **Messages** - View contact form submissions
✅ **Blogs** - CRUD with SEO support
✅ **Service Areas** - Manage locations
✅ **Tasks** - To-do list

### Email System
✅ **Resend Integration** - All emails via Resend
✅ **Booking Notifications** - Admin + Customer
✅ **Quote Notifications** - Admin + Customer
✅ **Contact Notifications** - Admin
✅ **Staff Assignment** - Staff notifications
✅ **Custom Emails** - Send to customers

### User Features
✅ **Profile** - View bookings, quotes, settings
✅ **Book Service** - Form with image upload
✅ **Request Quote** - Form with image upload
✅ **Contact Form** - Message submission

## 🐛 Troubleshooting

### Blank Page?
1. Check browser console (F12)
2. Visit `/health` to see errors
3. Check `.env.local` exists
4. Restart server: `npm run dev`

### Database Errors?
1. Run `supabase/FULL_SETUP.sql` in Supabase
2. Check RLS policies are enabled
3. Verify tables exist

### Authentication Errors?
1. Check Clerk keys in `.env.local`
2. Verify user has role in Clerk metadata
3. Check middleware.ts

### Email Not Working?
1. Verify `RESEND_API_KEY` in `.env.local`
2. Check Resend dashboard
3. Test with health check page

---

**Everything is ready!** Follow these steps and your system will be fully operational. ✅

