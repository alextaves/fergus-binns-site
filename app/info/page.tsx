import Link from 'next/link'
import Footer from '../components/Footer'
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
      <span style={{ fontFamily: SERIF, fontSize: 14, color: '#9a9a9a', minWidth: 64, flexShrink: 0 }}>{year}</span>
      <span style={{ fontFamily: SERIF, fontSize: 14, color: '#4a4a4a', lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}

export const revalidate = 60

export default async function InfoPage() {
  const cv = await getCV()

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Nav */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '30px 40px 20px' }}>
        <Link href="/" style={{ fontFamily: SERIF, fontSize: 25, fontWeight: 400, color: '#7a7a7a', textDecoration: 'none' }}>
          Fergus Binns
        </Link>
        <nav style={{ display: 'flex', gap: 32 }}>
          <Link href="/" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Work</Link>
          <Link href="/info" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a4a4a', textDecoration: 'none' }}>Info</Link>
          <Link href="/contact" style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9a9a', textDecoration: 'none' }}>Contact</Link>
        </nav>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '140px 40px 80px' }}>

        {/* Bio */}
        {cv?.bio && (
          <p style={{ fontFamily: SERIF, fontSize: 16, color: '#4a4a4a', lineHeight: 1.8, marginBottom: 56 }}>
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
            <div style={{ fontFamily: SERIF, fontSize: 14, color: '#4a4a4a', lineHeight: 1.8 }}>
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
