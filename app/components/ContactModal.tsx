'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PaperAirplaneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const emailSchema = z.object({
  from: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type EmailFormData = z.infer<typeof emailSchema>

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  prefilledEmail?: string
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
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
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Calendly Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-foreground">Schedule a Meeting</h4>
                    <div className="bg-background rounded-lg overflow-hidden border border-border">
                      <iframe
                        src="https://calendly.com/thomas-nuverum/30min?embed_domain=localhost&embed_type=Inline"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        title="Schedule a meeting"
                        className="min-h-[600px]"
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
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <textarea
                          {...register('message')}
                          id="message"
                          rows={6}
                          className="input w-full resize-none"
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
                          <p className="text-sm text-green-800">Message sent successfully! We'll get back to you soon.</p>
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