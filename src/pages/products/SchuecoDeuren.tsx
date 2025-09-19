import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Footer from '@/components/Footer';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Lock, Home, Star } from 'lucide-react';
import heroImage from '@/assets/schueco-deuren-hero-real.jpg';
import designImage from '@/assets/schueco-deuren-design.jpg';

const SchuecoDeuren = () => {
  const ads90Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '1,2 W/m²K', hasTooltip: true },
    { key: 'ud', label: 'Ud-waarde deur', value: 'tot 0,9 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '90 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '54 mm' },
    { key: 'rc', label: 'Inbraakwering', value: 'RC2/RC3/RC4', hasTooltip: true },
    { key: 'air', label: 'Luchtdoorlatendheid', value: 'Klasse 4', hasTooltip: true }
  ];

  const ads75Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '1,6 W/m²K', hasTooltip: true },
    { key: 'ud', label: 'Ud-waarde deur', value: 'tot 1,2 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '75 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '44 mm' },
    { key: 'rc', label: 'Inbraakwering', value: 'RC2/RC3', hasTooltip: true },
    { key: 'air', label: 'Luchtdoorlatendheid', value: 'Klasse 4', hasTooltip: true }
  ];

  const ads65Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '2,0 W/m²K', hasTooltip: true },
    { key: 'ud', label: 'Ud-waarde deur', value: 'tot 1,6 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '65 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '32 mm' },
    { key: 'rc', label: 'Inbraakwering', value: 'RC2', hasTooltip: true },
    { key: 'air', label: 'Luchtdoorlatendheid', value: 'Klasse 3', hasTooltip: true }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <ResponsiveBreadcrumb />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://www.schueco.com/resource/blob/352482/7e31236a24d1fba017bb903d4f767cd5/morethanaview-stage-video-data.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center min-h-[70vh]">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-display-large mb-6 font-bold">
              SCHÜCO
              <span className="block text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                Deursystemen
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Premium aluminium deursystemen die veiligheid, energie-efficiëntie en design 
              perfect combineren. Van klassieke entree tot moderne architectuur.
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
            <h2 className="text-display mb-4">ADS Serie - Aluminium Door Systems</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              De ADS serie combineert veiligheid met elegantie. Van basis tot premium niveau, 
              met uitstekende isolatie en de hoogste veiligheidscertificeringen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ADS 90.SI Premium */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Title */}
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-3xl font-bold text-white">ADS 90.SI</h3>
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">PREMIUM</span>
                </div>
                <p className="text-lg font-medium text-primary-light">Ultra Premium Entrance</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-x-6 bottom-6 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary-light" />
                      <span className="text-white text-sm font-medium">RC2/RC3/RC4 Inbraakwering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary-light" />
                      <span className="text-white text-sm font-medium">90mm Profieldiepte</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary-light" />
                      <span className="text-white text-sm font-medium">Ud-waarde: 0,9 W/m²K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-primary-light" />
                      <span className="text-white text-sm font-medium">Maximale veiligheid</span>
                    </div>
                  </div>
                  
                  <TechnicalSpecDropdown 
                    title="Volledige Specificaties ADS 90.SI"
                    specs={ads90Specs}
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

            {/* ADS 75.SI Standard */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${designImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Title */}
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-3xl font-bold text-white">ADS 75.SI</h3>
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">STANDARD</span>
                </div>
                <p className="text-lg font-medium text-accent-light">Premium Standard</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-x-6 bottom-6 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-accent-light" />
                      <span className="text-white text-sm font-medium">RC2/RC3 Beveiliging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-accent-light" />
                      <span className="text-white text-sm font-medium">75mm Profieldiepte</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent-light" />
                      <span className="text-white text-sm font-medium">Ud-waarde: 1,2 W/m²K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-accent-light" />
                      <span className="text-white text-sm font-medium">Uitstekende balans</span>
                    </div>
                  </div>
                  
                  <TechnicalSpecDropdown 
                    title="Volledige Specificaties ADS 75.SI"
                    specs={ads75Specs}
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

            {/* ADS 65 Basic */}
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${heroImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Title */}
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-3xl font-bold text-white">ADS 65</h3>
                  <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">BASIS</span>
                </div>
                <p className="text-lg font-medium text-secondary-light">Betrouwbare Basis</p>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-x-6 bottom-6 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-secondary-light" />
                      <span className="text-white text-sm font-medium">RC2 Standaard beveiliging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-secondary-light" />
                      <span className="text-white text-sm font-medium">65mm Profieldiepte</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-secondary-light" />
                      <span className="text-white text-sm font-medium">Ud-waarde: 1,6 W/m²K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-secondary-light" />
                      <span className="text-white text-sm font-medium">Aantrekkelijke prijs</span>
                    </div>
                  </div>
                  
                  <TechnicalSpecDropdown 
                    title="Volledige Specificaties ADS 65"
                    specs={ads65Specs}
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
          </div>
        </div>
      </section>

      {/* Design showcase met echte Schüco afbeelding */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <img 
                src={designImage} 
                alt="Schüco Design Edition deur" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
            </div>
            
            <div>
              <h2 className="text-display mb-6">Design Edition</h2>
              <p className="text-xl text-muted-foreground mb-8">
                De Schüco Design Edition-deur voldoet aan hoge esthetische eisen met een verlichte, 
                vlakke deurgreep in de deurvleugel. Energiebesparende LED-verlichting accentueert het discrete design.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Verlichte deurgreep</h4>
                    <p className="text-muted-foreground text-sm">Geïntegreerde LED-verlichting voor modern design</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Vlakke deurvulling</h4>
                    <p className="text-muted-foreground text-sm">Strak uiterlijk met uitstekende thermische isolatie</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Superieure stabiliteit</h4>
                    <p className="text-muted-foreground text-sm">Robuuste constructie voor lange levensduur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6">Onbeperkte Designmogelijkheden</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Van klassiek tot ultra-modern - SCHÜCO deursystemen passen bij elke architectuurstijl
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-xl inline-flex mb-6">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Klassiek Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tijdloze uitstraling met traditionele verhoudingen en verfijnde details 
                voor authentieke woningarchitectuur.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-accent to-secondary p-6 rounded-xl inline-flex mb-6">
                <Home className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Minimaal</h3>
              <p className="text-muted-foreground leading-relaxed">
                Strakke lijnen en minimale zichtbare profielen voor een 
                contemporary look die past bij moderne architectuur.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-secondary to-primary p-6 rounded-xl inline-flex mb-6">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Veiligheid Geïntegreerd</h3>
              <p className="text-muted-foreground leading-relaxed">
                RC2-RC4 beveiliging vakkundig geïntegreerd zonder afbreuk 
                te doen aan de esthetische uitstraling.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-xl inline-flex mb-6">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kleur & Afwerking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Uitgebreide keuze in RAL-kleuren en speciale afwerkingen 
                voor een perfecte match met uw woning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display mb-6">Veiligheid op het Hoogste Niveau</h2>
              <p className="text-xl text-muted-foreground">
                SCHÜCO deursystemen bieden de hoogste beveiligingsniveaus volgens Europese normen
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-tesla-hero border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <h3 className="text-xl font-semibold">RC2 Standaard</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Basis inbraakwering voor woningen. Bescherming tegen fysieke geweld 
                    met eenvoudig gereedschap.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      <span>3 minuten weerstand</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      <span>Verstevigde sluitkom</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      <span>Veiligheidsglas standaard</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-tesla-hero border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">RC3 Premium</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Uitgebreide beveiliging voor hogere risicogebieden. Weerstand tegen 
                    professioneler gereedschap.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      <span>5 minuten weerstand</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      <span>Meerpuntsluiting</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      <span>P4A veiligheidsglas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-tesla-hero border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-primary to-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                      4
                    </div>
                    <h3 className="text-xl font-semibold">RC4 Ultra</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Maximale beveiliging voor speciale eisen. Bescherming tegen 
                    zwaar gereedschap en ervaren inbrekers.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                      <span>10 minuten weerstand</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                      <span>Verborgen scharnieren</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                      <span>P5A anti-doorslag glas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
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
              Van beveiligingsadvies tot professionele installatie en nazorg - 
              uw veiligheid en comfort staan voorop.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1</div>
                <h3 className="text-xl font-semibold mb-3">Beveiligingsadvies</h3>
                <p className="text-muted-foreground">
                  Uitgebreide risicoanalyse en advies over het juiste 
                  beveiligingsniveau voor uw specifieke situatie.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <h3 className="text-xl font-semibold mb-3">Maatwerk Beveiliging</h3>
                <p className="text-muted-foreground">
                  Precisie fabricage met geïntegreerde beveiligingsfeatures 
                  volgens uw gewenste RC-niveau.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <h3 className="text-xl font-semibold mb-3">Gecertificeerde Montage</h3>
                <p className="text-muted-foreground">
                  Installatie door gecertificeerde monteurs met garantie 
                  op het volledige beveiligingsniveau.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button className="btn-hero min-w-[200px]">
                  Gratis Beveiligingsadvies
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

export default SchuecoDeuren;