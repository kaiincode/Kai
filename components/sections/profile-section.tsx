"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useMemo, useRef, ReactNode } from "react"

export function ProfileSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })

  // Opacity for the big Hello
  const helloOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 0.9, 1])

  // Lines with serif-emphasized words
  const lines: ReactNode[] = useMemo(
    () => [
      <>I'm <em className="font-serif not-italic">Kai</em>.</>,
      <>AI Engineer and <em className="font-serif not-italic">Web</em> Developer.</>,
      <>I build <em className="font-serif not-italic">intelligent</em> systems and</>,
      <>decentralized applications, based in</>,
      <>Ho Chi Minh City, Vietnam,</>,
      <>with AI and blockchain at the core.</>,
      <>I create experiences that empower</>,
      <>creativity and innovation,</>,
      <>transforming how we <em className="font-serif not-italic">connect</em> with technology.</>,
    ],
    []
  )

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-end justify-center overflow-hidden py-32 pb-48">
      {/* Large Hello at top-left */}
      <motion.h2
        style={{ opacity: helloOpacity }}
        className="absolute top-8 sm:top-12 lg:top-16 left-4 sm:left-8 lg:left-12 z-10 text-[3rem] sm:text-[6rem] lg:text-[8rem] xl:text-[12rem] leading-none font-light tracking-tight pointer-events-none select-none"
      >
        Hello
      </motion.h2>

      {/* Right-aligned profile block - positioned much lower */}
      <div className="relative z-20 px-4 sm:px-8 lg:px-12 w-full mb-8 sm:mb-12 lg:mb-16">
        <div className="relative max-w-4xl ml-auto mr-4 sm:mr-8 lg:mr-12 mt-24 sm:mt-36 lg:mt-48">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-xs tracking-wider font-light">[PROFILE]</p>
          </motion.div>

          {/* Lines: base dark gray text + white reveal overlay */}
          <div className="space-y-2 text-left">
            {lines.map((node, i) => {
              // Calculate reveal progress for each line
              const lineStart = 0.2 + i * 0.05
              const lineEnd = lineStart + 0.3
              const lineReveal = useTransform(scrollYProgress, [lineStart, lineEnd], [0, 1])
              
              return (
                <div key={i} className="relative overflow-hidden">
                  {/* Base dark gray/black */}
                  <span className="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-900">{node}</span>
                  {/* White reveal overlay - clips from right (100%) to left (0%) */}
                  <motion.span
                    className="absolute inset-0 block text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light text-white"
                    style={{
                      clipPath: useTransform(lineReveal, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`),
                    }}
                  >
                    {node}
                  </motion.span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}