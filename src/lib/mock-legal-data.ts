export interface LegalSource {
  id: string;
  jurisdiction: 'CH' | 'EU' | 'UK';
  title: string;
  reference: string;
  url: string;
  excerpt: string;
  fullText?: string;
}

export interface JurisdictionInfo {
  code: string;
  name: string;
  flag: string;
  color: string;
}

export const jurisdictions: JurisdictionInfo[] = [
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', color: '#DC143C' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', color: '#003399' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', color: '#012169' },
];

export const legalSources: LegalSource[] = [
  // Swiss Data Protection
  {
    id: 'ch-dpa-1',
    jurisdiction: 'CH',
    title: 'Federal Act on Data Protection (FADP)',
    reference: 'SR 235.1, Art. 6',
    url: 'https://www.fedlex.admin.ch/eli/cc/2022/491/en',
    excerpt: 'Personal data may only be processed lawfully. In particular, its processing must be proportionate and carried out in good faith.',
    fullText: 'Article 6 - Principles: 1. Personal data may only be processed lawfully. 2. Its processing must be carried out in good faith and must be proportionate. 3. Personal data may only be processed for a specific purpose that is evident to the data subject at the time of collection. Only data that is necessary for the processing purpose may be processed.'
  },
  {
    id: 'ch-dpa-2',
    jurisdiction: 'CH',
    title: 'Federal Act on Data Protection (FADP)',
    reference: 'SR 235.1, Art. 19',
    url: 'https://www.fedlex.admin.ch/eli/cc/2022/491/en',
    excerpt: 'The controller must notify the Federal Data Protection and Information Commissioner (FDPIC) as quickly as possible if a data breach is likely to result in a high risk to the personality or fundamental rights of the data subject.',
    fullText: 'Article 19 - Duty to notify in the event of a data breach: 1. The controller must notify the Federal Data Protection and Information Commissioner (FDPIC) as quickly as possible if a data breach is likely to result in a high risk to the personality or fundamental rights of the data subject. 2. The controller must document data breaches and notify the FDPIC thereof.'
  },
  
  // EU GDPR
  {
    id: 'eu-gdpr-1',
    jurisdiction: 'EU',
    title: 'General Data Protection Regulation (GDPR)',
    reference: 'Regulation (EU) 2016/679, Art. 6',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
    excerpt: 'Processing shall be lawful only if and to the extent that at least one of the following applies: (a) the data subject has given consent; (b) processing is necessary for the performance of a contract...',
    fullText: 'Article 6 - Lawfulness of processing: 1. Processing shall be lawful only if and to the extent that at least one of the following applies: (a) the data subject has given consent to the processing of his or her personal data for one or more specific purposes; (b) processing is necessary for the performance of a contract to which the data subject is party...'
  },
  {
    id: 'eu-gdpr-2',
    jurisdiction: 'EU',
    title: 'General Data Protection Regulation (GDPR)',
    reference: 'Regulation (EU) 2016/679, Art. 33',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
    excerpt: 'In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority...',
    fullText: 'Article 33 - Notification of a personal data breach to the supervisory authority: 1. In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority competent in accordance with Article 55...'
  },
  
  // UK Data Protection
  {
    id: 'uk-dpa-1',
    jurisdiction: 'UK',
    title: 'UK Data Protection Act 2018',
    reference: 'DPA 2018, Schedule 1, Part 1',
    url: 'https://www.legislation.gov.uk/ukpga/2018/12/schedule/1',
    excerpt: 'The GDPR principles: Personal data must be processed lawfully, fairly and in a transparent manner in relation to the data subject.',
    fullText: 'Schedule 1, Part 1 - The GDPR principles: (1) Personal data must be— (a) processed lawfully, fairly and in a transparent manner in relation to the data subject (\'lawfulness, fairness and transparency\'); (b) collected for specified, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes...'
  },
  {
    id: 'uk-dpa-2',
    jurisdiction: 'UK',
    title: 'UK Data Protection Act 2018',
    reference: 'DPA 2018, Section 67',
    url: 'https://www.legislation.gov.uk/ukpga/2018/12/section/67',
    excerpt: 'Where a personal data breach has occurred, the controller must notify the Commissioner without undue delay and, where feasible, not later than 72 hours after becoming aware of it.',
    fullText: 'Section 67 - Notification of a personal data breach to the Commissioner: (1) Where a personal data breach has occurred, the controller must notify the Commissioner without undue delay and, where feasible, not later than 72 hours after becoming aware of it, unless the personal data breach is unlikely to result in a risk to the rights and freedoms of individuals.'
  },
];

export const getLegalSourcesByJurisdiction = (jurisdiction: 'CH' | 'EU' | 'UK') => {
  return legalSources.filter(source => source.jurisdiction === jurisdiction);
};

export const searchLegalSources = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return legalSources.filter(source => 
    source.title.toLowerCase().includes(lowerQuery) ||
    source.excerpt.toLowerCase().includes(lowerQuery) ||
    source.reference.toLowerCase().includes(lowerQuery)
  );
};