'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Dumbbell } from 'lucide-react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackTitle,
  containerClassName = '',
  className = '',
  fill,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-neutral-900 to-black border border-white/10 ${containerClassName || 'w-full h-full min-h-[160px]'}`}
        style={fill ? { position: 'absolute', inset: 0 } : undefined}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-500/30 via-transparent to-transparent pointer-events-none" />
        <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-2">
          <Dumbbell className="w-8 h-8 text-lime-400" />
        </div>
        <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 px-3 text-center">
          {fallbackTitle || alt || 'Titan Performance Zone'}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      draggable={false}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
};

export default ImageWithFallback;
