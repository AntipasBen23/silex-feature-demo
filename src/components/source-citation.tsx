'use client';

import { useState } from 'react';
import { Jurisdiction } from '@/types';
import { getJurisdictionBadgeClasses, cn } from '@/lib/utils';
import { legalSources } from '@/lib/mock-legal-data';

interface SourceCitationProps {
  source: {
    jurisdiction: 'CH' | 'EU' | 'UK';
    reference: string;
    relevance: string;
  };
  index: number;
}

export function SourceCitation({ source, index }: SourceCitationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Find full source details from mock data
  const fullSource = getLegalSourcesByJurisdiction(source.jurisdiction).find(
    s => s.reference === source.reference
  );

  const jurisdictionInfo = {
    CH: { name: 'Switzerland', flag: '🇨🇭' },
    EU: { name: 'European Union', flag: '🇪🇺' },
    UK: { name: 'United Kingdom', flag: '🇬🇧' },
  };

  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:border-silex-blue transition-colors animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-start gap-4">
        {/* Jurisdiction Badge */}
        <div className="flex-shrink-0">
          <div className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center text-xl',
            getJurisdictionBadgeClasses(source.jurisdiction)
          )}>
            {jurisdictions.find(j => j.code === source.jurisdiction)?.flag}
          </div>
        </div>

        {/* Source Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">{source.reference}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{source.relevance}</p>
            </div>
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-md border',
              getJurisdictionBadgeClasses(source.jurisdiction)
            )}>
              {source.jurisdiction}
            </span>
          </div>

          {/* Source Link */}
          
            href={getSourceUrl(source.jurisdiction, source.reference)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs text-silex-blue hover:text-silex-purple-600 font-medium transition-colors group"
          >
            View official source
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}