"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { 
  X, 
  DollarSign, 
  Mail, 
  UserCog, 
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Status = "new" | "contacted" | "scheduled" | "completed" | "cancelled";

interface BookingManagementProps {
  bookingId: string;
  currentStatus: Status;
  bookingPrice?: number | null;
  assignedTo?: string | null;
  customerEmail: string;
  customerName: string;
  canEdit: boolean;
  staffList?: Array<{ id: string; name: string; email: string }>;
}

export default function BookingManagement({
  bookingId,
  currentStatus,
  bookingPrice,
  assignedTo,
  customerEmail,
  customerName,
  canEdit,
  staffList = [],
}: BookingManagementProps) {
  const [status, setStatus] = useState(currentStatus);
  const [price, setPrice] = useState(bookingPrice?.toString() || "");
  const [assignedStaff, setAssignedStaff] = useState(assignedTo || "");
  const [updating, setUpdating] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null);
  const router = useRouter();
  const supabase = createClient();

  if (!canEdit) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Status:</label>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            {status} (Read Only)
          </span>
        </div>
        {bookingPrice && (
          <div>
            <label className="text-sm font-medium">Final Price:</label>
            <span className="ml-2 text-lg font-bold text-green-600">${bookingPrice.toFixed(2)}</span>
          </div>
        )}
      </div>
    );
  }

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    await updateBooking({ status: newStatus });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    
    // Auto-save after 1 second of no typing
    setTimeout(() => {
      if (newPrice && !isNaN(parseFloat(newPrice))) {
        updateBooking({ quote_price: parseFloat(newPrice) });
      }
    }, 1000);
  };

  const handleAssignStaff = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const staffId = e.target.value;
    setAssignedStaff(staffId);
    await updateBooking({ assigned_to: staffId || null });
    
    // Send notification to assigned staff
    if (staffId) {
      const staff = staffList.find(s => s.id === staffId);
      if (staff) {
        await sendStaffNotification(staff.email, staff.name, customerName, customerEmail);
      }
    }
  };

  const updateBooking = async (updates: any) => {
    setUpdating(true);
    setSaveStatus(null);

    try {
      const { error } = await supabase
        .from("bookings")
        .update(updates)
        .eq("id", bookingId);

      if (error) throw error;

      if (updates.status) setStatus(updates.status as Status);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
      router.refresh();
    } catch (error) {
      console.error("Error updating booking:", error);
      setSaveStatus("error");
      alert("Failed to update booking");
    } finally {
      setUpdating(false);
    }
  };

  const sendStaffNotification = async (staffEmail: string, staffName: string, customerName: string, customerEmail: string) => {
    try {
      await fetch("/api/notify-staff-assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffEmail,
          staffName,
          customerName,
          customerEmail,
          type: "booking",
          bookingId,
        }),
      });
    } catch (error) {
      console.error("Error sending staff notification:", error);
    }
  };

  const handleSendEmail = async () => {
    if (!emailSubject || !emailMessage) {
      alert("Please fill in both subject and message");
      return;
    }

    setSendingEmail(true);
    try {
      const response = await fetch("/api/send-customer-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: customerEmail,
          toName: customerName,
          subject: emailSubject,
          message: emailMessage,
          type: "booking",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      alert("Email sent successfully!");
      setShowEmailDialog(false);
      setEmailSubject("");
      setEmailMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setSendingEmail(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    await updateBooking({ status: "cancelled" });
    
    // Send cancellation email
    try {
      await fetch("/api/send-customer-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: customerEmail,
          toName: customerName,
          subject: "Booking Cancelled - PlusPro Services",
          message: `Dear ${customerName},\n\nWe regret to inform you that your booking has been cancelled. If you have any questions, please contact us.\n\nBest regards,\nPlusPro Services Team`,
          type: "booking_cancelled",
        }),
      });
    } catch (error) {
      console.error("Error sending cancellation email:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status Update */}
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
        {saveStatus === "success" && (
          <CheckCircle className="w-4 h-4 text-green-600" />
        )}
        {saveStatus === "error" && (
          <AlertCircle className="w-4 h-4 text-red-600" />
        )}
      </div>

      {/* Booking Price */}
      <div>
        <Label htmlFor="booking-price" className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Final Price ($)
        </Label>
        <Input
          id="booking-price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={handlePriceChange}
          placeholder="0.00"
          className="mt-1"
        />
        {price && !isNaN(parseFloat(price)) && (
          <p className="text-xs text-slate-500 mt-1">
            Price: ${parseFloat(price).toFixed(2)}
          </p>
        )}
      </div>

      {/* Staff Assignment */}
      {staffList.length > 0 && (
        <div>
          <Label htmlFor="assign-staff" className="flex items-center gap-2">
            <UserCog className="w-4 h-4" />
            Assign to Staff
          </Label>
          <Select
            id="assign-staff"
            value={assignedStaff}
            onChange={handleAssignStaff}
            className="mt-1"
          >
            <option value="">Unassigned</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name} ({staff.email})
              </option>
            ))}
          </Select>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          onClick={() => setShowEmailDialog(true)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Send Email
        </Button>
        {status !== "cancelled" && (
          <Button
            onClick={handleCancel}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            Cancel Booking
          </Button>
        )}
      </div>

      {/* Send Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Email to Customer</DialogTitle>
            <DialogDescription>
              Send an email to {customerName} ({customerEmail})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="email-subject">Subject *</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="e.g., Booking Confirmed"
                required
              />
            </div>
            <div>
              <Label htmlFor="email-message">Message *</Label>
              <Textarea
                id="email-message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                rows={8}
                placeholder="Dear {customerName},&#10;&#10;Your message here..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={sendingEmail}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={sendingEmail || !emailSubject || !emailMessage}
              className="flex items-center gap-2"
            >
              {sendingEmail ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

