# Fix Form Submission Issues

## Issues Found:
1. ✅ Form submission code restored - now calling API
2. ✅ Resend API key updated to your provided key
3. ⚠️ **SUPABASE_SERVICE_ROLE_KEY needs to be set**

## Steps to Fix:

### 1. Get Your Supabase Service Role Key

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `zgxjuueedtcfwlkyzrvw`
3. Go to **Settings** → **API** (in the left sidebar)
4. Find the **"service_role"** key (NOT the anon key)
5. Copy this key

### 2. Update `.env.local`

Open `.env.local` and replace this line:
```
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

With your actual service role key:
```
SUPABASE_SERVICE_ROLE_KEY="your-actual-service-role-key-from-supabase"
```

**Important:** The service role key is different from the anon key. It has full database access and should be kept secret.

### 3. Restart Your Dev Server

After updating `.env.local`, restart your Next.js dev server:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### 4. Test the Form

1. Fill out the portfolio request form
2. Submit it
3. Check:
   - Browser console for any errors
   - Terminal/console where your dev server is running for logs
   - Your email inbox (jam752575@gmail.com) for admin notification
   - User's email for thank you email
   - Supabase dashboard → Table Editor → `portfolio_requests` table for the new record

### 5. Check Logs

The API route now has detailed logging. Look for:
- `📥 Received portfolio request submission`
- `✅ Validation passed`
- `✅ Successfully saved to Supabase: [id]`
- `✅ Thank you email sent successfully`
- `✅ Admin notification email sent successfully`

If you see errors (❌), they will indicate what's wrong.

## Common Issues:

### "Supabase server environment variables are not set"
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
- Restart your dev server after updating `.env.local`

### "Failed to send email"
- Check that `RESEND_API_KEY` is correct
- Verify the email address format
- Check Resend dashboard for any API errors

### "Supabase insert error"
- Verify the `portfolio_requests` table exists in Supabase
- Check that the table columns match the schema
- Ensure RLS (Row Level Security) is disabled or policies allow inserts

## Current Configuration:

- **Resend API Key**: ✅ Updated to `re_UvoPoMzo_M5LNfFwcykPDsw2c5LpkZ2p1`
- **Admin Email**: `jam752575@gmail.com`
- **Email From**: `onboarding@resend.dev`
- **Supabase URL**: `https://zgxjuueedtcfwlkyzrvw.supabase.co`
- **Supabase Service Role Key**: ⚠️ **NEEDS TO BE SET**



