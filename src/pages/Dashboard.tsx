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
  RefreshCw,
  Trash2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LeadCard } from '@/components/dashboard/LeadCard';
import { LeadDetailDialog } from '@/components/dashboard/LeadDetailDialog';
import { DeleteLeadDialog } from '@/components/dashboard/DeleteLeadDialog';
import { DeleteContactDialog } from '@/components/dashboard/DeleteContactDialog';
import { ContactDetailDialog } from '@/components/dashboard/ContactDetailDialog';
import { SearchAndFilters } from '@/components/dashboard/SearchAndFilters';
import { NotificationCenter } from '@/components/dashboard/NotificationCenter';
import { ExportOptions } from '@/components/dashboard/ExportOptions';
import { DashboardLoadingSkeleton, StatCardSkeleton, LeadCardSkeleton } from '@/components/dashboard/LoadingSkeletons';
import { AnalyticsSection } from '@/components/dashboard/AnalyticsSection';
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
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteContactDialog, setShowDeleteContactDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<ContactSubmission | null>(null);
  const [isDeletingContact, setIsDeletingContact] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectTypeFilter, setProjectTypeFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  useEffect(() => {
    fetchData();
    // Poll for new data every 30 seconds - but not after delete operations
    const interval = setInterval(() => {
      if (!isDeleting) {
        fetchData(true);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [isDeleting]);

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

  const handleViewContactDetails = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setShowContactDetail(true);
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

  const handleDeleteLead = (lead: Lead) => {
    setLeadToDelete(lead);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async (leadId: string, password: string) => {
    try {
      setIsDeleting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Niet geautoriseerd');
      }

      const response = await supabase.functions.invoke('leads-crud', {
        body: { 
          action: 'delete',
          leadId: leadId,
          password: password 
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Verwijderen mislukt');
      }

      // Remove the lead from local state
      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
      
      // Close dialogs
      setShowDeleteDialog(false);
      setShowLeadDetail(false);
      setLeadToDelete(null);
      setSelectedLead(null);

      toast({
        title: "Lead verwijderd",
        description: "De lead is succesvol verwijderd.",
        variant: "default"
      });

      addNotification({
        type: 'success',
        title: 'Lead Verwijderd',
        message: `Lead is permanent verwijderd uit het systeem`,
        actionUrl: '/dashboard',
        actionLabel: 'Dashboard'
      });

    } catch (error: any) {
      console.error('Error deleting lead:', error);
      
      if (error.message === 'Invalid delete password') {
        throw new Error('Onjuist wachtwoord');
      }
      
      toast({
        title: "Verwijderen mislukt",
        description: error.message || "Er is een fout opgetreden bij het verwijderen.",
        variant: "destructive"
      });
      
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteContact = (contact: ContactSubmission) => {
    setContactToDelete(contact);
    setShowDeleteContactDialog(true);
  };

  const handleConfirmDeleteContact = async (contactId: string, password: string) => {
    try {
      setIsDeletingContact(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Niet geautoriseerd');
      }

      const response = await supabase.functions.invoke('leads-crud', {
        body: { 
          action: 'delete-contact',
          contactId: contactId,
          password: password 
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Verwijderen mislukt');
      }

      // Remove the contact from local state
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
      
      // Close dialogs
      setShowDeleteContactDialog(false);
      setContactToDelete(null);

      toast({
        title: "Contactbericht verwijderd",
        description: "Het contactbericht is succesvol verwijderd.",
        variant: "default"
      });

      addNotification({
        type: 'success',
        title: 'Contactbericht Verwijderd',
        message: `Contactbericht is permanent verwijderd uit het systeem`,
        actionUrl: '/dashboard',
        actionLabel: 'Dashboard'
      });

    } catch (error: any) {
      console.error('Error deleting contact:', error);
      
      let errorMessage = 'Er is een fout opgetreden bij het verwijderen.';
      
      if (error.message === 'Invalid delete password') {
        errorMessage = 'Onjuist wachtwoord';
      } else if (error.message.includes('Failed to send')) {
        errorMessage = 'Verbindingsprobleem met de server. Probeer het opnieuw.';
      } else if (error.message.includes('Contact ID required')) {
        errorMessage = 'Contact ID ontbreekt';
      }
      
      toast({
        title: "Verwijderen mislukt",
        description: errorMessage,
        variant: "destructive"
      });
      
      throw new Error(errorMessage);
    } finally {
      setIsDeletingContact(false);
    }
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
      <header className="dashboard-header sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex flex-col gap-3">
            <div className="animate-fade-in-up">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm truncate">Welkom terug, {user?.email}</p>
            </div>
            
            {/* Mobile-first button layout */}
            <div className="flex items-center justify-between gap-2">
              {/* Left side - primary actions */}
              <div className="flex items-center gap-2">
                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative min-w-[40px] h-9 ${unreadCount > 0 ? 'bg-primary/10 border-primary/20' : ''}`}
                  >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="dashboard-notification-badge absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-medium">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Button>
                  
                  {showNotifications && (
                    <>
                      {/* Mobile backdrop */}
                      <div 
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
                        onClick={() => setShowNotifications(false)}
                      />
                      
                      <div className="fixed left-3 right-3 top-16 md:absolute md:right-0 md:left-auto md:top-full md:mt-2 md:w-80 z-[100] animate-scale-in">
                        <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-xl border border-border/50 p-4 max-h-[70vh] overflow-y-auto">
                          <NotificationCenter
                            notifications={notifications}
                            onMarkAsRead={markAsRead}
                            onMarkAllAsRead={markAllAsRead}
                            onDismiss={dismissNotification}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Refresh */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="min-w-[40px] h-9"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden lg:inline ml-2">{refreshing ? 'Laden...' : 'Verversen'}</span>
                </Button>
              </div>

              {/* Right side - secondary actions */}
              <div className="flex items-center gap-2">
                {/* Export Options */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExportOptions(!showExportOptions)}
                  disabled={filteredLeads.length === 0}
                  className="min-w-[40px] h-9"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden lg:inline ml-2">Export</span>
                </Button>

                {/* Logout */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut} 
                  className="h-9 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Uitloggen</span>
                  <span className="sm:hidden">Uit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 py-3 sm:px-4 sm:py-6 space-y-4 sm:space-y-6">

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Card className="dashboard-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs font-medium truncate pr-1">Totaal</CardTitle>
              <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="pb-3 px-3 sm:px-6">
              <div className="text-lg sm:text-2xl font-bold text-primary">{stats.totalLeads}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                +{stats.recentLeads} deze week
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs font-medium truncate pr-1">Nieuw</CardTitle>
              <TrendingUp className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="pb-3 px-3 sm:px-6">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.newLeads}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                Te behandelen
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs font-medium truncate pr-1">Actief</CardTitle>
              <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="pb-3 px-3 sm:px-6">
              <div className="text-lg sm:text-2xl font-bold text-amber-600">{stats.inProgress}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                In behandeling
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs font-medium truncate pr-1">Gewonnen</CardTitle>
              <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="pb-3 px-3 sm:px-6">
              <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.converted}</div>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                Afgesloten
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-3 sm:space-y-4">
          <TabsList className="bg-white/60 backdrop-blur-sm border border-border/50 grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="analytics" className="text-[11px] sm:text-sm py-2 sm:py-2.5 px-1 sm:px-4">
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">📊</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="relative text-[11px] sm:text-sm py-2 sm:py-2.5 px-1 sm:px-4">
              <span className="hidden sm:inline">Leads ({stats.totalLeads})</span>
              <span className="sm:hidden">📋</span>
              {stats.newLeads > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-primary text-primary-foreground text-[9px] sm:text-xs min-w-[16px] h-4 sm:min-w-[18px] sm:h-5 flex items-center justify-center rounded-full font-medium">
                  {stats.newLeads}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts" className="relative text-[11px] sm:text-sm py-2 sm:py-2.5 px-1 sm:px-4">
              <span className="hidden sm:inline">Contact ({stats.unreadContacts > 0 ? stats.unreadContacts : stats.totalContacts})</span>
              <span className="sm:hidden">📧</span>
              {stats.unreadContacts > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-orange-500 text-white text-[9px] sm:text-xs min-w-[16px] h-4 sm:min-w-[18px] sm:h-5 flex items-center justify-center rounded-full font-medium">
                  {stats.unreadContacts}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
            <AnalyticsSection leads={leads} />
          </TabsContent>

          <TabsContent value="leads" className="space-y-4 sm:space-y-6">
            <Card className="dashboard-card">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Leads Overzicht</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Beheer en bekijk alle aanvragen voor offertes
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      {filteredLeads.length} zichtbaar
                    </Badge>
                  </div>
                </div>
              </CardHeader>
                <CardContent className="px-4 sm:px-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {filteredLeads.map((lead, index) => (
                    <div key={lead.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <LeadCard
                        lead={lead}
                        onViewDetails={handleViewLeadDetails}
                        onDelete={handleDeleteLead}
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
                {contacts.length > 0 ? (
                   <div className="space-y-4">
                     {contacts.map((contact) => (
                        <div key={contact.id} className="flex flex-col p-3 sm:p-4 border rounded-lg gap-3 bg-card">
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-medium text-sm truncate flex-1">{contact.name}</h4>
                              <Badge className={`${getStatusColor(contact.status)} text-xs px-2 py-0.5 flex-shrink-0`}>
                                {contact.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1.5">
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3 flex-shrink-0" />
                                <span className="break-all text-[11px] sm:text-xs">{contact.email}</span>
                              </div>
                              {contact.phone && (
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <Phone className="h-3 w-3 flex-shrink-0" />
                                  <span className="text-[11px] sm:text-xs">{contact.phone}</span>
                                </div>
                              )}
                            </div>
                            
                            {contact.subject && (
                              <p className="text-xs sm:text-sm font-medium line-clamp-1">{contact.subject}</p>
                            )}
                            <p className="text-xs text-muted-foreground line-clamp-2">{contact.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(contact.created_at).toLocaleDateString('nl-NL')}
                            </p>
                          </div>
                          
                          <div className="flex gap-2 pt-2 border-t border-border/50">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewContactDetails(contact)}
                              className="flex-1 h-8 text-xs"
                            >
                              Bekijken
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteContact(contact)}
                              className="text-destructive hover:text-destructive h-8 px-3"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
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
        open={showLeadDetail}
        onOpenChange={setShowLeadDetail}
        onLeadUpdate={handleLeadUpdate}
        onDelete={handleDeleteLead}
      />

      {/* Delete Lead Dialog */}
      <DeleteLeadDialog
        lead={leadToDelete}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Contact Detail Dialog */}
      <ContactDetailDialog
        contact={selectedContact}
        open={showContactDetail}
        onOpenChange={setShowContactDetail}
      />

      {/* Delete Contact Dialog */}
      <DeleteContactDialog
        contact={contactToDelete}
        open={showDeleteContactDialog}
        onOpenChange={setShowDeleteContactDialog}
        onConfirmDelete={handleConfirmDeleteContact}
        isDeleting={isDeletingContact}
      />
    </div>
  );
};

export default Dashboard;