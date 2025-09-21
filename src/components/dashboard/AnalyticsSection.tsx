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
import { format, subDays, startOfDay } from 'date-fns';
import { VisitorLocationDialog } from './VisitorLocationDialog';

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
  countries: Array<{ country: string; visitors: number; flag: string; ips?: string[] }>;
  cities?: Array<{ city: string; country: string; visitors: number; flag: string }>;
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

const chartColors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export const AnalyticsSection = () => {
  const [timeRange, setTimeRange] = useState('vandaag');
  const [data, setData] = useState<WebAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIP, setSelectedIP] = useState<string | null>(null);
  const [visitorSession, setVisitorSession] = useState<any>(null);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data: response, error } = await supabase.functions.invoke('website-analytics', {
        body: { timeRange }
      });

      if (error) {
        console.error('Error fetching analytics:', error);
        toast({
          title: "Fout bij laden analytics",
          description: "Kon analytics data niet laden. Probeer het opnieuw.",
          variant: "destructive"
        });
        return;
      }

      if (response) {
        setData(response);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Fout bij laden analytics", 
        description: "Er is een onverwachte fout opgetreden.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleIPClick = async (ip: string) => {
    try {
      const { data: sessionData, error } = await supabase
        .from('visitor_sessions')
        .select('*')
        .eq('ip_address', ip)
        .order('last_activity_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching visitor session:', error);
        return;
      }

      setVisitorSession(sessionData);
      setLocationDialogOpen(true);
    } catch (error) {
      console.error('Error loading visitor details:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const timeRangeLabels = {
    'vandaag': 'Vandaag',
    'gisteren': 'Gisteren', 
    'laatste7dagen': 'Laatste 7 dagen',
    'laatste30dagen': 'Laatste 30 dagen',
    'dezemaand': 'Deze maand',
    'vorigemaand': 'Vorige maand'
  };

  const deviceIcons = {
    Desktop: Monitor,
    Mobile: Smartphone,
    Tablet: MapPin
  };

  const chartConfig = useMemo(() => {
    if (!data) return {};
    
    const config: any = {};
    
    // Countries chart config
    data.countries.forEach((country, index) => {
      config[country.country.toLowerCase().replace(/\s+/g, '')] = {
        label: country.country,
        color: chartColors[index % chartColors.length],
      };
    });

    // Devices chart config
    data.devices.forEach((device, index) => {
      config[device.device.toLowerCase()] = {
        label: device.device,
        color: chartColors[index % chartColors.length],
      };
    });

    // Sources chart config
    data.sources.forEach((source, index) => {
      config[source.source.toLowerCase().replace(/\s+/g, '')] = {
        label: source.source,
        color: chartColors[index % chartColors.length],
      };
    });

    return config;
  }, [data]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
            <p className="text-muted-foreground">
              Overzicht van website prestaties en bezoekersstatistieken
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Laden...</span>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="h-4 bg-muted animate-pulse rounded"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-7 bg-muted animate-pulse rounded mb-1"></div>
                <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
            <p className="text-muted-foreground">
              Overzicht van website prestaties en bezoekersstatistieken
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-muted-foreground">Geen analytics data beschikbaar voor de geselecteerde periode.</p>
              <Button onClick={fetchAnalytics} className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Opnieuw proberen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Overzicht van website prestaties en bezoekersstatistieken
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecteer periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vandaag">Vandaag</SelectItem>
              <SelectItem value="gisteren">Gisteren</SelectItem>
              <SelectItem value="laatste7dagen">Laatste 7 dagen</SelectItem>
              <SelectItem value="laatste30dagen">Laatste 30 dagen</SelectItem>
              <SelectItem value="dezemaand">Deze maand</SelectItem>
              <SelectItem value="vorigemaand">Vorige maand</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchAnalytics} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unieke Bezoekers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.visitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Voor {timeRangeLabels[timeRange as keyof typeof timeRangeLabels] || timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paginaweergaven</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.pageviews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {data.viewsPerVisit.toFixed(1)} per bezoeker
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.bounceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Bezoekers die direct wegklikken
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gem. Sessieduur</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(data.avgSessionDuration / 60)}m {Math.round(data.avgSessionDuration % 60)}s
            </div>
            <p className="text-xs text-muted-foreground">
              Tijd per bezoek
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lead Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Leads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.leadMetrics.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              Voor {timeRangeLabels[timeRange as keyof typeof timeRangeLabels] || timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversie Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.leadMetrics.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Bezoekers naar leads
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nieuwe Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.leadMetrics.newLeads}</div>
            <p className="text-xs text-muted-foreground">
              Status: Nieuw
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Geconverteerd</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.leadMetrics.converted}</div>
            <p className="text-xs text-muted-foreground">
              Succesvolle leads
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Visitor Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Bezoekersverloop</CardTitle>
            <CardDescription>
              Dagelijkse bezoekers en paginaweergaven
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="visitors" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Bezoekers" />
                  <Line type="monotone" dataKey="pageviews" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Paginaweergaven" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Populaire Pagina's</CardTitle>
            <CardDescription>
              Meest bezochte pagina's
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.pages.slice(0, 6).map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }}></div>
                    <span className="text-sm truncate" title={page.page}>{page.page}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <Badge variant="secondary">{page.visitors}</Badge>
                    <span className="text-xs text-muted-foreground">({page.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geography and Devices */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Geografische Verdeling
            </CardTitle>
            <CardDescription>
              Bezoekers per land (unieke IP-adressen)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.countries.map((country, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-medium">{country.country}</span>
                    </div>
                    <Badge variant="secondary">{country.visitors}</Badge>
                  </div>
                  {country.ips && country.ips.length > 0 && (
                    <div className="ml-6 space-y-1">
                      {country.ips.slice(0, 3).map((ip, ipIndex) => (
                        <div
                          key={ipIndex}
                          className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-primary"
                          onClick={() => handleIPClick(ip)}
                        >
                          <MapPin className="h-3 w-3" />
                          <span className="font-mono">{ip}</span>
                        </div>
                      ))}
                      {country.ips.length > 3 && (
                        <div className="text-xs text-muted-foreground ml-5">
                          +{country.ips.length - 3} meer...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card>
          <CardHeader>
            <CardTitle>Apparaattypen</CardTitle>
            <CardDescription>
              Bezoekers per apparaattype
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.devices.map((device, index) => {
                const IconComponent = deviceIcons[device.device as keyof typeof deviceIcons] || Monitor;
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{device.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{device.visitors}</Badge>
                      <span className="text-xs text-muted-foreground">({device.percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Verkeersbronnen</CardTitle>
          <CardDescription>
            Waar komen uw bezoekers vandaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              {data.sources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }}></div>
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{source.visitors}</Badge>
                    <span className="text-xs text-muted-foreground">({source.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-[200px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.sources}
                      dataKey="visitors"
                      nameKey="source"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percentage }) => `${percentage.toFixed(0)}%`}
                    >
                      {data.sources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <VisitorLocationDialog
        isOpen={locationDialogOpen}
        onClose={() => setLocationDialogOpen(false)}
        visitorSession={visitorSession}
      />
    </div>
  );
};