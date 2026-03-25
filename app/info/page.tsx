import Link from 'next/link'
import Footer from '../components/Footer'

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

function Entry({ year, text }: { year?: string; text: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 32, marginBottom: 8 }}>
      <span style={{ fontFamily: SERIF, fontSize: 14, color: '#9a9a9a', minWidth: 64, flexShrink: 0 }}>{year}</span>
      <span style={{ fontFamily: SERIF, fontSize: 14, color: '#4a4a4a', lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}

export default function InfoPage() {
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
        <p style={{ fontFamily: SERIF, fontSize: 16, color: '#4a4a4a', lineHeight: 1.8, marginBottom: 56 }}>
          Born 1980, Lismore NSW, Australia. Lives and works in Melbourne.
        </p>

        <Section title="Education">
          <Entry year="2000–02" text="Bachelor of Fine Art (Painting), Victorian College of the Arts, Melbourne" />
          <Entry year="1999" text="Art, Design and Photography Program, Elwood College, Elwood" />
        </Section>

        <Section title="Solo Exhibitions">
          <Entry year="2026" text={<><em>Ice Bear</em>, Mary Cherry Contemporary, Collingwood</>} />
          <Entry year="2024" text={<><em>Notes to Citizen</em>, Neon Parc, South Yarra</>} />
          <Entry year="2021" text="Memory Cleaner, Mary Cherry, Collingwood; Medicine Walls, TCB art inc, Brunswick" />
          <Entry year="2016" text={<><em>To the right music, the Diamond Will Orbit The Moth</em>, Long Division Gallery, Collingwood</>} />
          <Entry year="2015" text="Possibly etc, TCB art inc, Melbourne" />
          <Entry year="2014" text="Spinifex Songs, Watch This Space, Alice Springs; Rarities, Scarities, Ruins and Ripe Fruit, Utopian Slumps, Melbourne" />
          <Entry year="2012" text="Ali Baba Squinting and The Watership Windband, Utopian Slumps, Melbourne" />
          <Entry year="2011" text="Toy Paintings, Uplands Gallery, Melbourne" />
          <Entry year="2010" text="Toy Paintings, Chalkhorse Gallery, Sydney" />
          <Entry year="2009" text="In A Heartbeat (Minnie Expressions of a Distant Airshow), Inflight, Hobart" />
          <Entry year="2008" text="Missing Bushwalkers On Found Landscapes, Uplands Gallery, Prahran; Work From Garage, Chalkhorse, Sydney" />
          <Entry year="2007" text="The Wilderness, Uplands Gallery, Prahran; Fergus Binns, Chalk Horse, Sydney" />
          <Entry year="2005" text="Fergus Binns, Uplands Gallery, Melbourne" />
          <Entry year="2004" text="Paintings, TCB art inc, Melbourne" />
          <Entry year="2003" text="Galerie Vege, TCB art inc, Melbourne" />
        </Section>

        <Section title="Group Exhibitions">
          <Entry year="2025" text="Summer Show, Kyneton Ridge Art Space, Kyneton" />
          <Entry year="2023" text={<><em>Introduced Pieces</em>, Kyneton Ridge Art Space, Kyneton</>} />
          <Entry year="2022" text="Eddy, Minerva, Sydney" />
          <Entry year="2021" text={<><em>It's Raining In Sunshine</em>, LON Gallery, Richmond</>} />
          <Entry year="2018" text={<><em>Accession</em>, Bundoora Homestead Art Centre, Bundoora</>} />
          <Entry year="2017" text="Waves, Honeymoon Suite, Brunswick; Open House, True Estate, The Alderman Bar, Brunswick; 9 x 5, VCA Margaret Lawrence Gallery, Melbourne" />
          <Entry year="2016" text="Can't Look, Can't Look Away, Counihan Gallery, Brunswick; Bus Projects Editions, Collingwood; Lots Of Nudes, LON Gallery, Collingwood; Re-visioning Histories, Bundoora Homestead Art Centre; West Space Fundraiser; In Concert, Gertrude Glasshouse; Be The Person Your Dog Thinks You Are, LON Gallery; Elastic Field, Strange Neighbour, Fitzroy" />
          <Entry year="2015" text="TCB Fundraiser, TCB art inc, Melbourne; Groupgrope, The Alderman, Brunswick" />
          <Entry year="2014" text={<><em>Faux Museum</em>, C3 Contemporary Artspace, Abbotsford; <em>Martin Kippenberger</em>, Neon Parc; <em>Loose Canon</em>, Artbank Gallery, Sydney; FIN, Utopian Slumps</>} />
          <Entry year="2013" text="Moreland Summer Show, Counihan Gallery; Gertrude Studios 2013, Gertrude Contemporary; Sub12, The Substation, Newport; Like Mike, Linden Centre for Contemporary Art; Guirguis New Art Prize, Art Gallery of Ballarat" />
          <Entry year="2012" text="Gertrude Studios 2012, Gertrude Contemporary; On The Y-Axis, First Draft, Sydney" />
          <Entry year="2011" text="Impossible Objects, Utopian Slumps; Thank you for the days: My Teenage Years, Lismore Regional Gallery" />
          <Entry year="2010" text="Dot Dot Dot, Lismore Regional Gallery; Dot Dot Dot, Pelaton, Sydney" />
          <Entry year="2009" text="Problem Solving: Espress Yourself, Uplands Gallery, Prahran" />
          <Entry year="2008" text="Home, Lismore Regional Gallery; Man Depicting Masculinity, Penrith Regional Gallery; Group Show, Mori Gallery, Sydney" />
          <Entry year="2006" text="Primavera 2006, Museum of Contemporary Art, Sydney; Big in Japan, Gallery Side 2, Tokyo; Single Currency, VCA Gallery, Melbourne" />
          <Entry year="2004" text="Real. Not Real, 5 Kent Street, Henley Beach, Adelaide" />
          <Entry year="2003" text="Unsigned Artists, Niagara Galleries, Melbourne" />
          <Entry year="2002" text="Fallout, VCA Gallery, Melbourne; Line Up, Mansour Gallery, Melbourne" />
        </Section>

        <Section title="Awards">
          <Entry year="2008" text="Metro 5 Award" />
          <Entry year="2003" text="Matthew Teleskivi Memorial Sculpture Prize" />
          <Entry year="2003" text="TCB VCA Graduate Award" />
        </Section>

        <Section title="Collections">
          <div style={{ fontFamily: SERIF, fontSize: 14, color: '#4a4a4a', lineHeight: 1.8 }}>
            Artbank, Sydney<br />
            Museum of Contemporary Art, Sydney<br />
            Epworth Hospital Collection<br />
            Private collections, Australia and overseas
          </div>
        </Section>

      </div>
      <Footer />
    </main>
  )
}
