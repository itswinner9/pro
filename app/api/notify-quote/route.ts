import { NextResponse } from "next/server";

// This endpoint will be called when a quote request is created
// In production, this should trigger a Netlify function or email service
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // TODO: Implement email notification
    // For now, we'll just log it
    console.log("New quote notification:", data);

    // In production, you would:
    // 1. Send email to admin using a service like SendGrid, Resend, or AWS SES
    // 2. Format the email with quote details and image links
    // 3. Send confirmation email to customer

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}

