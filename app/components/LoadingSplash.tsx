'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LoadingSplash() {
  const [shouldShow, setShouldShow] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const startTimeRef = useRef<number>(0);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in strict mode
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    startTimeRef.current = Date.now();
    
    // Check if user has seen splash before
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    const isFirstLoad = !hasLoadedBefore;
    
    if (isFirstLoad) {
      sessionStorage.setItem('hasLoadedBefore', 'true');
    }

    const handleLoadComplete = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const minShowTime = isFirstLoad ? 2000 : 800; // 2s first time, 800ms returning
      const remainingTime = Math.max(0, minShowTime - elapsedTime);

      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setShouldShow(false);
          window.dispatchEvent(new CustomEvent('loadingComplete'));
        }, 500); // 500ms fade duration
      }, remainingTime);
    };

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      handleLoadComplete();
    } else {
      window.addEventListener('load', handleLoadComplete);
    }

    return () => {
      window.removeEventListener('load', handleLoadComplete);
    };
  }, []);

  // Hide only after fade out is complete
  if (!shouldShow) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center w-full h-full bg-black transition-opacity duration-500 ease-out ${
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
