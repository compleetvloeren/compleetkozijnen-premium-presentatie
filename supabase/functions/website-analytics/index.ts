import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsData {
  visitors: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
  viewsPerVisit: number;
  sources: Array<{ source: string; visitors: number; percentage: number }>;
  pages: Array<{ page: string; visitors: number; percentage: number }>;
  countries: Array<{ country: string; visitors: number; flag: string }>;
  devices: Array<{ device: string; visitors: number; percentage: number }>;
  trend: Array<{ date: string; visitors: number; pageviews: number }>;
}

serve(async (req) => {
  console.log('Analytics function called with method:', req.method);
  
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
      console.error('No authorization header provided');
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
      console.error('Authentication failed:', authError);
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
      console.error('User is not admin:', profile);
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Determine time range from POST body or query params
    let timeRange = 'vandaag';
    let startDate: Date, endDate: Date;
    
    try {
      if (req.method === 'POST') {
        const body = await req.json().catch(() => null);
        if (body && typeof body.timeRange === 'string') {
          timeRange = body.timeRange;
        }
        
        // Handle custom date ranges
        if (body && body.startDate && body.endDate) {
          startDate = new Date(body.startDate);
          endDate = new Date(body.endDate);
        } else {
          // Calculate date range based on timeRange
          const now = new Date();
          
          switch (timeRange) {
            case 'vandaag':
              startDate = new Date(now);
              startDate.setHours(0, 0, 0, 0); // Start of today
              endDate = new Date(now); // End is now (current time)
              break;
            case 'gisteren':
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 1);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
              endDate.setDate(endDate.getDate() - 1);
              endDate.setHours(23, 59, 59, 999);
              break;
            case 'eergisteren':
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 2);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
              endDate.setDate(endDate.getDate() - 2);
              endDate.setHours(23, 59, 59, 999);
              break;
            case '14d':
              startDate = new Date(now);
              startDate.setDate(now.getDate() - 14);
              endDate = new Date(now);
              break;
            case '30d':
              startDate = new Date(now);
              startDate.setDate(now.getDate() - 30);
              endDate = new Date(now);
              break;
            case '90d':
              startDate = new Date(now);
              startDate.setDate(now.getDate() - 90);
              endDate = new Date(now);
              break;
            case '6m':
              startDate = new Date(now);
              startDate.setMonth(now.getMonth() - 6);
              endDate = new Date(now);
              break;
            case '1y':
              startDate = new Date(now);
              startDate.setFullYear(now.getFullYear() - 1);
              endDate = new Date(now);
              break;
            case '7d':
              startDate = new Date(now);
              startDate.setDate(now.getDate() - 7);
              endDate = new Date(now);
              break;
            default: // fallback to today
              startDate = new Date(now);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
          }
        }
      } else if (req.method === 'GET') {
        const url = new URL(req.url);
        timeRange = url.searchParams.get('timeRange') || 'vandaag';
        
        endDate = new Date();
        startDate = new Date();
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        startDate.setDate(endDate.getDate() - days);
      }
    } catch (_) {
      // Fallback to today
      endDate = new Date();
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
    }
    
    // Calculate daysDiff for logging and calculations
    const daysDiff = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    console.log('Fetching analytics for time range:', timeRange, 'from', startDate.toISOString(), 'to', endDate.toISOString());
    console.log('Date range spans', daysDiff, 'day(s)');

    // Fetch real leads data for analytics
    const { data: leadsData, error: leadsError } = await supabase
      .from('leads')
      .select('created_at, status, project_type')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: true });

    if (leadsError) {
      console.error('Error fetching leads:', leadsError);
      return new Response(JSON.stringify({ error: 'Failed to fetch leads data' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Fetched leads data:', leadsData?.length, 'records');

    // Fetch contact submissions data
    const { data: contactsData, error: contactsError } = await supabase
      .from('contact_submissions')
      .select('created_at, status')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .order('created_at', { ascending: true });

    if (contactsError) {
      console.error('Error fetching contacts:', contactsError);
    }

    // Fetch real analytics from Lovable Analytics API
    let realAnalytics: AnalyticsData | null = null;
    console.log('Fetching real analytics from Lovable API');

    try {
      // Calculate granularity based on date range
      const granularity = daysDiff <= 1 ? 'hourly' : 'daily';
      
      const response = await fetch(`https://api.lovable.dev/v1/analytics/project/${Deno.env.get('SUPABASE_URL')?.split('//')[1]?.split('.')[0] || 'unknown'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify({
          startdate: startDate.toISOString().split('T')[0],
          enddate: endDate.toISOString().split('T')[0],
          granularity: granularity
        })
      });

      if (!response.ok) {
        console.error('Lovable Analytics API failed:', response.status, response.statusText);
        throw new Error(`Analytics API failed: ${response.status}`);
      }

      const analyticsData = await response.json();
      console.log('Raw analytics data:', JSON.stringify(analyticsData));

      if (!analyticsData || !analyticsData.summary) {
        throw new Error('Invalid analytics data structure');
      }

      const summary = analyticsData.summary;
      const breakdown = analyticsData.breakdown || {};

      // Extract trend data
      const trendData = [];
      if (summary.visitors && summary.visitors.data) {
        summary.visitors.data.forEach((item: any) => {
          const pageviewItem = summary.pageviews?.data?.find((p: any) => p.date === item.date);
          trendData.push({
            date: item.date,
            visitors: item.value || 0,
            pageviews: pageviewItem?.value || 0
          });
        });
      }

      // Process breakdown data
      const processBreakdown = (breakdownArray: any[], type: 'source' | 'page' | 'device' | 'country') => {
        if (!breakdownArray || !Array.isArray(breakdownArray)) return [];
        
        const totalVisitors = summary.visitors?.total || 1;
        return breakdownArray.map((item: any) => {
          const result: any = {
            [type]: item.value || item.name || 'Unknown',
            visitors: item.count || 0
          };
          
          if (type !== 'country') {
            result.percentage = Math.round((result.visitors / totalVisitors) * 100);
          }
          
          if (type === 'country') {
            // Map country codes to flags
            const countryFlags: Record<string, string> = {
              'NL': '🇳🇱',
              'BE': '🇧🇪', 
              'DE': '🇩🇪',
              'FR': '🇫🇷',
              'US': '🇺🇸',
              'GB': '🇬🇧'
            };
            result.flag = countryFlags[result.country] || '🌍';
          }
          
          return result;
        }).sort((a: any, b: any) => b.visitors - a.visitors);
      };

      realAnalytics = {
        visitors: summary.visitors?.total || 0,
        pageviews: summary.pageviews?.total || 0,
        bounceRate: Math.round(summary.bounceRate?.total || 0),
        avgSessionDuration: Math.round(summary.sessionDuration?.total || 0),
        viewsPerVisit: parseFloat((summary.pageviewsPerVisit?.total || 0).toFixed(1)),
        sources: processBreakdown(breakdown.source, 'source'),
        pages: processBreakdown(breakdown.page, 'page'),
        countries: processBreakdown(breakdown.country, 'country'),
        devices: processBreakdown(breakdown.device, 'device'),
        trend: trendData
      };

      console.log('Processed analytics - Visitors:', realAnalytics.visitors, 'Pageviews:', realAnalytics.pageviews);

    } catch (error) {
      console.error('Error fetching real analytics:', error);
      
      // Return error instead of fallback data
      return new Response(JSON.stringify({ 
        error: 'Analytics data unavailable',
        message: 'Unable to fetch real analytics data from Lovable API',
        details: error.message
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Ensure we have valid analytics data
    if (!realAnalytics) {
      return new Response(JSON.stringify({ 
        error: 'No analytics data',
        message: 'Analytics data is not available for the selected time period'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Real analytics data is now always available above

    // Add lead conversion metrics
    const totalLeads = leadsData?.length || 0;
    const conversionRate = realAnalytics.visitors > 0 ? (totalLeads / realAnalytics.visitors * 100) : 0;

    const response = {
      ...realAnalytics,
      leadMetrics: {
        totalLeads,
        conversionRate: parseFloat(conversionRate.toFixed(2)),
        newLeads: leadsData?.filter(lead => lead.status === 'nieuw').length || 0,
        inProgress: leadsData?.filter(lead => lead.status === 'in_behandeling').length || 0,
        converted: leadsData?.filter(lead => lead.status === 'gewonnen').length || 0,
        totalContacts: contactsData?.length || 0,
      },
      lastUpdated: new Date().toISOString(),
    };

    console.log('Returning analytics response with', response.visitors, 'visitors for', timeRange);
    console.log('Trend data points:', response.trend?.length, 'days:', response.trend?.map(t => `${t.date}: ${t.visitors}v`).join(', '));

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in website-analytics function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});