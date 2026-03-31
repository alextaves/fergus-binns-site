'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import WorkDropdown from './WorkDropdown'
import Footer from './Footer'

type Work = {
  _id: string
  title: string
  year: string
  medium: string
  dimensions: string
  image: any
}

const SERIF = 'var(--font-garamond), Georgia, serif'
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'

export default function Gallery({ works }: { works: Work[] }) {
  const years = Array.from(new Set(works.map((w) => w.year))).sort((a, b) => Number(b) - Number(a))
  const searchParams = useSearchParams()
  const initialYear = searchParams.get('year') ?? years[0] ?? ''
  const [activeYear, setActiveYear] = useState(years.includes(initialYear) ? initialYear : years[0] ?? '')
  const [index, setIndex] = useState(0)
  const [imageTop, setImageTop] = useState(80)
  const imgRef = useRef<HTMLImageElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [headerBottom, setHeaderBottom] = useState(80)
  const [footerHeight, setFooterHeight] = useState(65)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const yearWorks = works.filter((w) => w.year === activeYear)
  const current = yearWorks[index] ?? null

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : yearWorks.length - 1))
  }, [yearWorks.length])

  const next = useCallback(() => {
    setIndex((i) => (i < yearWorks.length - 1 ? i + 1 : 0))
  }, [yearWorks.length])

  const selectYear = (year: string) => {
    setActiveYear(year)
    setIndex(0)
  }


  // Measure image top so we can position the header halfway between screen top and image top
  useEffect(() => {
    function measure() {
      if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect()
        setImageTop(rect.top)
      }
      if (headerRef.current) setHeaderBottom(headerRef.current.getBoundingClientRect().bottom)
      if (footerRef.current) setFooterHeight(footerRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [current, index, activeYear])

  const headerY = imageTop / 2

  const imageUrl = current?.image
    ? urlFor(current.image).width(2400).fit('max').url()
    : null

  return (
    <main className="min-h-screen">

      {/* Desktop layout */}
      <div style={{ display: isDesktop ? 'block' : 'none' }}>
        {/* Full viewport centered container */}
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Prev arrow */}
          <button
            onClick={prev}
            style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', color: '#c0c0c0', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10, padding: 0, display: 'flex', alignItems: 'center' }}
            aria-label="Previous"
          >
            <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="11,1 1,11 11,21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Image + caption */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: `calc(100vh - ${headerBottom + 25}px - ${footerHeight + 25}px)`,
            maxWidth: 'calc(100vw - 120px)',
          }}>
            <div style={{ position: 'relative' }}>
              {imageUrl && current ? (
                <img
                  ref={imgRef}
                  src={imageUrl}
                  alt={current.title || 'Artwork'}
                  style={{
                    display: 'block',
                    height: `calc(100vh - ${headerBottom + 25 + footerHeight + 25 + 80}px)`,
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                  onLoad={() => {
                    if (imgRef.current) setImageTop(imgRef.current.getBoundingClientRect().top)
                  }}
                />
              ) : (
                <div style={{ width: 680, aspectRatio: '4/3', background: '#f5f5f5' }} />
              )}

              {current && (
                <p style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, margin: 0, fontFamily: SERIF, fontSize: 13, color: '#6a6a6a', lineHeight: 1.3, whiteSpace: 'nowrap', textAlign: 'right' }}>
                  {current.title && <span style={{ fontStyle: 'italic' }}>{current.title}<br /></span>}
                  {current.medium && <span>{current.medium}<br /></span>}
                  {current.dimensions && <span>{current.dimensions}</span>}
                </p>
              )}
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', color: '#c0c0c0', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10, padding: 0, display: 'flex', alignItems: 'center' }}
            aria-label="Next"
          >
            <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="1,1 11,11 1,21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Fergus Binns + year — fixed top left */}
        <div ref={headerRef} style={{ position: 'fixed', left: 40, top: 30, zIndex: 20 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 400, color: '#7a7a7a', margin: 0 }}>
              Fergus Binns
            </h1>
          </a>
          <p style={{ fontFamily: SERIF, fontSize: 13, color: '#b0b0b0', margin: '4px 0 0 0' }}>
            {activeYear}
          </p>
        </div>

        {/* Nav — fixed 80px from top, right aligned */}
        <nav style={{ position: 'fixed', top: 25, right: 40, zIndex: 20, display: 'flex', alignItems: 'center', gap: 32 }}>
          <WorkDropdown years={years} activeYear={activeYear} onChange={selectYear} />
          <a href="/info" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Info</a>
          <a href="/contact" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Contact</a>
        </nav>
      </div>

      {/* Desktop footer */}
      <div ref={footerRef} style={{ display: isDesktop ? 'block' : 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20, background: '#fff' }}>
        <Footer />
      </div>

      {/* Mobile layout */}
      <div style={{ display: isDesktop ? 'none' : 'block' }}>
        <header className="px-5 pt-8 pb-4 flex items-center justify-between">
          <div>
            <h1 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: '#7a7a7a', margin: 0 }}>Fergus Binns</h1>
            <p style={{ fontFamily: SERIF, fontSize: 12, color: '#b0b0b0', margin: '3px 0 0 0' }}>{activeYear}</p>
          </div>
          <MobileMenu years={years} activeYear={activeYear} onYearChange={selectYear} />
        </header>
        <div className="px-5 pb-16 flex flex-col gap-10" style={{ paddingTop: 20 }}>
          {yearWorks.map((work) => {
            const url = work.image ? urlFor(work.image).width(800).fit('max').url() : null
            return (
              <div key={work._id}>
                {url && <img src={url} alt={work.title || 'Artwork'} style={{ width: '100%', height: 'auto' }} />}
                <div className="mt-3">
                  <p className="text-sm text-[#6a6a6a] leading-relaxed" style={{ fontFamily: SERIF }}>
                    {work.title && <span>{work.title}<br /></span>}
                    {work.medium && <span>{work.medium}<br /></span>}
                    {work.dimensions && <span>{work.dimensions}</span>}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <Footer />
      </div>
    </main>
  )
}

function MobileMenu({ years, activeYear, onYearChange }: { years: string[], activeYear: string, onYearChange: (y: string) => void }) {
  const [open, setOpen] = useState(false)
  const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'
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
              <button key={year} onClick={() => { onYearChange(year); setOpen(false) }}
                style={{ display: 'block', fontFamily: 'var(--font-garamond), Georgia, serif', fontSize: 14, color: year === activeYear ? '#4a4a4a' : '#9a9a9a', padding: '4px 0', background: 'none', border: 'none', cursor: 'pointer' }}>
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
