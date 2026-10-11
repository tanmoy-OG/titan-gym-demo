'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';
import { TransformationItem } from '@/data/gymData';

interface TransformationCardProps {
  item: TransformationItem;
}

export const TransformationCard: React.FC<TransformationCardProps> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <div className="bg-[#0f1118] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-lime-500/30 transition-all">
      {/* Interactive Before / After Split with Slider */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden select-none cursor-ew-resize bg-black"
        onMouseMove={(e) => isDragging && handleSliderMove(e)}
        onTouchMove={(e) => isDragging && handleSliderMove(e)}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleSliderMove(e);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleSliderMove(e);
        }}
        onMouseUp={() => setIsDragging(false)}
        onTouchEnd={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* AFTER Image (Full container underneath) */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={item.afterImage}
            alt={`${item.name} After Transformation`}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3 bg-lime-400 text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-md z-10">
            AFTER ({item.duration})
          </div>
        </div>

        {/* BEFORE Image (Clipped overlay on top) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full min-w-[280px]">
            <ImageWithFallback
              src={item.beforeImage}
              alt={`${item.name} Before Transformation`}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded border border-white/20 z-10">
            BEFORE
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-lime-400 pointer-events-none shadow-[0_0_12px_rgba(163,230,53,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black/90 border-2 border-lime-400 flex items-center justify-center text-lime-400 shadow-xl">
            <div className="flex items-center -space-x-1">
              <ChevronLeft size={14} />
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-black/60 text-zinc-300 backdrop-blur-sm">
            Drag to compare
          </span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white tracking-tight">{item.name}</h3>
            {/* Star Rating out of 5 */}
            <div className="flex items-center gap-1" title={`${item.rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-3">
            <span className="text-lime-400 font-semibold">{item.program}</span>
            <span>·</span>
            <span>{item.duration}</span>
            {item.weightLoss && (
              <>
                <span>·</span>
                <span className="text-emerald-400 font-mono font-medium">{item.weightLoss}</span>
              </>
            )}
            {item.muscleGain && (
              <>
                <span>·</span>
                <span className="text-cyan-400 font-mono font-medium">{item.muscleGain}</span>
              </>
            )}
          </div>

          <p className="text-xs italic text-zinc-300 leading-relaxed line-clamp-3">
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500 font-medium">Coach: {item.trainer}</span>
          <Link
            href={`/blog#story-${item.id}`}
            className="text-xs font-bold text-lime-400 hover:text-lime-300 flex items-center gap-1 group/link"
          >
            <span>Read Story</span>
            <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransformationCard;
