'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';
import { GALLERY_ITEMS } from '@/data/gymData';
import { Camera, X, Maximize2, Tag } from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);

  const categories = [
    'All',
    'Athletes',
    'Gym Space',
    'Group Classes',
    'Bodybuilding Poses',
    'Awards & Achievements',
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner */}
        <section className="py-16 bg-gradient-to-b from-[#0b0d14] to-[#08090d] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-lime-400 text-xs font-bold uppercase tracking-wider">
              <Camera size={14} />
              <span>Visual Athletic Chronicle</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              Titan Gallery
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Documenting the sweat, PRs, state-of-the-art training spaces, and competitive victories inside our clubs.
            </p>

            {/* Filter Tabs matching content_categories */}
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

        {/* Full-Page Masonry Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl bg-[#0f111a]"
              >
                <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-lime-400 border border-white/15">
                    {item.category}
                  </div>

                  {/* Title and expand action on hover */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-bold text-white uppercase tracking-wider truncate">
                      {item.title}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-lime-400 text-black flex items-center justify-center shrink-0">
                      <Maximize2 size={12} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#0c0e15] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-lime-400 uppercase tracking-widest block">
                    {lightboxImage.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">{lightboxImage.title}</h3>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative w-full h-[65vh] bg-black">
                <ImageWithFallback
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
