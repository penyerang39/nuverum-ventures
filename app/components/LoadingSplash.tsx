'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LoadingSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
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
      const minShowTime = isFirstLoadRef.current ? 4000 : 3000;
      const remainingTime = Math.max(0, minShowTime - elapsedTime);

      setTimeout(() => {
        setIsFadingOut(true);
        // Wait for fade animation to complete before hiding
        setTimeout(() => {
          setIsVisible(false);
          // Dispatch custom event to notify navbar and other components
          window.dispatchEvent(new CustomEvent('loadingComplete'));
        }, 500); // 500ms fade duration
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      const elapsedTime = Date.now() - startTimeRef.current;
      const minShowTime = isFirstLoadRef.current ? 1000 : 300;
      const remainingTime = Math.max(0, minShowTime - elapsedTime);

      setTimeout(() => {
        setIsFadingOut(true);
        // Wait for fade animation to complete before hiding
        setTimeout(() => {
          setIsVisible(false);
          // Dispatch custom event to notify navbar and other components
          window.dispatchEvent(new CustomEvent('loadingComplete'));
        }, 500); // 500ms fade duration
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
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ease-out ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
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
