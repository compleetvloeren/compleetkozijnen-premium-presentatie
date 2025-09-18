import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Settings, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    functional: false,
    analytical: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(cookieConsent);
        setPreferences(prev => ({ ...prev, ...savedPrefs }));
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
    
    // Here you would typically trigger your analytics/marketing scripts
    if (prefs.analytical) {
      // Initialize Google Analytics
      console.log('Analytics cookies accepted');
    }
    if (prefs.marketing) {
      // Initialize marketing tools
      console.log('Marketing cookies accepted');
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytical: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytical: false,
      marketing: false,
    };
    savePreferences(necessaryOnly);
  };

  const updatePreference = (type: keyof typeof preferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4">
        <Card className="mx-auto max-w-4xl border-border bg-background/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Deze website gebruikt cookies
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Wij gebruiken cookies om de functionaliteit van onze website te waarborgen, 
                    uw gebruikservaring te verbeteren en onze prestaties te analyseren. 
                    Door op "Alles accepteren" te klikken, stemt u in met het gebruik van alle cookies. 
                    U kunt ook uw voorkeuren aanpassen.
                  </p>
                  <p className="text-muted-foreground text-xs mt-2">
                    Meer informatie vindt u in ons{' '}
                    <Link to="/cookies" className="text-primary hover:underline">
                      cookiebeleid
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={acceptAll}
                    className="flex-1 sm:flex-none"
                  >
                    Alles accepteren
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={acceptNecessaryOnly}
                    className="flex-1 sm:flex-none"
                  >
                    Alleen noodzakelijke
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowSettings(true)}
                    className="flex-1 sm:flex-none"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Instellingen
                  </Button>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cookie-instellingen
            </DialogTitle>
            <DialogDescription>
              Beheer uw cookie-voorkeuren. U kunt kiezen welke cookies u wilt accepteren.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Noodzakelijke cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Deze cookies zijn essentieel voor de werking van de website en kunnen niet worden uitgeschakeld.
                  </p>
                </div>
                <Switch 
                  checked={preferences.necessary} 
                  disabled={true}
                  className="opacity-50"
                />
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Functionele cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Verbeteren de functionaliteit en personalisatie van de website.
                  </p>
                </div>
                <Switch 
                  checked={preferences.functional}
                  onCheckedChange={(checked) => updatePreference('functional', checked)}
                />
              </div>
            </div>

            {/* Analytical Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Analytische cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Helpen ons te begrijpen hoe bezoekers de website gebruiken via geanonimiseerde statistieken.
                  </p>
                </div>
                <Switch 
                  checked={preferences.analytical}
                  onCheckedChange={(checked) => updatePreference('analytical', checked)}
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Marketing cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Worden gebruikt om relevante advertenties te tonen en marketingprestaties te meten.
                  </p>
                </div>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => updatePreference('marketing', checked)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={() => savePreferences(preferences)}
              className="flex-1"
            >
              Voorkeuren opslaan
            </Button>
            <Button 
              variant="outline" 
              onClick={acceptAll}
              className="flex-1"
            >
              Alles accepteren
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowSettings(false)}
              className="flex-1"
            >
              Annuleren
            </Button>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t">
            Voor meer informatie, zie ons{' '}
            <Link to="/cookies" className="text-primary hover:underline">
              cookiebeleid
            </Link>{' '}
            en{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              privacybeleid
            </Link>
            .
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;