'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Loader2, Compass } from 'lucide-react';
import { Branch } from '@/data/gymData';

interface MapsGroundingWidgetProps {
  branch: Branch;
}

export const MapsGroundingWidget: React.FC<MapsGroundingWidgetProps> = ({ branch }) => {
  const [userQuery, setUserQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; sources: { title: string; uri: string }[] } | null>(null);

  const sampleQuestions = [
    'Where is the best validated parking?',
    'What public transit stations are within 5 minutes walk?',
    'What healthy post-workout protein restaurants are nearby?',
  ];

  const handleFetchDirections = async (customQ?: string) => {
    const q = customQ || userQuery;
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branchName: branch.name,
          address: branch.address,
          lat: branch.lat,
          lng: branch.lng,
          userQuery: q,
        }),
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
    <div className="bg-[#0e1017] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400">
        <Navigation className="w-4 h-4" />
        <span>Maps Grounding Navigator (Google Maps Live Data)</span>
      </div>

      <div className="space-y-1">
        <h4 className="text-lg font-bold text-white">
          Explore Surrounding Area & Navigation
        </h4>
        <p className="text-xs text-zinc-400">
          Query real-time geographic data for {branch.name} regarding parking, freeway exits, or transit links.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {sampleQuestions.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => {
              setUserQuery(sq);
              handleFetchDirections(sq);
            }}
            className="text-[11px] text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-md transition-colors text-left"
          >
            📍 {sq}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask for custom directions, nearby hotels, or parking..."
          className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
        />
        <button
          onClick={() => handleFetchDirections()}
          disabled={loading}
          className="px-4 py-2 bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shrink-0"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Compass className="w-3.5 h-3.5" />}
          <span>Lookup</span>
        </button>
      </div>

      {result && (
        <div className="pt-3 border-t border-white/10 space-y-3 animate-in fade-in duration-200">
          <div className="text-xs text-zinc-200 bg-black/50 p-3.5 rounded-xl border border-white/5 leading-relaxed whitespace-pre-wrap">
            {result.text}
          </div>

          {result.sources && result.sources.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Google Maps Verified Links:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((s, i) => (
                  <a
                    key={i}
                    href={s.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 rounded-lg text-xs font-semibold text-lime-400 transition-all"
                  >
                    <MapPin size={12} />
                    <span>{s.title || 'Open in Google Maps'}</span>
                    <ExternalLink size={11} />
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

export default MapsGroundingWidget;
