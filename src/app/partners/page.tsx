import type { Metadata } from 'next'
import PartnerGrid from '@/components/PartnerGrid'

export const metadata: Metadata = { 
  title: 'Lender Network — Samruthi One',
  description: 'Samruthi One works with 20+ banking and Fintech partners to get you competitive rates and faster loan approvals.'
}

export default function PartnersPage() {
  return (
    <div className="py-12 relative z-10">
      <div className="w-full mx-auto px-4 lg:px-6">
        
        {/* Banner glass element */}
        <div className="bg-gray-950/50 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/20 shadow-2xl mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#F7C83C] mb-3">Our Synergy</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Partners Who <span className="text-[#F7C83C]">Deliver</span>
          </h1>
          <p className="text-gray-300 mt-4 leading-relaxed max-w-2xl text-sm sm:text-base">
            By partnering with India&apos;s leading banking institutions and Fintech lenders, we negotiate terms, speed up approvals, and secure credit lines where others cannot.
          </p>
        </div>

        {/* Dynamic Partner Grid component */}
        <PartnerGrid />

        {/* Highlight panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { 
              title: 'Competitive Rates', 
              desc: 'Our multi-lender network gives us the leverage to benchmark offers and negotiate aggressive rate options that a single-bank applicant cannot match.' 
            },
            { 
              title: 'Faster Sanctions', 
              desc: 'With direct integrations in promoter divisions, we skip standard queues and move applications through pre-assessed fast-tracked credit cycles.' 
            },
            { 
              title: 'Declined Elsewhere?', 
              desc: 'A loan decline is usually just a lender mismatch. We restructure the financial model and align it with a partner whose risk appetite matches your profile.' 
            },
          ].map((item) => (
            <div 
              key={item.title} 
              className="bg-gray-950/50 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 shadow-xl hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:-translate-y-2 transition-all duration-500 ease-out group"
            >
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#F7C83C] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
