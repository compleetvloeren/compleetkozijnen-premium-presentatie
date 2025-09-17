import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, CheckCircle, Thermometer, Shield, Droplets, Wind, Home } from 'lucide-react';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import { getTechnicalTerm } from '@/lib/technicalGlossary';
import gealanStylImage from '@/assets/gealan-s9000-styl.png';
import gealanStylProfile from '@/assets/gealan-s9000-styl-profile.png';

const GealanS9000Styl = () => {
  const productData = {
    name: 'GEALAN S-9000 Styl',
    title: 'Nederlands Gevelbeeld',
    description: 'Het kozijn dat geniaal past in het Nederlandse gevelbeeld. Traditioneel uiterlijk met moderne technologie voor authentiek karakter.',
    fullDescription: `Het GEALAN S-9000 Styl systeem is speciaal ontwikkeld om perfect te passen in het traditionele Nederlandse gevelbeeld. Dit kozijn combineert de charme van klassieke architectuur met de modernste isolatietechnologie.

Met zijn unieke combinatie van 4° en 15° schuintes creëert dit systeem een authentieke Nederlandse uitstraling die zowel traditionalisten als liefhebbers van moderne prestaties zal aanspreken. Het systeem is geoptimaliseerd voor Nederlandse bouwvoorschriften en weersomstandigheden.`,
    buildingDepth: '120 mm',
    glazingThickness: 'Tot 52 mm',
    ufValue: '1,0 W/(m²K)',
    image: gealanStylImage,
    profileImage: gealanStylProfile,
    features: [
      'Klassiek Nederlands design voor authentieke uitstraling',
      'Combinatie 4° en 15° schuintes',
      'Traditionele uitstraling met moderne prestaties',
      'Perfecte integratie in Nederlandse architectuur',
      'Moderne isolatiewaarden in klassiek jasje',
      'Bewezen kwaliteit voor Nederlandse omstandigheden'
    ],
    technicalSpecs: [
      {
        key: '5-kamertechnologie',
        label: 'Profiel Systeem',
        value: '5-kamer profiel systeem',
        description: 'Vijf gescheiden kamers zorgen voor uitstekende thermische isolatie in Nederlands design.',
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
        value: '4° en 15° combinatie',
        description: 'Unieke combinatie van 4° en 15° schuintes voor authentiek Nederlands karakter.',
        hasTooltip: true
      },
      {
        key: 'design',
        label: 'Design',
        value: 'Nederlandse gevel geoptimaliseerd',
        description: 'Speciaal ontworpen voor perfecte integratie in traditionele Nederlandse architectuur.'
      },
      {
        key: 'compatibiliteit',
        label: 'Toepassing',
        value: 'Traditionele architectuur',
        description: 'Gespecialiseerd voor renovatie en nieuwbouw in traditionele Nederlandse stijl.'
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
      },
      {
        key: 'karakteristiek',
        label: 'Karakteristiek',
        value: 'Authentiek Nederlands gevelbeeld',
        description: 'Moderne isolatieprestaties gecombineerd met traditionele Nederlandse uitstraling.'
      }
    ],
    applications: [
      'Monumentale panden en karakteristieke woningen',
      'Renovatieprojecten in historische buurten',
      'Nederlandse nieuwbouw met traditionele uitstraling',
      'Woningen in beschermde stadsgezichten',
      'Projecten waar authentiek karakter belangrijk is'
    ],
    certifications: [
      'CE-markering conform EN 14351-1',
      'Uf-waarde 1,0 W/(m²K) getest',
      'Waterdichtheid klasse 9A',
      'Windbelasting klasse C5/B5',
      'Nederlandse bouwvoorschriften conform',
      'Monumentenzorg geschikt',
      'RAL Gütezeichen kwaliteitscertificaat'
    ]
  };

  const performanceData = [
    {
      icon: Thermometer,
      title: 'Thermische Prestaties',
      value: '1,0 W/(m²K)',
      description: 'Moderne isolatiewaarden in traditioneel design'
    },
    {
      icon: Home,
      title: 'Nederlandse Integratie',
      value: '100%',
      description: 'Perfect aangepast aan Nederlandse architectuur'
    },
    {
      icon: Droplets,
      title: 'Waterdichtheid',
      value: 'Klasse 9A',
      description: 'Bewezen bestand tegen Nederlandse weersomstandigheden'
    },
    {
      icon: Wind,
      title: 'Windbestendigheid',
      value: 'C5/B5',
      description: 'Getest conform Nederlandse klimaatomstandigheden'
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
            <span className="text-foreground">GEALAN S-9000 Styl</span>
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
          <h2 className="text-display mb-6">Interesse in GEALAN S-9000 Styl?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ontdek hoe dit traditionele kozijn perfect past in uw Nederlandse woning. 
            Vraag een vrijblijvende offerte aan of download onze productinformatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/offerte">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="/brochures/S-9000-NL-algemeen.pdf" download>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Brochure Downloaden
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GealanS9000Styl;