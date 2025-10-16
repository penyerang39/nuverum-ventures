'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PaperAirplaneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DOMPurify from 'dompurify'
import { usePerformanceTracking } from '../hooks/usePerformanceTracking'

// Extend window interface for Calendly preload state
declare global {
  interface Window {
    calendlyPreloaded?: boolean
  }
}

// Sanitization function to clean user input
const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return ''
  
  // First, decode HTML entities
  let decoded = input
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#x60;/g, '`')
    .replace(/&#x3D;/g, '=')
  
  // Strip all HTML tags completely
  const stripped = decoded.replace(/<[^>]*>/g, '')
  
  // Then use DOMPurify for additional sanitization
  const sanitized = DOMPurify.sanitize(stripped, { 
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true // Keep text content but strip tags
  })
  
  // Remove any remaining potentially dangerous characters and patterns
  return sanitized
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/data:/gi, '') // Remove data: protocols
    .replace(/vbscript:/gi, '') // Remove vbscript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/expression\s*\(/gi, '') // Remove CSS expressions
    .replace(/url\s*\(/gi, '') // Remove CSS url() functions
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

const emailSchema = z.object({
  from: z.string()
    .email('Please enter a valid email address')
    .transform(sanitizeInput)
    .refine(val => val.length > 0, 'Email is required'),
  subject: z.string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters')
    .transform(sanitizeInput)
    .refine(val => val.length > 0, 'Subject is required'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .transform(sanitizeInput)
    .refine(val => val.length >= 10, 'Message must be at least 10 characters'),
})

type EmailFormData = z.infer<typeof emailSchema>

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  prefilledEmail?: string
  calendlyReady?: boolean
}

export default function ContactModal({ isOpen, onClose, prefilledEmail = '', calendlyReady = false }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false)

  // Performance tracking
  const { trackUserInteraction, trackCustomMetric } = usePerformanceTracking()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  // Track modal open/close performance and check if Calendly is preloaded
  useEffect(() => {
    if (isOpen) {
      trackCustomMetric('modal-open', performance.now())
      // Check if Calendly was preloaded and set loaded state immediately
      if (calendlyReady || window.calendlyPreloaded) {
        setIsCalendlyLoaded(true)
      }
    }
  }, [isOpen, trackCustomMetric, calendlyReady])

  // Set prefilled email when modal opens
  useEffect(() => {
    if (isOpen && prefilledEmail) {
      setValue('from', prefilledEmail)
    }
  }, [isOpen, prefilledEmail, setValue])


  const onSubmit = async (data: EmailFormData) => {
    const submitStartTime = performance.now()
    trackUserInteraction('form-submit-start', 'contact-modal')
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Additional sanitization before sending (defense in depth)
      const sanitizedData = {
        from: sanitizeInput(data.from),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })

      const submitEndTime = performance.now()
      trackCustomMetric('form-submit-duration', submitEndTime - submitStartTime)

      if (response.ok) {
        setSubmitStatus('success')
        trackUserInteraction('form-submit-success', 'contact-modal')
        reset()
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
        trackUserInteraction('form-submit-error', 'contact-modal')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      trackUserInteraction('form-submit-error', 'contact-modal')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-surface p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex items-start justify-between mb-6">
                  <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-foreground">
                    Get in Touch
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md p-2 text-muted hover:text-foreground hover:bg-background transition-colors"
                    onClick={() => {
                      trackUserInteraction('modal-close', 'contact-modal')
                      onClose()
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Calendly Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-foreground">Schedule a Meeting</h4>
                    <div className="bg-background rounded-lg overflow-hidden relative">
                      {!isCalendlyLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 mx-auto mb-2 border-2 border-gray-300 border-t-accent-strong"></div>
                            <p className="text-sm text-muted">Loading meeting scheduler...</p>
                          </div>
                        </div>
                      )}
                      <iframe
                        src="https://calendly.com/thomas-nuverum/30min?embed_domain=localhost&embed_type=Inline"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        title="Schedule a meeting"
                        className="min-h-[600px]"
                        loading="eager"
                        onLoad={() => {
                          setIsCalendlyLoaded(true)
                          trackUserInteraction('calendly-iframe-load', 'contact-modal')
                        }}
                      />
                    </div>
                  </div>

                  {/* Email Form Section */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-foreground">Send us a Message</h4>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label htmlFor="from" className="block text-sm font-medium text-foreground mb-2">
                          Your Email
                        </label>
                        <input
                          {...register('from')}
                          type="email"
                          id="from"
                          className="input w-full"
                          placeholder="your@email.com"
                        />
                        {errors.from && (
                          <p className="mt-1 text-sm text-red-600">{errors.from.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <input
                          {...register('subject')}
                          type="text"
                          id="subject"
                          className="input w-full"
                          placeholder="What can we help you with?"
                        />
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                        )}
                      </div>

                      <div>
                        <div className="grid min-h-[120px] grid-rows-[auto,auto]">
                          <label htmlFor="message" className="block text-sm font-medium text-foreground">
                            Message
                          </label>
                          <textarea
                            {...register('message')}
                            id="message"
                            rows={6}
                            className="input w-full min-h-[80px] resize-y"
                            placeholder="Tell us about your project or inquiry..."
                          />
                        </div>
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <PaperAirplaneIcon className="h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </button>

                      {submitStatus === 'success' && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-sm text-green-800">Message sent successfully! We&apos;ll get back to you soon.</p>
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm text-red-800">Failed to send message. Please try again or use the email link below.</p>
                        </div>
                      )}
                    </form>

                    {/* Mailto Link */}
                    <div className="pt-4 border-t border-border">
                      <a
                        href="mailto:thomas@nuverum.com?subject=Nuverum Ventures Inquiry"
                        className="inline-flex items-center gap-2 text-sm text-accent-strong hover:underline"
                      >
                        <EnvelopeIcon className="h-4 w-4" />
                        Open in your email client
                      </a>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}