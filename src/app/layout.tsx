import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import ThemeWrapper from '@/components/ThemeWrapper'

// Load fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SoftSell - Transform Unused Software Licenses into Cash',
  description: 'SoftSell helps businesses recover value from underutilized software investments with our secure, fast license resale platform.',
   icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' }
    ],
  },
  manifest: 'site.webmanifest',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  )
}