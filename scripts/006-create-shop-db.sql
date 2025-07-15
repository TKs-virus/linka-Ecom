-- Shop Database
-- Manages storefront functionality, orders, and customer interactions

CREATE DATABASE IF NOT EXISTS linka_shop;
USE linka_shop;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Storefronts
CREATE TABLE IF NOT EXISTS storefronts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL,
    container_id UUID NOT NULL,
    store_name VARCHAR(255) NOT NULL,
    store_slug VARCHAR(255) NOT NULL UNIQUE,
    store_description TEXT,
    store_logo_url TEXT,
    store_banner_url TEXT,
    theme_settings JSONB DEFAULT '{}',
    custom_css TEXT,
    domain_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    seo_settings JSONB DEFAULT '{}',
    social_media_links JSONB DEFAULT '{}',
    contact_info JSONB DEFAULT '{}',
    shipping_policies TEXT,
    return_policies TEXT,
    privacy_policy TEXT,
    terms_of_service TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Store products (references inventory products)
CREATE TABLE IF NOT EXISTS store_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    storefront_id UUID REFERENCES storefronts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL,
    display_name VARCHAR(255),
    display_description TEXT,
    display_price DECIMAL(15,2),
    sale_price DECIMAL(15,2),
    is_featured BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(storefront_id, product_id)
);

-- Product images
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_product_id UUID REFERENCES store_products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    storefront_id UUID REFERENCES storefronts(id),
    customer_id UUID NOT NULL,
    order_number VARCHAR(100) NOT NULL UNIQUE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partial')),
    subtotal DECIMAL(15,2) NOT NULL,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    shipping_amount DECIMAL(15,2) DEFAULT 0,
    discount_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    billing_address JSONB NOT NULL,
    shipping_address JSONB NOT NULL,
    shipping_method VARCHAR(100),
    tracking_number VARCHAR(255),
    notes TEXT,
    customer_notes TEXT,
    estimated_delivery_date DATE,
    actual_delivery_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    store_product_id UUID REFERENCES store_products(id),
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    product_options JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product reviews and ratings
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_product_id UUID REFERENCES store_products(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL,
    order_id UUID REFERENCES orders(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_title VARCHAR(255),
    review_text TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    helpful_votes INTEGER DEFAULT 0,
    unhelpful_votes INTEGER DEFAULT 0,
    response_text TEXT,
    response_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping carts
CREATE TABLE IF NOT EXISTS shopping_carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    storefront_id UUID REFERENCES storefronts(id),
    customer_id UUID,
    session_id VARCHAR(255),
    cart_data JSONB NOT NULL DEFAULT '{}',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlists
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL,
    storefront_id UUID REFERENCES storefronts(id),
    name VARCHAR(255) DEFAULT 'My Wishlist',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist items
CREATE TABLE IF NOT EXISTS wishlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE,
    store_product_id UUID REFERENCES store_products(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(wishlist_id, store_product_id)
);

-- Coupons and discounts
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    storefront_id UUID REFERENCES storefronts(id),
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
    discount_value DECIMAL(15,2) NOT NULL,
    minimum_order_amount DECIMAL(15,2),
    maximum_discount_amount DECIMAL(15,2),
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    per_customer_limit INTEGER DEFAULT 1,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(storefront_id, code)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_storefronts_business_id ON storefronts(business_id);
CREATE INDEX IF NOT EXISTS idx_storefronts_slug ON storefronts(store_slug);
CREATE INDEX IF NOT EXISTS idx_store_products_storefront ON store_products(storefront_id);
CREATE INDEX IF NOT EXISTS idx_store_products_product ON store_products(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_storefront ON orders(storefront_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(store_product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_customer ON product_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_shopping_carts_customer ON shopping_carts(customer_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_customer ON wishlists(customer_id);
