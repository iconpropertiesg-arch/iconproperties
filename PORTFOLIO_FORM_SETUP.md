# Portfolio Request Form Setup Guide

This guide will help you set up the portfolio request form with email notifications and Supabase storage.

## Features

✅ **Thank You Email** - Users receive a confirmation email after submitting the form
✅ **Admin Notification** - You receive an email with all form details
✅ **Supabase Storage** - All submissions are stored in Supabase database
✅ **Error Handling** - Graceful error handling if email or database fails

## Setup Steps

### 1. Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project (or use existing)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the SQL from `supabase-migration.sql` to create the `portfolio_requests` table
4. Go to **Settings** → **API** to get your credentials:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### 2. Email Service Setup (Resend)

1. Go to [Resend](https://resend.com) and create an account
2. Create an API key in the dashboard
3. Verify your domain (or use Resend's test domain for development)
4. Add the API key to your `.env` file

**Alternative Email Services:**
- **SendGrid**: Replace the `sendEmail` function in `src/app/api/portfolio-request/route.ts`
- **Mailgun**: Similar replacement needed
- **SMTP**: Use nodemailer with SMTP settings

### 3. Environment Variables

Add these to your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email (Resend)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=Icon Properties <noreply@iconproperties.es>
ADMIN_EMAIL=info@iconproperties.es
```

### 4. Test the Form

1. Start your development server: `npm run dev`
2. Open the portfolio request modal
3. Fill out and submit the form
4. Check:
   - ✅ User receives thank you email
   - ✅ Admin email is received
   - ✅ Data appears in Supabase `portfolio_requests` table

## Database Schema

The `portfolio_requests` table stores:
- `id` - UUID primary key
- `name` - User's name
- `email` - User's email
- `phone` - Optional phone number
- `buyer_or_seller` - Selected option
- `budget` - Optional budget range
- `preferred_areas` - Optional preferred locations
- `type_of_home` - Optional property type
- `timeline` - Optional timeline
- `locale` - Language/locale
- `created_at` - Timestamp
- `updated_at` - Auto-updated timestamp

## Customization

### Email Templates

Edit the email templates in `src/app/api/portfolio-request/route.ts`:
- `generateThankYouEmail()` - User confirmation email
- `generateAdminNotificationEmail()` - Admin notification email

### Admin Email

Change the recipient by updating `ADMIN_EMAIL` in your `.env` file.

### Email Service

To use a different email service, replace the `sendEmail` function in the API route.

## Troubleshooting

### Emails not sending?
- Check `RESEND_API_KEY` is set correctly
- Verify your domain in Resend (or use test domain)
- Check server logs for error messages

### Supabase errors?
- Verify all Supabase environment variables are set
- Check that the table was created successfully
- Ensure RLS policies allow inserts

### Form not submitting?
- Check browser console for errors
- Verify API route is accessible at `/api/portfolio-request`
- Check server logs for detailed error messages

## Security Notes

- ⚠️ Never commit `.env.local` to git
- ⚠️ Keep `SUPABASE_SERVICE_ROLE_KEY` secret (server-side only)
- ⚠️ The service role key bypasses RLS - use only in API routes
- ✅ Public keys (`NEXT_PUBLIC_*`) are safe to expose in client code

