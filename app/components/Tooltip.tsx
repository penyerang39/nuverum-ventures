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
        // For fixed positioning, use viewport coordinates directly
        setPosition({
          top: rect.top,
          left: rect.left + rect.width / 2,
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
      
      {/* Portal tooltip to dedicated root to appear above all stacking contexts */}
      {mounted && showTooltip && document.getElementById('tooltip-root') && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translate(-50%, calc(-100% - 8px))',
            pointerEvents: 'auto',
          }}
          className="w-64 p-3 bg-foreground text-background rounded-lg shadow-xl text-sm leading-relaxed border border-white/20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p>{text}</p>
          {/* Tooltip arrow */}
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className="w-3 h-3 bg-foreground rotate-45"
          />
        </div>,
        document.getElementById('tooltip-root')!
      )}
    </>
  );
}

