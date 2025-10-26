'use client'

import { useState, useEffect, useRef } from 'react';
import AnimatedArrowIcon from './AnimatedArrowIcon';
import { usePerformanceTracking } from '../hooks/usePerformanceTracking';
import { useModal } from './ModalProvider';

interface ContactButtonProps {
  variant?: 'default' | 'muted';
  packageName?: string;
}

export default function ContactButton({ variant = 'default', packageName }: ContactButtonProps) {
  const { openModal } = useModal();
  const [isActive, setIsActive] = useState(false);
  const { trackUserInteraction } = usePerformanceTracking();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activate when button enters the top 80% of the viewport
        setIsActive(entry.isIntersecting);
      },
      {
        // Shrink intersection area by 20% from top, so it triggers when entering top 80%
        rootMargin: '0px 0px -20% 0px',
        threshold: 0
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const isMuted = variant === 'muted';
  
  const buttonClasses = isMuted 
    ? 'bg-muted/5 border border-muted/20 group whitespace-nowrap text-muted px-8 py-4 text-lg font-medium transition-all duration-200 rounded-2xl flex items-center gap-3 relative z-10'
    : 'bg-black group whitespace-nowrap text-white px-8 py-4 text-lg font-medium transition-all duration-200 rounded-2xl flex items-center gap-3 relative z-10';

  return (
    <div ref={buttonRef} className="flex justify-center mt-16 relative">
      <button
        onClick={() => {
          trackUserInteraction('contact-button-click', 'partners-contact');
          const subject = packageName ? `${packageName} Inquiry` : '';
          openModal('', subject);
        }}
        className={buttonClasses}
      >
        Contact Us
        <AnimatedArrowIcon size="lg" isActive={isActive} muted={isMuted} />
      </button>
    </div>
  );
}

