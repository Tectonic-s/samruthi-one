import type { Metadata } from 'next'
import EnquiryForm from '@/components/EnquiryForm'
import { SITE_CONFIG } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Enquiry — Samruthi One',
  description: 'Submit your financing requirement and a relationship manager will contact you within 2 business hours.'
}

interface Props {
  searchParams: { facility?: string }
}

const MUTED = 'rgba(10,10,10,.62)'
const FAINT = 'rgba(10,10,10,.42)'

function ContactRow({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[.12em] uppercase mb-[5px]" style={{ color: FAINT }}>{label}</p>
      <p className="text-[16px] font-semibold m-0">{value}</p>
      <p className="text-[13px] mt-[3px] m-0" style={{ color: FAINT }}>{sub}</p>
    </div>
  )
}

export default function EnquiryPage({ searchParams }: Props) {
  return (
    <div className="page-enter max-w-[1200px] mx-auto px-5 sm:px-8 pt-20 pb-24">
      <div className="grid grid-cols-1 min-[901px]:grid-cols-[5fr_7fr] gap-14 items-start">

        {/* Left — contact info */}
        <div>
          <p className="text-[12px] font-semibold tracking-[.12em] uppercase mb-4" style={{ color: '#E6B400' }}>
            Get In Touch
          </p>
          <h1 className="font-heading font-extrabold text-[34px] min-[901px]:text-[42px] leading-[1.1] mb-[18px]" style={{ letterSpacing: '-.025em' }}>
            Let&apos;s Find the Right <span className="hl-mark">Capital Structure</span>
          </h1>
          <p className="text-[15px] leading-[1.7] mb-10" style={{ color: MUTED }}>
            Fill in the details of your financing requirement and a specialized advisor will contact you within 2 business hours.
          </p>
          <div className="h-px mb-9" style={{ background: 'rgba(10,10,10,.08)' }} />
          <div className="flex flex-col gap-[26px]">
            <ContactRow label="Phone" value={SITE_CONFIG.company.phone} sub={SITE_CONFIG.company.hours} />
            <ContactRow label="Email" value={SITE_CONFIG.company.email} sub="Prompt response within 2 hours" />
            <ContactRow label="Chennai HQ" value={`${SITE_CONFIG.company.address.area1}, ${SITE_CONFIG.company.address.city1}`} sub={`Pincode: ${SITE_CONFIG.company.address.pincode1}`} />
            <ContactRow label="Coimbatore Branch" value={`${SITE_CONFIG.company.address.area2}, ${SITE_CONFIG.company.address.city2}`} sub={`Pincode: ${SITE_CONFIG.company.address.pincode2}`} />
          </div>
        </div>

        {/* Right — form card */}
        <div className="rounded-[16px] p-7 sm:p-11 shadow-card" style={{ border: '1px solid rgba(10,10,10,.08)' }}>
          <h2 className="font-heading font-bold text-[24px] mb-1.5">Begin your enquiry</h2>
          <p className="text-[13px] mb-8" style={{ color: FAINT }}>Fields marked with asterisk (*) are required.</p>
          <EnquiryForm defaultFacility={searchParams.facility ?? ''} />
        </div>

      </div>
    </div>
  )
}
