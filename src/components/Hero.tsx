import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
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
          title="Premium kozijnen video"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Premium Kozijnen
            <span className="block text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text">
              Compleet Geïnstalleerd
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 md:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
            Ontdek onze GEALAN S-9000 kozijnsystemen met 3-dichting technologie. 
            Superieure isolatie, moderne designs en volledige montageservice.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12 px-4">
            <Link to="/offerte" className="w-full sm:w-auto">
              <Button size="lg" className="btn-hero text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Gratis Offerte Aanvragen
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            
            <Link to="/producten" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm w-full sm:w-auto"
              >
                Bekijk Producten
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
            <div className="flex flex-col items-center space-y-1 sm:space-y-2">
              <div className="glass rounded-full p-2 sm:p-3 mb-1 sm:mb-2">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-center">25+ Jaar Ervaring</h3>
              <p className="text-xs text-white/70 text-center">Bewezen expertise</p>
            </div>
            
            <div className="flex flex-col items-center space-y-1 sm:space-y-2">
              <div className="glass rounded-full p-2 sm:p-3 mb-1 sm:mb-2">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-center">Premium Kwaliteit</h3>
              <p className="text-xs text-white/70 text-center">GEALAN certificering</p>
            </div>
            
            <div className="flex flex-col items-center space-y-1 sm:space-y-2">
              <div className="glass rounded-full p-2 sm:p-3 mb-1 sm:mb-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-center">1000+ Tevreden Klanten</h3>
              <p className="text-xs text-white/70 text-center">Waarom wij de beste keuze zijn</p>
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