'use client'
import { createContext, useContext, useRef, RefObject } from 'react'

const LogoAnchorContext = createContext<RefObject<HTMLDivElement | null>>({ current: null })

export function LogoAnchorProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <LogoAnchorContext.Provider value={ref}>
      {children}
    </LogoAnchorContext.Provider>
  )
}

export function useLogoAnchor() {
  return useContext(LogoAnchorContext)
}
