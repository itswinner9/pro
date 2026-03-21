# Complete Admin Setup Guide

## IMPORTANT: Follow these steps in order

### Step 1: Make sure database schema is run

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/opuaowxmhfiortphwasz
2. Go to **SQL Editor**
3. Copy the **ENTIRE** `supabase/schema.sql` file
4. Paste and click **Run**
5. Make sure you see "Success" message

### Step 2: Create the user (if it doesn't exist)

1. Go to **Authentication** → **Users**
2. Look for `ccpbdiabhcoqddj@teihu.com`
3. **If user doesn't exist:**
   - Click **Add user** → **Create new user**
   - Email: `ccpbdiabhcoqddj@teihu.com`
   - Password: (set a password you'll remember)
   - Click **Create user**
   - **Copy the User ID (UUID)** - you'll need it

### Step 3: Run the SQL script

1. Go to **SQL Editor** in Supabase
2. Open the file `setup_admin_complete.sql` from your project
3. **Run Step 1 first** to check if user exists:

```sql
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com';
```

4. **If Step 1 returns a row** (user exists), run Step 2:

```sql
INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com'
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;
```

5. **Run Step 3** to verify:

```sql
SELECT 
    au.id as admin_id,
    au.user_id,
    au.email,
    au.created_at as admin_since,
    u.email as auth_email,
    u.created_at as user_created
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id
WHERE au.email = 'ccpbdiabhcoqddj@teihu.com';
```

**You should see a row with the admin user info!**

### Step 4: Test Login

1. Go to http://localhost:3000/admin/login
2. Email: `ccpbdiabhcoqddj@teihu.com`
3. Password: (the password you set in Step 2)
4. Click **Sign In**

## If it still doesn't work:

### Check 1: User exists in auth.users?
```sql
SELECT id, email FROM auth.users WHERE email = 'ccpbdiabhcoqddj@teihu.com';
```
If this returns nothing, create the user first (Step 2 above).

### Check 2: User is in admin_users?
```sql
SELECT * FROM admin_users WHERE email = 'ccpbdiabhcoqddj@teihu.com';
```
If this returns nothing, run Step 3 SQL again.

### Check 3: Table exists?
```sql
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'admin_users'
);
```
If this returns `false`, run the schema.sql file first.

### Check 4: RLS policies exist?
```sql
SELECT * FROM pg_policies WHERE tablename = 'admin_users';
```
Should show at least one policy. If empty, run schema.sql again.

## Quick One-Liner (if user already exists):

If you know the user exists in auth.users, just run this:

```sql
INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com'
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;
```

Then verify:
```sql
SELECT * FROM admin_users WHERE email = 'ccpbdiabhcoqddj@teihu.com';
```

