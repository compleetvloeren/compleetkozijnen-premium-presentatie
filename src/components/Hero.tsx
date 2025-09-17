import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Moderne luxe woning met premium kozijnen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-display-large mb-6">
            Premium Kozijnen
            <span className="block text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text">
              Compleet Geïnstalleerd
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Ontdek onze GEALAN S-9000 kozijnsystemen met 3-dichting technologie. 
            Superieure isolatie, moderne designs en volledige montageservice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/offerte">
              <Button size="lg" className="btn-hero text-base px-8 py-4">
                Gratis Offerte Aanvragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/producten">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                Bekijk Producten
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <div className="glass rounded-full p-3 mb-2">
                <Shield className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-sm">25+ Jaar Ervaring</h3>
              <p className="text-xs text-white/70">Bewezen expertise</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="glass rounded-full p-3 mb-2">
                <Award className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-sm">Premium Kwaliteit</h3>
              <p className="text-xs text-white/70">GEALAN certificering</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="glass rounded-full p-3 mb-2">
                <Users className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-sm">1000+ Tevreden Klanten</h3>
              <p className="text-xs text-white/70">Waarom wij de beste keuze zijn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;