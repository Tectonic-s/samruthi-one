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
      <section className="min-h-[92vh] flex items-center relative overflow-hidden">
        <div className="w-full px-4 lg:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-gray-950/50 backdrop-blur-xl p-10 sm:p-14 rounded-[2rem] border border-white/20 shadow-2xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#F7C83C] mb-4">
                RBI Registered Fintech · Est. {SITE_CONFIG.company.founded}
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                Financing<br /><span className="text-[#F7C83C]">Simplified</span><br />for Every Business
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-lg">
                {SITE_CONFIG.company.name} connects growing businesses to 20+ banking and Fintech partners — sourcing the right credit at the best rates, faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/enquiry" className="pulse-glow inline-block bg-[#F7C83C] text-gray-900 font-bold px-8 py-4 text-sm tracking-wide hover:bg-[#D4A832] hover:-translate-y-1 transition-all duration-300 text-center shadow-lg rounded-xl">
                  Get Started
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center border border-white/20 text-white px-8 py-4 text-sm hover:border-[#F7C83C]/60 hover:-translate-y-1 transition-all duration-300 shadow-lg rounded-xl">
                  Our Services &rarr;
                </Link>
              </div>
              <p className="mt-8 text-xs text-gray-500 font-medium tracking-wide">CIN: {SITE_CONFIG.company.cin}</p>
            </div>

            <div className="lg:col-span-5 hidden md:grid grid-cols-2 gap-4 lg:gap-6 lg:pl-6">
              {SITE_CONFIG.stats.map((stat) => (
                <div key={stat.label} className="bg-gray-950/50 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 shadow-xl flex flex-col justify-center min-h-[160px] hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(247,200,60,0.13)] hover:-translate-y-2 transition-all duration-500 ease-out">
                  <div className="text-4xl font-bold text-[#F7C83C] tracking-tight mb-2">{stat.number}</div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
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
              <Link href="/services" className="self-start sm:self-auto bg-gray-950/50 backdrop-blur-xl border border-white/20 rounded-xl px-6 py-3 text-xs font-semibold tracking-widest uppercase text-[#F7C83C] whitespace-nowrap shadow-xl hover:border-[#F7C83C]/40 transition-all">
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
          <div className="max-w-[1400px] mx-auto text-center bg-gray-900/50 backdrop-blur-xl border border-white/20 rounded-[2rem] p-10 sm:p-14 shadow-2xl">
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
