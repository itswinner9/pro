-- ============================================
-- VERIFY BOOKINGS SYSTEM
-- Run this to check if bookings are working
-- ============================================

-- Check if bookings table exists
SELECT 
  'Bookings table exists' as status,
  COUNT(*) as total_bookings
FROM bookings;

-- Check recent bookings
SELECT 
  id,
  name,
  email,
  service,
  status,
  created_at
FROM bookings
ORDER BY created_at DESC
LIMIT 10;

-- Check RLS policies for bookings
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'bookings'
ORDER BY policyname;

-- Test insert (will be rolled back)
BEGIN;
  INSERT INTO bookings (name, phone, email, address, service, date, time, status)
  VALUES ('Test Booking', '1234567890', 'test@example.com', '123 Test St', 'handyman-services', CURRENT_DATE, '10:00', 'new');
  SELECT 'Test insert successful' as result;
ROLLBACK;

SELECT '✅ Bookings system verification complete!' as status;

