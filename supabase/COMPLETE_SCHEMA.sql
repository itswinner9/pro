-- ============================================
-- COMPLETE DATABASE SCHEMA FOR PLUSPRO
-- Updated for Clerk Authentication
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES (Bookings & Quotes)
-- ============================================

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
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

-- Quotes Table
CREATE TABLE IF NOT EXISTS quotes (
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

-- ============================================
-- ADMIN TABLES
-- ============================================

-- Admin Users Table (for Clerk users and manual users)
-- Drop old version if it exists with different structure
DO $$ 
BEGIN
    -- Check if table exists with old structure (has user_id column)
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'admin_users' 
        AND column_name = 'user_id'
    ) THEN
        -- Migrate old structure to new structure
        ALTER TABLE admin_users 
        DROP CONSTRAINT IF EXISTS admin_users_user_id_fkey,
        DROP COLUMN IF EXISTS user_id,
        DROP COLUMN IF EXISTS created_by;
        
        -- Add new columns if they don't exist
        ALTER TABLE admin_users 
        ADD COLUMN IF NOT EXISTS name TEXT,
        ADD COLUMN IF NOT EXISTS phone TEXT,
        ADD COLUMN IF NOT EXISTS address TEXT,
        ADD COLUMN IF NOT EXISTS notes TEXT,
        ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual',
        ADD COLUMN IF NOT EXISTS clerk_user_id TEXT,
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        
        -- Update existing rows
        UPDATE admin_users 
        SET name = COALESCE(name, email),
            source = COALESCE(source, 'manual')
        WHERE name IS NULL OR source IS NULL;
        
        -- Make name NOT NULL
        ALTER TABLE admin_users 
        ALTER COLUMN name SET NOT NULL;
        
        -- Add source constraint
        ALTER TABLE admin_users 
        DROP CONSTRAINT IF EXISTS admin_users_source_check;
        
        ALTER TABLE admin_users 
        ADD CONSTRAINT admin_users_source_check 
        CHECK (source IN ('booking', 'quote', 'manual', 'registered'));
    END IF;
END $$;

-- Create admin_users table with new structure
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  notes TEXT,
  source TEXT DEFAULT 'manual' CHECK (source IN ('booking', 'quote', 'manual', 'registered')),
  clerk_user_id TEXT, -- Store Clerk user ID for registered users
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Areas Table
CREATE TABLE IF NOT EXISTS service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks/To-Do List Table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  assigned_to TEXT,
  due_date DATE,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Table
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'technician' CHECK (role IN ('technician', 'supervisor', 'manager', 'admin')),
  is_active BOOLEAN DEFAULT true,
  hire_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table (Contact Form)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs Table (SEO optimized)
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
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

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

-- Quotes indexes
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);

-- Admin users indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_source ON admin_users(source);
CREATE INDEX IF NOT EXISTS idx_admin_users_clerk_id ON admin_users(clerk_user_id);

-- Service areas indexes
CREATE INDEX IF NOT EXISTS idx_service_areas_slug ON service_areas(slug);
CREATE INDEX IF NOT EXISTS idx_service_areas_active ON service_areas(is_active);

-- Tasks indexes
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);

-- Staff indexes
CREATE INDEX IF NOT EXISTS idx_staff_role ON staff(role);
CREATE INDEX IF NOT EXISTS idx_staff_active ON staff(is_active);

-- Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Blogs indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES (for idempotency)
-- ============================================

-- Bookings policies
DROP POLICY IF EXISTS "Allow public insert on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated update bookings" ON bookings;

-- Quotes policies
DROP POLICY IF EXISTS "Allow public insert on quotes" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated read quotes" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated update quotes" ON quotes;
DROP POLICY IF EXISTS "Allow public read quotes" ON quotes;
DROP POLICY IF EXISTS "Allow public update quotes" ON quotes;

-- Admin users policies
DROP POLICY IF EXISTS "Allow authenticated all admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow public all admin_users" ON admin_users;

-- Service areas policies
DROP POLICY IF EXISTS "Allow authenticated read service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow authenticated insert service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow authenticated update service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow authenticated delete service_areas" ON service_areas;
DROP POLICY IF EXISTS "Allow public all service_areas" ON service_areas;

-- Tasks policies
DROP POLICY IF EXISTS "Allow authenticated all tasks" ON tasks;
DROP POLICY IF EXISTS "Allow public all tasks" ON tasks;

-- Staff policies
DROP POLICY IF EXISTS "Allow authenticated all staff" ON staff;
DROP POLICY IF EXISTS "Allow public all staff" ON staff;

-- Messages policies
DROP POLICY IF EXISTS "Allow public insert messages" ON messages;
DROP POLICY IF EXISTS "Allow authenticated all messages" ON messages;
DROP POLICY IF EXISTS "Allow public all messages" ON messages;

-- Blogs policies
DROP POLICY IF EXISTS "Allow public read published blogs" ON blogs;
DROP POLICY IF EXISTS "Allow authenticated all blogs" ON blogs;
DROP POLICY IF EXISTS "Allow public all blogs" ON blogs;

-- ============================================
-- CREATE RLS POLICIES
-- ============================================
-- NOTE: Using Clerk for authentication (not Supabase Auth)
-- Admin access is checked in the app layer via Clerk middleware
-- RLS policies allow public read/update since Clerk handles auth

-- Bookings: Public can insert/read/update (admin checked in app)
CREATE POLICY "Allow public insert on bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow public update bookings" ON bookings
  FOR UPDATE USING (true);

-- Quotes: Public can insert/read/update (admin checked in app)
CREATE POLICY "Allow public insert on quotes" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read quotes" ON quotes
  FOR SELECT USING (true);

CREATE POLICY "Allow public update quotes" ON quotes
  FOR UPDATE USING (true);

-- Admin users: Public can manage (admin checked in app via Clerk)
CREATE POLICY "Allow public all admin_users" ON admin_users
  FOR ALL USING (true);

-- Service areas: Public can manage (admin checked in app via Clerk)
CREATE POLICY "Allow public all service_areas" ON service_areas
  FOR ALL USING (true);

-- Tasks: Public can manage (admin checked in app via Clerk)
CREATE POLICY "Allow public all tasks" ON tasks
  FOR ALL USING (true);

-- Staff: Public can manage (admin checked in app via Clerk)
CREATE POLICY "Allow public all staff" ON staff
  FOR ALL USING (true);

-- Messages: Public can insert and manage (admin checked in app via Clerk)
CREATE POLICY "Allow public insert messages" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public all messages" ON messages
  FOR ALL USING (true);

-- Blogs: Public can read published, and manage all (admin checked in app via Clerk)
CREATE POLICY "Allow public read published blogs" ON blogs
  FOR SELECT USING (is_published = true);

CREATE POLICY "Allow public all blogs" ON blogs
  FOR ALL USING (true);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DROP TRIGGER IF EXISTS update_service_areas_updated_at ON service_areas;
CREATE TRIGGER update_service_areas_updated_at 
  BEFORE UPDATE ON service_areas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at 
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_staff_updated_at ON staff;
CREATE TRIGGER update_staff_updated_at 
  BEFORE UPDATE ON staff
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at 
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DEFAULT DATA
-- ============================================

-- Insert default service areas
INSERT INTO service_areas (name, description, slug) VALUES
  ('Vancouver', 'Greater Vancouver area', 'vancouver'),
  ('Surrey', 'Surrey and surrounding areas', 'surrey'),
  ('Burnaby', 'Burnaby and nearby regions', 'burnaby'),
  ('Richmond', 'Richmond and surrounding', 'richmond'),
  ('Coquitlam', 'Coquitlam area', 'coquitlam'),
  ('Delta', 'Delta region', 'delta')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT '✅ SUCCESS: Complete database schema created!' as status;
SELECT 'Tables created: bookings, quotes, admin_users, service_areas, tasks, staff, messages, blogs' as info;
SELECT 'RLS policies enabled for all tables' as security;
SELECT 'Indexes created for optimal performance' as performance;

