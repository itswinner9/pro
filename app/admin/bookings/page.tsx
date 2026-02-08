import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canViewAdmin, canEdit } from "@/lib/auth";
import { Image as ImageIcon, Calendar, Phone, Mail, MapPin, FileText } from "lucide-react";
import { format } from "date-fns";
import { SERVICES } from "@/lib/types";
import BookingManagement from "@/components/admin/BookingManagement";

export default async function AdminBookingsPage() {
  const canView = await canViewAdmin();
  if (!canView) {
    redirect("/");
  }

  const canEditData = await canEdit();

  const supabase = await createClient();
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch staff for assignment
  const { data: staff } = await supabase
    .from("staff")
    .select("id, name, email")
    .eq("is_active", true)
    .order("name");

  // Debug: Log bookings data
  if (error) {
    console.error("Bookings fetch error:", error);
  } else {
    console.log("Bookings fetched:", bookings?.length || 0, "bookings");
  }

  const getServiceName = (serviceId: string) => {
    return SERVICES.find((s) => s.id === serviceId)?.title || serviceId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Service Appointments</h1>
          <p className="text-slate-500 mt-1">Manage all booking requests</p>
        </div>
        {error ? (
          <div className="luxury-card bg-white p-8 rounded-[24px] shadow-sm border border-red-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-red-600 font-semibold">Error loading bookings</p>
                <p className="text-red-500 text-sm">{error.message}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="luxury-card bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
                  {/* Header */}
                  <div className="p-8 border-b border-slate-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="font-quantum text-xl font-bold text-slate-900 mb-6">{booking.name}</h2>
                        
                        {/* Contact Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                              <Phone className="w-5 h-5 text-[var(--primary-color)]" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                              <p className="text-sm font-semibold text-slate-900">{booking.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                              <Mail className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                              <p className="text-sm font-semibold text-slate-900">{booking.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address</p>
                              <p className="text-sm font-semibold text-slate-900">{booking.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <BookingManagement 
                          bookingId={booking.id} 
                          currentStatus={booking.status} 
                          bookingPrice={booking.quote_price}
                          assignedTo={booking.assigned_to}
                          customerEmail={booking.email}
                          customerName={booking.name}
                          canEdit={canEditData}
                          staffList={staff || []}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Details Section */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Service Details */}
                      <div>
                        <h3 className="font-quantum text-sm font-bold text-[var(--primary-color)] mb-4 tracking-widest uppercase">
                          Service Details
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <span className="text-sm font-semibold text-slate-600">Service Type</span>
                            <span className="text-sm font-bold text-slate-900">{getServiceName(booking.service)}</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <span className="text-sm font-semibold text-slate-600">Preferred Date</span>
                            <span className="text-sm font-bold text-slate-900">{format(new Date(booking.date), "PPP")}</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <span className="text-sm font-semibold text-slate-600">Preferred Time</span>
                            <span className="text-sm font-bold text-slate-900">{booking.time}</span>
                          </div>
                          {booking.quote_price && (
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                              <span className="text-sm font-semibold text-green-700">Final Price</span>
                              <span className="text-lg font-bold text-green-700">${parseFloat(booking.quote_price.toString()).toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Additional Info */}
                      <div>
                        <h3 className="font-quantum text-sm font-bold text-[var(--primary-color)] mb-4 tracking-widest uppercase">
                          Additional Information
                        </h3>
                        <div className="space-y-4">
                          {booking.message && (
                            <div className="p-4 bg-slate-50 rounded-xl">
                              <p className="text-sm font-semibold text-slate-600 mb-2">Message</p>
                              <p className="text-sm text-slate-900">{booking.message}</p>
                            </div>
                          )}
                          <div className="p-4 bg-slate-50 rounded-xl">
                            <p className="text-sm font-semibold text-slate-600 mb-2">Created</p>
                            <p className="text-sm text-slate-900">{format(new Date(booking.created_at), "PPP 'at' p")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Images Section */}
                    {booking.images && booking.images.length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-quantum text-sm font-bold text-[var(--primary-color)] mb-4 tracking-widest uppercase">
                          Uploaded Images
                        </h3>
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
                                className="w-full h-32 object-cover rounded-xl"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-white" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="luxury-card bg-white p-16 rounded-[24px] shadow-sm border border-slate-100 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="font-quantum text-xl font-bold text-slate-900 mb-2">No Bookings Found</h3>
                <p className="text-slate-500">Service appointments will appear here once customers book them.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
