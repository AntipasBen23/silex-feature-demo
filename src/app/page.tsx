'use client';

import { useState } from 'react';
import { Jurisdiction, ComparisonResult } from '@/types';
import { JurisdictionSelector } from '@/components/jurisdiction-selector';
import { QueryInput } from '@/components/query-input';
import { ComparisonResults } from '@/components/comparison-results';
import { LoadingState } from '@/components/loading-state';
import { findBestMatch, getComparisonResponse } from '@/lib/mock-ai-responses';
import { generateId, simulateProcessingDelay } from '@/lib/utils';

export default function Home() {
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<Jurisdiction[]>(['CH', 'EU']);
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a legal query');
      return;
    }

    if (selectedJurisdictions.length < 2) {
      setError('Please select at least 2 jurisdictions to compare');
      return;
    }

    setError(null);
    setIsLoading(true);
    setComparisonResult(null);

    try {
      
      await simulateProcessingDelay(2500);

      // Fi
      const matchKey = findBestMatch(query);
      const response = getComparisonResponse(matchKey);

      const result: ComparisonResult = {
        ...response,
        id: generateId(),
        query: {
          text: query,
          jurisdictions: selectedJurisdictions,
          timestamp: Date.now(),
        },
        createdAt: new Date(),
        streamingComplete: false,
      };

      setComparisonResult(result);
    } catch (err) {
      setError('An error occurred while processing your query. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJurisdictionToggle = (jurisdiction: Jurisdiction) => {
    setSelectedJurisdictions(prev => {
      if (prev.includes(jurisdiction)) {
        // Don't allow deselecting if only 2 remain
        if (prev.length <= 2) return prev;
        return prev.filter(j => j !== jurisdiction);
      } else {
        return [...prev, jurisdiction];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-silex rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-silex bg-clip-text text-transparent">
                  Silex International Bridge
                </h1>
                <p className="text-xs text-slate-500">Cross-jurisdictional legal intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium bg-gradient-silex text-white rounded-full">
                DEMO
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Compare Legal Frameworks Across Jurisdictions
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Instantly analyze and compare Swiss, EU, and UK legal provisions with AI-powered precision.
            Get sourced insights for cross-border matters in seconds.
          </p>
        </div>

        {/* Jurisdiction Selector */}
        <div className="mb-8">
          <JurisdictionSelector
            selectedJurisdictions={selectedJurisdictions}
            onToggle={handleJurisdictionToggle}
          />
        </div>

        {/* Query Input */}
        <div className="mb-8">
          <QueryInput
            onSearch={handleSearch}
            isLoading={isLoading}
            selectedJurisdictions={selectedJurisdictions}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Comparison Results */}
        {comparisonResult && !isLoading && (
          <ComparisonResults result={comparisonResult} />
        )}

        {/* Example Queries */}
        {!comparisonResult && !isLoading && (
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Try these example queries:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Compare GDPR Article 6 with Swiss Federal Data Protection Act',
                'What are the data breach notification requirements in EU vs Switzerland?',
                'Analyze cross-border data transfer rules: EU-Swiss framework',
                'Compare contract formation requirements: Swiss OR vs French Code Civil',
              ].map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(example)}
                  className="text-left p-4 bg-white border border-slate-200 rounded-lg hover:border-silex-blue hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-silex-teal mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">{example}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Features Grid */}
        {!comparisonResult && !isLoading && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-silex rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Source-Verified Analysis</h4>
              <p className="text-sm text-slate-600">Every comparison backed by official legal sources with direct citations</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-silex rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Lightning Fast</h4>
              <p className="text-sm text-slate-600">Get comprehensive comparative analysis in seconds, not hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-silex rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Swiss-Hosted Security</h4>
              <p className="text-sm text-slate-600">Built on Silex's secure infrastructure with zero data training</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Powered by <span className="font-semibold text-silex-blue">Silex</span> AI Legal Intelligence
            </p>
            <div className="flex items-center gap-6">
              <a href="https://silex.legal" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-silex-blue transition-colors">
                About Silex
              </a>
              <a href="https://silex.legal/securite" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-silex-blue transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}