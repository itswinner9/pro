import { NextResponse } from "next/server";
import { sendMissedCallTextBack } from "@/lib/quo";
import { verifyQuoWebhook } from "@/lib/quo-webhook";

export async function POST(request: Request) {
  const rawBody = await request.text();

  const verified = await verifyQuoWebhook(request, rawBody);
  if (!verified) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  try {
    const result = await sendMissedCallTextBack(payload);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Missed-call text-back failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
