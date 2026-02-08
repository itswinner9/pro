# 📧 Email Configuration - Quick Setup

## ✅ Your Resend API Key

Your Resend API key is: `re_ckJ5xA9u_78EhztgR82scDZRgjYLhNx9T`

## 🔧 Setup Steps

### Step 1: Add to `.env.local`

Open your `.env.local` file and add:

```env
# Resend API Key
RESEND_API_KEY=re_ckJ5xA9u_78EhztgR82scDZRgjYLhNx9T

# Admin Email (where all notifications are sent)
ADMIN_EMAIL=muse908070@gmail.com

# From Email (must be verified in Resend)
FROM_EMAIL=PlusPro Services <noreply@yourdomain.com>
```

### Step 2: Verify Your Domain in Resend

1. Go to [Resend Dashboard](https://resend.com/dashboard)
2. Click **Domains**
3. Add your domain (e.g., `plusproservices.ca`)
4. Add the DNS records Resend provides
5. Wait for verification (usually 5-10 minutes)

### Step 3: Restart Your Server

```bash
npm run dev
```

## 📬 What You'll Receive

You'll get email notifications at **muse908070@gmail.com** when:

1. ✅ **Someone books a service** → Booking notification with all details
2. ✅ **Someone requests a quote** → Quote request notification with details
3. ✅ **Someone contacts you** → Contact form message notification

## 🧪 Test It

1. Submit a test booking at `/book-service`
2. Submit a test quote at `/request-quote`
3. Submit a test message at `/contact`
4. Check your email at `muse908070@gmail.com`

## ✅ Current Configuration

- **Resend API Key**: `re_ckJ5xA9u_78EhztgR82scDZRgjYLhNx9T`
- **Admin Email**: `muse908070@gmail.com`
- **Email Service**: Resend

## 📝 Notes

- Make sure your domain is verified in Resend
- The "from" email must use your verified domain
- All notifications are sent via Resend
- Customer confirmation emails are also sent

---

**You're all set!** Just add the API key to `.env.local` and restart your server. ✅

