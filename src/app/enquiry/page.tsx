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

export default function EnquiryPage({ searchParams }: Props) {
  return (
    <div className="py-12 lg:py-20 relative z-10">
      <div className="w-full mx-auto px-4 lg:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel contact info */}
          <div className="lg:col-span-5 bg-gray-950/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#FFC800] mb-3">Get In Touch</p>
              <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Let&apos;s Find the Right <span className="text-[#FFC800]">Capital Structure</span>
              </h1>
              <p className="text-sm text-gray-300 leading-relaxed">
                Fill in the details regarding your commercial financing requirement and a specialized advisor will contact you within 2 business hours.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-6">
              <div>
                <p className="text-[0.65rem] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Phone</p>
                <p className="text-base font-bold text-white">{SITE_CONFIG.company.phone}</p>
                <p className="text-xs text-gray-400 mt-0.5">{SITE_CONFIG.company.hours}</p>
              </div>

              <div>
                <p className="text-[0.65rem] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Email</p>
                <p className="text-base font-bold text-white">{SITE_CONFIG.company.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">Prompt response within 2 hours</p>
              </div>

              <div>
                <p className="text-[0.65rem] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Chennai HQ</p>
                <p className="text-base font-bold text-white">
                  {SITE_CONFIG.company.address.area1}, {SITE_CONFIG.company.address.city1}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Pincode: {SITE_CONFIG.company.address.pincode1}</p>
              </div>

              <div>
                <p className="text-[0.65rem] font-bold tracking-widest uppercase text-gray-500 mb-1.5">Coimbatore Branch</p>
                <p className="text-base font-bold text-white">
                  {SITE_CONFIG.company.address.area2}, {SITE_CONFIG.company.address.city2}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Pincode: {SITE_CONFIG.company.address.pincode2}</p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <p className="text-[0.7rem] text-[#FFC800] font-semibold tracking-wider">
              CIN: {SITE_CONFIG.company.cin}
            </p>
          </div>

          {/* Right panel form glass card */}
          <div className="lg:col-span-7 bg-gray-950/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Begin your enquiry</h2>
            <p className="text-xs text-gray-400 mb-8">Fields marked with asterisk (*) are required.</p>
            <EnquiryForm defaultFacility={searchParams.facility ?? ''} />
          </div>

        </div>

      </div>
    </div>
  )
}
