import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Icon Protertie Real Estate - Luxury Properties in Mallorca',
  description: 'Curated luxury villas, apartments, and commercial spaces in Mallorca. Discretion, speed, and white-glove service from start to keys.',
  keywords: 'luxury real estate, Mallorca properties, villas, apartments, commercial real estate',
  authors: [{ name: 'Lion Capital Real Estate' }],
  creator: 'Lion Capital Real Estate',
  publisher: 'Lion Capital Real Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lioncapitala.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'de-DE': '/de',
      'es-ES': '/es',
    },
  },
  openGraph: {
    title: 'Icon Properties Real Estate - Luxury Properties in Mallorca',
    description: 'Curated luxury villas, apartments, and commercial spaces in Mallorca. Discretion, speed, and white-glove service from start to keys.',
    url: 'https://lioncapitala.com',
    siteName: 'Icon Properties Real Estate',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lion Capital Real Estate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lion Capital Real Estate - Luxury Properties in Mallorca',
    description: 'Curated luxury villas, apartments, and commercial spaces in Mallorca.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        {children}
      </body>
    </html>
  )
}
