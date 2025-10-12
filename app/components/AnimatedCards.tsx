'use client'

import { ReactNode } from 'react';

interface AnimatedCardsProps {
  children: ReactNode;
  staggerDelay?: number;
}

// Simplified version - just renders children without animation wrapper
export default function AnimatedCards({ children }: AnimatedCardsProps) {
  return <>{children}</>;
}

