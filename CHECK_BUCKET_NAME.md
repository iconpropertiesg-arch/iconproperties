# Fix "Bucket not found" Error

## Problem
The error "Bucket not found" means the bucket name in your code doesn't match the actual bucket name in Supabase.

## Solution: Verify Bucket Name

### Step 1: Check Actual Bucket Name in Supabase

1. Go to: https://supabase.com/dashboard/project/yjvyrrdvalzjtcwfnymc/storage/files/buckets
2. Look at the list of buckets
3. **What is the exact name of your bucket?**
   - Is it `properties`?
   - Or something else like `property_images`?

### Step 2: Check the URL Structure

The error shows this URL:
```
https://yjvyrrdvalzjtcwfnymc.supabase.co/storage/v1/object/public/properties/property-1767111578486-0uuv4ke14gw.png
```

But your code uploads to `properties/` folder, so the URL should be:
```
https://yjvyrrdvalzjtcwfnymc.supabase.co/storage/v1/object/public/properties/properties/property-1767111578486-0uuv4ke14gw.png
```

Notice: `/properties/properties/` (bucket name + folder name)

### Step 3: Verify Bucket Exists and is Public

1. In Supabase Dashboard → Storage → Buckets
2. Find your bucket
3. Make sure:
   - ✅ Bucket exists
   - ✅ Bucket is set to **Public**
   - ✅ Bucket name matches what's in your code (`properties`)

### Step 4: Common Issues

**Issue 1: Bucket name mismatch**
- Code uses: `properties`
- Supabase has: `property_images` (or different name)
- **Fix:** Either rename bucket in Supabase OR update code to match

**Issue 2: Bucket not created**
- Bucket doesn't exist at all
- **Fix:** Create the bucket named `properties` and set it to Public

**Issue 3: Wrong URL path**
- URL missing folder name
- **Fix:** Make sure URL includes both bucket name and folder: `/properties/properties/`

## Quick Check

1. **What is the exact bucket name in Supabase?** (Check Storage → Buckets)
2. **Is the bucket set to Public?** (Edit bucket → Enable "Public bucket")
3. **Does the bucket name in code match?** (Should be `properties`)

## If Bucket Name is Different

If your bucket is named something else (like `property_images`), you need to either:

**Option A:** Rename the bucket in Supabase to `properties`

**Option B:** Update all code references from `properties` to the actual bucket name

Let me know what the actual bucket name is, and I'll help you fix it!

