import { ReactNode } from 'react';
import { CardAnimationWrapper } from './ClientAnimations';

interface AnimatedCardsProps {
  children: ReactNode;
  staggerDelay?: number;
}

export default function AnimatedCards({ children, staggerDelay = 0 }: AnimatedCardsProps) {
  return (
    <CardAnimationWrapper staggerDelay={staggerDelay} className="card-animation">
      {children}
    </CardAnimationWrapper>
  );
}

