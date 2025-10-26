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
  const decoded = input
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
    .transform(sanitizeInput)
    .refine(val => val.length >= 1, 'Subject is required')
    .refine(val => val.length <= 200, 'Subject is too long'),
  message: z.string()
    .transform(sanitizeInput)
    .refine(val => val.length >= 10, 'Message must be at least 10 characters')
    .refine(val => val.length <= 5000, 'Message is too long'),
})

type EmailFormData = z.infer<typeof emailSchema>

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  prefilledEmail?: string
  prefilledSubject?: string
  calendlyReady?: boolean
}

export default function ContactModal({ isOpen, onClose, prefilledEmail = '', prefilledSubject = '', calendlyReady = false }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false)
  const [serverError, setServerError] = useState<string>('')
  const [messageLength, setMessageLength] = useState(0)
  const [subjectLength, setSubjectLength] = useState(0)

  // Performance tracking
  const { trackUserInteraction, trackCustomMetric } = usePerformanceTracking()

  // Count "safe" characters after sanitization (client-side preview)
  const getSafeLength = (input: string): number => {
    if (!input) return 0
    return input
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
      .length
  }

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

  // Set prefilled subject when modal opens
  useEffect(() => {
    if (isOpen && prefilledSubject) {
      setValue('subject', prefilledSubject)
    }
  }, [isOpen, prefilledSubject, setValue])


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
        setServerError('')
        trackUserInteraction('form-submit-success', 'contact-modal')
        reset()
        setMessageLength(0)
        setSubjectLength(0)
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
        // Generic error - never reveal sanitization details
        if (response.status === 400) {
          setServerError('Please check your input and try again')
        } else {
          setServerError('Failed to send message. Please try again or email us directly.')
        }
        trackUserInteraction('form-submit-error', 'contact-modal')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      setServerError('Failed to send message. Please try again or email us directly.')
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
          <div className="fixed inset-0 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle border border-muted transition-all">
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
                        allow="payment; geolocation"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
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
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2 flex justify-between items-center">
                          <span>Subject</span>
                          <span className={`text-xs ${subjectLength > 200 ? 'text-red-600' : 'text-muted'}`}>
                            {subjectLength}/200
                          </span>
                        </label>
                        <input
                          {...register('subject')}
                          type="text"
                          id="subject"
                          maxLength={200}
                          onChange={(e) => setSubjectLength(getSafeLength(e.target.value))}
                          className="input w-full"
                          placeholder="What can we help you with?"
                        />
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2 flex justify-between items-center">
                          <span>Message</span>
                          <span className={`text-xs text-muted`}>
                            {messageLength}/5000 {messageLength < 10 && '(min: 10)'}
                          </span>
                        </label>
                        <textarea
                          {...register('message')}
                          id="message"
                          rows={6}
                          maxLength={5000}
                          onChange={(e) => setMessageLength(getSafeLength(e.target.value))}
                          className="input w-full min-h-[80px] resize-y"
                          placeholder="Tell us about your project or inquiry..."
                        />
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
                          <p className="text-sm text-red-800">{serverError || 'Failed to send message. Please try again or use the email link below.'}</p>
                        </div>
                      )}
                    </form>

                    {/* Mailto Link */}
                    <div className="pt-4 border-t border-border">
                      <a
                        href={`mailto:thomas@nuverum.com?subject=${sanitizeInput(prefilledSubject)}`}
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