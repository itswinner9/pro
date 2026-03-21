# 🔧 Complete System Check & Fix Guide

## ✅ Quick Health Check

Visit: `http://localhost:3000/health` to see system status

## 🚀 Complete Setup Checklist

### 1. Environment Variables (.env.local)

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

### 2. Database Schema

Run these SQL scripts in Supabase SQL Editor (in order):

1. **`supabase/COMPLETE_SCHEMA.sql`** - Creates all tables
2. **`supabase/ADD_QUOTE_FEATURES.sql`** - Adds quote_price and assigned_to columns
3. **`supabase/FIX_ALL_RLS_FOR_CLERK.sql`** - Fixes RLS policies for Clerk

### 3. Clerk Setup

1. Go to Clerk Dashboard
2. Set user role in metadata:
   - Go to Users → Select User → Metadata
   - Add: `{ "role": "admin" }` for admin access

### 4. Test All Features

#### ✅ Website Features
- [ ] Homepage loads (`/`)
- [ ] Services page (`/services`)
- [ ] About page (`/about`)
- [ ] Contact page (`/contact`)
- [ ] Blog page (`/blog`)
- [ ] Book service form (`/book-service`)
- [ ] Request quote form (`/request-quote`)

#### ✅ Admin Features
- [ ] Admin dashboard (`/admin/dashboard`)
- [ ] View bookings (`/admin/bookings`)
- [ ] View quotes (`/admin/quotes`)
- [ ] Manage users (`/admin/users`)
- [ ] Manage staff (`/admin/staff`)
- [ ] Manage messages (`/admin/messages`)
- [ ] Manage blogs (`/admin/blogs`)
- [ ] Manage service areas (`/admin/service-areas`)
- [ ] Tasks (`/admin/tasks`)

#### ✅ Quote Management
- [ ] Cancel quote
- [ ] Add quote price
- [ ] Send email to customer
- [ ] Assign to staff
- [ ] Update status

#### ✅ Booking Management
- [ ] Cancel booking
- [ ] Add final price
- [ ] Send email to customer
- [ ] Assign to staff
- [ ] Update status

#### ✅ Email Notifications
- [ ] Booking confirmation emails
- [ ] Quote confirmation emails
- [ ] Contact form notifications
- [ ] Staff assignment notifications
- [ ] Custom customer emails

## 🐛 Common Issues & Fixes

### Blank Page
1. Check browser console for errors
2. Visit `/health` to see system status
3. Check `.env.local` exists and has all variables
4. Restart dev server: `npm run dev`

### Database Errors
1. Run `supabase/COMPLETE_SCHEMA.sql` in Supabase
2. Run `supabase/ADD_QUOTE_FEATURES.sql`
3. Run `supabase/FIX_ALL_RLS_FOR_CLERK.sql`

### Authentication Errors
1. Check Clerk keys in `.env.local`
2. Verify user has role in Clerk metadata
3. Check middleware.ts is correct

### Email Not Working
1. Verify `RESEND_API_KEY` in `.env.local`
2. Check Resend dashboard for domain verification
3. Test with `/api/send-customer-email`

## 📋 All Features Summary

### Admin Dashboard Features
✅ **KPIs**: Total Bookings, Pending Quotes, Revenue, Active Technicians
✅ **User Management**: View all users (registered, bookings, quotes)
✅ **Quote Management**: Cancel, price, email, assign staff
✅ **Booking Management**: Cancel, price, email, assign staff
✅ **Staff Management**: CRUD operations
✅ **Message Management**: View contact form submissions
✅ **Blog Management**: CRUD with SEO support
✅ **Service Areas**: Manage service locations
✅ **Tasks**: To-do list

### Email System
✅ **Resend Integration**: All emails via Resend
✅ **Booking Notifications**: Admin + Customer
✅ **Quote Notifications**: Admin + Customer
✅ **Contact Notifications**: Admin
✅ **Staff Assignment**: Staff notifications
✅ **Custom Emails**: Send to customers

### User Features
✅ **Profile Page**: View bookings, quotes, settings
✅ **Book Service**: Form with image upload
✅ **Request Quote**: Form with image upload
✅ **Contact Form**: Message submission

## 🎯 Next Steps

1. Run health check: Visit `/health`
2. Fix any errors shown
3. Test all features
4. Deploy to production

---

**Everything is built and ready!** Just ensure database schema is run and environment variables are set. ✅

