'use client'

import { useState, useRef, useEffect } from 'react'

const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'

const LINKS = [
  { label: 'Work', href: '/' },
  { label: 'Info', href: '/info' },
  { label: 'Contact', href: '/contact' },
]

/**
 * The mobile nav for the standalone pages (contact, info), matching the
 * hamburger the homepage and work pages already use. Those pages build their
 * menu around the year list; these have no years, so this is the same shell
 * with a flat set of links.
 */
export default function PageMenu({ current }: { current?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click and on Escape, so the panel cannot be left open
  // covering the form underneath it.
  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-[5px] p-1"
        aria-label="Menu"
        aria-expanded={open}
      >
        <span className="block w-5 h-px bg-[#9a9a9a]" />
        <span className="block w-5 h-px bg-[#9a9a9a]" />
        <span className="block w-5 h-px bg-[#9a9a9a]" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white z-50 min-w-[140px] shadow-sm">
          <div style={{ padding: '8px 16px' }}>
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  display: 'block',
                  fontFamily: SANS,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: current === label.toLowerCase() ? '#4a4a4a' : '#9a9a9a',
                  padding: '6px 0',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
