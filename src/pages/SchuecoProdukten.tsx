import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Home, Maximize2, Building } from 'lucide-react';
import heroImage from '@/assets/schueco-main-hero.jpg';

const SchuecoProdukten = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center min-h-[70vh]">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-display-large mb-6 font-bold">
              SCHÜCO
              <span className="block text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                Aluminium Kozijnsystemen
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Premium Duitse technologie voor moderne woningen. Van innovatieve raamsystemen tot 
              luxe schuifdeuren - wij regelen alles van A tot Z voor uw droomkozijnen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button className="btn-hero min-w-[200px]">
                  Gratis Offerte Aanvragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="min-w-[200px] border-white text-white hover:bg-white hover:text-black">
                  Meer Informatie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-4">Onze SCHÜCO Productcategorieën</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ontdek de volledige range van premium aluminium kozijnsystemen. 
              Van energie-efficiënte ramen tot luxe schuifdeuren.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Raamsystemen */}
            <Card className="card-tesla-hero group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-primary to-primary-variant p-6 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Raamsystemen</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  AWS serie aluminium raamsystemen met superieure isolatie en moderne esthetiek. 
                  Perfect voor nieuwbouw en renovatie.
                </p>
                <ul className="text-sm space-y-2 mb-6 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>AWS 75.SI+ Premium systeem</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Uitstekende isolatiewaarden</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Moderne designopties</span>
                  </li>
                </ul>
                <Link to="/producten/schueco/ramen">
                  <Button className="w-full">
                    Bekijk Raamsystemen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Deursystemen */}
            <Card className="card-tesla-hero group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-accent to-accent-variant p-6 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Deursystemen</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  ADS serie aluminium deursystemen die veiligheid en design perfect combineren. 
                  Van klassiek tot ultra-modern.
                </p>
                <ul className="text-sm space-y-2 mb-6 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span>ADS 90.SI Entrance doors</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span>RC2-RC3 veiligheidscertificering</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span>Brede designkeuzes</span>
                  </li>
                </ul>
                <Link to="/producten/schueco/deuren">
                  <Button className="w-full" variant="outline">
                    Bekijk Deursystemen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Schuifdeuren */}
            <Card className="card-tesla-hero group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-secondary to-secondary-variant p-6 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Maximize2 className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Schuifdeuren & Vouwwanden</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  ASE/ASS serie voor maximale glasoppervlakken en naadloze binnen-buiten overgang. 
                  Innovatief en functioneel.
                </p>
                <ul className="text-sm space-y-2 mb-6 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                    <span>ASE 80.HI Hef-schuifsysteem</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                    <span>Grote glasoppervlakken</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                    <span>Soepele bediening</span>
                  </li>
                </ul>
                <Link to="/producten/schueco/schuifdeuren">
                  <Button className="w-full" variant="secondary">
                    Bekijk Schuifdeuren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Schüco */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display mb-6">Waarom Kiezen voor SCHÜCO?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              SCHÜCO staat voor Duitse precisie en innovatie in aluminium kozijnsystemen. 
              Gecombineerd met onze volledige service van A tot Z.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Duitse Kwaliteit</h3>
                <p className="text-sm text-muted-foreground">Premium materialen en precisie engineering</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-accent to-secondary p-4 rounded-xl inline-flex mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Energie-efficiënt</h3>
                <p className="text-sm text-muted-foreground">Uitstekende isolatiewaarden en duurzaamheid</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-secondary to-primary p-4 rounded-xl inline-flex mb-4">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Design Flexibiliteit</h3>
                <p className="text-sm text-muted-foreground">Van klassiek tot ultra-moderne uitstraling</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary-variant to-accent-variant p-4 rounded-xl inline-flex mb-4">
                  <Maximize2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Complete Service</h3>
                <p className="text-sm text-muted-foreground">Van advies tot installatie - wij regelen alles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchuecoProdukten;