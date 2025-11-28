# Email Setup Guide for Portfolio Request Form

This guide will help you connect your email (info@iconproperties.es) to receive notifications when users submit the portfolio request form.

## Quick Setup Options

### Option 1: Resend (Recommended - Easiest) ⭐

**Resend** is the easiest and most developer-friendly email service.

#### Steps:

1. **Sign up for Resend**
   - Go to https://resend.com
   - Create a free account (100 emails/day free)

2. **Get your API Key**
   - Go to **API Keys** in the dashboard
   - Click **Create API Key**
   - Copy the key (starts with `re_`)

3. **Verify your domain** (for production)
   - Go to **Domains** in Resend
   - Add `iconproperties.es`
   - Add the DNS records they provide to your domain
   - Wait for verification (usually 5-10 minutes)

4. **For development/testing** (no domain needed):
   - Use Resend's test domain: `onboarding@resend.dev`
   - Or use any email for testing

5. **Add to your `.env.local` file:**
   ```env
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=Icon Properties <noreply@iconproperties.es>
   ADMIN_EMAIL=info@iconproperties.es
   ```

6. **Done!** The form will now send emails.

---

### Option 2: SendGrid (Alternative)

1. **Sign up** at https://sendgrid.com
2. **Create API Key** in Settings → API Keys
3. **Verify your domain** or use their test domain
4. **Update the code** - Replace the `sendEmail` function in `src/app/api/portfolio-request/route.ts`:

```typescript
async function sendEmail(to: string, subject: string, html: string) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@iconproperties.es', name: 'Icon Properties' },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });

  if (!response.ok) {
    throw new Error(`SendGrid error: ${response.statusText}`);
  }
}
```

Add to `.env.local`:
```env
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=Icon Properties <noreply@iconproperties.es>
ADMIN_EMAIL=info@iconproperties.es
```

---

### Option 3: SMTP (Using your existing email)

If you have an existing email server or want to use Gmail/Outlook SMTP:

1. **Install nodemailer:**
   ```bash
   npm install nodemailer
   ```

2. **Update the `sendEmail` function** in `src/app/api/portfolio-request/route.ts`:

```typescript
import nodemailer from 'nodemailer';

async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@iconproperties.es',
    to,
    subject,
    html,
  });
}
```

3. **Add to `.env.local`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=Icon Properties <your-email@gmail.com>
   ADMIN_EMAIL=info@iconproperties.es
   ```

**Note for Gmail:** You'll need to create an "App Password" in your Google Account settings.

---

## Testing Your Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Submit the form** on your website

3. **Check:**
   - ✅ User receives thank you email at their submitted email
   - ✅ You receive notification at `info@iconproperties.es` (or your ADMIN_EMAIL)

4. **Check server logs** if emails don't arrive - errors will be logged

---

## Environment Variables Summary

Add these to your `.env.local` file:

```env
# For Resend (Recommended)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=Icon Properties <noreply@iconproperties.es>
ADMIN_EMAIL=info@iconproperties.es

# OR for SendGrid
# SENDGRID_API_KEY=your_sendgrid_key
# EMAIL_FROM=Icon Properties <noreply@iconproperties.es>
# ADMIN_EMAIL=info@iconproperties.es

# OR for SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# EMAIL_FROM=Icon Properties <your-email@gmail.com>
# ADMIN_EMAIL=info@iconproperties.es
```

---

## Troubleshooting

### Emails not sending?

1. **Check your API key** is correct in `.env.local`
2. **Check server logs** - errors will be shown in terminal
3. **Verify domain** (if using custom domain) - check Resend/SendGrid dashboard
4. **Check spam folder** - emails might be filtered
5. **Test with a simple email** first (like Gmail) before using your domain

### "RESEND_API_KEY not set" error?

- Make sure `.env.local` exists (not just `.env`)
- Restart your dev server after adding environment variables
- Check the variable name matches exactly

### Domain verification issues?

- For development, use Resend's test domain or any email
- For production, make sure DNS records are added correctly
- Wait 5-10 minutes after adding DNS records

---

## Recommendation

**Use Resend** - it's the easiest to set up, has a generous free tier, and works great with Next.js. You can be up and running in 5 minutes!

Need help? Check the error messages in your server terminal - they'll tell you exactly what's wrong.

