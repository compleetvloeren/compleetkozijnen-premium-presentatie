import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Thermometer, Shield, Droplets, Wind, Eye, Settings, Zap, Award } from 'lucide-react';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import { getTechnicalTerm } from '@/lib/technicalGlossary';
import gealanBaseImage from '@/assets/gealan-s9000-base.png';
import gealanHaaxImage from '@/assets/gealan-s9000-haax.png';
import gealanStylImage from '@/assets/gealan-s9000-styl.png';
import gealanSlimImage from '@/assets/gealan-s9000-slim.png';
import gealanHaaxProfile from '@/assets/gealan-s9000-haax-profile.png';
import gealanStylProfile from '@/assets/gealan-s9000-styl-profile.png';
import gealanSlimProfile from '@/assets/gealan-s9000-slim-profile.png';

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
        'Innovatieve 15° schuinte voor dieptewerking',
        '3-dichting systeem voor optimale isolatie',
        'STV® lijmtechniek voor levenslange stevigheid',
        'GEALAN-ACRYLCOLOR® coating voor duurzaamheid',
        '5-kamer technologie',
        'IKD® isolatieschuim voor topkwaliteit'
      ],
      technicalSpecs: {
        kamers: '5-kamer profiel',
        dichting: '3-dichting systeem',
        schuinte: '15° schuinte onder',
        glassysteem: 'Tot 54 mm met STV®',
        kleursysteem: 'GEALAN-ACRYLCOLOR®'
      },
      image: gealanBaseImage,
      slug: 's9000-base',
      profileImage: gealanBaseImage
    },
    {
      name: 'S-9000 Haax',  
      title: 'Robuust & Krachtig',
      description: 'Robuust blokprofiel kozijn rondom 86 mm in aanzicht. Ideaal voor woningen waar stevigheid en duurzaamheid centraal staan.',
      buildingDepth: '120 mm',
      glazingThickness: 'Tot 52 mm',
      ufValue: '1,0 W/(m²K)',
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
      image: gealanHaaxImage,
      slug: 's9000-haax',
      profileImage: gealanHaaxProfile
    },
    {
      name: 'S-9000 Styl',
      title: 'Nederlands Gevelbeeld', 
      description: 'Het kozijn dat geniaal past in het Nederlandse gevelbeeld. Traditioneel uiterlijk met moderne technologie voor authentiek karakter.',
      buildingDepth: '120 mm',
      glazingThickness: 'Tot 52 mm',
      ufValue: '1,0 W/(m²K)',
      features: [
        'Klassiek Nederlands design voor authentieke uitstraling',
        'Combinatie 4° en 15° schuintes',
        'Traditionele uitstraling met moderne prestaties',
        'Perfecte integratie in Nederlandse architectuur',
        'Moderne isolatiewaarden in klassiek jasje',
        'Bewezen kwaliteit voor Nederlandse omstandigheden'
      ],
      technicalSpecs: {
        kamers: '5-kamer profiel',
        dichting: '3-dichting systeem', 
        schuinte: '4° en 15° schuinte combinatie',
        design: 'Nederlandse gevel geoptimaliseerd',
        compatibiliteit: 'Traditionele architectuur'
      },
      image: gealanStylImage,
      slug: 's9000-styl',
      profileImage: gealanStylProfile
    },
    {
      name: 'S-9000 Slim',
      title: 'Strak & Minimalistisch',
      description: 'Het systeem dat zich perfect leent voor strakke moderne gevels. Minimalistische elegantie met vlakke optiek in compacte bouwdiepte.',
      buildingDepth: '82,5 mm',
      glazingThickness: 'Tot 48 mm',
      ufValue: '1,2 W/(m²K)', 
      features: [
        'Slanke profielen voor minimalistisch design',
        'Compacte 82,5 mm bouwdiepte',
        'Vlakke optiek zonder compromissen',
        'Moderne esthetiek voor contemporary woningen',
        'Strak lijnenspel en cleane afwerking',
        'Ook geschikt voor wisselopeningen'
      ],
      technicalSpecs: {
        kamers: '5-kamer profiel',
        dichting: '3-dichting systeem',
        bouwdiepte: 'Compacte 82,5 mm bouwdiepte', 
        design: 'Vlakke optiek',
        toepassing: 'Wisselopeningen mogelijk'
      },
      image: gealanSlimImage,
      slug: 's9000-slim', 
      profileImage: gealanSlimProfile
    }
  ];

  const technicalFeatures = [
    {
      icon: Thermometer,
      title: 'Thermische Isolatie',
      description: 'Uitstekende isolatiewaarden dankzij het 3-dichting systeem en IKD® isolatieschuim voor maximaal wooncomfort.',
      specs: 'Uf-waarde tot 1,0 W/(m²K)'
    },
    {
      icon: Shield,
      title: 'Inbraakbeveiliging',
      description: 'Hoge veiligheidsniveaus met gestandaardiseerde veiligheidsbeslag en verstevigingen volgens Nederlandse normen.',
      specs: 'RC1-RC3 certificering mogelijk'
    },
    {
      icon: Droplets,
      title: 'Waterdichtheid',
      description: 'Optimale bescherming tegen weer en wind door innovatieve dichtingssystemen en perfecte waterafvoer.',
      specs: 'Klasse 9A waterdichtheid'
    },
    {
      icon: Wind,
      title: 'Windbestendigheid', 
      description: 'Geteste windbelasting volgens Nederlandse normering voor alle klimaatomstandigheden.',
      specs: 'Klasse C5/B5 windbelasting'
    },
    {
      icon: Eye,
      title: 'Design Flexibiliteit',
      description: 'Vier verschillende profielvarianten voor elke architectuurstijl en persoonlijke voorkeur.',
      specs: '4 designvarianten beschikbaar'
    },
    {
      icon: Settings,
      title: 'Montage Service',
      description: 'Professionele installatie door gecertificeerde monteurs van opname tot oplevering.',
      specs: '10 jaar garantie inclusief'
    },
    {
      icon: Zap,
      title: 'Energie Efficiëntie',
      description: 'Maximale energiebesparing door 5-kamer technologie en triple glazing mogelijkheden.',
      specs: 'Tot 54mm glaspakket mogelijk'
    },
    {
      icon: Award,
      title: 'Kwaliteitsgarantie',
      description: 'Duitse engineering kwaliteit met 40+ jaar bewezen GEALAN-ACRYLCOLOR® technologie.',
      specs: 'Levenslange kleurechtheid'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Video Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden pt-16 md:pt-20">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1119535890?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&background=1"
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30" />
        </div>
      </section>

      {/* Title and Content Section */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/30">
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
              er is altijd een perfecte match voor uw woning. Speciaal ontwikkeld voor de Nederlandse markt met 
              <TechnicalTooltip {...getTechnicalTerm('3-dichting-systeem')}>
                <span className="font-semibold"> 3-dichting systeem</span>
              </TechnicalTooltip> en 
              <TechnicalTooltip {...getTechnicalTerm('5-kamertechnologie')}>
                <span className="font-semibold"> 5-kamer technologie</span>
              </TechnicalTooltip>.
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
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={product.image}
                    alt={`${product.name} - ${product.title}`}
                    className="w-full h-full object-contain bg-gradient-to-br from-muted/30 to-background p-8 group-hover:scale-105 transition-[var(--transition-spring)]"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.name}
                  </div>
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
                      <div className="text-sm text-muted-foreground">
                        <TechnicalTooltip {...getTechnicalTerm('inbouwdiepte')}>
                          <span>Inbouwdiepte</span>
                        </TechnicalTooltip>
                      </div>
                      <div className="font-semibold text-primary">{product.buildingDepth}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">
                        <TechnicalTooltip {...getTechnicalTerm('glasdikte')}>
                          <span>Glasdikte</span>
                        </TechnicalTooltip>
                      </div>
                      <div className="font-semibold text-primary">{product.glazingThickness}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">
                        <TechnicalTooltip {...getTechnicalTerm('uf-waarde')}>
                          <span>Uf-waarde</span>
                        </TechnicalTooltip>
                      </div>
                      <div className="font-semibold text-primary">{product.ufValue}</div>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
                    <h4 className="font-semibold mb-3 text-primary">Technische Specificaties</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {Object.entries(product.technicalSpecs).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
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

                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to={`/producten/${product.slug}`} className="flex-1">
                      <Button className="btn-hero w-full">
                        Meer Informatie
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <a 
                      href="/brochures/S-9000-NL-algemeen.pdf" 
                      download 
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        📄 Brochure Downloaden
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-6">
              Technische 
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Excellentie
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ontdek de geavanceerde technologieën die onze GEALAN S-9000 systemen tot de beste keuze maken
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {technicalFeatures.slice(0, 6).map((feature, index) => (
              <Card key={feature.title} className="card-tesla-hero group hover:shadow-lg transition-[var(--transition-spring)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-lg shrink-0 group-hover:scale-105 transition-[var(--transition-spring)]">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-title mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{feature.description}</p>
                      <div className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 inline-block">
                        {feature.specs}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Technologies Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-tesla-hero text-center">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-title mb-3">
                  <TechnicalTooltip {...getTechnicalTerm('stv-lijmtechniek')}>
                    <span>STV® Lijmtechniek</span>
                  </TechnicalTooltip>
                </h3>
                <p className="text-body text-muted-foreground">
                  Revolutionaire droge verlijming zorgt voor levenslange sterke verbinding tussen glas en profiel. 
                  40+ jaar bewezen kwaliteit voor maximale duurzaamheid.
                </p>
              </CardContent>
            </Card>

            <Card className="card-tesla-hero text-center">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-title mb-3">
                  <TechnicalTooltip {...getTechnicalTerm('gealan-acrylcolor')}>
                    <span>GEALAN-ACRYLCOLOR®</span>
                  </TechnicalTooltip>
                </h3>
                <p className="text-body text-muted-foreground">
                  Duurzaam kleursysteem met blijvende kleurechtheid en superieure weerbestendigheid. 
                  Kleurvast voor het leven in alle weersomstandigheden.
                </p>
              </CardContent>
            </Card>

            <Card className="card-tesla-hero text-center">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl inline-flex mb-4">
                  <Thermometer className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-title mb-3">
                  <TechnicalTooltip {...getTechnicalTerm('ikd-isolatieschuim')}>
                    <span>IKD® Isolatieschuim</span>
                  </TechnicalTooltip>
                </h3>
                <p className="text-body text-muted-foreground">
                  Speciale isolatie-profielen verbeteren de thermische eigenschappen nog verder. 
                  Voor de beste energiezuinige kozijnen op de markt.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/offerte">
                <Button size="lg" className="btn-hero px-8 py-4">
                  Vraag een Offerte Aan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="/brochures/Gealan-S9000-NL-technisch.pdf" download>
                <Button size="lg" variant="outline" className="px-8 py-4">
                  📄 Technische Brochure
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Producten;