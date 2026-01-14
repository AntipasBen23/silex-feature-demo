export type Jurisdiction = 'CH' | 'EU' | 'UK';

export interface LegalSource {
  id: string;
  jurisdiction: Jurisdiction;
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

export interface ComparisonResponse {
  query: string;
  analysis: string;
  keyDifferences: string[];
  similarities: string[];
  practicalImplications: string;
  sources: {
    jurisdiction: Jurisdiction;
    reference: string;
    relevance: string;
  }[];
}

export interface ComparisonQuery {
  text: string;
  jurisdictions: Jurisdiction[];
  timestamp: number;
}

export interface StreamingState {
  isStreaming: boolean;
  currentText: string;
  progress: number;
}

export interface ComparisonResult extends ComparisonResponse {
  id: string;
  query: ComparisonQuery;
  createdAt: Date;
  streamingComplete: boolean;
}