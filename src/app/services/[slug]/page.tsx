import { SERVICES, getServiceBySlug } from '@/lib/data/services'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

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

export default function ServicePage({ params }: Props) {
  const s = getServiceBySlug(params.slug)
  if (!s) notFound()

  return (
    <div className="py-12 lg:py-20 relative z-10">
      <div className="w-full mx-auto px-4 lg:px-6">
        {/* Back navigation */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-[#F7C83C] font-semibold hover:underline mb-8"
        >
          &larr; All Services
        </Link>

        {/* Hero glass banner */}
        <div className="bg-gray-950/30 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/15 shadow-2xl mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#F7C83C] mb-3">
            {s.category}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {s.name}
          </h1>
          <p className="text-gray-300 leading-relaxed max-w-2xl text-base sm:text-lg">
            {s.shortDesc}
          </p>
        </div>

        {/* Content details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            {/* About Facility */}
            <div className="bg-gray-950/30 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/15 shadow-xl hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:-translate-y-2 transition-all duration-500 ease-out">
              <h2 className="text-xl font-bold text-white mb-4 tracking-tight">About this facility</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {s.fullDesc}
              </p>
            </div>

            {/* Eligibility & Documents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-950/30 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/15 shadow-xl hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <h3 className="text-xs font-bold tracking-widest uppercase text-[#F7C83C] mb-4">
                  Eligibility Criteria
                </h3>
                <ul className="space-y-3">
                  {s.eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <span className="text-[#F7C83C] font-bold text-base leading-none select-none">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-950/30 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/15 shadow-xl hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:-translate-y-2 transition-all duration-500 ease-out">
                <h3 className="text-xs font-bold tracking-widest uppercase text-[#F7C83C] mb-4">
                  Documents Required
                </h3>
                <ul className="space-y-3">
                  {s.documents.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <span className="text-[#F7C83C] font-bold text-base leading-none select-none">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 bg-gray-950/40 border border-white/15 rounded-[2rem] overflow-hidden p-1 shadow-lg">
              <div className="bg-gray-950/30 backdrop-blur-xl p-6 text-center">
                <p className="text-[0.62rem] font-bold tracking-widest uppercase text-gray-400 mb-2">Loan Range</p>
                <p className="text-xl sm:text-2xl font-extrabold text-white">{s.loanRange}</p>
              </div>
              <div className="bg-gray-950/30 backdrop-blur-xl p-6 text-center">
                <p className="text-[0.62rem] font-bold tracking-widest uppercase text-gray-400 mb-2">Processing Time</p>
                <p className="text-xl sm:text-2xl font-extrabold text-white">{s.processingTime}</p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-gray-950/30 backdrop-blur-xl p-8 rounded-[2rem] border border-white/15 shadow-2xl text-center hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:-translate-y-2 transition-all duration-500 ease-out">
              <h3 className="text-lg font-bold text-white mb-2">Interested?</h3>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                A relationship manager will evaluate your case and respond within 2 business hours.
              </p>
              <Link
                href={`/enquiry?facility=${encodeURIComponent(s.name)}`}
                className="block w-full bg-[#F7C83C] text-gray-900 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-[#D4A832] transition-colors shadow-lg"
              >
                Begin Enquiry
              </Link>
            </div>

            <div className="bg-gray-950/30 backdrop-blur-xl p-8 rounded-[2rem] border border-white/15 shadow-xl hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:-translate-y-2 transition-all duration-500 ease-out">
              <h4 className="text-[0.65rem] font-bold tracking-widest uppercase text-[#F7C83C] mb-4">
                Assistance Info
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[0.6rem] text-gray-500 uppercase tracking-widest mb-0.5">Phone</p>
                  <p className="text-sm font-bold text-white">+91 98400 00000</p>
                </div>
                <div>
                  <p className="text-[0.6rem] text-gray-500 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-sm font-bold text-white">hello@samruthione.in</p>
                </div>
                <div>
                  <p className="text-[0.6rem] text-gray-500 uppercase tracking-widest mb-0.5">Hours</p>
                  <p className="text-sm font-bold text-white">Mon – Sat &middot; 9 AM – 6 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
