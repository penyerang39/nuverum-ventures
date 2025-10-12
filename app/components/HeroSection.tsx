'use client'

import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef, useCallback } from "react";
import AnimatedArrowIcon from "./AnimatedArrowIcon";
import ShinyText from "./ShinyText";
import TypingInput from "./TypingInput";
import { usePerformanceTracking } from "../hooks/usePerformanceTracking";
import { useLoadingState } from "../hooks/useLoadingState";
import BlurText from "./BlurText";
import { useModal } from "./PageWrapper";

export default function HeroSection() {
  const { openModal } = useModal();
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTypingInEmail, setIsTypingInEmail] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoading = useLoadingState();

  const { trackElementVisibility, trackUserInteraction } = usePerformanceTracking();

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

  // Auto-trigger animation every 5 seconds
  useEffect(() => {
    const triggerAnimation = () => {
      if (isTypingInEmail || isLoading) return;

      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);

      setTimeout(() => {
        if (isTypingInEmail || isLoading) return;
        
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 100);
      }, 500);
    };

    const interval = setInterval(triggerAnimation, 5000);
    return () => clearInterval(interval);
  }, [isTypingInEmail, isLoading]);

  // Track visibility
  useEffect(() => {
    trackElementVisibility('hero-heading');
  }, [trackElementVisibility]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('approach');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div aria-hidden className="absolute min-h-[100vh] inset-0 -z-10">
        <Image 
          src="/heroBackground.jpg"
          alt="Mountain background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 to-white/70" />
      </div>
      <div className="hero-inner max-md:mb-[20vh] container text-center">
        <BlurText 
          text="Bridging vision with opportunity."
          className="font-light heading-xl mb-10"
        />
        <div className="w-full flex justify-center items-center">
          <label htmlFor="email" className="visually-hidden">Email</label>
          <div className="inline-flex border border-white bg-transparent items-stretch h-10 rounded-xl overflow-hidden align-middle">
            <div className="w-[30ch] bg-white/60 pl-4 backdrop-blur-sm h-full py-0 rounded-none border-0 flex items-center">
              <TypingInput
                id="email"
                name="email"
                type="email"
                placeholderTexts={[
                  "Enter your email",
                  "your@email.com",
                  "Let's connect",
                ]}
                typingSpeed={60}
                pauseDuration={2500}
                deletingSpeed={40}
                loop={true}
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
                className="w-full h-full focus:outline-none leading-none"
              />
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
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group" onClick={scrollToNextSection}>
        <ShinyText 
          text="Discover More" 
          speed={3}
          className="text-sm font-medium"
        />
        <ChevronDownIcon className={`w-5 h-5 text-muted group-hover:text-white group-hover:translate-y-1 transition-all duration-300 ${isAnimating ? 'text-white translate-y-1' : ''}`} />
      </div>
    </section>
  );
}

