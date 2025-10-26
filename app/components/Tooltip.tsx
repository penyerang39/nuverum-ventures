'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  text: string;
  className?: string;
}

export default function Tooltip({ text, className = '' }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const showTooltip = isHovered || isFocused;

  // Handle mounting for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update position when tooltip becomes visible or on scroll
  useEffect(() => {
    const updatePosition = () => {
      if (showTooltip && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX + rect.width / 2,
        });
      }
    };

    updatePosition();

    if (showTooltip) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [showTooltip]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current rounded ${className}`}
        aria-label={`More information: ${text}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
        <InformationCircleIcon className="size-5 text-muted" />
      </button>
      
      {/* Portal tooltip to document.body to escape stacking context */}
      {mounted && showTooltip && createPortal(
        <div 
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translate(-50%, calc(-100% - 8px))',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
          className="w-64 p-3 bg-foreground text-background rounded-lg shadow-lg text-sm leading-relaxed"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p>{text}</p>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="w-3 h-3 bg-foreground rotate-45"></div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

