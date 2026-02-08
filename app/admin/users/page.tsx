import { redirect } from "next/navigation";
import { canViewAdmin } from "@/lib/auth";
import UsersManager from "@/components/admin/UsersManager";

export default async function UsersPage() {
  const canView = await canViewAdmin();
  if (!canView) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-[#1e3a8a]">USERS</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all users and customer information</p>
        </div>
      </div>
      <div className="p-8">
        <UsersManager />
      </div>
    </div>
  );
}

