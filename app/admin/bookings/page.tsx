import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import AdminLogout from "@/components/admin/AdminLogout";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { SERVICES } from "@/lib/types";
import BookingStatusUpdate from "@/components/admin/BookingStatusUpdate";

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  const getServiceName = (serviceId: string) => {
    return SERVICES.find((s) => s.id === serviceId)?.title || serviceId;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-quantum text-primary">Bookings</h1>
            </div>
            <AdminLogout />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-red-600">Error loading bookings: {error.message}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{booking.name}</CardTitle>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Service:</strong> {getServiceName(booking.service)}</p>
                          <p><strong>Date:</strong> {format(new Date(booking.date), "PPP")}</p>
                          <p><strong>Time:</strong> {booking.time}</p>
                          <p><strong>Phone:</strong> {booking.phone}</p>
                          <p><strong>Email:</strong> {booking.email}</p>
                          <p><strong>Address:</strong> {booking.address}</p>
                          {booking.message && (
                            <p><strong>Message:</strong> {booking.message}</p>
                          )}
                          <p><strong>Created:</strong> {format(new Date(booking.created_at), "PPP 'at' p")}</p>
                        </div>
                      </div>
                      <BookingStatusUpdate bookingId={booking.id} currentStatus={booking.status} />
                    </div>
                  </CardHeader>
                  {booking.images && booking.images.length > 0 && (
                    <CardContent>
                      <p className="text-sm font-semibold mb-2">Uploaded Images:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {booking.images.map((imageUrl: string, index: number) => (
                          <a
                            key={index}
                            href={imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group"
                          >
                            <img
                              src={imageUrl}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-white" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-600">No bookings found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

