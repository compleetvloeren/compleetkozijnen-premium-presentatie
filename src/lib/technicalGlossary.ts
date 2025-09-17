export interface TechnicalTerm {
  term: string;
  definition: string;
}

export const technicalGlossary: Record<string, TechnicalTerm> = {
  'uf-waarde': {
    term: 'Uf-waarde',
    definition: 'De warmtedoorgangscoëfficiënt van het kozijn. Hoe lager de waarde, hoe beter de isolatie. Een waarde van 1,0 W/(m²K) betekent uitstekende isolatie.'
  },
  'inbouwdiepte': {
    term: 'Inbouwdiepte',
    definition: 'De diepte van het kozijn gemeten van binnen naar buiten. Een grotere inbouwdiepte biedt ruimte voor dikkere isolatie en glas.'
  },
  'glasdikte': {
    term: 'Glasdikte', 
    definition: 'De totale dikte van het glaspakket inclusief spouw. Dikkere glaspakketten bieden betere isolatie en geluidsreductie.'
  },
  '3-dichting-systeem': {
    term: '3-Dichting Systeem',
    definition: 'Drie afzonderlijke dichtingen rondom het kozijn zorgen voor optimale lucht- en waterdichtheid en uitstekende thermische isolatie.'
  },
  'stv-lijmtechniek': {
    term: 'STV® Lijmtechniek',
    definition: 'Statische droge verlijming waarbij glas en profiel één sterk geheel vormen. Dit zorgt voor levenslange stabiliteit en verbeterde isolatie.'
  },
  'gealan-acrylcolor': {
    term: 'GEALAN-ACRYLCOLOR®',
    definition: 'Duurzaam kleursysteem dat al 40+ jaar bewezen kwaliteit levert. Biedt blijvende kleurechtheid en superieure weerbestendigheid.'
  },
  'ikd-isolatieschuim': {
    term: 'IKD® Isolatieschuim',
    definition: 'Speciale isolatieprofielen die de thermische eigenschappen van kozijnen verder verbeteren voor optimale energiezuinigheid.'
  },
  '5-kamertechnologie': {
    term: '5-Kamer Technologie',
    definition: 'Vijf gescheiden kamers in het profiel zorgen voor uitstekende warmte-isolatie en geluidsreductie door meerdere luchtlagen.'
  },
  'triple-glazing': {
    term: 'Triple Glazing',
    definition: 'Drievoudig glas met twee spouwruimtes gevuld met isolatiegas. Biedt maximale energie-efficiëntie en geluidsreductie.'
  },
  'schuinte': {
    term: 'Schuinte',
    definition: 'De hoek van het profiel die zorgt voor een moderne uitstraling en verbeterde waterafvoer. 15° geeft dieptewerking, 4° een robuuste uitstraling.'
  }
};

export const getTechnicalTerm = (key: string): TechnicalTerm => {
  return technicalGlossary[key] || { term: key, definition: 'Technische term' };
};