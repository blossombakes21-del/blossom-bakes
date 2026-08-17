-- Blossom Bakes - Supabase Database Schema
-- Run this script in the Supabase SQL Editor

-- 1. Profiles Table (extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'employee')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Secure Profiles Table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Items Table
CREATE TABLE items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER DEFAULT 0 NOT NULL,
  unit TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  threshold INTEGER DEFAULT 5 NOT NULL,
  info TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Secure Items Table
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
-- Everyone logged in can read items
CREATE POLICY "Authenticated users can view items." ON items FOR SELECT USING (auth.role() = 'authenticated');
-- Both can insert/update (Stock In/Out)
CREATE POLICY "Authenticated users can insert items." ON items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update items." ON items FOR UPDATE USING (auth.role() = 'authenticated');
-- ONLY Admins can delete
CREATE POLICY "Only admins can delete items." ON items FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- 3. Audit Logs Table
CREATE TABLE audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL CHECK (action IN ('STOCK_IN', 'STOCK_OUT', 'DELETE_ATTEMPT', 'DELETE_SUCCESS', 'ITEM_CREATED')),
  item_id UUID REFERENCES items(id) ON DELETE SET NULL,
  item_name TEXT NOT NULL,
  quantity_changed INTEGER,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Secure Audit Logs (Employees can insert, only Admins can view all)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can insert logs." ON audit_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Only admins can view logs." ON audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- 4. Storage Bucket setup for Images
-- Make sure to create a bucket named 'item-images' in the Storage section manually.
-- These are the policies for that bucket:
-- CREATE POLICY "Give users authenticated access to folder" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'item-images');
-- CREATE POLICY "Give users public access to folder" ON storage.objects FOR SELECT USING (bucket_id = 'item-images');

-- Function to automatically create a profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'employee'); -- Defaults to employee. Admin must manually promote them in DB.
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
