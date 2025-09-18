import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, AlertTriangle } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
}

interface DeleteContactDialogProps {
  contact: ContactSubmission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: (contactId: string, password: string) => Promise<void>;
  isDeleting: boolean;
}

export const DeleteContactDialog: React.FC<DeleteContactDialogProps> = ({
  contact,
  open,
  onOpenChange,
  onConfirmDelete,
  isDeleting
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact || !password.trim()) {
      setError('Wachtwoord is verplicht');
      return;
    }

    try {
      setError('');
      await onConfirmDelete(contact.id, password);
      setPassword('');
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden bij het verwijderen');
    }
  };

  const handleCancel = () => {
    setPassword('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            <span>Contactbericht Verwijderen</span>
          </DialogTitle>
          <DialogDescription>
            Deze actie kan niet ongedaan worden gemaakt. Het contactbericht wordt permanent verwijderd.
          </DialogDescription>
        </DialogHeader>

        {contact && (
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Let op:</strong> Je gaat het contactbericht van "{contact.name}" ({contact.email}) permanent verwijderen.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delete-password">
                  Verwijder Wachtwoord <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="delete-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Voer het verwijder wachtwoord in"
                  className="w-full"
                  disabled={isDeleting}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <DialogFooter className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isDeleting}
                >
                  Annuleren
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={!password.trim() || isDeleting}
                  className="flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{isDeleting ? 'Verwijderen...' : 'Definitief Verwijderen'}</span>
                </Button>
              </DialogFooter>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};