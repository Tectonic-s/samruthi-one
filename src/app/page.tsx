import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/data/content'
import { SERVICES } from '@/lib/data/services'
import ServiceCard from '@/components/ServiceCard'
import StatsBand from '@/components/StatsBand'
import PartnerGrid from '@/components/PartnerGrid'
import TestimonialCard from '@/components/TestimonialCard'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'Samruthi One — Financing Simplified | Business Loans & Working Capital',
  description: 'Access 20+ banking and Fintech partners for working capital, trade finance, and property loans. RBI-registered Fintech with 91% approval rate.',
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[92vh] flex flex-col justify-center relative overflow-hidden">

        <div className="relative z-10 w-full px-4 lg:px-6 pt-20 pb-12">

          {/* Centered main copy */}
          <div className="flex flex-col items-center text-center max-w-7xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#FFC107] mb-4">
              RBI Registered Fintech · Est. {SITE_CONFIG.company.founded}
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Financing <span className="text-[#FFC107]">Simplified</span>
              <br className="hidden lg:block" /> for Every Business
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-lg">
              {SITE_CONFIG.company.name} connects growing businesses to 20+ banking and Fintech partners — sourcing the right credit at the best rates, faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquiry" className="pulse-glow inline-flex items-center justify-center bg-[#FFC107] text-black font-bold px-8 py-4 text-sm tracking-wide hover:bg-[#E6A800] transition-colors duration-200 whitespace-nowrap rounded-2xl">
                Get Started
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 text-sm hover:border-[#FFC107]/60 hover:text-[#FFC107] transition-all duration-200 whitespace-nowrap rounded-2xl">
                Our Services →
              </Link>
            </div>
            <p className="mt-8 text-xs text-white/30 font-medium tracking-widest uppercase">CIN: {SITE_CONFIG.company.cin}</p>
          </div>

          {/* Stats row — bottom of hero, full width, single horizontal line */}
          <div className="mt-16 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4">
            {SITE_CONFIG.stats.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col items-center text-center py-6 ${i < 3 ? 'border-r border-white/10' : ''}`}>
                <div className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-1 tabular-nums">{stat.number}</div>
                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 relative z-10">
        <div className="w-full px-4 lg:px-6">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#F7C83C] mb-3">What We Offer</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Credit Solutions<br />for Every Stage</h2>
              </div>
              <Link href="/services" className="self-start sm:self-auto border border-white/20 rounded-xl px-6 py-3 text-xs font-semibold tracking-widest uppercase text-[#FFC107] whitespace-nowrap hover:border-[#FFC107]/40 transition-all">
                View All Services
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.slice(0, 8).map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="relative z-10"><StatsBand /></div>
      <div className="relative z-10"><PartnerGrid /></div>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 relative z-10">
        <div className="w-full px-4 lg:px-6">
          <FadeUp>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#F7C83C] mb-3">Client Stories</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-10">What Our Clients Say</h2>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SITE_CONFIG.testimonials.map((t, i) => (
                <TestimonialCard key={t.name} testimonial={t} index={i} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10 px-4 lg:px-6">
        <FadeUp>
          <div className="max-w-[1400px] mx-auto text-center border border-white/10 p-10 sm:p-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#F7C83C] mb-3">Start Today</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">Ready to access the right credit?</h2>
            <p className="text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
              Share your requirement and a relationship manager will respond within 2 business hours. No obligation. No spam.
            </p>
            <Link href="/enquiry" className="pulse-glow inline-block bg-[#F7C83C] text-gray-900 font-bold px-10 py-4 text-sm tracking-widest uppercase hover:bg-[#D4A832] transition-colors rounded-xl shadow-lg">
              Submit Enquiry
            </Link>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
