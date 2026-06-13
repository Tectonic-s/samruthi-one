'use client'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/data/content'

const partnerLogo: Record<string, string> = {
  // Banking
  'ICICI Bank':          'icici.png',
  'HDFC Bank':           'hdfc.png',
  'Axis Bank':           'axis.png',
  'IndusInd Bank':       'indusind.png',
  'Standard Chartered':  'sc.png',
  'Bank of India':       'boi.png',
  'City Union Bank':     'cub.png',
  'Indian Bank':         'indianbank.png',
  'Kotak Mahindra':      'kotak.png',
  'Yes Bank':            'yesbank.png',
  // NBFC
  'Cholamandalam':       'chola.png',
  'Aditya Birla Finance':'abcapital.png',
  'HDB Financial':       'hdb.png',
  'Axis Finance':        'axis.png',
  'Fullerton India':     'fullerton.png',
  'Indiabulls Housing':  'indiabulls.png',
  'Bajaj Finserv':       'bajaj.png',
  'Tata Capital':        'tatacapital.png',
  'Piramal Finance':     'piramal.png',
  'L&T Finance':         'ltfinance.png',
  'Poonawala Fincorp':   'poonawala.png',
  'Jio Finance':         'jiofinance.png',
  'Sundaram Finance':    'sundaramfinance.png',
}

function LogoChip({ name }: { name: string }) {
  const logoFile = partnerLogo[name]

  return (
    <div className="group inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#FFC800]/60 hover:bg-white/10 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:-translate-y-1 transition-all duration-500 ease-out cursor-default">
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
        <Image
          src={`/logos/${logoFile}`}
          alt={`${name} logo`}
          width={48}
          height={48}
          className="w-12 h-12 object-contain"
        />
      </div>
      <span className="text-xs font-semibold text-gray-300 group-hover:text-white whitespace-nowrap tracking-wide transition-colors duration-500">
        {name}
      </span>
    </div>
  )
}

export default function PartnerGrid() {
  return (
    <section className="py-16 lg:py-24">
      <div className="w-full mx-auto px-4 lg:px-6 bg-gray-950/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-12 shadow-2xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#FFC800] mb-3">Our Network</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">Lender Partners</h2>
        <p className="text-gray-300 leading-relaxed mb-12 max-w-2xl">
          We work with 20+ banking and Fintech partners to source the best rates, highest limits, and fastest turnarounds for every client profile.
        </p>

        <div className="mb-10">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-5">Banking Partners</h3>
          <div className="flex flex-wrap gap-2.5">
            {SITE_CONFIG.partners.banking.map((name) => (
              <LogoChip key={name} name={name} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-5">Fintech &amp; Private Lenders</h3>
          <div className="flex flex-wrap gap-2.5">
            {SITE_CONFIG.partners.nbfc.map((name) => (
              <LogoChip key={name} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
