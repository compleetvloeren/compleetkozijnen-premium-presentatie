import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Home, Maximize2, Building, Eye } from 'lucide-react';
import heroImage from '@/assets/schueco-hero-new.jpg';
import windowsImage from '@/assets/schueco-windows-modern.jpg';
import doorsImage from '@/assets/schueco-doors-modern.jpg';
import slidingImage from '@/assets/schueco-sliding-premium.jpg';

const SchuecoProdukten = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <ResponsiveBreadcrumb />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={heroImage}
        >
          <source src="https://www.schueco.com/resource/blob/352482/7e31236a24d1fba017bb903d4f767cd5/morethanaview-stage-video-data.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center min-h-[70vh]">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-display-large mb-6 font-bold">
              SCHÜCO
              <span className="block text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                Aluminium Kozijnsystemen
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Exclusief aluminium specialist met premium Duitse technologie. Van innovatieve raamsystemen tot 
              luxe schuifdeuren - SCHÜCO biedt alleen de beste aluminium kozijnsystemen ter wereld.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button className="btn-hero min-w-[200px]">
                  Gratis Offerte Aanvragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="min-w-[200px] border-white/80 text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300">
                  Meer Informatie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-4">Onze SCHÜCO Productcategorieën</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ontdek de volledige range van premium aluminium kozijnsystemen van wereldklasse. 
              SCHÜCO is de exclusieve aluminium specialist - geen kunststof, alleen het beste aluminium.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Raamsystemen */}
            <div className="group relative overflow-hidden rounded-2xl h-[500px] cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${windowsImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-3xl font-bold text-white mb-2">Raamsystemen</h3>
                <p className="text-white/80 text-sm">AWS Serie Premium</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="text-xl font-semibold mb-4">Premium Features</h4>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>AWS 75.SI+ Premium systeem</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>Uitstekende isolatiewaarden</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>Moderne designopties</span>
                      </li>
                    </ul>
                    <Link to="/producten/schueco/ramen">
                      <Button className="w-full bg-white text-black hover:bg-white/90">
                        Bekijk Raamsystemen
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* View Icon */}
              <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Deursystemen */}
            <div className="group relative overflow-hidden rounded-2xl h-[500px] cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${doorsImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-3xl font-bold text-white mb-2">Deursystemen</h3>
                <p className="text-white/80 text-sm">ADS Serie Entrance</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="text-xl font-semibold mb-4">Security & Design</h4>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>ADS 90.SI Entrance doors</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>RC2-RC3 veiligheidscertificering</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>Brede designkeuzes</span>
                      </li>
                    </ul>
                    <Link to="/producten/schueco/deuren">
                      <Button className="w-full bg-white text-black hover:bg-white/90">
                        Bekijk Deursystemen
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* View Icon */}
              <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Schuifdeuren */}
            <div className="group relative overflow-hidden rounded-2xl h-[500px] cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${slidingImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-3xl font-bold text-white mb-2">Schuifdeuren en Vouwwanden</h3>
                <p className="text-white/80 text-sm">ASE/ASS & AWS Folding Systems</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="text-xl font-semibold mb-4">Flexibele Oplossingen</h4>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>ASE 80.HI Hef-schuifsysteem</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>AWS Vouwwand systemen</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        <span>Maximale ruimte-opening</span>
                      </li>
                    </ul>
                    <Link to="/producten/schueco/schuifdeuren">
                      <Button className="w-full bg-white text-black hover:bg-white/90">
                        Bekijk Schuifdeuren
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* View Icon */}
              <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
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
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
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