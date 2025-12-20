# Fix: SUPABASE_SERVICE_ROLE_KEY Error on Vercel

## Error Message
```
SUPABASE_SERVICE_ROLE_KEY is not set. Please add it to Vercel Environment Variables
```

## Quick Fix (5 minutes)

### Step 1: Get Your Supabase Service Role Key

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project (the one with URL: `zgxjuueedtcfwlkyzrvw`)
3. Click **Settings** (gear icon in left sidebar)
4. Click **API** in the settings menu
5. Scroll down to find **"service_role"** key
6. Click the **eye icon** to reveal it, then **Copy** the key
   - ⚠️ **WARNING**: This key has admin access. Keep it secret!

### Step 2: Add to Vercel Environment Variables

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your project (`propertyicon` or similar)
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Click **Add New**
6. Enter:
   - **Key**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: (Paste the service_role key you copied)
   - **Environments**: ✅ Check all three:
     - Production
     - Preview
     - Development
7. Click **Save**

### Step 3: Also Add These Supabase Variables (if not already added)

**Variable 1:**
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://zgxjuueedtcfwlkyzrvw.supabase.co`
- **Environments**: ✅ All three

**Variable 2:**
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: (Get from Supabase Dashboard → Settings → API → "anon public" key)
- **Environments**: ✅ All three

### Step 4: Redeploy

1. Go to **Deployments** tab in Vercel
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 5: Test

1. Go to your admin panel: `https://propertyicon.vercel.app/admin/properties/new`
2. Try uploading an image
3. It should work now! ✅

## Why This Happens

- **Localhost**: Uses `.env.local` file (you have the key there)
- **Vercel**: Needs environment variables set in the dashboard
- The service role key is required for:
  - Image uploads to Supabase Storage
  - Admin operations that bypass Row Level Security

## Still Not Working?

1. **Double-check the key**: Make sure you copied the entire key (it's very long)
2. **Check environments**: Make sure all three environments are selected
3. **Redeploy**: Variables only apply to new deployments
4. **Check logs**: Go to Vercel → Deployments → View Function Logs to see errors

## Security Note

The `SUPABASE_SERVICE_ROLE_KEY` has full admin access to your Supabase project. Never:
- Commit it to Git
- Share it publicly
- Use it in client-side code

It's safe to use in Vercel environment variables (they're encrypted).








