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
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2">
          <div className="flex items-start space-x-2 sm:space-x-3 min-w-0">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg truncate">{lead.name}</h3>
              {lead.company && (
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{lead.company}</p>
              )}
            </div>
          </div>
          <Badge className={`${getStatusColor(lead.status)} flex-shrink-0 text-[10px] sm:text-xs`}>
            {lead.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="break-all text-[11px] sm:text-sm">{lead.email}</span>
          </div>
          
          {lead.phone && (
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-[11px] sm:text-sm">{lead.phone}</span>
            </div>
          )}
          
          {lead.location && (
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-[11px] sm:text-sm truncate">{lead.location}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="text-[11px] sm:text-sm">{new Date(lead.created_at).toLocaleDateString('nl-NL')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {lead.project_type && (
            <div>
              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Project Type</span>
              <p className="text-xs sm:text-sm">{getProjectTypeLabel(lead.project_type)}</p>
            </div>
          )}
          
          {lead.budget_range && (
            <div>
              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Budget</span>
              <p className="text-xs sm:text-sm">{getBudgetLabel(lead.budget_range)}</p>
            </div>
          )}
          
          {lead.timeline && (
            <div>
              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Timeline</span>
              <p className="text-xs sm:text-sm">{lead.timeline}</p>
            </div>
          )}
          
          {/* Show project details summary if available */}
          {lead.project_details && (
            <div>
              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Woning Info</span>
              <p className="text-xs sm:text-sm line-clamp-2 text-muted-foreground">
                {lead.project_details.split('\n').join(' • ')}
              </p>
            </div>
          )}
        </div>

        {lead.description && (
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {lead.description}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(lead)}
            className="flex items-center space-x-1 sm:space-x-2 text-destructive hover:text-destructive text-xs flex-1 sm:flex-initial h-8 sm:h-9"
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Verwijderen</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(lead)}
            className="flex items-center space-x-1 sm:space-x-2 text-xs flex-1 h-8 sm:h-9"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Details</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};