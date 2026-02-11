-- License Key System Database Schema
-- Run this SQL in your Supabase SQL Editor

-- ============================================
-- LICENSE KEYS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS license_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key_code TEXT UNIQUE NOT NULL,
  project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
  key_type TEXT NOT NULL CHECK (key_type IN ('single_use', 'multi_use', 'time_limited', 'unlimited')),
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  
  -- Constraints
  CONSTRAINT valid_max_uses CHECK (max_uses > 0 OR key_type = 'unlimited'),
  CONSTRAINT valid_current_uses CHECK (current_uses >= 0 AND current_uses <= max_uses)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_license_keys_key_code ON license_keys(key_code);
CREATE INDEX IF NOT EXISTS idx_license_keys_project_id ON license_keys(project_id);
CREATE INDEX IF NOT EXISTS idx_license_keys_is_active ON license_keys(is_active);

-- ============================================
-- LICENSE REDEMPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS license_redemptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  license_key_id UUID REFERENCES license_keys(id) ON DELETE CASCADE,
  project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
  redeemed_by_email TEXT,
  redeemed_by_ip TEXT,
  redeemed_at TIMESTAMP DEFAULT NOW(),
  download_count INTEGER DEFAULT 0,
  last_download_at TIMESTAMP,
  
  -- Constraints
  CONSTRAINT valid_download_count CHECK (download_count >= 0)
);

-- Indexes for analytics and lookups
CREATE INDEX IF NOT EXISTS idx_redemptions_license_key ON license_redemptions(license_key_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_project ON license_redemptions(project_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_email ON license_redemptions(redeemed_by_email);
CREATE INDEX IF NOT EXISTS idx_redemptions_date ON license_redemptions(redeemed_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_redemptions ENABLE ROW LEVEL SECURITY;

-- License Keys Policies
-- Allow anyone to read active keys (for validation)
CREATE POLICY "Anyone can read active license keys"
  ON license_keys FOR SELECT
  USING (is_active = true);

-- Only authenticated admins can insert/update/delete keys
CREATE POLICY "Admins can manage license keys"
  ON license_keys FOR ALL
  USING (auth.role() = 'authenticated');

-- License Redemptions Policies
-- Allow anyone to insert redemptions (when redeeming a key)
CREATE POLICY "Anyone can create redemptions"
  ON license_redemptions FOR INSERT
  WITH CHECK (true);

-- Allow users to read their own redemptions
CREATE POLICY "Users can read their redemptions"
  ON license_redemptions FOR SELECT
  USING (redeemed_by_email = auth.jwt()->>'email' OR auth.role() = 'authenticated');

-- Only admins can update/delete redemptions
CREATE POLICY "Admins can manage redemptions"
  ON license_redemptions FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete redemptions"
  ON license_redemptions FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to automatically increment current_uses when a key is redeemed
CREATE OR REPLACE FUNCTION increment_key_usage()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE license_keys
  SET current_uses = current_uses + 1
  WHERE id = NEW.license_key_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
CREATE TRIGGER on_license_redemption
  AFTER INSERT ON license_redemptions
  FOR EACH ROW
  EXECUTE FUNCTION increment_key_usage();

-- Function to check if a key is valid
CREATE OR REPLACE FUNCTION is_key_valid(p_key_code TEXT, p_project_id BIGINT)
RETURNS BOOLEAN AS $$
DECLARE
  v_key license_keys%ROWTYPE;
BEGIN
  -- Get the key
  SELECT * INTO v_key
  FROM license_keys
  WHERE key_code = p_key_code
    AND project_id = p_project_id
    AND is_active = true;
  
  -- Key doesn't exist
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  -- Check expiry
  IF v_key.expires_at IS NOT NULL AND v_key.expires_at < NOW() THEN
    RETURN false;
  END IF;
  
  -- Check usage limit (except for unlimited keys)
  IF v_key.key_type != 'unlimited' AND v_key.current_uses >= v_key.max_uses THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment to insert sample license keys
/*
INSERT INTO license_keys (key_code, project_id, key_type, max_uses, notes)
VALUES 
  ('PROJ-TEST-0001-ABCD', (SELECT id FROM projects LIMIT 1), 'single_use', 1, 'Test single-use key'),
  ('PROJ-TEST-0002-EFGH', (SELECT id FROM projects LIMIT 1), 'multi_use', 5, 'Test multi-use key'),
  ('PROJ-TEST-0003-IJKL', (SELECT id FROM projects LIMIT 1), 'unlimited', 999999, 'Test unlimited key');
*/

-- ============================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  ip_address TEXT,
  user_agent TEXT
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON newsletter_subscribers(is_active);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (subscribe)
CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Only admins can read all subscribers
CREATE POLICY "Admins can read subscribers"
  ON newsletter_subscribers FOR SELECT
  USING (auth.role() = 'authenticated');

