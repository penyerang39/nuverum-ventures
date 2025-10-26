'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface FAQItemProps {
  question: string
  answer: string
  index: number
}

export default function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 pr-4 flex items-start justify-between gap-4 text-left hover:opacity-80 transition-opacity duration-200"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-xl font-semibold flex-1">{question}</h3>
        <ChevronDownIcon 
          className={`size-6 flex-shrink-0 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? '1000px' : '0',
        }}
      >
        <div className="pb-4 pr-10">
          <p className="text-muted leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

