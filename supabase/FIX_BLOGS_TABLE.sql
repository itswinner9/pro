-- ============================================
-- FIX BLOGS TABLE - Add Missing Columns
-- Run this if you already have the blogs table
-- ============================================

-- Add missing columns to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS author TEXT;

ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS category TEXT;

ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Fix column name if using 'published' instead of 'is_published'
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blogs' AND column_name = 'published') THEN
    ALTER TABLE blogs RENAME COLUMN published TO is_published;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_author ON blogs(author);
CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON blogs(is_published);

SELECT '✅ Blogs table fixed! All columns added.' as status;

