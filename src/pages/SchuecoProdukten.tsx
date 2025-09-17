import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

const SchuecoProdukten = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-background via-muted/30 to-background pt-16 md:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-display-large mb-6">
              SCHÜCO
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Kozijnsystemen
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Binnenkort uitgebreid met SCHÜCO kozijnsystemen - innovatieve technologie voor moderne woningen.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="card-tesla-hero">
              <CardContent className="p-12">
                <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-xl inline-flex mb-6">
                  <Construction className="h-12 w-12 text-white" />
                </div>
                
                <h2 className="text-display mb-4">Binnenkort Beschikbaar</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  We zijn hard bezig met het uitbreiden van ons aanbod met SCHÜCO kozijnsystemen. 
                  Deze premium systemen zullen binnenkort beschikbaar zijn met geavanceerde technologie 
                  en superieure prestaties.
                </p>
                
                <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Innovatieve profieltechnologie</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Uitstekende isolatiewaarden</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Moderne designopties</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>Duurzame materialen</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/producten">
                    <Button variant="outline" className="min-w-[200px]">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Terug naar Producten
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button className="btn-hero min-w-[200px]">
                      Informatie Aanvragen
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchuecoProdukten;