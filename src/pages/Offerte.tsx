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
import { Calculator, Clock, Shield, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FormSuccess } from '@/components/ui/form-success';
import { validateEmail, validateDutchPhone, validateDutchPostalCode, validateName } from '@/lib/formValidation';
import { AddressSearch } from '@/components/AddressSearch';

const Offerte = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validations with custom messages
    if (!formData.firstName.trim()) newErrors.firstName = 'Voornaam is verplicht';
    else {
      const nameError = validateName(formData.firstName);
      if (nameError) newErrors.firstName = nameError;
    }

    if (!formData.lastName.trim()) newErrors.lastName = 'Achternaam is verplicht';
    else {
      const nameError = validateName(formData.lastName);
      if (nameError) newErrors.lastName = nameError;
    }

    if (!formData.email.trim()) newErrors.email = 'E-mailadres is verplicht';
    else {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }

    if (!formData.phone.trim()) newErrors.phone = 'Telefoonnummer is verplicht';
    else {
      const phoneError = validateDutchPhone(formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    if (!formData.address.trim()) newErrors.address = 'Adres is verplicht';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postcode is verplicht';
    else {
      const postalError = validateDutchPostalCode(formData.postalCode);
      if (postalError) newErrors.postalCode = postalError;
    }

    if (!formData.city.trim()) newErrors.city = 'Plaats is verplicht';
    if (!formData.terms) newErrors.terms = 'Accepteer de algemene voorwaarden';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Formulier incompleet",
        description: "Controleer de verplichte velden en probeer opnieuw.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Map form data to API format
      const leadData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        budgetRange: mapBudgetToDbFormat(formData.budget),
        timeline: formData.timeline,
        location: `${formData.address}, ${formData.postalCode} ${formData.city}`.trim(),
        description: formData.description,
        projectDetails: `Type woning: ${formData.houseType || 'Niet opgegeven'}\nAantal ramen: ${formData.windowCount || 'Niet opgegeven'}\nAantal deuren: ${formData.doorCount || 'Niet opgegeven'}`,
        preferredContactMethod: 'email',
        specialRequirements: formData.newsletter ? 'Nieuwsbrief gewenst' : ''
      };

      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: leadData
      });

      if (error) throw error;

      toast({
        title: "Offerteverzoek verzonden!",
        description: "We nemen binnen 24 uur contact met je op voor een vrijblijvend gesprek.",
      });

      // Show success state
      setSubmitted(true);

      // Reset form
      setFormData({
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
      setErrors({});

    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Fout bij verzenden",
        description: "Er is een fout opgetreden. Probeer het opnieuw of neem contact met ons op.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const mapBudgetToDbFormat = (budget: string) => {
    switch (budget) {
      case '0-10000': return '5000-10000';
      case '10000-25000': return '10000-25000';
      case '25000-50000': return '25000-50000';
      case '50000-plus': return '50000+';
      default: return 'onbekend';
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
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

      {/* Show success message or form */}
      {submitted ? (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <FormSuccess
              title="Offerteverzoek Verzonden!"
              description="Bedankt voor uw interesse. We hebben uw aanvraag ontvangen en nemen binnen 24 uur contact met u op voor een vrijblijvend gesprek over uw project."
              nextActions={[
                { label: 'Bekijk Onze Producten', href: '/producten' },
                { label: 'Contact Opnemen', href: '/contact', variant: 'outline' }
              ]}
            />
          </div>
        </section>
      ) : (
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
                      className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Achternaam *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">E-mailadres *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefoonnummer *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="06-12345678 of +31612345678"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-title mb-4">Projectadres</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <AddressSearch
                      onAddressSelect={(address) => {
                        setFormData(prev => ({
                          ...prev,
                          address: address.address,
                          postalCode: address.postalCode,
                          city: address.city
                        }));
                        // Clear any existing errors for these fields
                        setErrors(prev => ({
                          ...prev,
                          address: '',
                          postalCode: '',
                          city: ''
                        }));
                      }}
                      errors={errors}
                    />
                    
                    {/* Display the auto-filled fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="postalCode">Postcode *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          required
                          className={`mt-1 ${errors.postalCode ? 'border-red-500' : ''}`}
                          placeholder="1234 AB"
                          readOnly
                        />
                        {errors.postalCode && (
                          <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="city">Plaats *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                          className={`mt-1 ${errors.city ? 'border-red-500' : ''}`}
                          readOnly
                        />
                        {errors.city && (
                          <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Volledig adres *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                        className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
                        placeholder="Straatnaam en huisnummer"
                        readOnly
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                      )}
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
                        className={errors.terms ? 'border-red-500' : ''}
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
                    {errors.terms && (
                      <p className="text-sm text-red-500">{errors.terms}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <Button type="submit" size="lg" className="btn-hero px-12 py-4" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Versturen...
                      </>
                    ) : (
                      'Verzend Offerteverzoek'
                    )}
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
      )}

      <Footer />
    </div>
  );
};

export default Offerte;