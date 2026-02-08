"use client";

import { useState } from "react";
import { Search, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Customer {
  name: string;
  email: string;
  phone: string;
  source: string;
}

interface CustomersClientProps {
  customers: Customer[];
}

export default function CustomersClient({ customers }: CustomersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="p-6 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-sm text-slate-600">
            Showing {filteredCustomers.length} of {customers.length} customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer, index) => (
            <div
              key={index}
              className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[var(--primary-color)]" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{customer.name}</p>
                  <p className="text-xs text-slate-500">{customer.source}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${customer.email}`} className="hover:underline">
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${customer.phone.replace(/\D/g, '')}`} className="hover:underline">
                    {customer.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No customers found</p>
          </div>
        )}
      </div>
    </div>
  );
}

