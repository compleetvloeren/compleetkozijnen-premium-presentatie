import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  Clock, 
  Euro,
  FileText,
  Edit3 as Edit,
  Save,
  X,
  Trash2
} from 'lucide-react';
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

interface LeadDetailDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadUpdate: (updatedLead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export const LeadDetailDialog: React.FC<LeadDetailDialogProps> = ({
  lead,
  open,
  onOpenChange,
  onLeadUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<string>(lead?.status || '');
  const [notes, setNotes] = useState(lead?.notes || '');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setNotes(lead.notes || '');
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .update({ 
          status: status as any,
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', lead.id)
        .select()
        .single();

      if (error) throw error;

      onLeadUpdate({ ...lead, status, notes });
      setIsEditing(false);
      
      toast({
        title: "Lead bijgewerkt",
        description: "De wijzigingen zijn succesvol opgeslagen."
      });
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Fout bij opslaan",
        description: "Er is een fout opgetreden bij het opslaan van de wijzigingen.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{lead.name}</DialogTitle>
              <DialogDescription>
                Lead details en communicatie
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <Badge className={getStatusColor(status)}>
                  {status.replace('_', ' ')}
                </Badge>
              ) : (
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status.replace('_', ' ')}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contactgegevens</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{lead.email}</p>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                </div>
              </div>

              {lead.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lead.phone}</p>
                    <p className="text-sm text-muted-foreground">Telefoon</p>
                  </div>
                </div>
              )}

              {lead.company && (
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lead.company}</p>
                    <p className="text-sm text-muted-foreground">Bedrijf</p>
                  </div>
                </div>
              )}

              {lead.location && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lead.location}</p>
                    <p className="text-sm text-muted-foreground">Locatie</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {new Date(lead.created_at).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">Aangemaakt</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Projectgegevens</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lead.project_type && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project Type</p>
                  <p className="text-base">{getProjectTypeLabel(lead.project_type)}</p>
                </div>
              )}

              {lead.budget_range && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget</p>
                  <p className="text-base">{getBudgetLabel(lead.budget_range)}</p>
                </div>
              )}

              {lead.timeline && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                  <p className="text-base">{lead.timeline}</p>
                </div>
              )}

              {lead.preferred_contact_method && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Voorkeur Contact</p>
                  <p className="text-base">{lead.preferred_contact_method}</p>
                </div>
              )}

              {lead.preferred_contact_time && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Voorkeur Tijd</p>
                  <p className="text-base">{lead.preferred_contact_time}</p>
                </div>
              )}
            </div>
            
            {/* Additional project details from project_details field */}
            {lead.project_details && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-muted-foreground">Woning- en Projectdetails</h4>
                <div className="bg-muted/30 p-3 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm">{lead.project_details}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Project Description */}
        {lead.description && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Beschrijving</h3>
            <p className="text-muted-foreground">{lead.description}</p>
          </div>
        )}

        {/* Project Details - Combined Information */}
        {lead.project_details && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Woning- en Projectdetails</h3>
            <div className="bg-muted/20 p-4 rounded-lg border">
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">{lead.project_details}</pre>
            </div>
          </div>
        )}

        {/* Special Requirements - Enhanced Display */}
        {lead.special_requirements && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Speciale Wensen & Voorkeuren</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">{lead.special_requirements}</p>
            </div>
          </div>
        )}

        <Separator />

        {/* Status and Notes Management */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Status & Notities</h3>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Bewerken
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Annuleren
                </Button>
                <Button size="sm" onClick={handleSave} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Opslaan...' : 'Opslaan'}
                </Button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nieuw">Nieuw</SelectItem>
                    <SelectItem value="in_behandeling">In Behandeling</SelectItem>
                    <SelectItem value="offerte_verstuurd">Offerte Verstuurd</SelectItem>
                    <SelectItem value="gewonnen">Gewonnen</SelectItem>
                    <SelectItem value="verloren">Verloren</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Notities</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Voeg notities toe..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {lead.notes ? (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Notities</p>
                  <p className="text-muted-foreground whitespace-pre-wrap">{lead.notes}</p>
                </div>
              ) : (
                <p className="text-muted-foreground italic">Geen notities beschikbaar</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between border-t pt-4">
          <Button 
            variant="outline" 
            onClick={() => onDelete(lead)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Verwijderen
          </Button>
          
          {isEditing ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Annuleren
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Opslaan...' : 'Opslaan'}
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Bewerken
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};