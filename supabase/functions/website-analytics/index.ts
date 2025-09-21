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
  cities: Array<{ city: string; country: string; visitors: number; flag: string }>;
  devices: Array<{ device: string; visitors: number; percentage: number }>;
  browsers: Array<{ browser: string; visitors: number; percentage: number }>;
  operatingSystems: Array<{ os: string; visitors: number; percentage: number }>;
  trend: Array<{ date: string; visitors: number; pageviews: number }>;
  topReferrers: Array<{ referrer: string; visitors: number; percentage: number }>;
  entryPages: Array<{ page: string; visitors: number; percentage: number }>;
  exitPages: Array<{ page: string; visitors: number; percentage: number }>;
  sessionDurations: Array<{ range: string; sessions: number; percentage: number }>;
  utmCampaigns: Array<{ campaign: string; visitors: number; percentage: number }>;
  leadMetrics: {
    totalLeads: number;
    conversionRate: number;
    newLeads: number;
    inProgress: number;
    converted: number;
    bounced: number;
    rejected: number;
  };
  performance: {
    avgLoadTime: number;
    avgFCP: number;
    avgLCP: number;
    avgCLS: number;
  };
}

serve(async (req) => {
  console.log('🚀 Advanced Analytics function called with method:', req.method);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization header required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify admin access
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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

    // Parse time range
    let timeRange = 'vandaag';
    let startDate: Date, endDate: Date;
    
    try {
      if (req.method === 'POST') {
        const body = await req.json().catch(() => ({}));
        timeRange = body.timeRange || 'vandaag';
        
        if (body.startDate && body.endDate) {
          startDate = new Date(body.startDate + 'T00:00:00.000Z');
          endDate = new Date(body.endDate + 'T23:59:59.999Z');
        } else {
          const now = new Date();
          
          switch (timeRange.toLowerCase()) {
            case 'vandaag':
            case 'today':
              startDate = new Date(now);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
              break;
            case 'gisteren':
            case 'yesterday':
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 1);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(startDate);
              endDate.setHours(23, 59, 59, 999);
              break;
            case 'laatste7dagen':
            case 'last7days':
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 7);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
              break;
            case 'laatste30dagen':
            case 'last30days':
              startDate = new Date(now);
              startDate.setDate(startDate.getDate() - 30);
              startDate.setHours(0, 0, 0, 0);
              endDate = new Date(now);
              break;
            case 'dezemaand':
            case 'thismonth':
              startDate = new Date(now.getFullYear(), now.getMonth(), 1);
              endDate = new Date(now);
              break;
            case 'vorigemaand':
            case 'lastmonth':
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
      const now = new Date();
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
    }

    console.log(`📊 Fetching data for: ${timeRange} (${startDate.toISOString()} to ${endDate.toISOString()})`);

    // Fetch all data in parallel for maximum performance
    const [
      { data: analyticsData, error: analyticsError },
      { data: visitorSessions, error: sessionsError },
      { data: performanceData, error: performanceError },
      { data: leadsData, error: leadsError }
    ] = await Promise.all([
      supabase.from('website_analytics')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString()),
      
      supabase.from('visitor_sessions')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString()),
      
      supabase.from('page_performance')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString()),
      
      supabase.from('leads')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
    ]);

    if (analyticsError) throw analyticsError;

    console.log(`📈 Data found: ${analyticsData?.length || 0} analytics, ${visitorSessions?.length || 0} sessions, ${performanceData?.length || 0} performance, ${leadsData?.length || 0} leads`);

    // Advanced analytics calculation with genius-level optimization
    const analytics = calculateAdvancedAnalytics(
      analyticsData || [],
      visitorSessions || [],
      performanceData || [],
      leadsData || [],
      startDate,
      endDate
    );

    console.log(`✨ Returning genius-level analytics: ${analytics.visitors} visitors, ${analytics.countries.length} countries, ${analytics.cities.length} cities`);

    return new Response(JSON.stringify(analytics), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Analytics function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function calculateAdvancedAnalytics(
  analyticsData: any[],
  visitorSessions: any[],
  performanceData: any[],
  leadsData: any[],
  startDate: Date,
  endDate: Date
): AnalyticsData {
  
  // Smart data source selection with fallback hierarchy
  const hasValidSessions = visitorSessions.length > 0 && visitorSessions.some(s => s.ip_address);
  const primarySource = hasValidSessions ? visitorSessions : analyticsData;
  
  console.log(`🧠 Using ${hasValidSessions ? 'visitor_sessions' : 'analytics fallback'} as primary data source`);

  // Calculate unique visitors with IP-based intelligence
  let uniqueVisitors = 0;
  let uniqueIPs = new Set<string>();
  let countryIPMap = new Map<string, Set<string>>();
  let cityIPMap = new Map<string, Set<string>>();

  if (hasValidSessions) {
    visitorSessions.forEach(session => {
      if (session.ip_address && session.ip_address !== 'unknown') {
        uniqueIPs.add(session.ip_address);
        
        // Map IPs to countries
        if (session.country_code) {
          if (!countryIPMap.has(session.country_code)) {
            countryIPMap.set(session.country_code, new Set());
          }
          countryIPMap.get(session.country_code)!.add(session.ip_address);
        }
        
        // Map IPs to cities
        const cityKey = `${session.city}_${session.country_code}`;
        if (session.city && session.country_code) {
          if (!cityIPMap.has(cityKey)) {
            cityIPMap.set(cityKey, new Set());
          }
          cityIPMap.get(cityKey)!.add(session.ip_address);
        }
      }
    });
    uniqueVisitors = uniqueIPs.size;
  } else {
    // Fallback to visitor IDs
    const visitorIDs = new Set(analyticsData.map(row => row.visitor_id));
    uniqueVisitors = visitorIDs.size;
    
    // Build IP maps from analytics data
    analyticsData.forEach(row => {
      if (row.ip_address && row.ip_address !== 'unknown') {
        uniqueIPs.add(row.ip_address);
        
        if (row.country_code) {
          if (!countryIPMap.has(row.country_code)) {
            countryIPMap.set(row.country_code, new Set());
          }
          countryIPMap.get(row.country_code)!.add(row.ip_address);
        }
        
        const cityKey = `${row.city}_${row.country_code}`;
        if (row.city && row.country_code) {
          if (!cityIPMap.has(cityKey)) {
            cityIPMap.set(cityKey, new Set());
          }
          cityIPMap.get(cityKey)!.add(row.ip_address);
        }
      }
    });
  }

  const totalPageviews = analyticsData.length;
  const viewsPerVisit = uniqueVisitors > 0 ? totalPageviews / uniqueVisitors : 0;

  // Advanced session metrics
  let bounceRate = 0;
  let avgSessionDuration = 0;
  
  if (hasValidSessions) {
    const bouncedSessions = visitorSessions.filter(s => 
      s.is_bounce === true || (s.page_views === 1 && s.session_duration < 30)
    ).length;
    bounceRate = visitorSessions.length > 0 ? (bouncedSessions / visitorSessions.length) * 100 : 0;
    
    const totalDuration = visitorSessions.reduce((sum, s) => sum + (s.session_duration || 0), 0);
    avgSessionDuration = visitorSessions.length > 0 ? totalDuration / visitorSessions.length : 0;
  } else {
    // Calculate from analytics data
    const sessionMap = new Map();
    analyticsData.forEach(row => {
      if (!sessionMap.has(row.session_id)) {
        sessionMap.set(row.session_id, {
          pageViews: 0,
          duration: row.session_duration || 0,
          isBounce: row.is_bounce || false
        });
      }
      sessionMap.get(row.session_id).pageViews += 1;
    });

    const sessions = Array.from(sessionMap.values());
    const bouncedSessions = sessions.filter(s => 
      s.isBounce || (s.pageViews === 1 && s.duration < 30)
    ).length;
    
    bounceRate = sessions.length > 0 ? (bouncedSessions / sessions.length) * 100 : 0;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    avgSessionDuration = sessions.length > 0 ? totalDuration / sessions.length : 0;
  }

  // Genius-level country analysis with IP intelligence
  const countries = Array.from(countryIPMap.entries())
    .map(([countryCode, ips]) => {
      const countryData = hasValidSessions 
        ? visitorSessions.find(s => s.country_code === countryCode)
        : analyticsData.find(row => row.country_code === countryCode);
      
      return {
        country: countryData?.country_name || countryCode,
        visitors: ips.size,
        flag: getCountryFlag(countryCode),
        ips: Array.from(ips)
      };
    })
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 15);

  // Advanced city analysis
  const cities = Array.from(cityIPMap.entries())
    .map(([cityKey, ips]) => {
      const [city, countryCode] = cityKey.split('_');
      const cityData = hasValidSessions 
        ? visitorSessions.find(s => s.city === city && s.country_code === countryCode)
        : analyticsData.find(row => row.city === city && row.country_code === countryCode);
      
      return {
        city,
        country: cityData?.country_name || countryCode,
        visitors: ips.size,
        flag: getCountryFlag(countryCode)
      };
    })
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);

  // Enhanced device analysis
  const deviceMap = new Map<string, number>();
  const browserMap = new Map<string, number>();
  const osMap = new Map<string, number>();

  primarySource.forEach((item: any) => {
    const device = item.device_type || 'Desktop';
    const browser = item.browser || 'Unknown';
    const os = item.os || 'Unknown';
    
    deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
    osMap.set(os, (osMap.get(os) || 0) + 1);
  });

  const devices = Array.from(deviceMap.entries())
    .map(([device, count]) => ({
      device,
      visitors: count,
      percentage: uniqueVisitors > 0 ? (count / uniqueVisitors) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors);

  const browsers = Array.from(browserMap.entries())
    .map(([browser, count]) => ({
      browser,
      visitors: count,
      percentage: uniqueVisitors > 0 ? (count / uniqueVisitors) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors);

  const operatingSystems = Array.from(osMap.entries())
    .map(([os, count]) => ({
      os,
      visitors: count,
      percentage: uniqueVisitors > 0 ? (count / uniqueVisitors) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors);

  // Advanced traffic sources analysis
  const sourcesMap = new Map<string, number>();
  const referrerMap = new Map<string, number>();
  const utmMap = new Map<string, number>();

  analyticsData.forEach(row => {
    // Smart source detection
    let source = 'Direct';
    if (row.referrer) {
      const domain = extractDomain(row.referrer);
      if (domain.includes('google')) source = 'Google';
      else if (domain.includes('facebook')) source = 'Facebook';
      else if (domain.includes('linkedin')) source = 'LinkedIn';
      else if (domain.includes('twitter') || domain.includes('x.com')) source = 'X (Twitter)';
      else if (domain.includes('instagram')) source = 'Instagram';
      else if (domain.includes('youtube')) source = 'YouTube';
      else if (domain.includes('bing')) source = 'Bing';
      else source = 'Referral';
      
      referrerMap.set(domain, (referrerMap.get(domain) || 0) + 1);
    }
    
    if (row.utm_source) source = row.utm_source;
    if (row.utm_campaign) utmMap.set(row.utm_campaign, (utmMap.get(row.utm_campaign) || 0) + 1);
    
    sourcesMap.set(source, (sourcesMap.get(source) || 0) + 1);
  });

  const sources = Array.from(sourcesMap.entries())
    .map(([source, visitors]) => ({
      source,
      visitors,
      percentage: totalPageviews > 0 ? (visitors / totalPageviews) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors);

  const topReferrers = Array.from(referrerMap.entries())
    .map(([referrer, visitors]) => ({
      referrer,
      visitors,
      percentage: totalPageviews > 0 ? (visitors / totalPageviews) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);

  const utmCampaigns = Array.from(utmMap.entries())
    .map(([campaign, visitors]) => ({
      campaign,
      visitors,
      percentage: totalPageviews > 0 ? (visitors / totalPageviews) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5);

  // Page analysis with entry/exit intelligence
  const pagesMap = new Map<string, number>();
  const entryPagesMap = new Map<string, number>();
  const exitPagesMap = new Map<string, number>();

  analyticsData.forEach(row => {
    pagesMap.set(row.page_path, (pagesMap.get(row.page_path) || 0) + 1);
    if (row.entry_page) entryPagesMap.set(row.page_path, (entryPagesMap.get(row.page_path) || 0) + 1);
    if (row.exit_page) exitPagesMap.set(row.page_path, (exitPagesMap.get(row.page_path) || 0) + 1);
  });

  const pages = Array.from(pagesMap.entries())
    .map(([page, visitors]) => ({
      page,
      visitors,
      percentage: totalPageviews > 0 ? (visitors / totalPageviews) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors);

  const entryPages = Array.from(entryPagesMap.entries())
    .map(([page, visitors]) => ({
      page,
      visitors,
      percentage: entryPagesMap.size > 0 ? (visitors / Array.from(entryPagesMap.values()).reduce((a, b) => a + b, 0)) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);

  const exitPages = Array.from(exitPagesMap.entries())
    .map(([page, visitors]) => ({
      page,
      visitors,
      percentage: exitPagesMap.size > 0 ? (visitors / Array.from(exitPagesMap.values()).reduce((a, b) => a + b, 0)) * 100 : 0
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 10);

  // Session duration analysis
  const durationRanges = [
    { range: '0-10s', min: 0, max: 10 },
    { range: '10-30s', min: 10, max: 30 },
    { range: '30s-1m', min: 30, max: 60 },
    { range: '1-3m', min: 60, max: 180 },
    { range: '3-10m', min: 180, max: 600 },
    { range: '10m+', min: 600, max: Infinity }
  ];

  const durationCounts = durationRanges.map(range => ({
    range: range.range,
    sessions: primarySource.filter((item: any) => {
      const duration = item.session_duration || 0;
      return duration >= range.min && duration < range.max;
    }).length,
    percentage: 0
  }));

  const totalSessions = durationCounts.reduce((sum, d) => sum + d.sessions, 0);
  durationCounts.forEach(d => {
    d.percentage = totalSessions > 0 ? (d.sessions / totalSessions) * 100 : 0;
  });

  // Advanced trend calculation
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  const trendMap = new Map();
  
  if (daysDiff <= 1) {
    // Hourly data for single day
    analyticsData.forEach(row => {
      const hour = new Date(row.created_at).getHours();
      const key = `${hour.toString().padStart(2, '0')}:00`;
      if (!trendMap.has(key)) {
        trendMap.set(key, { visitors: new Set(), pageviews: 0 });
      }
      trendMap.get(key).visitors.add(row.visitor_id);
      trendMap.get(key).pageviews += 1;
    });
  } else {
    // Daily data for multiple days
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

  // Performance metrics
  let performance = {
    avgLoadTime: 0,
    avgFCP: 0,
    avgLCP: 0,
    avgCLS: 0
  };

  if (performanceData && performanceData.length > 0) {
    const validPerf = performanceData.filter(p => p.load_time > 0);
    if (validPerf.length > 0) {
      performance.avgLoadTime = validPerf.reduce((sum, p) => sum + (p.load_time || 0), 0) / validPerf.length;
      performance.avgFCP = validPerf.reduce((sum, p) => sum + (p.first_contentful_paint || 0), 0) / validPerf.length;
      performance.avgLCP = validPerf.reduce((sum, p) => sum + (p.largest_contentful_paint || 0), 0) / validPerf.length;
      performance.avgCLS = validPerf.reduce((sum, p) => sum + (p.cumulative_layout_shift || 0), 0) / validPerf.length;
    }
  }

  // Lead conversion metrics
  const totalLeads = leadsData ? leadsData.length : 0;
  const conversionRate = uniqueVisitors > 0 ? (totalLeads / uniqueVisitors) * 100 : 0;
  const newLeads = leadsData ? leadsData.filter(l => l.status === 'nieuw').length : 0;
  const inProgress = leadsData ? leadsData.filter(l => ['contact_opgenomen', 'offerte_verzonden', 'in_behandeling'].includes(l.status)).length : 0;
  const converted = leadsData ? leadsData.filter(l => l.status === 'geconverteerd').length : 0;
  const bounced = leadsData ? leadsData.filter(l => l.status === 'geen_interesse').length : 0;
  const rejected = leadsData ? leadsData.filter(l => l.status === 'afgewezen').length : 0;

  return {
    visitors: uniqueVisitors,
    pageviews: totalPageviews,
    bounceRate,
    avgSessionDuration,
    viewsPerVisit,
    sources,
    pages,
    countries,
    cities,
    devices,
    browsers,
    operatingSystems,
    trend,
    topReferrers,
    entryPages,
    exitPages,
    sessionDurations: durationCounts,
    utmCampaigns,
    leadMetrics: {
      totalLeads,
      conversionRate,
      newLeads,
      inProgress,
      converted,
      bounced,
      rejected
    },
    performance
  };
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function getCountryFlag(countryCode: string): string {
  const flags: { [key: string]: string } = {
    'NL': '🇳🇱', 'BE': '🇧🇪', 'DE': '🇩🇪', 'FR': '🇫🇷', 'UK': '🇬🇧', 'GB': '🇬🇧',
    'US': '🇺🇸', 'CA': '🇨🇦', 'ES': '🇪🇸', 'IT': '🇮🇹', 'AT': '🇦🇹', 'CH': '🇨🇭',
    'DK': '🇩🇰', 'SE': '🇸🇪', 'NO': '🇳🇴', 'FI': '🇫🇮', 'PL': '🇵🇱', 'CZ': '🇨🇿',
    'HU': '🇭🇺', 'RO': '🇷🇴', 'BG': '🇧🇬', 'HR': '🇭🇷', 'SI': '🇸🇮', 'SK': '🇸🇰',
    'EE': '🇪🇪', 'LV': '🇱🇻', 'LT': '🇱🇹', 'IE': '🇮🇪', 'PT': '🇵🇹', 'GR': '🇬🇷',
    'LU': '🇱🇺', 'CY': '🇨🇾', 'MT': '🇲🇹', 'IS': '🇮🇸', 'TR': '🇹🇷', 'RU': '🇷🇺',
    'UA': '🇺🇦', 'BY': '🇧🇾', 'MD': '🇲🇩', 'RS': '🇷🇸', 'ME': '🇲🇪', 'MK': '🇲🇰',
    'AL': '🇦🇱', 'BA': '🇧🇦', 'XK': '🇽🇰', 'AD': '🇦🇩', 'SM': '🇸🇲', 'VA': '🇻🇦',
    'LI': '🇱🇮', 'MC': '🇲🇨', 'JP': '🇯🇵', 'CN': '🇨🇳', 'KR': '🇰🇷', 'IN': '🇮🇳',
    'AU': '🇦🇺', 'NZ': '🇳🇿', 'BR': '🇧🇷', 'MX': '🇲🇽', 'AR': '🇦🇷', 'ZA': '🇿🇦'
  };
  return flags[countryCode?.toUpperCase()] || '🌍';
}