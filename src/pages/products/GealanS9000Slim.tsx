import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, CheckCircle, Thermometer, Shield, Droplets, Wind, Minimize2 } from 'lucide-react';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import { getTechnicalTerm } from '@/lib/technicalGlossary';
import gealanSlimImage from '@/assets/gealan-s9000-slim.png';
import gealanSlimProfile from '@/assets/gealan-s9000-slim-profile.png';

const GealanS9000Slim = () => {
  const productData = {
    name: 'GEALAN S-9000 Slim',
    title: 'Strak & Minimalistisch',
    description: 'Het systeem dat zich perfect leent voor strakke moderne gevels. Minimalistische elegantie met vlakke optiek in compacte bouwdiepte.',
    fullDescription: `Het GEALAN S-9000 Slim systeem is de perfecte keuze voor wie houdt van strakke, minimalistische architectuur. Met een compacte bouwdiepte van slechts 82,5 mm biedt dit systeem een vlakke optiek zonder compromissen op kwaliteit.

Dit systeem is ideaal voor moderne woningen waar clean lines en een minimalistisch design centraal staan. Ondanks de slanke profielen biedt het systeem nog steeds uitstekende isolatiewaarden en is het geschikt voor diverse toepassingen, inclusief wisselopeningen.`,
    buildingDepth: '82,5 mm',
    glazingThickness: 'Tot 48 mm',
    ufValue: '1,2 W/(m²K)',
    image: gealanSlimImage,
    profileImage: gealanSlimProfile,
    features: [
      'Slanke profielen voor minimalistisch design',
      'Compacte 82,5 mm bouwdiepte',
      'Vlakke optiek zonder compromissen',
      'Moderne esthetiek voor contemporary woningen',
      'Strak lijnenspel en cleane afwerking',
      'Ook geschikt voor wisselopeningen'
    ],
    technicalSpecs: [
      {
        key: '5-kamertechnologie',
        label: 'Profiel Systeem',
        value: '5-kamer slim profiel systeem',
        description: 'Geoptimaliseerd 5-kamer systeem voor slanke bouw zonder concessies aan isolatie.',
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
        key: 'inbouwdiepte',
        label: 'Bouwdiepte',
        value: 'Compacte 82,5 mm bouwdiepte',
        description: 'Compacte bouwdiepte voor slanke uitstraling zonder verlies van functionaliteit.',
        hasTooltip: true
      },
      {
        key: 'design',
        label: 'Design',
        value: 'Vlakke optiek minimalistisch',
        description: 'Strakke, vlakke optiek voor moderne, minimalistische architectuur.'
      },
      {
        key: 'toepassing',
        label: 'Toepassing',
        value: 'Wisselopeningen en vaste beglazing',
        description: 'Flexibel inzetbaar voor zowel draaiende elementen als vaste beglazing.'
      },
      {
        key: 'glasdikte',
        label: 'Glassysteem',
        value: 'Tot 48 mm glaspakket',
        description: 'Optimaal afgestemde glasdikte voor het slanke profiel systeem.',
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
        key: 'isolatie',
        label: 'Isolatie',
        value: 'Aangepaste isolatieprofielen',
        description: 'Speciaal ontwikkelde isolatieprofielen voor optimale prestaties in slanke bouw.'
      },
      {
        key: 'esthetiek',
        label: 'Esthetiek',
        value: 'Clean lines moderne uitstraling',
        description: 'Strakke lijnen en moderne uitstraling perfect voor contemporary woningen.'
      },
      {
        key: 'flexibiliteit',
        label: 'Flexibiliteit',
        value: 'Geschikt voor diverse stijlen',
        description: 'Veelzijdig inzetbaar voor verschillende moderne architectuurstijlen.'
      }
    ],
    applications: [
      'Moderne nieuwbouwprojecten met clean architecture',
      'Renovatie van contemporary woningen',
      'Appartementen en penthouses met strak design',
      'Projecten waar slanke profielen vereist zijn',
      'Wisselopeningen en grote glaspartijen',
      'Minimalistische kantoorpanden'
    ],
    certifications: [
      'CE-markering conform EN 14351-1',
      'Uf-waarde 1,2 W/(m²K) getest',
      'Waterdichtheid klasse 9A',
      'Windbelasting klasse C5/B5',
      'Nederlandse bouwvoorschriften conform',
      'Geschikt voor wisselopeningen',
      'RAL Gütezeichen kwaliteitscertificaat'
    ]
  };

  const performanceData = [
    {
      icon: Thermometer,
      title: 'Thermische Prestaties',
      value: '1,2 W/(m²K)',
      description: 'Uitstekende isolatie ondanks compacte bouwdiepte'
    },
    {
      icon: Minimize2,
      title: 'Compacte Bouw',
      value: '82,5 mm',
      description: 'Minimale bouwdiepte voor slanke moderne uitstraling'
    },
    {
      icon: Droplets,
      title: 'Waterdichtheid',
      value: 'Klasse 9A',
      description: 'Betrouwbare bescherming ondanks slim design'
    },
    {
      icon: Wind,
      title: 'Windbestendigheid',
      value: 'C5/B5',
      description: 'Sterke prestaties in alle weersomstandigheden'
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
            <span className="text-foreground">GEALAN S-9000 Slim</span>
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
          <h2 className="text-display mb-6">Interesse in GEALAN S-9000 Slim?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ervaar de elegantie van minimalistisch design. Vraag een vrijblijvende offerte aan 
            of download onze gedetailleerde productinformatie.
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

export default GealanS9000Slim;