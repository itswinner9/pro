# SendGrid Email Setup

## Environment Variables

Add the following to your `.env.local` file:

```env
# SendGrid API Key
SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY_HERE

# From Email (optional - defaults to noreply@plusproservices.ca)
FROM_EMAIL=PlusPro Services <noreply@plusproservices.ca>

# Admin Email (where booking/quote notifications are sent)
ADMIN_EMAIL=your-admin-email@example.com
```

## Setup Instructions

1. **Add SendGrid API Key to `.env.local`**:
   ```bash
   echo 'SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY_HERE' >> .env.local
   ```

2. **Set Admin Email** (optional):
   ```bash
   echo 'ADMIN_EMAIL=your-admin-email@example.com' >> .env.local
   ```

3. **Set From Email** (optional):
   ```bash
   echo 'FROM_EMAIL=PlusPro Services <noreply@plusproservices.ca>' >> .env.local
   ```

4. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Verify Setup

1. Submit a test booking or quote request
2. Check your admin email inbox
3. Check the customer's email inbox
4. Check server logs for any SendGrid errors

## SendGrid Requirements

- The "from" email must be verified in your SendGrid account
- Make sure your SendGrid account has API access enabled
- Check SendGrid dashboard for email delivery status

## Troubleshooting

If emails aren't sending:
1. Check `.env.local` has the correct API key
2. Verify the "from" email is verified in SendGrid
3. Check server console for error messages
4. Check SendGrid Activity Feed in dashboard

