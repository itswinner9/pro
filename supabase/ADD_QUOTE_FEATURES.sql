-- ============================================
-- ADD QUOTE MANAGEMENT FEATURES
-- Run this to add quote price and staff assignment
-- ============================================

-- Add quote_price column to quotes table
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS quote_price DECIMAL(10, 2);

-- Add assigned_to column to quotes (for staff assignment)
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES staff(id);

-- Add assigned_to column to bookings (for staff assignment)
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES staff(id);

-- Add quote_price column to bookings (for final price)
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS quote_price DECIMAL(10, 2);

-- Create index for assigned_to
CREATE INDEX IF NOT EXISTS idx_quotes_assigned_to ON quotes(assigned_to);
CREATE INDEX IF NOT EXISTS idx_bookings_assigned_to ON bookings(assigned_to);

SELECT '✅ Quote management features added!' as status;

