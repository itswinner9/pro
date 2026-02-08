# How to Set User Roles (Admin, Supervisor, Manager, User)

## Method 1: Using Clerk Dashboard (Recommended)

### Step-by-Step Instructions:

1. **Go to Clerk Dashboard**
   - Visit: https://dashboard.clerk.com
   - Sign in to your account

2. **Navigate to Users**
   - Click on **"Users"** in the left sidebar
   - You'll see a list of all registered users

3. **Select the User**
   - Click on the user you want to make admin or supervisor
   - This opens the user's detail page

4. **Go to Metadata Tab**
   - Click on the **"Metadata"** tab at the top
   - You'll see two sections: **Public metadata** and **Private metadata**

5. **Add Role to Public Metadata**
   - In the **Public metadata** section, click **"Edit"** or the **"+"** button
   - Add a new field:
     - **Key**: `role`
     - **Value**: `admin` (or `supervisor`, `manager`, `user`)
   - Click **"Save"**

### Example JSON for Public Metadata:

```json
{
  "role": "admin"
}
```

Or for supervisor:
```json
{
  "role": "supervisor"
}
```

## Available Roles:

- **`admin`** - Full access, can edit everything in admin dashboard
- **`supervisor`** - Can view admin dashboard (read-only, cannot edit)
- **`manager`** - Can view and edit (similar to admin)
- **`user`** - Normal user (default, can only access profile page)

## Method 2: Using Clerk API (Advanced)

If you want to set roles programmatically, you can use the Clerk Backend API:

```typescript
import { clerkClient } from '@clerk/nextjs/server';

// Set user role
await clerkClient.users.updateUserMetadata('user_id_here', {
  publicMetadata: {
    role: 'admin'
  }
});
```

## Verification:

After setting the role:

1. **Sign out** from your application (if you're logged in as that user)
2. **Sign in again** - the role change takes effect immediately
3. **Visit `/admin/dashboard`** - you should now have access based on your role

## Troubleshooting:

### Role not working?
- Make sure you added it to **Public metadata** (not Private metadata)
- The key must be exactly `role` (lowercase)
- The value must be exactly: `admin`, `supervisor`, `manager`, or `user`
- Sign out and sign back in after changing the role

### Can't see Metadata tab?
- Make sure you're on the correct Clerk plan (Metadata is available on all plans)
- Try refreshing the page

### User still can't access admin?
- Check the role spelling (must be lowercase: `admin`, not `Admin`)
- Verify the role is in Public metadata, not Private metadata
- Clear browser cache and cookies
- Sign out and sign back in

## Quick Reference:

| Role | Can View Admin | Can Edit | Access Level |
|------|---------------|----------|--------------|
| `admin` | ✅ Yes | ✅ Yes | Full access |
| `supervisor` | ✅ Yes (Read-only) | ❌ No | View only |
| `manager` | ✅ Yes | ✅ Yes | Full access |
| `user` | ❌ No | ❌ No | Profile only |

