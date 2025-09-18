import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Cookiebeleid = () => {
  return (
    <>
      <Helmet>
        <title>Cookiebeleid - Compleet Kozijnen</title>
        <meta name="description" content="Cookiebeleid van Compleet Kozijnen. Lees hoe wij cookies gebruiken op onze website." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-8">Cookiebeleid</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg mb-8">
                  Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Wat zijn cookies?</h2>
                  <p className="text-muted-foreground mb-4">
                    Cookies zijn kleine tekstbestanden die op uw computer of mobiele apparaat worden opgeslagen 
                    wanneer u onze website bezoekt. Cookies helpen ons om de website te laten functioneren, 
                    uw gebruikservaring te verbeteren en informatie te verzamelen over hoe de website wordt gebruikt.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Welke cookies gebruiken wij?</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-foreground mb-3">Noodzakelijke cookies</h3>
                      <p className="text-muted-foreground mb-3">
                        Deze cookies zijn essentieel voor de werking van onze website en kunnen niet worden uitgeschakeld.
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                        <li>Sessie-cookies voor gebruikersinteractie</li>
                        <li>Beveiligingscookies</li>
                        <li>Cookies voor formulieren</li>
                      </ul>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-foreground mb-3">Functionele cookies</h3>
                      <p className="text-muted-foreground mb-3">
                        Deze cookies verbeteren de functionaliteit van de website en uw gebruikservaring.
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                        <li>Voorkeursinstellingen onthouden</li>
                        <li>Taalvoorkeuren</li>
                        <li>Formuliergegevens bewaren</li>
                      </ul>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-foreground mb-3">Analytische cookies</h3>
                      <p className="text-muted-foreground mb-3">
                        Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken.
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                        <li>Google Analytics (geanonimiseerd)</li>
                        <li>Bezoekersstatistieken</li>
                        <li>Pagina-prestaties</li>
                      </ul>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-foreground mb-3">Marketing cookies</h3>
                      <p className="text-muted-foreground mb-3">
                        Deze cookies worden gebruikt om relevante advertenties te tonen (alleen met uw toestemming).
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                        <li>Advertentie tracking</li>
                        <li>Social media integraties</li>
                        <li>Remarketing pixels</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cookies van derden</h2>
                  <p className="text-muted-foreground mb-4">
                    Onze website kan cookies van derden bevatten van de volgende services:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li><strong>Google Analytics:</strong> Voor websiteanalyse en statistieken</li>
                    <li><strong>YouTube:</strong> Voor ingesloten video's</li>
                    <li><strong>Google Maps:</strong> Voor locatiekaarten</li>
                    <li><strong>LinkedIn:</strong> Voor social media integratie</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Uw keuzes en controle</h2>
                  <p className="text-muted-foreground mb-4">
                    U heeft verschillende opties om cookies te beheren:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Cookie-instellingen wijzigen</h3>
                      <p className="text-muted-foreground">
                        U kunt uw cookie-voorkeuren wijzigen via de cookie-banner die verschijnt bij uw eerste bezoek, 
                        of via de cookie-instellingen link onderaan elke pagina.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Browser-instellingen</h3>
                      <p className="text-muted-foreground">
                        U kunt cookies uitschakelen in uw browser-instellingen. Let op: dit kan de functionaliteit 
                        van onze website beperken.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Opt-out links</h3>
                      <p className="text-muted-foreground mb-2">Voor specifieke services kunt u opt-out links gebruiken:</p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                        <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics opt-out</a></li>
                        <li><a href="https://www.linkedin.com/psettings/guest-controls" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn cookie-instellingen</a></li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Bewaartermijnen</h2>
                  <p className="text-muted-foreground mb-4">Verschillende cookies hebben verschillende bewaartermijnen:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li><strong>Sessie-cookies:</strong> Worden verwijderd wanneer u uw browser sluit</li>
                    <li><strong>Functionele cookies:</strong> 1 jaar</li>
                    <li><strong>Analytische cookies:</strong> 2 jaar</li>
                    <li><strong>Marketing cookies:</strong> 1 jaar</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Wijzigingen in dit cookiebeleid</h2>
                  <p className="text-muted-foreground">
                    Wij kunnen dit cookiebeleid van tijd tot tijd aanpassen. De meest actuele versie vindt u altijd op deze pagina. 
                    Belangrijke wijzigingen zullen wij communiceren via onze website.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact</h2>
                  <p className="text-muted-foreground mb-4">
                    Heeft u vragen over ons cookiebeleid? Neem dan contact met ons op:
                  </p>
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <p className="text-foreground font-medium mb-2">Compleet Kozijnen B.V.</p>
                    <p className="text-muted-foreground mb-1">E-mail: info@compleetkozijnen.nl</p>
                    <p className="text-muted-foreground mb-1">Telefoon: 085-123 4567</p>
                    <p className="text-muted-foreground">Adres: Industrieweg 16, 8304 AD Emmeloord</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Cookiebeleid;