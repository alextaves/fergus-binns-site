import { getHomepageSettings, getHomepageWork, getMobileHomepageWork, getYears } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import HomepageClient from './components/HomepageClient'

export const revalidate = 60

export default async function Home() {
  const [settings, fallbackDesktop, fallbackMobile, years] = await Promise.all([
    getHomepageSettings(),
    getHomepageWork(),
    getMobileHomepageWork(),
    getYears(),
  ])

  const desktopWork = settings?.landscapeWork ?? fallbackDesktop
  const mobileWork = settings?.portraitWork ?? fallbackMobile

  const imageUrl = desktopWork?.image ? urlFor(desktopWork.image).width(2400).fit('max').url() : null
  const mobileImageUrl = mobileWork?.image ? urlFor(mobileWork.image).width(1200).fit('max').url() : null

  return (
    <HomepageClient
      imageUrl={imageUrl ?? ''}
      mobileImageUrl={mobileImageUrl ?? imageUrl ?? ''}
      year={desktopWork?.year ?? ''}
      years={years}
    />
  )
}
