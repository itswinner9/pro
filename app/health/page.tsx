import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export default async function HealthPage() {
  const checks = {
    supabase: false,
    clerk: false,
    tables: [] as string[],
    errors: [] as string[],
  };

  // Check Supabase connection
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("bookings").select("id").limit(1);
    checks.supabase = !error;
    if (error) checks.errors.push(`Supabase: ${error.message}`);
  } catch (error) {
    checks.errors.push(`Supabase connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Check Clerk
  try {
    const user = await getCurrentUser();
    checks.clerk = true;
  } catch (error) {
    checks.errors.push(`Clerk: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Check tables
  try {
    const supabase = await createClient();
    const tables = ['bookings', 'quotes', 'staff', 'messages', 'blogs', 'service_areas', 'admin_users'];
    for (const table of tables) {
      const { error } = await supabase.from(table).select("id").limit(1);
      if (!error) {
        checks.tables.push(table);
      }
    }
  } catch (error) {
    checks.errors.push(`Table check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">System Health Check</h1>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={checks.supabase ? "text-green-600" : "text-red-600"}>
                  {checks.supabase ? "✅" : "❌"}
                </span>
                <span>Supabase Connection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={checks.clerk ? "text-green-600" : "text-red-600"}>
                  {checks.clerk ? "✅" : "❌"}
                </span>
                <span>Clerk Authentication</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Database Tables</h2>
            <div className="grid grid-cols-2 gap-2">
              {['bookings', 'quotes', 'staff', 'messages', 'blogs', 'service_areas', 'admin_users'].map((table) => (
                <div key={table} className="flex items-center gap-2">
                  <span className={checks.tables.includes(table) ? "text-green-600" : "text-red-600"}>
                    {checks.tables.includes(table) ? "✅" : "❌"}
                  </span>
                  <span>{table}</span>
                </div>
              ))}
            </div>
          </div>

          {checks.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-red-800">Errors</h2>
              <ul className="list-disc list-inside space-y-1">
                {checks.errors.map((error, i) => (
                  <li key={i} className="text-red-700">{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Environment Variables</h2>
            <div className="space-y-2 text-sm">
              <div>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</div>
              <div>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "✅ Set" : "❌ Missing"}</div>
              <div>CLERK_SECRET_KEY: {process.env.CLERK_SECRET_KEY ? "✅ Set" : "❌ Missing"}</div>
              <div>RESEND_API_KEY: {process.env.RESEND_API_KEY ? "✅ Set" : "❌ Missing"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

