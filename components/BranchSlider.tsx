'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import { BRANCHES_DATA, Branch } from '@/data/gymData';

export const BranchSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = BRANCHES_DATA.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide every 4 seconds per JSON specification
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="branches-section"
      className="py-24 bg-[#0a0c12] relative overflow-hidden scroll-mt-20 border-t border-b border-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span>Network of Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Our Regional Branches
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Architecturally sculpted athletic facilities featuring Olympic lifting platforms, Hyrox tracks, and recovery spas across the city.
            </p>
          </div>

          {/* Controls: Arrow buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Branch"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-lime-400/10 text-white hover:text-lime-400 flex items-center justify-center transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Branch"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-lime-400/10 text-white hover:text-lime-400 flex items-center justify-center transition-all"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BRANCHES_DATA.map((branch) => (
              <div key={branch.id} className="w-full shrink-0 px-2 sm:px-3">
                <div className="relative bg-[#0f111a] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                  {/* Left Column: Background Gym Location Picture */}
                  <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full overflow-hidden">
                    <ImageWithFallback
                      src={branch.image}
                      alt={branch.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-[#0f111a]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0f111a]/40 lg:to-[#0f111a]" />
                    
                    {/* Location Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 text-xs text-white">
                      <MapPin size={13} className="text-lime-400" />
                      <span className="font-semibold">{branch.area}</span>
                    </div>
                  </div>

                  {/* Right Column: Card Details */}
                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-[#0f111a]">
                    <div className="space-y-4">
                      {/* Rating: Google Review Stars */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={15}
                              className={i < Math.floor(branch.rating) ? 'fill-amber-400' : 'text-zinc-600'}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-white font-mono">
                          {branch.rating}
                        </span>
                        <span className="text-xs text-zinc-500">
                          ({branch.reviewCount.toLocaleString()} Google Reviews)
                        </span>
                      </div>

                      {/* Gym Branch Name */}
                      <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                        {branch.name}
                      </h3>

                      {/* Full Address */}
                      <div className="text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
                        <MapPin size={14} className="text-lime-400 shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </div>

                      {/* Branch Key Highlights */}
                      <div className="pt-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Featured Facilities:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {branch.facilities.slice(0, 5).map((fac) => (
                            <span
                              key={fac}
                              className="px-2.5 py-1 text-[11px] font-medium bg-white/5 border border-white/10 rounded text-zinc-300"
                            >
                              {fac}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Club Activities:
                        </p>
                        <p className="text-xs text-zinc-300 leading-normal">
                          {branch.classes.join(' · ')}
                        </p>
                      </div>
                    </div>

                    {/* CTA: View More Details (opens in new tab) */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-zinc-500 font-mono">
                        {branch.hours}
                      </span>
                      <a
                        href={`/branch-details?branch=${branch.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)]"
                      >
                        <span>View More Details</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {BRANCHES_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to branch ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-lime-400' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchSlider;
