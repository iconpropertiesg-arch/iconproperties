# Make Bucket Public - Fix Image Display Issue

## Problem
Images are uploading successfully to the `properties` bucket, but not displaying because the bucket is **not set to Public**.

## Solution: Enable Public Bucket

### Step 1: Edit the Bucket Settings

1. Go to: https://supabase.com/dashboard/project/yjvyrrdvalzjtcwfnymc/storage/files/buckets
2. You should see the **"properties"** bucket in the list
3. Click on the **"properties"** bucket (or click the folder icon)
4. Click the **"Edit bucket"** button (top right)

### Step 2: Enable Public Access

In the "Edit bucket" modal:

1. Find the **"Public bucket"** toggle/checkbox
2. **Enable it** (turn it ON) ✅
3. This allows public access to files via public URLs
4. Click **"Save"** or **"Update bucket"**

### Step 3: Verify Bucket is Public

After saving:
- The bucket should show as **"Public"** in the bucket list
- Or you'll see a public icon/indicator next to the bucket name

### Step 4: Test the Image URL

Try accessing an image URL directly in your browser:
```
https://yjvyrrdvalzjtcwfnymc.supabase.co/storage/v1/object/public/properties/properties/property-1767111578486-0uuv4ke14gw.png
```

**Note:** The URL structure is:
- `/storage/v1/object/public/` - Supabase storage endpoint
- `properties` - Bucket name
- `properties/` - Folder name (where files are stored)
- `property-xxx.png` - File name

**If the image loads:** ✅ Bucket is now public, images should work!
**If it still doesn't load:** Check the SELECT policy allows public reads

### Step 5: Restart Dev Server

After making the bucket public:
1. **Restart your Next.js dev server**
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Reload the property page**

## Why This Fixes It

- **Private buckets** require authentication to access files
- **Public buckets** allow direct URL access without authentication
- Your code uses `getPublicUrl()` which only works with public buckets
- The SELECT policy allows reading, but the bucket must be public for the URLs to work

## Quick Checklist

- [ ] Bucket name is `properties` ✅ (confirmed)
- [ ] Bucket is set to **Public** ⚠️ (needs to be enabled)
- [ ] SELECT policy allows `anon, authenticated` ✅ (already set)
- [ ] Files are in `properties/` folder ✅ (confirmed)
- [ ] Restart dev server after changes

## After Making Bucket Public

Images should display immediately. The URL format is correct, it just needs the bucket to be public for the URLs to be accessible.

