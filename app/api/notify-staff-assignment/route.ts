import { NextResponse } from "next/server";

// Email sending using Resend
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resendClient = new Resend(process.env.RESEND_API_KEY);
      
      const toEmails = Array.isArray(to) ? to : [to];
      const fromEmail = process.env.FROM_EMAIL || `PlusPro Services <noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'plusproservices.ca'}>`;
      
      const result = await resendClient.emails.send({
        from: fromEmail,
        to: toEmails,
        subject,
        html,
      });

      if (result.error) {
        throw new Error(`Resend error: ${result.error.message || 'Unknown error'}`);
      }

      console.log("✅ Email sent successfully via Resend:", { to: toEmails, subject });
      return { success: true };
    } catch (error) {
      console.error("❌ Resend error:", error);
      throw error;
    }
  }

  console.warn("⚠️ RESEND_API_KEY not configured.");
  return { success: false, logged: true };
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { staffEmail, staffName, customerName, customerEmail, type, quoteId, bookingId } = data;

    const assignmentType = type === "quote" ? "Quote Request" : "Service Booking";
    const itemId = quoteId || bookingId;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .info-box { background: white; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #1e3a8a; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
            .button { background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📋 New Assignment</h2>
            </div>
            <div class="content">
              <p>Hello ${staffName},</p>
              
              <p>You have been assigned to a new ${assignmentType.toLowerCase()}.</p>
              
              <div class="info-box">
                <p><strong>Customer Name:</strong> ${customerName}</p>
                <p><strong>Customer Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
                <p><strong>Type:</strong> ${assignmentType}</p>
              </div>
              
              <p>Please review the details in the admin dashboard and contact the customer as soon as possible.</p>
              
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/${type === "quote" ? "quotes" : "bookings"}" class="button">
                View in Admin Dashboard
              </a>
            </div>
            <div class="footer">
              <p>PlusPro Services - Admin Notification System</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: staffEmail,
      subject: `New Assignment: ${assignmentType} - ${customerName}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending staff assignment notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

