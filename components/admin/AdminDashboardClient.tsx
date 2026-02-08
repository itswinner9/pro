"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Calendar,
  FileText,
  DollarSign,
  Users,
  Bell,
  ChevronDown,
  ArrowUp,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import type { UserRole } from "@/lib/auth";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "booking" | "quote";
  status: string;
  service: string;
  date?: string;
  address?: string;
  created_at: string;
}

interface AdminDashboardClientProps {
  bookings: any[];
  quotes: any[];
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  } | null;
  role: UserRole;
  canEdit: boolean;
  stats: {
    totalBookings: number;
    pendingQuotes: number;
    revenue: number;
    activeTechnicians: number;
    totalUsers: number;
  };
}

export default function AdminDashboardClient({
  bookings,
  quotes,
  user,
  role,
  canEdit,
  stats: serverStats,
}: AdminDashboardClientProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Transform bookings and quotes to Customer format
    const allCustomers: Customer[] = [
      ...bookings.map((b) => ({
        id: b.id,
        name: b.name,
        email: b.email,
        phone: b.phone,
        type: "booking" as const,
        status: b.status,
        service: b.service,
        date: b.date,
        address: b.address,
        created_at: b.created_at,
      })),
      ...quotes.map((q) => ({
        id: q.id,
        name: q.name,
        email: q.email,
        phone: q.phone,
        type: "quote" as const,
        status: q.status,
        service: q.service,
        created_at: q.created_at,
      })),
    ];

    setCustomers(allCustomers);
  }, [bookings, quotes]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "scheduled":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "contacted":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "quoted":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getServiceColor = (service: string) => {
    const serviceLower = service.toLowerCase();
    if (serviceLower.includes("plumbing")) {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-slate-100 text-slate-700";
  };

  // Use server stats
  const stats = serverStats;

  const recentRequests = customers
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const getCityFromAddress = (address?: string) => {
    if (!address) return "N/A";
    const cities = ["Vancouver", "Surrey", "Burnaby", "Richmond", "Coquitlam", "Delta"];
    for (const city of cities) {
      if (address.includes(city)) return city;
    }
    return "N/A";
  };

  const formatId = (id: string) => {
    return `#PR-${id.slice(-4).toUpperCase()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#1e3a8a]">DASHBOARD</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                <span className="text-sm font-medium text-slate-700">Admin Profile</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-sm text-slate-600 capitalize">{role === "admin" ? "Super Admin" : role}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Bookings */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600 uppercase">Total Bookings</h3>
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900">{stats.totalBookings.toLocaleString()}</p>
            </div>
          </div>

          {/* Pending Quotes */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600 uppercase">Pending Quotes</h3>
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900">{stats.pendingQuotes}</p>
              {stats.pendingQuotes > 0 && (
                <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded">
                  Urgent
                </span>
              )}
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600 uppercase">Revenue</h3>
              <DollarSign className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900">
                {stats.revenue >= 1000 
                  ? `$${(stats.revenue / 1000).toFixed(1)}k` 
                  : `$${stats.revenue.toLocaleString()}`}
              </p>
            </div>
          </div>

          {/* Active Technicians */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600 uppercase">Active Technicians</h3>
              <Users className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900">{stats.activeTechnicians}</p>
              {stats.activeTechnicians > 0 && (
                <span className="text-xs font-medium text-green-600">Active</span>
              )}
            </div>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Requests</h2>
              <Link
                href="/admin/bookings"
                className="text-sm text-[#1e3a8a] hover:underline font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Service Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No requests found
                    </td>
                  </tr>
                ) : (
                  recentRequests.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-900">{formatId(customer.id)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-900">{customer.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getServiceColor(customer.service)}`}>
                          {customer.service.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600">{getCityFromAddress(customer.address)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(customer.status)}`}>
                          {customer.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/admin/${customer.type === "booking" ? "bookings" : "quotes"}`}
                          className="text-sm text-[#1e3a8a] hover:underline font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-right">
          <p className="text-xs text-slate-400">SYSTEM STATUS: OPTIMAL</p>
        </div>
      </div>
    </div>
  );
}
