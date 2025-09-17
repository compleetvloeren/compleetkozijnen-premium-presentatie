import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Maximize2, Sun, Wind, Layers } from 'lucide-react';
import heroImage from '@/assets/schueco-schuifdeuren-hero-hq.jpg';
import voorbeeldImage from '@/assets/schueco-schuif-voorbeeld.jpg';
import ase80CardImage from '@/assets/schueco-sliding-premium.jpg';
import ass77CardImage from '@/assets/schueco-schuif-voorbeeld.jpg';
import ase67CardImage from '@/assets/schueco-sliding-hero.jpg';

const SchuecoSchuifdeuren = () => {
  const ase80Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '1,3 W/m²K', hasTooltip: true },
    { key: 'uw', label: 'Uw-waarde totaal', value: 'tot 0,9 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '80 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '48 mm' },
    { key: 'maxsize', label: 'Max. vlakafmeting', value: '3,0 x 2,5 m' },
    { key: 'weight', label: 'Max. vlakgewicht', value: '400 kg' }
  ];

  const ass77Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '1,8 W/m²K', hasTooltip: true },
    { key: 'uw', label: 'Uw-waarde totaal', value: 'tot 1,2 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '77 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '40 mm' },
    { key: 'maxsize', label: 'Max. vlakafmeting', value: '2,5 x 2,3 m' },
    { key: 'weight', label: 'Max. vlakgewicht', value: '300 kg' }
  ];

  const ase67Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '2,4 W/m²K', hasTooltip: true },
    { key: 'uw', label: 'Uw-waarde totaal', value: 'tot 1,6 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '67 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '32 mm' },
    { key: 'maxsize', label: 'Max. vlakafmeting', value: '2,2 x 2,0 m' },
    { key: 'weight', label: 'Max. vlakgewicht', value: '200 kg' }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center min-h-[70vh]">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-display-large mb-6 font-bold">
              SCHÜCO
              <span className="block text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                Schuifdeuren & Vouwwanden
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Naadloze verbinding tussen binnen en buiten met maximale glasoppervlakken. 
              Van panoramische schuifdeuren tot elegante vouwwanden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button className="btn-hero min-w-[200px]">
                  Gratis Offerte Aanvragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display mb-4">ASE/ASS Serie - Advanced Sliding Systems</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Innovatieve schuif- en vouwsystemen voor maximale transparantie en ruimtelijkheid. 
              Van hef-schuifdeuren tot panoramische vouwwanden.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ASE 80.HI Premium */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${ase80CardImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Title */}
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-3xl font-bold text-white">ASE 80.HI</h3>
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">PREMIUM</span>
                </div>
                <p className="text-lg font-medium text-primary-light">Hef-schuif & Vouwwanden</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-x-6 bottom-6 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4 text-primary-light" />
                      <span className="text-white text-sm font-medium">400kg per vleugel - Schuifdeuren</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary-light" />
                      <span className="text-white text-sm font-medium">Vouwwanden tot 7 meter breed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-primary-light" />
                      <span className="text-white text-sm font-medium">Hydraulische hefmechanica</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-primary-light" />
                      <span className="text-white text-sm font-medium">Uw-waarde: 0,9 W/m²K</span>
                    </div>
                  </div>
                  
                  <TechnicalSpecDropdown 
                    title="Volledige Specificaties ASE 80.HI"
                    specs={ase80Specs}
                  />
                  
                  <div className="flex gap-3 mt-4">
                    <Link to="/offerte" className="flex-1">
                      <Button className="w-full text-sm">Offerte</Button>
                    </Link>
                    <Link to="/contact" className="flex-1">
                      <Button variant="outline" className="w-full text-sm bg-white/10 border-white/30 text-white hover:bg-white/20">Info</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ASS 77.PD Panorama */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${ass77CardImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Title */}
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-3xl font-bold text-white mb-2">ASS 77.PD</h3>
                <p className="text-lg font-medium text-accent-light">Schuifdeuren & Vouwwanden</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-x-6 bottom-6 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-accent-light" />
                      <span className="text-white text-sm font-medium">Panoramische schuifdeuren</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-accent-light" />
                      <span className="text-white text-sm font-medium">Vouwwanden 2-7 vleugels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4 text-accent-light" />
                      <span className="text-white text-sm font-medium">300kg per vleugel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-accent-light" />
                      <span className="text-white text-sm font-medium">Uw-waarde: 1,2 W/m²K</span>
                    </div>
                  </div>
                  
                  <TechnicalSpecDropdown 
                    title="Volledige Specificaties ASS 77.PD"
                    specs={ass77Specs}
                  />
                  
                  <div className="flex gap-3 mt-4">
                    <Link to="/offerte" className="flex-1">
                      <Button className="w-full text-sm" variant="outline">Offerte</Button>
                    </Link>
                    <Link to="/contact" className="flex-1">
                      <Button variant="secondary" className="w-full text-sm">Info</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ASE 67.PD Basic */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${ase67CardImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Title */}
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-3xl font-bold text-white mb-2">ASE 67.PD</h3>
                <p className="text-lg font-medium text-secondary-light">Basis Schuif & Vouw</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-x-6 bottom-6 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-secondary-light" />
                      <span className="text-white text-sm font-medium">Standaard schuifdeuren</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-secondary-light" />
                      <span className="text-white text-sm font-medium">Compacte vouwwanden</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize2 className="h-4 w-4 text-secondary-light" />
                      <span className="text-white text-sm font-medium">200kg per vleugel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-secondary-light" />
                      <span className="text-white text-sm font-medium">Uw-waarde: 1,6 W/m²K</span>
                    </div>
                  </div>
                  
                  <TechnicalSpecDropdown 
                    title="Volledige Specificaties ASE 67.PD"
                    specs={ase67Specs}
                  />
                  
                  <div className="flex gap-3 mt-4">
                    <Link to="/offerte" className="flex-1">
                      <Button className="w-full text-sm" variant="secondary">Offerte</Button>
                    </Link>
                    <Link to="/contact" className="flex-1">
                      <Button variant="outline" className="w-full text-sm bg-white/10 border-white/30 text-white hover:bg-white/20">Info</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voorbeeld showcase met echte Schüco afbeelding */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-display mb-6">Innovatieve Technologie voor Maximaal Comfort</h2>
              <p className="text-xl text-muted-foreground mb-8">
                SCHÜCO schuifsystemen combineren elegantie met geavanceerde techniek voor ultiem gebruiksgemak. 
                Grote glasoppervlakken zorgen voor een naadloze verbinding tussen binnen en buiten.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Schuifdeuren vs Vouwwanden</h4>
                    <p className="text-muted-foreground text-sm">Schuifdeuren bestaan uit grote delen die horizontaal schuiven</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Vouwwanden</h4>
                    <p className="text-muted-foreground text-sm">Vouwen als harmonica in elkaar voor volledige opening</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Hydraulische ondersteuning</h4>
                    <p className="text-muted-foreground text-sm">Moeiteloze bediening ook bij zware glaspartijen</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={voorbeeldImage} 
                alt="Schüco schuifdeuren voorbeeld" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6">Innovatieve Features</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Geavanceerde technologie voor optimaal gebruiksgemak en comfort
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-xl inline-flex mb-6">
                <Maximize2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Maximale Glasoppervlakken</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tot 400kg per vleugel mogelijk voor enorme glaspartijen en 
                panoramische uitzichten zonder beperkingen.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-accent to-secondary p-6 rounded-xl inline-flex mb-6">
                <Wind className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Soepele Bediening</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hydraulische hefmechanica en precisie loopsystemen 
                zorgen voor moeiteloze bediening zelfs bij zware vleugels.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-secondary to-primary p-6 rounded-xl inline-flex mb-6">
                <Sun className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Optimale Dichting</h3>
              <p className="text-muted-foreground leading-relaxed">
                Geavanceerde afdichtingssystemen voor uitstekende 
                isolatie en bescherming tegen weer en wind.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary-variant to-accent-variant p-6 rounded-xl inline-flex mb-6">
                <Layers className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modulair Systeem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Flexibele configuraties van 2-vleugelig tot grote 
                panoramawanden volgens uw specifieke wensen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display mb-6">De Voordelen van SCHÜCO Schuifsystemen</h2>
              <p className="text-xl text-muted-foreground">
                Waarom kiezen voor SCHÜCO schuifdeuren en vouwwanden?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Voor Bewoners</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Maximale Ruimtelijkheid</h4>
                      <p className="text-muted-foreground text-sm">
                        Naadloze overgang tussen binnen en buiten creëert een gevoel van eindeloze ruimte
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Optimaal Daglicht</h4>
                      <p className="text-muted-foreground text-sm">
                        Grote glasoppervlakken zorgen voor maximale lichtinval en verbinding met de natuur
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Gebruiksgemak</h4>
                      <p className="text-muted-foreground text-sm">
                        Hydraulische ondersteuning maakt ook zware vleugels moeiteloos bedienbaar
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Energie-efficiënt</h4>
                      <p className="text-muted-foreground text-sm">
                        Uitstekende isolatiewaarden tot Uw 0,9 W/m²K voor lagere energiekosten
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6">Voor Architecten</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Ontwerpvrijheid</h4>
                      <p className="text-muted-foreground text-sm">
                        Minimale zichtbare profielen en maximale glasoppervlakken voor pure esthetiek
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Technische Prestaties</h4>
                      <p className="text-muted-foreground text-sm">
                        Bewezen Duitse kwaliteit met certificeringen voor wind-, water- en luchtdichtheid
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Configuratiemogelijkheden</h4>
                      <p className="text-muted-foreground text-sm">
                        Van 2-vleugelig tot complexe panoramawanden - alles is mogelijk
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Duurzaamheid</h4>
                      <p className="text-muted-foreground text-sm">
                        Langdurige prestaties met minimaal onderhoud voor levenslange garantie
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display mb-6">Compleet Kozijnen regelt alles van A tot Z</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Van ontwerp tot installatie en nazorg - wij zorgen voor een perfecte realisatie 
              van uw schuifsysteem dromen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1</div>
                <h3 className="text-xl font-semibold mb-3">Design & Advies</h3>
                <p className="text-muted-foreground">
                  Architecturaal advies en 3D visualisaties voor het perfecte 
                  schuifsysteem bij uw woning en lifestyle.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <h3 className="text-xl font-semibold mb-3">Precisie Engineering</h3>
                <p className="text-muted-foreground">
                  Maatwerk fabricage met millimeter-precisie voor perfecte 
                  pasvorm en optimale werking.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <h3 className="text-xl font-semibold mb-3">Expert Installatie</h3>
                <p className="text-muted-foreground">
                  Professionele montage door specialisten met jarenlange 
                  ervaring in complexe schuifsystemen.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button className="btn-hero min-w-[200px]">
                  Gratis Design Consult
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/producten/schueco">
                <Button variant="outline" className="min-w-[200px]">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Terug naar SCHÜCO Overzicht
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchuecoSchuifdeuren;