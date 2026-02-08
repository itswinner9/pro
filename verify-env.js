// Quick script to verify environment variables are loaded
// Run: node verify-env.js

require('dotenv').config({ path: '.env.local' });

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

console.log('\n🔍 Environment Variables Check:\n');
console.log('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:', publishableKey ? `✅ Set (${publishableKey.substring(0, 20)}...)` : '❌ Missing');
console.log('CLERK_SECRET_KEY:', secretKey ? `✅ Set (${secretKey.substring(0, 20)}...)` : '❌ Missing');

if (publishableKey && publishableKey.endsWith('$')) {
  console.log('\n⚠️  WARNING: Publishable key ends with $ - this might cause issues!');
}

if (!publishableKey || !secretKey) {
  console.log('\n❌ Missing required keys. Please check your .env.local file.');
  process.exit(1);
} else {
  console.log('\n✅ All Clerk keys are set correctly!');
}

