'use client'

import AnimatedCounter from './AnimatedCounter';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function PartnersStats() {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div ref={elementRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="text-center max-sm:text-start">
        <div className="text-9xl font-bold text-foreground mb-4">
          <AnimatedCounter
            end={100}
            duration={3000}
            suffix="+"
            trigger={isVisible}
          />
        </div>
        <div className="text-xl text-muted">VC Connections</div>
      </div>

      <div className="text-center max-sm:text-start">
        <div className="text-9xl font-bold text-foreground mb-4">
          <AnimatedCounter
            end={25}
            duration={3000}
            suffix="+"
            trigger={isVisible}
          />
        </div>
        <div className="text-xl text-muted">Investment Countries</div>
      </div>
    </div>
  );
}

