import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export const PHONE_NUMBER = "(778) 716-2994";
export const PHONE_RAW = "7787162994"; // for tel: and WhatsApp
export const EMAIL = "services@pluspro.ca";
export const WHATSAPP_LINK = "https://wa.me/17787162994";

