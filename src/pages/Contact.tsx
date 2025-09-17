import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefoon",
      primary: "+31 (0)40 123 4567",
      secondary: "Ma-Vr 8:00-17:00",
      action: "Bel Direct",
      link: "tel:+31401234567"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      primary: "Direct chatten",
      secondary: "Snelle reactie gegarandeerd",
      action: "Start Chat",
      link: "https://wa.me/31401234567"
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Neem{' '}
              <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Contact
              </span>{' '}
              Op
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Heeft u vragen over onze kozijnen of wilt u een vrijblijvende offerte? 
              Wij helpen u graag verder met vakkundig advies.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={method.title} className="card-tesla-hero group">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-[var(--transition-spring)]">
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-title mb-2">{method.title}</h3>
                  <p className="font-semibold mb-1">{method.primary}</p>
                  <p className="text-sm text-muted-foreground mb-6">{method.secondary}</p>
                  <a href={method.link} className="block">
                    <Button className="btn-hero w-full">
                      {method.action}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="card-tesla-hero">
              <CardContent className="p-8">
                <h2 className="text-title mb-6">Stuur ons een bericht</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Voornaam *</Label>
                      <Input id="firstName" placeholder="Uw voornaam" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Achternaam *</Label>
                      <Input id="lastName" placeholder="Uw achternaam" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-mailadres *</Label>
                    <Input id="email" type="email" placeholder="uw.email@voorbeeld.nl" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefoonnummer</Label>
                    <Input id="phone" type="tel" placeholder="06-12345678" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Onderwerp *</Label>
                    <Input id="subject" placeholder="Waar kunnen we u mee helpen?" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Bericht *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Beschrijf uw vraag of wens zo uitgebreid mogelijk..."
                      rows={5}
                      required 
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" className="btn-hero flex-1">
                      Verstuur Bericht
                    </Button>
                    <Link to="/offerte" className="flex-1">
                      <Button type="button" className="btn-secondary w-full">
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
              <Card className="card-tesla">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Clock className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-title">Openingstijden</h3>
                  </div>
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{schedule.day}</span>
                        <span className="font-semibold">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="card-tesla">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <MapPin className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-title">Locatie & Service</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Hoofdkantoor</h4>
                      <p className="text-muted-foreground">
                        Eindhoven, Noord-Brabant<br />
                        Nederland
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Servicegebied</h4>
                      <p className="text-muted-foreground">
                        Heel Zuidoost-Brabant en omstreken<br />
                        Ook bij u thuis voor advies en opmeting
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="card-tesla">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Calendar className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-title">Snelle Acties</h3>
                  </div>
                  <div className="space-y-4">
                    <Link to="/offerte">
                      <Button className="btn-hero w-full">
                        Gratis Offerte Aanvragen
                      </Button>
                    </Link>
                    <a href="tel:+31401234567">
                      <Button className="btn-secondary w-full">
                        Direct Bellen
                      </Button>
                    </a>
                    <a href="https://wa.me/31401234567" target="_blank" rel="noopener noreferrer">
                      <Button className="btn-secondary w-full">
                        WhatsApp Chat
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
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Veelgestelde Vragen</h2>
            <p className="text-muted-foreground">
              Snelle antwoorden op de meest gestelde vragen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Wat kost een nieuwe kozijn?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Prijzen vanaf €450 per m² inclusief montage
                </p>
                <Link to="/offerte">
                  <Button className="btn-secondary text-sm">Offerte Aanvragen</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Hoe lang duurt de levering?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Standaard 6-8 weken na akkoord offerte
                </p>
                <Link to="/service">
                  <Button className="btn-secondary text-sm">Meer Info</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Welke garantie krijg ik?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  10 jaar volledige garantie op materiaal en montage
                </p>
                <Link to="/service">
                  <Button className="btn-secondary text-sm">Garantie Info</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;