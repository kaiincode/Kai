"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"

interface FixedUIElementsProps {
  onMenuClick: () => void
  scrollToTop: () => void
}

export function FixedUIElements({ onMenuClick, scrollToTop }: FixedUIElementsProps) {
  const [percent, setPercent] = useState(0)
  
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
      setPercent(Math.round(p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  // Change to black when scroll is >= 98% (footer transition)
  const textColor = percent >= 98 ? 'text-black' : 'text-white'
  
  return (
    <>
      {/* Header - top left and right */}
      <div className={`fixed top-0 left-0 right-0 z-40 pt-8 transition-colors duration-300 ${textColor}`}>
        <Header onMenuClick={onMenuClick} />
      </div>

      {/* Back to Top - bottom right */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-12 z-40 text-xs tracking-wider font-light hover:opacity-80 transition-all duration-300 ${textColor}`}
        data-cursor-text="SCROLL TO TOP"
      >
        BACK TO TOP
      </button>

      {/* Scroll Percentage - bottom left */}
      <div className={`fixed bottom-8 left-12 z-40 text-xs tracking-wider font-light transition-colors duration-300 ${textColor}`}>
        SCROLL {percent}%
      </div>
    </>
  )
}

