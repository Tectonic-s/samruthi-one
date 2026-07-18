import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enquiry Received — Samruthi One',
  description: 'Thank you for your enquiry. Our team will contact you shortly.'
}

export default function ThankYouPage({ searchParams }: { searchParams: { ref?: string } }) {
  const ref = searchParams.ref ?? '—'

  return (
    <div className="page-enter max-w-[640px] mx-auto px-5 sm:px-8 pt-[120px] pb-[140px] text-center">
      <span
        className="w-[72px] h-[72px] rounded-full inline-flex items-center justify-center text-[30px] mb-8"
        style={{ background: '#F7C83C' }}
      >
        ✓
      </span>
      <h1 className="font-heading font-extrabold text-[36px] min-[901px]:text-[44px] mb-[18px]" style={{ letterSpacing: '-.025em' }}>
        Enquiry received
      </h1>
      <p className="text-[16px] leading-[1.7] mb-3" style={{ color: 'rgba(10,10,10,.62)' }}>
        A relationship manager will contact you within 2 business hours.
      </p>
      <p className="text-[14px] mb-11" style={{ color: 'rgba(10,10,10,.42)' }}>
        Reference: <strong className="font-mono text-ink">{ref}</strong>
      </p>
      <Link
        href="/"
        className="inline-flex bg-ink text-white font-semibold text-[14px] px-8 py-[15px] rounded-full hover:bg-black transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
