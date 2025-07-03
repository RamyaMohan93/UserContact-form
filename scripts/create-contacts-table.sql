-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Create policy to allow inserts for everyone (since this is a contact form)
CREATE POLICY "Allow public inserts" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads for authenticated users only (optional - for admin access)
CREATE POLICY "Allow authenticated reads" ON public.contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create an index on email for faster queries
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at DESC);
