# Quick Guide: Make User Admin or Supervisor

## 🚀 Fast Method (5 Steps)

1. **Go to**: https://dashboard.clerk.com
2. **Click**: "Users" (left sidebar)
3. **Click**: On the user you want to make admin
4. **Click**: "Metadata" tab → "Public metadata"
5. **Add**:
   - Key: `role`
   - Value: `admin` (or `supervisor`)

## 📝 Visual Guide

```
Clerk Dashboard
  └─ Users
      └─ [Click User]
          └─ Metadata Tab
              └─ Public metadata
                  └─ Add Field:
                      Key: role
                      Value: admin
```

## ✅ After Setting Role

1. User must **sign out** and **sign back in**
2. Then they can access `/admin/dashboard`

## 🎯 Role Options

- `admin` - Full access, can edit
- `supervisor` - View only (read-only)
- `manager` - Full access, can edit
- `user` - Normal user (default)

That's it! 🎉

