'use client';

import { useState, FormEvent } from 'react';
import { Jurisdiction } from '@/types';
import { cn } from '@/lib/utils';

interface QueryInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  selectedJurisdictions: Jurisdiction[];
}

export function QueryInput({ onSearch, isLoading, selectedJurisdictions }: QueryInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  const exampleQueries = [
    'Compare GDPR with Swiss data protection',
    'Data breach notification requirements',
    'Cross-border data transfer rules',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-silex-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-900">Legal Query</h3>
        </div>

        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a comparative legal question... (e.g., 'Compare GDPR Article 6 with Swiss Federal Data Protection Act')"
            className={cn(
              'w-full px-4 py-3 pr-12 border-2 rounded-lg resize-none',
              'focus:outline-none focus:ring-2 focus:ring-silex-blue focus:border-transparent',
              'placeholder:text-slate-400 text-slate-900',
              'transition-all duration-200',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
            rows={3}
            disabled={isLoading}
          />

          {/* Character Count */}
          <div className="absolute bottom-3 right-3 text-xs text-slate-400">
            {query.length} / 500
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-2">
            {exampleQueries.slice(0, 2).map((example, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(example)}
                disabled={isLoading}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-md',
                  'border border-slate-200 bg-slate-50',
                  'hover:border-silex-blue hover:bg-silex-purple-50',
                  'transition-colors duration-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {example}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim() || selectedJurisdictions.length < 2}
            className={cn(
              'px-6 py-2.5 rounded-lg font-semibold',
              'bg-gradient-silex text-white',
              'hover:shadow-lg hover:scale-105',
              'active:scale-95',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none',
              'flex items-center gap-2'
            )}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Compare
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}