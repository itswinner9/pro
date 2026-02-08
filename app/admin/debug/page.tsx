import { createClient } from "@/lib/supabase/server";

export default async function DebugPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Debug Page</h1>
        
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2 font-mono text-sm">
            <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</p>
            <p>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          {error && (
            <div className="bg-red-500/20 border border-red-500 p-4 rounded mb-4">
              <p className="text-red-300">Error: {error.message}</p>
            </div>
          )}
          {user ? (
            <div className="bg-green-500/20 border border-green-500 p-4 rounded">
              <p className="text-green-300 mb-2">✅ User is authenticated!</p>
              <div className="text-sm space-y-1">
                <p>Email: {user.email}</p>
                <p>ID: {user.id}</p>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-500/20 border border-yellow-500 p-4 rounded">
              <p className="text-yellow-300">❌ No user authenticated</p>
            </div>
          )}
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-2">
            <a href="/admin/login" className="block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Go to Login
            </a>
            <a href="/admin/dashboard" className="block bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

