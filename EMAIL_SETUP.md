# Email Notification Setup Guide

## Overview
The booking and quote forms now send email notifications to both the admin and customers.

## Setup Options

### Option 1: Resend (Recommended - Free Tier Available)
1. Sign up at https://resend.com
2. Get your API key from the dashboard
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   FROM_EMAIL=PlusPro Services <noreply@yourdomain.com>
   ADMIN_EMAIL=your-admin@email.com
   ```

### Option 2: SendGrid
1. Sign up at https://sendgrid.com
2. Create an API key in Settings → API Keys
3. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   FROM_EMAIL=your-verified-email@domain.com
   ADMIN_EMAIL=your-admin@email.com
   ```

### Option 3: Development Mode (No Setup Required)
- If no email service is configured, emails will be logged to the console
- Perfect for local development and testing

## Environment Variables

Add these to your `.env.local` file:

```env
# Required for email notifications
ADMIN_EMAIL=your-admin@email.com
FROM_EMAIL=PlusPro Services <noreply@yourdomain.com>

# Choose ONE email service:
# Option 1: Resend (recommended)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# OR Option 2: SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Optional: Site URL for email links
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## What Gets Emailed

### When a Booking is Submitted:
- **Admin Email**: Full booking details, customer info, images, link to admin dashboard
- **Customer Email**: Confirmation with booking details

### When a Quote is Requested:
- **Admin Email**: Full quote request details, customer info, images, link to admin dashboard
- **Customer Email**: Confirmation that quote request was received

## Testing

1. Submit a booking or quote request
2. Check your email inbox (and spam folder)
3. Check the server console for logged emails if no service is configured

## Troubleshooting

- **No emails received**: Check spam folder, verify API keys are correct
- **API errors**: Check console logs for specific error messages
- **Development mode**: Emails are logged to console - check terminal output

