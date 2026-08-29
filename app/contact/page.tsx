import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from './ContactForm'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with painter Fergus Binns.',
  alternates: { canonical: '/contact' },
}

const SERIF = 'var(--font-garamond), Georgia, serif'
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'

export default function ContactPage() {
  return (
    // The fixed header and footer are lifted out of the flow, so the form has to
    // reserve their space itself. Both clearances derive from --hdr / --ftr, and
    // the header is given that exact height, so the reservation cannot drift out
    // of step with the bar it is reserving for. The logo is nowrap: letting it
    // wrap to two lines is what grew the header past a hardcoded padding and put
    // FERGUS BINNS on top of the NAME field on narrow screens.
    // Centring is done with auto margins, NOT justifyContent -- when the form is
    // taller than the viewport, centring pushes the overflow above the scroll
    // origin where it cannot be reached. Auto margins collapse to zero instead.
    <main className="contact-main">
      <style>{`
        .contact-main {
          --hdr: 88px;
          --hdr-pt: 30px;
          --hdr-pb: 20px;
          --ftr: 84px;
          --gut: 40px;
          --gap: 12px;
          min-height: 100vh;
          background: #fff;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding-top: calc(var(--hdr) + var(--gap));
          padding-bottom: var(--ftr);
        }
        .contact-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: #fff;
          box-sizing: border-box;
          height: var(--hdr);
          padding: var(--hdr-pt) var(--gut) var(--hdr-pb);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .contact-logo {
          font-size: 25px;
          white-space: nowrap;
        }
        .contact-nav { display: flex; gap: 32px; white-space: nowrap; }
        .contact-nav a { font-size: 12px; }
        .contact-body {
          max-width: 680px;
          width: 100%;
          margin: auto;
          padding: var(--hdr-pt) var(--gut) var(--hdr-pb);
          box-sizing: border-box;
        }
        @media (max-width: 600px) {
          .contact-main { --hdr: 64px; --hdr-pt: 18px; --hdr-pb: 12px; --gut: 22px; }
          .contact-logo { font-size: 17px; }
          .contact-nav { gap: 15px; }
          .contact-nav a { font-size: 10px; letter-spacing: 0.08em; }
        }
        @media (max-width: 360px) {
          .contact-main { --hdr: 60px; --hdr-pt: 16px; --hdr-pb: 11px; --gut: 16px; }
          .contact-logo { font-size: 15px; }
          .contact-nav { gap: 11px; }
          .contact-nav a { font-size: 9px; letter-spacing: 0.06em; }
        }
      `}</style>

      <header className="contact-header">
        <Link href="/" className="contact-logo" style={{ fontFamily: SANS, fontWeight: 400, color: '#1c1917', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Fergus Binns
        </Link>
        <nav className="contact-nav">
          <Link href="/" style={{ fontFamily: SANS, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Work</Link>
          <Link href="/info" style={{ fontFamily: SANS, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Info</Link>
          <Link href="/contact" style={{ fontFamily: SANS, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4a4a', textDecoration: 'none' }}>Contact</Link>
        </nav>
      </header>

      <div className="contact-body">
        <ContactForm />
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff' }}>
        <Footer />
      </div>
    </main>
  )
}
