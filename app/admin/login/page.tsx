import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function AdminLoginPage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/admin/dashboard");
  }
  
  redirect("/sign-in?redirect_url=/admin/dashboard");
}
