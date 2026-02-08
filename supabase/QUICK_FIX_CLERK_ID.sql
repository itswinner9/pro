-- QUICK FIX: Add clerk_user_id column
-- Run this in Supabase SQL Editor if you get "column clerk_user_id does not exist" error

-- Add clerk_user_id column if it doesn't exist
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

-- Add other missing columns if needed
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing rows to have name (use email if name is null)
UPDATE admin_users 
SET name = COALESCE(name, email)
WHERE name IS NULL;

-- Make name NOT NULL if it's not already
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'name' 
        AND is_nullable = 'YES'
    ) THEN
        ALTER TABLE admin_users ALTER COLUMN name SET NOT NULL;
    END IF;
END $$;

-- Add source constraint
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'admin_users_source_check'
    ) THEN
        ALTER TABLE admin_users 
        ADD CONSTRAINT admin_users_source_check 
        CHECK (source IN ('booking', 'quote', 'manual', 'registered'));
    END IF;
END $$;

-- Create index
CREATE INDEX IF NOT EXISTS idx_admin_users_clerk_id ON admin_users(clerk_user_id);

-- Verify
SELECT '✅ Fixed! clerk_user_id column added.' as status;

