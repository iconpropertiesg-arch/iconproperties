# How to Get Your Supabase API Keys

## The Problem
The error "Invalid Compact JWS" means your Supabase API keys are not in the correct format. Supabase keys should be JWT tokens that start with `eyJ...`.

## Step-by-Step: Get Correct Keys from Supabase

### Step 1: Go to Supabase Dashboard
1. Visit: https://supabase.com/dashboard
2. Select your project: **iconpropertiesg-arch's Project** (or the project with ID: `yjvyrrdvalzjtcwfnymc`)

### Step 2: Navigate to API Settings
1. Click on **Settings** (gear icon) in the left sidebar
2. Click on **API** in the settings menu

### Step 3: Copy the Keys

You'll see several keys. You need these two:

#### 1. **anon public** key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Look for the section labeled **"Project API keys"**
- Find the **"anon"** or **"public"** key
- It should look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdnlycmR2YWx6anRjd2ZueW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNzQ2NzIsImV4cCI6MjAzMTg1MDY3Mn0.xxxxx`
- Click **"Reveal"** or **"Copy"** to copy it

#### 2. **service_role secret** key (for `SUPABASE_SERVICE_ROLE_KEY`)
- In the same **"Project API keys"** section
- Find the **"service_role"** key (this is a SECRET key - keep it safe!)
- It should also look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdnlycmR2YWx6anRjd2ZueW1jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjI3NDY3MiwiZXhwIjoyMDMxODUwNjcyfQ.xxxxx`
- Click **"Reveal"** to show it (you may need to confirm)
- Click **"Copy"** to copy it

### Step 4: Update Your `.env.local` File

Replace the keys in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL="https://yjvyrrdvalzjtcwfnymc.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdnlycmR2YWx6anRjd2ZueW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNzQ2NzIsImV4cCI6MjAzMTg1MDY3Mn0.YOUR_ACTUAL_KEY_HERE"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdnlycmR2YWx6anRjd2ZueW1jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjI3NDY3MiwiZXhwIjoyMDMxODUwNjcyfQ.YOUR_ACTUAL_KEY_HERE"
```

### Step 5: Restart Your Dev Server

After updating the keys:
1. Stop your Next.js dev server (Ctrl+C)
2. Restart it: `npm run dev`
3. Try uploading an image again

## Important Notes

⚠️ **Security Warning:**
- The `service_role` key has **full access** to your database and storage
- **Never commit it to Git** (it should only be in `.env.local` which is in `.gitignore`)
- **Never expose it in client-side code**

✅ **Key Format:**
- Both keys should be **long JWT tokens** starting with `eyJ...`
- They should be about 200+ characters long
- If your keys don't look like this, you're looking at the wrong section

## Still Having Issues?

If you can't find the keys:
1. Make sure you're logged into the correct Supabase account
2. Make sure you're viewing the correct project (`yjvyrrdvalzjtcwfnymc`)
3. The keys are in **Settings → API**, not in Storage or Database sections

