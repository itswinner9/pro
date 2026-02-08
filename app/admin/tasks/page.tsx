import { redirect } from "next/navigation";
import { canViewAdmin } from "@/lib/auth";
import TasksClient from "@/components/admin/TasksClient";

export default async function TasksPage() {
  const canView = await canViewAdmin();
  if (!canView) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">To-Do List</h1>
          <p className="text-slate-500 mt-1">Manage your tasks and priorities</p>
        </div>
        <TasksClient />
      </div>
    </div>
  );
}

