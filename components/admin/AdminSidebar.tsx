"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  MapPin,
  Settings,
  CheckSquare,
  Users,
  UserCog,
  MessageSquare,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import ClientSignOutButton from "./ClientSignOutButton";

interface AdminSidebarProps {
  role: string;
  canEdit: boolean;
}

export default function AdminSidebar({ role, canEdit }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      title: "Quote Requests",
      href: "/admin/quotes",
      icon: DollarSign,
    },
    {
      title: "Tasks",
      href: "/admin/tasks",
      icon: CheckSquare,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Staff",
      href: "/admin/staff",
      icon: UserCog,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
    },
    {
      title: "Blogs",
      href: "/admin/blogs",
      icon: FileText,
    },
    {
      title: "Service Areas",
      href: "/admin/service-areas",
      icon: MapPin,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  // Only compute user info after component is mounted to avoid hydration mismatch
  const userInitials = mounted && isLoaded && user
    ? user.firstName?.[0] || user.emailAddresses[0]?.emailAddress?.[0]?.toUpperCase() || "A"
    : "A";
  const userName = mounted && isLoaded && user
    ? (user.firstName && user.lastName 
        ? `${user.firstName} ${user.lastName}` 
        : user.emailAddresses[0]?.emailAddress?.split('@')[0] || "Admin")
    : "Admin";

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1e3a8a] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-blue-800">
        <Link href="/admin/dashboard" className="flex items-center">
          <h1 className="text-2xl font-bold text-white">PLUSPRO</h1>
        </Link>
        <p className="text-xs text-blue-300 mt-1">ADMIN V2.4.0</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-800/50 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-r"></div>
              )}
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName}</p>
            <p className="text-xs text-blue-300 capitalize">{role}</p>
          </div>
        </div>
        <ClientSignOutButton />
      </div>
    </div>
  );
}
