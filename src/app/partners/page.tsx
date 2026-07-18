import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lender Network — Samruthi One',
  description: 'Samruthi One works with 23+ banking and NBFC partners to get you competitive rates and faster loan approvals.'
}

const MUTED = 'rgba(10,10,10,.62)'

const BANKS: [string, string][] = [
  ['ICICI Bank', 'icici.png'], ['HDFC Bank', 'hdfc.png'], ['Kotak Mahindra', 'kotak.png'], ['Axis Bank', 'axis.png'],
  ['IndusInd Bank', 'indusind.png'], ['Standard Chartered', 'sc.png'], ['Yes Bank', 'yesbank.png'], ['Sundaram Finance', 'sundaramfinance.png'],
]
const NBFCS: [string, string][] = [
  ['Cholamandalam', 'chola.png'], ['Bajaj Finserv', 'bajaj.png'], ['Tata Capital', 'tatacapital.png'], ['L&T Finance', 'ltfinance.png'],
]

const PANELS = [
  { title: 'Competitive Rates', desc: 'Our multi-lender network gives us the leverage to benchmark offers and negotiate aggressive rate options that a single-bank applicant cannot match.' },
  { title: 'Faster Sanctions', desc: 'With direct integrations in promoter divisions, we skip standard queues and move applications through pre-assessed fast-tracked credit cycles.' },
  { title: 'Declined Elsewhere?', desc: 'A loan decline is usually just a lender mismatch. We restructure the financial model and align it with a partner whose risk appetite matches your profile.' },
]

function LogoGrid({ logos }: { logos: [string, string][] }) {
  return (
    <div className="grid grid-cols-2 min-[901px]:grid-cols-4 gap-3.5">
      {logos.map(([name, file]) => (
        <div
          key={file}
          className="rounded-[14px] h-24 flex items-center justify-center transition-colors hover:border-[rgba(10,10,10,.15)]"
          style={{ background: '#FAFAF9', border: '1px solid rgba(10,10,10,.06)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/assets/logos/${file}`} alt={name} style={{ maxHeight: 54, maxWidth: '72%', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.8 }} />
        </div>
      ))}
    </div>
  )
}

function SectionRule({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-5 mb-6">
      <h2 className="font-heading font-extrabold text-[22px] whitespace-nowrap m-0">{title}</h2>
      <div className="flex-1 h-px" style={{ background: 'rgba(10,10,10,.1)' }} />
    </div>
  )
}

export default function PartnersPage() {
  return (
    <div className="page-enter max-w-[1200px] mx-auto px-5 sm:px-8 pt-20 pb-24">
      <p className="text-[12px] font-semibold tracking-[.12em] uppercase mb-4" style={{ color: '#E6B400' }}>
        Our Synergy
      </p>
      <h1 className="font-heading font-extrabold text-[38px] min-[901px]:text-[56px] mb-5" style={{ letterSpacing: '-.028em' }}>
        Partners Who <span className="hl-mark">Deliver</span>
      </h1>
      <p className="text-[16px] leading-[1.65] max-w-[640px] mb-14" style={{ color: MUTED }}>
        By partnering with India&apos;s leading banking institutions and Fintech lenders, we negotiate terms, speed up approvals, and secure credit lines where others cannot.
      </p>

      <SectionRule title="Banking Partners" />
      <div className="mb-12">
        <LogoGrid logos={BANKS} />
      </div>

      <SectionRule title="NBFC Partners" />
      <div className="mb-16">
        <LogoGrid logos={NBFCS} />
      </div>

      <div className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-5">
        {PANELS.map((p) => (
          <div
            key={p.title}
            className="rounded-[16px] p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            style={{ border: '1px solid rgba(10,10,10,.08)' }}
          >
            <h3 className="font-heading font-bold text-[18px] mb-3">{p.title}</h3>
            <p className="text-[14px] leading-[1.65] m-0" style={{ color: MUTED }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
