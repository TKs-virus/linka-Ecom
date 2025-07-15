-- Insert demo users
INSERT INTO users (id, email, first_name, last_name, phone, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'demo@retailer.com', 'Demo', 'Retailer', '+260 XXX XXX XXX', 'RETAILER'),
  ('550e8400-e29b-41d4-a716-446655440001', 'demo@customer.com', 'Demo', 'Customer', '+260 XXX XXX XXX', 'CUSTOMER'),
  ('550e8400-e29b-41d4-a716-446655440002', 'demo@delivery.com', 'Demo', 'Delivery', '+260 XXX XXX XXX', 'DELIVERY')
ON CONFLICT (id) DO NOTHING;

-- Insert demo retailer
INSERT INTO retailers (id, user_id, business_name, business_description, business_email, is_verified) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'Demo Store', 'A demo retail store for testing purposes', 'demo@retailer.com', true)
ON CONFLICT (id) DO NOTHING;

-- Insert demo products
INSERT INTO products (id, retailer_id, name, description, price, compare_at_price, category, subcategory, inventory_count, is_active) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'Premium Coffee Beans', 'High-quality Arabica coffee beans from local farms', 45.99, 55.99, 'Food & Beverages', 'Coffee', 150, true),
  ('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440010', 'Organic Honey', 'Pure organic honey from local beekeepers', 25.50, 30.00, 'Food & Beverages', 'Natural Products', 75, true),
  ('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440010', 'Handmade Soap', 'Natural handmade soap with essential oils', 12.99, 15.99, 'Health & Beauty', 'Skincare', 200, true),
  ('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440010', 'Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 19.99, 24.99, 'Fashion', 'Clothing', 100, true),
  ('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440010', 'Wooden Cutting Board', 'Handcrafted wooden cutting board', 35.00, 42.00, 'Home & Kitchen', 'Kitchenware', 50, true)
ON CONFLICT (id) DO NOTHING;

-- Insert demo promotion
INSERT INTO promotions (id, retailer_id, name, description, type, value, coupon_code, start_date, end_date, status, applicable_to, usage_limit, times_used) VALUES
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440010', 'Summer Sale', '20% off all products', 'percentage', 20.00, 'SUMMER20', NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days', 'active', 'all_products', 1000, 45)
ON CONFLICT (id) DO NOTHING;

-- Insert demo orders
INSERT INTO orders (id, customer_id, retailer_id, status, total_amount, delivery_fee, tax_amount, discount_amount, delivery_address, payment_method, payment_status, estimated_delivery) VALUES
  ('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 'delivered', 71.49, 5.00, 6.50, 9.20, '{"street": "123 Main St", "city": "Lusaka", "province": "Lusaka", "postal_code": "10101"}', 'mobile_money', 'paid', NOW() - INTERVAL '2 days'),
  ('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 'preparing', 38.49, 5.00, 3.50, 5.10, '{"street": "456 Oak Ave", "city": "Lusaka", "province": "Lusaka", "postal_code": "10102"}', 'mobile_money', 'paid', NOW() + INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- Insert demo order items
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price, total_price) VALUES
  ('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440020', 1, 45.99, 45.99),
  ('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440021', 1, 25.50, 25.50),
  ('550e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440022', 2, 12.99, 25.98),
  ('550e8400-e29b-41d4-a716-446655440053', '550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440023', 1, 19.99, 19.99)
ON CONFLICT (id) DO NOTHING;
