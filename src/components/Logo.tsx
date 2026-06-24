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
        style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', height: '38px', width: 'auto' }}
      />
    </Link>
  )
}
