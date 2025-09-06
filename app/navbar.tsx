'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import AnimatedThemeToggle from './components/AnimatedThemeToggle'
import NuverumLogo from './components/NuverumLogo'

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

  return (
    <Disclosure
      as="nav"
      className="relative bg-white/80 dark:bg-gray-800/50 white:bg-white/95 backdrop-blur-sm  after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gray-200/50 dark:after:bg-white/10 white:after:bg-gray-300/50"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-400 white:text-gray-700 hover:bg-gray-100/50 dark:hover:bg-white/5 white:hover:bg-gray-100/70 hover:text-gray-900 dark:hover:text-white white:hover:text-gray-900 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center h-full">
              <NuverumLogo width={100} height={50} className="flex-shrink-0" />
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
                        ? 'bg-gray-100/80 dark:bg-gray-950/50 white:bg-gray-100/90 text-gray-900 dark:text-white white:text-gray-900' 
                        : 'text-gray-700 dark:text-gray-300 white:text-gray-600 hover:bg-gray-100/50 dark:hover:bg-white/5 white:hover:bg-gray-100/70 hover:text-gray-900 dark:hover:text-white white:hover:text-gray-900',
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Animated theme toggle */}
            <AnimatedThemeToggle className="relative rounded-full p-2 hover:bg-gray-100/50 dark:hover:bg-white/5 white:hover:bg-gray-100/70 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 transition-colors" />
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
                  ? 'bg-gray-100/80 dark:bg-gray-950/50 white:bg-gray-100/90 text-gray-900 dark:text-white white:text-gray-900' 
                  : 'text-gray-700 dark:text-gray-300 white:text-gray-600 hover:bg-gray-100/50 dark:hover:bg-white/5 white:hover:bg-gray-100/70 hover:text-gray-900 dark:hover:text-white white:hover:text-gray-900',
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
