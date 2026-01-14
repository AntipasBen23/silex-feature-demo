'use client';

import { useEffect, useState } from 'react';
import { ComparisonResult } from '@/types';
import { SourceCitation } from './source-citation';
import { streamText } from '@/lib/utils';
import { getLegalSourcesByJurisdiction } from '@/lib/mock-legal-data';

interface ComparisonResultsProps {
  result: ComparisonResult;
}

export function ComparisonResults({ result }: ComparisonResultsProps) {
  const [streamedAnalysis, setStreamedAnalysis] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    let cancelled = false;
    
    const streamAnalysis = async () => {
      setStreamedAnalysis('');
      setIsStreaming(true);

      const generator = streamText(result.analysis, 15);
      
      for await (const chunk of generator) {
        if (cancelled) break;
        setStreamedAnalysis(prev => prev + chunk);
      }
      
      if (!cancelled) {
        setIsStreaming(false);
      }
    };

    streamAnalysis();

    return () => {
      cancelled = true;
    };
  }, [result.analysis]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Query Header */}
      <div className="bg-gradient-silex rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-sm font-medium opacity-90">Your Query</span>
            </div>
            <h2 className="text-xl font-semibold">{result.query.text}</h2>
          </div>
          
          <div className="flex gap-2">
            {result.query.jurisdictions.map(jurisdiction => (
              <span
                key={jurisdiction}
                className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium"
              >
                {jurisdiction}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-silex rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Comparative Analysis</h3>
          {isStreaming && (
            <div className="ml-auto flex items-center gap-2 text-xs text-silex-blue">
              <div className="w-2 h-2 bg-silex-blue rounded-full animate-pulse" />
              Generating...
            </div>
          )}
        </div>

        <div className="prose prose-slate max-w-none">
          <div className="text-slate-700 leading-relaxed whitespace-pre-line">
            {streamedAnalysis}
            {isStreaming && (
              <span className="inline-block w-1 h-5 bg-silex-blue animate-pulse ml-0.5" />
            )}
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Key Differences</h3>
        </div>

        <ul className="space-y-3">
          {result.keyDifferences.map((diff, idx) => (
            <li key={idx} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex-shrink-0 w-6 h-6 bg-red-50 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-semibold text-red-600">{idx + 1}</span>
              </div>
              <span className="text-sm text-slate-700 flex-1">{diff}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Similarities */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Common Ground</h3>
        </div>

        <ul className="space-y-3">
          {result.similarities.map((sim, idx) => (
            <li key={idx} className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex-shrink-0 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-slate-700 flex-1">{sim}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Practical Implications */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Practical Implications</h3>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {result.practicalImplications}
        </p>
      </div>

      {/* Legal Sources */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-silex-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-silex-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Legal Sources</h3>
          <span className="ml-auto text-xs text-slate-500">{result.sources.length} citations</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {result.sources.map((source, idx) => (
            <SourceCitation key={idx} source={source} index={idx} />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Analysis
        </button>

        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-silex rounded-lg hover:shadow-lg hover:scale-105 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Report
        </button>
      </div>
    </div>
  );
}