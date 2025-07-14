-- Add new columns to users table for email verification
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS verification_token TEXT;

-- Add new columns to retailers table for enhanced business information
ALTER TABLE retailers 
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS industry_type TEXT,
ADD COLUMN IF NOT EXISTS store_location TEXT,
ADD COLUMN IF NOT EXISTS inventory_file_url TEXT;

-- Create storage bucket for retailer files (if using Supabase storage)
-- This would typically be done through the Supabase dashboard or API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('retailer-files', 'retailer-files', false);

-- Update existing users to have email_verified = true (for existing data)
UPDATE users SET email_verified = TRUE WHERE email_verified IS NULL;
