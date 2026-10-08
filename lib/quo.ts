import { PHONE_E164 } from "@/lib/utils";
import { isOurNumber, toE164 } from "@/lib/phone";

const QUO_API_BASE = "https://api.quo.com/v1";
const CONTACT_SOURCE = "pluspro-website";

type QuoJson = Record<string, unknown>;

let cachedPhoneNumberId: string | null = null;

function getApiKey(): string | null {
  return process.env.QUO_API_KEY?.trim() || null;
}

function asRecord(value: unknown): QuoJson | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as QuoJson)
    : null;
}

async function quoRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("QUO_API_KEY is not set");
  }

  const res = await fetch(`${QUO_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: apiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const text = await res.text();
  let json: unknown = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { message: text };
    }
  }

  if (!res.ok) {
    const body = asRecord(json);
    const message =
      (typeof body?.message === "string" && body.message) ||
      (typeof body?.title === "string" && body.title) ||
      `Quo API ${res.status}`;
    const error = new Error(message) as Error & { status?: number; body?: unknown };
    error.status = res.status;
    error.body = json;
    throw error;
  }

  return json as T;
}

export async function resolvePhoneNumberId(): Promise<string | null> {
  if (process.env.QUO_PHONE_NUMBER_ID?.trim()) {
    return process.env.QUO_PHONE_NUMBER_ID.trim();
  }
  if (cachedPhoneNumberId) return cachedPhoneNumberId;

  const response = await quoRequest<{ data?: Array<{ id?: string; number?: string }> }>(
    "/phone-numbers"
  );
  const match = (response.data ?? []).find((item) => item.number === PHONE_E164);
  cachedPhoneNumberId = match?.id ?? null;
  return cachedPhoneNumberId;
}

function splitName(name: string): { firstName: string; lastName: string | null } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "Customer", lastName: null };
  if (parts.length === 1) return { firstName: parts[0], lastName: null };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export async function createQuoContact(input: {
  name: string;
  email?: string;
  phoneE164: string;
  sourceUrl?: string;
}): Promise<{ id?: string } | null> {
  const { firstName, lastName } = splitName(input.name);
  const emails = input.email
    ? [{ name: "email", value: input.email }]
    : [];

  try {
    const response = await quoRequest<{ data?: { id?: string } }>("/contacts", {
      method: "POST",
      body: JSON.stringify({
        defaultFields: {
          firstName,
          lastName,
          emails,
          phoneNumbers: [{ name: "mobile", value: input.phoneE164 }],
        },
        source: CONTACT_SOURCE,
        sourceUrl: input.sourceUrl,
        externalId: input.phoneE164,
      }),
    });
    return response.data ?? null;
  } catch (error) {
    const status = (error as { status?: number }).status;
    if (status === 409) return null;
    throw error;
  }
}

export async function sendQuoSms(input: {
  to: string;
  content: string;
  setInboxStatus?: "done";
}): Promise<void> {
  const to = toE164(input.to);
  if (!to || isOurNumber(to)) return;

  const from = (await resolvePhoneNumberId()) ?? PHONE_E164;
  await quoRequest("/messages", {
    method: "POST",
    body: JSON.stringify({
      content: input.content,
      from,
      to: [to],
      setInboxStatus: input.setInboxStatus,
    }),
  });
}

export async function createQuoTask(input: {
  title: string;
  description: string;
}): Promise<void> {
  const phoneNumberId = await resolvePhoneNumberId();
  if (!phoneNumberId) {
    throw new Error("Could not resolve Quo phoneNumberId for task creation");
  }
  await quoRequest("/tasks", {
    method: "POST",
    body: JSON.stringify({
      title: input.title,
      description: input.description,
      phoneNumberId,
    }),
  });
}

export function isQuoConfigured(): boolean {
  return Boolean(getApiKey());
}

export type LeadKind = "booking" | "quote" | "contact";

export function confirmationSms(kind: LeadKind): string {
  if (kind === "booking") {
    return "PlusPro received your booking request. We'll confirm shortly. Text photos to this number if helpful.";
  }
  if (kind === "quote") {
    return "PlusPro received your quote request. We'll be in touch shortly. Text photos to this number for a better estimate.";
  }
  return "PlusPro received your message. We'll reply shortly. Text photos to this number if helpful.";
}

export const MISSED_CALL_SMS =
  "Sorry we missed you — reply with the address and what's broken, or book at pluspro.ca/book-service.";

export async function handleWebsiteLead(input: {
  kind: LeadKind;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  address?: string;
  date?: string;
  time?: string;
  subject?: string;
  message?: string;
  sourceUrl?: string;
}): Promise<void> {
  if (!isQuoConfigured()) {
    console.warn("Quo API skipped: QUO_API_KEY is not set");
    return;
  }

  const phoneE164 = input.phone ? toE164(input.phone) : null;
  if (!phoneE164 || isOurNumber(phoneE164)) return;

  try {
    await createQuoContact({
      name: input.name,
      email: input.email,
      phoneE164,
      sourceUrl: input.sourceUrl,
    });
  } catch (error) {
    console.error("Quo contact create failed:", error);
  }

  try {
    await sendQuoSms({
      to: phoneE164,
      content: confirmationSms(input.kind),
      setInboxStatus: "done",
    });
  } catch (error) {
    console.error("Quo confirmation SMS failed:", error);
  }

  try {
    const details = [
      `Name: ${input.name}`,
      `Phone: ${phoneE164}`,
      `Email: ${input.email}`,
      input.service ? `Service: ${input.service}` : null,
      input.address ? `Address: ${input.address}` : null,
      input.date ? `Date: ${input.date}` : null,
      input.time ? `Time: ${input.time}` : null,
      input.subject ? `Subject: ${input.subject}` : null,
      input.message ? `Message: ${input.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const titleParts = [
      input.kind === "booking" ? "Confirm" : input.kind === "quote" ? "Quote" : "Follow up",
      input.service || input.subject || input.name,
      input.date && input.time ? `${input.date} ${input.time}` : null,
    ].filter(Boolean);

    await createQuoTask({
      title: titleParts.join(" — ").slice(0, 120),
      description: details,
    });
  } catch (error) {
    console.error("Quo task create failed:", error);
  }
}

const MISSED_STATUSES = new Set([
  "missed",
  "no-answer",
  "no_answer",
  "abandoned",
  "unanswered",
]);

const recentMissedSms = new Map<string, number>();
const MISSED_DEDUPE_MS = 24 * 60 * 60 * 1000;

function alreadySentMissedSms(callId: string): boolean {
  const now = Date.now();
  for (const [id, sentAt] of recentMissedSms) {
    if (now - sentAt > MISSED_DEDUPE_MS) recentMissedSms.delete(id);
  }
  return recentMissedSms.has(callId);
}

function markMissedSmsSent(callId: string): void {
  recentMissedSms.set(callId, Date.now());
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function collectPhones(value: unknown): string[] {
  if (typeof value === "string" && value.length > 0) return [value];
  if (!Array.isArray(value)) return [];
  const phones: string[] = [];
  for (const item of value) {
    if (typeof item === "string" && item.length > 0) {
      phones.push(item);
      continue;
    }
    const record = asRecord(item);
    const phone =
      asString(record?.phoneNumber) ??
      asString(record?.number) ??
      asString(record?.value);
    if (phone) phones.push(phone);
  }
  return phones;
}

export function extractMissedCall(payload: unknown): { callId: string; callerE164: string } | null {
  const root = asRecord(payload);
  if (!root) return null;

  const type = asString(root.type) ?? asString(root.event);
  const data = asRecord(root.data) ?? asRecord(root.object) ?? root;
  const resource = asRecord(data.resource) ?? data;
  const context = asRecord(data.context);

  const eventType = type ?? asString(resource.type);
  const direction =
    asString(resource.direction) ??
    asString(data.direction) ??
    "incoming";
  const status =
    asString(resource.status) ??
    asString(data.status) ??
    "";

  const isMissedEvent = eventType === "call.missed";
  const isCompletedMissed =
    (eventType === "call.completed" || !eventType) &&
    MISSED_STATUSES.has(status);

  if (!isMissedEvent && !isCompletedMissed) return null;
  if (direction === "outgoing") return null;

  const callId =
    asString(resource.id) ??
    asString(data.id) ??
    asString(asRecord(root.data)?.id);
  if (!callId) return null;

  const participantRecord = context ? asRecord(context.participants) : null;
  const candidates = [
    ...collectPhones(participantRecord?.external),
    ...collectPhones(data.participants),
    ...collectPhones(resource.participants),
    asString(resource.from),
    asString(data.from),
    asString(asRecord(resource.from)?.phoneNumber),
    asString(asRecord(data.from)?.phoneNumber),
  ].filter((value): value is string => Boolean(value));

  const caller = candidates
    .map(toE164)
    .find((n): n is string => n !== null && !isOurNumber(n));
  if (!caller) return null;

  return { callId, callerE164: caller };
}

export async function sendMissedCallTextBack(payload: unknown): Promise<"sent" | "skipped"> {
  if (!isQuoConfigured()) return "skipped";

  const missed = extractMissedCall(payload);
  if (!missed) return "skipped";
  if (alreadySentMissedSms(missed.callId)) return "skipped";

  await sendQuoSms({
    to: missed.callerE164,
    content: MISSED_CALL_SMS,
    setInboxStatus: "done",
  });
  markMissedSmsSent(missed.callId);
  return "sent";
}
