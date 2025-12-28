# Quick Guide: Upload Video to Vercel Blob

## ✅ Step 1: Blob Store Created
Your blob store `property-icon-video-store` has been created! Now you need to link it and get the token.

## Step 2: Link Store to Project & Get Token

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Blob**
3. Find your store: `property-icon-video-store`
4. Click on it to open settings
5. In the **Settings** tab, find **BLOB_READ_WRITE_TOKEN**
6. Click **Copy** to copy the token
7. Make sure the store is connected to your `property_icon` project

### Option B: Via Vercel CLI

Once the store is linked in the dashboard, you can upload directly:

```powershell
# Set the token (get it from dashboard)
$env:BLOB_READ_WRITE_TOKEN="your_token_here"

# Upload the video
vercel blob put public/videos/video_hero_banner.mp4 --access public
```

## Step 3: Upload the Video

### Method 1: Using Vercel CLI (Once token is set)

```powershell
$env:BLOB_READ_WRITE_TOKEN="your_token_from_dashboard"
vercel blob put public/videos/video_hero_banner.mp4 --access public
```

### Method 2: Using the Upload Script

1. Install the package (when you have disk space):
   ```powershell
   npm install @vercel/blob
   ```

2. Set the token:
   ```powershell
   $env:BLOB_READ_WRITE_TOKEN="your_token_from_dashboard"
   ```

3. Run the script:
   ```powershell
   node upload-video-to-blob.js
   ```

### Method 3: Using the API Route

1. Add `BLOB_READ_WRITE_TOKEN` to your Vercel environment variables
2. Deploy your project
3. Call the API:
   ```powershell
   curl -X POST https://your-domain.vercel.app/api/upload-video
   ```

## Step 4: Update Your Code

After upload, you'll get a URL like:
```
https://[store-id].public.blob.vercel-storage.com/videos/video_hero_banner.mp4
```

Update `src/components/home/HeroSection.tsx`:

```tsx
<source 
  src="YOUR_BLOB_URL_HERE"
  type="video/mp4" 
/>
```

Or use an environment variable:

```tsx
<source 
  src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/video_hero_banner.mp4"}
  type="video/mp4" 
/>
```

Then add `NEXT_PUBLIC_HERO_VIDEO_URL` to Vercel environment variables.

## Current Status

✅ Blob store created: `property-icon-video-store`  
⏳ Need to: Link store to project & get token from dashboard  
⏳ Then: Upload video using one of the methods above



