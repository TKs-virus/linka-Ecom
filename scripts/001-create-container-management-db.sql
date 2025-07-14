-- Container Management Database
-- This database tracks all containers, their locations, and ratings

CREATE DATABASE IF NOT EXISTS linka_containers;
USE linka_containers;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Container registry table
CREATE TABLE IF NOT EXISTS containers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL,
    container_name VARCHAR(255) NOT NULL UNIQUE,
    container_type VARCHAR(50) NOT NULL CHECK (container_type IN ('sme_dashboard', 'store_front', 'service_portal')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance', 'suspended')),
    docker_container_id VARCHAR(255),
    port_number INTEGER,
    domain_name VARCHAR(255),
    ssl_enabled BOOLEAN DEFAULT FALSE,
    location_region VARCHAR(50) NOT NULL,
    location_zone VARCHAR(50),
    server_ip INET,
    resource_limits JSONB DEFAULT '{"cpu": "1", "memory": "512Mi", "storage": "10Gi"}',
    environment_variables JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_health_check TIMESTAMP WITH TIME ZONE,
    health_status VARCHAR(20) DEFAULT 'unknown' CHECK (health_status IN ('healthy', 'unhealthy', 'unknown'))
);

-- Container ratings and reviews
CREATE TABLE IF NOT EXISTS container_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    container_id UUID REFERENCES containers(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_title VARCHAR(255),
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Container performance metrics
CREATE TABLE IF NOT EXISTS container_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    container_id UUID REFERENCES containers(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,4) NOT NULL,
    unit VARCHAR(20),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    INDEX idx_container_metrics_container_id (container_id),
    INDEX idx_container_metrics_type_time (metric_type, recorded_at)
);

-- Container deployment history
CREATE TABLE IF NOT EXISTS container_deployments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    container_id UUID REFERENCES containers(id) ON DELETE CASCADE,
    deployment_version VARCHAR(50) NOT NULL,
    deployment_status VARCHAR(20) NOT NULL CHECK (deployment_status IN ('pending', 'deploying', 'success', 'failed', 'rolled_back')),
    deployment_config JSONB,
    deployed_by UUID,
    deployment_notes TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_containers_business_id ON containers(business_id);
CREATE INDEX IF NOT EXISTS idx_containers_type ON containers(container_type);
CREATE INDEX IF NOT EXISTS idx_containers_status ON containers(status);
CREATE INDEX IF NOT EXISTS idx_containers_region ON containers(location_region);
CREATE INDEX IF NOT EXISTS idx_container_ratings_container_id ON container_ratings(container_id);
CREATE INDEX IF NOT EXISTS idx_container_ratings_customer_id ON container_ratings(customer_id);
CREATE INDEX IF NOT EXISTS idx_container_ratings_rating ON container_ratings(rating);
