# Fix: Images Uploading But Not Displaying

## Problem
Images are successfully uploading to Supabase Storage bucket, but not displaying on the website or in the admin panel.

## Root Causes & Solutions

### Issue 1: Bucket Not Set to Public ⚠️ **MOST LIKELY**

The bucket must be **public** for images to be accessible via public URLs.

**Fix:**
1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/yjvyrrdvalzjtcwfnymc/storage/files/buckets
2. Click on the **"properties"** bucket
3. Click **"Edit bucket"** button
4. Make sure **"Public bucket"** is **✅ ENABLED** (toggle should be ON)
5. Click **"Save"**

**Verify:**
- The bucket should show as "Public" in the bucket list
- Public URLs should work: `https://yjvyrrdvalzjtcwfnymc.supabase.co/storage/v1/object/public/properties/...`

### Issue 2: SELECT Policy Not Working

Even if the bucket is public, the SELECT policy must allow reading.

**Verify SELECT Policy:**
1. Go to **Storage** → **Policies**
2. Find the SELECT policy: "Give anon users access to JPG images in folder"
3. Make sure it has:
   - **Target roles**: `anon, authenticated`
   - **SQL**: `bucket_id = 'properties' AND (storage.extension(name) = 'jpg' OR storage.extension(name) = 'jpeg' OR storage.extension(name) = 'png')`

### Issue 3: Next.js Image Configuration

I've already updated `next.config.js` to explicitly allow Supabase domain. **Restart your dev server** after this change.

### Issue 4: CORS Issues

If images still don't load, check browser console for CORS errors.

**Fix CORS in Supabase:**
1. Go to **Storage** → **Settings** (or **API** → **CORS**)
2. Add your domain to allowed origins if needed
3. Or use Supabase's default CORS settings (should work out of the box)

## Step-by-Step Checklist

- [ ] **Bucket is set to Public** (most important!)
- [ ] SELECT policy allows `anon, authenticated` roles
- [ ] SELECT policy SQL includes jpg, jpeg, png
- [ ] Next.js config includes Supabase domain (already done)
- [ ] Restart dev server after config changes
- [ ] Test image URL directly in browser: `https://yjvyrrdvalzjtcwfnymc.supabase.co/storage/v1/object/public/properties/properties/property-xxx.png`

## Test the Image URL

Try opening this URL directly in your browser:
```
https://yjvyrrdvalzjtcwfnymc.supabase.co/storage/v1/object/public/properties/properties/property-1767111578486-0uuv4ke14gw.png
```

**If it loads:** The issue is in your code/Next.js config (already fixed)
**If it doesn't load:** The bucket is not public or SELECT policy is wrong

## Quick Fix Summary

1. **Make bucket public** (Storage → Buckets → Edit bucket → Enable "Public bucket")
2. **Restart dev server** (to apply Next.js config changes)
3. **Test image URL** in browser directly
4. **Clear browser cache** and reload the page

