import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/data/content'
import { SERVICES } from '@/lib/data/services'

const HAIR = '1px solid rgba(10,10,10,.08)'

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ background: '#F5F5F3' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-[72px] pb-10">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">

          {/* Brand */}
          <div>
            <Image
              src="/assets/logos/Logo.png"
              alt="Samruthi One"
              width={160}
              height={160}
              style={{ height: 30, width: 'auto', filter: 'brightness(0)', marginBottom: 22 }}
            />
            <p className="text-[14px] leading-[1.7] max-w-[300px] mb-[18px]" style={{ color: 'rgba(10,10,10,.62)' }}>
              RBI-registered financial advisory providing working capital, trade finance, and property loans with multi-bank access for businesses across India.
            </p>
            <p className="text-[12px] font-medium tracking-[.03em]" style={{ color: '#E6B400' }}>
              CIN: {SITE_CONFIG.company.cin}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-[.1em] uppercase mb-5" style={{ color: '#E6B400' }}>
              Services
            </h4>
            <div className="flex flex-col gap-3 text-[14px]">
              {SERVICES.slice(0, 4).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="hover:text-ink transition-colors" style={{ color: 'rgba(10,10,10,.62)' }}>
                  {s.name}
                </Link>
              ))}
              <Link href="/services" className="font-medium text-[13px] text-ink hover:text-gold-hover transition-colors">
                View all services →
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-[.1em] uppercase mb-5" style={{ color: '#E6B400' }}>
              Company
            </h4>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link href="/about" className="hover:text-ink transition-colors" style={{ color: 'rgba(10,10,10,.62)' }}>About Us</Link>
              <Link href="/partners" className="hover:text-ink transition-colors" style={{ color: 'rgba(10,10,10,.62)' }}>Lender Network</Link>
              <Link href="/enquiry" className="hover:text-ink transition-colors" style={{ color: 'rgba(10,10,10,.62)' }}>Contact</Link>
            </div>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-[.1em] uppercase mb-5" style={{ color: '#E6B400' }}>
              Offices
            </h4>
            <p className="text-[13px] font-semibold mb-0.5">
              {SITE_CONFIG.company.address.city1} <span className="font-normal" style={{ color: 'rgba(10,10,10,.42)' }}>(HQ)</span>
            </p>
            <p className="text-[13px] mb-4" style={{ color: 'rgba(10,10,10,.42)' }}>
              {SITE_CONFIG.company.address.area1} · {SITE_CONFIG.company.address.pincode1}
            </p>
            <p className="text-[13px] font-semibold mb-0.5">{SITE_CONFIG.company.address.city2}</p>
            <p className="text-[13px]" style={{ color: 'rgba(10,10,10,.42)' }}>
              {SITE_CONFIG.company.address.area2} · {SITE_CONFIG.company.address.pincode2}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-[13px]" style={{ borderTop: HAIR, color: 'rgba(10,10,10,.42)' }}>
          <span>© {new Date().getFullYear()} SamruthiOne. All rights reserved.</span>
          <span>
            <Link href="/privacy" className="hover:text-ink transition-colors" style={{ color: 'inherit' }}>Privacy Policy</Link>
            {' · '}
            <Link href="/terms" className="hover:text-ink transition-colors" style={{ color: 'inherit' }}>Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
