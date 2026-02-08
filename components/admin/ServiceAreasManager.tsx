"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ServiceArea {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  is_active: boolean;
  created_at: string;
}

export default function ServiceAreasManager() {
  const [areas, setAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    is_active: true,
  });

  const supabase = createClient();

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    try {
      const { data, error } = await supabase
        .from("service_areas")
        .select("*")
        .order("name");

      if (error) throw error;
      setAreas(data || []);
    } catch (error) {
      console.error("Error loading areas:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const { error } = await supabase
          .from("service_areas")
          .update({
            name: formData.name,
            description: formData.description || null,
            slug: formData.slug || generateSlug(formData.name),
            is_active: formData.is_active,
          })
          .eq("id", editing);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("service_areas")
          .insert({
            name: formData.name,
            description: formData.description || null,
            slug: formData.slug || generateSlug(formData.name),
            is_active: formData.is_active,
          });

        if (error) throw error;
      }

      setShowForm(false);
      setEditing(null);
      setFormData({ name: "", description: "", slug: "", is_active: true });
      loadAreas();
    } catch (error) {
      console.error("Error saving area:", error);
      alert("Error saving area. Please try again.");
    }
  };

  const handleEdit = (area: ServiceArea) => {
    setEditing(area.id);
    setFormData({
      name: area.name,
      description: area.description || "",
      slug: area.slug,
      is_active: area.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this area?")) return;

    try {
      const { error } = await supabase
        .from("service_areas")
        .delete()
        .eq("id", id);

      if (error) throw error;
      loadAreas();
    } catch (error) {
      console.error("Error deleting area:", error);
      alert("Error deleting area. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Service Areas</h2>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              setFormData({ name: "", description: "", slug: "", is_active: true });
            }}
            className="bg-[#1e3a8a] hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Area
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
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: formData.slug || generateSlug(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Slug
                </label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="auto-generated"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-4">
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
                  setFormData({ name: "", description: "", slug: "", is_active: true });
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
          {areas.map((area) => (
            <div
              key={area.id}
              className={`p-4 border rounded-lg ${
                area.is_active
                  ? "border-slate-200 bg-white"
                  : "border-slate-100 bg-slate-50 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#1e3a8a]" />
                  <h3 className="font-semibold text-slate-900">{area.name}</h3>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(area)}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <Edit className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(area.id)}
                    className="p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              {area.description && (
                <p className="text-sm text-slate-600 mb-2">{area.description}</p>
              )}
              <p className="text-xs text-slate-400">/{area.slug}</p>
              {!area.is_active && (
                <span className="inline-block mt-2 text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">
                  Inactive
                </span>
              )}
            </div>
          ))}
        </div>
        {areas.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No service areas yet. Click &quot;Add Area&quot; to create one.
          </div>
        )}
      </div>
    </div>
  );
}

