import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  Calendar, 
  User,
  FileText
} from 'lucide-react';

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

interface ContactDetailDialogProps {
  contact: ContactSubmission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDetailDialog: React.FC<ContactDetailDialogProps> = ({
  contact,
  open,
  onOpenChange
}) => {
  if (!contact) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongelezen': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'gelezen': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'beantwoord': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{contact.name}</DialogTitle>
              <DialogDescription>
                Contactbericht details
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(contact.status)}>
              {contact.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contactgegevens</h3>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">Naam</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{contact.email}</p>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                </div>
              </div>

              {contact.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contact.phone}</p>
                    <p className="text-sm text-muted-foreground">Telefoon</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {new Date(contact.created_at).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">Ontvangen</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Subject */}
          {contact.subject && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Onderwerp</span>
              </h3>
              <p className="text-base font-medium">{contact.subject}</p>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Bericht</h3>
            <div className="bg-muted/20 p-4 rounded-lg border">
              <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};