"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, Search, Download, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import SyncUsersButton from "./SyncUsersButton";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  notes: string | null;
  source: "booking" | "quote" | "manual" | "registered";
  created_at: string;
}

export default function UsersManager() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<"all" | "booking" | "quote" | "manual" | "registered">("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    source: "manual" as "booking" | "quote" | "manual" | "registered",
  });

  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load manual users from admin_users table
      const { data: usersData, error: usersError } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      // Load bookings and quotes to extract users
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("name, email, phone, address, created_at");

      const { data: quotesData } = await supabase
        .from("quotes")
        .select("name, email, phone, created_at");

      // Get registered users from Clerk (via admin_users table or we can add a separate check)
      // For now, we'll combine manual users + booking users + quote users
      // Registered website users would be in Clerk, but we can track them in admin_users with source='registered'

      if (usersError) throw usersError;

      // Combine all users
      const allUsers: UserData[] = [
        ...(usersData || []),
        ...(bookingsData || []).map((b) => ({
          id: `booking-${b.email}-${b.created_at}`,
          name: b.name,
          email: b.email,
          phone: b.phone,
          address: b.address,
          notes: null,
          source: "booking" as const,
          created_at: b.created_at,
        })),
        ...(quotesData || []).map((q) => ({
          id: `quote-${q.email}-${q.created_at}`,
          name: q.name,
          email: q.email,
          phone: q.phone,
          address: null,
          notes: null,
          source: "quote" as const,
          created_at: q.created_at,
        })),
      ];

      // Deduplicate by email (keep the most recent one)
      const userMap = new Map<string, UserData>();
      allUsers.forEach((user) => {
        const emailKey = user.email.toLowerCase();
        const existing = userMap.get(emailKey);
        if (!existing || new Date(user.created_at) > new Date(existing.created_at)) {
          userMap.set(emailKey, user);
        }
      });

      const uniqueUsers = Array.from(userMap.values());

      setUsers(uniqueUsers);
      setBookings(bookingsData || []);
      setQuotes(quotesData || []);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const { error } = await supabase
          .from("admin_users")
          .update({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            address: formData.address || null,
            notes: formData.notes || null,
            source: formData.source,
          })
          .eq("id", editing);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("admin_users").insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          address: formData.address || null,
          notes: formData.notes || null,
          source: formData.source,
        });

        if (error) throw error;
      }

      setShowForm(false);
      setEditing(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
        source: "manual",
      });
      loadData();
    } catch (error: any) {
      console.error("Error saving user:", error);
      alert(error.message || "Error saving user. Please try again.");
    }
  };

  const handleEdit = (user: UserData) => {
    if (user.source !== "manual") {
      alert("Cannot edit users from bookings/quotes. Create a manual user instead.");
      return;
    }
    setEditing(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      notes: user.notes || "",
      source: user.source,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    if (!id.startsWith("manual")) {
      alert("Cannot delete users from bookings/quotes.");
      return;
    }

    try {
      const { error } = await supabase.from("admin_users").delete().eq("id", id);
      if (error) throw error;
      loadData();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

  const exportUsers = () => {
    const csv = [
      ["Name", "Email", "Phone", "Address", "Source", "Created"],
      ...filteredUsers.map((u) => [
        u.name,
        u.email,
        u.phone || "",
        u.address || "",
        u.source,
        new Date(u.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm));
    const matchesSource = filterSource === "all" || user.source === filterSource;
    return matchesSearch && matchesSource;
  });

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">All Users</h2>
          <div className="flex gap-2">
            <SyncUsersButton onSync={loadData} />
            <Button
              onClick={exportUsers}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditing(null);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                  notes: "",
                  source: "manual",
                });
              }}
              className="bg-[#1e3a8a] hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value as any)}
            className="w-48"
          >
            <option value="all">All Sources</option>
            <option value="registered">Registered Users</option>
            <option value="booking">From Bookings</option>
            <option value="quote">From Quotes</option>
            <option value="manual">Manual</option>
          </Select>
        </div>
      </div>

      {showForm && (
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Source
                </label>
                <Select
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value as any })
                  }
                >
                  <option value="manual">Manual</option>
                  <option value="registered">Registered</option>
                  <option value="booking">Booking</option>
                  <option value="quote">Quote</option>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Address
              </label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Notes
              </label>
              <Input
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-[#1e3a8a] hover:bg-blue-700">
                {editing ? "Update" : "Create"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.phone ? (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{user.phone}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.source === "registered"
                        ? "bg-green-100 text-green-700"
                        : user.source === "booking"
                        ? "bg-blue-100 text-blue-700"
                        : user.source === "quote"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {user.source}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.source === "manual" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-1 hover:bg-blue-100 rounded"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">Read-only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}

