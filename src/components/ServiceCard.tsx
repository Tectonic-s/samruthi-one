import Link from 'next/link'
import { Service } from '@/types'

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="block group h-full">
      <div className="h-full flex flex-col bg-gray-900/25 backdrop-blur-xl border border-white/15 rounded-xl p-7 hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:bg-gray-900/30 transition-all duration-500 ease-out group-hover:-translate-y-2">

        {/* Category */}
        <span className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#F7C83C] mb-4 block">
          {service.category}
        </span>

        {/* Name */}
        <h3 className="text-lg font-bold text-white mb-3 tracking-tight leading-snug">
          {service.name}
        </h3>

        {/* Divider */}
        <div className="w-6 h-px bg-[#F7C83C]/80 mb-4" />

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
          {service.shortDesc}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/15">
          <span className="font-medium text-gray-400">{service.loanRange}</span>
          <span className="text-[#F7C83C] font-bold tracking-wide group-hover:translate-x-1 transition-transform duration-200">
            Learn more →
          </span>
        </div>

      </div>
    </Link>
  )
}
