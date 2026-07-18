import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/lib/data/services'

export const metadata: Metadata = {
  title: 'Services — Samruthi One | Working Capital, Trade Finance & More',
  description: "Explore Samruthi One's complete range of credit solutions including business loans, home loans, loan against property, and balance transfer.",
}

const MUTED = 'rgba(10,10,10,.62)'

export default function ServicesPage() {
  const categories = Array.from(new Set(SERVICES.map((s) => s.category)))

  return (
    <div className="page-enter max-w-[1200px] mx-auto px-5 sm:px-8 pt-20 pb-24">
      <p className="text-[12px] font-semibold tracking-[.12em] uppercase mb-4" style={{ color: '#E6B400' }}>
        Products &amp; Solutions
      </p>
      <h1 className="font-heading font-extrabold text-[38px] min-[901px]:text-[56px] mb-5" style={{ letterSpacing: '-.028em' }}>
        Credit for Every <span className="hl-mark">Stage of Growth</span>
      </h1>
      <p className="text-[16px] leading-[1.65] max-w-[640px] mb-16" style={{ color: MUTED }}>
        From revolving working capital lines to structured property loans — we source, structure, and facilitate the right product through 20+ lender partners.
      </p>

      {categories.map((category) => (
        <div key={category} className="mb-14">
          <div className="flex items-center gap-5 mb-2">
            <h2 className="font-heading font-extrabold text-[24px] whitespace-nowrap m-0" style={{ letterSpacing: '-.015em' }}>
              {category}
            </h2>
            <div className="flex-1 h-px" style={{ background: 'rgba(10,10,10,.1)' }} />
          </div>
          {SERVICES.filter((s) => s.category === category).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="grid items-center gap-4 min-[901px]:gap-8 px-4 py-[26px] cursor-pointer hover:bg-[#FAFAF9] transition-colors grid-cols-[1fr_auto] min-[901px]:grid-cols-[1.2fr_1.8fr_auto_auto]"
              style={{ borderBottom: '1px solid rgba(10,10,10,.08)' }}
            >
              <h3 className="font-heading font-bold text-[19px] m-0 col-span-2 min-[901px]:col-span-1">{s.name}</h3>
              <p className="text-[14.5px] leading-[1.5] m-0 col-span-2 min-[901px]:col-span-1" style={{ color: MUTED }}>{s.shortDesc}</p>
              <div className="text-right text-[13px] font-semibold whitespace-nowrap" style={{ color: '#E6B400' }}>
                {s.interestRate}
              </div>
              <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(10,10,10,.15)' }}>→</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
