import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Thermometer, Shield, Droplets, Wind } from 'lucide-react';
import windowSystemImage from '@/assets/window-system.jpg';

const Producten = () => {
  const productVariants = [
    {
      name: 'S-9000 Base',
      title: 'Slank & Modern',
      description: 'Slank kozijn met dieptewerking door de 15° schuinte. Perfect voor moderne woningen die elegantie en functionaliteit combineren.',
      buildingDepth: '120 mm',
      glazingThickness: 'Tot 52 mm',
      ufValue: '1,0 W/(m²K)',
      features: [
        'Innovatieve 15° schuinte',
        '3-dichting systeem',
        'STV® lijmtechniek',
        'GEALAN-ACRYLCOLOR® coating'
      ],
      image: windowSystemImage,
      slug: 's9000-base'
    },
    {
      name: 'S-9000 Haax',
      title: 'Robuust & Krachtig',
      description: 'Robuust kozijn rondom 86 mm in aanzicht. Ideaal voor woningen waar stevigheid en duurzaamheid centraal staan.',
      buildingDepth: '120 mm',
      glazingThickness: 'Tot 52 mm',
      ufValue: '1,0 W/(m²K)',
      features: [
        'Robuust blokprofiel design',
        'Maximale stabiliteit',
        'Premium isolatie',
        'Lange levensduur'
      ],
      image: windowSystemImage,
      slug: 's9000-haax'
    },
    {
      name: 'S-9000 Styl',
      title: 'Nederlands Gevelbeeld',
      description: 'Het kozijn dat geniaal past in het Nederlandse gevelbeeld. Traditioneel uiterlijk met moderne technologie.',
      buildingDepth: '120 mm',
      glazingThickness: 'Tot 52 mm', 
      ufValue: '1,0 W/(m²K)',
      features: [
        'Klassiek Nederlands design',
        'Traditionele uitstraling',
        'Moderne isolatiewaarden',
        'Authentiek karakter'
      ],
      image: windowSystemImage,
      slug: 's9000-styl'
    },
    {
      name: 'S-9000 Slim',
      title: 'Strak & Minimalistisch',
      description: 'Het systeem dat zich perfect leent voor strakke moderne gevels. Minimalistische elegantie in optima forma.',
      buildingDepth: '82,5 mm',
      glazingThickness: 'Tot 48 mm',
      ufValue: '1,2 W/(m²K)',
      features: [
        'Slanke profielen',
        'Moderne esthetiek',
        'Compacte bouwdiepte',
        'Strak lijnenspel'
      ],
      image: windowSystemImage,
      slug: 's9000-slim'
    }
  ];

  const technicalFeatures = [
    {
      icon: Thermometer,
      title: 'Thermische Isolatie',
      description: 'Uitstekende isolatiewaarden dankzij het 3-dichting systeem en IKD® isolatieschuim.'
    },
    {
      icon: Shield,
      title: 'Inbraakbeveiliging',
      description: 'Hoge veiligheidsniveaus met gestandaardiseerde veiligheidsbeslag en verstevigingen.'
    },
    {
      icon: Droplets,
      title: 'Waterdichtheid',
      description: 'Optimale bescherming tegen weer en wind door innovatieve dichtingssystemen.'
    },
    {
      icon: Wind,
      title: 'Windbestendigheid',
      description: 'Geteste windbelasting volgens Nederlandse normering voor alle klimaatomstandigheden.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-large mb-6">
              GEALAN S-9000
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Kozijnsystemen
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Ontdek onze complete range GEALAN S-9000 kozijnsystemen. Van slank en modern tot robuust en klassiek - 
              er is altijd een perfecte match voor uw woning.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {productVariants.map((product, index) => (
              <Card key={product.name} className="card-tesla-hero overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-[var(--transition-spring)]"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="mb-4">
                    <h3 className="text-headline mb-2">{product.name}</h3>
                    <p className="text-lg text-primary font-semibold mb-3">{product.title}</p>
                    <p className="text-body text-muted-foreground mb-6">{product.description}</p>
                  </div>

                  {/* Technical Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Inbouwdiepte</div>
                      <div className="font-semibold text-primary">{product.buildingDepth}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Glasdikte</div>
                      <div className="font-semibold text-primary">{product.glazingThickness}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Uf-waarde</div>
                      <div className="font-semibold text-primary">{product.ufValue}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={`/producten/${product.slug}`}>
                    <Button className="btn-hero w-full">
                      Meer Informatie
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display mb-6">Technische Specificaties</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Alle GEALAN S-9000 systemen voldoen aan de hoogste Nederlandse normen en eisen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technicalFeatures.map((feature, index) => (
              <Card key={feature.title} className="card-tesla text-center">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-title mb-3">{feature.title}</h3>
                  <p className="text-body text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/offerte">
              <Button size="lg" className="btn-hero px-8 py-4">
                Vraag een Offerte Aan
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

export default Producten;