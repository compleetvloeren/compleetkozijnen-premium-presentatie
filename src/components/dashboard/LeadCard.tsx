import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Calendar, Eye, Trash2 } from 'lucide-react';

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

interface LeadCardProps {
  lead: Lead;
  onViewDetails: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onViewDetails, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nieuw': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in_behandeling': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'offerte_verstuurd': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'gewonnen': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'verloren': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getProjectTypeLabel = (type?: string) => {
    switch (type) {
      case 'ramen': return 'Ramen';
      case 'deuren': return 'Deuren';
      case 'schuifdeuren': return 'Schuifdeuren';
      case 'renovatie': return 'Renovatie';
      case 'nieuwbouw': return 'Nieuwbouw';
      default: return type || 'Onbekend';
    }
  };

  const getBudgetLabel = (budget?: string) => {
    switch (budget) {
      case 'tot_5k': return '< €5.000';
      case '5k_15k': return '€5.000 - €15.000';
      case '15k_30k': return '€15.000 - €30.000';
      case 'boven_30k': return '> €30.000';
      default: return budget || 'Niet opgegeven';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="font-semibold text-lg">{lead.name}</h3>
              {lead.company && (
                <p className="text-sm text-muted-foreground">{lead.company}</p>
              )}
            </div>
          </div>
          <Badge className={getStatusColor(lead.status)}>
            {lead.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{lead.email}</span>
          </div>
          
          {lead.phone && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{lead.phone}</span>
            </div>
          )}
          
          {lead.location && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{lead.location}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(lead.created_at).toLocaleDateString('nl-NL')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {lead.project_type && (
            <div>
              <span className="text-xs font-medium text-muted-foreground">Project Type</span>
              <p className="text-sm">{getProjectTypeLabel(lead.project_type)}</p>
            </div>
          )}
          
          {lead.budget_range && (
            <div>
              <span className="text-xs font-medium text-muted-foreground">Budget</span>
              <p className="text-sm">{getBudgetLabel(lead.budget_range)}</p>
            </div>
          )}
          
          {lead.timeline && (
            <div>
              <span className="text-xs font-medium text-muted-foreground">Timeline</span>
              <p className="text-sm">{lead.timeline}</p>
            </div>
          )}
          
          {/* Show project details summary if available */}
          {lead.project_details && (
            <div className="md:col-span-2">
              <span className="text-xs font-medium text-muted-foreground">Woning Info</span>
              <p className="text-sm line-clamp-2 text-muted-foreground">
                {lead.project_details.split('\n').join(' • ')}
              </p>
            </div>
          )}
        </div>

        {lead.description && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {lead.description}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(lead)}
            className="flex items-center space-x-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span>Verwijderen</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(lead)}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Details bekijken</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};