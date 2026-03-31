import { getHomepageWork, getMobileHomepageWork, getYears } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import HomepageClient from './components/HomepageClient'

export const revalidate = 60

export default async function Home() {
  const [work, mobileWork, years] = await Promise.all([
    getHomepageWork(),
    getMobileHomepageWork(),
    getYears(),
  ])

  const imageUrl = work?.image ? urlFor(work.image).width(2400).fit('max').url() : null
  const mobileImageUrl = mobileWork?.image ? urlFor(mobileWork.image).width(1200).fit('max').url() : null

  return (
    <HomepageClient
      imageUrl={imageUrl ?? ''}
      mobileImageUrl={mobileImageUrl ?? imageUrl ?? ''}
      year={work?.year ?? ''}
      years={years}
    />
  )
}
