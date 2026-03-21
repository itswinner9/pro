# Supabase Setup Instructions

## ✅ Step 1: Environment Variables (Already Configured)

Your `.env.local` file has been created with your Supabase credentials.

**⚠️ Important:** You still need to add your **Service Role Key**:
1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/opuaowxmhfiortphwasz
2. Navigate to **Settings** > **API**
3. Copy the **service_role** key (keep this secret!)
4. Replace `your_service_role_key_here` in `.env.local`

## Step 2: Run Database Schema

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the entire contents of `supabase/schema.sql`
5. Click **Run** (or press Cmd/Ctrl + Enter)

This will create:
- `bookings` table
- `quotes` table
- Indexes for performance
- Row Level Security (RLS) policies

## Step 3: Create Storage Buckets

1. Go to **Storage** in your Supabase Dashboard
2. Click **New bucket**
3. Create bucket: `booking-images`
   - Set as **Public bucket** ✅
   - Click **Create bucket**
4. Create bucket: `quote-images`
   - Set as **Public bucket** ✅
   - Click **Create bucket**

## Step 4: Set Up Storage Policies

For each bucket (`booking-images` and `quote-images`):

1. Click on the bucket name
2. Go to **Policies** tab
3. Click **New Policy**
4. Select **For full customization**
5. Add this policy:

**Policy Name:** Allow public uploads
**Policy Definition:**
```sql
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'booking-images');
```

Repeat for `quote-images` bucket (change bucket_id).

**Alternative:** You can use the Supabase Dashboard UI to create policies:
- **Allow public uploads** - INSERT permission for public
- **Allow public reads** - SELECT permission for public

## Step 5: Create Admin User

1. Go to **Authentication** > **Users** in Supabase Dashboard
2. Click **Add user** > **Create new user**
3. Enter email and password for your admin account
4. **Important:** Note this email/password - you'll use it to log into `/admin/login`

## Step 6: Set Up Admin Access Policies (Optional)

To allow admin users to read bookings and quotes:

1. Go to **SQL Editor**
2. Run this query:

```sql
-- Allow authenticated users to read bookings
CREATE POLICY "Allow authenticated read bookings" ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to read quotes
CREATE POLICY "Allow authenticated read quotes" ON quotes
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update bookings
CREATE POLICY "Allow authenticated update bookings" ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to update quotes
CREATE POLICY "Allow authenticated update quotes" ON quotes
  FOR UPDATE
  TO authenticated
  USING (true);
```

## Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm install
   npm run dev
   ```

2. Visit http://localhost:3000
3. Try submitting a booking or quote request
4. Check your Supabase Dashboard to see if data appears in the tables

## Troubleshooting

- **Can't insert bookings/quotes?** Check RLS policies allow public inserts
- **Images not uploading?** Verify storage buckets exist and policies allow uploads
- **Admin login not working?** Make sure you created a user in Authentication > Users
- **Can't see data in admin?** Check admin read policies are set up

## Next Steps

- Update contact information in `lib/utils.ts`
- Add Quantum font files to `/public/fonts/`
- Configure email notifications (see `SETUP.md`)
- Deploy to Netlify

