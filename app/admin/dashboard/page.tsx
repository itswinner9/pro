import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canViewAdmin, canEdit, getUserRole, getCurrentUser } from "@/lib/auth";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboardPage() {
  const canView = await canViewAdmin();
  
  if (!canView) {
    redirect("/");
  }

  const canEditData = await canEdit();
  const role = await getUserRole();
  const user = await getCurrentUser();
  
  // Extract only serializable data from user object
  const userData = user ? {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
  } : null;
  
  const supabase = await createClient();

  // Fetch bookings and quotes
  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: quotes, error: quotesError } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  // Debug: Log quotes data
  if (quotesError) {
    console.error("Quotes fetch error:", quotesError);
  } else {
    console.log("Quotes fetched:", quotes?.length || 0, "quotes");
  }

  // Fetch staff for active technicians count
  const { data: staff } = await supabase
    .from("staff")
    .select("id")
    .eq("is_active", true);

  // Fetch all users - combine manual users, booking users, and quote users
  const { data: manualUsers } = await supabase
    .from("admin_users")
    .select("email");

  // Get unique users from bookings and quotes
  const bookingEmails = new Set(bookings?.map((b) => b.email.toLowerCase()) || []);
  const quoteEmails = new Set(quotes?.map((q) => q.email.toLowerCase()) || []);
  const manualEmails = new Set(manualUsers?.map((u) => u.email.toLowerCase()) || []);
  
  // Combine all unique emails
  const allUserEmails = new Set([
    ...bookingEmails,
    ...quoteEmails,
    ...manualEmails,
  ]);

  // Calculate revenue from completed bookings
  // You can add a price field to bookings table later for accurate revenue
  const completedBookings = bookings?.filter((b) => b.status === "completed").length || 0;

  if (bookingsError) {
    console.error("Bookings error:", bookingsError);
  }
  if (quotesError) {
    console.error("Quotes error:", quotesError);
  }

  // Calculate stats
  const stats = {
    totalBookings: bookings?.length || 0,
    pendingQuotes: quotes?.filter((q) => q.status === "new" || q.status === "quoted").length || 0,
    revenue: completedBookings * 500, // Placeholder - add price field to bookings for accurate revenue
    activeTechnicians: staff?.length || 0,
    totalUsers: allUserEmails.size, // Total unique users (registered + booking + quote)
  };

  return (
    <AdminDashboardClient
      bookings={bookings || []}
      quotes={quotes || []}
      user={userData}
      role={role}
      canEdit={canEditData}
      stats={stats}
    />
  );
}
