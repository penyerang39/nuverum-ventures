'use client'

import { useState, useEffect } from 'react';
import AnimatedArrowIcon from './AnimatedArrowIcon';
import { usePerformanceTracking } from '../hooks/usePerformanceTracking';
import { useModal } from './PageWrapper';

export default function ContactButton() {
  const { openModal } = useModal();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { trackUserInteraction } = usePerformanceTracking();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 300;
      setIsAtBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex justify-center mt-16 relative">
      <div className="absolute top-1/2 left-0 right-0 h-px bg-black z-0"></div>
      <button
        onClick={() => {
          trackUserInteraction('contact-button-click', 'partners-contact');
          openModal('');
        }}
        className="bg-black group whitespace-nowrap text-white px-8 py-4 text-lg font-medium transition-all duration-200 rounded-2xl flex items-center gap-3 relative z-10"
      >
        Contact Us
        <AnimatedArrowIcon size="lg" isActive={isAtBottom} />
      </button>
    </div>
  );
}

