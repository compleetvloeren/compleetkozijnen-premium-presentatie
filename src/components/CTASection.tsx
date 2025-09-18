import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Phone, MessageCircle } from 'lucide-react';

const CTASection = () => {
  const ctaOptions = [
    {
      icon: Calculator,
      title: 'Gratis Offerte',
      description: 'Ontvang binnen 24 uur een vrijblijvende offerte op maat.',
      action: 'Offerte Aanvragen',
      link: '/offerte',
      variant: 'primary'
    },
    {
      icon: Phone,
      title: 'Direct Contact',
      description: 'Bel ons voor een persoonlijk advies over uw kozijnproject.',
      action: 'Bel: 085-2502359',
      link: 'tel:0852502359',
      variant: 'secondary'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            Klaar voor
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"> Nieuwe Kozijnen?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Ontdek hoe wij uw woning kunnen transformeren met premium GEALAN en Schüco kozijnen en professionele service.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto justify-center">
          {ctaOptions.map((option, index) => (
            <Card key={option.title} className="card-tesla group h-full">
              <CardContent className="p-4 sm:p-6 md:p-8 text-center flex flex-col h-full">
                <div className={`inline-flex p-3 sm:p-4 rounded-full mb-4 sm:mb-6 ${
                  option.variant === 'primary' 
                    ? 'bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-brand)]' 
                    : 'bg-secondary'
                } group-hover:scale-110 transition-[var(--transition-spring)]`}>
                  <option.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${
                    option.variant === 'primary' ? 'text-white' : 'text-primary'
                  }`} />
                </div>
                
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{option.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed flex-grow">{option.description}</p>
                
                {option.link.startsWith('http') ? (
                  <a 
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-auto"
                  >
                    <Button 
                      className={`w-full h-12 ${
                        option.variant === 'primary' ? 'btn-hero' : 'btn-secondary'
                      }`}
                    >
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                ) : option.link.startsWith('tel:') ? (
                  <a href={option.link} className="block mt-auto">
                    <Button className="btn-secondary w-full h-12">
                      {option.action}
                      <Phone className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                ) : (
                  <Link to={option.link} className="mt-auto">
                    <Button 
                      className={`w-full h-12 ${
                        option.variant === 'primary' ? 'btn-hero' : 'btn-secondary'
                      }`}
                    >
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border">
          <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center items-center gap-4 lg:gap-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
              <span className="text-center">Gratis offerte & advies</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
              <span className="text-center">Geen verplichtingen</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
              <span className="text-center">24/7 service beschikbaar</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
              <span className="text-center">10 jaar garantie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;