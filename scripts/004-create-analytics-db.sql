-- Analytics Database
-- Stores all analytics data for dashboards and reporting

CREATE DATABASE IF NOT EXISTS linka_analytics;
USE linka_analytics;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Business analytics summary
CREATE TABLE IF NOT EXISTS business_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL,
    metric_date DATE NOT NULL,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    new_customers INTEGER DEFAULT 0,
    returning_customers INTEGER DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    bounce_rate DECIMAL(5,4) DEFAULT 0,
    session_duration INTEGER DEFAULT 0,
    top_products JSONB DEFAULT '[]',
    top_categories JSONB DEFAULT '[]',
    traffic_sources JSONB DEFAULT '{}',
    customer_demographics JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(business_id, metric_date)
);

-- Real-time analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_data JSONB NOT NULL,
    user_id UUID,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    page_url TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed BOOLEAN DEFAULT FALSE
);

-- Product performance analytics
CREATE TABLE IF NOT EXISTS product_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL,
    product_id UUID NOT NULL,
    metric_date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    add_to_cart INTEGER DEFAULT 0,
    purchases INTEGER DEFAULT 0,
    revenue DECIMAL(15,2) DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    inventory_turnover DECIMAL(10,4) DEFAULT 0,
    profit_margin DECIMAL(5,4) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(business_id, product_id, metric_date)
);

-- Customer behavior analytics
CREATE TABLE IF NOT EXISTS customer_behavior_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL,
    customer_id UUID NOT NULL,
    metric_date DATE NOT NULL,
    session_count INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    time_spent INTEGER DEFAULT 0,
    actions_taken INTEGER DEFAULT 0,
    purchases_made INTEGER DEFAULT 0,
    total_spent DECIMAL(15,2) DEFAULT 0,
    favorite_categories JSONB DEFAULT '[]',
    browsing_patterns JSONB DEFAULT '{}',
    device_info JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(business_id, customer_id, metric_date)
);

-- Marketing campaign analytics
CREATE TABLE IF NOT EXISTS campaign_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL,
    campaign_id UUID NOT NULL,
    campaign_name VARCHAR(255) NOT NULL,
    campaign_type VARCHAR(50) NOT NULL,
    metric_date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    cost DECIMAL(15,2) DEFAULT 0,
    revenue DECIMAL(15,2) DEFAULT 0,
    roi DECIMAL(10,4) DEFAULT 0,
    ctr DECIMAL(5,4) DEFAULT 0,
    cpc DECIMAL(10,2) DEFAULT 0,
    cpa DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(business_id, campaign_id, metric_date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_business_analytics_business_date ON business_analytics(business_id, metric_date);
CREATE INDEX IF NOT EXISTS idx_analytics_events_business_type ON analytics_events(business_id, event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_product_analytics_business_product ON product_analytics(business_id, product_id);
CREATE INDEX IF NOT EXISTS idx_customer_behavior_business_customer ON customer_behavior_analytics(business_id, customer_id);
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_business_campaign ON campaign_analytics(business_id, campaign_id);
