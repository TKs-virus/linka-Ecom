-- Insert demo users
INSERT INTO users (id, email, first_name, last_name, role) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'demo@example.com', 'Demo', 'User', 'RETAILER'),
('550e8400-e29b-41d4-a716-446655440001', 'customer@example.com', 'John', 'Doe', 'CUSTOMER'),
('550e8400-e29b-41d4-a716-446655440002', 'retailer@example.com', 'Jane', 'Smith', 'RETAILER'),
('550e8400-e29b-41d4-a716-446655440003', 'delivery@example.com', 'Mike', 'Johnson', 'DELIVERY')
ON CONFLICT (email) DO NOTHING;

-- Insert demo retailers
INSERT INTO retailers (id, user_id, business_name, business_description, business_address, business_phone, business_email, is_verified) VALUES
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Demo Store', 'A demo retail store for testing', '123 Main St, Lusaka, Zambia', '+260-123-456789', 'demo@demostore.com', true),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Fashion Hub', 'Premium fashion and accessories', '456 Fashion Ave, Lusaka, Zambia', '+260-987-654321', 'info@fashionhub.com', true)
ON CONFLICT (user_id) DO NOTHING;

-- Insert demo products
INSERT INTO products (id, retailer_id, name, description, price, compare_at_price, category, subcategory, images, inventory_count) VALUES
('770e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 299.99, 399.99, 'Electronics', 'Audio', ARRAY['/placeholder.svg?height=300&width=300'], 50),
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', 'Smart Watch', 'Feature-rich smartwatch with health tracking', 199.99, 249.99, 'Electronics', 'Wearables', ARRAY['/placeholder.svg?height=300&width=300'], 30),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 'Designer T-Shirt', 'Premium cotton t-shirt with modern design', 49.99, 69.99, 'Fashion', 'Clothing', ARRAY['/placeholder.svg?height=300&width=300'], 100),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'Leather Handbag', 'Genuine leather handbag for everyday use', 129.99, 179.99, 'Fashion', 'Accessories', ARRAY['/placeholder.svg?height=300&width=300'], 25),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440000', 'Coffee Maker', 'Automatic drip coffee maker with timer', 89.99, 119.99, 'Home & Kitchen', 'Appliances', ARRAY['/placeholder.svg?height=300&width=300'], 15),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440001', 'Running Shoes', 'Comfortable running shoes for daily exercise', 79.99, 99.99, 'Sports', 'Footwear', ARRAY['/placeholder.svg?height=300&width=300'], 40)
ON CONFLICT (id) DO NOTHING;

-- Insert demo promotions
INSERT INTO promotions (id, retailer_id, name, description, type, value, coupon_code, start_date, end_date, status, applicable_to, times_used, usage_limit) VALUES
('880e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'Weekend Bonanza', '15% off all electronics this weekend', 'percentage', 15, 'WEEKEND15', NOW() - INTERVAL '2 days', NOW() + INTERVAL '1 day', 'active', 'specific_categories', 25, 100),
('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'Free Shipping Special', 'Free shipping on all orders above ZMW 500', 'free_shipping', 1, NULL, NOW() - INTERVAL '7 days', NOW() + INTERVAL '7 days', 'active', 'all_products', 150, NULL),
('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440000', 'Summer Sale', 'Get ZMW 100 off on selected items', 'fixed_amount', 100, 'SUMMER100', NOW() + INTERVAL '5 days', NOW() + INTERVAL '15 days', 'scheduled', 'specific_products', 0, NULL),
('880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'Flash Sale', '20% off everything for 24 hours', 'percentage', 20, 'FLASH20', NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days', 'expired', 'all_products', 200, NULL)
ON CONFLICT (id) DO NOTHING;

-- Insert demo orders
INSERT INTO orders (id, customer_id, retailer_id, status, total_amount, delivery_fee, tax_amount, delivery_address, payment_method, payment_status, estimated_delivery) VALUES
('990e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', 'delivered', 349.98, 25.00, 52.50, '{"street": "789 Customer St", "city": "Lusaka", "country": "Zambia", "postal_code": "10101"}', 'mobile_money', 'paid', NOW() - INTERVAL '2 days'),
('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'preparing', 179.98, 15.00, 27.00, '{"street": "789 Customer St", "city": "Lusaka", "country": "Zambia", "postal_code": "10101"}', 'card', 'paid', NOW() + INTERVAL '1 day'),
('990e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', 'pending', 89.99, 10.00, 13.50, '{"street": "789 Customer St", "city": "Lusaka", "country": "Zambia", "postal_code": "10101"}', 'mobile_money', 'pending', NOW() + INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- Insert demo order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
('990e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440000', 1, 299.99, 299.99),
('990e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440002', 1, 49.99, 49.99),
('990e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440003', 1, 129.99, 129.99),
('990e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002', 1, 49.99, 49.99),
('990e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440004', 1, 89.99, 89.99)
ON CONFLICT DO NOTHING;
