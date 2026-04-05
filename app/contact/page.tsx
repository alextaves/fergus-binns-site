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
    <main style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '30px 40px 20px' }}>
        <Link href="/" style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 400, color: '#7a7a7a', textDecoration: 'none' }}>
          Fergus Binns
        </Link>
        <nav style={{ display: 'flex', gap: 32 }}>
          <Link href="/" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Work</Link>
          <Link href="/info" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Info</Link>
          <Link href="/contact" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4a4a', textDecoration: 'none' }}>Contact</Link>
        </nav>
      </header>

      <div style={{ maxWidth: 680, width: '100%', margin: '0 auto', padding: '0 40px' }}>
        <ContactForm />
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff' }}>
        <Footer />
      </div>
    </main>
  )
}
