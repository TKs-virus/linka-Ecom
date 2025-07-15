-- This script creates a demo user in Supabase Auth
-- Note: This needs to be run in Supabase SQL Editor, not through the app

-- First, let's create the auth user (this would normally be done through Supabase Auth API)
-- For demo purposes, we'll insert directly into auth.users (not recommended for production)

-- Insert demo user into auth.users table (if it doesn't exist)
-- This is a workaround for demo purposes - normally users are created through Supabase Auth API
DO $$
BEGIN
  -- Check if demo user exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@retailer.com') THEN
    -- Insert into auth.users (this is normally handled by Supabase Auth)
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      '550e8400-e29b-41d4-a716-446655440000',
      'authenticated',
      'authenticated',
      'demo@retailer.com',
      crypt('password123', gen_salt('bf')), -- This is a simplified example
      NOW(),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"first_name": "Demo", "last_name": "Retailer"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;

  -- Check if demo customer exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@customer.com') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      '550e8400-e29b-41d4-a716-446655440001',
      'authenticated',
      'authenticated',
      'demo@customer.com',
      crypt('password123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"first_name": "Demo", "last_name": "Customer"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;

-- Ensure our public.users table has the demo users
INSERT INTO public.users (id, email, first_name, last_name, phone, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'demo@retailer.com', 'Demo', 'Retailer', '+260 XXX XXX XXX', 'RETAILER'),
  ('550e8400-e29b-41d4-a716-446655440001', 'demo@customer.com', 'Demo', 'Customer', '+260 XXX XXX XXX', 'CUSTOMER')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role;
