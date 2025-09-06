'use client'

import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

interface AnimatedThemeToggleProps {
  className?: string
}

type Theme = 'light' | 'dark' | 'white'

export default function AnimatedThemeToggle({ className = '' }: AnimatedThemeToggleProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light')

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') as Theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    let initialTheme: Theme = 'light'
    if (savedTheme && ['light', 'dark', 'white'].includes(savedTheme)) {
      initialTheme = savedTheme
    } else if (prefersDark) {
      initialTheme = 'dark'
    }
    
    setCurrentTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (theme: Theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'white')
    
    // Apply the new theme class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'white') {
      document.documentElement.classList.add('white')
    }
    // 'light' theme has no class (default)
  }

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'white']
    const currentIndex = themes.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    const newTheme = themes[nextIndex]
    
    setCurrentTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const getIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <SunIcon className="w-6 h-6" />
      case 'dark':
        return <MoonIcon className="w-6 h-6" />
      case 'white':
        return <ComputerDesktopIcon className="w-6 h-6" />
      default:
        return <SunIcon className="w-6 h-6" />
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className={`w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 white:text-gray-800 hover:text-gray-900 dark:hover:text-white white:hover:text-gray-900 transition-all duration-300 ${className}`}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'white' : 'light'} theme`}
    >
      {getIcon()}
    </button>
  )
}
