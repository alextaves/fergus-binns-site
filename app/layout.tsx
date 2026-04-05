import type { Metadata } from 'next'
import { EB_Garamond } from 'next/font/google'
import './globals.css'

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-garamond',
})

export const metadata: Metadata = {
  title: {
    default: 'Fergus Binns | Painter',
    template: '%s | Fergus Binns',
  },
  description: 'Fergus Binns is a contemporary painter. View his paintings, exhibitions, and contact the artist.',
  keywords: ['Fergus Binns', 'painter', 'contemporary painting', 'fine art', 'oil painting', 'artist'],
  authors: [{ name: 'Fergus Binns', url: 'https://fergusbinns.com' }],
  creator: 'Fergus Binns',
  metadataBase: new URL('https://fergusbinns.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://fergusbinns.com',
    siteName: 'Fergus Binns',
    title: 'Fergus Binns | Painter',
    description: 'Fergus Binns is a contemporary painter. View his paintings, exhibitions, and contact the artist.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fergus Binns — Painter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fergus Binns | Painter',
    description: 'Fergus Binns is a contemporary painter. View his paintings, exhibitions, and contact the artist.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fergus Binns',
  url: 'https://fergusbinns.com',
  jobTitle: 'Painter',
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${garamond.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
