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
      action: 'Bel: 085-1234567',
      link: 'tel:0851234567',
      variant: 'secondary'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Chat',
      description: 'Stel uw vragen direct via WhatsApp voor snelle antwoorden.',
      action: 'Start Chat',
      link: 'https://wa.me/31851234567',
      variant: 'secondary'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-display mb-6">
            Klaar voor
            <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"> Nieuwe Kozijnen?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ontdek hoe wij uw woning kunnen transformeren met premium kozijnen en professionele service.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ctaOptions.map((option, index) => (
            <Card key={option.title} className="card-tesla group">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-full mb-6 ${
                  option.variant === 'primary' 
                    ? 'bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-brand)]' 
                    : 'bg-secondary'
                } group-hover:scale-110 transition-[var(--transition-spring)]`}>
                  <option.icon className={`h-8 w-8 ${
                    option.variant === 'primary' ? 'text-white' : 'text-primary'
                  }`} />
                </div>
                
                <h3 className="text-title mb-3">{option.title}</h3>
                <p className="text-body text-muted-foreground mb-6">{option.description}</p>
                
                {option.link.startsWith('http') ? (
                  <a 
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button 
                      className={`w-full ${
                        option.variant === 'primary' ? 'btn-hero' : 'btn-secondary'
                      }`}
                    >
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                ) : option.link.startsWith('tel:') ? (
                  <a href={option.link} className="block">
                    <Button className="btn-secondary w-full">
                      {option.action}
                      <Phone className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                ) : (
                  <Link to={option.link}>
                    <Button 
                      className={`w-full ${
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
        <div className="text-center mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Gratis offerte & advies
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Geen verplichtingen
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              24/7 service beschikbaar
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              10 jaar garantie
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;