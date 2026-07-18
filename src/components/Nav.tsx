'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/partners', label: 'Partners' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(247,200,60,.94)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,10,10,.12)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between">
        <Link href="/" className="flex items-center select-none">
          <Image
            src="/assets/logos/Logo.png"
            alt="Samruthi One"
            width={200}
            height={200}
            priority
            style={{ height: 28, width: 'auto', objectFit: 'contain', filter: 'brightness(0)' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden min-[901px]:flex items-center gap-8 text-[14px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className="py-1 transition-colors hover:text-ink"
              style={{
                color: isActive(link.href) ? '#0A0A0A' : 'rgba(10,10,10,.62)',
                boxShadow: isActive(link.href) ? 'inset 0 -2px 0 #F7C83C' : 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/enquiry"
            className="bg-ink text-white text-[13px] font-semibold px-6 py-[11px] rounded-full hover:bg-black transition-colors"
          >
            Let&apos;s Talk
          </Link>
          {/* Mobile burger */}
          <button
            className="hidden max-[900px]:flex p-2 text-[22px] leading-none bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="px-5 sm:px-8 pt-2 pb-5 flex flex-col gap-1 min-[901px]:hidden"
          style={{ borderTop: '1px solid rgba(10,10,10,.08)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium py-3 px-1"
              style={{ color: isActive(link.href) ? '#0A0A0A' : 'rgba(10,10,10,.62)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
