'use client'

import { useState, useEffect } from 'react';
import { useLoadingState } from '../hooks/useLoadingState';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  trigger?: boolean;
  className?: string;
}

export default function AnimatedCounter({ 
  end, 
  duration = 5000, 
  suffix = '', 
  trigger = true,
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const isLoading = useLoadingState();

  useEffect(() => {
    if (!trigger || isLoading) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Animation finished, show suffix after 100ms delay
        setTimeout(() => {
          setShowSuffix(true);
        }, 300);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, trigger, isLoading]);

  return (
    <span className={className}>
      {count}{showSuffix ? suffix : ''}
    </span>
  );
}
