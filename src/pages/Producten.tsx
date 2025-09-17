import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Award, Star, Eye } from 'lucide-react';
import gealanImage from '@/assets/gealan-s9000-base.png';
import schuecoImage from '@/assets/schueco-windows-modern.jpg';

const Producten = () => {
  const brands = [
    {
      name: 'GEALAN',
      title: 'Duitse Premiumkwaliteit',
      description: 'Ontdek onze complete range GEALAN S-9000 kunststof kozijnsystemen. Van slank en modern tot robuust en klassiek - speciaal ontwikkeld voor de Nederlandse markt.',
      features: [
        '5-kamer technologie voor optimale isolatie',
        '3-dichting systeem tegen weer en wind',
        'STV® lijmtechniek voor levenslange stevigheid',
        'GEALAN-ACRYLCOLOR® coating systeem',
        '4 verschillende designvarianten',
        '10 jaar volledige garantie'
      ],
      specs: {
        isolatie: 'Uf-waarde tot 1,0 W/(m²K)',
        veiligheid: 'RC1-RC3 certificering mogelijk',
        dichtheid: 'Klasse 9A waterdichtheid',
        windbelasting: 'Klasse C5/B5 windbestendigheid'
      },
      route: '/producten/gealan',
      status: 'Beschikbaar',
      color: 'from-blue-600 to-blue-700',
      image: gealanImage,
      material: 'Kunststof'
    },
    {
      name: 'SCHÜCO',
      title: 'Innovatieve Technologie',
      description: 'Exclusief aluminium specialist met geavanceerde Duitse technologie. Van raamsystemen tot schuifdeuren - alleen aluminium kozijnsystemen van wereldklasse.',
      features: [
        'AWS/ADS/ASE serie systemen',
        'Uf-waarden tot 1,0 W/(m²K)',
        'RC2-RC4 beveiligingsniveaus',
        'Hydraulische schuifsystemen',
        'Maximale glasoppervlakken',
        'Passief huis geschikt'
      ],
      specs: {
        isolatie: 'Uf-waarde tot 1,0 W/(m²K)',
        veiligheid: 'RC2-RC4 certificering',
        dichtheid: 'Klasse 4 luchtdichtheid',
        windbelasting: 'Premium windbestendigheid'
      },
      route: '/producten/schueco',
      status: 'Beschikbaar',
      color: 'from-slate-600 to-slate-700',
      image: schuecoImage,
      material: 'Aluminium'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-background pt-16 md:pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-large mb-6">
              Premium
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Kozijnsystemen
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Ontdek onze selectie van hoogwaardige kozijnsystemen van toonaangevende merken. 
              GEALAN kunststof en SCHÜCO aluminium - elk specialistisch in hun eigen materiaal.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Premium Kwaliteit</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <span>Nederlandse Markt</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span>10 Jaar Garantie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {brands.map((brand, index) => (
              <div key={brand.name} className="group relative overflow-hidden rounded-2xl h-[600px] cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${brand.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Brand Header */}
                <div className="absolute top-6 left-6 z-10">
                  <h2 className="text-4xl font-bold text-white mb-2">{brand.name}</h2>
                  <p className="text-white/80 text-lg">{brand.material} Specialist</p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      brand.status === 'Beschikbaar' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {brand.status}
                    </span>
                  </div>
                </div>

                {/* Always Visible Info */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-2xl font-semibold text-white mb-2">{brand.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{brand.description}</p>
                  
                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {Object.entries(brand.specs).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <div className="text-xs text-white/70 mb-1 capitalize">{key}</div>
                        <div className="font-semibold text-white text-sm">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hover Content */}
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 z-50">
                  <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 max-w-md z-50">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-2xl">
                      <h4 className="text-xl font-semibold mb-4">Kenmerken & Specificaties</h4>
                      
                      {/* All Technical Specs */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {Object.entries(brand.specs).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-xs text-white/70 mb-1 capitalize">{key}</div>
                            <div className="font-semibold text-white text-sm">{value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 text-sm mb-6 text-left">
                        {brand.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Buttons */}
                      <div className="space-y-3">
                        <Link to={brand.route} className="block">
                          <Button 
                            className="w-full bg-white text-black hover:bg-white/90"
                            disabled={brand.status !== 'Beschikbaar'}
                          >
                            {brand.status === 'Beschikbaar' ? 'Bekijk Producten' : 'Binnenkort Beschikbaar'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        
                        {brand.status === 'Beschikbaar' && (
                          <Link to="/offerte" className="block">
                            <Button variant="outline" className="w-full border-white/40 text-white bg-white/10 hover:bg-white hover:text-black">
                              Vrijblijvende Offerte
                            </Button>
                          </Link>
                        )}
                      </div>
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

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-6">
              Waarom Kiezen Voor
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Onze Kozijnen?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Met jarenlange ervaring en toonaangevende merken bieden wij de beste kwaliteit voor uw woning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-tesla-hero text-center">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-title mb-4">Premium Kwaliteit</h3>
                <p className="text-body text-muted-foreground">
                  Alleen de beste merken en materialen voor langdurige prestaties en uitstekende isolatiewaarden.
                </p>
              </CardContent>
            </Card>

            <Card className="card-tesla-hero text-center">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-title mb-4">Nederlandse Markt</h3>
                <p className="text-body text-muted-foreground">
                  Speciaal geselecteerd en geoptimaliseerd voor Nederlandse weersomstandigheden en architectuur.
                </p>
              </CardContent>
            </Card>

            <Card className="card-tesla-hero text-center">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-title mb-4">Complete Service</h3>
                <p className="text-body text-muted-foreground">
                  Van advies tot installatie en nazorg - wij begeleiden u door het hele proces met garantie.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Producten;