-- Extended Admin Schema for PlusPro
-- Run this in Supabase SQL Editor

-- Drop existing tables if needed (be careful in production)
-- DROP TABLE IF EXISTS blogs CASCADE;
-- DROP TABLE IF EXISTS staff CASCADE;
-- DROP TABLE IF EXISTS tasks CASCADE;
-- DROP TABLE IF EXISTS service_areas CASCADE;
-- DROP TABLE IF EXISTS admin_users CASCADE;
-- DROP TABLE IF EXISTS messages CASCADE;

-- Service Areas Table (CRUD)
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

-- Users Table (for manual user management and registered users)
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

-- Messages Table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_areas_slug ON service_areas(slug);
CREATE INDEX IF NOT EXISTS idx_service_areas_active ON service_areas(is_active);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_source ON admin_users(source);
CREATE INDEX IF NOT EXISTS idx_staff_role ON staff(role);
CREATE INDEX IF NOT EXISTS idx_staff_active ON staff(is_active);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);

-- Enable Row Level Security
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_areas
CREATE POLICY "Allow authenticated read service_areas" ON service_areas
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert service_areas" ON service_areas
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update service_areas" ON service_areas
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete service_areas" ON service_areas
  FOR DELETE TO authenticated USING (true);

-- Public read for blogs (published only)
CREATE POLICY "Allow public read published blogs" ON blogs
  FOR SELECT USING (is_published = true);

-- RLS Policies for tasks
CREATE POLICY "Allow authenticated all tasks" ON tasks
  FOR ALL TO authenticated USING (true);

-- RLS Policies for admin_users
CREATE POLICY "Allow authenticated all admin_users" ON admin_users
  FOR ALL TO authenticated USING (true);

-- RLS Policies for staff
CREATE POLICY "Allow authenticated all staff" ON staff
  FOR ALL TO authenticated USING (true);

-- RLS Policies for messages
CREATE POLICY "Allow public insert messages" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated all messages" ON messages
  FOR ALL TO authenticated USING (true);

-- RLS Policies for blogs (admin)
CREATE POLICY "Allow authenticated all blogs" ON blogs
  FOR ALL TO authenticated USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_service_areas_updated_at BEFORE UPDATE ON service_areas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some default service areas
INSERT INTO service_areas (name, description, slug) VALUES
  ('Vancouver', 'Greater Vancouver area', 'vancouver'),
  ('Surrey', 'Surrey and surrounding areas', 'surrey'),
  ('Burnaby', 'Burnaby and nearby regions', 'burnaby'),
  ('Richmond', 'Richmond and surrounding', 'richmond'),
  ('Coquitlam', 'Coquitlam area', 'coquitlam'),
  ('Delta', 'Delta region', 'delta')
ON CONFLICT (slug) DO NOTHING;

-- Verification
SELECT 'SUCCESS: Admin schema created!' as status;

