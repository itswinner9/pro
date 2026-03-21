-- ============================================
-- DIRECT FIX - Run this in Supabase SQL Editor
-- This bypasses RLS temporarily to set up admin
-- ============================================

-- Step 1: Temporarily disable RLS to add admin
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Step 2: Add the admin user directly
INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com'
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;

-- Step 3: Re-enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 4: Verify it worked
SELECT 
    'Admin user added successfully!' as status,
    au.id,
    au.user_id,
    au.email,
    au.created_at
FROM admin_users au
WHERE au.email = 'ccpbdiabhcoqddj@teihu.com';

-- Step 5: Check if user exists in auth.users
SELECT 
    'User in auth.users:' as check_type,
    id,
    email,
    created_at
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com';

