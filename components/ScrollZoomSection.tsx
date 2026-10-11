'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';
import ColoredTick from './ColoredTick';
import { ArrowRight } from 'lucide-react';

interface ScrollZoomSectionProps {
  id?: string;
  badge: string;
  title: string;
  caption: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
  images: {
    src: string;
    alt: string;
    title: string;
  }[];
  reversed?: boolean;
}

export const ScrollZoomSection: React.FC<ScrollZoomSectionProps> = ({
  id,
  badge,
  title,
  caption,
  highlights,
  ctaLabel,
  ctaHref,
  images,
  reversed = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Progressive zoom-in from 1.0 to 1.18 as user scrolls down
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.16]);
  // Fade in animation as user scrolls into view
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.35, 1, 1, 0.4]);

  return (
    <section
      id={id}
      ref={containerRef}
      className="py-28 relative overflow-hidden bg-[#07080c] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Content Column */}
          <div className={`lg:col-span-6 space-y-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/25 text-lime-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              <span>{badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.08]">
              {title}
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              {caption}
            </p>

            {/* Checklist with Colored Ticks */}
            <ul className="space-y-3.5 pt-2">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200">
                  <ColoredTick color="lime" size="md" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
              >
                <span>{ctaLabel}</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/programs"
                className="px-4 py-3 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
              >
                Explore Inclusions ↗
              </Link>
            </div>
          </div>

          {/* Visuals Column with Progressive Zoom & Fade-in */}
          <motion.div
            style={{ scale, opacity }}
            className={`lg:col-span-6 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Main large visual */}
              <div className="col-span-2 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <ImageWithFallback
                  src={images[0]?.src || ''}
                  alt={images[0]?.alt || 'Titan Fitness Visual'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs uppercase font-mono text-lime-400 tracking-wider">
                    {images[0]?.title}
                  </span>
                </div>
              </div>

              {/* Secondary thumbnail visuals */}
              {images.slice(1, 3).map((img, i) => (
                <div
                  key={i}
                  className="relative h-40 sm:h-48 rounded-xl overflow-hidden border border-white/10 shadow-xl group"
                >
                  <ImageWithFallback
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-semibold text-zinc-200">
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollZoomSection;
