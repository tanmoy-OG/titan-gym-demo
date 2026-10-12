'use client';

import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';
import { TransformationItem } from '@/data/gymData';

interface TransformationCardProps {
  item: TransformationItem;
}

export const TransformationCard: React.FC<TransformationCardProps> = ({ item }) => {
  return (
    <div className="bg-[#0f1118] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-lime-500/30 transition-all">
      {/* Before / After Split with Simple Divider */}
      <div className="relative w-full aspect-[4/3] grid grid-cols-2 overflow-hidden bg-black select-none">
        {/* BEFORE Image (Left Half) */}
        <div className="relative h-full overflow-hidden">
          <ImageWithFallback
            src={item.beforeImage}
            alt={`${item.name} Before Transformation`}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded border border-white/20 z-10">
            BEFORE
          </div>
        </div>

        {/* AFTER Image (Right Half) */}
        <div className="relative h-full overflow-hidden">
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

        {/* Simple Vertical Divider */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.7)] z-20 pointer-events-none" />
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
