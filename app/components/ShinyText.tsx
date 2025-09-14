
import React from 'react';
import { useLoadingState } from '../hooks/useLoadingState';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;
  const isLoading = useLoadingState();

  return (
    <div 
      className={`shiny-text ${disabled || isLoading ? 'disabled' : ''} ${className}`} 
      style={{ '--animation-duration': animationDuration } as React.CSSProperties}
    >
      {text}
    </div>
  );
};

export default ShinyText;