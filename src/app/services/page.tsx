import type { Metadata } from 'next'
import { SERVICES } from '@/lib/data/services'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Services — Samruthi One | Working Capital, Trade Finance & More',
  description: "Explore Samruthi One's complete range of credit solutions including business loans, home loans, loan against property, and balance transfer.",
}

export default function ServicesPage() {
  const categories = Array.from(new Set(SERVICES.map((s) => s.category)))
  
  return (
    <>
      <section className="py-16 lg:py-20 relative z-10">
        <div className="w-full mx-auto px-4 lg:px-6">
          <div className="bg-gray-950/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#FFC800] mb-3">Products & Solutions</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Credit for Every Stage of Growth</h1>
            <p className="text-gray-300 leading-relaxed max-w-2xl">
              From revolving working capital lines to structured property loans — we source, structure, and facilitate the right product for your business through 20+ lender partners.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-8 lg:py-16 relative z-10">
        <div className="w-full mx-auto px-4 lg:px-6 space-y-16">
          {categories.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">{category}</h2>
                <div className="flex-1 h-px bg-white/20" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.filter((s) => s.category === category).map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
