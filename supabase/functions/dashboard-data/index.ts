import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    // Get JWT token from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization header required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    // Verify user is authenticated and is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch dashboard data
    const [leadsResult, contactsResult, statsResult] = await Promise.all([
      // Get recent leads
      supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
      
      // Get recent contact submissions
      supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
      
      // Get statistics
      supabase
        .from('leads')
        .select('status, created_at')
    ]);

    if (leadsResult.error || contactsResult.error || statsResult.error) {
      console.error('Database error:', leadsResult.error || contactsResult.error || statsResult.error);
      return new Response(JSON.stringify({ error: 'Failed to fetch dashboard data' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate statistics
    const leads = statsResult.data || [];
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const stats = {
      totalLeads: leads.length,
      newLeads: leads.filter(lead => lead.status === 'nieuw').length,
      inProgress: leads.filter(lead => lead.status === 'in_behandeling').length,
      converted: leads.filter(lead => lead.status === 'gewonnen').length,
      recentLeads: leads.filter(lead => new Date(lead.created_at) >= lastWeek).length,
      totalContacts: contactsResult.data?.length || 0
    };

    const dashboardData = {
      leads: leadsResult.data || [],
      contacts: contactsResult.data || [],
      stats
    };

    console.log('Dashboard data fetched successfully');

    return new Response(JSON.stringify(dashboardData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in dashboard-data function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});