import { createClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This API route syncs registered Clerk users to admin_users table
export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();
    const clerk = clerkClient();

    // Get all users from Clerk
    const clerkUsers = await clerk.users.getUserList({ limit: 500 });

    // Sync each user to admin_users table
    for (const clerkUser of clerkUsers.data) {
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      if (!email) continue;

      const name =
        clerkUser.firstName && clerkUser.lastName
          ? `${clerkUser.firstName} ${clerkUser.lastName}`
          : clerkUser.firstName || email.split("@")[0];

      // Check if user already exists
      const { data: existing } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", email)
        .single();

      if (!existing) {
        // Insert new user
        await supabase.from("admin_users").insert({
          name,
          email,
          phone: clerkUser.phoneNumbers[0]?.phoneNumber || null,
          source: "registered",
          clerk_user_id: clerkUser.id,
        });
      } else {
        // Update existing user to mark as registered if not already
        await supabase
          .from("admin_users")
          .update({
            source: "registered",
            clerk_user_id: clerkUser.id,
          })
          .eq("id", existing.id);
      }
    }

    return NextResponse.json({ success: true, synced: clerkUsers.data.length });
  } catch (error: any) {
    console.error("Error syncing users:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sync users" },
      { status: 500 }
    );
  }
}

