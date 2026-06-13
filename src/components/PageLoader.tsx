'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PageLoader() {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')

  useEffect(() => {
    setMounted(true)
    const fadeTimer = setTimeout(() => setPhase('fading'), 1100)
    const goneTimer = setTimeout(() => setPhase('gone'), 1700)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(goneTimer)
    }
  }, [])

  if (!mounted || phase === 'gone') return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #0a0a0a 100%)',
        transition: 'opacity 600ms ease',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'all',
      }}
    >
      <div
        style={{ animation: 'loaderPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both' }}
        className="mb-6 flex flex-col items-center gap-4"
      >
        <Image src="/logos/Logo.png" alt="Samruthi One" width={52} height={52} style={{ objectFit: 'contain' }} />
      </div>

      <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FFC800] rounded-full"
          style={{ animation: 'loaderBar 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both' }}
        />
      </div>

      <style>{`
        @keyframes loaderPop {
          from { opacity: 0; transform: scale(0.85) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes loaderBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}
