-- ============================================
-- SIMPLIFY RLS POLICIES - Allow any authenticated user
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop existing admin-specific policies
DROP POLICY IF EXISTS "Allow authenticated admin read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated admin update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated admin read quotes" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated admin update quotes" ON quotes;

-- Create simple policies: any authenticated user can read/update
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

-- Verify policies
SELECT 
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies 
WHERE tablename IN ('bookings', 'quotes')
ORDER BY tablename, policyname;

