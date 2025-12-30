# Vercel Image Upload Setup Guide

## Problem
Vercel's filesystem is **read-only**, so you cannot save files directly to the server. The error `EROFS: read-only file system` occurs when trying to write files locally.

## Solution
Use **Supabase Storage** to store uploaded images. This works on both localhost and Vercel.

## Setup Steps

### 1. Create Supabase Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**
5. Configure the bucket:
   - **Name**: `properties`
   - **Public bucket**: ✅ **Enable this** (so images are publicly accessible)
   - **File size limit**: 10MB (or your preferred limit)
   - **Allowed MIME types**: `image/jpeg, image/jpg, image/png, image/webp, image/gif`
6. Click **"Create bucket"**

### 2. Set Up Storage Policies (Important!)

After creating the bucket, you need to set up policies to allow uploads:

1. Go to **Storage** → **Policies** tab
2. Click on the `properties` bucket
3. Click **"New Policy"**
4. Create a policy for **INSERT** (uploads):
   - **Policy name**: `Allow authenticated uploads`
   - **Allowed operation**: `INSERT`
   - **Policy definition**: 
   ```sql
   (bucket_id = 'properties'::text)
   ```
   - **Policy command**: `INSERT`
   - **Target roles**: `authenticated` (or `anon` if you want public uploads)
5. Create a policy for **SELECT** (read):
   - **Policy name**: `Allow public reads`
   - **Allowed operation**: `SELECT`
   - **Policy definition**:
   ```sql
   (bucket_id = 'properties'::text)
   ```
   - **Policy command**: `SELECT`
   - **Target roles**: `anon, authenticated` (public access since bucket is public)

### 3. Verify Environment Variables

Make sure these are set in your Vercel environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for server-side uploads)

**To add in Vercel:**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/verify these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://zgxjuueedtcfwlkyzrvw.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (your service role key from Supabase)

### 4. Test the Upload

1. Deploy your updated code to Vercel
2. Go to your admin panel: `https://your-domain.vercel.app/admin/properties/new`
3. Try uploading an image
4. The image should now upload successfully to Supabase Storage

## How It Works

- **Localhost**: Uses Supabase Storage (same as Vercel)
- **Vercel**: Uses Supabase Storage (no local filesystem needed)
- **Image URLs**: Images are served from Supabase CDN (fast and reliable)

## Image URL Format

After upload, images will have URLs like:
```
https://yjvyrrdvalzjtcwfnymc.supabase.co/storage/v1/object/public/properties/properties/property-1234567890-abc123.png
```

## Troubleshooting

### Error: "Bucket not found"
- Make sure the bucket name is exactly `properties`
- Check that the bucket exists in your Supabase dashboard

### Error: "new row violates row-level security policy"
- Check your Storage policies are set up correctly
- Make sure the service role key has proper permissions

### Error: "Invalid API key"
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly in Vercel
- Make sure you're using the **Service Role Key** (not the anon key)

### Images not displaying
- Check that the bucket is set to **Public**
- Verify the Storage policies allow public reads

## Alternative: Use Vercel Blob Storage

If you prefer not to use Supabase Storage, you can use Vercel Blob Storage instead:

1. Install: `npm install @vercel/blob`
2. Get your Vercel Blob token from Vercel dashboard
3. Update the upload route to use Vercel Blob

But Supabase Storage is recommended since you're already using Supabase for your database.

