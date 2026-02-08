import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";
import { UserProfile } from "@clerk/nextjs";
import { Calendar, FileText, Clock, Image as ImageIcon, Settings, Lock } from "lucide-react";
import { format } from "date-fns";
import { SERVICES } from "@/lib/types";
import Link from "next/link";

interface ProfilePageProps {
  params: {
    rest?: string[];
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // If there are sub-routes (like /profile/account, /profile/security), 
  // let Clerk's UserProfile handle them
  const isSubRoute = params?.rest && params.rest.length > 0;

  // If it's a sub-route, just show Clerk's UserProfile
  if (isSubRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-6 sm:py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="font-quantum text-xl sm:text-2xl font-bold text-[var(--primary-color)]">
              Account Settings
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
            <UserProfile
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none bg-transparent",
                  navbar: "hidden",
                  navbarButton: "hidden",
                  page: "w-full",
                  formButtonPrimary: "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90",
                  formFieldInput: "border-slate-200 focus:border-[var(--primary-color)]",
                  formFieldLabel: "text-slate-700 font-medium",
                },
              }}
              routing="path"
              path="/profile"
            />
          </div>
        </div>
      </div>
    );
  }

  // Main profile page with bookings and quotes
  const userEmail = user.emailAddresses[0]?.emailAddress || "";
  const supabase = await createClient();

  // Fetch user's bookings and quotes
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("email", userEmail)
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: quotes } = await supabase
    .from("quotes")
    .select("*")
    .eq("email", userEmail)
    .order("created_at", { ascending: false })
    .limit(10);

  const getServiceName = (serviceId: string) => {
    return SERVICES.find((s) => s.id === serviceId)?.title || serviceId;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "scheduled":
      case "quoted":
        return "bg-orange-100 text-orange-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "contacted":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-6 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Text */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-quantum text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-2">
            My Profile
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base">Manage your account, bookings, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Quick Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
              <h2 className="font-quantum text-base sm:text-lg font-bold text-[var(--primary-color)] mb-4">
                Quick Settings
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <Link
                  href="/profile/account"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-color)] flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-semibold text-slate-900 text-xs sm:text-sm truncate">Account</p>
                    <p className="text-xs text-slate-600 truncate">Update email & name</p>
                  </div>
                </Link>
                <Link
                  href="/profile/security"
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-color)] flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-semibold text-slate-900 text-xs sm:text-sm truncate">Security</p>
                    <p className="text-xs text-slate-600 truncate">Change password</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Bookings & Quotes */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* My Bookings */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="font-quantum text-lg sm:text-xl font-bold text-[var(--primary-color)] flex items-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  My Bookings
                </h2>
                <Link
                  href="/book-service"
                  className="text-xs sm:text-sm text-[var(--primary-color)] hover:underline font-medium"
                >
                  Book New
                </Link>
              </div>

              {bookings && bookings.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-slate-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1 truncate">
                            {getServiceName(booking.service)}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{format(new Date(booking.date), "MMM dd, yyyy")}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span>{booking.time}</span>
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      {booking.address && (
                        <p className="text-xs text-slate-600 mb-2 truncate">{booking.address}</p>
                      )}
                      {booking.images && booking.images.length > 0 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto">
                          {booking.images.slice(0, 3).map((imageUrl: string, index: number) => (
                            <a
                              key={index}
                              href={imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative group flex-shrink-0"
                            >
                              <img
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-slate-200"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </div>
                            </a>
                          ))}
                          {booking.images.length > 3 && (
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-600 flex-shrink-0">
                              +{booking.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-xs sm:text-sm mb-4">No bookings yet</p>
                  <Link
                    href="/book-service"
                    className="inline-block bg-[var(--primary-color)] text-white px-4 sm:px-6 py-2 rounded-xl hover:bg-[var(--primary-color)]/90 transition-colors text-xs sm:text-sm font-medium"
                  >
                    Book Service
                  </Link>
                </div>
              )}
            </div>

            {/* My Quote Requests */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="font-quantum text-lg sm:text-xl font-bold text-[var(--primary-color)] flex items-center gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  My Quote Requests
                </h2>
                <Link
                  href="/request-quote"
                  className="text-xs sm:text-sm text-[var(--primary-color)] hover:underline font-medium"
                >
                  Request New
                </Link>
              </div>

              {quotes && quotes.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="border border-slate-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1 truncate">
                            {getServiceName(quote.service)}
                          </h3>
                          <p className="text-xs text-slate-600">
                            {format(new Date(quote.created_at), "MMM dd, yyyy")}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                            quote.status
                          )}`}
                        >
                          {quote.status}
                        </span>
                      </div>
                      {quote.message && (
                        <p className="text-xs text-slate-600 line-clamp-2 break-words">{quote.message}</p>
                      )}
                      {quote.images && quote.images.length > 0 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto">
                          {quote.images.slice(0, 3).map((imageUrl: string, index: number) => (
                            <a
                              key={index}
                              href={imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative group flex-shrink-0"
                            >
                              <img
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-slate-200"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </div>
                            </a>
                          ))}
                          {quote.images.length > 3 && (
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-600 flex-shrink-0">
                              +{quote.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-xs sm:text-sm mb-4">No quote requests yet</p>
                  <Link
                    href="/request-quote"
                    className="inline-block bg-[var(--primary-color)] text-white px-4 sm:px-6 py-2 rounded-xl hover:bg-[var(--primary-color)]/90 transition-colors text-xs sm:text-sm font-medium"
                  >
                    Request Quote
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
