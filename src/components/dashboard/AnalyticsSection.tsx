import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, Target, Zap, Eye, Clock, Globe, Smartphone, Monitor, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type?: string;
  budget_range?: string;
  status: string;
  location?: string;
  timeline?: string;
  created_at: string;
  description?: string;
  project_details?: string;
  preferred_contact_method?: string;
  preferred_contact_time?: string;
  special_requirements?: string;
  notes?: string;
}

interface WebAnalytics {
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

interface AnalyticsSectionProps {
  leads: Lead[];
}

const chartConfig = {
  nieuw: {
    label: "Nieuw",
    color: "hsl(var(--chart-1))",
  },
  in_behandeling: {
    label: "In Behandeling",
    color: "hsl(var(--chart-2))",
  },
  offerte_verstuurd: {
    label: "Offerte Verstuurd",
    color: "hsl(var(--chart-3))",
  },
  gewonnen: {
    label: "Gewonnen",
    color: "hsl(var(--chart-4))",
  },
  verloren: {
    label: "Verloren",
    color: "hsl(var(--chart-5))",
  },
};

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ leads }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [webAnalytics, setWebAnalytics] = useState<WebAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate web analytics data - in real implementation, this would come from your analytics service
    const simulateWebAnalytics = (): WebAnalytics => {
      const baseVisitors = timeRange === '7d' ? 180 : timeRange === '30d' ? 720 : 2160;
      
      return {
        visitors: baseVisitors + Math.floor(Math.random() * 50),
        pageviews: Math.floor((baseVisitors + Math.floor(Math.random() * 50)) * 2.8),
        bounceRate: 28 + Math.floor(Math.random() * 15),
        avgSessionDuration: 13 * 60 + 17 + Math.floor(Math.random() * 300), // in seconds
        viewsPerVisit: 2.1 + Math.random() * 2,
        sources: [
          { source: 'Direct', visitors: Math.floor(baseVisitors * 0.45), percentage: 45 },
          { source: 'Google Search', visitors: Math.floor(baseVisitors * 0.35), percentage: 35 },
          { source: 'Social Media', visitors: Math.floor(baseVisitors * 0.12), percentage: 12 },
          { source: 'Referrals', visitors: Math.floor(baseVisitors * 0.08), percentage: 8 },
        ],
        pages: [
          { page: '/', visitors: Math.floor(baseVisitors * 0.28), percentage: 28 },
          { page: '/producten', visitors: Math.floor(baseVisitors * 0.22), percentage: 22 },
          { page: '/producten/gealan', visitors: Math.floor(baseVisitors * 0.18), percentage: 18 },
          { page: '/offerte', visitors: Math.floor(baseVisitors * 0.15), percentage: 15 },
          { page: '/over-ons', visitors: Math.floor(baseVisitors * 0.10), percentage: 10 },
          { page: '/contact', visitors: Math.floor(baseVisitors * 0.07), percentage: 7 },
        ],
        countries: [
          { country: 'Nederland', visitors: Math.floor(baseVisitors * 0.68), flag: '🇳🇱' },
          { country: 'België', visitors: Math.floor(baseVisitors * 0.15), flag: '🇧🇪' },
          { country: 'Duitsland', visitors: Math.floor(baseVisitors * 0.12), flag: '🇩🇪' },
          { country: 'Overig', visitors: Math.floor(baseVisitors * 0.05), flag: '🌍' },
        ],
        devices: [
          { device: 'Mobile - iOS', visitors: Math.floor(baseVisitors * 0.42), percentage: 42 },
          { device: 'Desktop', visitors: Math.floor(baseVisitors * 0.35), percentage: 35 },
          { device: 'Mobile - Android', visitors: Math.floor(baseVisitors * 0.18), percentage: 18 },
          { device: 'Tablet', visitors: Math.floor(baseVisitors * 0.05), percentage: 5 },
        ],
        trend: Array.from({ length: timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (timeRange === '7d' ? 6 - i : timeRange === '30d' ? 29 - i : 89 - i));
          const dailyVisitors = Math.floor(baseVisitors / (timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90)) + Math.floor(Math.random() * 20);
          
          return {
            date: date.toISOString().split('T')[0],
            visitors: dailyVisitors,
            pageviews: Math.floor(dailyVisitors * (2.5 + Math.random())),
          };
        }),
      };
    };

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setWebAnalytics(simulateWebAnalytics());
      setLoading(false);
    }, 500);
  }, [timeRange]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  const analyticsData = useMemo(() => {
    // Status distribution
    const statusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusData = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      label: chartConfig[status as keyof typeof chartConfig]?.label || status,
      fill: chartConfig[status as keyof typeof chartConfig]?.color || 'hsl(var(--muted))',
    }));

    // Leads over time (last 30 days)
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyLeads = last30Days.map(date => {
      const dayLeads = leads.filter(lead => 
        lead.created_at.split('T')[0] === date
      ).length;
      
      return {
        date,
        leads: dayLeads,
        formattedDate: new Date(date).toLocaleDateString('nl-NL', { 
          month: 'short', 
          day: 'numeric' 
        }),
      };
    });

    // Project type distribution
    const projectTypeCounts = leads.reduce((acc, lead) => {
      const type = lead.project_type || 'Onbekend';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const projectTypeData = Object.entries(projectTypeCounts).map(([type, count]) => ({
      type,
      count,
    }));

    // Conversion funnel
    const conversionData = [
      { stage: 'Nieuw', count: statusCounts.nieuw || 0 },
      { stage: 'In Behandeling', count: statusCounts.in_behandeling || 0 },
      { stage: 'Offerte Verstuurd', count: statusCounts.offerte_verstuurd || 0 },
      { stage: 'Gewonnen', count: statusCounts.gewonnen || 0 },
    ];

    // Key metrics
    const totalLeads = leads.length;
    const conversionRate = totalLeads > 0 ? ((statusCounts.gewonnen || 0) / totalLeads * 100).toFixed(1) : '0';
    const activeLeads = (statusCounts.nieuw || 0) + (statusCounts.in_behandeling || 0) + (statusCounts.offerte_verstuurd || 0);
    
    const last7Days = leads.filter(lead => {
      const leadDate = new Date(lead.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return leadDate >= weekAgo;
    }).length;

    const previous7Days = leads.filter(lead => {
      const leadDate = new Date(lead.created_at);
      const twoWeeksAgo = new Date();
      const weekAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return leadDate >= twoWeeksAgo && leadDate < weekAgo;
    }).length;

    const weeklyGrowth = previous7Days > 0 ? ((last7Days - previous7Days) / previous7Days * 100).toFixed(1) : '0';

    return {
      statusData,
      dailyLeads,
      projectTypeData,
      conversionData,
      metrics: {
        totalLeads,
        conversionRate: parseFloat(conversionRate),
        activeLeads,
        weeklyGrowth: parseFloat(weeklyGrowth),
      }
    };
  }, [leads]);

  if (loading || !webAnalytics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Website Analytics</h2>
            <p className="text-muted-foreground">Overzicht van website prestaties en bezoekers</p>
          </div>
          <div className="animate-pulse bg-muted h-10 w-32 rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-muted h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Website Analytics</h2>
          <p className="text-muted-foreground">Overzicht van website prestaties en bezoekers</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 dagen</SelectItem>
            <SelectItem value="30d">30 dagen</SelectItem>
            <SelectItem value="90d">90 dagen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bezoekers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{webAnalytics.visitors}</div>
            <p className="text-xs text-muted-foreground">
              Laatste {timeRange === '7d' ? '7 dagen' : timeRange === '30d' ? '30 dagen' : '90 dagen'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paginaweergaven</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{webAnalytics.pageviews}</div>
            <p className="text-xs text-muted-foreground">
              {webAnalytics.viewsPerVisit.toFixed(2)} per bezoek
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{webAnalytics.bounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              Verlatingspercentage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessieduur</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatDuration(webAnalytics.avgSessionDuration)}</div>
            <p className="text-xs text-muted-foreground">
              Gemiddeld
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversie Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{((leads.length / webAnalytics.visitors) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Bezoeker → Lead
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Bezoekers Trend</CardTitle>
            <CardDescription>
              Aantal bezoekers en paginaweergaven over tijd
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={webAnalytics.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' })}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{new Date(label).toLocaleDateString('nl-NL')}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-sm" style={{ color: entry.color }}>
                              {entry.name === 'visitors' ? 'Bezoekers' : 'Paginaweergaven'}: {entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  name="visitors"
                />
                <Line 
                  type="monotone" 
                  dataKey="pageviews" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2 }}
                  name="pageviews"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Verkeersbronnen</CardTitle>
            <CardDescription>
              Waar komen je bezoekers vandaan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {webAnalytics.sources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: chartConfig[Object.keys(chartConfig)[index % Object.keys(chartConfig).length] as keyof typeof chartConfig]?.color || 'hsl(var(--muted))' }}
                  />
                  <span className="font-medium">{source.source}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{source.percentage}%</Badge>
                  <span className="text-sm text-muted-foreground">{source.visitors}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Populaire Pagina's</CardTitle>
            <CardDescription>
              Meest bezochte pagina's op je website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {webAnalytics.pages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <span className="font-medium">{page.page}</span>
                    <div className="text-xs text-muted-foreground">
                      {page.percentage}% van totaal verkeer
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium">{page.visitors}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geografische Verdeling</CardTitle>
            <CardDescription>
              Bezoekers per land
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {webAnalytics.countries.map((country) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{country.flag}</span>
                  <span className="font-medium">{country.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{country.visitors}</span>
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Apparaten</CardTitle>
            <CardDescription>
              Verdeling van bezoekers per apparaattype
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {webAnalytics.devices.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {device.device.includes('Mobile') ? (
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium">{device.device}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{device.percentage}%</Badge>
                  <span className="text-sm text-muted-foreground">{device.visitors}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};