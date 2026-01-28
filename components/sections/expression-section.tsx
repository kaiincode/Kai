"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ExpressionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // 4 corners + 1 final center fullscreen
  const baseTargets = [
    { x: -48, y: -40 }, // 1 top-left: Flipside
    { x: 48, y: -40 },  // 2 top-right: VOID
    { x: -48, y: 40 },  // 3 bottom-left: N.OVA
    { x: 48, y: 40 },   // 4 bottom-right: Genie
    { x: 0, y: 0 },     // 5 center → fullscreen: ClimaLens
  ]

  // Images from works folder
  const images = [
    "/works/flipside/flipside.png",
    "/works/void/void.png",
    "/works/n-ova/n-ova.png",
    "/works/genie/genie.png",
    "/works/climalens/climalens.png",
  ]

  // Allocate timeline windows for 5 animations
  const windowSize = 0.15
  const windowGap = 0.03

  const items = baseTargets.map((t, i) => {
    const start = 0.12 + i * (windowSize + windowGap)
    const edge = start + windowSize * 0.55
    const off = start + windowSize

    const isLast = i === baseTargets.length - 1

    const fullEnd = isLast ? off + 0.18 : off

    const x = isLast
      ? useTransform(scrollYProgress, [start, edge, off, fullEnd], ["0%", "0%", "0%", "0%"])
      : useTransform(scrollYProgress, [start, edge, off], ["0%", `${t.x}%`, `${t.x * 2}%`])

    const y = isLast
      ? useTransform(scrollYProgress, [start, edge, off, fullEnd], ["0%", "0%", "0%", "0%"])
      : useTransform(scrollYProgress, [start, edge, off], ["0%", `${t.y}%`, `${t.y * 2}%`])

    const scale = isLast
      ? useTransform(scrollYProgress, [start, edge, off, fullEnd], [0.6, 0.8, 1.2, 9])
      : useTransform(scrollYProgress, [start, edge, off], [0.6, 1, 0.9])

    const opacity = isLast
      ? useTransform(scrollYProgress, [0, start - 0.01, start, fullEnd], [0, 0, 1, 1])
      : useTransform(scrollYProgress, [start - 0.02, start, edge, off], [0, 1, 1, 0])

    const zIndex = isLast ? 30 : 5

    return { x, y, scale, opacity, zIndex, isLast, fullEnd }
  })

  const lastFullEnd = (items[items.length - 1] as any).fullEnd
  // Heading disappears when last image appears
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12 + 4 * (windowSize + windowGap) - 0.05, 0.12 + 4 * (windowSize + windowGap), 1], [1, 1, 0, 0])

  return (
    <section ref={sectionRef} className="relative min-h-[400vh]">
      {/* Sticky full-screen stage */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Centered heading */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.h2
            style={{ opacity: headingOpacity }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight font-light text-center px-6"
          >
            <em className="font-serif not-italic">Innovating</em> with Intelligence.
            <br />
            Continuously <em className="font-serif not-italic">Building</em>
            <br />
            Smart <em className="font-serif not-italic">and</em> Decentralized Solutions.
          </motion.h2>
        </div>

        {/* Stage center: rectangles emerge and fly; last scales to fullscreen */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
          {items.map((it, i) => {
            const isLast = i === items.length - 1
            return (
              <motion.div
                key={i}
                style={{ x: it.x, y: it.y, scale: it.scale, opacity: it.opacity, zIndex: it.zIndex }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black ${
                  isLast 
                    ? 'w-screen h-screen flex items-center justify-center' 
                    : 'w-[90vw] max-w-[640px] h-auto aspect-video border border-white/25'
                }`}
              >
                <img
                  src={images[i]}
                  alt={`Project ${i + 1}`}
                  className={isLast ? "h-full w-auto object-cover" : "w-full h-full object-cover"}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
