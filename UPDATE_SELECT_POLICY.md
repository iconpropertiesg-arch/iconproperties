# Update SELECT Policy to Allow JPG, JPEG, and PNG

## Current Issue
The SELECT policy only allows JPG images. We need to allow JPG, JPEG, and PNG.

## Step-by-Step Fix

### Step 1: Edit the SELECT Policy
1. Click on **"Give anon users access to JPG images in folder 1jpriur_0"** policy
2. Click the **three dots (⋮)** menu → **"Edit policy"**

### Step 2: Update the Policy Definition SQL

Replace the current SQL with this:

```sql
bucket_id = 'properties' AND (
  storage.extension(name) = 'jpg' OR 
  storage.extension(name) = 'jpeg' OR 
  storage.extension(name) = 'png'
)
```

**Or if you want to allow all common image types (including webp, gif):**

```sql
bucket_id = 'properties' AND (
  storage.extension(name) = 'jpg' OR 
  storage.extension(name) = 'jpeg' OR 
  storage.extension(name) = 'png' OR
  storage.extension(name) = 'webp' OR
  storage.extension(name) = 'gif'
)
```

### Step 3: Update Policy Name (Optional)
- Change **Policy name** to: `Allow public reads for images`
- Keep **Target roles**: `anon, authenticated`
- Click **"Save policy"**

## Alternative: Allow All Files in Bucket

If you want to allow reading ALL files (not just images), use this simpler SQL:

```sql
bucket_id = 'properties'
```

This allows reading any file type in the properties bucket.

## Recommended: Use the First Option (JPG, JPEG, PNG)

For your use case, use the first SQL that allows jpg, jpeg, and png:

```sql
bucket_id = 'properties' AND (
  storage.extension(name) = 'jpg' OR 
  storage.extension(name) = 'jpeg' OR 
  storage.extension(name) = 'png'
)
```

This provides security by only allowing image files to be read.

