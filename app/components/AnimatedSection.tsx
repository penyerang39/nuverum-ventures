import { ReactNode } from 'react';
import { FadeInWrapper } from './ClientAnimations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledBy?: string;
}

export default function AnimatedSection({ children, className = '', id, ariaLabelledBy }: AnimatedSectionProps) {
  return (
    <FadeInWrapper>
      <section 
        id={id}
        className={`server-visible ${className}`}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </section>
    </FadeInWrapper>
  );
}

