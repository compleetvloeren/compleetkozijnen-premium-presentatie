import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, CheckCircle, Thermometer, Shield, Droplets, Wind } from 'lucide-react';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import { getTechnicalTerm } from '@/lib/technicalGlossary';
import gealanHaaxImage from '@/assets/gealan-s9000-haax.png';
import gealanHaaxProfile from '@/assets/gealan-s9000-haax-profile.png';

const GealanS9000Haax = () => {
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
    technicalSpecs: {
      kamers: '5-kamer profiel',
      dichting: '3-dichting systeem',
      schuinte: '4° schuinte',
      profiel: 'Blokprofiel rondom 86mm',
      constructie: 'Verstevigde constructie'
    },
    advantages: [
      {
        icon: Thermometer,
        title: 'Robuuste Isolatie',
        description: 'Uitstekende thermische prestaties door verstevigde 5-kamer technologie'
      },
      {
        icon: Shield,
        title: 'Maximale Stevigheid',
        description: 'Blokprofiel constructie voor uitzonderlijke duurzaamheid'
      },
      {
        icon: Droplets,
        title: 'Bewezen Dichtheid',
        description: '3-dichting systeem getest onder Nederlandse weersomstandigheden'
      },
      {
        icon: Wind,
        title: 'Superieure Stabiliteit',
        description: 'Verstevigde constructie bestand tegen extreme belasting'
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <ResponsiveBreadcrumb />
      
      {/* Video Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden pt-16 md:pt-20">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1119543342?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&background=1"
            className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full border-0"
            style={{ 
              width: '177.77777778vh',
              height: '56.25vw',
              minWidth: '100%',
              minHeight: '100%',
              transform: 'translate(-50%, -50%)'
            }}
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="GEALAN S-9000 kozijnsystemen video"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 to-accent/90 text-white overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <Link to="/producten/gealan">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar overzicht
                  </Button>
                </Link>
              </div>
              
              <h1 className="text-display-large mb-4">
                {productData.name}
              </h1>
              <p className="text-2xl font-semibold mb-6 text-accent-foreground/90">
                {productData.title}
              </p>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                {productData.description}
              </p>
              
              {/* Quick specs */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-sm opacity-75 mb-1">Inbouwdiepte</div>
                  <div className="text-xl font-bold">{productData.buildingDepth}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm opacity-75 mb-1">Glasdikte</div>
                  <div className="text-xl font-bold">{productData.glazingThickness}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm opacity-75 mb-1">Uf-waarde</div>
                  <div className="text-xl font-bold">{productData.ufValue}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src={productData.image}
                  alt={productData.name}
                  className="max-w-full h-auto max-h-[500px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-display mb-8 text-center">Product Details</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                {productData.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-display mb-12 text-center">Productkenmerken</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {productData.features.map((feature, index) => (
              <Card key={index} className="card-tesla-hero">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <span className="text-body">{feature}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-display mb-12 text-center">Technische Specificaties</h2>
            <TechnicalSpecDropdown 
              title="Volledige Specificaties" 
              specs={Object.entries(productData.technicalSpecs).map(([key, value]) => ({
                key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                value
              }))}
            />
            
            {/* Advantages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {productData.advantages.map((advantage, index) => (
                <Card key={index} className="card-tesla-hero">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-lg shrink-0">
                        <advantage.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-title mb-2">{advantage.title}</h3>
                        <p className="text-body text-muted-foreground">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GealanS9000Haax;