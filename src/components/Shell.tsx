'use client'
import { usePathname } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageLoader from '@/components/PageLoader'

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPortal = pathname.startsWith('/s1-portal')

  if (isPortal) return <>{children}</>

  return (
    <>
      <PageLoader />
      <Nav />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </>
  )
}
