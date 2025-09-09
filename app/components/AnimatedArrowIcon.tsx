'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

interface AnimatedArrowIconProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  isActive?: boolean
}

export default function AnimatedArrowIcon({ 
  className = '', 
  size = 'md',
  isActive = false
}: AnimatedArrowIconProps) {
  const sizeClasses = {
    sm: 'size-3',
    md: 'size-4', 
    lg: 'size-5'
  }

  return (
    <div className={`overflow-hidden transition-all duration-300 ease-out ${isActive ? 'w-auto' : 'w-0'} group-hover:w-auto md:${isActive ? 'w-auto' : 'w-0'} ${className}`.trim()}>
      <ArrowUpRightIcon 
        className={`shrink-0 transition-all duration-300 ease-out ${isActive ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-1 translate-y-1'} group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 md:${isActive ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-1 translate-y-1'} ${sizeClasses[size]}`}
      />
    </div>
  )
}
