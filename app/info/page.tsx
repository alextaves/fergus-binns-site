import Link from 'next/link'
import Footer from '../components/Footer'
import PageMenu from '../components/PageMenu'
import { getCV } from '@/sanity/lib/queries'

const SERIF = 'var(--font-garamond), Georgia, serif'
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b0b0b0', marginBottom: 16 }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function Entry({ year, text }: { year?: string; text: string }) {
  return (
    <div style={{ display: 'flex', gap: 32, marginBottom: 8 }}>
      <span style={{ fontFamily: SANS, fontSize: 12, color: '#9a9a9a', minWidth: 64, flexShrink: 0 }}>{year}</span>
      <span style={{ fontFamily: SANS, fontSize: 12, color: '#4a4a4a', lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Info',
  description: 'Biography, exhibitions, and CV for painter Fergus Binns.',
  alternates: { canonical: '/info' },
}

export const revalidate = 60

export default async function InfoPage() {
  const cv = await getCV()

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <style>{`
        .info-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: #fff;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 30px 40px 20px;
        }
        /* The name lives in the bar at every width, as it does on contact.
           It used to sit in the page body, which meant it appeared twice once
           the mobile header gained a logo. */
        .info-logo { display: block; font-size: 25px; white-space: nowrap; }
        .info-nav { display: flex; gap: 32px; white-space: nowrap; }
        .info-menu { display: none; }
        .info-body { max-width: 680px; margin: 0 auto; padding: 100px 40px 80px; box-sizing: border-box; }
        @media (max-width: 600px) {
          /* 20px/30px, 32px top, 40px gutter: identical to the homepage mobile
             header, so the logo and hamburger land on the same pixels. */
          .info-header { height: 78px; padding: 32px 40px 16px; }
          .info-logo { font-size: 20px; line-height: 30px; }
          .info-nav { display: none; }
          .info-menu { display: flex; }
        }
      `}</style>

      <header className="info-header">
        <Link href="/" className="info-logo" style={{ fontFamily: SANS, fontWeight: 400, color: '#1c1917', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Fergus Binns
        </Link>
        <nav className="info-nav">
          <Link href="/" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Work</Link>
          <Link href="/info" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4a4a', textDecoration: 'none' }}>Info</Link>
          <Link href="/contact" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Contact</Link>
        </nav>
        <div className="info-menu">
          <PageMenu current="info" />
        </div>
      </header>

      {/* Content */}
      <div className="info-body">

        {/* Bio */}
        {cv?.bio && (
          <p style={{ fontFamily: SANS, fontSize: 14, color: '#4a4a4a', lineHeight: 1.8, marginBottom: 56 }}>
            {cv.bio}
          </p>
        )}

        {cv?.education?.length > 0 && (
          <Section title="Education">
            {cv.education.map((e: { year: string; text: string }, i: number) => (
              <Entry key={i} year={e.year} text={e.text} />
            ))}
          </Section>
        )}

        {cv?.soloExhibitions?.length > 0 && (
          <Section title="Solo Exhibitions">
            {cv.soloExhibitions.map((e: { year: string; text: string }, i: number) => (
              <Entry key={i} year={e.year} text={e.text} />
            ))}
          </Section>
        )}

        {cv?.groupExhibitions?.length > 0 && (
          <Section title="Group Exhibitions">
            {cv.groupExhibitions.map((e: { year: string; text: string }, i: number) => (
              <Entry key={i} year={e.year} text={e.text} />
            ))}
          </Section>
        )}

        {cv?.awards?.length > 0 && (
          <Section title="Awards">
            {cv.awards.map((e: { year: string; text: string }, i: number) => (
              <Entry key={i} year={e.year} text={e.text} />
            ))}
          </Section>
        )}

        {cv?.collections?.length > 0 && (
          <Section title="Collections">
            <div style={{ fontFamily: SANS, fontSize: 12, color: '#4a4a4a', lineHeight: 1.8 }}>
              {cv.collections.map((c: string, i: number) => (
                <span key={i}>{c}<br /></span>
              ))}
            </div>
          </Section>
        )}

      </div>
      <Footer />
    </main>
  )
}
