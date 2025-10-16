'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function Footer() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverscrolling, setIsOverscrolling] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  
  // Configuration variables
  const FRICTION_THRESHOLD = 30; // How much extra scroll needed before footer starts sliding
  const MAX_FOOTER_HEIGHT = 150; // Maximum height the footer can slide up
  const OVERSCROLL_THRESHOLD = 60; // How much overscroll before favicon appears
  const RUBBERBAND_FACTOR = 0.5; // How much resistance in overscroll

  useEffect(() => {
    let maxScroll = 0;
    let animationFrameId: number;
    let isAnimating = false;
    let targetOverscroll = 0;
    let currentOverscroll = 0;
    let _lastScrollTop = 0;
    let debounceTimer: NodeJS.Timeout;

    // Check if we're on desktop
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    const calculateMaxScroll = () => {
      // Use Math.max to handle cases where content is shorter than viewport
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const windowHeight = window.innerHeight;
      maxScroll = Math.max(0, documentHeight - windowHeight);
    };

    const isAtBottom = () => {
      const scrollTop = Math.ceil(window.scrollY);
      calculateMaxScroll();
      // Add a small tolerance (3px) to account for browser rounding differences
      return scrollTop >= maxScroll - 3;
    };

    const updateFooterState = (overscrollValue: number) => {
      if (overscrollValue <= 0) {
        // Normal scrolling - reset states
        setScrollProgress(0);
        setIsOverscrolling(false);
        isAnimating = false;
        targetOverscroll = 0;
        currentOverscroll = 0;
      } else {
        // We're in overscroll territory
        isAnimating = true;
        
        // Calculate footer slide progress with friction
        const frictionAmount = Math.max(0, overscrollValue - FRICTION_THRESHOLD);
        const footerProgress = Math.min(frictionAmount / MAX_FOOTER_HEIGHT, 1);
        
        setScrollProgress(footerProgress);
        setIsOverscrolling(overscrollValue > OVERSCROLL_THRESHOLD);
      }
    };

    const animateOverscroll = () => {
      if (isAnimating) {
        // Smooth interpolation towards target
        const diff = targetOverscroll - currentOverscroll;
        currentOverscroll += diff * 0.15; // Smoothing factor
        
        // Update footer state
        updateFooterState(currentOverscroll);
        
        // Continue animation if we're still overscrolling
        if (Math.abs(diff) > 0.1) {
          animationFrameId = requestAnimationFrame(animateOverscroll);
        }
      }
    };

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const currentMaxScroll = Math.max(0, Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        ) - window.innerHeight);
        
        const overscrollValue = scrollTop - currentMaxScroll;
        
        // Only apply custom behavior on desktop
        if (isDesktop) {
          updateFooterState(overscrollValue);
        } else {
          // On mobile, reset all states for normal behavior
          setScrollProgress(0);
          setIsOverscrolling(false);
        }
        
        lastScrollTop = scrollTop;
      });
    };

    // Handle wheel events for custom overscroll (desktop only)
    const handleWheel = (e: WheelEvent) => {
      // Only apply custom overscroll on desktop (md and up)
      if (!isDesktop) return;
      
      // If we're at the bottom and trying to scroll down
      if (isAtBottom() && e.deltaY > 0) {
        e.preventDefault();
        
        // Add to target overscroll amount
        const delta = e.deltaY * RUBBERBAND_FACTOR;
        targetOverscroll += delta;
        targetOverscroll = Math.max(0, targetOverscroll);
        
        // Apply rubberband effect
        calculateMaxScroll();
        const newScroll = maxScroll + targetOverscroll;
        window.scrollTo(0, newScroll);
        
        // Start smooth animation
        if (!isAnimating) {
          isAnimating = true;
          currentOverscroll = 0;
        }
        animateOverscroll();
      }
    };

    // Handle resize with debouncing to recalculate on layout changes
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        checkIsDesktop();
        calculateMaxScroll();
        // Reset states on resize to prevent glitches
        setScrollProgress(0);
        setIsOverscrolling(false);
        targetOverscroll = 0;
        currentOverscroll = 0;
      }, 150);
    };

    // Initial calculation with a small delay to ensure DOM is ready
    checkIsDesktop();
    setTimeout(() => {
      calculateMaxScroll();
    }, 100);

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      clearTimeout(debounceTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDesktop]);

  // Calculate footer transform based on scroll progress (desktop only)
  const footerTransform = `translateY(${(1 - scrollProgress) * 100}%)`;
  const faviconTransform = isOverscrolling ? 'translateY(0)' : 'translateY(100%)';

  return (
    <>
      <footer 
        ref={footerRef}
        className="footer"
        style={isDesktop ? { 
          transform: footerTransform,
          transition: scrollProgress > 0 ? 'none' : 'transform 0.3s ease-out',
          display: 'block'
        } : { display: 'block' }}
      >
        <div className="container flex flex-col md:flex-row justify-between items-start gap-4 md:gap-[30px]">
          <p className="text-white/70 text-sm text-italic max-w-[600px]">
            Legal Disclaimer: We are not a licensed broker, dealer, or financial intermediary. Our role is limited to providing introductory and strategic consulting services. We do not execute, facilitate, or guarantee any transactions. All decisions and actions taken based on our services are at your sole discretion and risk.
          </p>
          <div className="flex flex-col items-end gap-2">
            <p className="text-white/70 text-sm text-nowrap">© {new Date().getFullYear()} Nuverum Ventures</p>
            <Image 
              src="/logos/SVG/favicon-light.svg" 
              alt="Nuverum Ventures" 
              width={50} 
              height={50}
              className="hidden md:block"
            />
          </div>
        </div>
      </footer>
      
      {/* Mobile favicon with rubberbanding in overscroll area - desktop only */}
      <div 
        className="mobile-favicon-container"
        style={{ 
          transform: isDesktop ? faviconTransform : 'translateY(100%)',
          transition: isOverscrolling ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <Image 
          src="/logos/SVG/favicon-light.svg" 
          alt="Nuverum Ventures" 
          width={40} 
          height={40}
          className="mobile-favicon"
        />
      </div>
    </>
  );
}
