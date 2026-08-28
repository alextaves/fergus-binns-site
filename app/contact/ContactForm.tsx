'use client'

import { useState, useEffect, useRef } from 'react'

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

// Loaded once for the life of the page and never taken away again. Explicit
// render, so the widget is created for the node we actually have rather than
// relying on Turnstile's one-time sweep for .cf-turnstile elements.
const SCRIPT_ID = 'cf-turnstile-api'
function loadTurnstile(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  if (window.__turnstileReady) return window.__turnstileReady
  window.__turnstileReady = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(), { once: true })
      return
    }
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.head.appendChild(script)
  })
  return window.__turnstileReady
}

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
  const [token, setToken] = useState('')
  const [captchaFailed, setCaptchaFailed] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadTurnstile()
      .then(() => {
        if (cancelled || !window.turnstile || !widgetRef.current) return
        if (widgetIdRef.current) return          // already rendered into this node
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: SITE_KEY,
          callback: (t) => { setToken(t); setCaptchaFailed(false) },
          'error-callback': () => { setToken(''); setCaptchaFailed(true) },
          'timeout-callback': () => { setToken(''); setCaptchaFailed(true) },
          'expired-callback': () => { setToken('') },
        }) ?? null
      })
      .catch(() => { if (!cancelled) setCaptchaFailed(true) })

    return () => {
      cancelled = true
      // Remove the WIDGET, never the script. Turnstile keeps a global once the
      // script has run, so deleting the tag and re-adding it on the next visit
      // does not re-run the auto-render pass — the widget silently never appears
      // and the form posts with no token. That was the bug: land on /contact and
      // it worked, arrive from another page and Send did nothing at all.
      const id = widgetIdRef.current
      if (id && window.turnstile?.remove) {
        try { window.turnstile.remove(id) } catch { /* already gone */ }
      }
      widgetIdRef.current = null
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    // Without this the form posted an empty token, the API answered 400 and the
    // button appeared dead — no message, nothing. Fail loudly instead.
    if (!token) { setCaptchaFailed(true); return }

    setStatus('sending')
    const data = new FormData(form)
    data.set('cf-turnstile-response', token)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
        setToken('')
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.reset(widgetIdRef.current)
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

      <div>
        {/* No cf-turnstile class: that is the marker for Turnstile's automatic
            sweep, and we render into this node ourselves. Both would double up. */}
        <div ref={widgetRef} style={{ minHeight: 65 }} />
        {captchaFailed && (
          <p style={{ fontFamily: SERIF, fontSize: 13, color: '#c0a0a0', margin: '8px 0 0' }}>
            The spam check could not load. Please refresh the page and try again.
          </p>
        )}
      </div>

      {status === 'error' && (
        <p style={{ fontFamily: SERIF, fontSize: 13, color: '#c0a0a0', margin: 0 }}>
          Something went wrong. Please try again.
        </p>
      )}

      {/* alignItems flex-start, or the column stretches the button to full width
          and its label centres — everything else on this form is left aligned. */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
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

        {/* Always visible, not only on failure. The captcha is a single point of
            failure on the only contact route — if it cannot load, or a visitor
            simply prefers email, there has to be a way through that does not
            depend on it. */}
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: '#b0b0b0', margin: 0 }}>
          or email{' '}
          <a
            href="mailto:fergus@fergusbinns.com"
            style={{ color: '#4a4a4a', textDecoration: 'none',
                     borderBottom: '1px solid #e0e0e0' }}
          >
            fergus@fergusbinns.com
          </a>
        </p>
      </div>
    </form>
  )
}
