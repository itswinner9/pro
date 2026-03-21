# Complete Clerk Authentication Setup

## ✅ What's Been Done

1. **Installed Clerk**: `@clerk/nextjs` package added
2. **Created Role System**: Admin, Supervisor, Manager, User roles
3. **Updated Authentication**: All auth now uses Clerk
4. **Role-Based Access Control**:
   - **Admin**: Full access, can edit everything
   - **Supervisor**: Can view admin dashboard (read-only, cannot edit)
   - **Manager**: Can view and edit (similar to admin)
   - **User**: Normal user, can only access profile page
5. **User Registration**: Normal users can sign up at `/sign-up`
6. **Profile Page**: Users can manage their account at `/profile`
7. **Updated Admin Pages**: All admin pages now use Clerk auth and role checks

## 🚀 Setup Steps

### Step 1: Get Clerk Keys

1. Go to https://clerk.com
2. Sign up or log in
3. Create a new application
4. Choose **Next.js** as framework
5. Copy your keys from **API Keys** section:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_`)
   - `CLERK_SECRET_KEY` (starts with `sk_`)

### Step 2: Update Environment Variables

Add to your `.env.local` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (for database - keep existing)
NEXT_PUBLIC_SUPABASE_URL=https://opuaowxmhfiortphwasz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 3: Set User Roles

#### For Admin Access:

1. Go to Clerk Dashboard → **Users**
2. Find your user (or create one)
3. Click on the user
4. Go to **Metadata** tab
5. Add to **Public metadata**:
   ```json
   {
     "role": "admin"
   }
   ```

#### Available Roles:
- `admin` - Full access, can edit everything
- `supervisor` - Can view admin dashboard (read-only)
- `manager` - Can view and edit
- `user` - Normal user (default, can only access profile)

### Step 4: Restart Dev Server

```bash
npm run dev
```

## 📋 User Roles & Permissions

| Role | View Admin Dashboard | Edit Data | Access Profile |
|------|---------------------|-----------|----------------|
| **admin** | ✅ Yes | ✅ Yes | ✅ Yes |
| **supervisor** | ✅ Yes (Read-only) | ❌ No | ✅ Yes |
| **manager** | ✅ Yes | ✅ Yes | ✅ Yes |
| **user** | ❌ No | ❌ No | ✅ Yes |

## 🔐 Routes

- `/sign-in` - Sign in page
- `/sign-up` - User registration (defaults to "user" role)
- `/profile` - User profile management (all authenticated users)
- `/admin/dashboard` - Admin dashboard (admin, supervisor, manager only)
- `/admin/bookings` - View bookings (admin, supervisor, manager only)
- `/admin/quotes` - View quotes (admin, supervisor, manager only)

## 🎯 Testing

1. **Test User Registration**:
   - Go to `/sign-up`
   - Create an account
   - Should default to "user" role
   - Can access `/profile` but not `/admin/dashboard`

2. **Test Admin Access**:
   - Set role to "admin" in Clerk Dashboard
   - Go to `/admin/dashboard`
   - Should see full dashboard with edit capabilities

3. **Test Supervisor Access**:
   - Set role to "supervisor" in Clerk Dashboard
   - Go to `/admin/dashboard`
   - Should see dashboard but with "Read Only" badge
   - Cannot edit statuses

4. **Test Manager Access**:
   - Set role to "manager" in Clerk Dashboard
   - Go to `/admin/dashboard`
   - Should see dashboard with edit capabilities

## 🔧 Troubleshooting

### "Access denied" error
- Check that user has correct role in Clerk Dashboard → Users → Metadata
- Role must be in **Public metadata** as JSON: `{"role": "admin"}`

### Can't access admin dashboard
- Verify role is set correctly in Clerk Dashboard
- Check that you're signed in
- Try signing out and signing back in

### Profile page not working
- All authenticated users should be able to access `/profile`
- Make sure you're signed in

## 📝 Notes

- **Database**: Still using Supabase for bookings/quotes data
- **Authentication**: Now using Clerk (not Supabase Auth)
- **Default Role**: New users default to "user" role
- **Role Changes**: Update roles in Clerk Dashboard → Users → Metadata

