'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';
import ColoredTick from '@/components/ColoredTick';
import { GYM_INFO, TRAINERS_DATA } from '@/data/gymData';
import { ArrowRight, Trophy, Flame, Shield, Users, HeartPulse } from 'lucide-react';

export default function AboutPage() {
  const valueIcons = [Flame, Shield, Users, HeartPulse, Trophy];

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            1. OUR STORY
            Content: Catchy story and gym goals
            Visual: Featured Image
        ========================================================================= */}
        <section className="py-20 lg:py-28 relative overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-lime-400 text-xs font-bold uppercase tracking-wider">
                  <span>Our Genesis & Philosophy</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
                  Forged In Iron. Driven By Science. Built For Life.
                </h1>

                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                  Founded in 2012, Titan Athletic Club began with an uncompromising mission: to rescue commercial fitness from mediocre machines, gimmicky trends, and sterile environments. We set out to build an authentic cathedral of human performance where everyday people train alongside elite competitors.
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  Our clubs are engineered with purpose: Olympic barbells calibrated to within grams, custom high-density turf that cushions sprint deceleration, contrast therapy plunge suites to reset your autonomic nervous system, and coaches who hold master credentials in exercise physiology.
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <div>
                    <p className="text-3xl font-black text-lime-400 font-mono">14+</p>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Years of Pure Iron</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <p className="text-3xl font-black text-white font-mono">25,000+</p>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Lives Transformed</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div>
                    <p className="text-3xl font-black text-emerald-400 font-mono">0%</p>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Compromises Made</p>
                  </div>
                </div>
              </div>

              {/* Featured Visual */}
              <div className="lg:col-span-6 relative">
                <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
                    alt="Titan Athletic Club Story Main Arena"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-lime-400 block mb-1">
                      Metropolis Flagship Arena
                    </span>
                    <p className="text-sm font-bold text-white">
                      Where 25,000+ members pursue physical excellence every single day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. STATISTICS
            Metrics: Total years running, Active members, Weekly classes, Fitness professionals, Total trainers
        ========================================================================= */}
        <section className="py-20 bg-[#0c0e15] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                Quantitative Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Our Scale In Numbers
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {GYM_INFO.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 text-center space-y-2 hover:border-lime-400/40 transition-all"
                >
                  <p className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CORE VALUES
            Content: List of values
        ========================================================================= */}
        <section className="py-24 bg-[#08090d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                Guiding Principles
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Titan Core Values
              </h2>
              <p className="mt-3 text-zinc-400 text-sm">
                The non-negotiables that anchor every barbell rack, coaching cue, and club policy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {GYM_INFO.coreValues.map((val, idx) => {
                const IconComponent = valueIcons[idx % valueIcons.length];
                return (
                  <div
                    key={idx}
                    className="bg-[#0e1017] border border-white/10 rounded-2xl p-8 hover:border-lime-400/40 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-colors">
                        <IconComponent size={22} />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-lime-400">
                      <ColoredTick color="lime" size="sm" />
                      <span>Titan Standard</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. TRAINER GALLERY
            layout: Card Gallery
            card_details: { picture: Headshot, name: Trainer Name, speciality: Expertise area, experience: Years of experience }
        ========================================================================= */}
        <section className="py-24 bg-[#0a0c12] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                  Elite Coaching Staff
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  Trainer Gallery
                </h2>
                <p className="mt-2 text-zinc-400 text-sm max-w-xl">
                  Led by certified strength specialists, physical therapists, and Hyrox master trainers.
                </p>
              </div>

              <div className="text-xs text-zinc-400">
                <span>42+ Active Resident Coaches Across All Branches</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TRAINERS_DATA.map((tr) => (
                <div
                  key={tr.id}
                  className="bg-[#0f111a] border border-white/10 rounded-2xl overflow-hidden group hover:border-lime-400/40 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Headshot Picture */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                      <ImageWithFallback
                        src={tr.image}
                        alt={tr.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-transparent" />
                      
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[11px] font-mono text-lime-400 uppercase tracking-wider block">
                          {tr.experience}
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {tr.name}
                        </h3>
                      </div>
                    </div>

                    {/* Speciality & Details */}
                    <div className="p-5 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                          Speciality:
                        </span>
                        <p className="text-xs font-semibold text-zinc-200 leading-snug">
                          {tr.speciality}
                        </p>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                        {tr.bio}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {tr.certifications.map((c, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded text-zinc-300"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href="/programs"
                      className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-lime-400 hover:text-black text-zinc-300 font-bold uppercase text-[11px] tracking-wider transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Train With {tr.name.split(' ')[0]}</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. JOIN NOW CTA
            Background: Cool gym body picture
            Button: { label: "Join Now", action: "navigate", target: "/programs" }
        ========================================================================= */}
        <section className="relative py-28 overflow-hidden">
          {/* Cool gym body picture background */}
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
              alt="Join Now Cool Gym Body Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/75" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
              Your Transformation Starts Today
            </span>

            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Ready To Rewrite Your Limits?
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto">
              Join thousands of dedicated members who make Titan Athletic Club their daily training sanctuary.
            </p>

            <div className="pt-4">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black uppercase tracking-wider text-sm transition-all shadow-[0_0_30px_rgba(163,230,53,0.4)] hover:scale-105 active:scale-95"
              >
                <span>Join Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
