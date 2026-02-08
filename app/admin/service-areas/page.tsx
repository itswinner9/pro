import { redirect } from "next/navigation";
import { canViewAdmin } from "@/lib/auth";
import { LOCATIONS } from "@/lib/types";
import { MapPin } from "lucide-react";

export default async function ServiceAreasPage() {
  const canView = await canViewAdmin();
  if (!canView) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-[#1e3a8a]">SERVICE AREAS</h1>
        </div>
      </div>
      <div className="p-8">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((location) => (
              <div
                key={location.id}
                className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-[#1e3a8a]" />
                  <h3 className="font-semibold text-slate-900">{location.name}</h3>
                </div>
                <p className="text-sm text-slate-600">{location.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

