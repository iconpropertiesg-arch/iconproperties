-- Complete Database Migration for Icon Properties
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/yjvyrrdvalzjtcwfnymc/sql/new
-- This will create all necessary tables for the application

-- ============================================
-- 1. ADMINS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- ============================================
-- 2. PROPERTIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL, -- "sold", "available", "leased", etc.
  type TEXT NOT NULL, -- "residential", "commercial", etc.
  purpose TEXT DEFAULT 'buy', -- "buy" or "rent"
  year INTEGER,
  price DOUBLE PRECISION NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DOUBLE PRECISION,
  location TEXT NOT NULL,
  coordinates TEXT, -- JSON string for lat/lng
  featured BOOLEAN DEFAULT false,
  images TEXT[], -- Array of image URLs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_purpose ON properties(purpose);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);

-- ============================================
-- 3. PROPERTY_TRANSLATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS property_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  locale TEXT NOT NULL, -- "en", "de", "es"
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  subtitle TEXT,
  features TEXT[], -- Array of feature strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id, locale)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_property_translations_property_id ON property_translations(property_id);
CREATE INDEX IF NOT EXISTS idx_property_translations_locale ON property_translations(locale);

-- ============================================
-- 4. PORTFOLIO_REQUESTS TABLE
-- ============================================
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

-- Create indexes for portfolio_requests
CREATE INDEX IF NOT EXISTS idx_portfolio_requests_email ON portfolio_requests(email);
CREATE INDEX IF NOT EXISTS idx_portfolio_requests_created_at ON portfolio_requests(created_at DESC);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_translations_updated_at
  BEFORE UPDATE ON property_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_requests_updated_at
  BEFORE UPDATE ON portfolio_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on portfolio_requests
ALTER TABLE portfolio_requests ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public inserts" ON portfolio_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy to allow reads for service role (for admin operations)
CREATE POLICY "Allow service role reads" ON portfolio_requests
  FOR SELECT
  TO service_role
  USING (true);

-- Note: admins, properties, and property_translations tables
-- are accessed via Prisma with service role key, so RLS is not needed
-- If you want to add RLS later, you can enable it similarly

-- ============================================
-- VERIFICATION QUERIES (Optional - run to verify)
-- ============================================

-- Uncomment these to verify tables were created:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('admins', 'properties', 'property_translations', 'portfolio_requests');

-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'properties';

