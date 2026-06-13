import Link from 'next/link'
import Image from 'next/image'

export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none">
      {variant === 'dark' && (
        <Image
          src="/logos/Logo.png"
          alt="Samruthi One"
          width={40}
          height={40}
          style={{ objectFit: 'contain' }}
        />
      )}
      <div className="flex flex-col leading-none">
        <span className={`font-bold text-base tracking-tight ${variant === 'light' ? 'text-white' : 'text-gray-900'}`}>
          Samruthi One
        </span>
        <span className={`text-[0.55rem] font-semibold tracking-[0.12em] uppercase mt-0.5 ${variant === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
          Financing Simplified
        </span>
      </div>
    </Link>
  )
}
