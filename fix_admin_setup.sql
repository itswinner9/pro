-- ============================================
-- COMPLETE FIX FOR ADMIN SETUP
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- Step 1: Ensure admin_users table exists (if schema wasn't run)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Step 2: Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Step 3: Enable RLS if not already enabled
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policy if it exists and recreate
DROP POLICY IF EXISTS "Allow admins to read admin_users" ON admin_users;

CREATE POLICY "Allow admins to read admin_users" ON admin_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.user_id = auth.uid()
    )
  );

-- Step 5: Add the admin user
-- This will work even if the user is already in the table
INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com'
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;

-- Step 6: Verify the admin was added
SELECT 
    'SUCCESS: Admin user found!' as status,
    au.id as admin_id,
    au.user_id,
    au.email,
    au.created_at as admin_since,
    u.email as auth_email,
    u.id as auth_user_id
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id
WHERE au.email = 'ccpbdiabhcoqddj@teihu.com';

-- Step 7: If Step 6 returns no rows, check if user exists in auth.users
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM auth.users WHERE email = 'ccpbdiabhcoqddj@teihu.com')
        THEN 'User exists in auth.users - admin should be added above'
        ELSE 'ERROR: User does NOT exist in auth.users. Create user first in Authentication > Users'
    END as user_status;

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- Check if table exists
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'admin_users')
        THEN '✓ admin_users table exists'
        ELSE '✗ admin_users table does NOT exist - run schema.sql first'
    END as table_status;

-- Check RLS is enabled
SELECT 
    CASE 
        WHEN (SELECT relrowsecurity FROM pg_class WHERE relname = 'admin_users')
        THEN '✓ RLS is enabled'
        ELSE '✗ RLS is NOT enabled'
    END as rls_status;

-- Check policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename = 'admin_users';

