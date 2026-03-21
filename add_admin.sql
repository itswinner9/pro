-- Add admin user for ccpbdiabhcoqddj@teihu.com
-- This will add the user to admin_users table if they exist in auth.users

INSERT INTO admin_users (user_id, email)
SELECT id, email 
FROM auth.users 
WHERE email = 'ccpbdiabhcoqddj@teihu.com'
ON CONFLICT (user_id) DO NOTHING;

-- Verify the admin was added
SELECT * FROM admin_users WHERE email = 'ccpbdiabhcoqddj@teihu.com';

