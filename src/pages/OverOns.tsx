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
      <section className="relative min-h-[80vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center min-h-[80vh]">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-display-large mb-6 font-bold">
              CompleetKozijnen
              <span className="block text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                Van A tot Z Geregeld
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Sinds 25+ jaar uw vertrouwde partner voor premium kozijnoplossingen. 
              GEALAN kunststof & SCHÜCO aluminium specialist met complete service van advies tot installatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button className="btn-hero min-w-[200px]">
                  Gratis Advies Aanvragen
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="min-w-[200px] border-white/80 text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black">
                  Neem Contact Op
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-4">Onze Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialist in twee premium merken: GEALAN kunststof en SCHÜCO aluminium. 
              Elk met hun eigen unieke voordelen en toepassingen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {expertiseAreas.map((expertise, index) => (
              <div key={expertise.title} className="group relative overflow-hidden rounded-2xl h-[500px] cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${expertise.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Always Visible Info */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">{expertise.title}</h3>
                  <p className="text-white/80 text-lg mb-4">{expertise.subtitle}</p>
                  <p className="text-white/90 text-sm mb-4">{expertise.description}</p>
                </div>
                
                {/* Hover Content */}
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 z-50">
                  <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 max-w-md z-50">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-2xl">
                      <h4 className="text-xl font-semibold mb-4">Onze {expertise.title.split(' ')[0]} Expertise</h4>
                      
                      {/* Features */}
                      <ul className="space-y-2 text-sm mb-6 text-left">
                        {expertise.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-3 flex-shrink-0 text-green-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link to={expertise.route} className="block">
                        <Button className="w-full bg-white text-black hover:bg-white/90">
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
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-4">Van A tot Z Geregeld</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ons complete servicetraject: van het eerste adviesgesprek tot de eindoplevering en nazorg. 
              Alles uit één hand voor uw gemoedsrust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {serviceSteps.map((step, index) => (
              <div key={step.title} className="relative">
                <Card className="card-tesla-hero h-full group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full mb-3 inline-block">
                      Stap {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                    
                    {/* Expandable details on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-muted/30 rounded-lg p-3 mt-3">
                        <p className="text-xs text-muted-foreground">{step.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Connection line */}
                {index < serviceSteps.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-accent z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-4">Waarom CompleetKozijnen?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Onze kernwaarden en wat ons onderscheidt als premium kozijnspecialist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={value.title} className="card-tesla-hero text-center group hover-scale">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Excellence */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-2xl h-[400px]">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${installationImage})` }}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            
            <div>
              <h2 className="text-display mb-6">Vakkundige Installatie</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Onze gecertificeerde monteurs hebben jarenlange ervaring met zowel GEALAN kunststof 
                  als SCHÜCO aluminium systemen. Elke installatie wordt uitgevoerd volgens de stricteste 
                  kwaliteitsnormen.
                </p>
                <p>
                  Van de eerste opmeting tot de eindoplevering zorgen wij voor een zorgeloze ervaring. 
                  Wij nemen alle formaliteiten uit handen en zorgen dat uw nieuwe kozijnen perfect 
                  aansluiten bij uw woning.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span className="font-semibold">VCA Gecertificeerd</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Veilig werken gegarandeerd</p>
                </div>
                
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span className="font-semibold">10 Jaar Garantie</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Op materiaal en montage</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/service">
                  <Button className="btn-hero">
                    Lees Meer Over Onze Service
                  </Button>
                </Link>
                <Link to="/offerte">
                  <Button variant="outline">
                    Plan een Afspraak
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-12 text-center text-white">
            <h2 className="text-display mb-4">Klaar Voor Nieuwe Kozijnen?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Ontdek wat CompleetKozijnen voor u kan betekenen. 
              Van gratis advies tot professionele installatie - wij regelen alles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 min-w-[200px]">
                  Gratis Offerte Aanvragen
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/80 text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-primary min-w-[200px]">
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