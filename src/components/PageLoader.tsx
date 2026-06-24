'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Phase = 'visible' | 'sliding' | 'gone'

export default function PageLoader() {
  const [phase, setPhase] = useState<Phase>('visible')
  const [pos, setPos] = useState({
    x: 0, y: 0, size: 280,
    tx: 0, ty: 0, tsize: 38,
  })

  useEffect(() => {
    // Set initial centered position
    setPos(p => ({
      ...p,
      x: window.innerWidth / 2 - 140,
      y: window.innerHeight / 2 - 140,
    }))

    const t1 = setTimeout(() => {
      // Measure exact nav logo anchor position
      const anchor = document.getElementById('nav-logo-anchor')
      if (anchor) {
        const rect = anchor.getBoundingClientRect()
        setPos(p => ({
          ...p,
          tx: rect.left,
          ty: rect.top + rect.height / 2 - 19, // vertically centre to 38px
          tsize: 38,
        }))
      }
      setPhase('sliding')
    }, 1600)

    const t2 = setTimeout(() => setPhase('gone'), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone') return null

  const isSliding = phase === 'sliding'

  return (
    <>
      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #0a0a0a 100%)',
          opacity: isSliding ? 0 : 1,
          transition: 'opacity 700ms ease',
        }}
      >
        {!isSliding && (
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '50%', marginTop: '50px' }}>
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F7C83C] rounded-full"
                style={{ animation: 'splashBar 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s both' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Flying logo — single element that moves from center to nav corner */}
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          left: isSliding ? pos.tx : pos.x,
          top: isSliding ? pos.ty : pos.y,
          width: isSliding ? pos.tsize : pos.size,
          opacity: isSliding ? 0 : 1,
          transition: isSliding
            ? 'left 800ms cubic-bezier(0.4,0,0.2,1), top 800ms cubic-bezier(0.4,0,0.2,1), width 800ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease 700ms'
            : 'none',
          animation: !isSliding ? 'splashPop 0.7s cubic-bezier(0.34,1.56,0.64,1) both' : 'none',
        }}
      >
        <Image
          src="/logos/Logo.png"
          alt="Samruthi One"
          width={320}
          height={320}
          priority
          style={{ objectFit: 'contain', width: '100%', height: 'auto', filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <style>{`
        @keyframes splashPop {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </>
  )
}
