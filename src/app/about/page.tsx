import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'About — Samruthi One',
  description: 'Learn about Samruthi One, our mission, core values, and our structured finance team.'
}

const HAIR = '1px solid rgba(10,10,10,.08)'
const MUTED = 'rgba(10,10,10,.62)'

const VALUES = [
  { title: 'Multi-bank Access', desc: 'Direct relationships with 20+ lenders to match your profile and get the best terms.' },
  { title: 'End-to-End Support', desc: 'From document preparation to final disbursement — we manage the entire process.' },
  { title: 'Sector Expertise', desc: 'Deep understanding of textiles, pharma, real estate, manufacturing, and trading.' },
  { title: 'Transparent Fees', desc: 'Success-based only. Fee disclosed upfront before engagement. No hidden charges.' },
]

const TEAM = [
  { initials: 'SK', name: 'S. Krishnamurthy', role: 'Founder & Managing Director', exp: '18 years in banking and credit' },
  { initials: 'PR', name: 'P. Raghunathan', role: 'Head — Structured Finance', exp: 'Ex-ICICI Bank · 14 years' },
  { initials: 'AM', name: 'A. Meenakshi', role: 'Head — Client Relations', exp: 'MSME specialist · 10 years' },
]

export default function AboutPage() {
  return (
    <div className="page-enter max-w-[1200px] mx-auto px-5 sm:px-8 pt-20 pb-24">
      {/* Header */}
      <div className="pb-11 mb-14" style={{ borderBottom: HAIR }}>
        <p className="text-[12px] font-semibold tracking-[.12em] uppercase mb-4" style={{ color: '#E6B400' }}>
          About Us
        </p>
        <h1 className="font-heading font-extrabold text-[38px] min-[901px]:text-[56px] m-0" style={{ letterSpacing: '-.028em' }}>
          Built on <span className="hl-mark">Trust</span>, Driven by Results
        </h1>
      </div>

      <div className="grid grid-cols-1 min-[901px]:grid-cols-[1fr_2fr] gap-12 items-start">
        {/* Stat card */}
        <div className="rounded-[16px] text-center px-9 py-12" style={{ background: '#F5F5F3' }}>
          <p className="font-heading font-extrabold text-[64px] mb-1.5 m-0 leading-none">3+</p>
          <p className="text-[11px] font-semibold tracking-[.12em] uppercase mb-6 mt-2" style={{ color: '#E6B400' }}>
            Years of Excellence
          </p>
          <div className="h-px w-24 mx-auto mb-6" style={{ background: 'rgba(10,10,10,.1)' }} />
          <p className="text-[14px] leading-[1.7] m-0" style={{ color: MUTED }}>
            Structured financing solutions built specifically for MSMEs and growing corporate entities across South India.
          </p>
        </div>

        {/* Body */}
        <div>
          <p className="text-[16px] leading-[1.75] mb-[22px]" style={{ color: MUTED }}>
            Samruthi One was founded in {SITE_CONFIG.company.founded} with a clear mandate: to democratize financial consulting and credit procurement for growing businesses. We provide middle-market enterprises and MSMEs with high-quality capital structuring advisory that was historically reserved for much larger corporate firms.
          </p>
          <p className="text-[16px] leading-[1.75] mb-12" style={{ color: MUTED }}>
            We manage the entire financing pipeline — mapping multi-lender credit criteria, formulating credit narratives, optimizing interest spreads, and coordinating legal and operational diligence to facilitate faster closures. Our success-fee policy ensures that our goals align exactly with yours.
          </p>

          <h2 className="text-[12px] font-semibold tracking-[.12em] uppercase mb-6" style={{ color: '#E6B400' }}>
            Our Core Strengths
          </h2>
          <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-5 mb-14">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-[16px] p-[26px] hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
                style={{ border: HAIR }}
              >
                <h3 className="font-heading font-bold text-[16px] mb-2">{v.title}</h3>
                <p className="text-[14px] leading-[1.6] m-0" style={{ color: MUTED }}>{v.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-[12px] font-semibold tracking-[.12em] uppercase mb-2" style={{ color: '#E6B400' }}>
            Leadership Team
          </h2>
          <div style={{ borderTop: HAIR }}>
            {TEAM.map((m) => (
              <div key={m.name} className="flex items-center gap-5 py-6" style={{ borderBottom: HAIR }}>
                <span
                  className="w-12 h-12 rounded-full font-heading font-bold text-[14px] flex items-center justify-center flex-none"
                  style={{ background: 'rgba(247,200,60,.2)' }}
                >
                  {m.initials}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-[16px] m-0">{m.name}</h4>
                  <p className="text-[13px] font-medium mt-[3px] mb-[2px]" style={{ color: '#E6B400' }}>{m.role}</p>
                  <p className="text-[13px] m-0" style={{ color: 'rgba(10,10,10,.42)' }}>{m.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
