"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Status = "new" | "contacted" | "scheduled" | "completed" | "cancelled";

interface BookingStatusUpdateProps {
  bookingId: string;
  currentStatus: Status;
}

export default function BookingStatusUpdate({ bookingId, currentStatus }: BookingStatusUpdateProps) {
  const [status, setStatus] = useState(currentStatus);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    setUpdating(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) {
        throw error;
      }

      setStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Status:</label>
      <Select
        value={status}
        onChange={handleStatusChange}
        disabled={updating}
        className="w-40"
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="scheduled">Scheduled</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </Select>
    </div>
  );
}

