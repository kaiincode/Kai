"use client"

import { useEffect, useState, useRef } from "react"

export function CustomCursor() {
  const [cursorText, setCursorText] = useState<string | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        }
      })
      
      const target = e.target as HTMLElement
      const hoverText = target.getAttribute('data-cursor-text')
      if (hoverText !== cursorText) {
        setCursorText(hoverText)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorText])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999] flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          transform: "translate(0px, 0px)",
          width: cursorText ? '140px' : '100px',
          height: cursorText ? '140px' : '100px',
          marginLeft: cursorText ? '-70px' : '-50px',
          marginTop: cursorText ? '-70px' : '-50px',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white" />
        
        <div className="relative z-10 flex items-center justify-center">
          {cursorText ? (
            <span className="text-white text-xs font-light text-center px-3 leading-tight">
              {cursorText}
            </span>
          ) : (
            <span className="text-white text-xl font-light">+</span>
          )}
        </div>
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}

