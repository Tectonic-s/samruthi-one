import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Shell from '@/components/Shell'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Samruthi One — Financing Simplified',
  description:
    'Samruthi One is an RBI-registered Fintech providing working capital, trade finance, and property loans with multi-bank access for businesses across India.',
  keywords: 'NBFC, business loan, working capital, cash credit, loan against property, Chennai, Coimbatore',
  openGraph: {
    title: 'Samruthi One — Financing Simplified',
    description: 'Multi-bank access. Structured solutions. Faster approvals.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-body min-h-screen flex flex-col bg-white">
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  )
}
