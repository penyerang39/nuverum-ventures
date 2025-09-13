'use client'

import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import ContactModal from './components/ContactModal'
import AnimatedArrowIcon from './components/AnimatedArrowIcon'

const navigation = [
  { name: 'Approach', href: '#approach', current: false },
  { name: 'Services', href: '#services', current: false },
  { name: 'About', href: '#about', current: false },
]

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasScrolledPastInitial, setHasScrolledPastInitial] = useState(false)
  const [shouldShowWhiteTheme, setShouldShowWhiteTheme] = useState(false)

  // Listen for loading complete event
  useEffect(() => {
    const handleLoadingComplete = () => {
      setIsLoading(false)
    }

    window.addEventListener('loadingComplete', handleLoadingComplete)
    
    // Check if already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false)
    }

    return () => {
      window.removeEventListener('loadingComplete', handleLoadingComplete)
    }
  }, [])

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      const initialScrollThreshold = 100 // Point where theme changes

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top
        setIsVisible(true)
      } else {
        // Scrolling down
        setIsVisible(false)
      }
      
      // Track if we've scrolled past initial position
      if (currentScrollY > initialScrollThreshold) {
        setHasScrolledPastInitial(true)
      }
      
      // Reset white theme ONLY when back at the very top
      if (currentScrollY < 10) {
        setHasScrolledPastInitial(false)
        setShouldShowWhiteTheme(false)
      } else if (hasScrolledPastInitial) {
        // Once we've scrolled past initial, maintain white theme until we reach the top
        setShouldShowWhiteTheme(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY, hasScrolledPastInitial])

  // Don't render navbar if still loading
  if (isLoading) return null

  return (
    <Disclosure
      as="nav"
      className="group"
    >
      {({ open }) => (
        <>
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-4xl transition-all duration-300 ${open || isVisible ? 'translate-y-2' : '-translate-y-100'} ${shouldShowWhiteTheme ? 'navbar-white-theme' : ''}`}>
            <div className="w-full overflow-hidden px-4 bg-surface/90 backdrop-blur-sm border border-white rounded-2xl group-data-[open]:rounded-b-none sm:rounded-2xl sm:group-data-[open]:rounded-b-2xl relative transition-all duration-300 ease-out"
                  >
              <div className="relative flex h-15 items-center justify-between">
                {/* Logo on the left */}
                <div className="flex items-center h-15">
                  <Image
                    src="/logos/SVG/nuverumBlack.svg"
                    alt="Nuverum Logo"
                    width={200}
                    height={70}
                    className={`transition-all duration-300 ${shouldShowWhiteTheme ? 'logo-filter' : ''}`}
                  />
                  {/* Vertical divider */}
                  <div className="ml-4 w-px bg-white self-stretch"></div>
                </div>
                
                {/* Navigation links on the right */}
                <div className="hidden sm:block">
                  <div className="flex items-center h-15">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current 
                            ? 'bg-surface text-white' 
                            : 'text-white hover:bg-surface hover:text-accent-strong',
                          'rounded-md px-3 py-2 text-md font-light transition-colors nav-link',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                    {/* Contact Us button - full height in normal flow */}
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="bg-white group whitespace-nowrap text-accent-foreground border border-white px-6 text-sm font-medium transition-all duration-200 h-full flex items-center gap-2 -mr-[17px] -mt-2 -mb-2 contact-button"
                    >
                      Contact Us
                      <AnimatedArrowIcon />
                    </button>
                  </div>
                </div>

                {/* Mobile menu button on the right */}
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  <DisclosureButton className="group relative inline-flex items-end justify-end rounded-md p-2 text-white hover:bg-surface hover:text-accent-strong disclosure-button">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <Transition
              enter="transition-all duration-300 ease-out"
              enterFrom="-translate-y-4 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition-all duration-250 ease-in"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="-translate-y-4 opacity-0"
            >
              <DisclosurePanel className="sm:hidden overflow-hidden bg-surface/90 backdrop-blur-sm border border-white border-t-0 rounded-b-2xl origin-top mobile-menu">
                <div className="space-y-1 p-0">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current 
                          ? 'bg-surface text-white' 
                          : 'text-white hover:bg-surface hover:text-accent-strong',
                        'block rounded-md pl-7 pr-4 py-2 text-base font-light transition-colors sm:hidden nav-link',
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                  {/* Contact Us button for mobile */}
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="flex w-full items-center justify-between text-left pl-7 pr-4 py-3 text-base font-medium transition-all duration-200 bg-white text-black shadow-sm hover:shadow-md sm:hidden contact-button"
                  >
                    <span>Contact Us</span>
                    <AnimatedArrowIcon size="sm" />
                  </button>
                </div>
              </DisclosurePanel>
            </Transition>
          </div>
          
          {/* Contact Modal */}
          <ContactModal 
            isOpen={isContactModalOpen} 
            onClose={() => setIsContactModalOpen(false)} 
          />
        </>
      )}
    </Disclosure>
  )
}
