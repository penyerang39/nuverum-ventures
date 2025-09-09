'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingSplash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen when page is fully loaded
    const handleLoad = () => {
      setIsVisible(false);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setIsVisible(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    // Hide navbar during splash screen
    const navbar = document.querySelector('nav');
    if (navbar) {
      if (isVisible) {
        navbar.style.display = 'none';
      } else {
        navbar.style.display = '';
      }
    }

    return () => {
      // Restore navbar when component unmounts
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="animate-pulse">
        <Image
          src="/logos/SVG/nuverumBlack.svg"
          alt="Nuverum Ventures"
          width={200}
          height={120}
          priority
          className="w-auto h-auto filter invert"
        />
      </div>
    </div>
  );
}
