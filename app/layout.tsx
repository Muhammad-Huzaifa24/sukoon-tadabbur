import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Amiri, Fraunces, Inter } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const amiri = Amiri({ subsets: ['arabic'], variable: '--font-amiri', weight: ['400', '700'], display: 'swap' })

export const metadata: Metadata = {
  title: 'sukoon — Small words. Deep roots.',
  description: 'Thoughtful reminders, intimate learning, and conversations for the parts of life that deserve your full attention.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f1e8',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${amiri.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}
