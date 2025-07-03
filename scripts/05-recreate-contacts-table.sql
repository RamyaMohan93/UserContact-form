/*
Run this in Supabase → SQL Editor.
Cleans up any existing policies and recreates the contacts table properly.
*/

-- Enable UUID extension first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.contacts;
DROP POLICY IF EXISTS "Allow public inserts" ON public.contacts;
DROP POLICY IF EXISTS "public inserts" ON public.contacts;
DROP POLICY IF EXISTS "anon insert" ON public.contacts;

-- Create contacts table (will skip if already exists)
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create fresh policy for anonymous inserts
CREATE POLICY "contacts_anon_insert_policy" ON public.contacts
  FOR INSERT TO anon WITH CHECK (true);

-- Create policy for authenticated reads (optional - for admin)
CREATE POLICY "contacts_auth_read_policy" ON public.contacts
  FOR SELECT TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts(email);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at DESC);
