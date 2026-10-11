import React from 'react';
import { Check } from 'lucide-react';

interface ColoredTickProps {
  color?: 'lime' | 'amber' | 'cyan' | 'emerald' | 'slate';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ColoredTick: React.FC<ColoredTickProps> = ({
  color = 'lime',
  className = '',
  size = 'md',
}) => {
  const colorMap = {
    lime: 'text-lime-400 bg-lime-500/15 border-lime-500/30 shadow-[0_0_12px_rgba(163,230,53,0.25)]',
    emerald: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30 shadow-[0_0_12px_rgba(52,211,153,0.25)]',
    amber: 'text-amber-400 bg-amber-500/15 border-amber-500/30 shadow-[0_0_12px_rgba(251,191,36,0.25)]',
    cyan: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.25)]',
    slate: 'text-slate-300 bg-slate-500/15 border-slate-400/30 shadow-[0_0_12px_rgba(203,213,225,0.25)]',
  };

  const sizeMap = {
    sm: 'w-4 h-4 p-0.5',
    md: 'w-5 h-5 p-0.5',
    lg: 'w-6 h-6 p-1',
  };

  const iconSizeMap = {
    sm: 10,
    md: 13,
    lg: 16,
  };

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full border ${colorMap[color]} ${sizeMap[size]} ${className}`}
      aria-hidden="true"
    >
      <Check size={iconSizeMap[size]} strokeWidth={3.2} className="stroke-current" />
    </span>
  );
};

export default ColoredTick;
