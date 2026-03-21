-- ============================================
-- FRESH START - Complete Database Reset
-- This will DELETE ALL existing data and recreate everything
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Drop existing policies (if tables exist)
DO $$ 
BEGIN
    -- Drop policies on bookings if table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'bookings') THEN
        DROP POLICY IF EXISTS "Allow public insert on bookings" ON bookings;
        DROP POLICY IF EXISTS "Allow authenticated admin read bookings" ON bookings;
        DROP POLICY IF EXISTS "Allow authenticated admin update bookings" ON bookings;
        DROP POLICY IF EXISTS "Allow authenticated users to read bookings" ON bookings;
        DROP POLICY IF EXISTS "Allow authenticated users to update bookings" ON bookings;
    END IF;
    
    -- Drop policies on quotes if table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'quotes') THEN
        DROP POLICY IF EXISTS "Allow public insert on quotes" ON quotes;
        DROP POLICY IF EXISTS "Allow authenticated admin read quotes" ON quotes;
        DROP POLICY IF EXISTS "Allow authenticated admin update quotes" ON quotes;
        DROP POLICY IF EXISTS "Allow authenticated users to read quotes" ON quotes;
        DROP POLICY IF EXISTS "Allow authenticated users to update quotes" ON quotes;
    END IF;
    
    -- Drop policies on admin_users if table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'admin_users') THEN
        DROP POLICY IF EXISTS "Allow admins to read admin_users" ON admin_users;
    END IF;
END $$;

-- Step 2: Drop all existing tables (CASCADE will handle dependencies)
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;

-- Step 3: Drop functions if they exist
DROP FUNCTION IF EXISTS is_admin(UUID);

-- Step 4: Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 5: Create bookings table (fresh)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  message TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 6: Create quotes table (fresh)
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 7: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);

-- Step 8: Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Step 9: Create SIMPLE policies - Public can insert, Authenticated can read/update
-- Public insert (for forms)
CREATE POLICY "Allow public insert on bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on quotes" ON quotes
  FOR INSERT WITH CHECK (true);

-- Authenticated users can read and update (for admin dashboard)
CREATE POLICY "Allow authenticated users to read bookings" ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update bookings" ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read quotes" ON quotes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update quotes" ON quotes
  FOR UPDATE
  TO authenticated
  USING (true);

-- Step 10: Verify tables were created
SELECT 
    'SUCCESS: Database reset complete!' as status,
    (SELECT COUNT(*) FROM bookings) as bookings_count,
    (SELECT COUNT(*) FROM quotes) as quotes_count;

-- Step 11: Show all policies
SELECT 
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename IN ('bookings', 'quotes')
ORDER BY tablename, policyname;

-- ============================================
-- ✅ SUCCESS! Your database is now fresh and ready
-- ============================================
-- Next steps:
-- 1. Create a user in Authentication > Users (if not exists)
-- 2. Log in at /admin/login with that user
-- 3. Any authenticated user can access admin dashboard
-- ============================================
