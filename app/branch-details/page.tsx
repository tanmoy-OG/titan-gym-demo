'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';
import ColoredTick from '@/components/ColoredTick';
import MapsGroundingWidget from '@/components/MapsGroundingWidget';
import { BRANCHES_DATA, Branch } from '@/data/gymData';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Car,
  ShowerHead,
  DoorOpen,
  Droplets,
  Video,
  Lock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Compass,
} from 'lucide-react';

function BranchDetailsContent() {
  const searchParams = useSearchParams();
  const branchParam = searchParams.get('branch');

  const [userSelectedBranchId, setUserSelectedBranchId] = useState<string | null>(null);

  const selectedBranch =
    BRANCHES_DATA.find((b) => b.id === (userSelectedBranchId || branchParam)) ||
    BRANCHES_DATA[0];

  const facilityIcons: Record<string, React.ReactNode> = {
    Parking: <Car className="w-5 h-5 text-lime-400" />,
    Showering: <ShowerHead className="w-5 h-5 text-lime-400" />,
    'Changing Room': <DoorOpen className="w-5 h-5 text-lime-400" />,
    Washroom: <DoorOpen className="w-5 h-5 text-lime-400" />,
    'Drinking Water': <Droplets className="w-5 h-5 text-lime-400" />,
    CCTV: <Video className="w-5 h-5 text-lime-400" />,
    Locker: <Lock className="w-5 h-5 text-lime-400" />,
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Branch Selector Bar */}
        <section className="bg-[#0b0d14] border-b border-white/10 sticky top-[72px] z-30 py-3 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 shrink-0">
                Select Branch:
              </span>
              <div className="flex items-center gap-2">
                {BRANCHES_DATA.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setUserSelectedBranchId(b.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                      selectedBranch.id === b.id
                        ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {b.name.replace('Titan ', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Branch Header Banner */}
        <section className="py-12 bg-gradient-to-b from-[#0b0d14] to-[#08090d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-lime-400 font-bold uppercase tracking-wider">
                  <MapPin size={14} />
                  <span>{selectedBranch.area} · {selectedBranch.city}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  {selectedBranch.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star size={14} className="fill-amber-400" />
                    <span>{selectedBranch.rating}</span>
                    <span className="text-zinc-500 font-normal">({selectedBranch.reviewCount} Google Reviews)</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock size={13} className="text-lime-400" />
                    <span>{selectedBranch.hours}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <Compass size={14} className="text-lime-400" />
                  <span>Get Directions</span>
                </a>
                <Link
                  href="/payment"
                  className="px-6 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                >
                  Join This Branch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            1. FACILITY GALLERY
            layout: Horizontally scrollable gallery (Gym space, classes)
        ========================================================================= */}
        <section className="py-16 bg-[#08090d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-1">
                  Visual Tour
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Facility Gallery
                </h2>
              </div>
              <span className="text-xs text-zinc-500 font-mono">
                ← Swipe / Scroll horizontally →
              </span>
            </div>

            {/* Horizontally scrollable gallery */}
            <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
              {[selectedBranch.image, ...selectedBranch.gallery].map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative min-w-[320px] sm:min-w-[440px] h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0 snap-start group"
                >
                  <ImageWithFallback
                    src={imgUrl}
                    alt={`${selectedBranch.name} facility photo ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {idx === 0 ? 'Main Athletic Arena & Rigs' : `Facility Zone 0${idx}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. LOCATION INFO
            elements: ["Full Address", "Interactive Map"]
        ========================================================================= */}
        <section className="py-16 bg-[#0a0c12] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-1">
                Geographic Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Location Info & Interactive Map
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Address card & Details */}
              <div className="lg:col-span-5 bg-[#0f111a] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                      Full Address:
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-white leading-relaxed flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                      <span>{selectedBranch.address}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                        Phone:
                      </span>
                      <p className="text-xs text-zinc-300 font-mono">{selectedBranch.phone}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                        Email:
                      </span>
                      <p className="text-xs text-zinc-300 truncate">{selectedBranch.email}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                      Hours of Operation:
                    </span>
                    <p className="text-xs text-zinc-300 font-mono">{selectedBranch.hours}</p>
                  </div>
                </div>

                {/* Google Maps Grounding Widget */}
                <MapsGroundingWidget branch={selectedBranch} />
              </div>

              {/* Interactive Map Canvas Embed */}
              <div className="lg:col-span-7 bg-[#0f111a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[460px] relative">
                <iframe
                  title={`Map of ${selectedBranch.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${selectedBranch.lat},${selectedBranch.lng}&hl=en&z=15&output=embed`}
                />
                <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
                  <span>{selectedBranch.name}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. FACILITIES PROVIDED
            items: ["Parking", "Showering", "Changing Room", "Washroom", "Drinking Water", "CCTV", "Locker"]
        ========================================================================= */}
        <section className="py-16 bg-[#08090d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-2">
                Amenities & Standards
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Facilities Provided
              </h2>
              <p className="mt-2 text-zinc-400 text-xs sm:text-sm">
                Every member amenity engineered to executive grade for seamless transition from work to workout.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {['Parking', 'Showering', 'Changing Room', 'Washroom', 'Drinking Water', 'CCTV', 'Locker'].map(
                (item) => (
                  <div
                    key={item}
                    className="bg-[#0f111a] border border-white/10 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-3 hover:border-lime-400/40 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-lime-400/10 group-hover:border-lime-400/30 transition-colors">
                      {facilityIcons[item] || <Droplets className="w-5 h-5 text-lime-400" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{item}</p>
                      <div className="mt-2 flex items-center justify-center gap-1">
                        <ColoredTick color="lime" size="sm" />
                        <span className="text-[10px] text-zinc-500 font-mono">Verified</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. CLASSES & ACTIVITIES
            content: List of available activities for this specific branch
        ========================================================================= */}
        <section className="py-16 bg-[#0a0c12] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime-400 block mb-1">
                  Active Roster
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Classes & Activities at {selectedBranch.name.split(' ')[1]}
                </h2>
                <p className="mt-2 text-zinc-400 text-xs sm:text-sm max-w-xl">
                  Daily instructor-led sessions scheduled from 5:30 AM to 8:30 PM.
                </p>
              </div>

              <Link
                href="/programs"
                className="text-xs font-bold uppercase tracking-wider text-lime-400 hover:text-lime-300 flex items-center gap-1.5"
              >
                <span>Full Program Breakdown</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedBranch.classes.map((cls, idx) => (
                <div
                  key={idx}
                  className="bg-[#0f111a] border border-white/10 rounded-2xl p-6 flex items-start justify-between group hover:border-lime-400/30 transition-all"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-lime-400">
                      Activity 0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors">
                      {cls}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Coached daily with certified instructors and equipment setup.
                    </p>
                  </div>
                  <ColoredTick color="lime" size="md" className="shrink-0 ml-3" />
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
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop"
              alt="Join Now Cool Gym Body Picture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/70" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
              Claim Your Space On The Turf
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Experience {selectedBranch.name} In Person
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
              Get full single-branch or universal multi-club access with our membership plans.
            </p>
            <div>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black uppercase tracking-wider text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(163,230,53,0.35)]"
              >
                <span>Join Now</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function BranchDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090d] text-white flex items-center justify-center">Loading Branch Details...</div>}>
      <BranchDetailsContent />
    </Suspense>
  );
}
