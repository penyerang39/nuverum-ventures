'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingSplash() {
  const [isVisible, setIsVisible] = useState(false); // Start hidden for SSR
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Only show splash on client-side and only if not already loaded
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    
    if (!hasLoadedBefore) {
      setIsVisible(true);
      sessionStorage.setItem('hasLoadedBefore', 'true');
    }
    
    // Immediately dispatch loading complete for other components
    window.dispatchEvent(new CustomEvent('loadingComplete'));

    // Quick fade out after a brief moment
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // 300ms fade duration
    }, 800); // Show for 800ms total

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black transition-opacity duration-300 ease-out pointer-events-none ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="animate-pulse">
        <Image
          src="/logos/SVG/nuverumBlack.svg"
          alt="Nuverum Ventures"
          width={200}
          height={70}
          priority
        />
      </div>
    </div>
  );
}
