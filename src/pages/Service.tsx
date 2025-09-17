import { CheckCircle, Clock, Shield, Wrench, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { Link } from 'react-router-dom';

const Service = () => {
  const services = [
    {
      icon: CheckCircle,
      title: "Gratis Advies & Opmeting",
      description: "Uitgebreide analyse van uw woning en persoonlijk advies over de beste kozijnoplossingen.",
      features: ["Vakkundige opmeting", "Technisch advies", "Stylingadvies", "Energiebesparingsadvies"]
    },
    {
      icon: Wrench,
      title: "Professionele Installatie",
      description: "Montage door ervaren specialisten met respect voor uw woning en leefcomfort.",
      features: ["Erkende monteurs", "Minimale overlast", "Opruimservice", "Kwaliteitscontrole"]
    },
    {
      icon: Shield,
      title: "10 Jaar Garantie",
      description: "Uitgebreide garantie op alle materialen en montage voor volledige gemoedsrust.",
      features: ["Materiaalgarantie", "Montagegarantie", "Snelle service", "Preventief onderhoud"]
    },
    {
      icon: Clock,
      title: "Onderhoud & Nazorg",
      description: "Jarenlange nazorg voor optimale prestaties en maximale levensduur van uw kozijnen.",
      features: ["Jaarlijkse controle", "Smeerbeurten", "Afstellingen", "Advies over onderhoud"]
    }
  ];

  const serviceProcess = [
    {
      step: "01",
      title: "Contact & Afspraak",
      description: "Neem contact op voor een vrijblijvende afspraak bij u thuis."
    },
    {
      step: "02",
      title: "Opmeting & Advies",
      description: "Vakkundige opmeting en persoonlijk advies over de beste oplossing."
    },
    {
      step: "03",
      title: "Offerte & Planning",
      description: "Gedetailleerde offerte en planning van de werkzaamheden."
    },
    {
      step: "04",
      title: "Productie & Levering",
      description: "Maatwerk productie en levering binnen de afgesproken termijn."
    },
    {
      step: "05",
      title: "Montage & Oplevering",
      description: "Professionele montage en uitgebreide oplevering van het project."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ResponsiveBreadcrumb />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Complete{' '}
              <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Service
              </span>{' '}
              van A tot Z
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Van eerste advies tot jarenlange nazorg - wij begeleiden u door het gehele proces 
              van nieuwe kozijnen met vakmanschap en betrouwbaarheid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button className="btn-hero">
                  Gratis Adviesgesprek
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="btn-secondary">
                  Direct Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Onze Dienstverlening</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Alles wat u nodig heeft voor perfect passende kozijnen, verzorgd door één betrouwbare partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={service.title} className="card-tesla-hero group">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-[var(--transition-spring)]">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-title mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Hoe Verloopt Het Proces?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Een duidelijk stappenplan zorgt ervoor dat u precies weet wat u kunt verwachten.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {serviceProcess.map((process, index) => (
                <div key={process.step} className="relative">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-primary to-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {process.step}
                    </div>
                    <h3 className="font-semibold mb-2">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">{process.description}</p>
                  </div>
                  {index < serviceProcess.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Servicegerbied</h2>
            <p className="text-muted-foreground">
              Wij zijn actief in heel Zuidoost-Brabant en omstreken
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Eindhoven Regio</h3>
                <p className="text-sm text-muted-foreground">
                  Eindhoven, Veldhoven, Geldrop, Nuenen, Waalre
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">24/7 Bereikbaar</h3>
                <p className="text-sm text-muted-foreground">
                  Voor spoedeisende zaken en service
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Snelle Response</h3>
                <p className="text-sm text-muted-foreground">
                  Binnen 24 uur reactie op uw aanvraag
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Service;