'use client';

export function LoadingState() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-silex rounded-2xl flex items-center justify-center animate-pulse-soft">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 -m-2">
            <svg className="w-24 h-24 animate-spin" viewBox="0 0 50 50">
              <circle
                className="stroke-silex-teal opacity-25"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
              <circle
                className="stroke-silex-blue"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
                strokeDasharray="80"
                strokeDashoffset="60"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Analyzing Legal Frameworks...
          </h3>
          <p className="text-sm text-slate-600 max-w-md">
            Searching through Swiss, EU, and UK legal databases for relevant provisions
          </p>
        </div>

        {/* Progress Steps */}
        <div className="w-full max-w-md space-y-3">
          {[
            { label: 'Parsing query context', delay: 0 },
            { label: 'Searching legal databases', delay: 200 },
            { label: 'Analyzing cross-jurisdictional provisions', delay: 400 },
            { label: 'Generating comparative insights', delay: 600 },
          ].map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-silex-teal rounded-full animate-pulse-soft" />
              </div>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-silex animate-loading-bar"
                  style={{ animationDelay: `${step.delay}ms` }}
                />
              </div>
              <span className="text-xs text-slate-500 min-w-[180px]">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Estimated Time */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Estimated time: 2-3 seconds</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}