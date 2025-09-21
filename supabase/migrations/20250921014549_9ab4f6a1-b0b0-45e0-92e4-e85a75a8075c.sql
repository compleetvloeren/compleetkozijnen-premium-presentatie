-- Add IP address column to website_analytics table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'website_analytics' 
                  AND column_name = 'ip_address' 
                  AND table_schema = 'public') THEN
        ALTER TABLE public.website_analytics ADD COLUMN ip_address inet;
    END IF;
END $$;

-- Create visitor_sessions table for tracking unique visitors and their detailed location data
CREATE TABLE IF NOT EXISTS public.visitor_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    ip_address INET NOT NULL,
    session_id TEXT NOT NULL,
    first_visit_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    -- Detailed location data
    country_code TEXT,
    country_name TEXT,
    region TEXT,
    region_code TEXT,
    city TEXT,
    postal_code TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    timezone TEXT,
    
    -- ISP and network info
    isp TEXT,
    organization TEXT,
    asn TEXT,
    
    -- Device fingerprinting
    user_agent TEXT,
    browser TEXT,
    os TEXT,
    device_type TEXT,
    screen_resolution TEXT,
    viewport_size TEXT,
    
    -- Session stats
    page_views INTEGER DEFAULT 1,
    session_duration INTEGER DEFAULT 0,
    is_bounce BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    UNIQUE(visitor_id, session_id)
);

-- Enable RLS on visitor_sessions table
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for visitor_sessions
CREATE POLICY "Admins can view all visitor sessions" 
ON public.visitor_sessions 
FOR SELECT 
USING (is_admin_user());

CREATE POLICY "Anyone can insert visitor sessions" 
ON public.visitor_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update visitor sessions" 
ON public.visitor_sessions 
FOR UPDATE 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_ip ON public.visitor_sessions(ip_address);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor_id ON public.visitor_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_created_at ON public.visitor_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_website_analytics_ip ON public.website_analytics(ip_address) WHERE ip_address IS NOT NULL;

-- Create trigger for automatic timestamp updates on visitor_sessions
CREATE TRIGGER update_visitor_sessions_updated_at
BEFORE UPDATE ON public.visitor_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();