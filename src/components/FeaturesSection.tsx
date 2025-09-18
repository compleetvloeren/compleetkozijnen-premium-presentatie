import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Lock, Droplets, Wrench, Star, Clock } from 'lucide-react';
import gealanBaseImage from '@/assets/gealan-s9000-base.png';
import interiorImage from '@/assets/interior-windows.jpg';
import installationImage from '@/assets/installation-service.jpg';
import dreiDichtingImage from '@/assets/3-dichting-systeem.jpg';
import stvLijmtechniekImage from '@/assets/stv-lijmtechniek.jpg';
import premiumKleurenImage from '@/assets/premium-kleursystemen.jpg';
import volledigeMontageImage from '@/assets/volledige-montage.jpg';
import premiumMerkenImage from '@/assets/premium-merken.jpg';
import snelleLeveringImage from '@/assets/snelle-levering.jpg';

const FeaturesSection = () => {
  const features = [
    {
      icon: Thermometer,
      title: '3-Dichting Systeem',
      description: 'Optimale thermische isolatie met innovatieve flexibele middendichting voor maximaal wooncomfort.',
      specs: 'Uf-waarde tot 1,0 W/(m²K)'
    },
    {
      icon: Lock,
      title: 'STV® Lijmtechniek',
      description: 'Revolutionaire droge verlijming zorgt voor levenslange sterke verbinding tussen glas en profiel.',
      specs: '40+ jaar bewezen kwaliteit'
    },
    {
      icon: Droplets,
      title: 'Premium Kleursystemen',
      description: 'Duurzame kleursystemen van GEALAN-ACRYLCOLOR® en Schüco met blijvende kleurechtheid.',
      specs: 'Kleurvast voor het leven'
    },
    {
      icon: Wrench,
      title: 'Volledige Montage',
      description: 'Professionele installatie door gecertificeerde monteurs. Van opname tot oplevering.',
      specs: 'Inclusief 10 jaar garantie'
    },
    {
      icon: Star,
      title: 'Premium Merken',
      description: 'Hoogwaardige GEALAN S-9000 en Schüco systemen, geoptimaliseerd voor de Nederlandse markt.',
      specs: 'Duitse & internationale kwaliteit'
    },
    {
      icon: Clock,
      title: 'Snelle Levering',
      description: 'Korte levertijden en flexibele planning. Minimale overlast tijdens de installatie.',
      specs: '2-4 weken levertijd'
    }
  ];

  const productCards = [
    {
      title: 'GEALAN S-9000 Base',
      description: 'Slank kozijn met dieptewerking door 15° schuinte. Perfect voor moderne woningen.',
      image: gealanBaseImage,
      specs: ['120mm inbouwdiepte', '52mm glasdikte', 'Triple glazing']
    },
    {
      title: 'Schüco Raam & Deursystemen',
      description: 'Aluminium systemen met superieure isolatie en moderne esthetiek.',
      image: interiorImage,
      specs: ['Energie-efficiënt', 'Duurzaam aluminium', 'Slank design']
    },
    {
      title: 'Professionele Installatie', 
      description: 'Onze ervaren monteurs zorgen voor perfecte installatie zonder zorgen.',
      image: installationImage,
      specs: ['Gecertificeerde monteurs', 'Volledige service', 'Opruimgarantie']
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            Waarom Kiezen voor
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"> CompleetKozijnen?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ontdek de voordelen van onze premium GEALAN S-9000 en Schüco kozijnsystemen met complete service.
          </p>
        </div>

        {/* Brand Showcase Section */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Onze Premium Merken
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* GEALAN Brand Card */}
            <Card className="card-tesla-hero p-6 md:p-8">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-primary mb-4">GEALAN S-9000</h4>
                <p className="text-muted-foreground mb-4">
                  Duitse premium kwaliteit met innovatieve 3-dichting technologie voor optimale isolatie en comfort.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>3-Dichting systeem</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>STV® Lijmtechniek</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>GEALAN-ACRYLCOLOR®</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Schüco Brand Card */}
            <Card className="card-tesla-hero p-6 md:p-8">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-accent mb-4">Schüco</h4>
                <p className="text-muted-foreground mb-4">
                  Wereldwijd toonaangevend in aluminium raam- en deursystemen met focus op duurzaamheid en design.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span>Aluminium systemen</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span>Energie-efficiënt</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span>Modern design</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          {features.map((feature, index) => (
            <Card key={feature.title} className="relative overflow-hidden h-80 group cursor-pointer border-0 rounded-2xl">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ 
                  backgroundImage: index === 0 ? `url(${dreiDichtingImage})` : 
                                 index === 1 ? `url(${stvLijmtechniekImage})` : 
                                 index === 2 ? `url(${premiumKleurenImage})` :
                                 index === 3 ? `url(${volledigeMontageImage})` :
                                 index === 4 ? `url(${premiumMerkenImage})` :
                                 `url(${snelleLeveringImage})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
              
              {/* Icon and Title */}
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl shadow-[var(--shadow-brand)] mb-4 group-hover:scale-110 transition-[var(--transition-spring)]">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <div className="text-sm font-semibold text-white/90">{feature.specs}</div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-x-6 bottom-6 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/15 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-xl">
                  <p className="text-white text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Product Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {productCards.map((card, index) => (
            <Card key={card.title} className="card-tesla-hero overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-[var(--transition-spring)] bg-white"
                />
              </div>
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{card.description}</p>
                <div className="space-y-3">
                  {card.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      <span className="text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;