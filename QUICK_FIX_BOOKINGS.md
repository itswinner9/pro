# 🚨 QUICK FIX: Can't See Bookings

## The Problem
Bookings aren't showing in admin dashboard because RLS policies are blocking access.

## ✅ The Solution (2 Steps)

### Step 1: Run This SQL Script

Go to **Supabase Dashboard → SQL Editor** and run:

**File**: `supabase/FIX_BOOKINGS_NOW.sql`

This will:
- ✅ Fix bookings RLS policies
- ✅ Allow admin dashboard to read bookings
- ✅ Show you how many bookings exist

### Step 2: Refresh Admin Dashboard

After running the SQL:
1. Go to `/admin/bookings`
2. Refresh the page
3. Bookings should now appear!

## 🔍 Verify It Worked

After running the SQL, you should see:
- Total bookings count
- Recent bookings list
- Policy names confirming they're set correctly

## 📋 Alternative: Fix Everything at Once

If you want to fix bookings AND quotes at the same time, run:

**File**: `supabase/FIX_ALL_RLS_FOR_CLERK.sql`

This fixes:
- ✅ Bookings
- ✅ Quotes
- ✅ All admin tables

## ⚠️ Why This Happens

- Using Clerk (not Supabase Auth)
- RLS policies check for `authenticated` role (doesn't exist with Clerk)
- Need to allow public read (admin checked by Clerk middleware)

## 🧪 Test After Fix

1. Submit a test booking at `/book-service`
2. Go to `/admin/bookings`
3. Should see the booking you just created

---

**Run the SQL script now and bookings will appear!** ✅

