# Supabase Database Setup Guide

This guide will help you set up the complete database schema in your new Supabase project.

## Prerequisites

- ✅ Updated `.env.local` with new Supabase credentials
- ✅ Access to Supabase Dashboard: https://supabase.com/dashboard/project/yjvyrrdvalzjtcwfnymc

## Method 1: Using SQL Migration (Recommended)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/yjvyrrdvalzjtcwfnymc
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query** button

### Step 2: Run the Complete Migration

1. Open the file `supabase-complete-migration.sql` in this project
2. Copy the **entire contents** of the file
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press `Ctrl+Enter`)

This will create all tables:
- ✅ `admins` - Admin users table
- ✅ `properties` - Property listings table
- ✅ `property_translations` - Multi-language property content
- ✅ `portfolio_requests` - Portfolio request form submissions

### Step 3: Verify Tables Were Created

Run this query in SQL Editor to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('admins', 'properties', 'property_translations', 'portfolio_requests');
```

You should see all 4 tables listed.

### Step 4: Create Admin User

Run this SQL to create the default admin user (password: `admin123`):

```sql
-- Note: The password is hashed using bcrypt
-- Default password: admin123
-- Email: jam752575@gmail.com

INSERT INTO admins (id, email, password, name, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'jam752575@gmail.com',
  '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', -- This is a placeholder, see below
  'Admin User',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
```

**⚠️ Important:** The password hash above is a placeholder. You have two options:

**Option A: Use Prisma Seed (Recommended)**
```bash
npm run db:seed
```

**Option B: Generate Hash Manually**
1. Run this in Node.js to generate the hash:
```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10).then(console.log);
```
2. Copy the generated hash and replace the placeholder in the SQL above.

---

## Method 2: Using Prisma (Alternative)

If you prefer using Prisma to push the schema:

### Step 1: Generate Prisma Client

```bash
npm run db:generate
```

### Step 2: Push Schema to Database

```bash
npm run db:push
```

This will create all tables based on `prisma/schema.prisma`.

### Step 3: Seed Admin User

```bash
npm run db:seed
```

This creates the default admin user:
- **Email**: `jam752575@gmail.com`
- **Password**: `admin123`
- ⚠️ **Change the password after first login!**

---

## Verify Database Connection

After setup, test the connection:

1. **Restart your Next.js dev server:**
   ```bash
   npm run dev
   ```

2. **Test admin login:**
   - Go to: http://localhost:3000/admin/login
   - Email: `jam752575@gmail.com`
   - Password: `admin123`

3. **Check database in Prisma Studio:**
   ```bash
   npm run db:studio
   ```
   This opens a visual database browser at http://localhost:5555

---

## Database Schema Overview

### Tables Created:

1. **admins**
   - Admin user accounts
   - Fields: id, email, password, name, timestamps

2. **properties**
   - Property listings
   - Fields: id, slug, status, type, purpose, price, bedrooms, bathrooms, area, location, coordinates, featured, images, timestamps

3. **property_translations**
   - Multi-language content for properties
   - Fields: id, property_id, locale, title, description, subtitle, features, timestamps
   - Supports: English (en), German (de), Spanish (es)

4. **portfolio_requests**
   - Form submissions from "Request Private Portfolio"
   - Fields: id, name, email, phone, buyer_or_seller, budget, preferred_areas, type_of_home, timeline, locale, timestamps

---

## Troubleshooting

### Error: "relation already exists"
- Tables may already exist. Drop them first:
```sql
DROP TABLE IF EXISTS portfolio_requests CASCADE;
DROP TABLE IF EXISTS property_translations CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
```
Then run the migration again.

### Error: "permission denied"
- Make sure you're using the correct database credentials
- Check that your `.env.local` has the correct `DATABASE_URL` and `DIRECT_URL`

### Connection Issues
- Verify your `.env.local` file has the correct Supabase project credentials
- Check that the password in `DATABASE_URL` matches: `iconproperties1232`
- Ensure you're using the connection pooler URL (port 6543) for `DATABASE_URL`

---

## Next Steps

1. ✅ Database tables created
2. ✅ Admin user created
3. 🔄 **Update Vercel environment variables** (if deploying)
4. 🔄 **Configure Supabase Storage bucket policies** (for image uploads)
5. 🔄 **Test property creation** in admin panel

---

## Storage Bucket Setup

Your Supabase project has a "properties" bucket. Make sure it has the correct policies:

1. Go to **Storage** → **Policies** in Supabase Dashboard
2. Create policies for the "properties" bucket:
   - **Insert**: Allow authenticated users (or service role)
   - **Select**: Allow public (for reading images)
   - **Update**: Allow authenticated users
   - **Delete**: Allow authenticated users

---

## Support

If you encounter any issues:
1. Check the Supabase dashboard logs
2. Verify all environment variables are set correctly
3. Ensure the database connection string uses the correct password

