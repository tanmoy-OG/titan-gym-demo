'use client';

import React, { useState } from 'react';
import { Search, Globe, ExternalLink, Loader2, Dumbbell, ShieldCheck } from 'lucide-react';

export const SearchGroundingWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; sources: { title: string; uri: string }[] } | null>(null);

  const sampleQueries = [
    'What are the official Hyrox competition race station standards?',
    'What does recent sports science say about optimal rest between sets for hypertrophy?',
    'How much protein per kilogram is recommended for strength athletes in 2026?',
  ];

  const handleSearch = async (targetQuery?: string) => {
    const q = targetQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/gemini/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0e1017] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
        <Globe className="w-4 h-4" />
        <span>Grounded with Google Search Live Data</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
        Ask Titan Sports Science & Trends
      </h3>
      <p className="text-xs sm:text-sm text-zinc-400 mb-6">
        Get real-time verified training intelligence, official Hyrox event standards, and evidence-based nutrition backed by Google Search grounding.
      </p>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ask anything about current fitness research, competition rules, nutrition..."
            className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
          />
        </div>
        <button
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
          className="px-6 py-3 bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.3)]"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>Verify Facts</span>
        </button>
      </div>

      {/* Quick query chips */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-[11px] font-semibold text-zinc-500">Suggested Queries:</span>
        {sampleQueries.map((sq, i) => (
          <button
            key={i}
            onClick={() => {
              setQuery(sq);
              handleSearch(sq);
            }}
            className="text-[11px] text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-full transition-colors text-left"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Results output */}
      {result && (
        <div className="pt-5 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-xs font-semibold text-lime-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Search-Grounded Coach Assessment (gemini-3.5-flash):</span>
          </div>

          <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5 whitespace-pre-wrap">
            {result.text}
          </div>

          {/* Source Links per Grounding Guidelines */}
          {result.sources && result.sources.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Grounding Sources & Citations:
              </p>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-lime-400/10 border border-white/10 hover:border-lime-400/30 rounded-lg text-[11px] font-medium text-zinc-300 hover:text-lime-300 transition-all"
                  >
                    <Globe size={11} className="text-lime-400" />
                    <span className="max-w-[220px] truncate">{src.title}</span>
                    <ExternalLink size={10} className="text-zinc-500" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchGroundingWidget;
