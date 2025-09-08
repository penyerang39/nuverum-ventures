'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ArrowUpRightIcon, } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import Image from 'next/image'


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

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top
        setIsVisible(true)
      } else {
        // Scrolling down
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <Disclosure
      as="nav"
      className={`group fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 w-11/12 max-w-4xl ${
        isVisible ? 'translate-y-2' : '-translate-y-100'
      }`}
    >
      <div className="w-full px-4 bg-surface/90 backdrop-blur-sm border border-white rounded-2xl group-data-open:rounded-b-none group-data-open:border-b-0 sm:rounded-2xl sm:group-data-open:rounded-b-2xl relative"
            >
        <div className="relative flex h-15 items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center h-15">
            <Image
              src="/logos/SVG/nuverumBlack.svg"
              alt="Nuverum Logo"
              width={200}
              height={70}
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
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  )}
                >
                  {item.name}
                </a>
              ))}
              {/* Contact Us button - full height in normal flow */}
              <button
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white whitespace-nowrap text-accent-foreground hover:bg-accent/90 border border-white hover:border-white rounded-r-2xl px-6 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md h-full flex items-center gap-2 -mr-4 -mt-2 -mb-2"
              >
                Contact Us
              <ArrowUpRightIcon className="size-4 shrink-0"/>
              </button>
            </div>
          </div>

          {/* Mobile menu button on the right */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-end justify-end rounded-md p-2 text-white hover:bg-surface hover:text-accent-strong">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden bg-transparent border border-white border-t-0 rounded-b-2xl">
        <div className="space-y-1 px-4">
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
                'block rounded-md px-3 py-2 text-base font-medium transition-colors sm:hidden',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          {/* Contact Us button for mobile */}
          <button
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block bg-white w-full text-nowrap text-left px-3 py-2 text-base font-medium transition-all duration-200 bg-background text-black shadow-sm hover:shadow-md sm:hidden"
          >
            Contact Us
            <ArrowUpRightIcon className='inline h-[2ch]'/>
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
