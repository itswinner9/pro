# 📋 SQL Schema Update Instructions

## ✅ Latest Complete Schema

**File**: `supabase/COMPLETE_SCHEMA.sql`

This is the **most up-to-date** SQL schema that includes:
- ✅ All core tables (bookings, quotes)
- ✅ All admin tables (admin_users, service_areas, tasks, staff, messages, blogs)
- ✅ Proper RLS policies for Clerk authentication
- ✅ All indexes for performance
- ✅ Triggers for updated_at timestamps
- ✅ Default service areas data

## 🚀 How to Apply

### Option 1: Fresh Start (Recommended for new setup)

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy the entire contents of `supabase/COMPLETE_SCHEMA.sql`
3. Paste into SQL Editor
4. Click **Run**
5. ✅ Done! All tables, policies, and indexes are created

### Option 2: Update Existing Database

If you already have some tables, the SQL is **idempotent** (safe to run multiple times):
- Uses `CREATE TABLE IF NOT EXISTS` - won't overwrite existing tables
- Uses `DROP POLICY IF EXISTS` before creating policies - updates policies safely
- Uses `ON CONFLICT DO NOTHING` for default data - won't duplicate

**Just run the complete schema** - it will update what's needed without breaking existing data.

## 📊 What's Included

### Core Tables
- `bookings` - Service booking requests
- `quotes` - Quote requests

### Admin Tables
- `admin_users` - User management (Clerk + manual users)
- `service_areas` - Service locations (Vancouver, Surrey, etc.)
- `tasks` - To-do list with priorities
- `staff` - Staff/technician management
- `messages` - Contact form messages
- `blogs` - Blog posts with SEO support

### Features
- ✅ Row Level Security (RLS) enabled
- ✅ Public insert for bookings/quotes/messages
- ✅ Authenticated read/update for admin dashboard
- ✅ Indexes for fast queries
- ✅ Auto-updating timestamps
- ✅ Default service areas pre-populated

## 🔒 Security Notes

- **Public can insert**: Bookings, quotes, and messages (for website forms)
- **Authenticated can read/update**: All tables (for admin dashboard)
- **Clerk authentication**: Works with Clerk (not Supabase Auth)

## 🧪 Testing

After running the schema, verify:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## 📝 Notes

- This schema is designed for **Clerk authentication** (not Supabase Auth)
- All tables use UUID primary keys
- Timestamps are timezone-aware
- Images stored as TEXT arrays (URLs to Supabase Storage)
- All status fields have CHECK constraints for data integrity

## 🆘 Troubleshooting

If you get errors:

1. **"relation already exists"**: The table already exists - this is fine, the schema is idempotent
2. **"policy already exists"**: Policies are dropped and recreated - this is expected
3. **"permission denied"**: Make sure you're running as the database owner in Supabase SQL Editor

## 🔄 Migration from Old Schema

If you have the old `schema.sql` or `ADMIN_SCHEMA.sql`:

1. The new `COMPLETE_SCHEMA.sql` is **backward compatible**
2. It will update policies and add missing tables
3. Existing data will be preserved
4. Just run the complete schema - it's safe!

---

**Last Updated**: Latest version with all features
**Compatible with**: Clerk Authentication
**Database**: Supabase PostgreSQL

