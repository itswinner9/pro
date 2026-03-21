# Admin Setup Guide

## Step 1: Run Updated Database Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/opuaowxmhfiortphwasz
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run**

This will create:
- `admin_users` table to track admin users
- Proper RLS policies for admin access
- Function to check admin status

## Step 2: Create Your First Admin User

### Option A: Using Supabase Dashboard

1. Go to **Authentication** > **Users** in Supabase Dashboard
2. Click **Add user** > **Create new user**
3. Enter your email and password (e.g., `admin@pluspro.com` / `your-secure-password`)
4. Click **Create user**
5. Copy the **User ID** (UUID) of the user you just created

6. Go to **SQL Editor** and run this query (replace `USER_ID_HERE` with the actual UUID):

```sql
INSERT INTO admin_users (user_id, email)
VALUES ('USER_ID_HERE', 'admin@pluspro.com');
```

### Option B: Using SQL Directly

Run this in SQL Editor to create user and admin record in one go:

```sql
-- First, create the user in auth.users (you'll need to do this via Supabase Auth UI or API)
-- Then add them to admin_users table:

INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'admin@pluspro.com';
```

## Step 3: Test Admin Login

1. Go to `/admin/login` on your website
2. Enter your admin email and password
3. You should be redirected to `/admin/dashboard`

## Important Security Notes

- **Only users in the `admin_users` table can access admin routes**
- Regular users (even if authenticated) will be denied access
- The system checks admin status on every request
- Admin status is verified server-side for security

## Adding More Admins

To add more admin users:

1. Create a user in **Authentication** > **Users**
2. Run this SQL query:

```sql
INSERT INTO admin_users (user_id, email)
VALUES ('NEW_USER_UUID', 'newadmin@pluspro.com');
```

## Removing Admin Access

To remove admin access:

```sql
DELETE FROM admin_users WHERE email = 'admin@pluspro.com';
```

## Troubleshooting

- **"Access denied" error**: User is not in `admin_users` table
- **Can't login**: Check that user exists in `auth.users` and `admin_users`
- **Redirect loop**: Clear browser cookies and try again

