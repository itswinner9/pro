# Add Admin User: ccpbdiabhcoqddj@teihu.com

## Quick Steps:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/opuaowxmhfiortphwasz

2. **Check if user exists**:
   - Go to **Authentication** → **Users**
   - Look for `ccpbdiabhcoqddj@teihu.com`
   - If the user doesn't exist, create them first:
     - Click **Add user** → **Create new user**
     - Email: `ccpbdiabhcoqddj@teihu.com`
     - Set a password
     - Click **Create user**

3. **Add to admin_users table**:
   - Go to **SQL Editor**
   - Copy and paste this query:

```sql
INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com'
ON CONFLICT (user_id) DO NOTHING;
```

4. **Verify it worked**:
   - Run this query to check:

```sql
SELECT * FROM admin_users WHERE email = 'ccpbdiabhcoqddj@teihu.com';
```

   - You should see a row with the user's information

5. **Test login**:
   - Go to http://localhost:3000/admin/login
   - Email: `ccpbdiabhcoqddj@teihu.com`
   - Password: (the password you set)
   - You should now be able to log in!

## Alternative: If you know the User ID

If you already have the User ID (UUID) from the auth.users table, you can use:

```sql
INSERT INTO admin_users (user_id, email)
VALUES ('USER_ID_HERE', 'ccpbdiabhcoqddj@teihu.com')
ON CONFLICT (user_id) DO NOTHING;
```

Replace `USER_ID_HERE` with the actual UUID.

