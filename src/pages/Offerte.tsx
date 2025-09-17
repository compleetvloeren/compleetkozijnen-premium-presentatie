import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Calculator, Clock, Shield, Users } from 'lucide-react';

const Offerte = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    houseType: '',
    projectType: '',
    windowCount: '',
    doorCount: '',
    timeline: '',
    budget: '',
    description: '',
    newsletter: false,
    terms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms) {
      toast({
        title: "Algemene voorwaarden",
        description: "Accepteer de algemene voorwaarden om door te gaan.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Offerteverzoek verzonden!",
      description: "We nemen binnen 24 uur contact met je op.",
    });

    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const advantages = [
    {
      icon: Calculator,
      title: 'Gratis & Vrijblijvend',
      description: 'Geen kosten, geen verplichtingen'
    },
    {
      icon: Clock,
      title: '24 Uur Respons',
      description: 'Snelle reactie gegarandeerd'
    },
    {
      icon: Shield,
      title: 'Transparante Prijzen',
      description: 'Geen verborgen kosten'
    },
    {
      icon: Users,
      title: 'Persoonlijk Advies',
      description: 'Maatwerk oplossingen'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <ResponsiveBreadcrumb />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-large mb-6">
              Gratis Offerte
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Aanvragen
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Ontvang binnen 24 uur een vrijblijvende offerte voor uw kozijnproject. 
              Inclusief persoonlijk advies en maatwerk oplossingen.
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {advantages.map((advantage, index) => (
              <div key={advantage.title} className="text-center">
                <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-full inline-flex mb-3">
                  <advantage.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{advantage.title}</h3>
                <p className="text-xs text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="card-tesla-hero">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-headline">Vertel ons over uw project</CardTitle>
              <p className="text-muted-foreground">
                Hoe meer informatie u deelt, hoe nauwkeuriger onze offerte wordt.
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-title mb-4">Contactgegevens</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Voornaam *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Achternaam *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mailadres *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefoonnummer *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-title mb-4">Projectadres</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Adres *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postcode *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Label htmlFor="city">Plaats *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h3 className="text-title mb-4">Projectdetails</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="houseType">Type woning</Label>
                      <Select onValueChange={(value) => handleInputChange('houseType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecteer type woning" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eengezinswoning">Eengezinswoning</SelectItem>
                          <SelectItem value="appartement">Appartement</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="bungalow">Bungalow</SelectItem>
                          <SelectItem value="anders">Anders</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="projectType">Type project</Label>
                      <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecteer project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nieuwbouw">Nieuwbouw</SelectItem>
                          <SelectItem value="renovatie">Renovatie</SelectItem>
                          <SelectItem value="vervanging">Vervanging bestaande kozijnen</SelectItem>
                          <SelectItem value="uitbreiding">Uitbreiding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="windowCount">Aantal ramen</Label>
                      <Input
                        id="windowCount"
                        type="number"
                        min="0"
                        value={formData.windowCount}
                        onChange={(e) => handleInputChange('windowCount', e.target.value)}
                        className="mt-1"
                        placeholder="Bijvoorbeeld: 12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="doorCount">Aantal deuren</Label>
                      <Input
                        id="doorCount"
                        type="number"
                        min="0"
                        value={formData.doorCount}
                        onChange={(e) => handleInputChange('doorCount', e.target.value)}
                        className="mt-1"
                        placeholder="Bijvoorbeeld: 3"
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeline">Gewenste planning</Label>
                      <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Wanneer wilt u starten?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zo-snel-mogelijk">Zo snel mogelijk</SelectItem>
                          <SelectItem value="1-3-maanden">Over 1-3 maanden</SelectItem>
                          <SelectItem value="3-6-maanden">Over 3-6 maanden</SelectItem>
                          <SelectItem value="6-12-maanden">Over 6-12 maanden</SelectItem>
                          <SelectItem value="nog-onbekend">Nog onbekend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budget">Indicatief budget</Label>
                      <Select onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecteer budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-10000">€ 0 - € 10.000</SelectItem>
                          <SelectItem value="10000-25000">€ 10.000 - € 25.000</SelectItem>
                          <SelectItem value="25000-50000">€ 25.000 - € 50.000</SelectItem>
                          <SelectItem value="50000-plus">€ 50.000+</SelectItem>
                          <SelectItem value="nog-onbekend">Nog onbekend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <Label htmlFor="description">Aanvullende informatie</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="mt-1 min-h-24"
                    placeholder="Vertel ons meer over uw wensen, speciale eisen, of stel uw vragen..."
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange('newsletter', !!checked)}
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      Ja, ik wil graag op de hoogte blijven van nieuws en aanbiedingen van CompleetKozijnen.
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => handleInputChange('terms', !!checked)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Ik ga akkoord met de{' '}
                      <a href="/algemene-voorwaarden" className="text-primary hover:underline">
                        algemene voorwaarden
                      </a>{' '}
                      en het{' '}
                      <a href="/privacy" className="text-primary hover:underline">
                        privacybeleid
                      </a>
                      . *
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <Button type="submit" size="lg" className="btn-hero px-12 py-4">
                    Verzend Offerteverzoek
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    We nemen binnen 24 uur contact met je op voor een vrijblijvend gesprek.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offerte;