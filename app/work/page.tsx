import { Suspense } from 'react'
import { getAllWorks } from '@/sanity/lib/queries'
import Gallery from '../components/Gallery'

export const revalidate = 60

export default async function WorkPage() {
  const works = await getAllWorks()
  return (
    <Suspense>
      <Gallery works={works} />
    </Suspense>
  )
}
