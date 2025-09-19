import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar as CalendarIcon, Target, Zap, Eye, Clock, Globe, Smartphone, Monitor, MapPin, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, subDays, startOfDay, subMonths, subYears, isWithinInterval } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { nl } from 'date-fns/locale';

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
  leadMetrics: {
    totalLeads: number;
    conversionRate: number;
    newLeads: number;
    inProgress: number;
    converted: number;
    totalContacts: number;
  };
  lastUpdated: string;
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
  const [customDateRange, setCustomDateRange] = useState<{from: Date | undefined; to: Date | undefined}>({ from: undefined, to: undefined });
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [webAnalytics, setWebAnalytics] = useState<WebAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  // Get display label for current selection
  const getTimeRangeLabel = () => {
    if (timeRange === 'custom' && customDateRange.from && customDateRange.to) {
      return `${format(customDateRange.from, 'd MMM', { locale: nl })} - ${format(customDateRange.to, 'd MMM', { locale: nl })}`;
    }
    
    const labels: { [key: string]: string } = {
      '1d': '1 dag',
      '7d': '7 dagen',
      '14d': '14 dagen', 
      '30d': '30 dagen',
      '90d': '90 dagen',
      '6m': '6 maanden',
      '1y': '1 jaar'
    };
    
    return labels[timeRange] || timeRange;
  };

  // Calculate actual date range for API calls
  const getActualDateRange = () => {
    if (timeRange === 'custom' && customDateRange.from && customDateRange.to) {
      return {
        startDate: format(customDateRange.from, 'yyyy-MM-dd'),
        endDate: format(customDateRange.to, 'yyyy-MM-dd')
      };
    }
    
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case '1d':
        startDate = subDays(now, 1);
        break;
      case '14d':
        startDate = subDays(now, 14);
        break;
      case '90d':
        startDate = subDays(now, 90);
        break;
      case '6m':
        startDate = subMonths(now, 6);
        break;
      case '1y':
        startDate = subYears(now, 1);
        break;
      default:
        startDate = subDays(now, 7);
    }
    
    return {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(now, 'yyyy-MM-dd')
    };
  };

  const fetchAnalytics = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const dateRange = getActualDateRange();
      console.log('Fetching analytics for date range:', dateRange);

      const { data, error } = await supabase.functions.invoke('website-analytics', {
        body: { 
          timeRange: timeRange === 'custom' ? 'custom' : timeRange,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (error) {
        console.error('Error fetching analytics:', error);
        throw error;
      }

      console.log('Analytics data received:', data);
      setWebAnalytics(data);

      if (isRefresh) {
        toast({
          title: "Analytics bijgewerkt",
          description: "De nieuwste gegevens zijn geladen.",
        });
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast({
        title: "Fout bij laden analytics",
        description: "Kon analytics niet laden. Probeer het opnieuw.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  // Set up real-time updates for leads and contacts
  useEffect(() => {
    const leadsChannel = supabase
      .channel('leads-analytics')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        () => {
          console.log('Leads changed, refreshing analytics');
          fetchAnalytics(true);
        }
      )
      .subscribe();

    const contactsChannel = supabase
      .channel('contacts-analytics')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_submissions'
        },
        () => {
          console.log('Contacts changed, refreshing analytics');
          fetchAnalytics(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(contactsChannel);
    };
  }, []);

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
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Website Analytics</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            <span className="hidden sm:inline">Realtime overzicht van website prestaties • </span>
            Update: {webAnalytics?.lastUpdated ? new Date(webAnalytics.lastUpdated).toLocaleTimeString('nl-NL', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }) : 'Onbekend'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchAnalytics(true)}
            disabled={refreshing}
            className="h-8 sm:h-9"
          >
            <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${refreshing ? 'animate-spin' : ''} sm:mr-2`} />
            <span className="hidden sm:inline">{refreshing ? 'Laden...' : 'Vernieuwen'}</span>
          </Button>
          <Select 
            value={timeRange} 
            onValueChange={(value) => {
              setTimeRange(value);
              if (value === 'custom') {
                setShowCustomRange(true);
              } else {
                setShowCustomRange(false);
                setCustomDateRange({ from: undefined, to: undefined });
              }
            }}
          >
              <SelectTrigger className="w-24 sm:w-40 h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue>
                  <span className="truncate">{getTimeRangeLabel()}</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">1 dag</SelectItem>
                <SelectItem value="7d">7 dagen</SelectItem>
                <SelectItem value="14d">14 dagen</SelectItem>
                <SelectItem value="30d">30 dagen</SelectItem>
                <SelectItem value="90d">90 dagen</SelectItem>
                <SelectItem value="6m">6 maanden</SelectItem>
                <SelectItem value="1y">1 jaar</SelectItem>
                <SelectItem value="custom">Aangepast</SelectItem>
              </SelectContent>
            </Select>
            
            {timeRange === 'custom' && (
              <Popover open={showCustomRange} onOpenChange={setShowCustomRange}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="h-8 sm:h-9 px-2"
                  >
                    <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="end">
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Van datum:</p>
                      <Calendar
                        mode="single"
                        selected={customDateRange.from}
                        onSelect={(date) => setCustomDateRange(prev => ({ ...prev, from: date }))}
                        disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
                        initialFocus
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Tot datum:</p>
                      <Calendar
                        mode="single"
                        selected={customDateRange.to}
                        onSelect={(date) => setCustomDateRange(prev => ({ ...prev, to: date }))}
                        disabled={(date) => date > new Date() || date < new Date('2020-01-01') || (customDateRange.from && date < customDateRange.from)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => setShowCustomRange(false)}
                        disabled={!customDateRange.from || !customDateRange.to}
                      >
                        Toepassen
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setCustomDateRange({ from: undefined, to: undefined });
                          setShowCustomRange(false);
                        }}
                      >
                        Annuleren
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
      </div>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs font-medium truncate">Bezoekers</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">{webAnalytics.visitors}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {timeRange === '7d' ? '7 dagen' : timeRange === '30d' ? '30 dagen' : '90 dagen'}
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs font-medium truncate">Pagina's</CardTitle>
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{webAnalytics.pageviews}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {webAnalytics.viewsPerVisit.toFixed(1)} per bezoek
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2 sm:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs font-medium truncate">Bounce Rate</CardTitle>
            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold text-orange-600">{webAnalytics.bounceRate}%</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Verlating
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs font-medium truncate">Sessie</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">{formatDuration(webAnalytics.avgSessionDuration)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Gemiddeld
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs font-medium truncate">Conversie</CardTitle>
            <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold text-red-600">{webAnalytics.leadMetrics.conversionRate.toFixed(1)}%</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
              {webAnalytics.leadMetrics.totalLeads} leads
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Visitors Trend */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Bezoekers Trend</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Aantal bezoekers en paginaweergaven over tijd
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full overflow-hidden">
              <LineChart data={webAnalytics.trend} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' })}
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 sm:p-3 shadow-lg text-xs sm:text-sm">
                          <p className="font-medium">{new Date(label).toLocaleDateString('nl-NL')}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-xs" style={{ color: entry.color }}>
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
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 1, r: 3 }}
                  name="visitors"
                />
                <Line 
                  type="monotone" 
                  dataKey="pageviews" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 1, r: 3 }}
                  name="pageviews"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bottom row - responsive grid */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {/* Traffic Sources */}
          <Card>
            <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-sm sm:text-base">Verkeersbronnen</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Waar bezoekers vandaan komen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5 sm:space-y-2 px-3 sm:px-6 pb-3 sm:pb-6">
              {webAnalytics.sources.slice(0, 4).map((source, index) => (
                <div key={source.source} className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div 
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: chartConfig[Object.keys(chartConfig)[index % Object.keys(chartConfig).length] as keyof typeof chartConfig]?.color || 'hsl(var(--muted))' }}
                    />
                    <span className="font-medium text-xs sm:text-sm truncate">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">{source.percentage}%</Badge>
                    <span className="text-xs sm:text-sm font-medium min-w-[20px] text-right">{source.visitors}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-sm sm:text-base">Populaire Pagina's</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Meest bezochte pagina's
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5 sm:space-y-2 px-3 sm:px-6 pb-3 sm:pb-6">
              {webAnalytics.pages.slice(0, 4).map((page, index) => (
                <div key={page.page} className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] sm:text-xs font-bold">{index + 1}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-xs sm:text-sm block truncate">{page.page}</span>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">
                        {page.percentage}% van totaal
                      </div>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium flex-shrink-0 min-w-[30px] text-right">{page.visitors}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-sm sm:text-base">Geografische Verdeling</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Bezoekers per land
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5 sm:space-y-2 px-3 sm:px-6 pb-3 sm:pb-6">
              {webAnalytics.countries.slice(0, 4).map((country) => (
                <div key={country.country} className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <span className="text-sm sm:text-base flex-shrink-0">{country.flag}</span>
                    <span className="font-medium text-xs sm:text-sm truncate">{country.country}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-xs sm:text-sm font-medium min-w-[20px] text-right">{country.visitors}</span>
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card>
            <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-sm sm:text-base">Apparaten</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Verdeling per apparaattype
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5 sm:space-y-2 px-3 sm:px-6 pb-3 sm:pb-6">
              {webAnalytics.devices.slice(0, 4).map((device) => (
                <div key={device.device} className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    {device.device.includes('Mobile') ? (
                      <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <Monitor className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="font-medium text-xs sm:text-sm truncate">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">{device.percentage}%</Badge>
                    <span className="text-xs sm:text-sm font-medium min-w-[20px] text-right">{device.visitors}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};