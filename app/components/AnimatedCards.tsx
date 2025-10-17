import { ReactNode } from 'react';
import { CardAnimationWrapper } from './ClientAnimations';

interface AnimatedCardsProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function AnimatedCards({ children, staggerDelay = 0, className = '' }: AnimatedCardsProps) {
  return (
    <CardAnimationWrapper staggerDelay={staggerDelay} className={className}>
      {children}
    </CardAnimationWrapper>
  );
}

