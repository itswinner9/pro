# Clerk Authentication Setup Guide

## Step 1: Create Clerk Account

1. Go to https://clerk.com
2. Sign up for a free account
3. Create a new application
4. Choose "Next.js" as your framework

## Step 2: Get Your Clerk Keys

1. In Clerk Dashboard, go to **API Keys**
2. Copy these values:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

## Step 3: Add Environment Variables

Create or update `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (for database)
NEXT_PUBLIC_SUPABASE_URL=https://opuaowxmhfiortphwasz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 4: Configure Clerk Webhooks (Optional)

1. In Clerk Dashboard, go to **Webhooks**
2. Add webhook endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`

## Step 5: Set Up User Roles

### Option A: Using Clerk Dashboard (Recommended)

1. Go to **Users** in Clerk Dashboard
2. Click on a user
3. Go to **Metadata** tab
4. Add to **Public metadata**:
   ```json
   {
     "role": "admin"
   }
   ```

### Option B: Using Clerk API

You can set roles programmatically when users sign up.

## Step 6: Install Dependencies

```bash
npm install @clerk/nextjs
```

## Step 7: Restart Dev Server

```bash
npm run dev
```

## User Roles

- **admin**: Full access, can edit everything
- **supervisor**: Can view admin dashboard but read-only (cannot edit)
- **manager**: Can view and edit (similar to admin)
- **user**: Normal user, can only access profile page

## Setting Roles for Users

### In Clerk Dashboard:
1. Go to **Users**
2. Select a user
3. Click **Metadata** tab
4. Add to **Public metadata**:
   ```json
   {
     "role": "admin"
   }
   ```

### Available Roles:
- `admin` - Full access
- `supervisor` - Read-only admin access
- `manager` - Can edit
- `user` - Normal user (default)

## Testing

1. **Sign Up**: Go to `/sign-up` and create an account (defaults to "user" role)
2. **Sign In**: Go to `/sign-in` to log in
3. **Admin Access**: Set role to "admin" in Clerk Dashboard to access `/admin/dashboard`
4. **Profile**: All users can access `/profile` to manage their account

## Important Notes

- New users default to "user" role
- Only admin/supervisor/manager can access admin dashboard
- Supervisor can view but cannot edit (read-only)
- Admin and manager can edit everything
- Normal users can only access their profile page

