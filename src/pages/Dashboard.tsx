import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Bell,
  Download,
  BarChart3,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LeadCard } from '@/components/dashboard/LeadCard';
import { LeadDetailDialog } from '@/components/dashboard/LeadDetailDialog';
import { SearchAndFilters } from '@/components/dashboard/SearchAndFilters';
import { NotificationCenter } from '@/components/dashboard/NotificationCenter';
import { ExportOptions } from '@/components/dashboard/ExportOptions';
import { DashboardLoadingSkeleton, StatCardSkeleton, LeadCardSkeleton } from '@/components/dashboard/LoadingSkeletons';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNotifications, useLeadNotifications } from '@/hooks/useNotifications';
import { exportLeads } from '@/lib/exportUtils';

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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { notifications, unreadCount, addNotification, markAsRead, markAllAsRead, dismissNotification } = useNotifications();
  const { simulateExportComplete, simulateSystemError } = useLeadNotifications();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectTypeFilter, setProjectTypeFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  useEffect(() => {
    fetchData();
    // Poll for new data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Fetch leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;

      // Fetch contact submissions
      const { data: contactsData, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;

      // Check for new leads and notify
      if (isRefresh && leadsData && leads.length > 0) {
        const newLeads = leadsData.filter(newLead => 
          !leads.some(existingLead => existingLead.id === newLead.id)
        );
        
        newLeads.forEach(lead => {
          addNotification({
            type: 'info',
            title: 'Nieuwe Lead',
            message: `${lead.name} heeft een offerteverzoek ingediend`,
            actionUrl: '/dashboard',
            actionLabel: 'Bekijk Lead'
          });
        });
      }

      setLeads(leadsData || []);
      setContacts(contactsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (!isRefresh) {
        toast({
          title: "Fout bij laden",
          description: "Kon data niet laden. Probeer het opnieuw.",
          variant: "destructive"
        });
        simulateSystemError("Dashboard data kon niet worden geladen");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter and search logic
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.location && lead.location.toLowerCase().includes(searchTerm.toLowerCase()));

      // Status filter
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

      // Project type filter
      const matchesProjectType = projectTypeFilter === 'all' || lead.project_type === projectTypeFilter;

      // Budget filter
      const matchesBudget = budgetFilter === 'all' || lead.budget_range === budgetFilter;

      return matchesSearch && matchesStatus && matchesProjectType && matchesBudget;
    });
  }, [leads, searchTerm, statusFilter, projectTypeFilter, budgetFilter]);

  // Statistics calculations
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return {
      totalLeads: leads.length,
      newLeads: leads.filter(lead => lead.status === 'nieuw').length,
      inProgress: leads.filter(lead => lead.status === 'in_behandeling').length,
      converted: leads.filter(lead => lead.status === 'gewonnen').length,
      recentLeads: leads.filter(lead => new Date(lead.created_at) > weekAgo).length,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter(contact => contact.status === 'ongelezen').length
    };
  }, [leads, contacts]);

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );
    setSelectedLead(updatedLead);
    
    // Notify about status change
    addNotification({
      type: 'success',
      title: 'Lead Bijgewerkt',
      message: `Status van ${updatedLead.name} is bijgewerkt`,
      actionUrl: '/dashboard',
      actionLabel: 'Bekijk Lead'
    });
  };

  const handleViewLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadDetail(true);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setProjectTypeFilter('all');
    setBudgetFilter('all');
  };

  const handleRefresh = () => {
    fetchData(true);
  };

  const handleExport = async (format: 'csv' | 'excel', data: Lead[]) => {
    try {
      setExporting(true);
      await exportLeads(data, format);
      simulateExportComplete(data.length, format);
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export mislukt",
        description: "Er is een fout opgetreden bij het exporteren.",
        variant: "destructive"
      });
      simulateSystemError("Lead export is mislukt");
    } finally {
      setExporting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in_behandeling': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'offerte_verstuurd': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'gewonnen': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'verloren': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'ongelezen': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <DashboardLoadingSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navigation />
      
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground">Welkom terug, {user?.email}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative ${unreadCount > 0 ? 'bg-primary/10 border-primary/20' : ''}`}
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="dashboard-notification-badge absolute -top-2 -right-2 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 z-50 animate-scale-in">
                    <div className="bg-white rounded-lg shadow-xl border border-border/50 p-4">
                      <NotificationCenter
                        notifications={notifications}
                        onMarkAsRead={markAsRead}
                        onMarkAllAsRead={markAllAsRead}
                        onDismiss={dismissNotification}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Export Options */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExportOptions(!showExportOptions)}
                disabled={filteredLeads.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>

              {/* Refresh */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Laden...' : 'Verversen'}
              </Button>

              {/* Logout */}
              <Button variant="ghost" size="sm" onClick={signOut}>
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">/

        {/* Export Options Popup */}
        {showExportOptions && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in-up">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-scale-in">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold">Export Leads</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExportOptions(false)}
                >
                  ×
                </Button>
              </div>
              <div className="p-4">
                <ExportOptions
                  leads={leads}
                  filteredLeads={filteredLeads}
                  onExport={handleExport}
                  isExporting={exporting}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error Alert for Empty State */}
        {!loading && leads.length === 0 && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Er zijn nog geen leads in het systeem. Zodra er offerteverzoeken worden ingediend, 
              verschijnen deze hier in het dashboard.
            </AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="dashboard-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.recentLeads} deze week
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nieuwe Leads</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.newLeads}</div>
              <p className="text-xs text-muted-foreground">
                Nog niet behandeld
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Behandeling</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">
                Actieve projecten
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Geconverteerd</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.converted}</div>
              <p className="text-xs text-muted-foreground">
                Succesvol afgesloten
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="bg-white/60 backdrop-blur-sm border border-border/50">
            <TabsTrigger value="leads" className="relative">
              Leads ({stats.totalLeads})
              {stats.newLeads > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {stats.newLeads} nieuw
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts">
              Contact Berichten ({stats.unreadContacts > 0 ? stats.unreadContacts : stats.totalContacts})
              {stats.unreadContacts > 0 && (
                <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.unreadContacts}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Leads Overzicht</span>
                    </CardTitle>
                    <CardDescription>
                      Beheer en bekijk alle aanvragen voor offertes
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {filteredLeads.length} zichtbaar
                    </Badge>
                  </div>
                </div>
              </CardHeader>
                <CardContent>
                  <SearchAndFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    projectTypeFilter={projectTypeFilter}
                    setProjectTypeFilter={setProjectTypeFilter}
                    budgetFilter={budgetFilter}
                    setBudgetFilter={setBudgetFilter}
                    onReset={handleResetFilters}
                    totalResults={leads.length}
                    filteredResults={filteredLeads.length}
                  />
                </CardContent>
              </Card>

              {filteredLeads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLeads.map((lead, index) => (
                    <div key={lead.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <LeadCard
                        lead={lead}
                        onViewDetails={handleViewLeadDetails}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="dashboard-card">
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Geen leads gevonden</h3>
                      <p className="text-muted-foreground mb-4">
                        {leads.length === 0 
                          ? "Er zijn nog geen leads ingediend."
                          : "Probeer andere zoekfilters."}
                      </p>
                      {leads.length === 0 && (
                        <Button variant="outline" asChild>
                          <a href="/offerte">Bekijk Offerte Pagina</a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

          <TabsContent value="contacts">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Contact Berichten</CardTitle>
                <CardDescription>
                  Berichten via het contactformulier
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{contact.name}</h4>
                            <Badge className={getStatusColor(contact.status)}>
                              {contact.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span>{contact.email}</span>
                            </div>
                            {contact.phone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                          {contact.subject && (
                            <p className="text-sm font-medium">{contact.subject}</p>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2">{contact.message}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(contact.created_at).toLocaleDateString('nl-NL')}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Bekijken
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Geen berichten</h3>
                    <p className="text-muted-foreground mb-4">
                      Er zijn nog geen contact berichten ontvangen.
                    </p>
                    <Button variant="outline" asChild>
                      <a href="/contact">Bekijk Contact Pagina</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* Lead Detail Dialog */}
      <LeadDetailDialog
        lead={selectedLead}
        isOpen={showLeadDetail}
        onClose={() => setShowLeadDetail(false)}
        onLeadUpdate={handleLeadUpdate}
      />
    </div>
  );
};

export default Dashboard;