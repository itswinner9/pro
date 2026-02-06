import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, LogOut } from "lucide-react";
import AdminLogout from "@/components/admin/AdminLogout";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Get counts
  const { count: bookingsCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true });

  const { count: quotesCount } = await supabase
    .from("quotes")
    .select("*", { count: "exact", head: true });

  const { count: newBookingsCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  const { count: newQuotesCount } = await supabase
    .from("quotes")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-quantum text-primary">Admin Dashboard</h1>
            <AdminLogout />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-3xl font-semibold">{bookingsCount || 0}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">New Bookings</p>
                  <p className="text-3xl font-semibold text-primary">{newBookingsCount || 0}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Quotes</p>
                  <p className="text-3xl font-semibold">{quotesCount || 0}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">New Quotes</p>
                  <p className="text-3xl font-semibold text-primary">{newQuotesCount || 0}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href="/admin/bookings">View All Bookings</Link>
                </Button>
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href="/admin/quotes">View All Quotes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Recent bookings and quotes will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

