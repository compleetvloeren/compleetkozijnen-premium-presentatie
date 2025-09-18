import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Shield, Zap, Leaf } from 'lucide-react';

const BrandShowcase = () => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* GEALAN Section */}
          <Card className="card-tesla-hero overflow-hidden">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary p-3 rounded-xl mr-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">GEALAN S-9000</h3>
                  <p className="text-sm text-muted-foreground">Duitse kwaliteit sinds 1965</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                GEALAN staat voor innovatieve kunststof kozijnsystemen met bewezen Duitse kwaliteit. 
                Het S-9000 systeem is speciaal ontwikkeld voor de Nederlandse markt met focus op 
                maximale isolatie en comfort.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">3-Dichting technologie voor optimale isolatie</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">STV® lijmtechniek voor levenslange verbinding</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">GEALAN-ACRYLCOLOR® voor kleurvaste afwerking</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm">Tot 52mm glasdikte mogelijk</span>
                </div>
              </div>

              <Link to="/producten/gealan">
                <Button className="w-full">
                  Ontdek GEALAN Systemen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Schüco Section */}
          <Card className="card-tesla-hero overflow-hidden">
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-accent p-3 rounded-xl mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-accent">Schüco</h3>
                  <p className="text-sm text-muted-foreground">Wereldwijd marktleider sinds 1951</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Schüco is wereldwijd toonaangevend in aluminium raam-, deur- en geveloplossingen. 
                Met focus op duurzaamheid, energie-efficiëntie en modern design biedt Schüco 
                systemen voor elke architecturale uitdaging.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-accent mr-3" />
                  <span className="text-sm">Duurzame aluminium systemen</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-accent mr-3" />
                  <span className="text-sm">Superieure thermische onderbreking</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-accent mr-3" />
                  <span className="text-sm">Slank design met grote glasoppervlakken</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-accent mr-3" />
                  <span className="text-sm">Uitstekende veiligheid en inbraakwerendheid</span>
                </div>
              </div>

              <Link to="/producten/schueco">
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white">
                  Ontdek Schüco Systemen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
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