'use client'

import { useState, useRef, useEffect } from 'react'

type Props = {
  years: string[]
  activeYear: string
  onChange: (year: string) => void
}

export default function YearDropdown({ years, activeYear, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-[#7a7a7a] hover:text-[#4a4a4a] transition-colors"
        style={{ fontFamily: 'var(--font-garamond), Georgia, serif' }}
      >
        {activeYear}
        <span className="text-xs ml-0.5 text-[#aaa]">{open ? '∧' : '∨'}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 bg-white z-50 min-w-[80px]">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => { onChange(year); setOpen(false) }}
              className={`block w-full text-left py-2 text-sm transition-colors ${
                year === activeYear
                  ? 'text-[#4a4a4a]'
                  : 'text-[#9a9a9a] hover:text-[#4a4a4a]'
              }`}
              style={{ fontFamily: 'var(--font-garamond), Georgia, serif' }}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
