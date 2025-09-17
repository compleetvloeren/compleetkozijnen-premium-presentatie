-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for better data structure
CREATE TYPE public.project_type AS ENUM ('ramen', 'deuren', 'schuifdeuren', 'kozijnen', 'renovatie', 'nieuwbouw');
CREATE TYPE public.budget_range AS ENUM ('5000-10000', '10000-25000', '25000-50000', '50000+', 'onbekend');
CREATE TYPE public.lead_status AS ENUM ('nieuw', 'in_behandeling', 'offerte_verstuurd', 'gewonnen', 'verloren');

-- Create profiles table for user management
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table for quote requests
CREATE TABLE public.leads (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    -- Contact information
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    
    -- Project details
    project_type project_type,
    budget_range budget_range,
    timeline TEXT,
    location TEXT,
    description TEXT,
    
    -- Form specific fields from Offerte component
    project_details TEXT,
    preferred_contact_method TEXT,
    preferred_contact_time TEXT,
    special_requirements TEXT,
    
    -- Lead management
    status lead_status DEFAULT 'nieuw',
    notes TEXT,
    assigned_to UUID REFERENCES public.profiles(user_id),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_submissions table for contact form messages
CREATE TABLE public.contact_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    
    -- Status tracking
    status TEXT DEFAULT 'ongelezen',
    responded_at TIMESTAMP WITH TIME ZONE,
    assigned_to UUID REFERENCES public.profiles(user_id),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for leads table
CREATE POLICY "Admins can view all leads" 
ON public.leads 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admins can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (public.is_admin_user());

CREATE POLICY "Admins can update leads" 
ON public.leads 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Anyone can insert leads (for public forms)" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for contact_submissions table
CREATE POLICY "Admins can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (public.is_admin_user());

CREATE POLICY "Admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (public.is_admin_user());

CREATE POLICY "Anyone can insert contact submissions (for public forms)" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON public.contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, username, full_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'username', NEW.email),
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create admin user data (this will be linked when the user signs up with username 'Kozijnenpatron')
-- The actual auth user will be created through the signup process