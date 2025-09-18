import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Shield, Zap, Leaf, Eye } from 'lucide-react';
import gealanHouseImage from '@/assets/gealan-house-modern.jpg';
import schuecoImage from '@/assets/schueco-windows-modern.jpg';

const BrandShowcase = () => {
  const brands = [
    {
      name: 'GEALAN',
      title: 'Duitse Premiumkwaliteit',
      description: 'GEALAN staat voor innovatieve kunststof kozijnsystemen met bewezen Duitse kwaliteit. Het S-9000 systeem is speciaal ontwikkeld voor de Nederlandse markt met focus op maximale isolatie en comfort.',
      features: [
        '3-Dichting technologie voor optimale isolatie',
        'STV® lijmtechniek voor levenslange verbinding',
        'GEALAN-ACRYLCOLOR® voor kleurvaste afwerking',
        'Tot 52mm glasdikte mogelijk'
      ],
      specs: {
        isolatie: 'Uf-waarde tot 1,0 W/(m²K)',
        veiligheid: 'RC1-RC3 certificering mogelijk',
        dichtheid: 'Klasse 9A waterdichtheid',
        windbelasting: 'Klasse C5/B5 windbestendigheid'
      },
      route: '/producten/gealan',
      status: 'Beschikbaar',
      image: gealanHouseImage,
      material: 'Kunststof'
    },
    {
      name: 'SCHÜCO',
      title: 'Innovatieve Technologie',
      description: 'Schüco is wereldwijd toonaangevend in aluminium raam-, deur- en geveloplossingen. Met focus op duurzaamheid, energie-efficiëntie en modern design biedt Schüco systemen voor elke architecturale uitdaging.',
      features: [
        'Duurzame aluminium systemen',
        'Superieure thermische onderbreking',
        'Slank design met grote glasoppervlakken',
        'Uitstekende veiligheid en inbraakwerendheid'
      ],
      specs: {
        isolatie: 'Uf-waarde tot 1,0 W/(m²K)',
        veiligheid: 'RC2-RC4 certificering',
        dichtheid: 'Klasse 4 luchtdichtheid',
        windbelasting: 'Premium windbestendigheid'
      },
      route: '/producten/schueco',
      status: 'Beschikbaar',
      image: schuecoImage,
      material: 'Aluminium'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Twee Premium Merken,
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"> Één Expert</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Als gecertificeerd partner van zowel GEALAN als Schüco bieden wij u de beste kozijnsystemen 
            voor elke toepassing en elk budget.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
          {brands.map((brand, index) => (
            <div key={brand.name} className="group relative overflow-hidden rounded-2xl h-[600px] cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${brand.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Brand Header */}
              <div className="absolute top-6 left-6 z-10">
                <h2 className="text-4xl font-bold text-white mb-2">{brand.name}</h2>
                <p className="text-white/80 text-lg">{brand.material} Specialist</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    brand.status === 'Beschikbaar' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                  }`}>
                    {brand.status}
                  </span>
                </div>
              </div>

              {/* Always Visible Info */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-2xl font-semibold text-white mb-2">{brand.title}</h3>
                <p className="text-white/90 text-sm mb-4">{brand.description}</p>
                
                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(brand.specs).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="text-xs text-white/70 mb-1 capitalize">{key}</div>
                      <div className="font-semibold text-white text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 z-50">
                <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 max-w-md z-50">
                  <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-2xl">
                    <h4 className="text-xl font-semibold mb-4">Kenmerken & Specificaties</h4>
                    
                    {/* All Technical Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {Object.entries(brand.specs).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-xs text-white/70 mb-1 capitalize">{key}</div>
                          <div className="font-semibold text-white text-sm">{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 text-sm mb-6 text-left">
                      {brand.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <Link to={brand.route} className="block">
                        <Button 
                          className="w-full bg-white text-black hover:bg-white/90"
                          disabled={brand.status !== 'Beschikbaar'}
                        >
                          {brand.status === 'Beschikbaar' ? 'Bekijk Producten' : 'Binnenkort Beschikbaar'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      
                      {brand.status === 'Beschikbaar' && (
                        <Link to="/offerte" className="block">
                          <Button variant="outline" className="w-full border-white/40 text-white bg-white/10 hover:bg-white hover:text-black">
                            Vrijblijvende Offerte
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* View Icon */}
              <div className="absolute top-6 right-6 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Both Brands */}
        <Card className="card-tesla bg-gradient-to-br from-background to-muted/30">
          <CardContent className="p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Waarom wij beide merken aanbieden?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              Elke woning is uniek en heeft verschillende behoeften. Door zowel GEALAN als Schüco aan te bieden, 
              kunnen wij voor elke situatie de perfecte oplossing bieden - van klassieke woningen tot ultramoderne architectuur.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">GEALAN S-9000</h4>
                <p className="text-sm text-muted-foreground">Perfect voor renovatie en nieuwbouw met focus op isolatie</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Schüco Aluminium</h4>
                <p className="text-sm text-muted-foreground">Ideaal voor moderne architectuur en grote glasoppervlakken</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Expert Advies</h4>
                <p className="text-sm text-muted-foreground">Wij helpen u de juiste keuze maken voor uw project</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BrandShowcase;