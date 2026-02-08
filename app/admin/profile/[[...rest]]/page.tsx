import { redirect } from "next/navigation";
import { canViewAdmin } from "@/lib/auth";
import { UserProfile } from "@clerk/nextjs";

export default async function AdminProfilePage() {
  const canView = await canViewAdmin();
  if (!canView) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account information</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none",
                navbar: "hidden",
                navbarButton: "hidden",
                page: "w-full",
              },
            }}
            routing="path"
            path="/admin/profile"
          />
        </div>
      </div>
    </div>
  );
}

