import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center select-none">
      <Image
        src="/logos/Logo.png"
        alt="Samruthi One"
        width={240}
        height={240}
        priority
        style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 0 1px black)', height: '45px', width: 'auto' }}
      />
    </Link>
  )
}
