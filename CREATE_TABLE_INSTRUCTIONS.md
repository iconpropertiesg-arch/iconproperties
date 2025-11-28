# Create portfolio_requests Table in Supabase

Since your Supabase is already connected, follow these steps to create the table:

## Step 1: Open Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/zgxjuueedtcfwlkyzrvw
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query** button

## Step 2: Copy and Paste This SQL

Copy the entire SQL below and paste it into the SQL Editor:

```sql
-- Create portfolio_requests table
CREATE TABLE IF NOT EXISTS portfolio_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  buyer_or_seller TEXT NOT NULL,
  budget TEXT,
  preferred_areas TEXT,
  type_of_home TEXT,
  timeline TEXT,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_portfolio_requests_email ON portfolio_requests(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_portfolio_requests_created_at ON portfolio_requests(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE portfolio_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public inserts" ON portfolio_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads for service role (for admin operations)
CREATE POLICY "Allow service role reads" ON portfolio_requests
  FOR SELECT
  TO service_role
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolio_requests_updated_at
  BEFORE UPDATE ON portfolio_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Step 3: Run the SQL

1. Click the **Run** button (or press `Ctrl+Enter`)
2. You should see: **"Success. No rows returned"**

## Step 4: Verify the Table

1. Go to **Table Editor** in the left sidebar
2. You should see `portfolio_requests` in the table list
3. Click on it to see the table structure

## Done! ✅

The table is now created and ready to store form submissions.

