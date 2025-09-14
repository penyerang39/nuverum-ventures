import { useEffect, useRef, useState } from 'react';
import { useLoadingState } from './useLoadingState';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const isLoading = useLoadingState();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, isLoading]);

  return { elementRef, isVisible };
}

// Hook for staggered card animations
export function useStaggeredIntersectionObserver(
  cardCount: number,
  staggerDelay: number = 150,
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isLoading = useLoadingState();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cardCount === 0 || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger staggered animation for all cards
          for (let i = 0; i < cardCount; i++) {
            setTimeout(() => {
              setVisibleCards(prev => new Set([...prev, i]));
            }, i * staggerDelay);
          }
          observer.unobserve(container);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [cardCount, staggerDelay, threshold, rootMargin, isLoading]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  return {
    containerRef,
    setCardRef,
    isCardVisible: (index: number) => visibleCards.has(index),
  };
}
