import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Users, TrendingUp, Mail, Phone, MapPin, Clock, Search, Filter, Plus } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LeadCard } from '@/components/dashboard/LeadCard';
import { LeadDetailDialog } from '@/components/dashboard/LeadDetailDialog';
import { SearchAndFilters } from '@/components/dashboard/SearchAndFilters';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectTypeFilter, setProjectTypeFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
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

      setLeads(leadsData || []);
      setContacts(contactsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Fout bij laden",
        description: "Kon data niet laden. Probeer het opnieuw.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welkom terug, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Uitloggen
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.recentLeads} deze week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nieuwe Leads</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newLeads}</div>
              <p className="text-xs text-muted-foreground">
                Nog niet behandeld
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Behandeling</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">
                Actieve projecten
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Geconverteerd</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.converted}</div>
              <p className="text-xs text-muted-foreground">
                Succesvol afgesloten
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads">
              Leads ({stats.totalLeads})
            </TabsTrigger>
            <TabsTrigger value="contacts">
              Contact Berichten ({stats.unreadContacts > 0 ? stats.unreadContacts : stats.totalContacts})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leads Overzicht</CardTitle>
                  <CardDescription>
                    Beheer en bekijk alle aanvragen voor offertes
                  </CardDescription>
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
                  {filteredLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onViewDetails={handleViewLeadDetails}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Geen leads gevonden</h3>
                      <p className="text-muted-foreground">
                        {leads.length === 0 
                          ? "Er zijn nog geen leads ingediend."
                          : "Probeer andere zoekfilters."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
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
                    <p className="text-muted-foreground">
                      Er zijn nog geen contact berichten ontvangen.
                    </p>
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