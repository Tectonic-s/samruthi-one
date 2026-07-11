import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import bgImage from '../../public/logos/bg.jpg'
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
        <div className="fixed inset-0 z-[-1]">
          <Image
            src={bgImage}
            alt="Samruthi One Corporate Background"
            placeholder="blur"
            quality={90}
            priority
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  )
}
