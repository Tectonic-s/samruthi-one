import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/data/content'

export const metadata: Metadata = { 
  title: 'About — Samruthi One',
  description: 'Learn about Samruthi One, our mission, core values, and our structured finance team.'
}

const values = [
  { title: 'Multi-bank Access', desc: 'Direct relationships with 20+ lenders to match your profile and get the best terms.' },
  { title: 'End-to-End Support', desc: 'From document preparation to final disbursement — we manage the entire process.' },
  { title: 'Sector Expertise', desc: 'Deep understanding of textiles, pharma, real estate, manufacturing, and trading.' },
  { title: 'Transparent Fees', desc: 'Success-based only. Fee disclosed upfront before engagement. No hidden charges.' },
]

const team = [
  { initials: 'SK', name: 'S. Krishnamurthy', role: 'Founder & Managing Director', exp: '18 years in banking and credit' },
  { initials: 'PR', name: 'P. Raghunathan', role: 'Head — Structured Finance', exp: 'Ex-ICICI Bank · 14 years' },
  { initials: 'AM', name: 'A. Meenakshi', role: 'Head — Client Relations', exp: 'MSME specialist · 10 years' },
]

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-20 relative z-10">
      <div className="w-full mx-auto px-4 lg:px-6">
        
        {/* Header Section */}
        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#FFC107] mb-3">About Us</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Built on <span className="text-[#FFC107]">Trust</span>, Driven by Results
          </h1>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel badge block */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center min-h-[300px] text-center relative overflow-hidden group hover:border-[#FFC107]/40 transition-all duration-300">
            <span className="text-8xl font-black text-[#F7C83C]/5 absolute select-none pointer-events-none group-hover:text-[#F7C83C]/10 transition-colors duration-300">
              S1
            </span>
            <div className="relative z-10">
              <p className="text-6xl font-extrabold text-white mb-2">3+</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Years of Excellence
              </p>
              <div className="h-px bg-white/10 w-24 my-6 mx-auto" />
              <p className="text-sm text-gray-300 leading-relaxed px-4">
                Structured financing solutions built specifically for MSMEs and growing corporate entities across South India.
              </p>
            </div>
          </div>

          {/* Right main panel */}
          <div className="lg:col-span-8 space-y-10">
            {/* Context Paragraphs */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Samruthi One was founded in {SITE_CONFIG.company.founded} with a clear mandate: to democratize financial consulting and credit procurement for growing businesses. We provide middle-market enterprises and MSMEs with high-quality capital structuring advisory that was historically reserved for much larger corporate firms.
              </p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                We manage the entire financing pipeline—mapping multi-lender credit criteria, formulating credit narratives, optimizing interest spreads, and coordinating legal/operational diligence to facilitate faster closures. Our success-fee policy ensures that our goals align exactly with yours.
              </p>
            </div>

            {/* Core Values */}
            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6 px-2">
                Our Core Strengths
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((v) => (
                  <div key={v.title} className="bg-white/5 border border-white/10 p-6 sm:p-8 relative group hover:border-[#FFC107]/40 transition-all duration-300">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#F7C83C] rounded-r-md group-hover:h-12 transition-all duration-300" />
                    <h3 className="text-base font-bold text-white mb-2 pl-2">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pl-2">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Block */}
            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6 px-2">
                Leadership Team
              </h2>
              <div className="space-y-4">
                {team.map((m) => (
                  <div 
                    key={m.name} 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-6 sm:p-8 hover:border-[#FFC107]/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#F7C83C] text-gray-900 font-extrabold flex items-center justify-center text-sm shadow-md flex-shrink-0">
                      {m.initials}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{m.name}</h4>
                      <p className="text-xs font-semibold text-[#F7C83C] mt-0.5">{m.role}</p>
                      <p className="text-xs text-gray-400 mt-1">{m.exp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
