import { SERVICES, getServiceBySlug } from '@/lib/data/services'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/data/content'

interface Props {
  params: { slug: string }
}

const HAIR = '1px solid rgba(10,10,10,.08)'
const MUTED = 'rgba(10,10,10,.62)'
const FAINT = 'rgba(10,10,10,.42)'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getServiceBySlug(params.slug)
  return {
    title: s ? `${s.name} — Samruthi One` : 'Not Found',
    description: s ? s.shortDesc : 'Service details page.',
  }
}

function BulletList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <div key={item} className="flex gap-2.5 text-[14px] leading-[1.5] py-[5px]" style={{ color: MUTED }}>
          <span className="font-bold" style={{ color: '#F7C83C' }}>•</span>
          <span>{item}</span>
        </div>
      ))}
    </>
  )
}

export default function ServicePage({ params }: Props) {
  const s = getServiceBySlug(params.slug)
  if (!s) notFound()

  return (
    <div className="page-enter max-w-[1200px] mx-auto px-5 sm:px-8 pt-16 pb-24">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-[14px] font-medium mb-12 hover:text-ink transition-colors"
        style={{ color: MUTED }}
      >
        ← All Services
      </Link>

      {/* Header */}
      <div className="pb-11 mb-14" style={{ borderBottom: HAIR }}>
        <p className="text-[12px] font-semibold tracking-[.12em] uppercase mb-4" style={{ color: '#E6B400' }}>
          {s.category}
        </p>
        <h1 className="font-heading font-extrabold text-[38px] min-[901px]:text-[52px] mb-[18px]" style={{ letterSpacing: '-.028em' }}>
          {s.name}
        </h1>
        <p className="text-[18px] leading-[1.6] max-w-[640px] m-0" style={{ color: MUTED }}>{s.shortDesc}</p>
      </div>

      <div className="grid grid-cols-1 min-[901px]:grid-cols-[2fr_1fr] gap-12 items-start">
        {/* Main */}
        <div>
          <h2 className="font-heading font-bold text-[22px] mb-3.5">About this facility</h2>
          <p className="text-[15px] leading-[1.75] mb-10" style={{ color: MUTED }}>{s.fullDesc}</p>

          <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-5 mb-10">
            <div className="rounded-[16px] p-7" style={{ border: HAIR }}>
              <h3 className="text-[12px] font-semibold tracking-[.1em] uppercase mb-[18px]" style={{ color: '#E6B400' }}>
                Eligibility Criteria
              </h3>
              <BulletList items={s.eligibility} />
            </div>
            <div className="rounded-[16px] p-7" style={{ border: HAIR }}>
              <h3 className="text-[12px] font-semibold tracking-[.1em] uppercase mb-[18px]" style={{ color: '#E6B400' }}>
                Documents Required
              </h3>
              <BulletList items={s.documents} />
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ borderTop: HAIR, borderBottom: HAIR }}>
            <div className="p-8 text-center" style={{ borderRight: HAIR }}>
              <p className="text-[11px] font-semibold tracking-[.1em] uppercase mb-2" style={{ color: FAINT }}>Loan Range</p>
              <p className="font-heading font-extrabold text-[26px] m-0">{s.loanRange}</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-[11px] font-semibold tracking-[.1em] uppercase mb-2" style={{ color: FAINT }}>Processing Time</p>
              <p className="font-heading font-extrabold text-[26px] m-0">{s.processingTime}</p>
            </div>
          </div>
        </div>

        {/* Sticky sidebar */}
        <div className="flex flex-col gap-5 min-[901px]:sticky min-[901px]:top-[108px]">
          <div className="rounded-[16px] p-7 shadow-card" style={{ border: HAIR }}>
            <h3 className="font-heading font-bold text-[19px] mb-2">Interested?</h3>
            <p className="text-[13.5px] leading-[1.6] mb-[22px]" style={{ color: MUTED }}>
              A relationship manager will evaluate your case and respond within 2 business hours.
            </p>
            <Link
              href={`/enquiry?facility=${encodeURIComponent(s.name)}`}
              className="block text-center text-ink font-bold text-[14px] py-[15px] rounded-full transition-colors hover:bg-gold-hover"
              style={{ background: '#F7C83C' }}
            >
              Begin Enquiry
            </Link>
          </div>

          <div className="rounded-[16px] p-7" style={{ background: '#F5F5F3' }}>
            <h4 className="text-[12px] font-semibold tracking-[.1em] uppercase mb-[18px]" style={{ color: '#E6B400' }}>
              Assistance
            </h4>
            <p className="text-[11px] tracking-[.1em] uppercase mb-[3px]" style={{ color: FAINT }}>Phone</p>
            <p className="text-[14px] font-semibold mb-4">{SITE_CONFIG.company.phone}</p>
            <p className="text-[11px] tracking-[.1em] uppercase mb-[3px]" style={{ color: FAINT }}>Email</p>
            <p className="text-[14px] font-semibold mb-4">{SITE_CONFIG.company.email}</p>
            <p className="text-[11px] tracking-[.1em] uppercase mb-[3px]" style={{ color: FAINT }}>Hours</p>
            <p className="text-[14px] font-semibold m-0">{SITE_CONFIG.company.hours}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
