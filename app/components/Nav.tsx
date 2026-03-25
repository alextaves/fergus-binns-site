'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

type Props = {
  years: string[]
  activeYear: string
  onYearChange: (year: string) => void
}

export default function Nav({ years, activeYear, onYearChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const workRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setWorkOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="w-full pt-8 pb-4 px-6 relative">
      {/* Mobile hamburger */}
      <button
        className="md:hidden absolute right-6 top-8 flex flex-col gap-[5px] p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className="block w-5 h-px bg-[#9a9a9a]" />
        <span className="block w-5 h-px bg-[#9a9a9a]" />
        <span className="block w-5 h-px bg-[#9a9a9a]" />
      </button>

      {/* Name */}
      <Link href="/" className="block text-center mb-5">
        <h1
          className="text-2xl md:text-3xl text-[#7a7a7a] tracking-wide"
          style={{ fontFamily: 'var(--font-garamond), Georgia, serif', fontWeight: 400 }}
        >
          Fergus Binns
        </h1>
      </Link>

      {/* Desktop nav items — centered below name */}
      <nav className="hidden md:flex justify-center gap-10 items-center">
        {/* Work dropdown */}
        <div ref={workRef} className="relative">
          <button
            onClick={() => setWorkOpen(!workOpen)}
            className="flex items-center gap-1 text-sm tracking-widest text-[#9a9a9a] hover:text-[#4a4a4a] transition-colors uppercase"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            Work
            <span className="text-xs text-[#aaa]">{workOpen ? '∧' : '∨'}</span>
          </button>

          {workOpen && (
            <div className="absolute left-0 top-full mt-3 bg-white z-50" style={{ paddingLeft: 15, paddingRight: 15 }}>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => { onYearChange(year); setWorkOpen(false) }}
                  className={`block w-full text-left py-2 text-sm transition-colors hover:bg-[#f5f5f5] ${
                    year === activeYear ? 'text-[#4a4a4a]' : 'text-[#9a9a9a] hover:text-[#4a4a4a]'
                  }`}
                  style={{ fontFamily: 'var(--font-garamond), Georgia, serif', marginLeft: -15, marginRight: -15, paddingLeft: 15, paddingRight: 15, width: 'calc(100% + 30px)' }}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/info"
          className="text-sm tracking-widest text-[#9a9a9a] hover:text-[#4a4a4a] transition-colors uppercase"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          Info
        </Link>

        <Link
          href="/contact"
          className="text-sm tracking-widest text-[#9a9a9a] hover:text-[#4a4a4a] transition-colors uppercase"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          Contact
        </Link>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white z-50 border-t border-gray-100 py-2">
          <div className="px-6 py-2">
            <p
              className="text-xs tracking-widest text-[#b0b0b0] uppercase mb-2"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Work
            </p>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => { onYearChange(year); setMenuOpen(false) }}
                className={`block py-1.5 text-sm transition-colors ${
                  year === activeYear ? 'text-[#4a4a4a]' : 'text-[#9a9a9a]'
                }`}
                style={{ fontFamily: 'var(--font-garamond), Georgia, serif' }}
              >
                {year}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-2 pt-2">
            {[{ label: 'Info', href: '/info' }, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-6 py-2.5 text-sm tracking-widest text-[#9a9a9a] uppercase"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
