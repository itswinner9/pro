const MAX_AGE_SECONDS = 5 * 60;

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function decodeSecret(secret: string): Uint8Array {
  const base64 = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    if (bytes.length > 0) return bytes;
  } catch {
    // Fall through and treat the key as UTF-8 bytes.
  }
  return new TextEncoder().encode(secret);
}

function asArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

async function hmacSha256Base64(key: Uint8Array, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    asArrayBuffer(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(message));
  const bytes = new Uint8Array(signature);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export async function verifyQuoWebhook(request: Request, rawBody: string): Promise<boolean> {
  const secret = process.env.QUO_WEBHOOK_KEY?.trim();
  if (!secret) return false;

  const webhookId = request.headers.get("webhook-id");
  const webhookTimestamp = request.headers.get("webhook-timestamp");
  const webhookSignature = request.headers.get("webhook-signature");

  if (webhookId && webhookTimestamp && webhookSignature) {
    const timestamp = Number(webhookTimestamp);
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > MAX_AGE_SECONDS) {
      return false;
    }

    const expected = await hmacSha256Base64(
      decodeSecret(secret),
      `${webhookId}.${webhookTimestamp}.${rawBody}`
    );
    const provided = webhookSignature
      .split(" ")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [version, signature] = entry.split(",");
        return version === "v1" ? signature?.trim() : undefined;
      })
      .filter((signature): signature is string => Boolean(signature));

    return provided.some((signature) => timingSafeEqual(signature, expected));
  }

  const headerKey =
    request.headers.get("authorization") ||
    request.headers.get("x-quo-key") ||
    request.headers.get("x-openphone-signature") ||
    request.headers.get("openphone-signature");

  return Boolean(headerKey && timingSafeEqual(headerKey, secret));
}
