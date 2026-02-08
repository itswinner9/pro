-- ============================================
-- MIGRATION: Add clerk_user_id to admin_users
-- Run this if you get "column clerk_user_id does not exist" error
-- ============================================

-- Check if column exists, if not add it
DO $$ 
BEGIN
    -- Add clerk_user_id column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'clerk_user_id'
    ) THEN
        ALTER TABLE admin_users 
        ADD COLUMN clerk_user_id TEXT;
        
        RAISE NOTICE '✅ Added clerk_user_id column to admin_users table';
    ELSE
        RAISE NOTICE 'ℹ️ clerk_user_id column already exists';
    END IF;

    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE admin_users 
        ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        
        RAISE NOTICE '✅ Added updated_at column to admin_users table';
    ELSE
        RAISE NOTICE 'ℹ️ updated_at column already exists';
    END IF;

    -- Update the table structure to match new schema
    -- Add name column if missing (old schema had different structure)
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'name'
    ) THEN
        ALTER TABLE admin_users 
        ADD COLUMN name TEXT;
        
        -- If email exists, use it as name temporarily
        UPDATE admin_users 
        SET name = COALESCE(name, email) 
        WHERE name IS NULL;
        
        -- Make name NOT NULL after populating
        ALTER TABLE admin_users 
        ALTER COLUMN name SET NOT NULL;
        
        RAISE NOTICE '✅ Added name column to admin_users table';
    END IF;

    -- Add phone column if missing
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'phone'
    ) THEN
        ALTER TABLE admin_users 
        ADD COLUMN phone TEXT;
        
        RAISE NOTICE '✅ Added phone column to admin_users table';
    END IF;

    -- Add address column if missing
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'address'
    ) THEN
        ALTER TABLE admin_users 
        ADD COLUMN address TEXT;
        
        RAISE NOTICE '✅ Added address column to admin_users table';
    END IF;

    -- Add notes column if missing
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'notes'
    ) THEN
        ALTER TABLE admin_users 
        ADD COLUMN notes TEXT;
        
        RAISE NOTICE '✅ Added notes column to admin_users table';
    END IF;

    -- Add source column if missing
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'source'
    ) THEN
        ALTER TABLE admin_users 
        ADD COLUMN source TEXT DEFAULT 'manual' 
        CHECK (source IN ('booking', 'quote', 'manual', 'registered'));
        
        -- Set default for existing rows
        UPDATE admin_users 
        SET source = 'manual' 
        WHERE source IS NULL;
        
        RAISE NOTICE '✅ Added source column to admin_users table';
    END IF;

    -- Remove old columns if they exist (from old schema)
    -- Remove user_id if it exists (old Supabase Auth reference)
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'user_id'
    ) THEN
        -- Drop foreign key constraint first if it exists
        ALTER TABLE admin_users 
        DROP CONSTRAINT IF EXISTS admin_users_user_id_fkey;
        
        ALTER TABLE admin_users 
        DROP COLUMN IF EXISTS user_id;
        
        RAISE NOTICE '✅ Removed old user_id column (Supabase Auth)';
    END IF;

    -- Remove created_by if it exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'created_by'
    ) THEN
        ALTER TABLE admin_users 
        DROP COLUMN IF EXISTS created_by;
        
        RAISE NOTICE '✅ Removed old created_by column';
    END IF;

END $$;

-- Create index for clerk_user_id if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_admin_users_clerk_id ON admin_users(clerk_user_id);

-- Create index for source if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_admin_users_source ON admin_users(source);

-- Verify the migration
SELECT 
    '✅ Migration complete!' as status,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;

