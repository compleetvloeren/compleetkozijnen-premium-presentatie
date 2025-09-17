import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import logo from '@/assets/compleet-kozijnen-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Producten',
      links: [
        { name: 'GEALAN S-9000 Base', path: '/producten/s9000-base' },
        { name: 'GEALAN S-9000 Haax', path: '/producten/s9000-haax' },
        { name: 'GEALAN S-9000 Styl', path: '/producten/s9000-styl' },
        { name: 'GEALAN S-9000 Slim', path: '/producten/s9000-slim' },
        { name: 'Hefschuifdeuren', path: '/producten/hefschuifdeuren' }
      ]
    },
    {
      title: 'Service',
      links: [
        { name: 'Installatie Service', path: '/service/installatie' },
        { name: 'Onderhoud', path: '/service/onderhoud' },
        { name: 'Garantie', path: '/service/garantie' },
        { name: 'Reparatie', path: '/service/reparatie' },
        { name: 'Advies op Maat', path: '/service/advies' }
      ]
    },
    {
      title: 'Bedrijf',
      links: [
        { name: 'Over Ons', path: '/over-ons' },
        { name: 'Waarom CompleetKozijnen', path: '/waarom-ons' },
        { name: 'Referenties', path: '/referenties' },
        { name: 'Certificeringen', path: '/certificeringen' },
        { name: 'Carrière', path: '/carriere' }
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Compleet Kozijnen B.V.</h2>
              </div>
              
              <p className="text-lg text-slate-200 max-w-md">
                Het verkopen en monteren van kozijnen. Specialist in premium GEALAN kozijnsystemen. 
                Van advies tot installatie, wij verzorgen het complete proces voor uw droomkozijnen.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Compleet Kozijnen B.V.</p>
                    <p className="text-slate-300">Industrieweg 16</p>
                    <p className="text-slate-300">8304 AD Emmeloord</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:0851234567" className="text-white hover:text-primary transition-colors">
                    085-123 4567
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a 
                    href="mailto:info@compleetkozijnen.nl" 
                    className="text-white hover:text-primary transition-colors"
                  >
                    info@compleetkozijnen.nl
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 text-primary flex items-center justify-center">
                    <span className="text-xs font-bold">KvK</span>
                  </div>
                  <span className="text-white">98302043</span>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-white">Openingstijden</p>
                    <p className="text-slate-300">Ma-Vr: 08:00 - 18:00</p>
                    <p className="text-slate-300">Za: 09:00 - 17:00</p>
                    <p className="text-slate-300">Zo: Gesloten</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link 
                          to={link.path}
                          className="text-slate-300 hover:text-primary transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © {currentYear} Compleet Kozijnen B.V. Alle rechten voorbehouden.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-slate-400 hover:text-primary transition-colors"
              >
                Privacybeleid
              </Link>
              <Link 
                to="/algemene-voorwaarden" 
                className="text-slate-400 hover:text-primary transition-colors"
              >
                Algemene Voorwaarden
              </Link>
              <Link 
                to="/cookies" 
                className="text-slate-400 hover:text-primary transition-colors"
              >
                Cookiebeleid
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-slate-700">
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>GEALAN Gecertificeerd Partner</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>KvK: 98302043</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>BTW: NL123456789B01</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>ISO 9001 Gecertificeerd</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;