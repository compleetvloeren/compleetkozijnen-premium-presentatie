import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TechnicalSpecDropdown from '@/components/TechnicalSpecDropdown';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Maximize2, Sun, Wind, Layers } from 'lucide-react';
import heroImage from '@/assets/schueco-schuif-hero-real.jpg';
import voorbeeldImage from '@/assets/schueco-schuif-voorbeeld.jpg';

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
            <Card className="card-tesla-hero border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary to-primary-variant p-4 rounded-xl inline-flex mb-6">
                  <Maximize2 className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-2xl font-semibold">ASE 80.HI</h3>
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">PREMIUM</span>
                </div>
                <p className="text-lg font-medium text-primary mb-2">Hef-schuifsysteem Ultra</p>
                <p className="text-muted-foreground mb-6">
                  Het topmodel voor maximale glasoppervlakken tot 400kg per vleugel. 
                  Hydraulische hefmechanica voor moeiteloze bediening.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profieldiepte:</span>
                    <span className="font-medium">80 mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      <TechnicalTooltip 
                        term="Uw-waarde" 
                        definition="Warmtedoorgangscoëfficiënt van het complete element - hoe lager, hoe beter geïsoleerd"
                      >
                        Uw-waarde:
                      </TechnicalTooltip>
                    </span>
                    <span className="font-medium text-primary">0,9 W/m²K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max. vlakgewicht:</span>
                    <span className="font-medium text-primary">400 kg</span>
                  </div>
                </div>

                <TechnicalSpecDropdown 
                  title="Volledige Specificaties ASE 80.HI"
                  specs={ase80Specs}
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

            {/* ASS 77.PD Panorama */}
            <Card className="card-tesla-hero">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-accent to-accent-variant p-4 rounded-xl inline-flex mb-6">
                  <Sun className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">ASS 77.PD</h3>
                <p className="text-lg font-medium text-accent mb-2">Panorama Schuifdeuren</p>
                <p className="text-muted-foreground mb-6">
                  Elegante schuifdeuren voor grote glaspartijen. Perfect voor terrassen 
                  en tuindeuren met strak modern design.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profieldiepte:</span>
                    <span className="font-medium">77 mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      <TechnicalTooltip 
                        term="Uw-waarde" 
                        definition="Warmtedoorgangscoëfficiënt van het complete element - hoe lager, hoe beter geïsoleerd"
                      >
                        Uw-waarde:
                      </TechnicalTooltip>
                    </span>
                    <span className="font-medium text-accent">1,2 W/m²K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max. vlakgewicht:</span>
                    <span className="font-medium text-accent">300 kg</span>
                  </div>
                </div>

                <TechnicalSpecDropdown 
                  title="Volledige Specificaties ASS 77.PD"
                  specs={ass77Specs}
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

            {/* ASE 67.PD Basic */}
            <Card className="card-tesla-hero">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-secondary to-secondary-variant p-4 rounded-xl inline-flex mb-6">
                  <Layers className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">ASE 67.PD</h3>
                <p className="text-lg font-medium text-secondary mb-2">Basis Schuifsysteem</p>
                <p className="text-muted-foreground mb-6">
                  Betrouwbaar basis schuifsysteem voor standaard toepassingen. 
                  Goede kwaliteit tegen een aantrekkelijke prijs.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profieldiepte:</span>
                    <span className="font-medium">67 mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      <TechnicalTooltip 
                        term="Uw-waarde" 
                        definition="Warmtedoorgangscoëfficiënt van het complete element - hoe lager, hoe beter geïsoleerd"
                      >
                        Uw-waarde:
                      </TechnicalTooltip>
                    </span>
                    <span className="font-medium text-secondary">1,6 W/m²K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Max. vlakgewicht:</span>
                    <span className="font-medium text-secondary">200 kg</span>
                  </div>
                </div>

                <TechnicalSpecDropdown 
                  title="Volledige Specificaties ASE 67.PD"
                  specs={ase67Specs}
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