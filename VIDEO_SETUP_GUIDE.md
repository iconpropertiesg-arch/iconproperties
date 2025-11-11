# Video Background Setup Guide

## Problem
The hero video (`video_hero_banner.mp4`) is 195MB, which is too large for Vercel deployment (50MB limit). The video is also excluded from git to keep the repository size manageable.

## Solution: Use Cloudinary (Free CDN)

### Step 1: Sign Up for Cloudinary
1. Go to https://cloudinary.com/users/register_free
2. Create a free account (25GB storage, 25GB bandwidth/month)
3. Note your **Cloud Name** from the dashboard

### Step 2: Upload Your Video
1. Log in to Cloudinary dashboard
2. Click "Media Library" → "Upload"
3. Select your video file: `public/videos/video_hero_banner.mp4`
4. Wait for upload to complete (may take a few minutes for 195MB)

### Step 3: Get the Video URL
1. Click on the uploaded video in Media Library
2. Copy the **URL** (it will look like):
   ```
   https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/video_hero_banner.mp4
   ```

### Step 4: Set Environment Variable in Vercel
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `property_icon`
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `NEXT_PUBLIC_HERO_VIDEO_URL`
   - **Value**: Your Cloudinary video URL
   - **Environment**: Check all (Production, Preview, Development)
5. Click **Save**

### Step 5: Redeploy
```bash
vercel --prod
```

## Alternative: Compress Video for Vercel

If you prefer to host the video directly on Vercel, compress it to under 50MB:

### Option A: Online Compression
1. Go to https://www.freeconvert.com/video-compressor
2. Upload `video_hero_banner.mp4`
3. Set target size to 40MB
4. Download compressed version
5. Replace the original file
6. Update `.gitignore` to allow the video
7. Commit and push

### Option B: FFmpeg Compression
```bash
# Install FFmpeg from https://ffmpeg.org/download.html
# Then run:
ffmpeg -i public/videos/video_hero_banner.mp4 \
  -vcodec h264 \
  -crf 32 \
  -preset slow \
  -vf scale=1920:-2 \
  -an \
  public/videos/video_hero_banner_compressed.mp4
```

This will:
- Reduce quality slightly (crf 32)
- Remove audio (-an)
- Keep 1080p resolution
- Result in ~30-40MB file

Then:
1. Delete the original: `video_hero_banner.mp4`
2. Rename: `video_hero_banner_compressed.mp4` → `video_hero_banner.mp4`
3. Remove video exclusion from `.gitignore`:
   ```diff
   - public/videos/*
   + # public/videos/*
   ```
4. Commit and push to git
5. Redeploy to Vercel

## Fallback Behavior

The website is configured with a beautiful gradient fallback background. If the video fails to load for any reason, visitors will see the gradient instead. The site remains fully functional and beautiful without the video.

## Current Status

- ✅ **Localhost**: Video works (using local file)
- ❌ **Production**: Video doesn't work (file not deployed)
- ✅ **Fallback**: Gradient background works everywhere

## Testing

After setting up the video URL:

1. **Check localhost**: `npm run dev` and visit http://localhost:3000
2. **Check production**: Visit your Vercel URL
3. **Check video controls**: The play/pause button in the bottom-right corner should work

## Support

- Cloudinary docs: https://cloudinary.com/documentation
- Vercel env vars: https://vercel.com/docs/concepts/projects/environment-variables

