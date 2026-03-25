'use client'

const SERIF = 'var(--font-garamond), Georgia, serif'
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'

const INSTAGRAM_URL = 'https://www.instagram.com/whistling_spam'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #f0f0f0',
      padding: '24px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <p style={{ fontFamily: SERIF, fontSize: 13, color: '#b0b0b0', margin: 0 }}>
        Fergus Binns &copy; {new Date().getFullYear()}
      </p>

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        style={{ color: '#c0c0c0', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#7a7a7a')}
        onMouseLeave={e => (e.currentTarget.style.color = '#c0c0c0')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </footer>
  )
}
