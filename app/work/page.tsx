import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllWorks } from '@/sanity/lib/queries'
import Gallery from '../components/Gallery'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Browse paintings by Fergus Binns, organised by year.',
  alternates: { canonical: '/work' },
}

export const revalidate = 60

export default async function WorkPage() {
  const works = await getAllWorks()
  return (
    <Suspense>
      <Gallery works={works} />
    </Suspense>
  )
}
