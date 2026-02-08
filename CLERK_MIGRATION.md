# Migration from Supabase Auth to Clerk

## What Changed

✅ **Authentication**: Now using Clerk instead of Supabase Auth
✅ **User Roles**: Admin, Supervisor, Manager, User
✅ **Role-Based Access**: Different permissions for each role
✅ **User Registration**: Normal users can sign up
✅ **Profile Page**: Users can manage their profile

## New Features

1. **User Registration**: Anyone can sign up at `/sign-up`
2. **Role-Based Dashboard**: 
   - Admin: Full access, can edit
   - Supervisor: View only (read-only)
   - Manager: Can edit
   - User: Profile only
3. **Profile Management**: Users can update email, password, etc. at `/profile`

## Setup Required

1. **Install Clerk package**: `npm install @clerk/nextjs`
2. **Get Clerk keys** from https://clerk.com
3. **Add to `.env.local`**:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
4. **Set user roles** in Clerk Dashboard → Users → Metadata

## Database

- Still using Supabase for database (bookings, quotes)
- Only authentication switched to Clerk
- RLS policies updated to allow authenticated users

