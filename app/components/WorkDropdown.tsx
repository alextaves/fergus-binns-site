'use client'

import { useState, useRef, useEffect } from 'react'

const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'
const SERIF = 'var(--font-garamond), Georgia, serif'

export default function WorkDropdown({ years, activeYear, onChange }: { years: string[], activeYear: string, onChange: (y: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
      >
        Work
        <span style={{ fontSize: 10, color: '#bbb' }}>{open ? '∧' : '∨'}</span>
      </button>

      {open && (
        <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 12px)', background: 'white', zIndex: 50, paddingLeft: 15, paddingRight: 15, maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          {years.map(year => (
            <button
              key={year}
              onClick={() => { onChange(year); setOpen(false) }}
              style={{
                display: 'block', width: 'calc(100% + 30px)', marginLeft: -15, marginRight: -15,
                paddingLeft: 15, paddingRight: 15,
                textAlign: 'left', fontFamily: SERIF, fontSize: 13,
                color: year === activeYear ? '#4a4a4a' : '#9a9a9a',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '7px 15px',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
