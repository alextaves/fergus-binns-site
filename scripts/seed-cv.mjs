import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ijppbmn9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const cv = {
  _id: 'cv-singleton',
  _type: 'cv',
  bio: 'Born 1980, Lismore NSW, Australia. Lives and works in Melbourne.',
  education: [
    { _key: 'e1', year: '2000–02', text: 'Bachelor of Fine Art (Painting), Victorian College of the Arts, Melbourne' },
    { _key: 'e2', year: '1999', text: 'Art, Design and Photography Program, Elwood College, Elwood' },
  ],
  soloExhibitions: [
    { _key: 's1',  year: '2026', text: 'Ice Bear, Mary Cherry Contemporary, Collingwood' },
    { _key: 's2',  year: '2024', text: 'Notes to Citizen, Neon Parc, South Yarra' },
    { _key: 's3',  year: '2021', text: 'Memory Cleaner, Mary Cherry, Collingwood; Medicine Walls, TCB art inc, Brunswick' },
    { _key: 's4',  year: '2016', text: 'To the right music, the Diamond Will Orbit The Moth, Long Division Gallery, Collingwood' },
    { _key: 's5',  year: '2015', text: 'Possibly etc, TCB art inc, Melbourne' },
    { _key: 's6',  year: '2014', text: 'Spinifex Songs, Watch This Space, Alice Springs; Rarities, Scarities, Ruins and Ripe Fruit, Utopian Slumps, Melbourne' },
    { _key: 's7',  year: '2012', text: 'Ali Baba Squinting and The Watership Windband, Utopian Slumps, Melbourne' },
    { _key: 's8',  year: '2011', text: 'Toy Paintings, Uplands Gallery, Melbourne' },
    { _key: 's9',  year: '2010', text: 'Toy Paintings, Chalkhorse Gallery, Sydney' },
    { _key: 's10', year: '2009', text: 'In A Heartbeat (Minnie Expressions of a Distant Airshow), Inflight, Hobart' },
    { _key: 's11', year: '2008', text: 'Missing Bushwalkers On Found Landscapes, Uplands Gallery, Prahran; Work From Garage, Chalkhorse, Sydney' },
    { _key: 's12', year: '2007', text: 'The Wilderness, Uplands Gallery, Prahran; Fergus Binns, Chalk Horse, Sydney' },
    { _key: 's13', year: '2005', text: 'Fergus Binns, Uplands Gallery, Melbourne' },
    { _key: 's14', year: '2004', text: 'Paintings, TCB art inc, Melbourne' },
    { _key: 's15', year: '2003', text: 'Galerie Vege, TCB art inc, Melbourne' },
  ],
  groupExhibitions: [
    { _key: 'g1',  year: '2025', text: 'Summer Show, Kyneton Ridge Art Space, Kyneton' },
    { _key: 'g2',  year: '2023', text: 'Introduced Pieces, Kyneton Ridge Art Space, Kyneton' },
    { _key: 'g3',  year: '2022', text: 'Eddy, Minerva, Sydney' },
    { _key: 'g4',  year: '2021', text: "It's Raining In Sunshine, LON Gallery, Richmond" },
    { _key: 'g5',  year: '2018', text: 'Accession, Bundoora Homestead Art Centre, Bundoora' },
    { _key: 'g6',  year: '2017', text: 'Waves, Honeymoon Suite, Brunswick; Open House, True Estate, The Alderman Bar, Brunswick; 9 x 5, VCA Margaret Lawrence Gallery, Melbourne' },
    { _key: 'g7',  year: '2016', text: "Can't Look, Can't Look Away, Counihan Gallery, Brunswick; Bus Projects Editions, Collingwood; Lots Of Nudes, LON Gallery, Collingwood; Re-visioning Histories, Bundoora Homestead Art Centre; West Space Fundraiser; In Concert, Gertrude Glasshouse; Be The Person Your Dog Thinks You Are, LON Gallery; Elastic Field, Strange Neighbour, Fitzroy" },
    { _key: 'g8',  year: '2015', text: 'TCB Fundraiser, TCB art inc, Melbourne; Groupgrope, The Alderman, Brunswick' },
    { _key: 'g9',  year: '2014', text: 'Faux Museum, C3 Contemporary Artspace, Abbotsford; Martin Kippenberger, Neon Parc; Loose Canon, Artbank Gallery, Sydney; FIN, Utopian Slumps' },
    { _key: 'g10', year: '2013', text: 'Moreland Summer Show, Counihan Gallery; Gertrude Studios 2013, Gertrude Contemporary; Sub12, The Substation, Newport; Like Mike, Linden Centre for Contemporary Art; Guirguis New Art Prize, Art Gallery of Ballarat' },
    { _key: 'g11', year: '2012', text: 'Gertrude Studios 2012, Gertrude Contemporary; On The Y-Axis, First Draft, Sydney' },
    { _key: 'g12', year: '2011', text: 'Impossible Objects, Utopian Slumps; Thank you for the days: My Teenage Years, Lismore Regional Gallery' },
    { _key: 'g13', year: '2010', text: 'Dot Dot Dot, Lismore Regional Gallery; Dot Dot Dot, Pelaton, Sydney' },
    { _key: 'g14', year: '2009', text: 'Problem Solving: Espress Yourself, Uplands Gallery, Prahran' },
    { _key: 'g15', year: '2008', text: 'Home, Lismore Regional Gallery; Man Depicting Masculinity, Penrith Regional Gallery; Group Show, Mori Gallery, Sydney' },
    { _key: 'g16', year: '2006', text: 'Primavera 2006, Museum of Contemporary Art, Sydney; Big in Japan, Gallery Side 2, Tokyo; Single Currency, VCA Gallery, Melbourne' },
    { _key: 'g17', year: '2004', text: 'Real. Not Real, 5 Kent Street, Henley Beach, Adelaide' },
    { _key: 'g18', year: '2003', text: 'Unsigned Artists, Niagara Galleries, Melbourne' },
    { _key: 'g19', year: '2002', text: 'Fallout, VCA Gallery, Melbourne; Line Up, Mansour Gallery, Melbourne' },
  ],
  awards: [
    { _key: 'a1', year: '2008', text: 'Metro 5 Award' },
    { _key: 'a2', year: '2003', text: 'Matthew Teleskivi Memorial Sculpture Prize' },
    { _key: 'a3', year: '2003', text: 'TCB VCA Graduate Award' },
  ],
  collections: [
    'Artbank, Sydney',
    'Museum of Contemporary Art, Sydney',
    'Epworth Hospital Collection',
    'Private collections, Australia and overseas',
  ],
}

await client.createOrReplace(cv)
console.log('CV seeded to Sanity.')
