"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "technician" | "supervisor" | "manager" | "admin";
  is_active: boolean;
  hire_date: string | null;
  notes: string | null;
  created_at: string;
}

export default function StaffManager() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "technician" as Staff["role"],
    is_active: true,
    hire_date: "",
    notes: "",
  });

  const supabase = createClient();

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const { data, error } = await supabase
        .from("staff")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStaff(data || []);
    } catch (error) {
      console.error("Error loading staff:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const { error } = await supabase
          .from("staff")
          .update({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            role: formData.role,
            is_active: formData.is_active,
            hire_date: formData.hire_date || null,
            notes: formData.notes || null,
          })
          .eq("id", editing);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("staff").insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          role: formData.role,
          is_active: formData.is_active,
          hire_date: formData.hire_date || null,
          notes: formData.notes || null,
        });

        if (error) throw error;
      }

      setShowForm(false);
      setEditing(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "technician",
        is_active: true,
        hire_date: "",
        notes: "",
      });
      loadStaff();
    } catch (error: any) {
      console.error("Error saving staff:", error);
      alert(error.message || "Error saving staff. Please try again.");
    }
  };

  const handleEdit = (member: Staff) => {
    setEditing(member.id);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone || "",
      role: member.role,
      is_active: member.is_active,
      hire_date: member.hire_date ? member.hire_date.split("T")[0] : "",
      notes: member.notes || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;

    try {
      const { error } = await supabase.from("staff").delete().eq("id", id);
      if (error) throw error;
      loadStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Error deleting staff. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Staff Members</h2>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              setFormData({
                name: "",
                email: "",
                phone: "",
                role: "technician",
                is_active: true,
                hire_date: "",
                notes: "",
              });
            }}
            className="bg-[#1e3a8a] hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
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
                  Role
                </label>
                <Select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as any })
                  }
                >
                  <option value="technician">Technician</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Hire Date
                </label>
                <Input
                  type="date"
                  value={formData.hire_date}
                  onChange={(e) =>
                    setFormData({ ...formData, hire_date: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="rounded"
                  />
                  <span className="text-sm text-slate-700">Active</span>
                </label>
              </div>
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

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className={`p-4 border rounded-lg ${
                member.is_active
                  ? "border-slate-200 bg-white"
                  : "border-slate-100 bg-slate-50 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <UserCog className="w-5 h-5 text-[#1e3a8a]" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-1 hover:bg-blue-100 rounded"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-1 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                {member.phone && (
                  <p className="text-sm text-slate-600">Phone: {member.phone}</p>
                )}
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    member.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : member.role === "manager"
                      ? "bg-blue-100 text-blue-700"
                      : member.role === "supervisor"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {member.role}
                </span>
                {!member.is_active && (
                  <span className="ml-2 inline-block text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {staff.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No staff members yet. Click "Add Staff" to create one.
          </div>
        )}
      </div>
    </div>
  );
}

