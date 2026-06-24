'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [indicatorReady, setIndicatorReady] = useState(false)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const navRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const activeIndex = navLinks.findIndex(l => l.href === pathname)
    const activeEl = linkRefs.current[activeIndex]
    const navEl = navRef.current
    if (activeEl && navEl) {
      const navRect = navEl.getBoundingClientRect()
      const linkRect = activeEl.getBoundingClientRect()
      setIndicatorStyle({ left: linkRect.left - navRect.left, width: linkRect.width })
      requestAnimationFrame(() => setIndicatorReady(true))
    }
  }, [pathname, mounted])

  const isActive = (href: string) => pathname === href

  return (
    <nav className={`sticky top-0 z-50 bg-gray-950/50 backdrop-blur-md border-b border-white/20 transition-all duration-300 ${mounted && scrolled ? 'shadow-lg' : ''}`}>
      <div className="w-full mx-auto px-4 lg:px-6">
        <div className="relative flex items-center justify-between h-20 w-full">

          {/* Logo anchor — PageLoader measures this to know where to fly the logo */}
          <div id="nav-logo-anchor" style={{ animationDelay: '2.0s' }} className="nav-logo-enter">
            <Logo />
          </div>

          {/* Desktop links */}
          <div ref={navRef} className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={el => { linkRefs.current[i] = el }}
                aria-current={isActive(link.href) ? 'page' : undefined}
                style={{ animationDelay: `${2.1 + i * 0.07}s` }}
                className={`nav-link-enter text-sm font-bold py-1 px-3 transition-colors duration-200 ${
                  isActive(link.href) ? 'text-[#F7C83C]' : 'text-white hover:text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {mounted && indicatorStyle.width > 0 && (
              <span
                className="absolute bottom-0 h-[2px] bg-[#F7C83C] rounded-full"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  transition: indicatorReady ? 'left 350ms cubic-bezier(0.4,0,0.2,1), width 350ms cubic-bezier(0.4,0,0.2,1)' : 'none',
                }}
              />
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:block" style={{ animationDelay: '2.3s' }}>
            <Link
              href="/enquiry"
              className="nav-link-enter bg-white/10 text-white border border-white/20 font-semibold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white focus:outline-none"
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
          <div id="mobile-menu" className="md:hidden border-t border-white/20 py-3 bg-gray-950/50 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-3 text-sm font-bold border-b border-white/20 ${
                  isActive(link.href) ? 'text-[#F7C83C] border-l-4 border-l-[#F7C83C] pl-3' : 'text-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/enquiry"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 mx-2 bg-[#F7C83C] text-center rounded-xl text-gray-900 font-semibold px-6 py-3 text-sm hover:bg-[#D4A832] transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
