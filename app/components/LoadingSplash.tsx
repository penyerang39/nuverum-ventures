'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingSplash() {
  const [mounted, setMounted] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user has seen splash before
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    
    if (hasLoadedBefore) {
      // Skip splash for returning visitors
      setShouldShow(false);
      window.dispatchEvent(new CustomEvent('loadingComplete'));
      return;
    }
    
    sessionStorage.setItem('hasLoadedBefore', 'true');
    
    // Quick fade out after a brief moment
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setShouldShow(false);
        window.dispatchEvent(new CustomEvent('loadingComplete'));
      }, 400); // Fade duration
    }, 600); // Show for 600ms total

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything during SSR
  if (!mounted || !shouldShow) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center w-full h-full bg-black transition-opacity duration-400 ease-out ${
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
