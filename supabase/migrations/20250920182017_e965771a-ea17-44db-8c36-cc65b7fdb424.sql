-- Voeg test leads toe voor verschillende datums
INSERT INTO public.leads (name, email, phone, company, project_type, budget_range, status, description, timeline, created_at) VALUES
('Jan Bakker', 'jan.bakker@email.com', '06-12345678', 'Bakker BV', 'ramen', '5000_10000', 'nieuw', 'Nieuwe kozijnen voor kantoorpand', 'binnen_3_maanden', '2025-09-20 08:30:00'),
('Maria Jansen', 'maria.jansen@email.com', '06-87654321', 'Jansen & Co', 'deuren', '10000_20000', 'in_behandeling', 'Voordeur vervangen', 'binnen_1_maand', '2025-09-20 10:15:00'),
('Piet de Vries', 'piet.devries@email.com', '06-11111111', null, 'schuifdeuren', '20000_plus', 'gewonnen', 'Schuifpui woonkamer', 'zo_snel_mogelijk', '2025-09-19 14:20:00'),
('Anna Smit', 'anna.smit@email.com', '06-22222222', 'Smit Architecten', 'ramen', '2000_5000', 'nieuw', 'Ramen vervangen woning', 'binnen_6_maanden', '2025-09-19 16:45:00'),
('Tom van der Berg', 'tom.vdberg@email.com', '06-33333333', null, 'deuren', '5000_10000', 'in_behandeling', 'Achterdeur en bijkeuken', 'binnen_3_maanden', '2025-09-18 09:10:00'),
('Lisa Hendriks', 'lisa.hendriks@email.com', '06-44444444', 'Hendriks Design', 'schuifdeuren', '15000_20000', 'gewonnen', 'Grote schuifpui nieuwbouw', 'binnen_1_maand', '2025-09-18 11:30:00'),
('Rob Mulder', 'rob.mulder@email.com', '06-55555555', null, 'ramen', '10000_20000', 'verloren', 'Kozijnen vervangen heel huis', 'binnen_6_maanden', '2025-09-17 13:15:00'),
('Sandra Wit', 'sandra.wit@email.com', '06-66666666', 'Wit Bouw', 'deuren', '5000_10000', 'nieuw', 'Openslaande tuindeuren', 'zo_snel_mogelijk', '2025-09-17 15:45:00'),
('Marco Zwart', 'marco.zwart@email.com', '06-77777777', null, 'ramen', '2000_5000', 'in_behandeling', 'Dakkapel ramen', 'binnen_3_maanden', '2025-09-16 08:20:00'),
('Emma Groen', 'emma.groen@email.com', '06-88888888', 'Groen & Partners', 'schuifdeuren', '20000_plus', 'gewonnen', 'Luxe schuifpui villa', 'binnen_1_maand', '2025-09-16 12:00:00');

-- Voeg test contact submissions toe
INSERT INTO public.contact_submissions (name, email, phone, subject, message, status, created_at) VALUES
('Kees Janssen', 'kees.janssen@email.com', '06-12345679', 'Vraag over ramen', 'Ik heb een vraag over jullie ramen producten', 'ongelezen', '2025-09-20 09:15:00'),
('Ingrid Visser', 'ingrid.visser@email.com', '06-98765432', 'Offerte aanvraag', 'Kunnen jullie een offerte maken voor schuifdeuren?', 'gelezen', '2025-09-19 13:30:00'),
('Frank Bos', 'frank.bos@email.com', '06-11223344', 'Service vraag', 'Mijn deur sluit niet goed, kunnen jullie helpen?', 'beantwoord', '2025-09-18 16:20:00'),
('Monique Dekker', 'monique.dekker@email.com', '06-55667788', 'Algemene vraag', 'Welke kleuren zijn er beschikbaar?', 'ongelezen', '2025-09-17 10:45:00'),
('Dennis Ruiter', 'dennis.ruiter@email.com', '06-99887766', 'Garantie vraag', 'Hoe lang is de garantie op kozijnen?', 'gelezen', '2025-09-16 14:10:00');