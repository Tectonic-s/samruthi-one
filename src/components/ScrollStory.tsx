'use client'
import { useEffect } from 'react'

/* Scroll-driven "How it works" story — ported from the approved design
   prototype. A 480vh region with a sticky 100vh stage; scroll progress
   p (0–1) drives 5 scenes over an SVG canvas via an rAF timeline.

   Timeline semantics (from the handoff): tweens are (p0,p1) windows;
   each frame every tween whose window has started applies with eased
   local k, and the FIRST tween per element always applies so jumping
   back above a window resets that element. Dashed draws stay opacity 0
   until k > .01 to avoid the round-cap dot artifact. */

const HEADLINES = [
  { badge: 'Who We Are', title: 'Samruthi One — your financing team', sub: "A credit advisory that gets businesses funded, at no cost to you. Here's how it works." },
  { badge: 'Step 1 of 4', title: 'Your business needs funds to grow', sub: 'New stock, new machines, a bigger space — growth needs money.' },
  { badge: 'Step 2 of 4', title: 'Tell us once — we handle the paperwork', sub: 'One 10-minute application. No queues, no branch visits, no chasing.' },
  { badge: 'Step 3 of 4', title: 'We shop your file to 23+ lenders', sub: 'Banks and NBFCs compete for your loan — we pick the best offer.' },
  { badge: 'Step 4 of 4', title: 'You get funded. Fast.', sub: 'Best offer in your account in days, not months — we do the waiting for you.' },
]

/* Classical bank building illustration (pediment, columns, steps) */
function BankBuilding({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={48} rx={70} ry={8} fill="rgba(30,36,48,.10)" />
      <rect x={-64} y={40} width={128} height={8} fill="url(#ill-stone)" stroke="#1E2430" strokeWidth={2.5} />
      <rect x={-55} y={-38} width={110} height={78} fill="#D9D4C7" stroke="#1E2430" strokeWidth={2.5} />
      <path d="M-62 -38 L0 -72 L62 -38 Z" fill="url(#ill-stone)" stroke="#1E2430" strokeWidth={2.5} />
      <circle cy={-52} r={6} fill="url(#ill-coin)" stroke="#1E2430" strokeWidth={2} />
      {[-42, -6, 30].map((cx) => (
        <g key={cx}>
          <rect x={cx} y={-30} width={12} height={70} fill="url(#ill-col)" stroke="#1E2430" strokeWidth={2} />
          <rect x={cx - 3} y={-34} width={18} height={6} fill="url(#ill-stone)" stroke="#1E2430" strokeWidth={2} />
        </g>
      ))}
      <text y={68} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={20} fill="#0A0A0A">{label}</text>
    </g>
  )
}

/* Shopfront with scalloped yellow awning */
function Shopfront() {
  return (
    <g transform="translate(680 470)">
      <ellipse cx={4} cy={6} rx={128} ry={10} fill="rgba(30,36,48,.10)" />
      <rect x={-110} y={-150} width={220} height={150} fill="url(#ill-wall)" stroke="#1E2430" strokeWidth={3} />
      <rect x={-107} y={-147} width={214} height={7} fill="rgba(30,36,48,.07)" />
      <rect x={-122} y={-176} width={244} height={30} fill="#F7C83C" stroke="#1E2430" strokeWidth={3} />
      {[-91.5, -30.5, 30.5].map((x) => (
        <rect key={x} x={x} y={-174.5} width={30.5} height={27} fill="#E6A912" />
      ))}
      <rect x={91.5} y={-174.5} width={29} height={27} fill="#E6A912" />
      {[-122, -91.5, -61, -30.5, 0, 30.5, 61, 91.5].map((x, i) => (
        <path key={x} d={`M${x} -146 a15.25 11 0 0 0 30.5 0 Z`} fill={i % 2 === 0 ? '#F7C83C' : '#E6A912'} stroke="#1E2430" strokeWidth={2.5} />
      ))}
      {[-88, 44].map((x) => (
        <g key={x}>
          <rect x={x} y={-118} width={44} height={34} fill="url(#ill-glass)" stroke="#1E2430" strokeWidth={3} />
          <path d={`M${x + 22} -118 L${x + 22} -84 M${x} -101 L${x + 44} -101`} stroke="rgba(30,36,48,.3)" strokeWidth={2} />
          <path d={`M${x + 6} -90 L${x + 30} -114`} stroke="rgba(255,255,255,.75)" strokeWidth={4} strokeLinecap="round" />
          <rect x={x - 4} y={-84} width={52} height={6} fill="url(#ill-stone)" strokeWidth={2} stroke="#1E2430" />
        </g>
      ))}
      <rect x={-28} y={-66} width={56} height={66} fill="url(#ill-door)" stroke="#1E2430" strokeWidth={3} />
      <rect x={-19} y={-56} width={38} height={32} fill="none" stroke="rgba(255,255,255,.3)" strokeWidth={2.5} />
      <circle cx={18} cy={-30} r={3.5} fill="#F7C83C" />
    </g>
  )
}

const DASH0: React.CSSProperties = { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 }

export default function ScrollStory() {
  useEffect(() => {
    const run = document.getElementById('story-run')
    if (!run) return
    const hero = document.getElementById('home-hero')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      run.style.display = 'none'
      return
    }
    if (hero && !hero.dataset.shown) {
      hero.style.opacity = '0'
      hero.style.transform = 'translateY(28px)'
      hero.style.transition = 'opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1)'
    }

    const $ = (id: string) => document.getElementById(id)
    const C = (v: number) => Math.max(0, Math.min(1, v))
    const E: Record<string, (k: number) => number> = {
      lin: (k) => k,
      out: (k) => 1 - Math.pow(1 - k, 3),
      back: (k) => { const c = 2.2; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2) },
    }

    type Tween = { id: string | null; p0: number; p1: number; fn?: (el: HTMLElement | SVGElement, k: number) => void; e?: (k: number) => number; cueName?: string; cuePitch?: number; first?: boolean }
    const tws: Tween[] = []

    /* Sound cues — two-note sine sparkle, unlocked on first gesture */
    let ac: AudioContext | null = null
    const unlock = () => {
      if (!ac) { try { ac = new AudioContext() } catch { /* no audio */ } }
      if (ac && ac.state === 'suspended') ac.resume()
    }
    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('scroll', unlock, { passive: true, once: true })
    const sparkle = (pitch: number) => {
      if (!ac || ac.state !== 'running') return
      const t0 = ac.currentTime
      ;[0, 0.07].forEach((dt, i) => {
        const o = ac!.createOscillator(), g = ac!.createGain()
        o.type = 'sine'
        o.frequency.value = pitch * (i ? 1.5 : 1)
        g.gain.setValueAtTime(0, t0 + dt)
        g.gain.linearRampToValueAtTime(0.12, t0 + dt + 0.015)
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.5)
        o.connect(g); g.connect(ac!.destination)
        o.start(t0 + dt); o.stop(t0 + dt + 0.55)
      })
    }
    const fired: Record<string, boolean> = {}
    const cue = (name: string, p: number, pitch: number) => tws.push({ id: null, p0: p, p1: p, cueName: name, cuePitch: pitch })
    let prevP: number | null = null
    const cueCheck = (p: number, prev: number) => {
      tws.forEach((t) => {
        if (!t.cueName) return
        if (prev < t.p0 && p >= t.p0 && !fired[t.cueName]) { fired[t.cueName] = true; sparkle(t.cuePitch!) }
        if (p < t.p0 - 0.05) fired[t.cueName] = false
      })
    }

    const tw = (id: string, p0: number, p1: number, fn: Tween['fn'], ease?: string) => tws.push({ id, p0, p1, fn, e: E[ease || 'out'] })
    const op = (id: string, p0: number, p1: number, a: number, b: number) => tw(id, p0, p1, (el, k) => { (el as HTMLElement).style.opacity = String(a + (b - a) * k) }, 'lin')
    const draw = (id: string, p0: number, p1: number) => tw(id, p0, p1, (el, k) => { (el as HTMLElement).style.strokeDashoffset = String(1 - k); (el as HTMLElement).style.opacity = k > 0.01 ? '1' : '0' })
    const pop = (id: string, cx: number, cy: number, p0: number, p1: number) => tw(id, p0, p1, (el, k) => {
      const s = Math.max(0, k)
      el.setAttribute('transform', `translate(${cx * (1 - s)} ${cy * (1 - s)}) scale(${s})`)
      ;(el as HTMLElement).style.opacity = k > 0.01 ? '1' : '0'
    }, 'back')

    // Scene 0 — Who we are
    op('sv0', 0, 0.02, 1, 1)
    op('sv0', 0.085, 0.10, 1, 0)
    // Scene 1 — You need funds
    op('sv1', 0.10, 0.12, 0, 1)
    tw('sv1', 0.10, 0.125, (el, k) => { el.setAttribute('transform', `translate(0 ${24 * (1 - k)})`) })
    draw('v1-arrow', 0.15, 0.21)
    op('v1-ah', 0.195, 0.22, 0, 1)
    op('sv1', 0.25, 0.265, 1, 0)
    // Scene 2 — One application
    op('sv2', 0.265, 0.285, 0, 1)
    tw('sv2', 0.265, 0.29, (el, k) => { el.setAttribute('transform', `translate(0 ${24 * (1 - k)})`) })
    pop('v2-doc', 600, 327, 0.32, 0.38)
    cue('c-doc', 0.37, 1046)
    pop('v2-easy', 600, 195, 0.40, 0.445)
    draw('v2-arr', 0.36, 0.45)
    op('v2-ah', 0.43, 0.46, 0, 1)
    op('sv2', 0.51, 0.525, 1, 0)
    // Scene 3 — 23+ lenders
    op('sv3', 0.525, 0.545, 0, 1)
    tw('sv3', 0.525, 0.55, (el, k) => { el.setAttribute('transform', `translate(0 ${24 * (1 - k)})`) })
    draw('v3-l1', 0.59, 0.65); draw('v3-l2', 0.61, 0.67); draw('v3-l3', 0.63, 0.69)
    pop('v3-seal', 962, 312, 0.68, 0.715)
    cue('c-seal', 0.70, 1175)
    draw('v3-check', 0.71, 0.725)
    op('sv3', 0.76, 0.775, 1, 0)
    // Scene 4 — Funded
    op('sv4', 0.775, 0.795, 0, 1)
    tw('sv4', 0.775, 0.80, (el, k) => { el.setAttribute('transform', `translate(0 ${24 * (1 - k)})`) })
    op('v4-zoom', 0.775, 0.78, 1, 1)
    tw('v4-zoom', 0.84, 0.92, (el, k) => { const s = 1 + 2.2 * k; el.setAttribute('transform', `translate(${600 * (1 - s)} ${385 * (1 - s)}) scale(${s})`) })
    op('v4-zoom', 0.90, 0.95, 1, 0)
    op('v4-coin', 0.90, 0.95, 0, 1)
    cue('c-coin', 0.93, 1568)
    pop('v4-fast', 600, 489, 0.955, 0.985)
    draw('v4-rays', 0.94, 0.985)
    // Headlines
    const caps: [number, number][] = [[0, 0.095], [0.105, 0.26], [0.28, 0.52], [0.54, 0.77], [0.79, 0.985]]
    caps.forEach((w, i) => tw('hl' + i, w[0], w[1], (el, k) => {
      const kin = i === 0 ? 1 : C(k / 0.12), kout = C((k - 0.9) / 0.1)
      ;(el as HTMLElement).style.opacity = String(kin * (1 - kout))
      ;(el as HTMLElement).style.transform = `translateY(${14 * (1 - kin) - 12 * kout}px)`
    }, 'lin'))
    op('story-cue', 0.93, 0.97, 1, 0)

    const rail = document.getElementById('story-rail')
    const dots = rail ? (Array.from(rail.children) as HTMLElement[]) : []

    tws.sort((a, b) => a.p0 - b.p0)
    const seen: Record<string, boolean> = {}
    tws.forEach((t) => { if (t.id !== null && !(t.id in seen)) { seen[t.id] = true; t.first = true } })

    const apply = (p: number) => {
      cueCheck(p, prevP == null ? p : prevP)
      prevP = p
      tws.forEach((t) => {
        if (t.cueName || (p < t.p0 && !t.first)) return
        const el = $(t.id!)
        if (!el) return
        t.fn!(el, t.e!(C((p - t.p0) / (t.p1 - t.p0))))
      })
      const sc = p < 0.10 ? -1 : p < 0.265 ? 0 : p < 0.525 ? 1 : p < 0.775 ? 2 : 3
      dots.forEach((d, i) => {
        d.style.background = i === sc ? '#E6B400' : 'rgba(10,10,10,.15)'
        d.style.transform = i === sc ? 'scale(1.5)' : 'scale(1)'
      })
      if (hero && p > 0.985 && !hero.dataset.shown) {
        hero.dataset.shown = '1'; hero.style.opacity = '1'; hero.style.transform = 'none'
      }
    }

    let raf = 0
    const loop = () => {
      const cur = document.getElementById('story-run')
      if (cur) {
        const total = cur.offsetHeight - window.innerHeight
        apply(C(-cur.getBoundingClientRect().top / Math.max(1, total)))
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('scroll', unlock)
    }
  }, [])

  return (
    <div id="story-run" style={{ height: '480vh', position: 'relative', background: '#fff' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        {/* Headline stack */}
        <div className="r-hlwrap" style={{ position: 'relative', width: '100%', marginTop: 44, textAlign: 'center', padding: '0 24px', height: 180, flex: 'none' }}>
          {HEADLINES.map((h, i) => (
            <div key={h.badge} id={`hl${i}`} style={{ position: 'absolute', left: 0, right: 0, opacity: 0 }}>
              <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', background: '#F7C83C', color: '#0A0A0A', padding: '7px 14px', borderRadius: 999 }}>{h.badge}</span>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,3.6vw,44px)', letterSpacing: '-.02em', color: '#0A0A0A', marginTop: 14 }}>{h.title}</div>
              <div style={{ fontSize: 'clamp(14px,1.4vw,17px)', fontWeight: 500, color: 'rgba(10,10,10,.62)', margin: '10px auto 0', maxWidth: 580 }}>{h.sub}</div>
            </div>
          ))}
        </div>

        {/* SVG canvas */}
        <svg viewBox="230 80 820 545" className="r-storysvg" style={{ position: 'relative', flex: '1 1 0%', minHeight: 0, width: '100%', maxWidth: 900, marginTop: 10 }} role="img" aria-label="How Samruthi One gets your business funded">
          <defs>
            <radialGradient id="ill-coin" cx=".35" cy=".3" r=".95"><stop offset="0" stopColor="#FFE694" /><stop offset=".55" stopColor="#F7C83C" /><stop offset="1" stopColor="#D99E10" /></radialGradient>
            <linearGradient id="ill-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFEFA" /><stop offset="1" stopColor="#EAE6DC" /></linearGradient>
            <linearGradient id="ill-stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FBFAF6" /><stop offset="1" stopColor="#E0DCD0" /></linearGradient>
            <linearGradient id="ill-col" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#FFFEFA" /><stop offset=".5" stopColor="#EFEBE1" /><stop offset="1" stopColor="#D5D0C2" /></linearGradient>
            <linearGradient id="ill-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E8F1F8" /><stop offset="1" stopColor="#B9CDDD" /></linearGradient>
            <linearGradient id="ill-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#ECEAE2" /></linearGradient>
            <linearGradient id="ill-door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3D4B63" /><stop offset="1" stopColor="#212C42" /></linearGradient>
          </defs>

          {/* Scene 0 — Who we are */}
          <g id="sv0" opacity={0}>
            <image href="/assets/char-advisor-sm.png" x={598.5} y={240} width={82.9} height={240} />
            <text x={640} y={522} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A">Samruthi One</text>
          </g>

          {/* Scene 1 — You need funds */}
          <g id="sv1" opacity={0}>
            <image href="/assets/char-you-sm.png" x={390.3} y={230} width={79.5} height={240} />
            <text x={430} y={512} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A">You</text>
            <g>
              <circle cx={333} cy={259} r={36} fill="rgba(30,36,48,.12)" />
              <circle cx={330} cy={255} r={36} fill="url(#ill-coin)" stroke="#1E2430" strokeWidth={3} />
              <circle cx={330} cy={255} r={27} fill="none" stroke="rgba(138,109,0,.5)" strokeWidth={2} />
              <text x={330} y={268} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={800} fontSize={34} fill="#6B5200">₹</text>
              <path d="M310 237 A 27 27 0 0 1 335 229" stroke="rgba(255,255,255,.85)" strokeWidth={4} strokeLinecap="round" fill="none" />
              <circle cx={372} cy={303} r={8} fill="url(#ill-coin)" stroke="#1E2430" strokeWidth={2.5} />
              <circle cx={396} cy={326} r={5} fill="url(#ill-coin)" stroke="#1E2430" strokeWidth={2.5} />
            </g>
            <Shopfront />
            <text x={680} y={512} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A">Your business</text>
            <path id="v1-arrow" d="M470 260 C 620 240 760 190 900 120" fill="none" stroke="#E6B400" strokeWidth={6} strokeLinecap="round" pathLength={1} style={DASH0} />
            <path id="v1-ah" d="M900 120 L866 128 M900 120 L884 152" stroke="#E6B400" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0} />
          </g>

          {/* Scene 2 — One application */}
          <g id="sv2" opacity={0}>
            <image href="/assets/char-you-sm.png" x={400.3} y={230} width={79.5} height={240} />
            <text x={440} y={512} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A">You</text>
            <image href="/assets/char-advisor-sm.png" x={718.5} y={230} width={82.9} height={240} />
            <text x={760} y={512} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A">Samruthi One</text>
            <g id="v2-doc" opacity={0}>
              <rect x={557} y={272} width={96} height={122} rx={8} fill="rgba(30,36,48,.14)" />
              <rect x={552} y={266} width={96} height={122} rx={8} fill="url(#ill-paper)" stroke="#1E2430" strokeWidth={3} />
              <path d="M572 296 L628 296 M572 318 L620 318 M572 340 L612 340" stroke="rgba(30,36,48,.32)" strokeWidth={5} strokeLinecap="round" fill="none" />
              <circle cx={625} cy={367} r={14} fill="rgba(30,36,48,.14)" />
              <circle cx={624} cy={366} r={13} fill="url(#ill-coin)" stroke="#1E2430" strokeWidth={2} />
              <path d="M618 366 L623 371 L631 361" stroke="#1E2430" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g id="v2-easy" opacity={0}>
              <rect x={540} y={176} width={120} height={38} rx={19} fill="#F7C83C" stroke="#1E2430" strokeWidth={2.5} />
              <text x={600} y={201} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={800} fontSize={19} fill="#0A0A0A">10 mins</text>
            </g>
            <path id="v2-arr" d="M486 428 L714 428" stroke="rgba(10,10,10,.35)" strokeWidth={4} strokeLinecap="round" pathLength={1} style={DASH0} fill="none" />
            <path id="v2-ah" d="M728 428 L702 415 M728 428 L702 441" stroke="rgba(10,10,10,.35)" strokeWidth={4} strokeLinecap="round" fill="none" opacity={0} />
          </g>

          {/* Scene 3 — 23+ lenders */}
          <g id="sv3" opacity={0}>
            <image href="/assets/char-advisor-sm.png" x={288.6} y={230} width={82.9} height={240} />
            <text x={330} y={512} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A">Samruthi One</text>
            <path id="v3-l1" d="M436 352 L700 165" stroke="rgba(10,10,10,.45)" strokeWidth={3} pathLength={1} style={DASH0} fill="none" />
            <path id="v3-l2" d="M440 368 L830 360" stroke="rgba(10,10,10,.45)" strokeWidth={3} pathLength={1} style={DASH0} fill="none" />
            <path id="v3-l3" d="M436 385 L700 545" stroke="rgba(10,10,10,.45)" strokeWidth={3} pathLength={1} style={DASH0} fill="none" />
            <BankBuilding x={770} y={175} label="Bank" />
            <BankBuilding x={900} y={360} label="Bank" />
            <BankBuilding x={770} y={545} label="NBFC" />
            <g id="v3-seal" opacity={0}>
              <text x={962} y={276} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={18} fill="#0A0A0A">Best offer</text>
              <circle cx={964} cy={314} r={22} fill="rgba(30,36,48,.14)" />
              <circle cx={962} cy={312} r={22} fill="url(#ill-coin)" stroke="#1E2430" strokeWidth={3} />
              <path id="v3-check" d="M951 312 L959 321 L974 303" stroke="#0A0A0A" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" pathLength={1} style={DASH0} />
            </g>
          </g>

          {/* Scene 4 — Funded */}
          <g id="sv4" opacity={0}>
            <g id="v4-zoom">
              <image href="/assets/char-handshake-pair-sm.png" x={511} y={260} width={178} height={240} />
              <text x={546} y={542} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A">You</text>
              <text x={656} y={542} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A">Us</text>
            </g>
            <g id="v4-coin" opacity={0}>
              <circle cx={605} cy={336} r={90} fill="rgba(30,36,48,.12)" />
              <circle cx={600} cy={330} r={90} fill="url(#ill-coin)" stroke="#1E2430" strokeWidth={4} />
              <circle cx={600} cy={330} r={70} fill="none" stroke="rgba(138,109,0,.5)" strokeWidth={3} />
              <text x={600} y={362} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={800} fontSize={88} fill="#6B5200">₹</text>
              <path d="M552 284 A 66 66 0 0 1 608 264" stroke="rgba(255,255,255,.85)" strokeWidth={8} strokeLinecap="round" fill="none" />
            </g>
            <g id="v4-fast" opacity={0}>
              <rect x={510} y={470} width={180} height={38} rx={19} fill="#0A0A0A" />
              <text x={600} y={495} textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight={800} fontSize={18} fill="#F7C83C">Days, not months</text>
            </g>
            <path id="v4-rays" d="M600 218 L600 186 M667 263 L690 240 M533 263 L510 240 M702 330 L734 330 M498 330 L466 330" stroke="#E6B400" strokeWidth={5} strokeLinecap="round" fill="none" pathLength={1} style={DASH0} />
          </g>
        </svg>

        {/* Scroll cue */}
        <div id="story-cue" style={{ position: 'relative', flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, pointerEvents: 'none', padding: '14px 0 24px' }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", background: '#0A0A0A', color: '#fff', fontSize: 17, fontWeight: 700, padding: '16px 30px', borderRadius: 999, boxShadow: '0 8px 24px rgba(10,10,10,.18)' }}>Scroll down to see how it works</span>
          <span style={{ width: 52, height: 52, borderRadius: '50%', background: '#F7C83C', border: '3px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#0A0A0A', animation: 'cueBounce 1.2s ease-in-out infinite' }}>↓</span>
        </div>

        {/* Progress rail */}
        <div id="story-rail" style={{ position: 'absolute', right: 26, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(10,10,10,.15)', transition: 'all .3s' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
