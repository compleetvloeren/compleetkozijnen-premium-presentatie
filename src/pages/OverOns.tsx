import { Mail, Phone, MapPin, Award, Users, Clock, Star, Home, Building, Wrench, CheckCircle, Shield, Eye, Target, Heart, Lightbulb, Settings, Search, FileText, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/over-ons-hero.jpg';
import gealanImage from '@/assets/gealan-s9000-base.png';
import schuecoImage from '@/assets/schueco-windows-modern.jpg';
import installationImage from '@/assets/installation-service.jpg';

const OverOns = () => {
  const expertiseAreas = [
    {
      title: 'GEALAN Kunststof Specialist',
      subtitle: 'Duitse premiumkwaliteit',
      description: 'Erkend Premium Partner van GEALAN met 25+ jaar ervaring in kunststof kozijnsystemen',
      image: gealanImage,
      features: [
        'S-9000 serie: Base, Haax, Slim & Styl',
        '5-kamer profielen voor optimale isolatie',
        '10 jaar volledige garantie',
        'GEALAN-ACRYLCOLOR coating systeem'
      ],
      route: '/producten/gealan'
    },
    {
      title: 'SCHÜCO Aluminium Expert', 
      subtitle: 'Innovatieve technologie',
      description: 'Specialist in premium aluminium kozijnsystemen voor moderne architectuur',
      image: schuecoImage,
      features: [
        'AWS/ADS/ASE serie systemen',
        'RC2-RC4 beveiligingsniveaus',
        'Hydraulische schuifsystemen',
        'Passief huis geschikt'
      ],
      route: '/producten/schueco'
    }
  ];

  const serviceSteps = [
    {
      icon: Search,
      title: 'Gratis Advies',
      description: 'Persoonlijk intakegesprek en technische analyse van uw wensen',
      details: 'Wij bezoeken u thuis voor een uitgebreide bespreking van uw wensen, budget en technische mogelijkheden.'
    },
    {
      icon: FileText,
      title: 'Maatwerk Offerte',
      description: 'Gedetailleerde offerte op maat met transparante kostenoverzicht',
      details: 'Binnen 48 uur ontvangt u een uitgebreide offerte met alle specificaties en mogelijkheden.'
    },
    {
      icon: Wrench,
      title: 'Professionele Productie',
      description: 'Precisie fabricage in moderne productiefaciliteit',
      details: 'Uw kozijnen worden met Duitse precisie geproduceerd onder strikte kwaliteitscontrole.'
    },
    {
      icon: Truck,
      title: 'Vakkundige Installatie',
      description: 'Gecertificeerde monteurs zorgen voor perfecte plaatsing',
      details: 'Ervaren vakmensen installeren uw kozijnen volgens de hoogste kwaliteitsstandaarden.'
    },
    {
      icon: Settings,
      title: 'Nazorg & Service',
      description: 'Uitgebreide garantie en persoonlijke ondersteuning',
      details: 'Ook na plaatsing staan wij voor u klaar met onderhoudstips en garantieservice.'
    }
  ];

  const companyValues = [
    {
      icon: Award,
      title: '25+ Jaar Vakmanschap',
      description: 'Kwarteeuw expertise in hoogwaardige kozijnoplossingen'
    },
    {
      icon: Shield,
      title: 'Premium Kwaliteit',
      description: 'Uitsluitend A-merken GEALAN en SCHÜCO'
    },
    {
      icon: Users,
      title: 'Lokaal & Persoonlijk',
      description: 'Ervaren vakmensen uit de regio'
    },
    {
      icon: CheckCircle,
      title: 'Volledige Garantie',
      description: 'Tot 10 jaar garantie op materiaal en montage'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <ResponsiveBreadcrumb />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[80vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center min-h-[60vh] sm:min-h-[80vh]">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-display-large mb-6 font-bold">
              CompleetKozijnen
              <span className="block text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                Van A tot Z Geregeld
              </span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Sinds 25+ jaar uw vertrouwde partner voor premium kozijnoplossingen. 
              GEALAN kunststof & SCHÜCO aluminium specialist met complete service van advies tot installatie.
            </p>
            <div className="flex flex-col gap-3 justify-center px-4 sm:flex-row sm:gap-4">
              <Link to="/offerte" className="w-full sm:w-auto">
                <Button className="btn-hero w-full sm:min-w-[200px]">
                  Gratis Advies Aanvragen
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:min-w-[200px] border-white/80 text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black">
                  Neem Contact Op
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-display mb-4">Onze Expertise</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Specialist in twee premium merken: GEALAN kunststof en SCHÜCO aluminium. 
              Elk met hun eigen unieke voordelen en toepassingen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {expertiseAreas.map((expertise, index) => (
              <div key={expertise.title} className="group relative overflow-hidden rounded-2xl h-[400px] sm:h-[500px] cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${expertise.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Always Visible Info */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{expertise.title}</h3>
                  <p className="text-white/80 text-base sm:text-lg mb-3 sm:mb-4">{expertise.subtitle}</p>
                  <p className="text-white/90 text-sm mb-3 sm:mb-4">{expertise.description}</p>
                </div>
                
                {/* Hover Content - Hidden on mobile, tap to show */}
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-8 z-50">
                  <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 max-w-sm z-50">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/30 shadow-2xl">
                      <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Onze {expertise.title.split(' ')[0]} Expertise</h4>
                      
                      {/* Features */}
                      <ul className="space-y-2 text-xs sm:text-sm mb-4 sm:mb-6 text-left">
                        {expertise.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 flex-shrink-0 text-green-400 mt-0.5" />
                            <span className="leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link to={expertise.route} className="block">
                        <Button className="w-full bg-white text-black hover:bg-white/90 text-sm sm:text-base">
                          Bekijk {expertise.title.split(' ')[0]} Producten
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* View Icon */}
                <div className="absolute top-6 right-6 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Service Process */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-display mb-4">Van A tot Z Geregeld</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Ons complete servicetraject: van het eerste adviesgesprek tot de eindoplevering en nazorg. 
              Alles uit één hand voor uw gemoedsrust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {serviceSteps.map((step, index) => (
              <div key={step.title} className="relative">
                <Card className="card-tesla-hero h-full group cursor-pointer">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="bg-gradient-to-br from-primary to-accent p-3 sm:p-4 rounded-xl inline-flex mb-3 sm:mb-4">
                      <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full mb-2 sm:mb-3 inline-block">
                      Stap {index + 1}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{step.description}</p>
                    
                    {/* Expandable details - always visible on mobile, hover on desktop */}
                    <div className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-muted/30 rounded-lg p-2 sm:p-3 mt-2 sm:mt-3">
                        <p className="text-xs text-muted-foreground">{step.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Connection line - hidden on mobile and small screens */}
                {index < serviceSteps.length - 1 && (
                  <div className="hidden xl:block absolute top-12 sm:top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-accent z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-display mb-4">Waarom CompleetKozijnen?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Onze kernwaarden en wat ons onderscheidt als premium kozijnspecialist
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {companyValues.map((value, index) => (
              <Card key={value.title} className="card-tesla-hero text-center group hover-scale">
                <CardContent className="p-6 sm:p-8">
                  <div className="bg-gradient-to-br from-primary to-accent p-3 sm:p-4 rounded-xl inline-flex mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Excellence */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative overflow-hidden rounded-2xl h-[300px] sm:h-[400px] order-2 lg:order-1">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${installationImage})` }}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-display mb-4 sm:mb-6">Vakkundige Installatie</h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <p>
                  Onze gecertificeerde monteurs hebben jarenlange ervaring met zowel GEALAN kunststof 
                  als SCHÜCO aluminium systemen. Elke installatie wordt uitgevoerd volgens de strictste 
                  kwaliteitsnormen.
                </p>
                <p>
                  Van de eerste opmeting tot de eindoplevering zorgen wij voor een zorgeloze ervaring. 
                  Wij nemen alle formaliteiten uit handen en zorgen dat uw nieuwe kozijnen perfect 
                  aansluiten bij uw woning.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-background rounded-lg p-3 sm:p-4 border">
                  <div className="flex items-center mb-2">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2" />
                    <span className="font-semibold text-sm sm:text-base">VCA Gecertificeerd</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Veilig werken gegarandeerd</p>
                </div>
                
                <div className="bg-background rounded-lg p-3 sm:p-4 border">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2" />
                    <span className="font-semibold text-sm sm:text-base">10 Jaar Garantie</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Op materiaal en montage</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-6 sm:mt-8 sm:flex-row sm:gap-4">
                <Link to="/service" className="w-full sm:w-auto">
                  <Button className="btn-hero w-full sm:w-auto">
                    Lees Meer Over Onze Service
                  </Button>
                </Link>
                <Link to="/offerte" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Plan een Afspraak
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-display mb-3 sm:mb-4">Klaar Voor Nieuwe Kozijnen?</h2>
            <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-2">
              Ontdek wat CompleetKozijnen voor u kan betekenen. 
              Van gratis advies tot professionele installatie - wij regelen alles.
            </p>
            
            <div className="flex flex-col gap-3 justify-center sm:flex-row sm:gap-4">
              <Link to="/offerte" className="w-full sm:w-auto">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:min-w-[200px]">
                  Gratis Offerte Aanvragen
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-white/80 text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-primary w-full sm:min-w-[200px]">
                  <Phone className="mr-2 h-4 w-4" />
                  Bel Direct: 085-250 2359
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OverOns;