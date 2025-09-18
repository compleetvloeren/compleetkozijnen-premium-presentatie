import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const AlgemeneVoorwaarden = () => {
  return (
    <>
      <Helmet>
        <title>Algemene Voorwaarden - Compleet Kozijnen</title>
        <meta name="description" content="Algemene voorwaarden van Compleet Kozijnen. Lees de voorwaarden voor onze dienstverlening." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-8">Algemene Voorwaarden</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg mb-8">
                  Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 1: Definities</h2>
                  <p className="text-muted-foreground mb-4">In deze algemene voorwaarden wordt verstaan onder:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li><strong>Opdrachtnemer:</strong> Compleet Kozijnen B.V., gevestigd te Emmeloord</li>
                    <li><strong>Opdrachtgever:</strong> De natuurlijke of rechtspersoon die een opdracht verstrekt</li>
                    <li><strong>Overeenkomst:</strong> De tussen partijen gesloten overeenkomst</li>
                    <li><strong>Werk:</strong> Alle door opdrachtnemer te verrichten werkzaamheden</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 2: Toepasselijkheid</h2>
                  <p className="text-muted-foreground mb-4">
                    Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten van opdrachtnemer, 
                    tenzij partijen uitdrukkelijk en schriftelijk zijn overeengekomen van deze voorwaarden af te wijken.
                  </p>
                  <p className="text-muted-foreground">
                    Algemene voorwaarden van opdrachtgever zijn niet van toepassing, tenzij deze uitdrukkelijk schriftelijk zijn aanvaard.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 3: Aanbiedingen en offertes</h2>
                  <p className="text-muted-foreground mb-4">
                    Alle aanbiedingen en offertes zijn vrijblijvend en geldig gedurende 30 dagen, tenzij anders vermeld.
                  </p>
                  <p className="text-muted-foreground">
                    Prijzen in offertes zijn exclusief BTW en andere heffingen, tenzij anders vermeld.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 4: Totstandkoming overeenkomst</h2>
                  <p className="text-muted-foreground mb-4">
                    De overeenkomst komt tot stand door schriftelijke aanvaarding van de offerte door opdrachtgever 
                    of door aanvang van de werkzaamheden door opdrachtnemer.
                  </p>
                  <p className="text-muted-foreground">
                    Mondeling gemaakte afspraken binden opdrachtnemer slechts nadat deze schriftelijk zijn bevestigd.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 5: Uitvoering werkzaamheden</h2>
                  <p className="text-muted-foreground mb-4">
                    Opdrachtnemer zal de werkzaamheden naar beste inzicht en vermogen uitvoeren, 
                    conform de geldende normen en eisen in de branche.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Opdrachtgever zorgt ervoor dat alle gegevens en medewerking die opdrachtnemer nodig heeft 
                    tijdig en in de juiste vorm beschikbaar zijn.
                  </p>
                  <p className="text-muted-foreground">
                    Werkzaamheden worden uitgevoerd conform de overeengekomen planning, 
                    rekening houdend met weersomstandigheden en andere externe factoren.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 6: Prijzen en betaling</h2>
                  <p className="text-muted-foreground mb-4">
                    Alle prijzen zijn exclusief BTW en andere heffingen, tenzij anders vermeld.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Betaling dient te geschieden binnen 30 dagen na factuurdatum, tenzij anders overeengekomen.
                  </p>
                  <p className="text-muted-foreground">
                    Bij overschrijding van de betalingstermijn is opdrachtgever van rechtswege in verzuim 
                    en is rente verschuldigd van 1% per maand.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 7: Eigendomsvoorbehoud</h2>
                  <p className="text-muted-foreground">
                    Alle geleverde zaken blijven eigendom van opdrachtnemer totdat alle verschuldigde bedragen 
                    volledig zijn betaald.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 8: Garantie</h2>
                  <p className="text-muted-foreground mb-4">
                    Opdrachtnemer geeft garantie op uitgevoerde werkzaamheden conform de geldende normen in de branche:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Montage werkzaamheden: 5 jaar garantie</li>
                    <li>Geleverde materialen: conform fabrieksgarantie</li>
                    <li>Kleine reparaties en onderhoud: 1 jaar garantie</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Garantie vervalt bij oneigenlijk gebruik, normale slijtage of reparaties door derden.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 9: Aansprakelijkheid</h2>
                  <p className="text-muted-foreground mb-4">
                    Opdrachtnemer is uitsluitend aansprakelijk voor directe schade die het gevolg is van 
                    toerekenbare tekortkoming in de nakoming van de overeenkomst.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    De aansprakelijkheid is beperkt tot het bedrag dat door de verzekeraar wordt uitgekeerd 
                    of bij gebreke daarvan tot het factuurbedrag van de betreffende opdracht.
                  </p>
                  <p className="text-muted-foreground">
                    Opdrachtnemer is niet aansprakelijk voor gevolgschade, bedrijfsschade of winstverlies.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 10: Overmacht</h2>
                  <p className="text-muted-foreground">
                    Opdrachtnemer is niet gehouden tot nakoming van verplichtingen indien verhinderd door overmacht, 
                    waaronder verstaan: extreme weersomstandigheden, stakingen, overheidsmaatregelen, 
                    transportproblemen of uitval van leveranciers.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 11: Geschillen</h2>
                  <p className="text-muted-foreground">
                    Op alle overeenkomsten is Nederlands recht van toepassing. 
                    Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement 
                    waar opdrachtnemer is gevestigd.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Artikel 12: Slotbepalingen</h2>
                  <p className="text-muted-foreground">
                    In gevallen waarin deze algemene voorwaarden niet voorzien, 
                    beslissen partijen in overleg naar maatstaven van redelijkheid en billijkheid.
                  </p>
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

export default AlgemeneVoorwaarden;