import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, Target, Zap } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.metrics.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              Alle tijd
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversie Ratio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.metrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Gewonnen / Totaal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actieve Leads</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.metrics.activeLeads}</div>
            <p className="text-xs text-muted-foreground">
              In behandeling
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wekelijkse Groei</CardTitle>
            {analyticsData.metrics.weeklyGrowth >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${analyticsData.metrics.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analyticsData.metrics.weeklyGrowth > 0 ? '+' : ''}{analyticsData.metrics.weeklyGrowth}%
            </div>
            <p className="text-xs text-muted-foreground">
              vs vorige week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Verdeling</CardTitle>
            <CardDescription>
              Huidige verdeling van alle leads per status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={analyticsData.statusData}
                  dataKey="count"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ label, count }) => `${label}: ${count}`}
                >
                  {analyticsData.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily Leads Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Trend (30 dagen)</CardTitle>
            <CardDescription>
              Aantal nieuwe leads per dag in de afgelopen 30 dagen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={analyticsData.dailyLeads}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="formattedDate" 
                  interval="preserveStartEnd"
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Project Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Project Types</CardTitle>
            <CardDescription>
              Verdeling van leads per project type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={analyticsData.projectTypeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="type" type="category" width={100} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversie Funnel</CardTitle>
            <CardDescription>
              Leads per fase van het verkoopproces
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={analyticsData.conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};