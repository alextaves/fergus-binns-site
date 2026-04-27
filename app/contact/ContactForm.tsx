'use client'

import { useState, useEffect, useRef } from 'react'

const SERIF = 'var(--font-garamond), Georgia, serif'
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'

const labelStyle = {
  fontFamily: SANS,
  fontSize: 10,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#b0b0b0',
  display: 'block',
  marginBottom: 8,
}

const inputStyle = {
  fontFamily: SERIF,
  fontSize: 15,
  color: '#4a4a4a',
  width: '100%',
  border: 'none',
  borderBottom: '1px solid #e0e0e0',
  outline: 'none',
  padding: '6px 0',
  background: 'transparent',
  lineHeight: 1.6,
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
        // Reset Turnstile widget
        if (window.turnstile && widgetRef.current) {
          window.turnstile.reset(widgetRef.current)
        }
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p style={{ fontFamily: SERIF, fontSize: 16, color: '#6a6a6a', lineHeight: 1.8 }}>
        Thank you. Your message has been sent.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input id="name" name="name" type="text" required style={inputStyle} />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input id="email" name="email" type="email" required style={inputStyle} />
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          style={{ ...inputStyle, resize: 'none', borderBottom: '1px solid #e0e0e0' }}
        />
      </div>

      <div
        ref={widgetRef}
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />

      {status === 'error' && (
        <p style={{ fontFamily: SERIF, fontSize: 13, color: '#c0a0a0', margin: 0 }}>
          Something went wrong. Please try again.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            fontFamily: SANS,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: status === 'sending' ? '#c0c0c0' : '#4a4a4a',
            background: 'none',
            border: 'none',
            cursor: status === 'sending' ? 'default' : 'pointer',
            padding: 0,
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  )
}
