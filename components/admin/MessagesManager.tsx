"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail, Phone, CheckCircle, XCircle, Archive } from "lucide-react";
import { Select } from "@/components/ui/select";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  replied_at: string | null;
  created_at: string;
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "new" | "read" | "replied" | "archived"
  >("all");

  const supabase = createClient();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Message["status"]) => {
    try {
      const updateData: any = { status };
      if (status === "replied") {
        updateData.replied_at = new Date().toISOString();
      }
      const { error } = await supabase
        .from("messages")
        .update(updateData)
        .eq("id", id);
      if (error) throw error;
      loadMessages();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "read":
        return "bg-yellow-100 text-yellow-700";
      case "replied":
        return "bg-green-100 text-green-700";
      case "archived":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const filteredMessages =
    filterStatus === "all"
      ? messages
      : messages.filter((m) => m.status === filterStatus);

  const newCount = messages.filter((m) => m.status === "new").length;

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Messages</h2>
            {newCount > 0 && (
              <p className="text-sm text-blue-600 mt-1">
                {newCount} new message{newCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="w-48"
          >
            <option value="all">All Messages</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </Select>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No messages found
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-6 hover:bg-slate-50 transition-colors ${
                message.status === "new" ? "bg-blue-50/30" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{message.name}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                        message.status
                      )}`}
                    >
                      {message.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="w-4 h-4" />
                      <a
                        href={`mailto:${message.email}`}
                        className="hover:underline"
                      >
                        {message.email}
                      </a>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4" />
                        <a
                          href={`tel:${message.phone.replace(/\D/g, "")}`}
                          className="hover:underline"
                        >
                          {message.phone}
                        </a>
                      </div>
                    )}
                    {message.subject && (
                      <p className="text-sm font-medium text-slate-900 mt-2">
                        Subject: {message.subject}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{message.message}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(message.created_at).toLocaleString()}
                    {message.replied_at &&
                      ` • Replied: ${new Date(message.replied_at).toLocaleString()}`}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {message.status === "new" && (
                    <button
                      onClick={() => updateStatus(message.id, "read")}
                      className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
                      title="Mark as Read"
                    >
                      <CheckCircle className="w-4 h-4 text-yellow-600" />
                    </button>
                  )}
                  {message.status !== "replied" && (
                    <button
                      onClick={() => updateStatus(message.id, "replied")}
                      className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                      title="Mark as Replied"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </button>
                  )}
                  {message.status !== "archived" && (
                    <button
                      onClick={() => updateStatus(message.id, "archived")}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4 text-slate-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

