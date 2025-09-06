'use client'

import { useState, useEffect } from 'react'

interface NuverumLogoProps {
  className?: string
  width?: number
  height?: number
}

export default function NuverumLogo({ className = '', width = 36, height = 22 }: NuverumLogoProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
    } else {
      setIsDark(false)
    }

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark')
          setIsDark(isDarkMode)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`flex items-center ${className}`}>
      {isDark ? (
        <svg 
          width={width} 
          height={height} 
          viewBox="0 0 250 150" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors duration-300"
        >
          <defs>
            <style>
              {`
                .cls-1 { letter-spacing: .16em; }
                .cls-2 { letter-spacing: .18em; }
                .cls-3 { fill: #fff; font-family: FONTSPRINGDEMO-AllRoundGothicLigRegular, 'FONTSPRING DEMO - All Round Gothic Lig'; font-size: 48px; }
                .cls-4 { letter-spacing: .18em; }
              `}
            </style>
          </defs>
          <text/>
          <text className="cls-3" transform="translate(-1.51 75)">
            <tspan className="cls-2" x="0" y="0">nu</tspan>
            <tspan className="cls-1" x="73.54" y="0">v</tspan>
            <tspan className="cls-4" x="108.24" y="0">erum</tspan>
          </text>
        </svg>
      ) : (
        <svg 
          width={width} 
          height={height} 
          viewBox="0 0 250 150" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors duration-300"
        >
          <defs>
            <style>
              {`
                .cls-1 { letter-spacing: .16em; }
                .cls-2 { letter-spacing: .18em; }
                .cls-3 { letter-spacing: .18em; }
                .cls-4 { font-family: FONTSPRINGDEMO-AllRoundGothicLigRegular, 'FONTSPRING DEMO - All Round Gothic Lig'; font-size: 48px; }
              `}
            </style>
          </defs>
          <text/>
          <text className="cls-4" transform="translate(-1.51 75)">
            <tspan className="cls-2" x="0" y="0">nu</tspan>
            <tspan className="cls-1" x="73.54" y="0">v</tspan>
            <tspan className="cls-3" x="108.24" y="0">erum</tspan>
          </text>
        </svg>
      )}
    </div>
  )
}
