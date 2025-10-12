'use client'

import { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import ContactModal from './ContactModal';
import { usePerformanceTracking } from '../hooks/usePerformanceTracking';

interface ModalContextType {
  openModal: (email: string) => void;
  calendlyReady: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within PageWrapper');
  }
  return context;
};

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const [calendlyReady, setCalendlyReady] = useState(false);

  const { trackElementVisibility } = usePerformanceTracking();

  // Track visibility of important sections
  useEffect(() => {
    trackElementVisibility('mission-eyebrow');
    trackElementVisibility('services-heading');
  }, [trackElementVisibility]);

  // Preload Calendly resources
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://calendly.com';
    document.head.appendChild(link);

    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = 'https://calendly.com';
    document.head.appendChild(dnsLink);

    const scriptLink = document.createElement('link');
    scriptLink.rel = 'preload';
    scriptLink.href = 'https://assets.calendly.com/assets/external/widget.js';
    scriptLink.as = 'script';
    document.head.appendChild(scriptLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(dnsLink);
      document.head.removeChild(scriptLink);
    };
  }, []);

  const openModal = (email: string) => {
    setPrefilledEmail(email);
    setIsModalOpen(true);
  };

  return (
    <ModalContext.Provider value={{ openModal, calendlyReady }}>
      {children}
      
      {/* Hidden Calendly Preloader */}
      <div 
        className="fixed -top-[9999px] left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <iframe
          id="calendly-preloader"
          src="https://calendly.com/thomas-nuverum/30min?embed_domain=localhost&embed_type=Inline"
          width="100%"
          height="600"
          title="Calendly preload"
          className="min-h-[600px]"
          loading="eager"
          onLoad={() => {
            setCalendlyReady(true);
            if (typeof window !== 'undefined') {
              (window as Window & { calendlyPreloaded?: boolean }).calendlyPreloaded = true;
            }
          }}
        />
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        prefilledEmail={prefilledEmail}
        calendlyReady={calendlyReady}
      />
    </ModalContext.Provider>
  );
}

