'use client'

import { useState, useEffect } from 'react';
import AnimatedArrowIcon from './AnimatedArrowIcon';
import { usePerformanceTracking } from '../hooks/usePerformanceTracking';
import { useModal } from './ModalProvider';

interface ContactButtonProps {
  variant?: 'default' | 'muted';
}

export default function ContactButton({ variant = 'default' }: ContactButtonProps) {
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

  const isMuted = variant === 'muted';
  
  const buttonClasses = isMuted 
    ? 'bg-muted/5 border border-muted/20 group whitespace-nowrap text-muted px-8 py-4 text-lg font-medium transition-all duration-200 rounded-2xl flex items-center gap-3 relative z-10'
    : 'bg-black group whitespace-nowrap text-white px-8 py-4 text-lg font-medium transition-all duration-200 rounded-2xl flex items-center gap-3 relative z-10';

  return (
    <div className="flex justify-center mt-16 relative">
      <button
        onClick={() => {
          trackUserInteraction('contact-button-click', 'partners-contact');
          openModal('');
        }}
        className={buttonClasses}
      >
        Contact Us
        <AnimatedArrowIcon size="lg" isActive={isAtBottom} muted={isMuted} />
      </button>
    </div>
  );
}

