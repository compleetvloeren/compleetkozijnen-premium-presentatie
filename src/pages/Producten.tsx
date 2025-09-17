import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Award, Star } from 'lucide-react';

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
      color: 'from-blue-600 to-blue-700'
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
      color: 'from-slate-600 to-slate-700'
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
              <Card key={brand.name} className="card-tesla-hero overflow-hidden group">
                <div className={`h-32 bg-gradient-to-r ${brand.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative h-full flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white">{brand.name}</h2>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      brand.status === 'Beschikbaar' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {brand.status}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-8 card-tesla-hero">
                  <div className="mb-6">
                    <h3 className="text-headline mb-3">{brand.title}</h3>
                    <p className="text-body text-muted-foreground mb-6">{brand.description}</p>
                  </div>

                  {/* Technical Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                    {Object.entries(brand.specs).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1 capitalize">{key}</div>
                        <div className="font-semibold text-primary text-sm">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {brand.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 min-h-[120px] justify-end">
                    <Link to={brand.route} className="w-full">
                      <Button 
                        className={`btn-hero w-full ${brand.status !== 'Beschikbaar' ? 'opacity-75' : ''}`}
                        disabled={brand.status !== 'Beschikbaar'}
                      >
                        {brand.status === 'Beschikbaar' ? 'Bekijk Producten' : 'Binnenkort Beschikbaar'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    
                    {brand.status === 'Beschikbaar' && (
                      <Link to="/offerte" className="w-full">
                        <Button variant="outline" className="w-full">
                          Vrijblijvende Offerte
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
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