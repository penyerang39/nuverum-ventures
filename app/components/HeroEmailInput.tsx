'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import AnimatedArrowIcon from './AnimatedArrowIcon';
import TypingInput from './TypingInput';
import { usePerformanceTracking } from '../hooks/usePerformanceTracking';
import { useLoadingState } from '../hooks/useLoadingState';
import { useModal } from './ModalProvider';

export default function HeroEmailInput() {
  const { openModal } = useModal();
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isTypingInEmail, setIsTypingInEmail] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoading = useLoadingState();

  const { trackUserInteraction } = usePerformanceTracking();

  // Email validation effect
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailValue.trim() !== '' && emailRegex.test(emailValue));
  }, [emailValue]);

  // Debounced typing detection
  const handleTypingDebounce = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTypingInEmail(false);
    }, 1000);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <label htmlFor="email" className="visually-hidden">Email</label>
      <div className="inline-flex border border-white bg-transparent items-stretch h-10 rounded-xl overflow-hidden align-middle">
        <div className="w-[30ch] bg-white/60 pl-4 backdrop-blur-sm h-full py-0 rounded-none border-0 flex items-center">
          {/* Server-rendered input (visible to search engines) */}
          <input
            id="email"
            name="email"
            type="email"
            className="hero-email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              handleTypingDebounce();
            }}
            onFocus={() => {
              trackUserInteraction('email-input-focus', 'hero-email');
              setIsTypingInEmail(true);
            }}
            onBlur={() => {
              setIsTypingInEmail(false);
              if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
              }
            }}
            required
            aria-required="true"
          />
          
          {/* Client-side animated placeholder overlay */}
          {!emailValue && (
            <div className="absolute inset-0 pointer-events-none ml-3 flex items-center">
              <TypingInput
                placeholderTexts={[
                  "Enter your email",
                  "your@email.com",
                  "Let's connect",
                ]}
                typingSpeed={60}
                pauseDuration={2500}
                deletingSpeed={40}
                loop={true}
                disabled={isTypingInEmail || isLoading}
                className="text-muted"
              />
            </div>
          )}
        </div>
        <button
          className="bg-white group text-black h-full px-3 rounded-none flex items-center leading-none gap-2 transition-all duration-300 ease-out"
          type="button"
          onClick={() => {
            trackUserInteraction('contact-button-click', 'hero-contact');
            openModal(emailValue);
          }}
        >
          Contact Us
          <AnimatedArrowIcon size="sm" isActive={isEmailValid} />
        </button>
      </div>
    </div>
  );
}
