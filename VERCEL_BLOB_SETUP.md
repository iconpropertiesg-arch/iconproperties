# Vercel Blob Setup Guide for Video Upload

## Step 1: Create a Vercel Blob Store

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Storage** in the left sidebar
3. Click **Create** → **Blob Store**
4. Configure your store:
   - **Name**: `property-icon-blob` (or any name you prefer)
   - **Region**: Choose closest to your users (e.g., `iad1` for US East)
5. Click **Create**

## Step 2: Get Your Blob Token

1. After creating the store, click on it
2. Go to **Settings** tab
3. Find **BLOB_READ_WRITE_TOKEN**
4. Click **Copy** to copy the token

## Step 3: Install Vercel Blob Package

```bash
npm install @vercel/blob
```

## Step 4: Set Environment Variable

### PowerShell (Windows):
```powershell
$env:BLOB_READ_WRITE_TOKEN="your_token_here"
```

### Bash (Linux/Mac):
```bash
export BLOB_READ_WRITE_TOKEN="your_token_here"
```

## Step 5: Upload the Video

Run the upload script:
```bash
node upload-video-to-blob.js
```

The script will:
- ✅ Upload `public/videos/video_hero_banner.mp4` to Vercel Blob
- ✅ Generate a public URL
- ✅ Save the URL to `vercel-blob-video-url.txt`

## Step 6: Update Your Code

After upload, update `src/components/home/HeroSection.tsx`:

Replace:
```tsx
<source 
  src="/videos/video_hero_banner.mp4"
  type="video/mp4" 
/>
```

With:
```tsx
<source 
  src="YOUR_BLOB_URL_HERE"
  type="video/mp4" 
/>
```

Or use an environment variable for flexibility:
```tsx
<source 
  src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/video_hero_banner.mp4"}
  type="video/mp4" 
/>
```

Then add `NEXT_PUBLIC_HERO_VIDEO_URL` to your Vercel environment variables.

## Alternative: Upload via Vercel CLI (if blob store is connected)

If your project is linked and has a blob store:
```bash
vercel blob put public/videos/video_hero_banner.mp4 --access public
```

## Troubleshooting

### Error: "No Vercel Blob token found"
- Make sure you've created a blob store in the dashboard
- Verify the token is set correctly: `echo $BLOB_READ_WRITE_TOKEN` (or `$env:BLOB_READ_WRITE_TOKEN` in PowerShell)

### Error: "Disk space"
- Clear npm cache: `npm cache clean --force`
- Free up disk space
- Try installing in a different location

### Video not loading
- Check the blob URL is accessible
- Verify CORS settings (should be public)
- Check browser console for errors



