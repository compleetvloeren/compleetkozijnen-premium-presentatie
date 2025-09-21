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
  countries: Array<{ country: string; visitors: number; flag: string; ips?: string[] }>;
  devices: Array<{ device: string; visitors: number; percentage: number }>;
  trend: Array<{ date: string; visitors: number; pageviews: number }>;
  leadMetrics: {
    totalLeads: number;
    conversionRate: number;
    newLeads: number;
    inProgress: number;
    converted: number;
    bounced: number;
    rejected: number;
  };
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

    // Verify user is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      return new Response(JSON.stringify({ error: 'Failed to verify admin status' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!profile || profile.role !== 'admin') {
      console.error('User is not admin:', profile);
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Determine time range
    let timeRange = 'vandaag';
    let startDate: Date, endDate: Date;
    
    try {
      if (req.method === 'POST') {
        const body = await req.json().catch(() => null);
        if (body && typeof body.timeRange === 'string') {
          timeRange = body.timeRange;
        }
        
        if (body && body.startDate && body.endDate) {
          startDate = new Date(body.startDate + 'T00:00:00.000Z');
          endDate = new Date(body.endDate + 'T23:59:59.999Z');
        } else {
          const now = new Date();
          
          switch (timeRange.toLowerCase()) {
            case 'today':
            case 'vandaag':
              startDate = new Date(now);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
              break;
            case 'yesterday':
            case 'gisteren':
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 1);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(startDate);
              endDate.setHours(23, 59, 59, 999);
              break;
            case 'last7days':
            case 'laatste7dagen':
            case '7d':
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 7);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
              break;
            case 'last30days':
            case 'laatste30dagen':
            case '30d':
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 30);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
              break;
            case 'thismonth':
            case 'dezemaand':
              startDate = new Date(now.getFullYear(), now.getMonth(), 1);
              endDate = new Date(now);
              break;
            case 'lastmonth':
            case 'vorigemaand':
              startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
              endDate = new Date(now.getFullYear(), now.getMonth(), 0);
              endDate.setHours(23, 59, 59, 999);
              break;
            default:
              startDate = new Date(now);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
          }
        }
      } else {
        const now = new Date();
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
      }
    } catch (error) {
      console.error('Error parsing request:', error);
      const now = new Date();
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
    }

    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    console.log(`Fetching analytics for time range: ${timeRange} from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    // Get leads data
    const { data: leadsData, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (leadsError) {
      console.error('Error fetching leads data:', leadsError);
    }

    // Get analytics data
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('website_analytics')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (analyticsError) {
      console.error('Error fetching analytics data:', analyticsError);
      throw analyticsError;
    }

    // Get visitor sessions
    const { data: visitorSessions, error: sessionsError } = await supabase
      .from('visitor_sessions')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (sessionsError) {
      console.error('Error fetching visitor sessions:', sessionsError);
    }

    console.log(`Found ${analyticsData?.length || 0} analytics records and ${visitorSessions?.length || 0} visitor sessions`);

    // Calculate metrics with fallback logic
    let uniqueVisitors = 0;
    let bounceRate = 0;
    let avgSessionDuration = 0;
    let countries: Array<{ country: string; visitors: number; flag: string; ips?: string[] }> = [];
    let devices: Array<{ device: string; visitors: number; percentage: number }> = [];

    if (visitorSessions && visitorSessions.length > 0) {
      // Use visitor_sessions for accurate metrics
      const uniqueIPs = new Set(visitorSessions.map(s => s.ip_address));
      uniqueVisitors = uniqueIPs.size;

      // Bounce rate from sessions
      const bouncedSessions = visitorSessions.filter(s => 
        s.is_bounce === true || (s.page_views === 1 && s.session_duration < 30)
      ).length;
      bounceRate = (bouncedSessions / visitorSessions.length) * 100;

      // Average session duration
      const totalDuration = visitorSessions.reduce((sum, s) => sum + (s.session_duration || 0), 0);
      avgSessionDuration = totalDuration / visitorSessions.length;

      // Countries with IPs
      const countryMap = new Map();
      const ipsByCountry = new Map();
      
      visitorSessions.forEach(session => {
        if (session.country_code && session.ip_address) {
          const code = session.country_code;
          if (!ipsByCountry.has(code)) {
            ipsByCountry.set(code, new Set());
          }
          ipsByCountry.get(code).add(session.ip_address);
          
          countryMap.set(code, {
            country: session.country_name || session.country_code,
            visitors: ipsByCountry.get(code).size,
            code: session.country_code
          });
        }
      });

      countries = Array.from(countryMap.values())
        .sort((a, b) => b.visitors - a.visitors)
        .slice(0, 10)
        .map(c => ({
          country: c.country,
          visitors: c.visitors,
          flag: getCountryFlag(c.code),
          ips: Array.from(ipsByCountry.get(c.code) || [])
        }));

      // Devices
      const deviceMap = new Map();
      visitorSessions.forEach(s => {
        const device = s.device_type || 'Desktop';
        deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
      });

      devices = Array.from(deviceMap.entries())
        .map(([device, count]) => ({
          device,
          visitors: count,
          percentage: (count / visitorSessions.length) * 100
        }))
        .sort((a, b) => b.visitors - a.visitors);

    } else {
      // Fallback to analytics data
      console.log('Using fallback analytics data for calculations');
      
      uniqueVisitors = new Set(analyticsData.map(r => r.visitor_id)).size;

      // Basic bounce rate from analytics
      const sessions = new Map();
      analyticsData.forEach(row => {
        if (!sessions.has(row.session_id)) {
          sessions.set(row.session_id, {
            pageViews: 0,
            duration: row.session_duration || 0,
            isBounce: row.is_bounce || false
          });
        }
        sessions.get(row.session_id).pageViews += 1;
      });

      const sessionArray = Array.from(sessions.values());
      const bounced = sessionArray.filter(s => s.isBounce || (s.pageViews === 1 && s.duration < 30)).length;
      bounceRate = sessionArray.length > 0 ? (bounced / sessionArray.length) * 100 : 0;
      
      const totalDuration = sessionArray.reduce((sum, s) => sum + s.duration, 0);
      avgSessionDuration = sessionArray.length > 0 ? totalDuration / sessionArray.length : 0;

      // Countries from analytics data
      const countryMap = new Map();
      analyticsData.forEach(row => {
        if (row.country_code) {
          const current = countryMap.get(row.country_code) || {
            country: row.country_code,
            visitors: 0,
            ips: new Set()
          };
          current.visitors += 1;
          if (row.ip_address) current.ips.add(row.ip_address);
          countryMap.set(row.country_code, current);
        }
      });

      countries = Array.from(countryMap.values())
        .sort((a, b) => b.visitors - a.visitors)
        .slice(0, 10)
        .map(c => ({
          country: c.country,
          visitors: c.visitors,
          flag: getCountryFlag(c.country),
          ips: Array.from(c.ips)
        }));

      // Devices from analytics data
      const deviceMap = new Map();
      analyticsData.forEach(row => {
        const device = row.device_type || 'Desktop';
        deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
      });

      devices = Array.from(deviceMap.entries())
        .map(([device, count]) => ({
          device,
          visitors: count,
          percentage: uniqueVisitors > 0 ? (count / uniqueVisitors) * 100 : 0
        }))
        .sort((a, b) => b.visitors - a.visitors);
    }

    const totalPageviews = analyticsData.length;
    const viewsPerVisit = uniqueVisitors > 0 ? totalPageviews / uniqueVisitors : 0;

    // Calculate traffic sources
    const sourcesMap = new Map();
    analyticsData.forEach(row => {
      let source = 'Direct';
      if (row.referrer) {
        if (row.referrer.includes('google')) source = 'Google';
        else if (row.referrer.includes('facebook')) source = 'Facebook';
        else if (row.referrer.includes('linkedin')) source = 'LinkedIn';
        else source = 'Referral';
      }
      if (row.utm_source) source = row.utm_source;
      sourcesMap.set(source, (sourcesMap.get(source) || 0) + 1);
    });

    const sources = Array.from(sourcesMap.entries())
      .map(([source, visitors]) => ({
        source,
        visitors,
        percentage: totalPageviews > 0 ? (visitors / totalPageviews) * 100 : 0
      }))
      .sort((a, b) => b.visitors - a.visitors);

    // Calculate page stats
    const pagesMap = new Map();
    analyticsData.forEach(row => {
      pagesMap.set(row.page_path, (pagesMap.get(row.page_path) || 0) + 1);
    });

    const pages = Array.from(pagesMap.entries())
      .map(([page, visitors]) => ({
        page,
        visitors,
        percentage: totalPageviews > 0 ? (visitors / totalPageviews) * 100 : 0
      }))
      .sort((a, b) => b.visitors - a.visitors);

    // Calculate trend
    const trendMap = new Map();
    
    if (daysDiff <= 1) {
      // Hourly for single day
      analyticsData.forEach(row => {
        const hour = new Date(row.created_at).getHours();
        const key = `${hour}:00`;
        if (!trendMap.has(key)) {
          trendMap.set(key, { visitors: new Set(), pageviews: 0 });
        }
        trendMap.get(key).visitors.add(row.visitor_id);
        trendMap.get(key).pageviews += 1;
      });
    } else {
      // Daily for multiple days
      analyticsData.forEach(row => {
        const date = new Date(row.created_at).toISOString().split('T')[0];
        if (!trendMap.has(date)) {
          trendMap.set(date, { visitors: new Set(), pageviews: 0 });
        }
        trendMap.get(date).visitors.add(row.visitor_id);
        trendMap.get(date).pageviews += 1;
      });
    }

    const trend = Array.from(trendMap.entries())
      .map(([date, data]) => ({
        date,
        visitors: data.visitors.size,
        pageviews: data.pageviews
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Lead metrics
    const totalLeads = leadsData ? leadsData.length : 0;
    const conversionRate = uniqueVisitors > 0 ? (totalLeads / uniqueVisitors) * 100 : 0;
    const newLeads = leadsData ? leadsData.filter(l => l.status === 'nieuw').length : 0;
    const inProgress = leadsData ? leadsData.filter(l => ['contact_opgenomen', 'offerte_verzonden', 'in_behandeling'].includes(l.status)).length : 0;
    const converted = leadsData ? leadsData.filter(l => l.status === 'geconverteerd').length : 0;
    const bounced = leadsData ? leadsData.filter(l => l.status === 'geen_interesse').length : 0;
    const rejected = leadsData ? leadsData.filter(l => l.status === 'afgewezen').length : 0;

    const analyticsResponse: AnalyticsData = {
      visitors: uniqueVisitors,
      pageviews: totalPageviews,
      bounceRate,
      avgSessionDuration,
      viewsPerVisit,
      sources,
      pages,
      countries,
      devices,
      trend,
      leadMetrics: {
        totalLeads,
        conversionRate,
        newLeads,
        inProgress,
        converted,
        bounced,
        rejected
      }
    };

    console.log(`Returning analytics: ${uniqueVisitors} visitors, ${totalPageviews} pageviews, ${countries.length} countries, ${devices.length} devices`);

    return new Response(JSON.stringify(analyticsResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analytics function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getCountryFlag(countryCode: string): string {
  const flags: { [key: string]: string } = {
    'NL': '🇳🇱', 'BE': '🇧🇪', 'DE': '🇩🇪', 'FR': '🇫🇷', 'UK': '🇬🇧', 'GB': '🇬🇧',
    'US': '🇺🇸', 'CA': '🇨🇦', 'ES': '🇪🇸', 'IT': '🇮🇹', 'AT': '🇦🇹', 'CH': '🇨🇭'
  };
  return flags[countryCode?.toUpperCase()] || '🌍';
}