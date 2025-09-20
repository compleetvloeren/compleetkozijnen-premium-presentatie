import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FormSuccess } from '@/components/ui/form-success';
import { validateEmail, validateDutchPhone, validateName } from '@/lib/formValidation';

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefoon",
      primary: "085-250 2359",
      secondary: "Ma-Vr 8:00-17:00",
      action: "Bel Direct",
      link: "tel:0852502359"
    },
    {
      icon: Mail,
      title: "E-mail",
      primary: "info@compleetkozijnen.nl",
      secondary: "Binnen 24u reactie",
      action: "Mail Sturen",
      link: "mailto:info@compleetkozijnen.nl"
    }
  ];

  const officeHours = [
    { day: "Maandag - Vrijdag", hours: "8:00 - 17:00" },
    { day: "Zaterdag", hours: "9:00 - 15:00" },
    { day: "Zondag", hours: "Gesloten" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validations with improved validation
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

    if (!formData.subject.trim()) newErrors.subject = 'Onderwerp is verplicht';
    if (!formData.message.trim()) newErrors.message = 'Bericht is verplicht';

    // Phone validation (optional field)
    if (formData.phone && formData.phone.trim()) {
      const phoneError = validateDutchPhone(formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

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
      const contactData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone.trim() || null,
        subject: formData.subject,
        message: formData.message
      };

      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: contactData
      });

      if (error) throw error;

      toast({
        title: "Bericht verzonden!",
        description: "We nemen zo snel mogelijk contact met je op.",
      });

      // Show success state
      setSubmitted(true);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Fout bij verzenden",
        description: "Er is een fout opgetreden. Probeer het opnieuw of bel ons direct.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ResponsiveBreadcrumb />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.1)_75%)] bg-[length:20px_20px] opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-large mb-6">
              Neem
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Contact Op
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Heeft u vragen over onze kozijnen of wilt u een vrijblijvende offerte? 
              Wij helpen u graag verder met vakkundig advies en persoonlijke service.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Reactie binnen 24u</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>Direct bereikbaar</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Heel Nederland</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Show success message or contact sections */}
      {submitted ? (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <FormSuccess
              title="Bericht Verzonden!"
              description="Bedankt voor uw bericht. We hebben het ontvangen en nemen zo snel mogelijk contact met u op, meestal binnen 24 uur."
              nextActions={[
                { label: 'Gratis Offerte Aanvragen', href: '/offerte' },
                { label: 'Bekijk Producten', href: '/producten', variant: 'outline' }
              ]}
            />
          </div>
        </section>
      ) : (
      <>
      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-6">
              Verschillende Manieren
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Om Contact Op Te Nemen
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kies de manier die het beste bij u past. Wij staan altijd klaar om u te helpen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {contactMethods.map((method, index) => (
              <Card key={method.title} className="card-tesla-hero group overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-title mb-2">{method.title}</h3>
                    <p className="font-semibold text-lg mb-1">{method.primary}</p>
                    <p className="text-sm text-muted-foreground mb-6">{method.secondary}</p>
                    <a href={method.link} className="block">
                      <Button className="w-full">
                        {method.action}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <Card className="card-tesla-hero">
              <CardContent className="p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-display mb-4">Stuur ons een bericht</h2>
                  <p className="text-muted-foreground">Vul het formulier in en wij nemen zo snel mogelijk contact met u op.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Voornaam *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Uw voornaam" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required 
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Achternaam *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Uw achternaam" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required 
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mailadres *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="uw.email@voorbeeld.nl" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required 
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefoonnummer</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="06-12345678 (optioneel)" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Onderwerp *</Label>
                    <Input 
                      id="subject" 
                      placeholder="Waar kunnen we u mee helpen?" 
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required 
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Bericht *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Beschrijf uw vraag of wens zo uitgebreid mogelijk..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required 
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Versturen...
                        </>
                      ) : (
                        'Verstuur Bericht'
                      )}
                    </Button>
                    <Link to="/offerte" className="flex-1">
                      <Button type="button" variant="outline" className="w-full">
                        Direct Offerte
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="card-tesla-hero">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl mr-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-title">Openingstijden</h3>
                      <p className="text-sm text-muted-foreground">Wij zijn er voor u</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                        <span className="text-muted-foreground font-medium">{schedule.day}</span>
                        <span className="font-semibold">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="card-tesla-hero">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-title">Locatie & Service</h3>
                      <p className="text-sm text-muted-foreground">Waar wij u kunnen helpen</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold mb-2 text-primary">Hoofdkantoor</h4>
                      <p className="text-muted-foreground">
                        Industrieweg 16<br />
                        8304 AD Emmeloord<br />
                        Nederland
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold mb-2 text-primary">Servicegebied</h4>
                      <p className="text-muted-foreground">
                        Heel Nederland<br />
                        Ook bij u thuis voor advies en opmeting
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="card-tesla-hero">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl mr-4">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-title">Snelle Acties</h3>
                      <p className="text-sm text-muted-foreground">Direct aan de slag</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Link to="/offerte">
                      <Button className="w-full">
                        Gratis Offerte Aanvragen
                      </Button>
                    </Link>
                    <a href="tel:0852502359">
                      <Button variant="outline" className="w-full">
                        Direct Bellen
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-6">
              Veelgestelde
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Vragen
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Snelle antwoorden op de meest gestelde vragen over onze kozijnen en service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-tesla-hero text-center group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Wat kost een nieuwe kozijn?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Prijzen vanaf €450 per m² inclusief montage en garantie
                </p>
                <Link to="/offerte">
                  <Button variant="outline" className="w-full">Offerte Aanvragen</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-tesla-hero text-center group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Hoe lang duurt de levering?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Standaard 6-8 weken na akkoord offerte inclusief montage
                </p>
                <Link to="/service">
                  <Button variant="outline" className="w-full">Meer Info</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-tesla-hero text-center group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Welke garantie krijg ik?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  10 jaar volledige garantie op materiaal en montage
                </p>
                <Link to="/service">
                  <Button variant="outline" className="w-full">Garantie Info</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </>
      )}

      <Footer />
    </div>
  );
};

export default Contact;