'use client'

import { useEffect } from 'react';

export default function AnimationObserver() {
  useEffect(() => {
    // Add class to signal JS is loaded
    document.documentElement.classList.add('js-loaded');
    
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

    // Observe all animate targets
    const targets = document.querySelectorAll('[data-animate]');
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

    return () => observer.disconnect();
  }, []);

  return null;
}

