-- SME Accounts Database
-- Manages small and medium enterprise accounts

CREATE DATABASE IF NOT EXISTS linka_sme;
USE linka_sme;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- SME business profiles
CREATE TABLE IF NOT EXISTS sme_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE,
    business_name VARCHAR(255) NOT NULL,
    business_registration_number VARCHAR(100),
    tax_identification_number VARCHAR(100),
    business_type VARCHAR(50) NOT NULL,
    industry_category VARCHAR(100) NOT NULL,
    business_description TEXT,
    website_url VARCHAR(255),
    business_email VARCHAR(255) NOT NULL,
    business_phone VARCHAR(20),
    logo_url TEXT,
    banner_url TEXT,
    established_date DATE,
    employee_count INTEGER,
    annual_revenue DECIMAL(15,2),
    business_hours JSONB,
    social_media_links JSONB,
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'suspended')),
    verification_documents JSONB,
    subscription_plan VARCHAR(50) DEFAULT 'basic',
    subscription_status VARCHAR(20) DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'suspended', 'cancelled')),
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- SME business locations
CREATE TABLE IF NOT EXISTS sme_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sme_id UUID REFERENCES sme_profiles(id) ON DELETE CASCADE,
    location_name VARCHAR(255) NOT NULL,
    is_headquarters BOOLEAN DEFAULT FALSE,
    street_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    coordinates POINT,
    phone VARCHAR(20),
    email VARCHAR(255),
    operating_hours JSONB,
    services_offered TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SME team members
CREATE TABLE IF NOT EXISTS sme_team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sme_id UUID REFERENCES sme_profiles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role VARCHAR(50) NOT NULL,
    permissions JSONB DEFAULT '{}',
    department VARCHAR(100),
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(sme_id, user_id)
);

-- SME financial information
CREATE TABLE IF NOT EXISTS sme_financial_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sme_id UUID REFERENCES sme_profiles(id) ON DELETE CASCADE,
    bank_name VARCHAR(255),
    account_number VARCHAR(100),
    routing_number VARCHAR(50),
    account_holder_name VARCHAR(255),
    payment_methods JSONB DEFAULT '[]',
    tax_settings JSONB DEFAULT '{}',
    billing_address JSONB,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SME subscription history
CREATE TABLE IF NOT EXISTS sme_subscription_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sme_id UUID REFERENCES sme_profiles(id) ON DELETE CASCADE,
    plan_name VARCHAR(50) NOT NULL,
    plan_price DECIMAL(10,2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sme_profiles_user_id ON sme_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_sme_profiles_business_name ON sme_profiles(business_name);
CREATE INDEX IF NOT EXISTS idx_sme_profiles_industry ON sme_profiles(industry_category);
CREATE INDEX IF NOT EXISTS idx_sme_profiles_verification ON sme_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_sme_locations_sme_id ON sme_locations(sme_id);
CREATE INDEX IF NOT EXISTS idx_sme_team_sme_id ON sme_team_members(sme_id);
CREATE INDEX IF NOT EXISTS idx_sme_financial_sme_id ON sme_financial_info(sme_id);
