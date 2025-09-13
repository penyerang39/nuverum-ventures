'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LoadingSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const isFirstLoadRef = useRef<boolean>(true);

  useEffect(() => {
    // Check if this is first load or subsequent navigation
    const isFirstLoad = !sessionStorage.getItem('hasLoadedBefore');
    isFirstLoadRef.current = isFirstLoad;
    
    if (isFirstLoad) {
      sessionStorage.setItem('hasLoadedBefore', 'true');
    }

    // Hide splash screen when page is fully loaded
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const minShowTime = isFirstLoadRef.current ? 1000 : 300;
      const remainingTime = Math.max(0, minShowTime - elapsedTime);

      setTimeout(() => {
        setIsVisible(false);
        // Dispatch custom event to notify navbar
        window.dispatchEvent(new CustomEvent('loadingComplete'));
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      const elapsedTime = Date.now() - startTimeRef.current;
      const minShowTime = isFirstLoadRef.current ? 1000 : 300;
      const remainingTime = Math.max(0, minShowTime - elapsedTime);

      setTimeout(() => {
        setIsVisible(false);
        window.dispatchEvent(new CustomEvent('loadingComplete'));
      }, remainingTime);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="animate-pulse">
        <Image
          src="/logos/SVG/nuverumBlack.svg"
          alt="Nuverum Ventures"
          width={200}
          height={70}
          priority
          onLoad={() => setImageLoaded(true)}
          className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  );
}
