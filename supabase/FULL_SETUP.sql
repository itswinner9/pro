-- ============================================
-- COMPLETE DATABASE SETUP FOR PLUSPRO
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- DROP EXISTING TABLES (if needed)
-- ============================================
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS service_areas CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

-- ============================================
-- CREATE TABLES
-- ============================================

-- Bookings Table
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
  quote_price DECIMAL(10, 2),
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotes Table
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
  quote_price DECIMAL(10, 2),
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table (Contact Form)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs Table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Areas Table
CREATE TABLE service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table (for tracking Clerk users)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks Table (To-do list - stored in localStorage on client, but table exists for future)
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_assigned_to ON bookings(assigned_to);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_assigned_to ON quotes(assigned_to);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);

-- ============================================
-- RLS POLICIES (Allow public read/write for Clerk auth)
-- ============================================

-- Bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public read on bookings" ON bookings;
CREATE POLICY "Allow public insert on bookings" ON bookings FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public read on bookings" ON bookings FOR SELECT TO public USING (true);
CREATE POLICY "Allow public update on bookings" ON bookings FOR UPDATE TO public USING (true);

-- Quotes
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert on quotes" ON quotes;
DROP POLICY IF EXISTS "Allow public read on quotes" ON quotes;
CREATE POLICY "Allow public insert on quotes" ON quotes FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public read on quotes" ON quotes FOR SELECT TO public USING (true);
CREATE POLICY "Allow public update on quotes" ON quotes FOR UPDATE TO public USING (true);

-- Staff
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on staff" ON staff;
DROP POLICY IF EXISTS "Allow public write on staff" ON staff;
CREATE POLICY "Allow public read on staff" ON staff FOR SELECT TO public USING (true);
CREATE POLICY "Allow public write on staff" ON staff FOR ALL TO public USING (true);

-- Messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert on messages" ON messages;
DROP POLICY IF EXISTS "Allow public read on messages" ON messages;
CREATE POLICY "Allow public insert on messages" ON messages FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public read on messages" ON messages FOR SELECT TO public USING (true);
CREATE POLICY "Allow public update on messages" ON messages FOR UPDATE TO public USING (true);

-- Blogs
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on blogs" ON blogs;
DROP POLICY IF EXISTS "Allow public write on blogs" ON blogs;
CREATE POLICY "Allow public read on blogs" ON blogs FOR SELECT TO public USING (true);
CREATE POLICY "Allow public write on blogs" ON blogs FOR ALL TO public USING (true);

-- Service Areas
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow public write on service_areas" ON service_areas;
CREATE POLICY "Allow public read on service_areas" ON service_areas FOR SELECT TO public USING (true);
CREATE POLICY "Allow public write on service_areas" ON service_areas FOR ALL TO public USING (true);

-- Admin Users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow public write on admin_users" ON admin_users;
CREATE POLICY "Allow public read on admin_users" ON admin_users FOR SELECT TO public USING (true);
CREATE POLICY "Allow public write on admin_users" ON admin_users FOR ALL TO public USING (true);

-- Tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on tasks" ON tasks;
DROP POLICY IF EXISTS "Allow public write on tasks" ON tasks;
CREATE POLICY "Allow public read on tasks" ON tasks FOR SELECT TO public USING (true);
CREATE POLICY "Allow public write on tasks" ON tasks FOR ALL TO public USING (true);

-- ============================================
-- FOREIGN KEY CONSTRAINTS
-- ============================================
ALTER TABLE bookings ADD CONSTRAINT fk_bookings_assigned_to FOREIGN KEY (assigned_to) REFERENCES staff(id) ON DELETE SET NULL;
ALTER TABLE quotes ADD CONSTRAINT fk_quotes_assigned_to FOREIGN KEY (assigned_to) REFERENCES staff(id) ON DELETE SET NULL;

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Insert default service areas
INSERT INTO service_areas (name, description, is_active) VALUES
  ('Vancouver', 'Greater Vancouver Area', true),
  ('Surrey', 'Surrey and surrounding areas', true),
  ('Burnaby', 'Burnaby and surrounding areas', true),
  ('Richmond', 'Richmond and surrounding areas', true),
  ('Coquitlam', 'Coquitlam and surrounding areas', true)
ON CONFLICT (name) DO NOTHING;

SELECT '✅ Database setup complete! All tables, indexes, and policies created.' as status;

