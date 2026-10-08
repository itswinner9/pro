import { NextResponse } from "next/server";
import { z } from "zod";
import { handleWebsiteLead, type LeadKind } from "@/lib/quo";
import { SERVICES } from "@/lib/types";

const WEB3FORMS_FALLBACK = "4f37a44a-85db-42de-a4b0-43d603871105";

const leadSchema = z.object({
  type: z.enum(["booking", "quote", "contact"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  service: z.string().optional(),
  address: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
});

const fromName: Record<LeadKind, string> = {
  booking: "PlusPro Booking Request",
  quote: "PlusPro Quote Request",
  contact: "PlusPro Services Contact Form",
};

function web3formsKey(kind: LeadKind): string {
  if (kind === "booking") {
    return (
      process.env.WEB3FORMS_BOOKING_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_BOOKING_ACCESS_KEY ||
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      WEB3FORMS_FALLBACK
    );
  }
  if (kind === "quote") {
    return (
      process.env.WEB3FORMS_QUOTE_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_QUOTE_ACCESS_KEY ||
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      WEB3FORMS_FALLBACK
    );
  }
  return (
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    WEB3FORMS_FALLBACK
  );
}

function serviceTitle(service?: string): string | undefined {
  if (!service) return undefined;
  return SERVICES.find((item) => item.id === service)?.title || service;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const kind = data.type;
  const service = serviceTitle(data.service);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";
  const sourcePath =
    kind === "booking" ? "/book-service" : kind === "quote" ? "/request-quote" : "/contact";

  const emailRes = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: web3formsKey(kind),
      from_name: fromName[kind],
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      subject: data.subject || (kind === "contact" ? "Contact Form Submission" : fromName[kind]),
      message: data.message || "",
      service: service || "",
      address: data.address || "",
      date: data.date || "",
      time: data.time || "",
    }),
  });

  const emailResult = (await emailRes.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (!emailRes.ok || !emailResult?.success) {
    return NextResponse.json(
      { success: false, message: emailResult?.message || "Failed to send message." },
      { status: 502 }
    );
  }

  try {
    await handleWebsiteLead({
      kind,
      name: data.name,
      email: data.email,
      phone: data.phone,
      service,
      address: data.address,
      date: data.date,
      time: data.time,
      subject: data.subject,
      message: data.message,
      sourceUrl: `${siteUrl}${sourcePath}`,
    });
  } catch (error) {
    console.error("Quo lead follow-up failed:", error);
  }

  return NextResponse.json({ success: true });
}
