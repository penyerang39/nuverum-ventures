'use client'

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface FadeInWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInWrapper({ children, className = '', delay = 0 }: FadeInWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

interface BlurTextWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BlurTextWrapper({ children, className = '', delay = 0 }: BlurTextWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={isVisible ? { filter: 'blur(0px)', opacity: 1 } : { filter: 'blur(10px)', opacity: 0 }}
      transition={{ duration: 1, delay }}
      style={{ willChange: 'filter, opacity' }}
    >
      {children}
    </motion.div>
  );
}

interface CardAnimationWrapperProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function CardAnimationWrapper({ children, staggerDelay = 0, className = '' }: CardAnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: staggerDelay }}
    >
      {children}
    </motion.div>
  );
}
