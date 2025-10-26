'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnimationObserver() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Skip animations on legal pages
    const isLegalPage = pathname === '/privacy-policy' || pathname === '/terms-of-service';
    if (isLegalPage) {
      return;
    }

    // Add class to signal JS is loaded
    document.documentElement.classList.add('js-loaded');
    
    let heroAnimated = false;
    
    // Animate hero section immediately after loading completes
    const handleLoadingComplete = () => {
      if (heroAnimated) return;
      heroAnimated = true;
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        setTimeout(() => {
          const heroElement = document.querySelector('[data-animate="hero-text"]');
          if (heroElement) {
            heroElement.classList.add('animate-visible');
          }
        }, 200); // 200ms delay for smooth transition after splash
      });
    };

    // Fallback: If event doesn't fire within 3 seconds, animate anyway
    const fallbackTimeout = setTimeout(() => {
      handleLoadingComplete();
    }, 3000);
    
    // Also listen for the loading complete event
    window.addEventListener('loadingComplete', () => {
      clearTimeout(fallbackTimeout);
      handleLoadingComplete();
    });
    
    // Small delay to let CSS hide elements before observing
    const observerTimeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      // Observe all animate targets except hero section (it animates on loading complete)
      const targets = document.querySelectorAll('[data-animate]:not([data-animate="hero-text"])');
      targets.forEach(target => {
        // For card containers, observe individual cards
        if (target.getAttribute('data-animate') === 'cards') {
          const cards = target.querySelectorAll('.card');
          cards.forEach((card, index) => {
            (card as HTMLElement).style.setProperty('--card-index', index.toString());
            observer.observe(card);
          });
        } else {
          observer.observe(target);
        }
      });
    }, 100); // 100ms delay for CSS to apply

    return () => {
      clearTimeout(fallbackTimeout);
      clearTimeout(observerTimeout);
      window.removeEventListener('loadingComplete', handleLoadingComplete);
    };
  }, [pathname]);

  return null;
}

