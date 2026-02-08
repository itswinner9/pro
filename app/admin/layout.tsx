import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { canViewAdmin, getUserRole, canEdit } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in?redirect_url=/admin/dashboard");
  }

  const canView = await canViewAdmin();
  
  if (!canView) {
    redirect("/");
  }

  const role = await getUserRole();
  const canEditData = await canEdit();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar role={role} canEdit={canEditData} />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}
