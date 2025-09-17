import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Footer from '@/components/Footer';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Thermometer, Shield, Eye, Zap } from 'lucide-react';
import heroImage from '@/assets/schueco-ramen-hero-real.jpg';
import woningImage from '@/assets/schueco-ramen-woning.jpg';

const SchuecoRamen = () => {
  const aws75Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '1,4 W/m²K', hasTooltip: true },
    { key: 'uw', label: 'Uw-waarde totaal', value: 'tot 0,8 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '75 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '44 mm' },
    { key: 'rc', label: 'Inbraakwering', value: 'RC2/RC3', hasTooltip: true },
    { key: 'air', label: 'Luchtdoorlatendheid', value: 'Klasse 4', hasTooltip: true }
  ];

  const aws90Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '1,0 W/m²K', hasTooltip: true },
    { key: 'uw', label: 'Uw-waarde totaal', value: 'tot 0,6 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '90 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '54 mm' },
    { key: 'standard', label: 'Standaard', value: 'Passief Huis geschikt' },
    { key: 'air', label: 'Luchtdoorlatendheid', value: 'Klasse 4', hasTooltip: true }
  ];

  const aws50Specs = [
    { key: 'uf', label: 'Uf-waarde profiel', value: '2,2 W/m²K', hasTooltip: true },
    { key: 'uw', label: 'Uw-waarde totaal', value: 'tot 1,4 W/m²K', hasTooltip: true },
    { key: 'thickness', label: 'Profieldiepte', value: '50 mm' },
    { key: 'glazing', label: 'Max. glasdikte', value: '32 mm' },
    { key: 'rc', label: 'Inbraakwering', value: 'RC2', hasTooltip: true },
    { key: 'air', label: 'Luchtdoorlatendheid', value: 'Klasse 4', hasTooltip: true }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <ResponsiveBreadcrumb />
      
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
                Raamsystemen
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Innovatieve aluminium raamsystemen die comfort, energie-efficiëntie en design perfect combineren. 
              Van basis tot passief huis kwaliteit.
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
            <h2 className="text-display mb-4">AWS Serie - Aluminium Window Systems</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              De AWS serie biedt voor elke behoefte het juiste raamsysteem. Van energie-efficiënt 
              tot passief huis geschikt, met moderne esthetiek en Duitse kwaliteit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AWS 90.SI+ Premium */}
            <Card className="card-tesla-hero">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary to-primary-variant p-4 rounded-xl inline-flex mb-6">
                  <Thermometer className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">AWS 90.SI+</h3>
                <p className="text-lg font-medium text-primary mb-2">Premium Passief Huis</p>
                <p className="text-muted-foreground mb-6">
                  Het topmodel voor maximale energie-efficiëntie. Ideaal voor passief huis en 
                  nieuwbouwprojecten met de hoogste eisen.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profieldiepte:</span>
                    <span className="font-medium">90 mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      <TechnicalTooltip 
                        term="Uf-waarde" 
                        definition="Warmtedoorgangscoëfficiënt van het profiel - hoe lager, hoe beter geïsoleerd"
                      >
                        Uf-waarde:
                      </TechnicalTooltip>
                    </span>
                    <span className="font-medium text-primary">1,0 W/m²K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max. glasdikte:</span>
                    <span className="font-medium">54 mm</span>
                  </div>
                </div>

                <TechnicalSpecDropdown 
                  title="Volledige Specificaties AWS 90.SI+"
                  specs={aws90Specs}
                />
                
                <div className="flex gap-3 mt-6">
                  <Link to="/offerte" className="flex-1">
                    <Button className="w-full">Offerte Aanvragen</Button>
                  </Link>
                  <Link to="/contact" className="flex-1">
                    <Button variant="outline" className="w-full">Info</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* AWS 75.SI+ Standard */}
            <Card className="card-tesla-hero border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-accent to-accent-variant p-4 rounded-xl inline-flex mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-2xl font-semibold">AWS 75.SI+</h3>
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">POPULAIR</span>
                </div>
                <p className="text-lg font-medium text-accent mb-2">Premium Standard</p>
                <p className="text-muted-foreground mb-6">
                  De perfecte balans tussen prestaties en prijs. Uitstekende isolatie met 
                  bewezen kwaliteit voor renovatie en nieuwbouw.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profieldiepte:</span>
                    <span className="font-medium">75 mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      <TechnicalTooltip 
                        term="Uf-waarde" 
                        definition="Warmtedoorgangscoëfficiënt van het profiel - hoe lager, hoe beter geïsoleerd"
                      >
                        Uf-waarde:
                      </TechnicalTooltip>
                    </span>
                    <span className="font-medium text-accent">1,4 W/m²K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max. glasdikte:</span>
                    <span className="font-medium">44 mm</span>
                  </div>
                </div>

                <TechnicalSpecDropdown 
                  title="Volledige Specificaties AWS 75.SI+"
                  specs={aws75Specs}
                />
                
                <div className="flex gap-3 mt-6">
                  <Link to="/offerte" className="flex-1">
                    <Button className="w-full" variant="outline">Offerte Aanvragen</Button>
                  </Link>
                  <Link to="/contact" className="flex-1">
                    <Button variant="secondary" className="w-full">Info</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* AWS 50.NI Basic */}
            <Card className="card-tesla-hero">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-secondary to-secondary-variant p-4 rounded-xl inline-flex mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">AWS 50.NI</h3>
                <p className="text-lg font-medium text-secondary mb-2">Basis Kwaliteit</p>
                <p className="text-muted-foreground mb-6">
                  Betrouwbaar basissysteem voor projecten waar functionaliteit en prijs 
                  voorop staan zonder in te leveren op kwaliteit.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profieldiepte:</span>
                    <span className="font-medium">50 mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      <TechnicalTooltip 
                        term="Uf-waarde" 
                        definition="Warmtedoorgangscoëfficiënt van het profiel - hoe lager, hoe beter geïsoleerd"
                      >
                        Uf-waarde:
                      </TechnicalTooltip>
                    </span>
                    <span className="font-medium text-secondary">2,2 W/m²K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max. glasdikte:</span>
                    <span className="font-medium">32 mm</span>
                  </div>
                </div>

                <TechnicalSpecDropdown 
                  title="Volledige Specificaties AWS 50.NI"
                  specs={aws50Specs}
                />
                
                <div className="flex gap-3 mt-6">
                  <Link to="/offerte" className="flex-1">
                    <Button className="w-full" variant="secondary">Offerte Aanvragen</Button>
                  </Link>
                  <Link to="/contact" className="flex-1">
                    <Button variant="outline" className="w-full">Info</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features met echte Schüco afbeelding */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-display mb-6">De Perfecte Basis</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Aluminium als de perfecte basis. Met een hoge mate van stabiliteit, energiezuinig, 
                met een scala aan kleuren en oppervlakteafwerkingen en smalle aanzichten.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Eigen beslagsysteem Schüco SimplySmart</h4>
                    <p className="text-muted-foreground text-sm">Voldoet aan de hoogste kwaliteitseisen</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Verlijmde hoekoverbrengingen</h4>
                    <p className="text-muted-foreground text-sm">Voor de meest perfecte en stabiele hoekverbindingen</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Asymmetrische profielopbouw</h4>
                    <p className="text-muted-foreground text-sm">Thermische scheiding exact in het midden van de isolatoren</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={woningImage} 
                alt="Schüco ramen in moderne woning" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6">Waarom SCHÜCO Raamsystemen?</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Geavanceerde technologie en Duitse precisie voor maximaal wooncomfort
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-xl inline-flex mb-6">
                <Thermometer className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Superieure Isolatie</h3>
              <p className="text-muted-foreground leading-relaxed">
                Uitstekende Uf-waarden tot 1,0 W/m²K voor maximale energie-efficiëntie 
                en comfort het hele jaar door.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-accent to-secondary p-6 rounded-xl inline-flex mb-6">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Veiligheid & Duurzaamheid</h3>
              <p className="text-muted-foreground leading-relaxed">
                RC2-RC3 inbraakwering standaard en aluminium dat decennia meegaat 
                zonder onderhoud.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-secondary to-primary p-6 rounded-xl inline-flex mb-6">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Design Flexibiliteit</h3>
              <p className="text-muted-foreground leading-relaxed">
                Strakke lijnen en minimale zichtbare profielen voor een moderne 
                uitstraling die past bij elke architectuur.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary-variant to-accent-variant p-6 rounded-xl inline-flex mb-6">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovatieve Technologie</h3>
              <p className="text-muted-foreground leading-relaxed">
                Geavanceerde warmteonderbreking en precisie engineering voor 
                optimale prestaties in alle omstandigheden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display mb-6">Compleet Kozijnen regelt alles van A tot Z</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Van eerste advies tot professionele installatie en nazorg - 
              u hoeft zich nergens zorgen over te maken.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1</div>
                <h3 className="text-xl font-semibold mb-3">Gratis Advies & Meting</h3>
                <p className="text-muted-foreground">
                  Persoonlijk advies op locatie met exacte opmeting en 
                  transparante offerte zonder verrassingen.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <h3 className="text-xl font-semibold mb-3">Maatwerk Productie</h3>
                <p className="text-muted-foreground">
                  Precisie fabricage van uw SCHÜCO kozijnen volgens de hoogste 
                  kwaliteitseisen en uw specifieke wensen.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <h3 className="text-xl font-semibold mb-3">Professionele Installatie</h3>
                <p className="text-muted-foreground">
                  Vakkundige montage door onze ervaren monteurs met 
                  garantie op materiaal en uitvoering.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offerte">
                <Button className="btn-hero min-w-[200px]">
                  Gratis Offerte Aanvragen
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

export default SchuecoRamen;