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
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.1)_75%)] bg-[length:20px_20px] opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-large mb-6">
              Complete
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Service van A tot Z
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Van eerste advies tot jarenlange nazorg - wij begeleiden u door het gehele proces 
              van nieuwe kozijnen met vakmanschap, betrouwbaarheid en persoonlijke aandacht.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>10 Jaar Garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Erkende Monteurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Snelle Service</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button size="lg" className="min-w-[200px]">
                  Gratis Adviesgesprek
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Direct Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-6">
              Onze
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Dienstverlening
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Alles wat u nodig heeft voor perfect passende kozijnen, verzorgd door één betrouwbare partner 
              met jarenlange ervaring en vakkennis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={service.title} className="card-tesla-hero group overflow-hidden">
                <CardContent className="p-8 lg:p-10 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-title mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-6">
              Hoe Verloopt
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Het Proces?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Een duidelijk stappenplan zorgt ervoor dat u precies weet wat u kunt verwachten. 
              Transparantie en communicatie staan bij ons voorop.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {serviceProcess.map((process, index) => (
                <div key={process.step} className="relative">
                  <Card className="card-tesla-hero text-center h-full">
                    <CardContent className="p-6">
                      <div className="bg-gradient-to-br from-primary to-accent text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-lg">
                        {process.step}
                      </div>
                      <h3 className="font-semibold mb-3 text-lg">{process.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{process.description}</p>
                    </CardContent>
                  </Card>
                  {index < serviceProcess.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-accent z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-6">
              Ons
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Servicegebied
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Wij zijn actief in heel Nederland en leveren kwaliteit waar u ook woont
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-tesla-hero text-center group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Heel Nederland</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Van Noord tot Zuid, wij komen graag bij u langs voor een persoonlijk adviesgesprek en opmeting
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-tesla-hero text-center group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Altijd Bereikbaar</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Voor spoedeisende zaken, service en al uw vragen staan wij altijd voor u klaar
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-tesla-hero text-center group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-3 text-lg">Snelle Response</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Binnen 24 uur reactie op uw aanvraag en directe planning van een afspraak
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