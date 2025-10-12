'use client'

import { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledBy?: string;
}

export default function AnimatedSection({ children, className = '', id, ariaLabelledBy }: AnimatedSectionProps) {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <section 
      ref={elementRef}
      id={id}
      className={`fade-in-section ${isVisible ? 'visible' : ''} ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}

