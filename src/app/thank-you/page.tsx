import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { 
  title: 'Enquiry Received — Samruthi One',
  description: 'Thank you for your enquiry. Our team will contact you shortly.'
}

export default function ThankYouPage({ searchParams }: { searchParams: { ref?: string } }) {
  const ref = searchParams.ref ?? '—'
  
  return (
    <div className="py-16 sm:py-24 relative z-10 flex-grow flex items-center">
      <div className="max-w-xl mx-auto px-4 w-full">
        <div className="bg-gray-950/50 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/20 shadow-2xl text-center">
          
          {/* Checkmark icon with yellow backglow */}
          <div className="w-16 h-16 rounded-full bg-[#F7C83C] text-gray-900 font-extrabold flex items-center justify-center text-3xl mx-auto mb-6 shadow-[0_0_20px_rgba(255,193,7,0.3)]">
            ✓
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Enquiry Received
          </h1>
          
          <p className="text-sm text-gray-300 leading-relaxed mb-8">
            Thank you for reaching out. A relationship manager will evaluate your business profile and contact you within 2 business hours.
          </p>

          {/* Reference ID card block */}
          <div className="bg-gray-900/40 border border-white/20 rounded-2xl p-6 mb-8 inline-block w-full max-w-sm">
            <p className="text-[0.62rem] font-bold tracking-widest uppercase text-gray-500 mb-2">
              Reference ID
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-widest">
              {ref}
            </p>
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#F7C83C] text-gray-900 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-[#D4A832] transition-colors shadow-md text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/services"
              className="border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-colors shadow-md text-center"
            >
              Explore Services &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
