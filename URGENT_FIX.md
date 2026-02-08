# URGENT: Fix Admin Login Issue

## The Problem
You're getting: "Admin system not set up. Please run the database schema and create an admin user."

This means either:
1. The `admin_users` table doesn't exist
2. The user isn't in the `admin_users` table
3. RLS policies aren't set up correctly

## The Solution - Run This SQL

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/opuaowxmhfiortphwasz
2. **Click SQL Editor**
3. **Open the file**: `fix_admin_setup.sql` from your project
4. **Copy the ENTIRE contents** and paste into SQL Editor
5. **Click Run** (or press Cmd/Ctrl + Enter)

This script will:
- ✅ Create the admin_users table if it doesn't exist
- ✅ Set up all indexes and RLS policies
- ✅ Add `ccpbdiabhcoqddj@teihu.com` to admin_users
- ✅ Verify everything is working

## After Running the SQL

1. **Check the results** - You should see "SUCCESS: Admin user found!" in the output
2. **If you see "ERROR: User does NOT exist"**:
   - Go to **Authentication** → **Users**
   - Click **Add user** → **Create new user**
   - Email: `ccpbdiabhcoqddj@teihu.com`
   - Set a password
   - Click **Create user**
   - Then run the SQL script again

3. **Try logging in again**:
   - Go to http://localhost:3000/admin/login
   - Email: `ccpbdiabhcoqddj@teihu.com`
   - Password: (your password)
   - Click **Sign In**

## If It Still Doesn't Work

Run this diagnostic query and share the results:

```sql
-- Diagnostic query
SELECT 
    (SELECT COUNT(*) FROM auth.users WHERE email = 'ccpbdiabhcoqddj@teihu.com') as user_exists,
    (SELECT COUNT(*) FROM admin_users WHERE email = 'ccpbdiabhcoqddj@teihu.com') as admin_exists,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'admin_users') as table_exists;
```

This will tell us exactly what's missing.

