import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canViewAdmin } from "@/lib/auth";
import CustomersClient from "@/components/admin/CustomersClient";

export default async function CustomersPage() {
  const canView = await canViewAdmin();
  if (!canView) {
    redirect("/");
  }

  const supabase = await createClient();

  // Fetch all bookings and quotes to get unique customers
  const { data: bookings } = await supabase
    .from("bookings")
    .select("name, email, phone")
    .order("created_at", { ascending: false });

  const { data: quotes } = await supabase
    .from("quotes")
    .select("name, email, phone")
    .order("created_at", { ascending: false });

  // Combine and deduplicate customers
  const allCustomers = [
    ...(bookings || []).map((b) => ({ ...b, source: "booking" })),
    ...(quotes || []).map((q) => ({ ...q, source: "quote" })),
  ];

  // Deduplicate by email
  const uniqueCustomers = Array.from(
    new Map(allCustomers.map((c) => [c.email, c])).values()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 mt-1">View all your customers</p>
        </div>
        <CustomersClient customers={uniqueCustomers} />
      </div>
    </div>
  );
}

