'use client';

import type { Jurisdiction } from '@/types';
import { jurisdictions } from '@/lib/mock-legal-data';
import { cn } from '@/lib/utils';

interface JurisdictionSelectorProps {
  selectedJurisdictions: Jurisdiction[];
  onToggle: (jurisdiction: Jurisdiction) => void;
}

export function JurisdictionSelector({
  selectedJurisdictions,
  onToggle,
}: JurisdictionSelectorProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-silex-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-slate-900">Select Jurisdictions</h3>
        <span className="ml-auto text-xs text-slate-500">
          {selectedJurisdictions.length} selected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jurisdictions.map((jurisdiction) => {
          const isSelected = selectedJurisdictions.includes(jurisdiction.code as Jurisdiction);
          const isDisabled = !isSelected && selectedJurisdictions.length >= 3;

          return (
            <button
              key={jurisdiction.code}
              onClick={() => !isDisabled && onToggle(jurisdiction.code as Jurisdiction)}
              disabled={isDisabled}
              className={cn(
                'relative p-4 rounded-lg border-2 transition-all duration-200',
                'hover:scale-105 active:scale-95',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
                isSelected
                  ? 'border-silex-blue bg-gradient-to-br from-silex-purple-50 to-silex-teal-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              )}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-silex-blue rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="flex flex-col items-center gap-3">
                {/* Flag */}
                <div className="text-4xl">{jurisdiction.flag}</div>

                {/* Name */}
                <div className="text-center">
                  <h4 className={cn(
                    'font-semibold text-base',
                    isSelected ? 'text-silex-blue' : 'text-slate-900'
                  )}>
                    {jurisdiction.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{jurisdiction.code}</p>
                </div>

                {/* Status Badge */}
                <div className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                  isSelected
                    ? 'bg-silex-blue text-white'
                    : 'bg-slate-100 text-slate-600'
                )}>
                  {isSelected ? 'Selected' : 'Available'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Message */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-blue-800">
            Select 2-3 jurisdictions to compare legal frameworks. The system will analyze differences, similarities, and practical implications.
          </p>
        </div>
      </div>
    </div>
  );
}