import { auth, currentUser } from "@clerk/nextjs/server";

export type UserRole = "admin" | "supervisor" | "manager" | "user";

export async function getCurrentUser() {
  const user = await currentUser();
  return user;
}

export async function getAuth() {
  return await auth();
}

export async function getUserRole(): Promise<UserRole> {
  const user = await currentUser();
  
  if (!user) {
    return "user";
  }

  // Get role from Clerk metadata
  const role = user.publicMetadata?.role as UserRole;
  
  // Default to "user" if no role set
  return role || "user";
}

export async function requireRole(allowedRoles: UserRole[]) {
  const role = await getUserRole();
  
  if (!allowedRoles.includes(role)) {
    throw new Error(`Access denied. Required role: ${allowedRoles.join(" or ")}`);
  }
  
  return role;
}

export async function canEdit(): Promise<boolean> {
  const role = await getUserRole();
  // Only admin and manager can edit
  return role === "admin" || role === "manager";
}

export async function canViewAdmin(): Promise<boolean> {
  const role = await getUserRole();
  // Admin, supervisor, and manager can view admin dashboard
  return role === "admin" || role === "supervisor" || role === "manager";
}

