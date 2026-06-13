import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import './globals.css'
import Providers from '@/components/Providers'
import Shell from '@/components/Shell'

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] })

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
    <html lang="en">
      <body className={`${inter.className} text-white antialiased min-h-screen flex flex-col relative`}>
        {/* Fixed Background — public site only */}
        <div className="fixed inset-0 z-[-1] [.s1-portal_&]:hidden">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-gray-950/95 to-gray-950" />
        </div>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  )
}
