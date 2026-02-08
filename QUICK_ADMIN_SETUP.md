# Quick Admin Setup Guide

## Step 1: Run Database Schema

1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/opuaowxmhfiortphwasz
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the **entire contents** of `supabase/schema.sql`
5. Paste and click **Run** (or press Cmd/Ctrl + Enter)

## Step 2: Create Admin User

### Option A: Using Supabase Dashboard (Easiest)

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: `admin@pluspro.com` (or your email)
   - **Password**: Choose a strong password
4. Click **Create user**
5. **Copy the User ID** (UUID) - you'll see it in the user list

6. Go back to **SQL Editor** and run:

```sql
INSERT INTO admin_users (user_id, email)
VALUES ('PASTE_USER_ID_HERE', 'admin@pluspro.com');
```

Replace `PASTE_USER_ID_HERE` with the actual UUID you copied.

### Option B: Using SQL Directly

If you know the email of an existing user:

```sql
-- This will add an existing user to admin_users
INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'admin@pluspro.com';
```

## Step 3: Test Login

1. Go to http://localhost:3000/admin/login
2. Enter your admin email and password
3. You should be redirected to the dashboard!

## Troubleshooting

### "Access denied" or "not authorized"
- User is not in `admin_users` table
- Run the INSERT query from Step 2

### "Admin system not set up"
- Database schema not run yet
- Go back to Step 1

### "Table does not exist"
- Run the schema.sql file in SQL Editor

### "Permission denied"
- Check that RLS policies were created
- Re-run the schema.sql file

## Adding More Admins

To add another admin user:

```sql
INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'newadmin@pluspro.com';
```

## Removing Admin Access

```sql
DELETE FROM admin_users WHERE email = 'admin@pluspro.com';
```

