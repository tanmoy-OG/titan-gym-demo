'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';
import ColoredTick from '@/components/ColoredTick';
import { ALL_PROGRAMS, ProgramItem } from '@/data/gymData';
import { ArrowRight, Flame, Shield, Check, Play, ExternalLink } from 'lucide-react';

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Tiers', 'Specialty', 'Coaching'];

  const filteredPrograms = ALL_PROGRAMS.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Tiers') return p.category === 'Tier';
    if (selectedCategory === 'Specialty') return p.category === 'Specialty';
    if (selectedCategory === 'Coaching') return p.category === 'Coaching';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Banner */}
        <section className="py-20 bg-gradient-to-b from-[#0b0d14] to-[#08090d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-lime-400 text-xs font-bold uppercase tracking-wider">
              <span>Comprehensive Performance Curriculum</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              Titan Training Programs
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              10 specialized disciplines ranging from foundational tier passes to Olympic lifting, Hyrox race training, and high-energy Zumba.
            </p>

            {/* Quick Filter Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-lime-400 text-black shadow-lg font-black'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Chronological Page Sections for All 10 Programs per JSON specification */}
        <div className="space-y-0">
          {filteredPrograms.map((prog, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <section
                key={prog.id}
                id={`program-${prog.slug}`}
                className="relative py-24 sm:py-28 overflow-hidden border-b border-white/10 scroll-mt-20 group"
              >
                {/* Background: Video relevant to specific program */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={prog.image}
                    className="w-full h-full object-cover opacity-20 scale-105 group-hover:scale-100 transition-transform duration-1000"
                  >
                    <source
                      src="https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-a-barbell-in-a-gym-44026-large.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/85 to-[#08090d]/90" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Element 1: Image (Program visual) */}
                    <div
                      className={`lg:col-span-6 ${
                        isReversed ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-white/15 shadow-2xl group/img">
                        <ImageWithFallback
                          src={prog.image}
                          alt={`${prog.title} program visual`}
                          fill
                          className="object-cover group-hover/img:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono font-bold text-lime-400">
                          Program 0{index + 1} / 10
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span className="text-xs uppercase font-mono tracking-wider text-zinc-300">
                            Intensity: {prog.intensity}
                          </span>
                          <span className="text-xs text-lime-400 font-semibold">
                            {prog.suitableFor}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Element 2: Title (Name of program) & Element 3: Checklist (Services marked with colored ticks) */}
                    <div
                      className={`lg:col-span-6 space-y-6 ${
                        isReversed ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-widest text-lime-400">
                            {prog.category} Curriculum
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-xs text-zinc-400">
                            {prog.includedInTiers.join(', ')}
                          </span>
                        </div>

                        {/* Title of the program */}
                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                          {prog.title}
                        </h2>

                        <p className="text-base text-zinc-300 leading-relaxed">
                          {prog.description}
                        </p>
                      </div>

                      {/* Checklist: Services provided, marked with colored ticks */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                          Curriculum Inclusions & Services:
                        </span>
                        <ul className="space-y-3">
                          {prog.checklist.map((service, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-3 text-sm text-zinc-200">
                              <ColoredTick color="lime" size="md" className="mt-0.5" />
                              <span className="leading-snug">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Standalone Program Pricing & Payment CTA */}
                      <div className="pt-2 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-lime-400">
                            {prog.category === 'Tier' ? 'All-Access Membership Tier' : 'Standalone Program Pass'}
                          </span>
                          <span className="text-[10px] px-2.5 py-0.5 rounded bg-lime-400/10 text-lime-300 border border-lime-400/20 font-bold uppercase">
                            {prog.category === 'Tier' ? 'Full Facility Access' : 'No Package Needed'}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          {/* Line 1: ₹price / month on one single line */}
                          <div className="flex items-baseline gap-2 whitespace-nowrap">
                            <span className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                              ₹{prog.monthlyPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs sm:text-sm text-zinc-300 font-bold uppercase tracking-wider">
                              / month
                            </span>
                          </div>

                          {/* Line 2: Monthly price if annual is chosen */}
                          <div className="text-xs font-mono text-zinc-400 flex flex-wrap items-center gap-2">
                            <span>₹{prog.annualPrice.toLocaleString('en-IN')} / month if billed annually</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime-400/10 text-lime-400 font-bold">
                              Save ~20%
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {prog.category === 'Tier'
                            ? `All-inclusive multi-facility membership including ${prog.title} privileges`
                            : `Full standalone access to all ${prog.title} curriculum & equipment`}
                        </p>

                        {/* Button moved to the bottom of the div */}
                        <div className="pt-1">
                          <Link
                            href={
                              prog.category === 'Tier'
                                ? `/payment?plan=${prog.slug === 'silver' ? 'silver-plan' : prog.slug === 'gold' ? 'gold-plan' : 'elite-plan'}`
                                : `/payment?program=${prog.slug}`
                            }
                            className="w-full py-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black uppercase text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] flex items-center justify-center gap-2 group/btn"
                          >
                            <span>
                              {prog.category === 'Tier' ? `Choose ${prog.title} Tier Pass` : `Buy ${prog.title} Pass`}
                            </span>
                            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                        <span className="text-[11px] text-zinc-400">
                          {prog.category === 'Tier' ? 'Tier classification:' : 'Also included in membership packages:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {prog.includedInTiers.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-mono text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                        <a
                          href="/plan-page"
                          className="sm:ml-auto text-lime-400 hover:text-lime-300 hover:underline font-bold uppercase tracking-wider text-[11px]"
                        >
                          Compare All-Inclusive Bundles ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
