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
    const { to, toName, subject, message, type } = data;

    // Format message with proper line breaks
    const formattedMessage = message.replace(/\n/g, "<br>");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .message-box { background: white; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #1e3a8a; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${type === "quote_cancelled" ? "Quote Update" : "Message from PlusPro Services"}</h2>
            </div>
            <div class="content">
              <p>Dear ${toName},</p>
              
              <div class="message-box">
                ${formattedMessage}
              </div>
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br><strong>PlusPro Services Team</strong></p>
            </div>
            <div class="footer">
              <p>PlusPro Services - Your trusted home repair experts</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to,
      subject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending customer email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

