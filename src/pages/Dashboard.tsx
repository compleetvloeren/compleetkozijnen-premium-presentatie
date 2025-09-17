import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, TrendingUp, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  // Mock data for demonstration
  const stats = {
    totalLeads: 127,
    newLeads: 23,
    inProgress: 45,
    converted: 59,
    recentLeads: 15,
    totalContacts: 89
  };

  const recentLeads = [
    {
      id: '1',
      name: 'Jan Bakker',
      email: 'jan.bakker@email.nl',
      phone: '06-12345678',
      project_type: 'ramen',
      status: 'nieuw',
      created_at: new Date().toISOString(),
      location: 'Amsterdam'
    },
    {
      id: '2', 
      name: 'Maria de Vries',
      email: 'maria@email.nl',
      phone: '06-87654321',
      project_type: 'deuren',
      status: 'in_behandeling',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      location: 'Utrecht'
    }
  ];

  const recentContacts = [
    {
      id: '1',
      name: 'Peter Jansen',
      email: 'peter@email.nl',
      subject: 'Vraag over installatie',
      status: 'ongelezen',
      created_at: new Date().toISOString()
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-100 text-blue-800';
      case 'in_behandeling': return 'bg-yellow-100 text-yellow-800';
      case 'offerte_verstuurd': return 'bg-purple-100 text-purple-800';
      case 'gewonnen': return 'bg-green-100 text-green-800';
      case 'verloren': return 'bg-red-100 text-red-800';
      case 'ongelezen': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

        {/* Recent Activity */}
        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads">Recente Leads</TabsTrigger>
            <TabsTrigger value="contacts">Contact Berichten</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Recente Leads</CardTitle>
                <CardDescription>
                  De nieuwste aanvragen voor offertes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{lead.name}</h4>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{lead.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{lead.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Project: {lead.project_type} • {new Date(lead.created_at).toLocaleDateString('nl-NL')}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Bekijken
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                <div className="space-y-4">
                  {recentContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{contact.name}</h4>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        <p className="text-sm font-medium">{contact.subject}</p>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;