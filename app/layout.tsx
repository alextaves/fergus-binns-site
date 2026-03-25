import type { Metadata } from 'next'
import { EB_Garamond } from 'next/font/google'
import './globals.css'

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-garamond',
})

export const metadata: Metadata = {
  title: 'Fergus Binns',
  description: 'Paintings by Fergus Binns',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${garamond.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  )
}
