'use client'

import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType?: string;
}

interface CustomMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
}

export const usePerformanceTracking = () => {
  const observerRef = useRef<PerformanceObserver | null>(null);
  const metricsRef = useRef<Map<string, number>>(new Map());

  const trackCustomMetric = useCallback((name: string, value: number) => {
    const id = `${name}-${Date.now()}`;
    const delta = value - (metricsRef.current.get(name) || 0);
    metricsRef.current.set(name, value);

    // Send to Vercel Speed Insights
    if (typeof window !== 'undefined' && 'performance' in window) {
      const customMetric: CustomMetric = {
        name,
        value,
        delta,
        id,
      };

      // Dispatch custom event for Speed Insights to pick up
      window.dispatchEvent(new CustomEvent('vercel-speed-insights', {
        detail: customMetric
      }));
    }
  }, []);

  const trackElementVisibility = useCallback((elementId: string, threshold = 0.5) => {
    if (typeof window === 'undefined') return;

    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibilityTime = performance.now();
            trackCustomMetric(`element-visible-${elementId}`, visibilityTime);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [trackCustomMetric]);

  const trackUserInteraction = useCallback((interactionType: string, elementId?: string) => {
    const interactionTime = performance.now();
    const metricName = elementId 
      ? `interaction-${interactionType}-${elementId}` 
      : `interaction-${interactionType}`;
    
    trackCustomMetric(metricName, interactionTime);
  }, [trackCustomMetric]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    const handleWebVitals = (metric: PerformanceMetrics) => {
      trackCustomMetric(metric.name, metric.value);
    };

    // Set up Performance Observer for Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        observerRef.current = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              trackCustomMetric('LCP', entry.startTime);
            } else if (entry.entryType === 'first-input') {
              const firstInput = entry as PerformanceEventTiming;
              trackCustomMetric('FID', firstInput.processingStart - firstInput.startTime);
            } else if (entry.entryType === 'layout-shift') {
              const layoutShift = entry as PerformanceEntry & { value: number };
              if (!layoutShift.hadRecentInput) {
                trackCustomMetric('CLS', layoutShift.value);
              }
            }
          });
        });

        observerRef.current.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }

    // Track page load time
    const trackPageLoad = () => {
      if (document.readyState === 'complete') {
        const loadTime = performance.now();
        trackCustomMetric('page-load', loadTime);
      }
    };

    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('load', trackPageLoad);
    };
  }, [trackCustomMetric]);

  return {
    trackCustomMetric,
    trackElementVisibility,
    trackUserInteraction,
  };
};
