import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, CheckCircle, Thermometer, Shield, Droplets, Wind } from 'lucide-react';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import { getTechnicalTerm } from '@/lib/technicalGlossary';
import gealanBaseImage from '@/assets/gealan-s9000-base.png';

const GealanS9000Base = () => {
  const productData = {
    name: 'GEALAN S-9000 Base',
    title: 'Slank & Modern',
    description: 'Het slanke kozijn met dieptewerking door de innovatieve 15° schuinte. Perfect ontworpen voor moderne woningen die elegantie willen combineren met functionaliteit.',
    fullDescription: `Het GEALAN S-9000 Base systeem biedt de perfecte combinatie van moderne esthetiek en technische excellence. Met zijn kenmerkende 15° schuinte creëert dit kozijn een elegante dieptewerking die perfect past bij hedendaagse architectuur. 

De 5-kamer technologie in combinatie met het 3-dichting systeem zorgt voor uitstekende isolatiewaarden, terwijl de STV® lijmtechniek een levenslange verbinding tussen glas en profiel garandeert.`,
    buildingDepth: '120 mm',
    glazingThickness: 'Tot 52 mm',
    ufValue: '1,0 W/(m²K)',
    image: gealanBaseImage,
    features: [
      'Innovatieve 15° schuinte voor dieptewerking',
      '3-dichting systeem voor optimale isolatie',
      'STV® lijmtechniek voor levenslange stevigheid',
      'GEALAN-ACRYLCOLOR® coating voor duurzaamheid',
      '5-kamer technologie',
      'IKD® isolatieschuim voor topkwaliteit'
    ],
    technicalSpecs: [
      {
        key: '5-kamertechnologie',
        label: 'Profiel Systeem',
        value: '5-kamer profiel systeem',
        description: 'Vijf gescheiden kamers zorgen voor uitstekende thermische isolatie en stabiliteit van het kozijn.',
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
        value: '15° schuinte onder',
        description: 'De 15° schuinte creëert een moderne dieptewerking en verbetert de waterafvoer.',
        hasTooltip: true
      },
      {
        key: 'stv-lijmtechniek',
        label: 'Glassysteem',
        value: 'Tot 54 mm met STV® lijmtechniek',
        description: 'Statische droge verlijming waarbij glas en profiel één sterk geheel vormen voor levenslange stabiliteit.',
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
        description: 'Grotere inbouwdiepte biedt ruimte voor dikkere isolatie en glaspakketten.',
        hasTooltip: true
      },
      {
        key: 'veiligheid',
        label: 'Veiligheid',
        value: 'RC1-RC3 inbraakbeveiliging mogelijk',
        description: 'Verschillende beveiligingsniveaus conform Nederlandse en Europese normen.'
      }
    ],
    applications: [
      'Moderne nieuwbouwwoningen',
      'Renovatieprojecten met hedendaagse uitstraling',
      'Architecturale projecten met slanke lijnen',
      'Woningen met grote glasoppervlakken',
      'Energiezuinige woningen'
    ],
    certifications: [
      'CE-markering conform EN 14351-1',
      'Uf-waarde 1,0 W/(m²K) getest',
      'Waterdichtheid klasse 9A',
      'Windbelasting klasse C5/B5',
      'RAL Gütezeichen kwaliteitscertificaat'
    ]
  };

  const performanceData = [
    {
      icon: Thermometer,
      title: 'Thermische Prestaties',
      value: '1,0 W/(m²K)',
      description: 'Uitstekende isolatiewaarde door 5-kamer technologie en IKD® isolatieschuim'
    },
    {
      icon: Shield,
      title: 'Veiligheid',
      value: 'RC1-RC3',
      description: 'Hoge inbraakbeveiliging met gestandaardiseerde veiligheidsbeslag'
    },
    {
      icon: Droplets,
      title: 'Waterdichtheid',
      value: 'Klasse 9A',
      description: 'Optimale bescherming tegen regen en vocht door 3-dichting systeem'
    },
    {
      icon: Wind,
      title: 'Windbestendigheid',
      value: 'C5/B5',
      description: 'Geteste windbelasting voor alle Nederlandse klimaatomstandigheden'
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
            <span className="text-foreground">GEALAN S-9000 Base</span>
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
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-background p-8">
                <img 
                  src={productData.image}
                  alt={productData.name}
                  className="w-full h-full object-contain"
                />
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
          <h2 className="text-display mb-6">Interesse in GEALAN S-9000 Base?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ontdek wat dit premium kozijnsysteem voor uw project kan betekenen. 
            Vraag een vrijblijvende offerte aan of download onze gedetailleerde brochure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/offerte">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Download className="mr-2 h-5 w-5" />
              Brochure Downloaden
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GealanS9000Base;