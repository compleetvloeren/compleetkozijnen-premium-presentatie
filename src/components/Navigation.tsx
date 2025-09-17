import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/compleet-kozijnen-logo.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Producten', path: '/producten' },
    { name: 'Over Ons', path: '/over-ons' },
    { name: 'Service', path: '/service' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-start">
            <img 
              src={logo} 
              alt="CompleetKozijnen.nl"
              className="h-full w-auto max-h-14 md:max-h-16 object-contain scale-150 md:scale-125"
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-body font-medium transition-[var(--transition-smooth)] hover:text-white relative ${
                  isActive(item.path) 
                    ? 'text-white font-semibold' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link to="/offerte">
              <Button className="btn-hero text-sm">
                Gratis Offerte
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-background/98 backdrop-blur-xl rounded-3xl mt-4 border border-border/30 shadow-[var(--shadow-elegant)] mx-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-2xl text-body font-medium transition-[var(--transition-smooth)] animate-fade-in ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10 shadow-sm font-semibold'
                      : 'text-foreground hover:text-primary hover:bg-muted/30 hover:scale-[1.02]'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/20">
                <Link to="/offerte" onClick={() => setIsMenuOpen(false)}>
                  <Button className="btn-hero w-full text-base py-4 rounded-2xl hover:scale-[1.02] transition-transform">
                    Gratis Offerte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;