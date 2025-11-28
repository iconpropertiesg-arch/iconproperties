-- Create portfolio_requests table in Supabase
-- Run this SQL in your Supabase SQL Editor

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

-- Create policy to allow reads only for authenticated admin users
-- You'll need to create an admin role or use service role key for admin operations
CREATE POLICY "Allow admin reads" ON portfolio_requests
  FOR SELECT
  TO authenticated
  USING (true); -- Adjust this based on your auth setup

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

