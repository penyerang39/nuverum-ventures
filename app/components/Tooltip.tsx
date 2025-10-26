'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface TooltipProps {
  text: string;
  className?: string;
}

export default function Tooltip({ text, className = '' }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const showTooltip = isHovered || isFocused;

  return (
    <span className={`relative inline-flex items-center z-[100] ${className}`}>
      <button
        type="button"
        className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current rounded"
        aria-label={`More information: ${text}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
        <InformationCircleIcon className="size-5 text-muted" />
      </button>
      
      {/* Tooltip content - positioned outside button to avoid stacking context issues */}
      {showTooltip && (
        <div 
          className="absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-foreground text-background rounded-lg shadow-lg text-sm leading-relaxed"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p>{text}</p>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="w-3 h-3 bg-foreground rotate-45"></div>
          </div>
        </div>
      )}
    </span>
  );
}

