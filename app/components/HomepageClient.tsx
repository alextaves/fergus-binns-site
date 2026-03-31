'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Footer from './Footer'
import WorkDropdown from './WorkDropdown'

const SERIF = 'var(--font-garamond), Georgia, serif'
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'

type Props = {
  imageUrl: string
  mobileImageUrl: string
  year: string
  years: string[]
}

export default function HomepageClient({ imageUrl, mobileImageUrl, year, years }: Props) {
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [headerBottom, setHeaderBottom] = useState(60)
  const [footerHeight, setFooterHeight] = useState(65)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    function measure() {
      if (headerRef.current) setHeaderBottom(headerRef.current.getBoundingClientRect().bottom)
      if (footerRef.current) setFooterHeight(footerRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isDesktop])

  const imgH = `calc(100vh - ${headerBottom + 25 + footerHeight + 25 + 80}px)`

  return (
    <main>

      {/* ── Desktop ── */}
      <div style={{ display: isDesktop ? 'block' : 'none', position: 'fixed', inset: 0, background: '#fff' }}>

        {/* Image + caption */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: headerBottom + 25,
          height: `calc(100vh - ${headerBottom + 25}px - ${footerHeight + 25}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
        }}>
          <div style={{ position: 'relative' }}>
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Fergus Binns"
                style={{ display: 'block', height: imgH, width: 'auto', maxWidth: 'calc(100vw - 120px)', objectFit: 'contain' }}
              />
            )}
            <p style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, margin: 0, fontFamily: SERIF, fontSize: 13, color: '#6a6a6a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
              {year}
            </p>
          </div>
        </div>

        {/* Name */}
        <div ref={headerRef} style={{ position: 'fixed', left: 40, top: 30, zIndex: 20 }}>
          <h1 style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 400, color: '#7a7a7a', margin: 0 }}>
            Fergus Binns
          </h1>
        </div>

        {/* Nav */}
        <nav style={{ position: 'fixed', top: 25, right: 40, zIndex: 20, display: 'flex', alignItems: 'center', gap: 32 }}>
          <WorkDropdown years={years} activeYear="" onChange={(year) => router.push(`/work?year=${year}`)} />
          <a href="/info" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Info</a>
          <a href="/contact" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Contact</a>
        </nav>

        {/* Footer */}
        <div ref={footerRef} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20, background: '#fff' }}>
          <Footer />
        </div>
      </div>

      {/* ── Mobile & Tablet ── */}
      <div style={{ display: isDesktop ? 'none' : 'flex', height: '100vh', flexDirection: 'column' }}>

        {/* Header — 40px sides to match footer */}
        <header style={{ flexShrink: 0, padding: '32px 40px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: '#7a7a7a', margin: 0 }}>
            Fergus Binns
          </h1>
          <MobileMenu years={years} onNavigate={(year) => router.push(`/work?year=${year}`)} />
        </header>

        {/* Image + caption — fills remaining space */}
        <div style={{ flex: 1, minHeight: 0, padding: '20px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', maxHeight: '100%', display: 'flex' }}>
            {mobileImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mobileImageUrl}
                alt="Fergus Binns"
                style={{ display: 'block', maxHeight: '100%', maxWidth: 'calc(100vw - 80px)', width: 'auto', height: 'auto' }}
              />
            )}
            {year && (
              <p style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, margin: 0, fontFamily: SERIF, fontSize: 12, color: '#6a6a6a', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
                {year}
              </p>
            )}
          </div>
        </div>

        <div style={{ flexShrink: 0, paddingTop: 40 }}>
          <Footer />
        </div>
      </div>

    </main>
  )
}

function MobileMenu({ years, onNavigate }: { years: string[], onNavigate: (year: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex flex-col gap-[5px] p-1">
        <span className="block w-5 h-px bg-[#9a9a9a]" />
        <span className="block w-5 h-px bg-[#9a9a9a]" />
        <span className="block w-5 h-px bg-[#9a9a9a]" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white z-50 min-w-[140px] shadow-sm">
          <div className="px-4 py-3">
            <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b0b0b0', marginBottom: 8 }}>Work</p>
            {years.map(year => (
              <button key={year} onClick={() => { onNavigate(year); setOpen(false) }}
                style={{ display: 'block', fontFamily: SERIF, fontSize: 14, color: '#9a9a9a', padding: '4px 0', background: 'none', border: 'none', cursor: 'pointer' }}>
                {year}
              </button>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #f0f0f0', padding: '8px 16px' }}>
            {['Info', 'Contact'].map(label => (
              <a key={label} href={`/${label.toLowerCase()}`}
                style={{ display: 'block', fontFamily: SANS, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', padding: '6px 0', textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
