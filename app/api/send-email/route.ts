import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Server-side sanitization function
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
  
  // Remove potentially dangerous characters and patterns
  return stripped
    .replace(/[<>]/g, '') // Remove angle brackets
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
    .email('Invalid email address')
    .transform(sanitizeInput)
    .refine(val => val.length > 0, 'Email is required'),
  subject: z.string()
    .transform(sanitizeInput)
    .refine(val => val.length >= 1 && val.length <= 200, 'Subject must be between 1 and 200 characters'),
  message: z.string()
    .transform(sanitizeInput)
    .refine(val => val.length >= 10 && val.length <= 5000, 'Message must be between 10 and 5000 characters'),
})

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { 
          status: 503,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    // Initialize Resend with API key
    const resend = new Resend(apiKey)

    // Parse and validate the request body
    const body = await request.json()
    const { from, subject, message } = emailSchema.parse(body)

    // Additional server-side sanitization (defense in depth)
    const safeFrom = sanitizeInput(from)
    const safeSubject = sanitizeInput(subject)
    const safeMessage = sanitizeInput(message)

    // HTML escape function for additional safety
    const htmlEscape = (text: string): string => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <noreply@nuverum.com>', // This should match your verified domain
      to: ['thomas@nuverum.com'],
      subject: `Contact Form: ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${htmlEscape(safeFrom)}</p>
            <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${htmlEscape(safeSubject)}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #111827; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; white-space: pre-wrap;">
${htmlEscape(safeMessage)}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This email was sent from the Nuverum Ventures contact form.</p>
            <p>Reply directly to this email to respond to ${htmlEscape(safeFrom)}</p>
          </div>
        </div>
      `,
      replyTo: safeFrom,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}