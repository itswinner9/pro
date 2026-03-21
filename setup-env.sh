#!/bin/bash

# Create .env.local file with Clerk keys
cat > .env.local << 'EOF'
# Clerk Authentication
# IMPORTANT: Make sure there's no $ or trailing characters at the end of keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YXBwYXJlbnQtdmVydmV0LTg2LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_ZYKuxKFLPWRCALZ3DpZRfwGVaB635YIgQAaHDvrukN

# Supabase (for database)
NEXT_PUBLIC_SUPABASE_URL=https://opuaowxmhfiortphwasz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdWFvd3htaGZpb3J0cGh3YXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTQ2MTUsImV4cCI6MjA4NTk3MDYxNX0.ZLOdGvSqzekmTQNqgpJvIGWPHAP8_n-4kdcA5MDlA6c
EOF

echo "✅ .env.local file created successfully!"
echo ""
echo "⚠️  IMPORTANT: Please verify the keys are correct:"
echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY should NOT end with $"
echo "   - Make sure there are no extra spaces or characters"
echo ""
echo "📝 Next steps:"
echo "   1. Restart your dev server: npm run dev"
echo "   2. Set user roles in Clerk Dashboard"
