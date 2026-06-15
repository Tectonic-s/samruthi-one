import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/data/content'

export default function Footer() {
  return (
    <footer className="bg-gray-950/35 border-t border-white/15 text-gray-400 py-16 mt-auto">
      <div className="w-full mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Company Intro */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <Link href="/" className="select-none">
              <Image src="/logos/Logo2.png" alt="Samruthi One" width={160} height={160} style={{ objectFit: 'contain', height: '45px', width: 'auto' }} />
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              RBI-registered Fintech providing working capital, trade finance, and property loans with multi-bank access for businesses across India.
            </p>
            
            <p className="text-xs text-[#F7C83C] font-semibold tracking-wider">
              CIN: {SITE_CONFIG.company.cin}
            </p>
          </div>

          {/* Quick links columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:col-span-8 gap-8">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/services/loan-against-property" className="hover:text-[#F7C83C] transition-colors">
                    Loan Against Property
                  </Link>
                </li>
                <li>
                  <Link href="/services/home-loan" className="hover:text-[#F7C83C] transition-colors">
                    Home Loan
                  </Link>
                </li>
                <li>
                  <Link href="/services/personal-loan" className="hover:text-[#F7C83C] transition-colors">
                    Personal Loan
                  </Link>
                </li>
                <li>
                  <Link href="/services/business-loans" className="hover:text-[#F7C83C] transition-colors">
                    Business Loans
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-[#F7C83C] hover:underline font-semibold text-xs uppercase tracking-wider block mt-2">
                    View All Services &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-[#F7C83C] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:text-[#F7C83C] transition-colors">
                    Lender Network
                  </Link>
                </li>
                <li>
                  <Link href="/enquiry" className="hover:text-[#F7C83C] transition-colors">
                    Contact & Enquiry
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4">
                Offices
              </h4>
              <ul className="space-y-3 text-xs leading-relaxed">
                <li>
                  <span className="font-semibold text-white block">
                    {SITE_CONFIG.company.address.city1} (HQ)
                  </span>
                  {SITE_CONFIG.company.address.area1}, {SITE_CONFIG.company.address.pincode1}
                </li>
                <li>
                  <span className="font-semibold text-white block">
                    {SITE_CONFIG.company.address.city2}
                  </span>
                  {SITE_CONFIG.company.address.area2}, {SITE_CONFIG.company.address.pincode2}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} SamruthiOne. All rights reserved.</p>
          <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-[#F7C83C] transition-colors">Privacy Policy</Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-[#F7C83C] transition-colors">Terms of Service</Link>
            <span>&middot;</span>
            <span className="text-gray-600">Registered Fintech Advisory Firm</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
