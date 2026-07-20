import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/data/content'
import { SERVICES } from '@/lib/data/services'
import ScrollStory from '@/components/ScrollStory'

export const metadata: Metadata = {
  title: 'Samruthi One — Financing Simplified | Business Loans & Working Capital',
  description: 'Access 23+ banking and NBFC partners for working capital, trade finance, and property loans. RBI-registered Fintech with 91% approval rate.',
}

const HAIR = '1px solid rgba(10,10,10,.08)'
const MUTED = 'rgba(10,10,10,.62)'

const BANK_LOGOS = [
  ['ICICI Bank', 'icici.png'], ['HDFC Bank', 'hdfc.png'], ['Kotak Mahindra', 'kotak.png'], ['Axis Bank', 'axis.png'],
  ['IndusInd Bank', 'indusind.png'], ['Standard Chartered', 'sc.png'], ['Yes Bank', 'yesbank.png'], ['Sundaram Finance', 'sundaramfinance.png'],
  ['Cholamandalam', 'chola.png'], ['Bajaj Finserv', 'bajaj.png'], ['Tata Capital', 'tatacapital.png'], ['L&T Finance', 'ltfinance.png'],
]

const WHY = [
  { n: '01', title: 'Multi-bank Access', desc: 'Direct relationships with 20+ lenders to match your profile and secure the best terms — not just the first offer.' },
  { n: '02', title: 'End-to-End Support', desc: 'From document preparation to final disbursement, a dedicated relationship manager handles the entire process.' },
  { n: '03', title: 'Sector Expertise', desc: 'Deep understanding of textiles, pharma, real estate, manufacturing, and trading credit cycles.' },
  { n: '04', title: 'Transparent Fees', desc: 'Success-based only. Fees disclosed upfront before engagement. No hidden charges, ever.' },
]

export default function HomePage() {
  const marquee = [...BANK_LOGOS, ...BANK_LOGOS]

  return (
    <div>
      {/* ─── Scroll story: How it works ─── */}
      <ScrollStory />

      {/* ─── Hero (revealed by the story's final beat) ─── */}
      <div id="home-hero" className="text-center max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-12 min-[701px]:pt-[88px] min-[701px]:pb-[72px]">
        <p className="text-[14px] font-semibold mb-8">RBI Registered Fintech · Since {SITE_CONFIG.company.founded}</p>
        <h1
          className="font-heading font-extrabold mx-auto mb-9 max-w-[980px]"
          style={{ fontSize: 'clamp(48px,7vw,84px)', lineHeight: 1.04, letterSpacing: '-.03em' }}
        >
          Where <span className="hl-mark">Opportunity</span> Meets the <span className="hl-mark">Right Funding</span>
        </h1>
        <p className="text-[19px] leading-[1.6] mx-auto mb-12 max-w-[560px]" style={{ color: MUTED }}>
          Working capital, trade finance, and property loans — placed with the right lender out of 23+ banking partners.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Link
            href="/enquiry"
            className="inline-flex items-center gap-2.5 bg-ink text-white font-semibold text-[15px] px-[34px] py-4 rounded-full hover:bg-black hover:-translate-y-0.5 transition-all duration-200"
          >
            Let&apos;s Talk Funding →
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center bg-white text-ink font-semibold text-[15px] px-8 py-4 rounded-full transition-colors duration-200 border border-[rgba(10,10,10,.12)] hover:border-[rgba(10,10,10,.3)]"
          >
            Explore Solutions
          </Link>
        </div>
      </div>

      {/* ─── Logo marquee ─── */}
      <div
        className="overflow-hidden py-7"
        style={{
          borderTop: HAIR,
          borderBottom: HAIR,
          maskImage: 'linear-gradient(to right,transparent,black 15%,black 85%,transparent)',
          WebkitMaskImage: 'linear-gradient(to right,transparent,black 15%,black 85%,transparent)',
        }}
      >
        <div className="flex w-max items-center gap-[72px]" style={{ animation: 'marquee 40s linear infinite' }}>
          {marquee.map(([name, file], i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${file}-${i}`}
              src={`/assets/logos/${file}`}
              alt={i < BANK_LOGOS.length ? name : ''}
              aria-hidden={i >= BANK_LOGOS.length || undefined}
              style={{ height: 48, objectFit: 'contain' }}
            />
          ))}
        </div>
      </div>

      {/* ─── Stats band ─── */}
      <div className="px-5 sm:px-8 py-[72px]" style={{ background: 'rgba(247,200,60,.12)' }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-y-9 min-[901px]:grid-cols-4 min-[901px]:gap-y-0">
          {SITE_CONFIG.stats.map((st, i) => (
            <div
              key={st.label}
              className={`text-center ${i < 3 ? 'min-[901px]:border-r min-[901px]:border-[rgba(10,10,10,.1)]' : ''}`}
            >
              <div className="font-heading font-extrabold text-[40px] min-[901px]:text-[56px]" style={{ letterSpacing: '-.03em' }}>
                {st.number}
              </div>
              <div className="text-[12px] font-semibold tracking-[.1em] uppercase mt-2.5" style={{ color: 'rgba(10,10,10,.55)' }}>
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── What we finance ─── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-[88px]">
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-heading font-extrabold text-[32px] min-[901px]:text-[44px] m-0" style={{ letterSpacing: '-.025em' }}>
            What we finance
          </h2>
          <Link href="/services" className="text-[14px] font-semibold hover:text-ink transition-colors" style={{ color: MUTED }}>
            All 11 services →
          </Link>
        </div>
        <div className="flex flex-col">
          {SERVICES.slice(0, 6).map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="grid items-center gap-4 min-[901px]:gap-8 px-4 py-[30px] cursor-pointer hover:bg-[#FAFAF9] transition-colors grid-cols-[auto_1fr] min-[901px]:grid-cols-[80px_1.2fr_1.6fr_auto]"
              style={{ borderTop: '1px solid rgba(10,10,10,.1)' }}
            >
              <span className="font-heading font-extrabold text-[15px]" style={{ color: '#E6B400' }}>0{i + 1}</span>
              <h3 className="font-heading font-bold text-[22px] m-0">{s.name}</h3>
              <p className="col-span-2 min-[901px]:col-span-1 text-[15px] leading-[1.5] m-0" style={{ color: MUTED }}>{s.shortDesc}</p>
              <div className="col-span-2 min-[901px]:col-span-1 flex items-center gap-6 text-[13.5px] font-medium" style={{ color: 'rgba(10,10,10,.42)' }}>
                <span>{s.loanRange}</span>
                <span className="w-9 h-9 rounded-full flex items-center justify-center text-ink" style={{ border: '1px solid rgba(10,10,10,.15)' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Why Samruthi ─── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-[88px]">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-16 pt-[72px]" style={{ borderTop: HAIR }}>
          <div>
            <span className="text-[12px] font-semibold tracking-[.12em] uppercase block mb-3.5" style={{ color: '#E6B400' }}>
              Why Samruthi
            </span>
            <h2 className="font-heading font-extrabold text-[32px] min-[901px]:text-[36px] mb-6 max-w-[400px]" style={{ letterSpacing: '-.02em' }}>
              Advisory that works for you, not the lender
            </h2>
            <p className="text-[15px] leading-[1.7] max-w-[420px] m-0" style={{ color: MUTED }}>
              A single bank offers its own products and risk appetite. We benchmark across 23+ partners and negotiate on your side of the table.
            </p>
          </div>
          <div className="flex flex-col">
            {WHY.map((w) => (
              <div key={w.n} className="flex gap-5 py-[22px]" style={{ borderBottom: HAIR }}>
                <span className="font-heading font-extrabold text-[13px] pt-[3px]" style={{ color: '#E6B400' }}>{w.n}</span>
                <div>
                  <h3 className="font-heading font-bold text-[16px] mb-1.5 m-0">{w.title}</h3>
                  <p className="text-[14px] leading-[1.6] m-0" style={{ color: MUTED }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Testimonial pull-quote ─── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-24 text-center">
        <span className="font-heading text-[64px] font-extrabold block mb-2 leading-none" style={{ color: '#F7C83C' }}>&ldquo;</span>
        <p className="font-heading font-bold text-[24px] min-[901px]:text-[30px] leading-[1.45] max-w-[840px] mx-auto mb-8" style={{ letterSpacing: '-.015em' }}>
          We had been declined by two banks before Samruthi One took our case. Within three weeks we had a CC limit sanctioned.
        </p>
        <div className="text-[14px]" style={{ color: 'rgba(10,10,10,.55)' }}>
          <strong>Sunita Patel</strong> · Proprietor, Pharma Distributor · Coimbatore
        </div>
      </div>

      {/* ─── CTA band ─── */}
      <div className="text-center px-5 sm:px-8 py-[88px]" style={{ borderTop: HAIR }}>
        <span className="text-[12px] font-semibold tracking-[.12em] uppercase block mb-4" style={{ color: '#E6B400' }}>
          Start Today
        </span>
        <h2 className="font-heading font-extrabold text-[32px] min-[901px]:text-[48px] mb-5" style={{ letterSpacing: '-.025em' }}>
          Ready to access the right credit?
        </h2>
        <p className="text-[16px] mx-auto mb-10 max-w-[480px] leading-[1.6]" style={{ color: MUTED }}>
          Share your requirement and a relationship manager will respond within 2 business hours.
        </p>
        <Link
          href="/enquiry"
          className="inline-flex items-center gap-2.5 font-bold text-[16px] px-10 py-[18px] rounded-full text-ink hover:-translate-y-0.5 transition-all duration-200"
          style={{ background: '#F7C83C', boxShadow: '0 6px 16px rgba(230,180,0,.25)' }}
        >
          Submit Enquiry →
        </Link>
      </div>
    </div>
  )
}
