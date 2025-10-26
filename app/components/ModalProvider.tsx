'use client'

import { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import ContactModal from './ContactModal';

interface ModalContextType {
  openModal: (email: string, subject?: string) => void;
  calendlyReady: boolean;
}

// Create context with a default value accessible globally
const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  calendlyReady: false
});

export const useModal = () => {
  return useContext(ModalContext);
};

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const [prefilledSubject, setPrefilledSubject] = useState('');
  const [calendlyReady, setCalendlyReady] = useState(false);

  // Preconnect to Calendly for faster initial load
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://calendly.com';
    document.head.appendChild(link);

    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = 'https://calendly.com';
    document.head.appendChild(dnsLink);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(dnsLink)) document.head.removeChild(dnsLink);
    };
  }, []);

  const openModal = (email: string, subject?: string) => {
    setPrefilledEmail(email);
    setPrefilledSubject(subject || '');
    setIsModalOpen(true);
  };

  // Make modal functions globally available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__modalContext = { openModal, calendlyReady };
    }
  }, [calendlyReady, openModal]);

  return (
    <ModalContext.Provider value={{ openModal, calendlyReady }}>
      {children}
      
      {/* ContactModal is always mounted to prevent iframe reload */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        prefilledEmail={prefilledEmail}
        prefilledSubject={prefilledSubject}
        calendlyReady={calendlyReady}
      />
    </ModalContext.Provider>
  );
}

