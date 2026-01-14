export interface ComparisonResponse {
  queryText: string;
  analysis: string;
  keyDifferences: string[];
  similarities: string[];
  practicalImplications: string;
  sources: {
    jurisdiction: 'CH' | 'EU' | 'UK';
    reference: string;
    relevance: string;
  }[];
}

export const mockComparisons: Record<string, ComparisonResponse> = {
  // GDPR vs Swiss Data Protection
  'gdpr-swiss-data-protection': {
    queryText: 'Compare GDPR with Swiss Federal Data Protection Act',
    analysis: `Both the EU General Data Protection Regulation (GDPR) and the Swiss Federal Act on Data Protection (FADP) establish comprehensive frameworks for personal data protection, but with notable differences in scope and enforcement.

**Legal Basis for Processing:**
The GDPR provides six explicit legal bases for data processing (Article 6), including consent, contract, legal obligation, vital interests, public task, and legitimate interests. The Swiss FADP takes a more principles-based approach, requiring processing to be lawful, proportionate, and in good faith (Article 6 FADP), without enumerating specific legal bases as exhaustively.

**Consent Requirements:**
Under GDPR, consent must be "freely given, specific, informed and unambiguous" with a clear affirmative action. The Swiss FADP requires consent for sensitive data processing but does not impose the same granular requirements for standard consent mechanisms as GDPR.

**Territorial Scope:**
GDPR applies extraterritorially to any organization processing EU residents' data, regardless of establishment. The Swiss FADP applies to controllers and processors in Switzerland, or those whose activities affect individuals in Switzerland, but with a narrower extraterritorial reach.`,
    keyDifferences: [
      'GDPR has 6 explicit legal bases for processing; Swiss FADP uses principles-based approach',
      'GDPR imposes fines up to €20M or 4% of global turnover; Swiss FADP criminal penalties up to CHF 250,000',
      'GDPR requires 72-hour breach notification; Swiss FADP requires notification "as quickly as possible"',
      'GDPR has mandatory DPO requirements; Swiss FADP has more limited DPO obligations',
      'GDPR includes right to data portability; Swiss FADP does not explicitly provide this right'
    ],
    similarities: [
      'Both require lawful, fair, and transparent processing',
      'Both mandate data breach notification to authorities',
      'Both recognize rights to access, rectification, and erasure',
      'Both require data protection impact assessments for high-risk processing',
      'Both impose accountability obligations on controllers'
    ],
    practicalImplications: `For Swiss companies doing business with EU clients, dual compliance is necessary. Organizations should adopt the stricter GDPR standards as a baseline, ensuring they meet both regimes. Key action items include: implementing GDPR-compliant consent mechanisms, establishing 72-hour breach notification procedures, appointing a DPO if required under either regime, and maintaining comprehensive processing records that satisfy both laws.`,
    sources: [
      {
        jurisdiction: 'EU',
        reference: 'Regulation (EU) 2016/679, Art. 6',
        relevance: 'Legal basis for processing under GDPR'
      },
      {
        jurisdiction: 'CH',
        reference: 'SR 235.1, Art. 6',
        relevance: 'Principles of data processing under Swiss law'
      },
      {
        jurisdiction: 'EU',
        reference: 'Regulation (EU) 2016/679, Art. 33',
        relevance: 'Data breach notification requirements'
      },
      {
        jurisdiction: 'CH',
        reference: 'SR 235.1, Art. 19',
        relevance: 'Swiss data breach notification duty'
      }
    ]
  },

  // Data Breach Notification
  'data-breach-notification': {
    queryText: 'What are the data breach notification requirements in EU vs Switzerland?',
    analysis: `Data breach notification requirements represent a critical compliance obligation under both EU and Swiss data protection law, though with important procedural distinctions.

**EU GDPR Requirements (Article 33):**
Controllers must notify the relevant supervisory authority "without undue delay and, where feasible, not later than 72 hours after having become aware" of a personal data breach, unless the breach is unlikely to result in a risk to individuals' rights and freedoms. If notification occurs after 72 hours, it must be accompanied by reasons for the delay.

**Swiss FADP Requirements (Article 19):**
Controllers must notify the Federal Data Protection and Information Commissioner (FDPIC) "as quickly as possible" if a data breach is likely to result in a "high risk" to the personality or fundamental rights of the data subject. The Swiss law does not impose a specific 72-hour deadline but requires documentation of all data breaches.

**Risk Threshold:**
GDPR requires notification when there is a "risk" to rights and freedoms (with a lower threshold than Swiss law). Swiss FADP requires notification only when there is a "high risk" to personality or fundamental rights, creating a higher bar for mandatory notification.`,
    keyDifferences: [
      'GDPR: 72-hour notification deadline; Swiss: "as quickly as possible" without specific timeframe',
      'GDPR: Notification required for "risk"; Swiss: Notification required for "high risk"',
      'GDPR: Must explain delay if beyond 72 hours; Swiss: No specific delay explanation requirement',
      'GDPR: Notification to supervisory authority in member state; Swiss: Notification to FDPIC only',
      'GDPR: Individual notification required if "high risk"; Swiss: Individual notification at FDPIC discretion'
    ],
    similarities: [
      'Both require notification to data protection authorities',
      'Both require documentation of all data breaches',
      'Both assess risk to individuals as notification trigger',
      'Both require description of breach nature and consequences',
      'Both require information on mitigation measures taken'
    ],
    practicalImplications: `Organizations operating in both jurisdictions should adopt the stricter GDPR 72-hour standard as their operational baseline. This ensures compliance with both regimes while simplifying internal incident response procedures. Establish clear breach detection mechanisms, maintain breach registers, and create notification templates that satisfy both Swiss and EU requirements.`,
    sources: [
      {
        jurisdiction: 'EU',
        reference: 'Regulation (EU) 2016/679, Art. 33',
        relevance: 'GDPR breach notification to supervisory authority'
      },
      {
        jurisdiction: 'EU',
        reference: 'Regulation (EU) 2016/679, Art. 34',
        relevance: 'GDPR notification to affected individuals'
      },
      {
        jurisdiction: 'CH',
        reference: 'SR 235.1, Art. 19',
        relevance: 'Swiss breach notification duty'
      }
    ]
  },

  // Cross-border Data Transfers
  'cross-border-data-transfer': {
    queryText: 'Analyze cross-border data transfer rules: EU-Swiss framework',
    analysis: `Cross-border data transfers between the EU and Switzerland operate under a complex framework that has evolved significantly following the Schrems II decision and Switzerland's adequacy recognition.

**Switzerland's Adequacy Status:**
Switzerland benefits from an adequacy decision from the European Commission (Decision 2000/518/EC, maintained post-GDPR), meaning that personal data can flow from the EU/EEA to Switzerland without additional safeguards. However, this adequacy status is under review and may face challenges similar to the EU-US Privacy Shield.

**EU to Switzerland Transfers:**
Data transfers from the EU to Switzerland are treated as transfers within the EEA, requiring no additional mechanisms beyond the adequacy decision. Controllers must still ensure Swiss recipients provide adequate protection and document the transfer.

**Switzerland to EU Transfers:**
Under Swiss FADP Article 16, data transfers abroad are permitted if the destination provides adequate protection. The Swiss Federal Council recognizes EU/EEA countries as providing adequate protection, facilitating smooth data flows.

**Post-Schrems II Considerations:**
Following CJEU Schrems II (C-311/18), organizations must conduct Transfer Impact Assessments (TIAs) when using Standard Contractual Clauses (SCCs) or other transfer mechanisms beyond adequacy decisions. While Switzerland's adequacy remains valid, ongoing monitoring is essential.`,
    keyDifferences: [
      'EU uses adequacy decisions as primary transfer mechanism; Swiss law recognizes adequate countries by Federal Council ordinance',
      'GDPR requires explicit Article 46 safeguards when no adequacy exists; Swiss FADP allows alternative adequate guarantees',
      'GDPR SCCs updated 2021; Swiss SCCs being modernized to align with new FADP',
      'GDPR emphasizes transparency to data subjects; Swiss FADP less prescriptive on transfer documentation'
    ],
    similarities: [
      'Both prohibit transfers to countries without adequate protection',
      'Both recognize adequacy decisions as primary transfer mechanism',
      'Both allow Standard Contractual Clauses as safeguard',
      'Both require assessment of destination country laws',
      'Both subject transfers to data subject rights'
    ],
    practicalImplications: `For companies transferring data between EU and Switzerland, the current adequacy framework simplifies compliance. However, organizations should: (1) Monitor adequacy status updates, (2) Maintain SCCs as backup transfer mechanism, (3) Conduct periodic TIAs for sensitive data transfers, (4) Document all cross-border transfers, and (5) Prepare for potential adequacy decision revocation by establishing alternative safeguards.`,
    sources: [
      {
        jurisdiction: 'EU',
        reference: 'Regulation (EU) 2016/679, Art. 45',
        relevance: 'GDPR adequacy decisions'
      },
      {
        jurisdiction: 'EU',
        reference: 'Regulation (EU) 2016/679, Art. 46',
        relevance: 'GDPR transfer safeguards (SCCs, BCRs)'
      },
      {
        jurisdiction: 'CH',
        reference: 'SR 235.1, Art. 16',
        relevance: 'Swiss cross-border data disclosure requirements'
      }
    ]
  },

  // Contract Formation
  'contract-formation-swiss-french': {
    queryText: 'Compare contract formation requirements: Swiss OR vs French Code Civil',
    analysis: `Contract formation under Swiss and French law share Romano-Germanic roots but diverge in crucial areas, particularly regarding form requirements and the role of causa.

**Fundamental Requirements:**
Swiss law (Swiss Code of Obligations, Art. 1) requires: (1) mutual consent (agreement of the parties), (2) lawful content, and (3) possible performance. French law (Code Civil, Art. 1128) requires: (1) consent, (2) contractual capacity, (3) determined and lawful content.

**Causa/Cause Requirement:**
A critical distinction: French law historically required "cause" (legitimate reason for contracting) as a validity requirement under former Article 1131 Code Civil. The 2016 reform eliminated "cause" but introduced "contenu licite et certain" (lawful and certain content), effectively maintaining similar scrutiny. Swiss law does not explicitly require causa as a separate element; purpose is examined within the "lawful content" assessment.

**Form Requirements:**
Swiss law follows freedom of form (Article 11 OR) - contracts are valid regardless of form unless law prescribes otherwise. French law similarly embraces consensualism (Art. 1172 Code Civil), requiring specific form only when mandated by statute.`,
    keyDifferences: [
      'French law explicitly requires "contractual capacity"; Swiss law presumes capacity under civil law',
      'French Civil Code underwent major reform in 2016; Swiss OR dates to 1911 with incremental updates',
      'French law emphasizes "loyalty" in negotiation (Art. 1104); Swiss law addresses good faith in performance',
      'French law has stricter rules on standard form contracts (Art. 1119); Swiss OR less prescriptive'
    ],
    similarities: [
      'Both require mutual consent as foundation',
      'Both follow principle of freedom of form (consensualism)',
      'Both require lawful and possible content',
      'Both recognize pre-contractual liability for bad faith negotiation',
      'Both distinguish between void and voidable contracts'
    ],
    practicalImplications: `For cross-border contracts between Swiss and French parties: (1) Include explicit choice of law clause, (2) Ensure written form even if not legally required (evidentiary purposes), (3) Document pre-contractual negotiations to address French "loyalty" requirements, (4) Verify both parties have contractual capacity under their respective laws, (5) Consider arbitration clause to avoid jurisdictional conflicts.`,
    sources: [
      {
        jurisdiction: 'CH',
        reference: 'SR 220, Art. 1',
        relevance: 'Swiss Code of Obligations - Contract formation requirements'
      },
      {
        jurisdiction: 'CH',
        reference: 'SR 220, Art. 11',
        relevance: 'Swiss freedom of form principle'
      }
    ]
  },

  // Fallback for unmatched queries
  'default': {
    queryText: 'General legal comparison',
    analysis: `This query requires specific legal research across the selected jurisdictions. The International Bridge feature analyzes legal frameworks by comparing statutory provisions, case law, and regulatory guidance.

For precise comparative analysis, please specify:
- Particular legal areas (e.g., data protection, contract law, employment law)
- Specific statutes or regulations to compare
- Practical scenarios requiring cross-jurisdictional guidance

The system will then provide detailed analysis with source citations from official legal databases.`,
    keyDifferences: ['Query requires more specific parameters for detailed comparison'],
    similarities: ['Common legal principles may apply across jurisdictions'],
    practicalImplications: 'Refine your query with specific legal topics for comprehensive cross-jurisdictional analysis.',
    sources: []
  }
};

export const getComparisonResponse = (queryKey: string): ComparisonResponse => {
  return mockComparisons[queryKey] || mockComparisons['default'];
};

export const findBestMatch = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('gdpr') && lowerQuery.includes('swiss')) {
    return 'gdpr-swiss-data-protection';
  }
  if (lowerQuery.includes('breach') && lowerQuery.includes('notification')) {
    return 'data-breach-notification';
  }
  if (lowerQuery.includes('transfer') || lowerQuery.includes('cross-border')) {
    return 'cross-border-data-transfer';
  }
  if (lowerQuery.includes('contract') && (lowerQuery.includes('french') || lowerQuery.includes('france'))) {
    return 'contract-formation-swiss-french';
  }
  
  return 'default';
};