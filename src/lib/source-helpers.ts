import { Jurisdiction } from '@/types';
import { legalSources } from './mock-legal-data';

export function getSourceUrl(jurisdiction: Jurisdiction, reference: string): string {
  // Find the source in our mock data
  const source = legalSources.find(
    s => s.jurisdiction === jurisdiction && s.reference === reference
  );

  if (source?.url) {
    return source.url;
  }

  // Fallback URLs based on jurisdiction
  const fallbackUrls: Record<Jurisdiction, string> = {
    CH: 'https://www.fedlex.admin.ch/en/home',
    EU: 'https://eur-lex.europa.eu/homepage.html',
    UK: 'https://www.legislation.gov.uk/',
  };

  return fallbackUrls[jurisdiction];
}

export function getLegalSourcesByJurisdiction(jurisdiction: Jurisdiction) {
  return legalSources.filter(source => source.jurisdiction === jurisdiction);
}

export function formatReference(reference: string): string {
  // Format references for display
  return reference.replace(/,/g, ', ').trim();
}