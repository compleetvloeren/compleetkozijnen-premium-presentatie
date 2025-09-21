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

    // Determine time range from POST body or query params
    let timeRange = 'vandaag';
    let startDate: Date, endDate: Date;
    
    try {
      if (req.method === 'POST') {
        const body = await req.json().catch(() => null);
        if (body && typeof body.timeRange === 'string') {
          timeRange = body.timeRange;
        }
        
        // Handle custom date ranges from frontend
        if (body && body.startDate && body.endDate) {
          startDate = new Date(body.startDate + 'T00:00:00.000Z');
          endDate = new Date(body.endDate + 'T23:59:59.999Z');
        } else {
          // Calculate date range based on timeRange
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
            case 'last24hours':
            case 'last_24_hours':
            case 'laatste24uur':
              startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000));
              endDate = new Date(now);
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
        // Default to today
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
    console.log(`Date range spans ${daysDiff} day(s)`);
    console.log(`Fetching analytics for time range: ${timeRange} from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    // Get leads data for conversion metrics
    const { data: leadsData, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (leadsError) {
      console.error('Error fetching leads data:', leadsError);
    }

    console.log(`Fetched leads data: ${leadsData ? leadsData.length : 0} records`);

    console.log('Building analytics from real website data');

    // Get analytics data from database
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('website_analytics')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (analyticsError) {
      console.error('Error fetching analytics data:', analyticsError);
      throw analyticsError;
    }

    // Get unique visitor sessions for accurate visitor counting
    const { data: visitorSessions, error: sessionsError } = await supabase
      .from('visitor_sessions')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (sessionsError) {
      console.error('Error fetching visitor sessions:', sessionsError);
      throw sessionsError;
    }

    // Calculate unique visitors based on IP addresses for accurate counting
    const uniqueVisitorIPs = new Set(visitorSessions.map(session => session.ip_address)).size;
    const uniqueVisitors = uniqueVisitorIPs;

    // Calculate total pageviews
    const totalPageviews = analyticsData.length;

    // Calculate bounce rate (sessions with only 1 page view and < 30 seconds)
    const bouncedSessions = visitorSessions.filter(session => 
      session.is_bounce === true || 
      (session.page_views === 1 && session.session_duration < 30)
    ).length;
    const bounceRate = visitorSessions.length > 0 ? (bouncedSessions / visitorSessions.length) * 100 : 0;

    // Calculate average session duration
    const totalSessionDuration = visitorSessions.reduce((sum, session) => sum + (session.session_duration || 0), 0);
    const avgSessionDuration = visitorSessions.length > 0 ? totalSessionDuration / visitorSessions.length : 0;

    // Calculate views per visit
    const viewsPerVisit = uniqueVisitors > 0 ? totalPageviews / uniqueVisitors : 0;

    // Calculate traffic sources
    const sourcesMap = new Map();
    analyticsData.forEach(row => {
      let source = 'Direct';
      if (row.referrer) {
        if (row.referrer.includes('google')) source = 'Google';
        else if (row.referrer.includes('facebook')) source = 'Facebook';
        else if (row.referrer.includes('linkedin')) source = 'LinkedIn';
        else if (row.referrer.includes('instagram')) source = 'Instagram';
        else if (row.referrer.includes('youtube')) source = 'YouTube';
        else if (row.referrer.includes('twitter') || row.referrer.includes('x.com')) source = 'X (Twitter)';
        else source = 'Referral';
      }
      
      if (row.utm_source) {
        source = row.utm_source;
      }
      
      sourcesMap.set(source, (sourcesMap.get(source) || 0) + 1);
    });

    const sources = Array.from(sourcesMap.entries())
      .map(([source, visitors]) => ({
        source,
        visitors,
        percentage: totalPageviews > 0 ? (visitors / totalPageviews) * 100 : 0
      }))
      .sort((a, b) => b.visitors - a.visitors);

    // Calculate page statistics
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

    // Calculate country distribution based on unique IP addresses
    const countryStats = new Map();
    const uniqueIPsByCountry = new Map();
    
    visitorSessions.forEach(session => {
      if (session.country_code && session.ip_address) {
        const countryKey = session.country_code;
        
        if (!uniqueIPsByCountry.has(countryKey)) {
          uniqueIPsByCountry.set(countryKey, new Set());
        }
        uniqueIPsByCountry.get(countryKey).add(session.ip_address);
        
        countryStats.set(countryKey, {
          visitors: uniqueIPsByCountry.get(countryKey).size,
          country: session.country_name || session.country_code,
          country_code: session.country_code
        });
      }
    });

    const countries = Array.from(countryStats.values())
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 10)
      .map(country => ({
        country: country.country,
        visitors: country.visitors,
        flag: getCountryFlag(country.country_code),
        ips: Array.from(uniqueIPsByCountry.get(country.country_code) || [])
      }));

    // Calculate device distribution
    const devicesMap = new Map();
    visitorSessions.forEach(session => {
      const device = session.device_type || 'Unknown';
      devicesMap.set(device, (devicesMap.get(device) || 0) + 1);
    });

    const devices = Array.from(devicesMap.entries())
      .map(([device, visitors]) => ({
        device,
        visitors,
        percentage: uniqueVisitors > 0 ? (visitors / uniqueVisitors) * 100 : 0
      }))
      .sort((a, b) => b.visitors - a.visitors);

    // Calculate daily trend for the period
    const trendMap = new Map();
    
    if (daysDiff <= 1) {
      // For single day, show hourly data
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
      // For multiple days, show daily data
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

    console.log(`Trend data points: ${trend.length} ${daysDiff <= 1 ? 'hours' : 'days'}: ${trend.map(t => `${t.date}: ${t.visitors}v`).join(', ')}`);

    // Calculate lead metrics
    const totalLeads = leadsData ? leadsData.length : 0;
    const conversionRate = uniqueVisitors > 0 ? (totalLeads / uniqueVisitors) * 100 : 0;
    const newLeads = leadsData ? leadsData.filter(lead => lead.status === 'nieuw').length : 0;
    const inProgress = leadsData ? leadsData.filter(lead => ['contact_opgenomen', 'offerte_verzonden', 'in_behandeling'].includes(lead.status)).length : 0;
    const converted = leadsData ? leadsData.filter(lead => lead.status === 'geconverteerd').length : 0;
    const bounced = leadsData ? leadsData.filter(lead => lead.status === 'geen_interesse').length : 0;
    const rejected = leadsData ? leadsData.filter(lead => lead.status === 'afgewezen').length : 0;

    const leadMetrics = {
      totalLeads,
      conversionRate,
      newLeads,
      inProgress,
      converted,
      bounced,
      rejected
    };

    console.log(`Generated analytics from real data - Visitors: ${uniqueVisitors} Pageviews: ${totalPageviews}`);

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
      leadMetrics
    };

    console.log(`Returning analytics response with ${uniqueVisitors} visitors for ${timeRange}`);

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
    'NL': '🇳🇱',
    'BE': '🇧🇪',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'UK': '🇬🇧',
    'GB': '🇬🇧',
    'US': '🇺🇸',
    'CA': '🇨🇦',
    'ES': '🇪🇸',
    'IT': '🇮🇹',
    'AT': '🇦🇹',
    'CH': '🇨🇭',
    'LU': '🇱🇺',
    'DK': '🇩🇰',
    'SE': '🇸🇪',
    'NO': '🇳🇴',
    'FI': '🇫🇮',
    'PL': '🇵🇱',
    'CZ': '🇨🇿',
    'HU': '🇭🇺',
    'RO': '🇷🇴',
    'BG': '🇧🇬',
    'HR': '🇭🇷',
    'SI': '🇸🇮',
    'SK': '🇸🇰',
    'EE': '🇪🇪',
    'LV': '🇱🇻',
    'LT': '🇱🇹',
    'IE': '🇮🇪',
    'PT': '🇵🇹',
    'GR': '🇬🇷',
    'CY': '🇨🇾',
    'MT': '🇲🇹'
  };
  
  return flags[countryCode?.toUpperCase()] || '🌍';
}