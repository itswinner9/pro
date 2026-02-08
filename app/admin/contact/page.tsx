import { redirect } from "next/navigation";
import { canViewAdmin } from "@/lib/auth";
import { PHONE_NUMBER } from "@/lib/utils";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default async function AdminContactPage() {
  const canView = await canViewAdmin();
  if (!canView) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Contact Information</h1>
          <p className="text-slate-500 mt-1">Business contact details and support</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Phone</h3>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                  className="text-[var(--primary-color)] hover:underline"
                >
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Email</h3>
                <a
                  href="mailto:info@plusproservices.com"
                  className="text-[var(--primary-color)] hover:underline"
                >
                  info@plusproservices.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Service Areas</h3>
                <p className="text-slate-600">Lower Mainland, BC</p>
                <p className="text-sm text-slate-500">Vancouver, Surrey, Burnaby, Richmond, Coquitlam, Delta</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Business Hours</h3>
                <p className="text-slate-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-slate-600">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-slate-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

