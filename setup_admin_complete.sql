-- ============================================
-- COMPLETE ADMIN SETUP FOR: ccpbdiabhcoqddj@teihu.com
-- ============================================

-- Step 1: Check if user exists in auth.users
-- (Run this first to see if user exists)
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com';

-- Step 2: If user exists above, get the user_id and run this:
-- (Replace 'USER_ID_FROM_STEP_1' with the actual UUID from Step 1)
INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com'
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;

-- Step 3: Verify admin was added successfully
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

-- Step 4: Check all admins (optional - to see all admin users)
SELECT 
    au.email,
    au.created_at,
    u.id as user_id
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id
ORDER BY au.created_at DESC;

-- ============================================
-- TROUBLESHOOTING QUERIES
-- ============================================

-- If Step 1 returns no rows, the user doesn't exist in auth.users
-- You need to create the user first in Supabase Dashboard:
-- Authentication > Users > Add user > Create new user

-- Check if admin_users table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'admin_users'
);

-- Check RLS policies on admin_users
SELECT * FROM pg_policies WHERE tablename = 'admin_users';

-- If you get permission errors, make sure you ran the full schema.sql first!

