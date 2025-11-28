# Quick Fix Guide - Email & Supabase Issues

## Issues Found:
1. ✅ Form submission code restored
2. ✅ Admin email updated to jam752575@gmail.com
3. ⚠️ Need to add SUPABASE_SERVICE_ROLE_KEY to .env.local
4. ⚠️ Need to create portfolio_requests table in Supabase

## Step 1: Add Supabase Service Role Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/zgxjuueedtcfwlkyzrvw
2. Go to **Settings** → **API**
3. Find **service_role** key (keep this secret!)
4. Add it to your `.env.local` file:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 2: Create the Table in Supabase

1. Go to your Supabase dashboard
2. Click on **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the SQL from `supabase-migration.sql`
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

## Step 3: Verify Environment Variables

Make sure your `.env.local` has all these:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://zgxjuueedtcfwlkyzrvw.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# Resend Email
RESEND_API_KEY=re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1
EMAIL_FROM=onboarding@resend.dev
ADMIN_EMAIL=jam752575@gmail.com
```

## Step 4: Restart Your Server

After adding the service role key:
1. Stop your dev server (Ctrl+C)
2. Start it again: `npm run dev`

## Step 5: Test the Form

1. Submit the form
2. Check your server terminal for logs - you should see:
   - "Sending thank you email to: [user email]"
   - "Thank you email sent successfully"
   - "Sending admin notification email to: jam752575@gmail.com"
   - "Admin notification email sent successfully"
   - "Successfully saved to Supabase: [id]"

3. Check emails:
   - User should receive thank you email
   - You should receive notification at jam752575@gmail.com

4. Check Supabase:
   - Go to Table Editor
   - Open `portfolio_requests` table
   - You should see the new submission

## Troubleshooting

### If emails still don't send:
- Check server terminal for error messages
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for any errors

### If Supabase insert fails:
- Check server terminal for error messages
- Verify SUPABASE_SERVICE_ROLE_KEY is set correctly
- Make sure the table exists (run the SQL migration)
- Check that RLS policies allow inserts

### If you see "Supabase server environment variables are not set":
- Make sure SUPABASE_SERVICE_ROLE_KEY is in .env.local (not .env)
- Restart your dev server after adding it

