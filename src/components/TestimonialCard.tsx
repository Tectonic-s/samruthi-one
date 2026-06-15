interface Testimonial {
  initials: string
  name: string
  role: string
  quote: string
}

export default function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div className="bg-gray-900/25 backdrop-blur-xl border border-white/15 rounded-[2rem] p-8 h-full hover:border-[#F7C83C]/60 hover:shadow-[0_0_32px_2px_rgba(255,200,0,0.13)] hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col relative overflow-hidden group">
      {/* Visual background details */}
      <span className="absolute -right-4 -top-8 text-white/5 text-9xl font-serif select-none pointer-events-none group-hover:text-[#F7C83C]/10 transition-colors duration-300">
        &ldquo;
      </span>
      
      <div className="text-sm text-[#F7C83C] font-semibold mb-6 flex gap-1 tracking-widest">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow font-medium italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-10 h-10 rounded-full bg-[#F7C83C] text-gray-900 font-bold flex items-center justify-center text-sm shadow-md flex-shrink-0">
          {testimonial.initials}
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-white tracking-wide">
            {testimonial.name}
          </p>
          <p className="text-[0.7rem] font-semibold text-gray-400 mt-0.5 tracking-wider">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  )
}
