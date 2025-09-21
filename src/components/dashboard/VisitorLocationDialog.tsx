import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Clock, Wifi } from 'lucide-react';

interface VisitorSession {
  ip_address: string;
  country_name: string;
  region: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  organization: string;
  first_visit_at: string;
  last_activity_at: string;
  page_views: number;
  session_duration: number;
  device_type: string;
  browser: string;
  os: string;
}

interface VisitorLocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  visitorSession: VisitorSession | null;
}

export const VisitorLocationDialog: React.FC<VisitorLocationDialogProps> = ({
  isOpen,
  onClose,
  visitorSession
}) => {
  if (!visitorSession) return null;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Bezoeker Locatie Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                IP Adres
              </h3>
              <Badge variant="outline" className="font-mono">
                {visitorSession.ip_address}
              </Badge>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Provider
              </h3>
              <p className="text-sm text-muted-foreground">
                {visitorSession.isp || visitorSession.organization || 'Onbekend'}
              </p>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="font-semibold mb-3">Exacte Locatie</h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Land:</span>
                  <span className="ml-2">{visitorSession.country_name}</span>
                </div>
                <div>
                  <span className="font-medium">Provincie:</span>
                  <span className="ml-2">{visitorSession.region}</span>
                </div>
                <div>
                  <span className="font-medium">Stad:</span>
                  <span className="ml-2">{visitorSession.city}</span>
                </div>
                <div>
                  <span className="font-medium">Postcode:</span>
                  <span className="ml-2">{visitorSession.postal_code || 'Onbekend'}</span>
                </div>
              </div>
              
              {visitorSession.latitude && visitorSession.longitude && (
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="font-medium text-sm">Coördinaten:</span>
                  <span className="ml-2 text-sm font-mono">
                    {visitorSession.latitude.toFixed(4)}, {visitorSession.longitude.toFixed(4)}
                  </span>
                  <a
                    href={`https://www.google.com/maps?q=${visitorSession.latitude},${visitorSession.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-primary hover:underline text-sm"
                  >
                    Bekijk op Google Maps →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Session Info */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Sessie Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Eerste bezoek:</span>
                <div className="text-muted-foreground">{formatDate(visitorSession.first_visit_at)}</div>
              </div>
              <div>
                <span className="font-medium">Laatste activiteit:</span>
                <div className="text-muted-foreground">{formatDate(visitorSession.last_activity_at)}</div>
              </div>
              <div>
                <span className="font-medium">Pagina weergaven:</span>
                <div className="text-muted-foreground">{visitorSession.page_views}</div>
              </div>
              <div>
                <span className="font-medium">Sessie duur:</span>
                <div className="text-muted-foreground">{formatDuration(visitorSession.session_duration)}</div>
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div>
            <h3 className="font-semibold mb-3">Apparaat Informatie</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span>
                <div className="text-muted-foreground">{visitorSession.device_type}</div>
              </div>
              <div>
                <span className="font-medium">Browser:</span>
                <div className="text-muted-foreground">{visitorSession.browser}</div>
              </div>
              <div>
                <span className="font-medium">Besturingssysteem:</span>
                <div className="text-muted-foreground">{visitorSession.os}</div>
              </div>
            </div>
          </div>

          {visitorSession.timezone && (
            <div>
              <span className="font-medium text-sm">Tijdzone:</span>
              <span className="ml-2 text-sm text-muted-foreground">{visitorSession.timezone}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};