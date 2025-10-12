import { motion, Transition, Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useLoadingState } from '../hooks/useLoadingState';

type BlurTextProps = {
  text?: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const isLoading = useLoadingState();

  useEffect(() => {
    if (!ref.current || isLoading) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, isLoading]);

  const defaultFrom = useMemo(
    () => ({ filter: 'blur(10px)', opacity: 0 }),
    []
  );

  const defaultTo = useMemo(
    () => [{ filter: 'blur(0px)', opacity: 1 }],
    []
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

  const transition: Transition = {
    duration: 1, // 1000ms
    ease: easing
  };

  return (
    <motion.p 
      ref={ref} 
      className={`blur-text ${className}`}
      initial={fromSnapshot}
      animate={inView ? animateKeyframes : fromSnapshot}
      transition={transition}
      onAnimationComplete={onAnimationComplete}
      style={{
        willChange: 'filter, opacity'
      }}
    >
      {text}
    </motion.p>
  );
};

export default BlurText;
