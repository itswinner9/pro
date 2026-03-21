-- ============================================
-- FIX: All RLS Policies for Clerk Authentication
-- Since we're using Clerk (not Supabase Auth),
-- the "authenticated" role doesn't work.
-- This script updates all policies to allow public read/update
-- (Admin access is checked in the app layer with Clerk)
-- ============================================

-- ============================================
-- QUOTES POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow public insert on quotes" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated read quotes" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated update quotes" ON quotes;
DROP POLICY IF EXISTS "Allow public read quotes" ON quotes;
DROP POLICY IF EXISTS "Allow public update quotes" ON quotes;

CREATE POLICY "Allow public insert on quotes" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read quotes" ON quotes
  FOR SELECT USING (true);

CREATE POLICY "Allow public update quotes" ON quotes
  FOR UPDATE USING (true);

-- ============================================
-- BOOKINGS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow public insert on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public update bookings" ON bookings;

CREATE POLICY "Allow public insert on bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow public update bookings" ON bookings
  FOR UPDATE USING (true);

-- ============================================
-- ADMIN_USERS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow authenticated all admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow public all admin_users" ON admin_users;

CREATE POLICY "Allow public all admin_users" ON admin_users
  FOR ALL USING (true);

-- ============================================
-- SERVICE_AREAS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow authenticated read service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow authenticated insert service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow authenticated update service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow authenticated delete service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow public all service_areas" ON service_areas;

CREATE POLICY "Allow public all service_areas" ON service_areas
  FOR ALL USING (true);

-- ============================================
-- TASKS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow authenticated all tasks" ON tasks;
DROP POLICY IF EXISTS "Allow public all tasks" ON tasks;

CREATE POLICY "Allow public all tasks" ON tasks
  FOR ALL USING (true);

-- ============================================
-- STAFF POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow authenticated all staff" ON staff;
DROP POLICY IF EXISTS "Allow public all staff" ON staff;

CREATE POLICY "Allow public all staff" ON staff
  FOR ALL USING (true);

-- ============================================
-- MESSAGES POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow public insert messages" ON messages;
DROP POLICY IF EXISTS "Allow authenticated all messages" ON messages;
DROP POLICY IF EXISTS "Allow public all messages" ON messages;

CREATE POLICY "Allow public insert messages" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public all messages" ON messages
  FOR ALL USING (true);

-- ============================================
-- BLOGS POLICIES
-- ============================================
DROP POLICY IF EXISTS "Allow public read published blogs" ON blogs;
DROP POLICY IF EXISTS "Allow authenticated all blogs" ON blogs;
DROP POLICY IF EXISTS "Allow public all blogs" ON blogs;

-- Public can read published blogs
CREATE POLICY "Allow public read published blogs" ON blogs
  FOR SELECT USING (is_published = true);

-- Public can manage all blogs (admin access checked in app)
CREATE POLICY "Allow public all blogs" ON blogs
  FOR ALL USING (true);

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 
  '✅ All RLS policies updated for Clerk authentication!' as status,
  COUNT(*) as total_policies
FROM pg_policies
WHERE schemaname = 'public';

-- Test queries
SELECT 'Total quotes:' as info, COUNT(*) as count FROM quotes;
SELECT 'Total bookings:' as info, COUNT(*) as count FROM bookings;

