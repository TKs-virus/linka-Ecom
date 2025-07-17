-- Update users table to support OAuth providers
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS provider VARCHAR(50) DEFAULT 'email',
ADD COLUMN IF NOT EXISTS provider_id TEXT,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index for provider lookups
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider);
CREATE INDEX IF NOT EXISTS idx_users_provider_id ON users(provider_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Update existing users to have email_verified = true if they don't have a provider set
UPDATE users 
SET email_verified = TRUE, 
    provider = 'email',
    updated_at = NOW()
WHERE provider IS NULL OR provider = '';

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add some sample data for testing
INSERT INTO users (id, email, first_name, last_name, role, provider, email_verified) 
VALUES 
    ('test-user-1', 'test@example.com', 'Test', 'User', 'CUSTOMER', 'email', true),
    ('test-retailer-1', 'retailer@example.com', 'Test', 'Retailer', 'RETAILER', 'email', true)
ON CONFLICT (id) DO NOTHING;

-- Insert corresponding retailer profile for test retailer
INSERT INTO retailers (user_id, business_name, business_email)
VALUES ('test-retailer-1', 'Test Retailer Store', 'retailer@example.com')
ON CONFLICT (user_id) DO NOTHING;
