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
    <nav className={`sticky top-0 z-50 bg-[#F7C83C] border-b border-black/10 transition-all duration-300 ${mounted && scrolled ? 'shadow-md' : ''}`}>
      <div className="w-full mx-auto px-4 lg:px-6">
        <div className="relative flex items-center justify-between h-20 w-full">

          <Logo />

          {/* Desktop links - absolutely centred to the full nav width */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`text-sm font-bold transition-all relative py-1 ${
                  isActive(link.href)
                    ? 'text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black after:rounded-full'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/enquiry"
              className="bg-black text-[#F7C83C] font-semibold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-black/80 transition-colors"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-black focus:outline-none"
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
          <div id="mobile-menu" className="md:hidden border-t border-black/10 py-3 bg-[#F7C83C]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-3 text-sm font-bold border-b border-black/10 ${
                  isActive(link.href) ? 'text-black font-bold border-l-4 border-l-black pl-3' : 'text-black/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/enquiry"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 mx-2 bg-black text-center rounded-xl text-[#F7C83C] font-semibold px-6 py-3 text-sm hover:bg-black/80 transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
