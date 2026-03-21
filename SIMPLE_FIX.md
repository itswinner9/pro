# Simple Direct Fix

## If the previous SQL didn't work, try this:

### Option 1: Run This Simple SQL

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run this **ONE query**:

```sql
-- Temporarily disable RLS, add admin, re-enable RLS
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com'
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

3. Then verify:
```sql
SELECT * FROM admin_users WHERE email = 'ccpbdiabhcoqddj@teihu.com';
```

### Option 2: If User Doesn't Exist

**First create the user:**
1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Email: `ccpbdiabhcoqddj@teihu.com`
4. Password: (set one)
5. Click **Create user**

**Then run the SQL above**

### Option 3: Manual Insert (If you have the User ID)

If you can see the User ID in Authentication → Users:

1. Copy the User ID (UUID)
2. Run this (replace YOUR_USER_ID with actual UUID):

```sql
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

INSERT INTO admin_users (user_id, email)
VALUES ('YOUR_USER_ID', 'ccpbdiabhcoqddj@teihu.com')
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

### Still Not Working?

Share the exact error message you see when:
1. Running the SQL
2. Trying to log in

This will help me fix it!

