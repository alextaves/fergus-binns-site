import { getAllWorks } from '@/sanity/lib/queries'
import Gallery from './components/Gallery'

export const revalidate = 60

export default async function Home() {
  const works = await getAllWorks()
  return <Gallery works={works} />
}
