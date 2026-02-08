import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Admin email - send to muse908070@gmail.com
    const adminEmail = process.env.ADMIN_EMAIL || "muse908070@gmail.com";

    // Email to Admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #1e3a8a; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 New Contact Message</h2>
            </div>
            <div class="content">
              <p><strong>A new message has been submitted via the contact form:</strong></p>
              
              <div class="info-row">
                <span class="label">Name:</span> ${data.name}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
              </div>
              ${data.phone ? `
              <div class="info-row">
                <span class="label">Phone:</span> <a href="tel:${data.phone}">${data.phone}</a>
              </div>
              ` : ''}
              ${data.subject ? `
              <div class="info-row">
                <span class="label">Subject:</span> ${data.subject}
              </div>
              ` : ''}
              <div class="info-row">
                <span class="label">Message:</span>
                <p style="margin-top: 5px; padding: 10px; background: white; border-radius: 6px; white-space: pre-wrap;">${data.message}</p>
              </div>
              
              <p style="margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/messages" 
                   style="background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View in Admin Dashboard
                </a>
              </p>
            </div>
            <div class="footer">
              <p>PlusPro Services - Admin Notification System</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to admin
    await sendEmail({
      to: adminEmail,
      subject: data.subject ? `New Contact: ${data.subject}` : `New Contact Message from ${data.name}`,
      html: adminEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

