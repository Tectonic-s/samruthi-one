import { SITE_CONFIG } from '@/lib/data/content'

export default function StatsBand() {
  return (
    <section className="py-12 bg-transparent">
      <div className="w-full mx-auto px-4 lg:px-6">
        <div className="bg-gray-950/50 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {SITE_CONFIG.stats.map((stat, i) => (
              <div 
                key={stat.label} 
                className={`text-center flex flex-col justify-center ${
                  i > 1 ? 'pt-6 md:pt-0' : i === 0 ? '' : 'pt-0'
                } ${
                  i === 1 ? 'pt-0' : ''
                }`}
              >
                <div className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
                  <span className="text-[#F7C83C]">{stat.number}</span>
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
