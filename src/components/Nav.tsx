'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/partners', label: 'Partners' },
  { href: '/about', label: 'About' },
  { href: '/enquiry', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${mounted && scrolled ? 'shadow-md border-b border-gray-200' : 'border-b border-gray-100'}`}>
      <div className="w-full mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">

          <Logo variant="dark" />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`text-sm transition-all relative py-1 ${
                  isActive(link.href)
                    ? 'text-gray-900 font-bold'
                    : 'text-gray-600 font-medium hover:text-gray-900'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 bg-[#FFC800] rounded-full -translate-x-1/2" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/enquiry"
              className="bg-[#FFC800] text-gray-900 font-semibold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-[#E6B400] transition-colors"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-gray-100 py-3 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-3 text-sm font-medium border-b border-gray-100 ${
                  isActive(link.href) ? 'text-gray-900 font-bold' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/enquiry"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 mx-2 bg-[#FFC800] text-center rounded-full text-gray-900 font-semibold px-6 py-3 text-sm hover:bg-[#E6B400] transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
