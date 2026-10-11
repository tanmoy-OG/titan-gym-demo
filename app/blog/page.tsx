'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';
import MemberAuthModal from '@/components/MemberAuthModal';
import { TRANSFORMATIONS_DATA, TransformationItem } from '@/data/gymData';
import { Star, ShieldCheck, PenSquare, ArrowRight, X, Calendar, User, Dumbbell, Quote } from 'lucide-react';

export default function BlogPage() {
  const [stories, setStories] = useState<TransformationItem[]>(TRANSFORMATIONS_DATA);
  const [activeStoryModal, setActiveStoryModal] = useState<TransformationItem | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleStoryPublished = (newStory: TransformationItem) => {
    setStories([newStory, ...stories]);
    setActiveStoryModal(newStory);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner with Author CTA */}
        <section className="py-20 bg-gradient-to-b from-[#0b0d14] to-[#08090d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-lime-400 text-xs font-bold uppercase tracking-wider">
                  <span>Transformation Chronicles</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
                  Success & Transformation Stories
                </h1>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Real members, quantifiable metrics, and unfiltered stories of dedication forged inside Titan Athletic Club.
                </p>
              </div>

              {/* Access Control Trigger: Write access requires membership verification */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black uppercase text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] flex items-center gap-2"
                >
                  <PenSquare size={16} />
                  <span>Author Transformation Story</span>
                </button>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <ShieldCheck size={13} className="text-lime-400" />
                  <span>Write-access restricted to Certified Members</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card-Style Gallery Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((item) => (
              <div
                key={item.id}
                id={`story-${item.id}`}
                onClick={() => setActiveStoryModal(item)}
                className="bg-[#0f111a] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-lime-400/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Transformation Visual (After photo with before peek) */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <ImageWithFallback
                      src={item.afterImage}
                      alt={`${item.name} Transformation Result`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-[#0f111a]/30 to-transparent" />
                    
                    {/* Duration badge */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-lime-400 border border-white/15">
                      {item.duration}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-lime-400 block mb-0.5">
                        {item.program}
                      </span>
                      {/* Candidate Name */}
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-6 space-y-4">
                    {/* Star Rating given to gym */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < item.rating ? 'fill-amber-400' : 'text-zinc-600'}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{item.rating}.0 / 5.0 Rating</span>
                    </div>

                    {/* Short Snippet of the transformation */}
                    <p className="text-xs text-zinc-300 leading-relaxed italic line-clamp-3">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                      {item.weightLoss && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                          {item.weightLoss}
                        </span>
                      )}
                      {item.muscleGain && (
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px]">
                          {item.muscleGain}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card CTA: Opens full-page / modal blog post */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                  <span className="text-[11px] text-zinc-500">{item.date}</span>
                  <span className="text-xs font-bold text-lime-400 group-hover:text-lime-300 flex items-center gap-1">
                    <span>Read Full Story</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full-Page Detailed Story Modal */}
        {activeStoryModal && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveStoryModal(null)}
          >
            <div
              className="bg-[#0f111a] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] sm:max-h-[88vh] flex flex-col overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-48 sm:h-60 w-full shrink-0 overflow-hidden">
                <ImageWithFallback
                  src={activeStoryModal.afterImage}
                  alt={activeStoryModal.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-[#0f111a]/60 to-black/40" />
                
                <button
                  onClick={() => setActiveStoryModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white z-10 transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-lime-400 text-black font-black text-[10px] uppercase font-mono">
                      {activeStoryModal.duration} Journey
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                    {activeStoryModal.name}&apos;s Transformation
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-8 space-y-6 flex-1 min-h-0 overflow-y-auto">
                {/* Quote */}
                <div className="bg-lime-400/5 border-l-2 border-lime-400 p-4 rounded-r-xl">
                  <p className="text-sm sm:text-base italic text-zinc-200">
                    &ldquo;{activeStoryModal.quote}&rdquo;
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-black/50 p-4 rounded-xl border border-white/5 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Program</span>
                    <span className="text-xs font-bold text-white">{activeStoryModal.program}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Coach</span>
                    <span className="text-xs font-bold text-lime-400">{activeStoryModal.trainer}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Fat Lost</span>
                    <span className="text-xs font-bold text-emerald-400">{activeStoryModal.weightLoss || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Lean Mass</span>
                    <span className="text-xs font-bold text-cyan-400">{activeStoryModal.muscleGain || 'N/A'}</span>
                  </div>
                </div>

                {/* Full Journey Prose */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    The Complete Story:
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {activeStoryModal.fullStory}
                  </p>
                </div>

                {/* Before & After Comparison Photos */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Side-by-Side Visual Proof:
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10">
                      <ImageWithFallback
                        src={activeStoryModal.beforeImage}
                        alt="Before"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-lime-400/30">
                      <ImageWithFallback
                        src={activeStoryModal.afterImage}
                        alt="After"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-lime-400 text-black px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                        AFTER
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diet & Protocol */}
                <div className="pt-2 text-xs text-zinc-400">
                  <span className="font-bold text-zinc-300">Nutritional Protocol: </span>
                  {activeStoryModal.dietFocus}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="shrink-0 p-4 sm:p-6 border-t border-white/10 bg-black/40 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Inspired by {activeStoryModal.name}?</span>
                <a
                  href="/programs"
                  className="px-5 py-2.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-black font-black uppercase text-xs tracking-wider transition-all"
                >
                  Start Your Journey
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Member Auth Modal for Writing Posts */}
        <MemberAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onStoryPublished={handleStoryPublished}
        />
      </main>

      <Footer />
    </div>
  );
}
