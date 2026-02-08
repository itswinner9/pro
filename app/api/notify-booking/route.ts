import { NextResponse } from "next/server";
import { EMAIL } from "@/lib/utils";
import { SERVICES } from "@/lib/types";

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
  // Use Resend for email sending
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

  // Fallback: Log to console if Resend not configured
  console.warn("⚠️ RESEND_API_KEY not configured. Email logged to console:");
  console.log("📧 Email would be sent:", { to, subject });
  return { success: false, logged: true };
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Admin email - use environment variable or default to muse908070@gmail.com
    const adminEmail = process.env.ADMIN_EMAIL || "muse908070@gmail.com";
    const serviceName = SERVICES.find((s) => s.id === data.service)?.title || data.service;

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
            .images { margin-top: 20px; }
            .images img { max-width: 200px; margin: 5px; border-radius: 8px; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 New Booking Request</h2>
            </div>
            <div class="content">
              <p><strong>A new service booking has been submitted:</strong></p>
              
              <div class="info-row">
                <span class="label">Customer Name:</span> ${data.name}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
              </div>
              <div class="info-row">
                <span class="label">Phone:</span> <a href="tel:${data.phone}">${data.phone}</a>
              </div>
              <div class="info-row">
                <span class="label">Service:</span> ${serviceName}
              </div>
              <div class="info-row">
                <span class="label">Preferred Date:</span> ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div class="info-row">
                <span class="label">Preferred Time:</span> ${data.time}
              </div>
              <div class="info-row">
                <span class="label">Address:</span> ${data.address}
              </div>
              ${data.message ? `
              <div class="info-row">
                <span class="label">Message:</span> ${data.message}
              </div>
              ` : ''}
              
              ${data.images && data.images.length > 0 ? `
              <div class="images">
                <p><strong>Uploaded Images:</strong></p>
                ${data.images.map((url: string) => `<a href="${url}" target="_blank"><img src="${url}" alt="Uploaded image" /></a>`).join('')}
              </div>
              ` : ''}
              
              <p style="margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/bookings" 
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

    // Email to Customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #1e3a8a; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✅ Booking Confirmation</h2>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              
              <p>Thank you for booking with <strong>PlusPro Services</strong>! We've received your booking request and will contact you shortly to confirm your appointment.</p>
              
              <div class="info-box">
                <p><strong>Service:</strong> ${serviceName}</p>
                <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Time:</strong> ${data.time}</p>
                <p><strong>Address:</strong> ${data.address}</p>
              </div>
              
              <p>Our team will review your request and contact you within 24 hours to confirm the details.</p>
              
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

    // Send emails
    await sendEmail({
      to: adminEmail,
      subject: `New Booking: ${data.name} - ${serviceName}`,
      html: adminEmailHtml,
    });

    await sendEmail({
      to: data.email,
      subject: "Booking Confirmation - PlusPro Services",
      html: customerEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
