'use client';

import { useState, useRef, useEffect } from 'react';
import TextType from './TextType';

interface TypingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholderTexts?: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  onPlaceholderComplete?: (text: string, index: number) => void;
}

const TypingInput = ({
  placeholderTexts = ['Enter your email'],
  typingSpeed = 50,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  onPlaceholderComplete,
  value,
  className = '',
  ...props
}: TypingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show placeholder when input is empty and not focused
  useEffect(() => {
    setShowPlaceholder(!value && !isFocused);
  }, [value, isFocused]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setShowPlaceholder(false);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setShowPlaceholder(!e.target.value);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPlaceholder(!e.target.value && !isFocused);
    props.onChange?.(e);
  };

  return (
    <div className="relative">
      <input
        {...props}
        ref={inputRef}
        value={value}
        className={`w-full bg-transparent ${className}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{ color: value ? 'inherit' : 'transparent' }}
      />
      {showPlaceholder && (
        <div className="absolute inset-0 pointer-events-none flex items-center">
          <TextType
            text={placeholderTexts}
            typingSpeed={typingSpeed}
            pauseDuration={pauseDuration}
            deletingSpeed={deletingSpeed}
            loop={loop}
            onSentenceComplete={onPlaceholderComplete}
            className="text-muted"
            showCursor={true}
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            cursorClassName="text-muted"
            textColors={['#5b646e']}
          />
        </div>
      )}
    </div>
  );
};

export default TypingInput;
