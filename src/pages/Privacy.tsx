import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacybeleid - Compleet Kozijnen</title>
        <meta name="description" content="Privacybeleid van Compleet Kozijnen. Lees hoe wij omgaan met uw persoonlijke gegevens." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-8">Privacybeleid</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg mb-8">
                  Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Inleiding</h2>
                  <p className="text-muted-foreground mb-4">
                    Compleet Kozijnen B.V. ("wij", "ons", "onze") is verantwoordelijk voor de verwerking van uw persoonlijke gegevens. 
                    In dit privacybeleid leggen wij uit welke persoonlijke gegevens wij verzamelen, waarom wij deze verzamelen en hoe wij ermee omgaan.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Contactgegevens</h2>
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <p className="text-foreground font-medium mb-2">Compleet Kozijnen B.V.</p>
                    <p className="text-muted-foreground mb-1">Industrieweg 16</p>
                    <p className="text-muted-foreground mb-1">8304 AD Emmeloord</p>
                    <p className="text-muted-foreground mb-1">Telefoon: 085-123 4567</p>
                    <p className="text-muted-foreground mb-1">E-mail: info@compleetkozijnen.nl</p>
                    <p className="text-muted-foreground">KvK-nummer: 98302043</p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Welke gegevens verzamelen wij?</h2>
                  <p className="text-muted-foreground mb-4">Wij kunnen de volgende categorieën persoonlijke gegevens verzamelen:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Contactgegevens (naam, adres, telefoon, e-mail)</li>
                    <li>Bedrijfsgegevens (bedrijfsnaam, functie)</li>
                    <li>Projectinformatie en voorkeuren</li>
                    <li>Communicatiegegevens (berichten, correspondentie)</li>
                    <li>Technische gegevens (IP-adres, browsertype, cookiegegevens)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Doeleinden van verwerking</h2>
                  <p className="text-muted-foreground mb-4">Wij gebruiken uw persoonlijke gegevens voor:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Het verstrekken van offertes en advisering</li>
                    <li>Het uitvoeren van opdrachten en projecten</li>
                    <li>Klantenservice en communicatie</li>
                    <li>Verbetering van onze dienstverlening</li>
                    <li>Naleving van wettelijke verplichtingen</li>
                    <li>Marketing (alleen met uw toestemming)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Rechtsgronden</h2>
                  <p className="text-muted-foreground mb-4">
                    Wij verwerken uw persoonlijke gegevens op basis van de volgende rechtsgronden:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Uitvoering van een overeenkomst</li>
                    <li>Gerechtvaardigd belang</li>
                    <li>Wettelijke verplichting</li>
                    <li>Toestemming (voor marketing)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Bewaartermijnen</h2>
                  <p className="text-muted-foreground mb-4">
                    Wij bewaren uw persoonlijke gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor zij worden verwerkt:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Contactgegevens: 7 jaar na laatste contact</li>
                    <li>Projectgegevens: 10 jaar (garantie en juridische doeleinden)</li>
                    <li>Financiële gegevens: 7 jaar (fiscale bewaarplicht)</li>
                    <li>Marketing toestemmingen: tot intrekking van toestemming</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Uw rechten</h2>
                  <p className="text-muted-foreground mb-4">U heeft de volgende rechten betreffende uw persoonlijke gegevens:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Recht op inzage</li>
                    <li>Recht op rectificatie</li>
                    <li>Recht op verwijdering</li>
                    <li>Recht op beperking van verwerking</li>
                    <li>Recht op dataportabiliteit</li>
                    <li>Recht van bezwaar</li>
                    <li>Recht om toestemming in te trekken</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Om gebruik te maken van deze rechten kunt u contact met ons opnemen via info@compleetkozijnen.nl.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Beveiliging</h2>
                  <p className="text-muted-foreground">
                    Wij hebben passende technische en organisatorische maatregelen getroffen om uw persoonlijke gegevens 
                    te beschermen tegen verlies, diefstal, ongeautoriseerde toegang, openbaarmaking of wijziging.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Klachten</h2>
                  <p className="text-muted-foreground">
                    Heeft u een klacht over de verwerking van uw persoonlijke gegevens? Dan kunt u contact met ons opnemen. 
                    U heeft ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Wijzigingen</h2>
                  <p className="text-muted-foreground">
                    Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest actuele versie vindt u altijd op onze website.
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

export default Privacy;