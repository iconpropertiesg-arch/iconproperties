# Supabase Storage RLS Policies Setup for Large File Uploads

## Problem
Files larger than 4.5MB cannot be uploaded via server-side (Vercel limit). We need to enable client-side direct uploads to Supabase Storage, which requires proper RLS (Row Level Security) policies.

## Step-by-Step: Set Up RLS Policies

### Step 1: Go to Supabase Storage Policies
1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/yjvyrrdvalzjtcwfnymc
2. Click on **Storage** in the left sidebar
3. Click on **Policies** tab
4. Find the **"properties"** bucket in the list

### Step 2: Fix or Create INSERT Policy (for uploads)

**If you already have an INSERT policy:**
1. Click on the existing "Allow authenticated uploads" policy
2. Click **"Edit policy"** or the three dots menu → **"Edit policy"**
3. Change:
   - **Target roles**: Change from `authenticated` to `anon` ⚠️ **This is important!**
   - **Policy definition** (SQL) - Make sure it's:
   ```sql
   bucket_id = 'properties' AND (storage.foldername(name))[1] = 'properties'
   ```
4. Click **"Save policy"**

**If creating new:**
1. Click **"New policy"** button
2. Select **"For full customization"** or **"Create a policy from scratch"**
3. Configure:
   - **Policy name**: `Allow uploads to properties folder`
   - **Allowed operation**: Select **INSERT**
   - **Target roles**: Select **anon** (since admin panel uses JWT auth, not Supabase auth)
   - **Policy definition** (SQL):
   ```sql
   bucket_id = 'properties' AND (storage.foldername(name))[1] = 'properties'
   ```
   - Click **"Review"** then **"Save policy"**
   
   **Note:** We use `anon` role because the admin panel uses JWT authentication (not Supabase auth). The folder restriction (`properties/`) provides security.

### Step 3: Fix or Create SELECT Policy (for reading images)

**If you already have a SELECT policy:**
1. Click on the existing "Give anon users access to JPG images in folder" policy
2. Click **"Edit policy"** or the three dots menu → **"Edit policy"**
3. Change:
   - **Policy name**: `Allow public reads` (optional, for clarity)
   - **Policy definition** (SQL) - Remove JPG restriction, use:
   ```sql
   bucket_id = 'properties'
   ```
   - Keep **Target roles**: `anon, authenticated`
4. Click **"Save policy"**

**If creating new:**
1. Click **"New policy"** button
2. Configure:
   - **Policy name**: `Allow public reads`
   - **Allowed operation**: Select **SELECT**
   - **Target roles**: Select **anon, authenticated** (public access)
   - **Policy definition** (SQL):
   ```sql
   bucket_id = 'properties'
   ```
   - Click **"Review"** then **"Save policy"**
   
   **Note:** This allows reading ALL image types (jpg, png, webp, gif), not just JPG.

### Step 4: Create UPDATE Policy (for updating images)

1. Click **"New policy"** again
2. Configure:
   - **Policy name**: `Allow authenticated updates`
   - **Allowed operation**: Select **UPDATE**
   - **Target roles**: Select **authenticated**
   - **Policy definition** (SQL):
   ```sql
   bucket_id = 'properties'
   ```
   - Click **"Review"** then **"Save policy"**

### Step 5: Create DELETE Policy (for deleting images)

1. Click **"New policy"** again
2. Configure:
   - **Policy name**: `Allow authenticated deletes`
   - **Allowed operation**: Select **DELETE**
   - **Target roles**: Select **authenticated**
   - **Policy definition** (SQL):
   ```sql
   bucket_id = 'properties'
   ```
   - Click **"Review"** then **"Save policy"**

## Verify Policies

After creating all policies, you should see:
- ✅ Allow authenticated uploads (INSERT)
- ✅ Allow public reads (SELECT)
- ✅ Allow authenticated updates (UPDATE)
- ✅ Allow authenticated deletes (DELETE)

## Important Notes

⚠️ **Security Considerations:**
- The INSERT policy allows uploads to the `properties/` folder only
- SELECT is public (anyone can view images) - this is usually fine for property images
- UPDATE and DELETE require authentication

✅ **File Size:**
- With these policies, you can upload files up to 50MB (or whatever limit you set in bucket settings)
- Client-side uploads bypass Vercel's 4.5MB limit

## Test the Setup

After setting up policies:
1. Restart your Next.js dev server
2. Try uploading a large file (20-50MB) in the admin panel
3. It should work without RLS errors

