import { Mail, Phone, MapPin, Award, Users, Clock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const OverOns = () => {
  const teamValues = [
    {
      icon: Award,
      title: "25+ Jaar Ervaring",
      description: "Kwarteeuw expertise in hoogwaardige kozijnoplossingen"
    },
    {
      icon: Users,
      title: "Lokaal Team",
      description: "Ervaren vakmensen uit de regio voor persoonlijke service"
    },
    {
      icon: Star,
      title: "Premium Kwaliteit",
      description: "Uitsluitend A-merken zoals GEALAN voor optimale prestaties"
    },
    {
      icon: Clock,
      title: "Betrouwbare Service",
      description: "Van advies tot installatie en nazorg - alles uit één hand"
    }
  ];

  const certifications = [
    "VCA Veiligheidscertificering",
    "KOMO Kwaliteitsgarantie",
    "CE Conformiteit",
    "GEALAN Premium Partner"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Over{' '}
              <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                CompleetKozijnen
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Sinds meer dan 25 jaar uw betrouwbare partner voor hoogwaardige kunststof kozijnen. 
              Van advies op maat tot vakkundige installatie - wij zorgen voor kozijnen die een leven lang meegaan.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-title mb-6">Ons Verhaal</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  CompleetKozijnen is ontstaan uit de passie voor vakmanschap en de drive om 
                  huiseigenaren te voorzien van de allerbeste kozijnoplossingen. Wat begon als 
                  een lokaal bedrijf, is uitgegroeid tot een erkende specialist in de regio.
                </p>
                <p>
                  Onze kracht ligt in de combinatie van jarenlange ervaring, gebruik van premium 
                  materialen zoals GEALAN kunststof profielen, en een persoonlijke benadering 
                  waarbij elk project uniek is.
                </p>
                <p>
                  Wij geloven dat kwaliteit begint bij het eerste adviesgesprek en eindigt met 
                  een tevreden klant die jarenlang zorgeloos kan genieten van zijn nieuwe kozijnen.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {teamValues.map((value, index) => (
                <Card key={value.title} className="card-tesla">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-lg inline-flex mb-4">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-tesla-hero">
              <CardContent className="p-8">
                <h3 className="text-title mb-4">Onze Missie</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Elke klant voorzien van kozijnen die perfect aansluiten bij hun wensen, budget en woonstijl. 
                  Door gebruik te maken van de beste materialen en technieken, zorgen wij ervoor dat uw 
                  investering decennia lang zijn waarde behoudt.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-tesla-hero">
              <CardContent className="p-8">
                <h3 className="text-title mb-4">Onze Visie</h3>
                <p className="text-muted-foreground leading-relaxed">
                  De toonaangevende kozijnspecialist worden door continue innovatie, ongeëvenaarde 
                  kwaliteit en service die alle verwachtingen overtreft. Wij streven naar duurzame 
                  relaties met onze klanten gebaseerd op vertrouwen en tevredenheid.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Certificeringen & Kwaliteitsgaranties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Onze certificeringen bewijzen ons commitment aan kwaliteit, veiligheid en vakmanschap
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={cert} className="card-tesla text-center">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-full inline-flex mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold">{cert}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Contact & Bereikbaarheid</h2>
            <p className="text-muted-foreground">
              Heeft u vragen of wilt u vrijblijvend advies? Wij staan voor u klaar.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Telefoon</h3>
                <p className="text-muted-foreground">+31 (0)40 123 4567</p>
                <p className="text-sm text-muted-foreground mt-1">Ma-Vr 8:00-17:00</p>
              </CardContent>
            </Card>
            
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">E-mail</h3>
                <p className="text-muted-foreground">info@compleetkozijnen.nl</p>
                <p className="text-sm text-muted-foreground mt-1">24/7 beschikbaar</p>
              </CardContent>
            </Card>
            
            <Card className="card-tesla text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Locatie</h3>
                <p className="text-muted-foreground">Eindhoven e.o.</p>
                <p className="text-sm text-muted-foreground mt-1">Ook bij u thuis</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OverOns;