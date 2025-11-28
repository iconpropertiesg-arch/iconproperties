# Fix Database Storage Issue

## Problem
Portfolio request form data is not being stored in the database.

## Root Cause
The Supabase configuration in `.env.local` still has placeholder values instead of actual keys.

## Step-by-Step Fix

### 1. Get Your Supabase Keys

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project (zgxjuueedtcfwlkyzrvw)
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (you already have this: `https://zgxjuueedtcfwlkyzrvw.supabase.co`)
   - **anon/public key** - This is the `anon` key in the API keys section
   - **service_role key** - Click "Reveal" to show this key (⚠️ Keep this secret!)

### 2. Update `.env.local` File

Open `.env.local` and replace the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://zgxjuueedtcfwlkyzrvw.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-actual-anon-key-here"  # Replace this!
SUPABASE_SERVICE_ROLE_KEY="your-actual-service-role-key-here"  # Replace this!
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpneGp1dWVlZHRjZndsa3l6cnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNzQ2NzIsImV4cCI6MjAzMTg1MDY3Mn0.example"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpneGp1dWVlZHRjZndsa3l6cnZ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjI3NDY3MiwiZXhwIjoyMDMxODUwNjcyfQ.example"
```

### 3. Verify Database Table Exists

1. Go to Supabase Dashboard → **SQL Editor**
2. Run this SQL to check if the table exists:

```sql
SELECT * FROM portfolio_requests LIMIT 1;
```

If you get an error saying the table doesn't exist, run the migration:

1. Go to **SQL Editor** in Supabase
2. Copy the entire contents of `supabase-migration.sql`
3. Paste and click **Run**

### 4. Test Database Connection

After updating the keys:

1. **Restart your Next.js dev server** (important!)
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

2. Submit the portfolio request form

3. Check your **server terminal/console** for logs:
   - ✅ `Portfolio request saved to database with ID: [uuid]` = Success!
   - ❌ Any error message = See troubleshooting below

4. Check Supabase Dashboard:
   - Go to **Table Editor** → `portfolio_requests`
   - You should see new rows appear when forms are submitted

## Troubleshooting

### Error: "Supabase configuration error: Please set SUPABASE_SERVICE_ROLE_KEY"
- **Fix:** Make sure you updated both keys in `.env.local`
- **Restart:** You MUST restart the dev server after changing `.env.local`

### Error: "Database table 'portfolio_requests' does not exist"
- **Fix:** Run the SQL migration from `supabase-migration.sql` in Supabase SQL Editor

### Error: "Database connection failed"
- **Check:** Your Supabase project URL is correct
- **Check:** You copied the keys correctly (no extra spaces, quotes are correct)
- **Check:** Your Supabase project is active (not paused)

### Form submits but no data in database
1. Check server terminal for error messages
2. Verify keys are correct in `.env.local`
3. Restart the dev server
4. Try submitting again and watch the terminal output

## Verify It's Working

1. Submit a test form
2. Check server console - you should see:
   ```
   📥 Received portfolio request submission
   ✅ Portfolio request saved to database with ID: [some-uuid]
   ✅ Email sent successfully
   ```
3. Check Supabase Dashboard → Table Editor → `portfolio_requests`
4. You should see a new row with your test data

## Still Not Working?

Check the server terminal output. The improved error logging will show exactly what's failing:
- Database connection errors
- Table missing errors
- Configuration errors

Share the error message from your server terminal and I can help fix it!

