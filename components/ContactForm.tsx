"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          subject: formData.subject || "Contact Form Submission",
          message: formData.message,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Failed to send message.");
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-700 font-medium">Message sent successfully! We&apos;ll get back to you soon.</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <div>
        <Label htmlFor="name" className="text-slate-700">Name *</Label>
        <Input id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="email" className="text-slate-700">Email *</Label>
        <Input id="email" type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="phone" className="text-slate-700">Phone</Label>
        <Input id="phone" type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="subject" className="text-slate-700">Subject</Label>
        <Input id="subject" name="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="mt-2" />
      </div>
      <div>
        <Label htmlFor="message" className="text-slate-700">Message *</Label>
        <Textarea id="message" name="message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="mt-2" />
      </div>
      <Button type="submit" size="lg" className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
