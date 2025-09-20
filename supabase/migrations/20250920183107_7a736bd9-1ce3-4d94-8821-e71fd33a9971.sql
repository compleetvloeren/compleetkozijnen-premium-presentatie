-- Verwijder alle test data
DELETE FROM public.leads;
DELETE FROM public.contact_submissions;

-- Voeg analytics tracking tabel toe voor website bezoeken
CREATE TABLE IF NOT EXISTS public.website_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country_code TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  screen_resolution TEXT,
  viewport_size TEXT,
  is_mobile BOOLEAN DEFAULT false,
  is_tablet BOOLEAN DEFAULT false,
  is_desktop BOOLEAN DEFAULT false,
  entry_page BOOLEAN DEFAULT false,
  exit_page BOOLEAN DEFAULT false,
  session_duration INTEGER DEFAULT 0,
  page_views_in_session INTEGER DEFAULT 1,
  is_bounce BOOLEAN DEFAULT false,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Voeg lead events tracking toe
CREATE TABLE IF NOT EXISTS public.lead_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'created', 'status_changed', 'assigned', 'note_added', 'converted'
  old_value TEXT,
  new_value TEXT,
  created_by UUID,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Voeg contact events tracking toe  
CREATE TABLE IF NOT EXISTS public.contact_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contact_submissions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'created', 'status_changed', 'assigned', 'responded'
  old_value TEXT,
  new_value TEXT,
  created_by UUID,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Voeg page performance tracking toe
CREATE TABLE IF NOT EXISTS public.page_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  load_time INTEGER, -- in milliseconds
  dom_content_loaded INTEGER,
  first_contentful_paint INTEGER,
  largest_contentful_paint INTEGER,
  cumulative_layout_shift DECIMAL(5,3),
  first_input_delay INTEGER,
  total_blocking_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Voeg form conversions tracking toe
CREATE TABLE IF NOT EXISTS public.form_conversions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  form_type TEXT NOT NULL, -- 'lead', 'contact', 'quote'
  page_path TEXT NOT NULL,
  conversion_funnel JSONB, -- track steps in form completion
  time_to_convert INTEGER, -- seconds from page load to submission
  abandonment_step TEXT, -- last step before abandonment
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS op alle nieuwe tabellen
ALTER TABLE public.website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_conversions ENABLE ROW LEVEL SECURITY;

-- RLS policies voor website_analytics
CREATE POLICY "Admins can view all website analytics" 
ON public.website_analytics FOR SELECT 
USING (is_admin_user());

CREATE POLICY "Anyone can insert website analytics" 
ON public.website_analytics FOR INSERT 
WITH CHECK (true);

-- RLS policies voor lead_events
CREATE POLICY "Admins can view all lead events" 
ON public.lead_events FOR SELECT 
USING (is_admin_user());

CREATE POLICY "Admins can insert lead events" 
ON public.lead_events FOR INSERT 
WITH CHECK (is_admin_user());

-- RLS policies voor contact_events
CREATE POLICY "Admins can view all contact events" 
ON public.contact_events FOR SELECT 
USING (is_admin_user());

CREATE POLICY "Admins can insert contact events" 
ON public.contact_events FOR INSERT 
WITH CHECK (is_admin_user());

-- RLS policies voor page_performance
CREATE POLICY "Admins can view all page performance" 
ON public.page_performance FOR SELECT 
USING (is_admin_user());

CREATE POLICY "Anyone can insert page performance" 
ON public.page_performance FOR INSERT 
WITH CHECK (true);

-- RLS policies voor form_conversions
CREATE POLICY "Admins can view all form conversions" 
ON public.form_conversions FOR SELECT 
USING (is_admin_user());

CREATE POLICY "Anyone can insert form conversions" 
ON public.form_conversions FOR INSERT 
WITH CHECK (true);

-- Triggers voor updated_at
CREATE TRIGGER update_website_analytics_updated_at
  BEFORE UPDATE ON public.website_analytics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes voor betere performance
CREATE INDEX idx_website_analytics_created_at ON public.website_analytics(created_at);
CREATE INDEX idx_website_analytics_session_id ON public.website_analytics(session_id);
CREATE INDEX idx_website_analytics_visitor_id ON public.website_analytics(visitor_id);
CREATE INDEX idx_website_analytics_page_path ON public.website_analytics(page_path);
CREATE INDEX idx_lead_events_lead_id ON public.lead_events(lead_id);
CREATE INDEX idx_lead_events_created_at ON public.lead_events(created_at);
CREATE INDEX idx_contact_events_contact_id ON public.contact_events(contact_id);
CREATE INDEX idx_contact_events_created_at ON public.contact_events(created_at);
CREATE INDEX idx_page_performance_created_at ON public.page_performance(created_at);
CREATE INDEX idx_form_conversions_created_at ON public.form_conversions(created_at);