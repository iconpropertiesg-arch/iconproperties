# Fix INSERT Policy for Large File Uploads

## Problem
Getting "new row violates row-level security policy" error when uploading large files (20MB+).

## Root Cause
The INSERT policy is not correctly configured to allow `anon` role uploads to the `properties/` folder.

## Solution: Update INSERT Policy

### Step 1: Go to Supabase Storage Policies
1. Go to: https://supabase.com/dashboard/project/yjvyrrdvalzjtcwfnymc/storage/files/policies
2. Find the **"properties"** bucket
3. Find the INSERT policy: **"Allow authenticated uploads"** or similar

### Step 2: Edit the INSERT Policy

1. Click on the INSERT policy
2. Click the **three dots (⋮)** menu → **"Edit policy"**

### Step 3: Update Policy Configuration

**Important Settings:**
- **Policy name**: `Allow uploads to properties folder`
- **Allowed operation**: `INSERT`
- **Target roles**: `anon` ⚠️ **Must be anon, not authenticated!**
- **Policy definition (SQL)**: Use this exact SQL:

```sql
bucket_id = 'properties' AND (storage.foldername(name))[1] = 'properties'
```

**OR** if you want to allow uploads to any folder in the bucket:

```sql
bucket_id = 'properties'
```

### Step 4: Verify Policy

After saving, the policy should show:
- **COMMAND**: `INSERT`
- **APPLIED TO**: `anon`
- **SQL**: `bucket_id = 'properties' AND (storage.foldername(name))[1] = 'properties'`

## Why This Fixes It

- Large files (>4.5MB) use **client-side direct upload**
- Client-side uploads use the **anon key** (not service role key)
- The INSERT policy **must allow `anon` role** for client-side uploads to work
- The folder restriction ensures uploads only go to `properties/` folder

## Test After Fixing

1. **Restart your dev server**
2. **Try uploading a large file (20-50MB)**
3. It should work without RLS errors

## Alternative: Use Server-Side Upload for All Files

If you continue having issues, you can force all uploads to use server-side (which bypasses RLS):

In `PropertyForm.tsx`, change:
```typescript
// Always use server-side upload
await uploadViaServer(index, file);
```

But this has a 4.5MB limit on Vercel, so fixing the RLS policy is better.

