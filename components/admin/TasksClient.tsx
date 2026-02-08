"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckSquare, Square, Trash2, Plus, AlertCircle, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  assigned_to: string | null;
  due_date: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export default function TasksClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    status: "pending" as "pending" | "in_progress" | "completed" | "cancelled",
    assigned_to: "",
    due_date: "",
  });

  const supabase = createClient();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const { error } = await supabase
          .from("tasks")
          .update({
            title: formData.title,
            description: formData.description || null,
            priority: formData.priority,
            status: formData.status,
            assigned_to: formData.assigned_to || null,
            due_date: formData.due_date || null,
          })
          .eq("id", editing);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("tasks")
          .insert({
            title: formData.title,
            description: formData.description || null,
            priority: formData.priority,
            status: formData.status,
            assigned_to: formData.assigned_to || null,
            due_date: formData.due_date || null,
          });

        if (error) throw error;
      }

      setShowForm(false);
      setEditing(null);
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        assigned_to: "",
        due_date: "",
      });
      loadTasks();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error saving task. Please try again.");
    }
  };

  const handleEdit = (task: Task) => {
    setEditing(task.id);
    setFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      assigned_to: task.assigned_to || "",
      due_date: task.due_date ? task.due_date.split("T")[0] : "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task. Please try again.");
    }
  };

  const updateStatus = async (id: string, status: Task["status"]) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      loadTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      case "low":
        return "border-green-500 bg-green-50";
      default:
        return "border-slate-200 bg-slate-50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "pending" || t.status === "in_progress").length;

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">Total Tasks</p>
          <p className="text-2xl font-bold text-slate-900">{tasks.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{completedCount}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
      </div>

      {/* Add/Edit Task Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Task title"
              />
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
                placeholder="Task description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Priority
                </label>
                <Select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as any,
                    })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as any,
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Assigned To
                </label>
                <Input
                  value={formData.assigned_to}
                  onChange={(e) =>
                    setFormData({ ...formData, assigned_to: e.target.value })
                  }
                  placeholder="Staff name or email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) =>
                    setFormData({ ...formData, due_date: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-[#1e3a8a] hover:bg-blue-700">
                {editing ? "Update Task" : "Create Task"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  setFormData({
                    title: "",
                    description: "",
                    priority: "medium",
                    status: "pending",
                    assigned_to: "",
                    due_date: "",
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <div className="mb-6">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#1e3a8a] hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No tasks yet. Add one above!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 ${getPriorityColor(
                task.priority
              )} ${task.status === "completed" ? "opacity-60" : ""}`}
            >
              <button
                onClick={() =>
                  updateStatus(
                    task.id,
                    task.status === "completed" ? "pending" : "completed"
                  )
                }
                className="flex-shrink-0"
              >
                {task.status === "completed" ? (
                  <CheckSquare className="w-5 h-5 text-green-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    task.status === "completed"
                      ? "line-through text-slate-400"
                      : "text-slate-900"
                  }`}
                >
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace("_", " ").toUpperCase()}
                  </span>
                  {task.assigned_to && (
                    <span className="text-xs text-slate-500">
                      Assigned: {task.assigned_to}
                    </span>
                  )}
                  {task.due_date && (
                    <span className="text-xs text-slate-500">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-white">
                {task.priority}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(task)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

