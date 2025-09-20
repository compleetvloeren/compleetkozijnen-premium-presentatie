-- Voeg test leads toe voor verschillende datums met juiste enum waarden
INSERT INTO public.leads (name, email, phone, company, project_type, budget_range, status, description, timeline, created_at) VALUES
('Jan Bakker', 'jan.bakker@email.com', '06-12345678', 'Bakker BV', 'ramen', '5000-10000', 'nieuw', 'Nieuwe kozijnen voor kantoorpand', 'binnen_3_maanden', '2025-09-20 08:30:00'),
('Maria Jansen', 'maria.jansen@email.com', '06-87654321', 'Jansen & Co', 'deuren', '10000-25000', 'in_behandeling', 'Voordeur vervangen', 'binnen_1_maand', '2025-09-20 10:15:00'),
('Piet de Vries', 'piet.devries@email.com', '06-11111111', null, 'schuifdeuren', '25000-50000', 'gewonnen', 'Schuifpui woonkamer', 'zo_snel_mogelijk', '2025-09-19 14:20:00'),
('Anna Smit', 'anna.smit@email.com', '06-22222222', 'Smit Architecten', 'ramen', '5000-10000', 'nieuw', 'Ramen vervangen woning', 'binnen_6_maanden', '2025-09-19 16:45:00'),
('Tom van der Berg', 'tom.vdberg@email.com', '06-33333333', null, 'deuren', '5000-10000', 'in_behandeling', 'Achterdeur en bijkeuken', 'binnen_3_maanden', '2025-09-18 09:10:00'),
('Lisa Hendriks', 'lisa.hendriks@email.com', '06-44444444', 'Hendriks Design', 'schuifdeuren', '25000-50000', 'gewonnen', 'Grote schuifpui nieuwbouw', 'binnen_1_maand', '2025-09-18 11:30:00'),
('Rob Mulder', 'rob.mulder@email.com', '06-55555555', null, 'ramen', '10000-25000', 'verloren', 'Kozijnen vervangen heel huis', 'binnen_6_maanden', '2025-09-17 13:15:00'),
('Sandra Wit', 'sandra.wit@email.com', '06-66666666', 'Wit Bouw', 'deuren', '5000-10000', 'nieuw', 'Openslaande tuindeuren', 'zo_snel_mogelijk', '2025-09-17 15:45:00'),
('Marco Zwart', 'marco.zwart@email.com', '06-77777777', null, 'ramen', '5000-10000', 'in_behandeling', 'Dakkapel ramen', 'binnen_3_maanden', '2025-09-16 08:20:00'),
('Emma Groen', 'emma.groen@email.com', '06-88888888', 'Groen & Partners', 'schuifdeuren', '50000+', 'gewonnen', 'Luxe schuifpui villa', 'binnen_1_maand', '2025-09-16 12:00:00'),
('Dirk Peters', 'dirk.peters@email.com', '06-12341234', 'Peters & Zonen', 'kozijnen', '10000-25000', 'offerte_verstuurd', 'Complete kozijnen renovatie', 'binnen_3_maanden', '2025-09-15 11:20:00'),
('Inge Vermeer', 'inge.vermeer@email.com', '06-56785678', null, 'renovatie', '25000-50000', 'nieuw', 'Renovatie complete woning', 'binnen_6_maanden', '2025-09-15 14:40:00'),
('Karel de Jong', 'karel.dejong@email.com', '06-34563456', 'De Jong Bouw', 'nieuwbouw', '50000+', 'in_behandeling', 'Nieuwbouw project alle kozijnen', 'binnen_1_maand', '2025-09-14 09:30:00'),
('Petra Willems', 'petra.willems@email.com', '06-78907890', null, 'deuren', 'onbekend', 'nieuw', 'Vraag over verschillende deuropties', 'onbekend', '2025-09-14 16:15:00'),
('Hans Brouwer', 'hans.brouwer@email.com', '06-23452345', 'Brouwer Vastgoed', 'ramen', '10000-25000', 'gewonnen', 'Ramen voor kantoorcomplex', 'zo_snel_mogelijk', '2025-09-13 10:45:00');

-- Voeg test contact submissions toe
INSERT INTO public.contact_submissions (name, email, phone, subject, message, status, created_at) VALUES
('Kees Janssen', 'kees.janssen@email.com', '06-12345679', 'Vraag over ramen', 'Ik heb een vraag over jullie ramen producten', 'ongelezen', '2025-09-20 09:15:00'),
('Ingrid Visser', 'ingrid.visser@email.com', '06-98765432', 'Offerte aanvraag', 'Kunnen jullie een offerte maken voor schuifdeuren?', 'gelezen', '2025-09-19 13:30:00'),
('Frank Bos', 'frank.bos@email.com', '06-11223344', 'Service vraag', 'Mijn deur sluit niet goed, kunnen jullie helpen?', 'beantwoord', '2025-09-18 16:20:00'),
('Monique Dekker', 'monique.dekker@email.com', '06-55667788', 'Algemene vraag', 'Welke kleuren zijn er beschikbaar?', 'ongelezen', '2025-09-17 10:45:00'),
('Dennis Ruiter', 'dennis.ruiter@email.com', '06-99887766', 'Garantie vraag', 'Hoe lang is de garantie op kozijnen?', 'gelezen', '2025-09-16 14:10:00'),
('Saskia van Dam', 'saskia.vandam@email.com', '06-13579135', 'Klacht', 'Montage is niet goed verlopen', 'ongelezen', '2025-09-15 12:20:00'),
('Richard Mol', 'richard.mol@email.com', '06-24681357', 'Compliment', 'Zeer tevreden met de service!', 'beantwoord', '2025-09-14 15:30:00'),
('Joyce van Dijk', 'joyce.vandijk@email.com', '06-97531864', 'Technische vraag', 'Welke isolatiewaarde hebben jullie ramen?', 'gelezen', '2025-09-13 08:45:00');