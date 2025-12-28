# Complete Instructions: Upload Video to Vercel Blob

## ✅ What's Done
- ✅ Blob store created: `property-icon-video-store` (store_uZxqMOu1bP2cwcQq)
- ✅ Project linked to Vercel
- ✅ Upload script created: `upload-video-to-blob.js`
- ✅ API route created: `src/app/api/upload-video/route.ts`

## 📋 Next Steps

### Step 1: Get Your Blob Token from Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** in the left sidebar
3. Find and click on `property-icon-video-store`
4. Go to **Settings** tab
5. Scroll to **BLOB_READ_WRITE_TOKEN**
6. Click **Copy** to copy the token

### Step 2: Add Token to Vercel Environment Variables

#### Option A: Via CLI (Recommended)
```powershell
vercel env add BLOB_READ_WRITE_TOKEN
```
When prompted:
- **Value**: Paste your token
- **Environments**: Select all (Production, Preview, Development)

#### Option B: Via Dashboard
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Click **Add New**
4. Key: `BLOB_READ_WRITE_TOKEN`
5. Value: Paste your token
6. Select all environments
7. Click **Save**

### Step 3: Upload the Video

#### Method 1: Using Vercel CLI (Easiest)

```powershell
# Make sure you're in the project directory
cd D:\porperty_icon_website_final\property_icon

# Upload the video
vercel blob put public/videos/video_hero_banner.mp4 --access public
```

This will output a URL like:
```
https://[store-id].public.blob.vercel-storage.com/videos/video_hero_banner.mp4
```

#### Method 2: Using the Upload Script

First, install the package (when you have disk space):
```powershell
npm install @vercel/blob
```

Then run:
```powershell
node upload-video-to-blob.js
```

Make sure `BLOB_READ_WRITE_TOKEN` is set in your environment or Vercel.

### Step 4: Update Your Code

After getting the blob URL, update `src/components/home/HeroSection.tsx`:

**Replace this:**
```tsx
<source 
  src="/videos/video_hero_banner.mp4"
  type="video/mp4" 
/>
```

**With this (using the blob URL directly):**
```tsx
<source 
  src="https://[your-store-id].public.blob.vercel-storage.com/videos/video_hero_banner.mp4"
  type="video/mp4" 
/>
```

**Or better yet, use an environment variable:**
```tsx
<source 
  src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/video_hero_banner.mp4"}
  type="video/mp4" 
/>
```

Then add `NEXT_PUBLIC_HERO_VIDEO_URL` to Vercel environment variables with your blob URL.

## 🎯 Quick Command Summary

```powershell
# 1. Add token to Vercel
vercel env add BLOB_READ_WRITE_TOKEN

# 2. Upload video
vercel blob put public/videos/video_hero_banner.mp4 --access public

# 3. Copy the URL and update HeroSection.tsx
```

## 📝 Notes

- The video file (195MB) is too large for GitHub, which is why we're using Vercel Blob
- Vercel Blob is perfect for large media files like videos
- The blob URL will be publicly accessible
- You can update the video by uploading again with the same pathname (if `allowOverwrite: true`)

## 🔍 Troubleshooting

### "No Vercel Blob token found"
- Make sure you've added `BLOB_READ_WRITE_TOKEN` to Vercel environment variables
- Verify the token is correct

### "Store not linked"
- Go to Vercel dashboard → Storage → Your store
- Make sure it's connected to your `property_icon` project

### Disk space error
- Clear npm cache: `npm cache clean --force`
- Free up disk space
- Or use the API route method after deploying



