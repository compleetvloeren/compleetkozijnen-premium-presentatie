import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Lock, Droplets, Wrench, Star, Clock } from 'lucide-react';
import windowSystemImage from '@/assets/window-system.jpg';
import interiorImage from '@/assets/interior-windows.jpg';
import installationImage from '@/assets/installation-service.jpg';

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
      title: 'GEALAN-ACRYLCOLOR®',
      description: 'Duurzaam kleursysteem met blijvende kleurechtheid en superieure weerbestendigheid.',
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
      title: 'Premium Kwaliteit',
      description: 'Hoogwaardige GEALAN S-9000 systemen, speciaal ontwikkeld voor de Nederlandse markt.',
      specs: 'Duitse engineering'
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
      image: windowSystemImage,
      specs: ['120mm inbouwdiepte', '52mm glasdikte', 'Triple glazing']
    },
    {
      title: 'Premium Wooncomfort',
      description: 'Ervaar het verschil van professionele kozijnen in uw eigen woning.',
      image: interiorImage,
      specs: ['Geluidsreductie', 'Energiebesparing', 'Veiligheid']
    },
    {
      title: 'Professionele Installatie', 
      description: 'Onze ervaren monteurs zorgen voor perfecte installatie zonder zorgen.',
      image: installationImage,
      specs: ['Gecertificeerde monteurs', 'Volledige service', 'Opruimgarantie']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-display mb-6">
            Waarom Kiezen voor
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"> CompleetKozijnen?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ontdek de voordelen van onze premium GEALAN S-9000 kozijnsystemen en complete service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={feature.title} className="card-tesla group">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl shadow-[var(--shadow-brand)] group-hover:scale-110 transition-[var(--transition-spring)]">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-title mb-2">{feature.title}</h3>
                    <p className="text-body text-muted-foreground mb-3">{feature.description}</p>
                    <div className="text-sm font-semibold text-primary">{feature.specs}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {productCards.map((card, index) => (
            <Card key={card.title} className="card-tesla-hero overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-[var(--transition-spring)]"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-title mb-3">{card.title}</h3>
                <p className="text-body text-muted-foreground mb-4">{card.description}</p>
                <div className="space-y-2">
                  {card.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      <span>{spec}</span>
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