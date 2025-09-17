import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, CheckCircle, Thermometer, Shield, Droplets, Wind } from 'lucide-react';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import { getTechnicalTerm } from '@/lib/technicalGlossary';
import gealanHaaxImage from '@/assets/gealan-s9000-haax.png';
import gealanHaaxProfile from '@/assets/gealan-s9000-haax-profile.png';

  const productData = {
    name: 'GEALAN S-9000 Haax',
    title: 'Robuust & Krachtig',
    description: 'Het robuuste blokprofiel kozijn rondom 86 mm in aanzicht. Ideaal voor woningen waar stevigheid en duurzaamheid centraal staan.',
    fullDescription: `Het GEALAN S-9000 Haax systeem kenmerkt zich door zijn robuuste blokprofiel design dat maximale stevigheid biedt. Met een aanzicht van 86 mm rondom creëert dit kozijn een krachtige uitstraling die perfect past bij woningen waar duurzaamheid en betrouwbaarheid voorop staan.

De 4° schuinte geeft het kozijn een klassieke uitstraling, terwijl de verstevigde constructie zorgt voor uitzonderlijke stabiliteit. Dit systeem is speciaal geoptimaliseerd voor de Nederlandse markt en voldoet aan alle lokale bouwvoorschriften.`,
    buildingDepth: '120 mm',
    glazingThickness: 'Tot 52 mm',
    ufValue: '1,0 W/(m²K)',
    image: gealanHaaxImage,
    profileImage: gealanHaaxProfile,
    features: [
      'Robuust blokprofiel design voor maximale stevigheid',
      '4° schuinte voor klassieke uitstraling',
      'Optimale stabiliteit door verstevigde constructie',
      'Premium isolatiekwaliteit',
      'Lange levensduur door kwaliteitsmateriaal',
      'Nederlandse markt geoptimaliseerd'
    ],
    technicalSpecs: [
      {
        key: '5-kamertechnologie',
        label: 'Profiel Systeem',
        value: '5-kamer blokprofiel systeem',
        description: 'Robuust blokprofiel design met vijf kamers voor maximale stevigheid en isolatie.',
        hasTooltip: true
      },
      {
        key: '3-dichting-systeem',
        label: 'Dichting',
        value: '3-dichting systeem',
        description: 'Drie afzonderlijke dichtingen rondom het kozijn voor optimale lucht- en waterdichtheid.',
        hasTooltip: true
      },
      {
        key: 'schuinte',
        label: 'Schuinte',
        value: '4° schuinte voor klassieke uitstraling',
        description: 'De 4° schuinte biedt een robuuste, klassieke uitstraling perfect voor traditionele architectuur.',
        hasTooltip: true
      },
      {
        key: 'aanzicht',
        label: 'Aanzichtbreedte',
        value: 'Blokprofiel rondom 86mm',
        description: 'Robuuste aanzichtbreedte van 86mm voor een krachtige en zichtbare kozijnuitstraling.'
      },
      {
        key: 'constructie',
        label: 'Constructie',
        value: 'Verstevigde constructie',
        description: 'Extra verstevigde constructie voor maximale stabiliteit en lange levensduur.'
      },
      {
        key: 'stv-lijmtechniek',
        label: 'Glassysteem',
        value: 'Tot 52 mm met STV® lijmtechniek',
        description: 'Statische droge verlijming waarbij glas en profiel één sterk geheel vormen.',
        hasTooltip: true
      },
      {
        key: 'gealan-acrylcolor',
        label: 'Kleursysteem',
        value: 'GEALAN-ACRYLCOLOR®',
        description: 'Duurzaam kleursysteem met 40+ jaar bewezen kwaliteit en superieure weerbestendigheid.',
        hasTooltip: true
      },
      {
        key: 'ikd-isolatieschuim',
        label: 'Isolatie',
        value: 'IKD® isolatieschuim profielen',
        description: 'Speciale isolatieprofielen die de thermische eigenschappen verder verbeteren.',
        hasTooltip: true
      },
      {
        key: 'inbouwdiepte',
        label: 'Bouwdiepte',
        value: '120 mm inbouwdiepte',
        description: 'Standaard 120mm bouwdiepte biedt ruimte voor uitstekende isolatie.',
        hasTooltip: true
      }
    ],
    applications: [
      'Traditionele woningen met robuuste uitstraling',
      'Renovatieprojecten waar stevigheid vereist is',
      'Woningen in extreme weersomstandigheden',
      'Projecten met hoge veiligheidseisen',
      'Karakteristieke panden met klassieke architectuur'
    ],
    certifications: [
      'CE-markering conform EN 14351-1',
      'Uf-waarde 1,0 W/(m²K) getest',
      'Waterdichtheid klasse 9A',
      'Windbelasting klasse C5/B5',
      'Nederlandse bouwvoorschriften conform',
      'RAL Gütezeichen kwaliteitscertificaat'
    ]
  };

  const performanceData = [
    {
      icon: Thermometer,
      title: 'Thermische Prestaties',
      value: '1,0 W/(m²K)',
      description: 'Uitstekende isolatiewaarde ondanks robuuste constructie'
    },
    {
      icon: Shield,
      title: 'Veiligheid',
      value: 'RC1-RC3',
      description: 'Extra veiligheid door verstevigde blokprofiel constructie'
    },
    {
      icon: Droplets,
      title: 'Waterdichtheid',
      value: 'Klasse 9A',
      description: 'Superieure bescherming tegen Nederlandse weersomstandigheden'
    },
    {
      icon: Wind,
      title: 'Windbestendigheid',
      value: 'C5/B5',
      description: 'Uitzonderlijke windbestendigheid door robuuste design'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="pt-24 pb-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/producten" className="hover:text-primary transition-colors">Producten</Link>
            <span>/</span>
            <span className="text-foreground">GEALAN S-9000 Haax</span>
          </nav>
          <Link to="/producten" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar Producten
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-display-large mb-6">
                {productData.name}
                <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                  {productData.title}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">{productData.description}</p>
              
              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    <TechnicalTooltip {...getTechnicalTerm('inbouwdiepte')}>
                      <span>Inbouwdiepte</span>
                    </TechnicalTooltip>
                  </div>
                  <div className="text-xl font-bold text-primary">{productData.buildingDepth}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    <TechnicalTooltip {...getTechnicalTerm('glasdikte')}>
                      <span>Glasdikte</span>
                    </TechnicalTooltip>
                  </div>
                  <div className="text-xl font-bold text-primary">{productData.glazingThickness}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    <TechnicalTooltip {...getTechnicalTerm('uf-waarde')}>
                      <span>Uf-waarde</span>
                    </TechnicalTooltip>
                  </div>
                  <div className="text-xl font-bold text-primary">{productData.ufValue}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/offerte">
                  <Button size="lg" className="btn-hero">
                    Offerte Aanvragen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="group">
                  <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Brochure Downloaden
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-background p-8">
                  <img 
                    src={productData.image}
                    alt={`${productData.name} - Complete view`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-background p-8">
                  <img 
                    src={productData.profileImage}
                    alt={`${productData.name} - Profile view`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-display text-center mb-12">Prestatie Overzicht</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceData.map((metric, index) => (
              <Card key={metric.title} className="card-tesla text-center">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                    <metric.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-title mb-2">{metric.title}</h3>
                  <div className="text-2xl font-bold text-primary mb-3">{metric.value}</div>
                  <p className="text-body text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Product Description */}
            <div>
              <h2 className="text-display mb-6">Product Overzicht</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                {productData.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-title mb-4">Belangrijkste Kenmerken</h3>
                {productData.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-body">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              <h2 className="text-display mb-6">Technische Specificaties</h2>
              <div className="mb-8">
                <TechnicalSpecDropdown 
                  title="Technische Specificaties" 
                  specs={productData.technicalSpecs} 
                />
              </div>

              {/* Applications */}
              <div className="mb-8">
                <h3 className="text-title mb-4">Toepassingen</h3>
                <div className="space-y-2">
                  {productData.applications.map((application, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <span className="text-body">{application}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-title mb-4">Certificeringen</h3>
                <div className="space-y-2">
                  {productData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-3" />
                      <span className="text-body">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-display mb-6">Interesse in GEALAN S-9000 Haax?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ervaar de kracht van robuuste kwaliteit. Vraag een vrijblijvende offerte aan 
            of download onze gedetailleerde productinformatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/offerte">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => window.open('/brochures/S-9000-NL-algemeen.pdf', '_blank')}>
              <Download className="mr-2 h-5 w-5" />
              Bekijk brochure
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GealanS9000Haax;