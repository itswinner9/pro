import { redirect } from "next/navigation";
import { canViewAdmin } from "@/lib/auth";
import BlogsManager from "@/components/admin/BlogsManager";

export default async function BlogsPage() {
  const canView = await canViewAdmin();
  if (!canView) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-[#1e3a8a]">BLOGS</h1>
          <p className="text-slate-500 text-sm mt-1">Manage blog posts and SEO content</p>
        </div>
      </div>
      <div className="p-8">
        <BlogsManager />
      </div>
    </div>
  );
}

