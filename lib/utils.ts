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

export const PHONE_NUMBER = "(778) 655-8980";
/** Digits only, for tel: and sms: links (avoids regex in JSX) */
export const PHONE_DIGITS = PHONE_NUMBER.replace(/\D/g, "");
/** E.164 format for WhatsApp: 1 + 10 digits (Canada) */
export const WHATSAPP_NUMBER = `1${PHONE_DIGITS}`;
/** E.164 for Quo API sends and webhook matching */
export const PHONE_E164 = `+1${PHONE_DIGITS}`;
export const EMAIL = "services@pluspro.ca";
/** Canonical site origin for metadata, sitemap, and schema */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca").replace(/\/$/, "");
/** Careers / job applications - resumes and work photos */
export const CAREERS_EMAIL = "services@pluspro.ca";

