'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const navigation = [
  { name: 'Approach', href: '#approach', current: false },
  { name: 'Philosophy', href: '#philosophy', current: false },
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
      className={`site-header fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 container"
            >
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-surface hover:text-accent-strong focus:outline-2 focus:-outline-offset-1 focus:outline-ring">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center px-5 max-sm:justify-end">
              <Image
                src="/logos/SVG/nuverumBlack.svg"
                alt="Nuverum Logo"
                width={220}
                height={80}

              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex items-center space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current 
                        ? 'bg-surface text-foreground' 
                        : 'text-foreground hover:bg-surface hover:text-accent-strong',
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current 
                  ? 'bg-surface text-foreground' 
                  : 'text-foreground hover:bg-surface hover:text-accent-strong',
                'block rounded-md px-3 py-2 text-base font-medium transition-colors',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
