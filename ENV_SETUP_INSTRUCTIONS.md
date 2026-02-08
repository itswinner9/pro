# 🔐 Environment Variables Setup Instructions

## Step 1: Create `.env.local` File

Create a file named `.env.local` in the root of your project with the following content:

```env
# Clerk Authentication
# NOTE: Remove the $ at the end if it was copied from terminal
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YXBwYXJlbnQtdmVydmV0LTg2LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_ZYKuxKFLPWRCALZ3DpZRfwGVaB635YIgQAaHDvrukN

# Supabase (for database)
NEXT_PUBLIC_SUPABASE_URL=https://opuaowxmhfiortphwasz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdWFvd3htaGZpb3J0cGh3YXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTQ2MTUsImV4cCI6MjA4NTk3MDYxNX0.ZLOdGvSqzekmTQNqgpJvIGWPHAP8_n-4kdcA5MDlA6c
```

## ⚠️ Important Note

Your Clerk publishable key appears to end with `$`. If you encounter authentication errors, please:
1. Go to your Clerk Dashboard → API Keys
2. Copy the publishable key again (make sure there's no trailing `$`)
3. Update the key in `.env.local`

## Step 2: Restart Dev Server

After creating `.env.local`, restart your development server:

```bash
npm run dev
```

## Step 3: Set User Roles in Clerk Dashboard

1. Go to https://dashboard.clerk.com
2. Navigate to **Users** in the sidebar
3. Click on a user (or create a new one)
4. Go to the **Metadata** tab
5. In **Public metadata**, add:
   ```json
   {
     "role": "admin"
   }
   ```

### Available Roles:
- `admin` - Full access, can edit everything
- `supervisor` - Can view admin dashboard (read-only, cannot edit)
- `manager` - Can view and edit
- `user` - Normal user (default, can only access profile)

## Step 4: Test the System

1. **Test User Registration**:
   - Visit `http://localhost:3000/sign-up`
   - Create a new account
   - Should default to "user" role
   - Can access `/profile` but not `/admin/dashboard`

2. **Test Admin Access**:
   - Set role to "admin" in Clerk Dashboard (see Step 3)
   - Visit `http://localhost:3000/admin/dashboard`
   - Should see full dashboard with edit capabilities

3. **Test Supervisor Access**:
   - Set role to "supervisor" in Clerk Dashboard
   - Visit `http://localhost:3000/admin/dashboard`
   - Should see dashboard with "Read Only" badge
   - Cannot edit statuses

4. **Test Profile Page**:
   - Any authenticated user can visit `/profile`
   - Can update email, password, etc.

## 🎯 Quick Reference

- **Sign Up**: `/sign-up` (anyone can register)
- **Sign In**: `/sign-in`
- **Profile**: `/profile` (all authenticated users)
- **Admin Dashboard**: `/admin/dashboard` (admin, supervisor, manager only)
- **Bookings**: `/admin/bookings` (admin, supervisor, manager only)
- **Quotes**: `/admin/quotes` (admin, supervisor, manager only)

## 🔧 Troubleshooting

### "Access denied" error
- Check that user has correct role in Clerk Dashboard → Users → Metadata
- Role must be in **Public metadata** as JSON: `{"role": "admin"}`

### Can't access admin dashboard
- Verify role is set correctly in Clerk Dashboard
- Check that you're signed in
- Try signing out and signing back in

### Authentication not working
- Verify `.env.local` file exists and has correct keys
- Restart dev server after creating/updating `.env.local`
- Check Clerk Dashboard to ensure keys are correct

