# 📧 Resend Email Setup Guide

## ✅ Resend is Now Configured!

Your email notifications are now using **Resend** instead of SendGrid.

## 🔑 Setup Steps

### Step 1: Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up or log in
3. Go to **API Keys** section
4. Create a new API key
5. Copy the API key (starts with `re_`)

### Step 2: Add to Environment Variables

Add this to your `.env.local` file:

```env
# Resend API Key
RESEND_API_KEY=re_your_api_key_here

# From Email (must be verified in Resend)
FROM_EMAIL=PlusPro Services <noreply@yourdomain.com>

# Admin Email (where notifications are sent)
ADMIN_EMAIL=your-admin-email@example.com
```

### Step 3: Verify Your Domain in Resend

1. Go to Resend Dashboard → **Domains**
2. Add your domain (e.g., `plusproservices.ca`)
3. Add the DNS records Resend provides
4. Wait for verification (usually takes a few minutes)

### Step 4: Restart Your Server

After adding the API key:

```bash
npm run dev
```

## 📋 Email Configuration

### From Email Format

You can use either format:

```env
# Format 1: With display name
FROM_EMAIL=PlusPro Services <noreply@yourdomain.com>

# Format 2: Just email (Resend will use your domain name)
FROM_EMAIL=noreply@yourdomain.com
```

### Important Notes

- ✅ The "from" email domain must be verified in Resend
- ✅ You can use `noreply@yourdomain.com` or any email on your verified domain
- ✅ Resend free tier: 3,000 emails/month
- ✅ Emails are sent immediately when bookings/quotes are submitted

## 🧪 Testing

1. **Submit a test booking** at `/book-service`
2. **Check your admin email** - should receive notification
3. **Check customer email** - should receive confirmation
4. **Check Resend dashboard** - see email logs and delivery status

## 🔍 Troubleshooting

### Emails not sending?

1. **Check API key**:
   - Make sure `RESEND_API_KEY` is in `.env.local`
   - No extra spaces or quotes
   - Restart server after adding

2. **Check domain verification**:
   - Go to Resend Dashboard → Domains
   - Make sure domain shows "Verified"
   - Check DNS records are correct

3. **Check server logs**:
   - Look for "✅ Email sent successfully via Resend"
   - Or "❌ Resend error:" for error messages

4. **Check Resend dashboard**:
   - Go to Resend Dashboard → Logs
   - See delivery status and any errors

### Common Errors

- **"Domain not verified"**: Add and verify your domain in Resend
- **"Invalid API key"**: Check your API key is correct
- **"Rate limit exceeded"**: You've hit the free tier limit (3,000/month)

## 📊 Resend Features

- ✅ **Free tier**: 3,000 emails/month
- ✅ **Fast delivery**: Usually < 1 second
- ✅ **Email logs**: Track all sent emails
- ✅ **Webhooks**: Get delivery notifications
- ✅ **Analytics**: Open rates, click rates

## 🎉 You're All Set!

Once you add your `RESEND_API_KEY` to `.env.local`, email notifications will work automatically!

---

**Need help?** Check Resend docs: https://resend.com/docs

