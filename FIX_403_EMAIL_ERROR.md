# Fix 403 Forbidden Email Error

## Problem
User emails are getting a **403 Forbidden** error from Resend API, while admin emails work.

## Root Cause
The `onboarding@resend.dev` test domain has restrictions and may not be able to send to all email addresses.

## Solutions

### Solution 1: Verify Your Domain in Resend (Recommended for Production)

1. **Go to Resend Dashboard**: https://resend.com/domains
2. **Add your domain**: `iconproperties.es`
3. **Add DNS records** that Resend provides to your domain
4. **Wait for verification** (usually 5-10 minutes)
5. **Update `.env.local`**:
   ```env
   EMAIL_FROM=Icon Properties <noreply@iconproperties.es>
   ```
6. **Restart your server**

### Solution 2: Use a Verified Email Address (Quick Fix)

If you have a verified email in Resend:

1. **Check Resend Dashboard** → **Domains** or **Emails**
2. **Find a verified email address** you can use
3. **Update `.env.local`**:
   ```env
   EMAIL_FROM=your-verified-email@yourdomain.com
   ```
   Or with a name:
   ```env
   EMAIL_FROM=Icon Properties <your-verified-email@yourdomain.com>
   ```
4. **Restart your server**

### Solution 3: Use Gmail/Outlook SMTP (Alternative)

If Resend continues to have issues, you can switch to SMTP:

1. **Install nodemailer**:
   ```bash
   npm install nodemailer
   ```

2. **Update the `sendEmail` function** in `src/app/api/portfolio-request/route.ts`:
   ```typescript
   import nodemailer from 'nodemailer';

   async function sendEmail(to: string, subject: string, html: string) {
     const transporter = nodemailer.createTransport({
       host: process.env.SMTP_HOST || 'smtp.gmail.com',
       port: parseInt(process.env.SMTP_PORT || '587'),
       secure: false,
       auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
       },
     });

     await transporter.sendMail({
       from: process.env.EMAIL_FROM || 'Icon Properties <noreply@iconproperties.es>',
       to,
       subject,
       html,
     });
   }
   ```

3. **Add to `.env.local`**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=Icon Properties <your-email@gmail.com>
   ```

### Solution 4: Check Resend API Key Permissions

1. **Go to Resend Dashboard** → **API Keys**
2. **Check your API key** `re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1`
3. **Verify it's active** and has sending permissions
4. **If needed, create a new API key** with full permissions

## Why Admin Email Works But User Email Doesn't

The admin email (`jam752575@gmail.com`) might work because:
- It's a Gmail address that Resend's test domain can send to
- Or it's in Resend's allowed list

User emails might fail because:
- The recipient email domain is restricted
- `onboarding@resend.dev` has limitations on who it can email
- The email address format might trigger restrictions

## Quick Test

To test if domain verification fixes it:

1. **Temporarily use your admin email as FROM** (if it's verified):
   ```env
   EMAIL_FROM=jam752575@gmail.com
   ```
2. **Restart server and test**
3. **If it works**, you need to verify a domain in Resend

## Recommended Action

**For production**, verify your domain `iconproperties.es` in Resend:
1. This removes all restrictions
2. Emails look professional
3. Better deliverability
4. No rate limits (on paid plans)

**For development/testing**, you can:
- Use a verified email address
- Or verify a test domain
- Or use SMTP as a workaround

