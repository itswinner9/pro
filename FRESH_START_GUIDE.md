# Fresh Start Guide - Complete Reset

## Step 1: Reset Database (DELETE ALL OLD DATA)

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard/project/opuaowxmhfiortphwasz
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open the file `supabase/FRESH_START.sql` from your project
5. **Copy the ENTIRE contents**
6. Paste into SQL Editor
7. Click **Run** (or Cmd/Ctrl + Enter)

⚠️ **WARNING**: This will DELETE all existing bookings and quotes data!

## Step 2: Verify Tables Were Created

After running the SQL, you should see:
- ✅ Two tables created: `bookings` and `quotes`
- ✅ Policies created successfully
- ✅ No errors

## Step 3: Create Your Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: `ccpbdiabhcoqddj@teihu.com`
   - **Password**: (choose a strong password)
4. Click **Create user**

## Step 4: Test Login

1. Go to http://localhost:3000/admin/login
2. Enter:
   - Email: `ccpbdiabhcoqddj@teihu.com`
   - Password: (the password you set)
3. Click **Sign In**

You should now be able to log in successfully!

## What Changed

- ✅ Removed admin_users table (not needed)
- ✅ Simplified RLS policies (any authenticated user = admin)
- ✅ Fresh, clean database
- ✅ No more stuck authentication checks
- ✅ Modern login page

## If You Still Have Issues

1. **Clear browser cache and cookies**
2. **Check browser console** for errors (F12)
3. **Verify environment variables** in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://opuaowxmhfiortphwasz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```
4. **Restart dev server**: Stop and run `npm run dev` again

