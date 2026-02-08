/**
 * Shared Resend email helper.
 * Uses RESEND_API_KEY and a valid "from" address.
 * Default from: onboarding@resend.dev (works without domain verification).
 * Set FROM_EMAIL in env for a custom sender (e.g. noreply@yourdomain.com).
 */

export type SendEmailOptions = {
  to: string | string[]
  subject: string
  html: string
}

export type SendEmailResult = { success: boolean; logged?: boolean }

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY not configured. Email logged to console:")
    console.log("📧 Email would be sent:", { to, subject })
    return { success: false, logged: true }
  }

  try {
    const { Resend } = await import("resend")
    const resendClient = new Resend(apiKey)
    const toEmails = Array.isArray(to) ? to : [to]

    // Use FROM_EMAIL if set (verified domain); otherwise Resend's default so it works without verification
    const fromEmail =
      process.env.FROM_EMAIL ||
      "PlusPro Services <onboarding@resend.dev>"

    const result = await resendClient.emails.send({
      from: fromEmail,
      to: toEmails,
      subject,
      html,
    })

    if (result.error) {
      throw new Error(result.error.message || "Resend error")
    }

    console.log("✅ Email sent via Resend:", { to: toEmails, subject })
    return { success: true }
  } catch (error) {
    console.error("❌ Resend error:", error)
    throw error
  }
}
