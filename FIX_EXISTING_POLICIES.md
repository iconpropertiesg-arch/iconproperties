# Quick Fix for Existing Supabase Storage Policies

Based on your current policies, here's what needs to be fixed:

## Current Issues:

1. ❌ **INSERT policy** uses `authenticated` role → Should be `anon`
2. ❌ **SELECT policy** only allows JPG files → Should allow all image types
3. ⚠️ Need to verify policies reference `properties` bucket correctly

## Step-by-Step Fix:

### Fix 1: Update INSERT Policy (Most Important!)

1. Click on **"Allow authenticated uploads 1jpriur_0"** policy
2. Click the **three dots (⋮)** menu → **"Edit policy"**
3. In the **"Target roles"** section:
   - **Remove**: `authenticated`
   - **Add**: `anon`
4. Verify the **Policy definition** SQL is:
   ```sql
   bucket_id = 'properties' AND (storage.foldername(name))[1] = 'properties'
   ```
5. Click **"Save policy"**

**Why?** Your admin panel uses JWT authentication (not Supabase auth), so it needs `anon` role for client-side uploads.

### Fix 2: Update SELECT Policy

1. Click on **"Give anon users access to JPG images in folder 1jpriur_0"** policy
2. Click the **three dots (⋮)** menu → **"Edit policy"**
3. In the **Policy definition** SQL, replace with:
   ```sql
   bucket_id = 'properties'
   ```
   (Remove the JPG-only restriction)
4. Optionally change **Policy name** to: `Allow public reads`
5. Keep **Target roles**: `anon, authenticated`
6. Click **"Save policy"**

**Why?** You need to support all image types (jpg, png, webp, gif), not just JPG.

### Verify UPDATE and DELETE Policies

Your existing UPDATE and DELETE policies look fine (they use `authenticated` which is OK for those operations). Just verify they reference the `properties` bucket:

- **UPDATE policy SQL should be**: `bucket_id = 'properties'`
- **DELETE policy SQL should be**: `bucket_id = 'properties'`

## After Fixing:

1. **Restart your Next.js dev server**
2. **Try uploading a large file (20-50MB)**
3. It should work now! ✅

## Summary of Required Changes:

| Policy | Current Role | Should Be | Action |
|--------|-------------|-----------|--------|
| INSERT | `authenticated` | `anon` | ⚠️ **MUST CHANGE** |
| SELECT | `anon, authenticated` | `anon, authenticated` | ✅ OK (but remove JPG restriction) |
| UPDATE | `authenticated` | `authenticated` | ✅ OK |
| DELETE | `authenticated` | `authenticated` | ✅ OK |

