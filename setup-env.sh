#!/bin/bash

# Create .env.local file with Supabase credentials
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://opuaowxmhfiortphwasz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdWFvd3htaGZpb3J0cGh3YXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTQ2MTUsImV4cCI6MjA4NTk3MDYxNX0.ZLOdGvSqzekmTQNqgpJvIGWPHAP8_n-4kdcA5MDlA6c
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF

echo "✅ Created .env.local file"
echo "⚠️  Don't forget to add your SUPABASE_SERVICE_ROLE_KEY from Supabase Dashboard > Settings > API"

