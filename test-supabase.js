// Test Supabase connection
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://opuaowxmhfiortphwasz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdWFvd3htaGZpb3J0cGh3YXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTQ2MTUsImV4cCI6MjA4NTk3MDYxNX0.ZLOdGvSqzekmTQNqgpJvIGWPHAP8_n-4kdcA5MDlA6c'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    console.log('URL:', supabaseUrl)
    
    // Test 1: Check if we can reach Supabase
    const { data, error } = await supabase
      .from('quotes')
      .select('count')
      .single()
    
    if (error) {
      console.error('Connection test failed:', error)
    } else {
      console.log('Connection successful! Count:', data)
    }
    
    // Test 2: Try to sign in (replace with your actual admin credentials)
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'your-admin-email@example.com', // Replace with your admin email
      password: 'your-password' // Replace with your admin password
    })
    
    if (authError) {
      console.log('Auth test (expected to fail with dummy credentials):', authError.message)
    } else {
      console.log('Auth successful:', authData)
    }
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testConnection()
