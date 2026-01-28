"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useMemo, ReactNode } from "react"

export function ServiceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Complex motion transformations for wow effect
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180])
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 270])
  const rotate4 = useTransform(scrollYProgress, [0, 1], [0, -450])
  
  // Morphing circles - changing from circle to ellipse
  const rx1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [80, 120, 80, 50, 80])
  const ry1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [80, 50, 80, 120, 80])
  
  const rx2 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [120, 150, 100, 120])
  const ry2 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [120, 100, 150, 120])
  
  const rx3 = useTransform(scrollYProgress, [0, 0.5, 1], [160, 190, 160])
  const ry3 = useTransform(scrollYProgress, [0, 0.5, 1], [160, 130, 160])
  
  const rx4 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [200, 230, 180, 200])
  const ry4 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [200, 180, 230, 200])
  
  // Position shifts for dots
  const dotShift1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 15, 0])
  const dotShift2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -12, 0])
  
  // Opacity pulsing
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.5, 0.25])
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.45, 0.2])
  const opacity3 = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.35, 0.15])

  // Split intro text into lines for reveal animation
  const introLines: ReactNode[] = useMemo(
    () => [
      <>I combine <em className="font-serif not-italic">four</em> key areas with <em className="font-serif not-italic">AI</em> and blockchain expertise,</>,
      <>building <em className="font-serif not-italic">intelligent</em> systems that deliver transformative <em className="font-serif not-italic">digital experiences</em>.</>,
    ],
    []
  )

  return (
    <section ref={sectionRef} className="relative">
      {/* Vertical lines pattern - continuing from footer */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute left-[10%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[30%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[70%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[90%] top-0 bottom-0 w-[0.5px] bg-white" />
      </div>

      {/* Header + Intro */}
      <div className="relative z-10 pt-24" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <p className="text-xs tracking-wider font-light mb-6">[SERVICE]</p>
        </motion.div>
        
        {/* Intro text with horizontal reveal animation */}
        <div className="max-w-5xl mb-12">
          <div className="space-y-2">
            {introLines.map((node, i) => {
              // Calculate reveal progress for each line
              const lineStart = 0.05 + i * 0.04
              const lineEnd = lineStart + 0.25
              const lineReveal = useTransform(scrollYProgress, [lineStart, lineEnd], [0, 1])
              
              return (
                <div key={i} className="relative overflow-hidden">
                  {/* Base dark gray */}
                  <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight font-light text-gray-900">{node}</span>
                  {/* White reveal overlay */}
                  <motion.span
                    className="absolute inset-0 block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight font-light text-white"
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

      <div className="relative max-w-7xl mx-auto">
        {/* Left - Sticky Art - centered at 30% line (2nd line from left) */}
        <div className="absolute top-0 sticky h-screen flex items-center justify-center z-0" style={{ left: '17.5%', width: '30%' }}>
          <div className="relative w-[600px] h-[600px] hidden lg:block">
            {/* Central dot */}
            <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full">
              <circle cx="250" cy="250" r="7" fill="rgba(255,255,255,1)" />
              
              {/* Cross lines - extended longer with better visibility */}
              <line x1="10" y1="250" x2="490" y2="250" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="250" y1="10" x2="250" y2="490" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
              
              {/* Four cardinal dots at the ends of axes */}
              <circle cx="250" cy="10" r="6" fill="rgba(255,255,255,1)" />
              <circle cx="490" cy="250" r="6" fill="rgba(255,255,255,1)" />
              <circle cx="250" cy="490" r="6" fill="rgba(255,255,255,1)" />
              <circle cx="10" cy="250" r="6" fill="rgba(255,255,255,1)" />
            </svg>

            {/* Main four petal circles - solid stroke, rotating slowly */}
            <motion.svg 
              viewBox="0 0 500 500" 
              className="absolute inset-0 w-full h-full"
              style={{ rotate: rotate1 }}
            >
              <motion.circle 
                cx="250" 
                cy="155" 
                r="90" 
                fill="none" 
                stroke="rgba(255,255,255,0.7)" 
                strokeWidth="1.5"
                style={{ opacity: opacity1 }}
              />
              <motion.circle 
                cx="345" 
                cy="250" 
                r="90" 
                fill="none" 
                stroke="rgba(255,255,255,0.7)" 
                strokeWidth="1.5"
                style={{ opacity: opacity1 }}
              />
              <motion.circle 
                cx="250" 
                cy="345" 
                r="90" 
                fill="none" 
                stroke="rgba(255,255,255,0.7)" 
                strokeWidth="1.5"
                style={{ opacity: opacity1 }}
              />
              <motion.circle 
                cx="155" 
                cy="250" 
                r="90" 
                fill="none" 
                stroke="rgba(255,255,255,0.7)" 
                strokeWidth="1.5"
                style={{ opacity: opacity1 }}
              />
            </motion.svg>

            {/* Inner decorative circle - dashed, rotating opposite */}
            <motion.svg 
              viewBox="0 0 500 500" 
              className="absolute inset-0 w-full h-full"
              style={{ rotate: rotate2 }}
            >
              <motion.circle 
                cx="250" 
                cy="250" 
                r="75" 
                fill="none" 
                stroke="rgba(255,255,255,0.7)" 
                strokeWidth="1.5"
                strokeDasharray="6 6"
                style={{ opacity: opacity2 }}
              />
            </motion.svg>

            {/* Outer boundary circle - solid */}
            <motion.svg 
              viewBox="0 0 500 500" 
              className="absolute inset-0 w-full h-full"
              style={{ rotate: rotate3 }}
            >
              <motion.circle 
                cx="250" 
                cy="250" 
                r="185" 
                fill="none" 
                stroke="rgba(255,255,255,0.7)" 
                strokeWidth="1.5"
                style={{ opacity: opacity3 }}
              />
            </motion.svg>
          </div>
        </div>

        {/* Right - 4 full-screen services stacked - centered on mobile */}
        <div className="relative z-10 px-4 sm:px-8 lg:px-12 lg:ml-auto max-w-full lg:max-w-2xl">
          <div className="min-h-screen flex items-center text-white">
            <div>
              <p className="text-xs tracking-[0.3em] font-light mb-6 text-white/60 -ml-4">01</p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 tracking-tight ml-4">AI/ML Solutions</h3>
              <p className="text-base sm:text-lg leading-relaxed font-light text-white/90 ml-4">I design and build intelligent systems with LLMs, RAG pipelines, and self-refinement methods for smarter, context-aware user experiences across various AI-powered applications.</p>
            </div>
          </div>
          <div className="min-h-screen flex items-center text-white">
            <div>
              <p className="text-xs tracking-[0.3em] font-light mb-6 text-white/60 -ml-4">02</p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 tracking-tight ml-4">Full-Stack Web Development</h3>
              <p className="text-base sm:text-lg leading-relaxed font-light text-white/90 ml-4">I develop modern, responsive web applications using React, Next.js, and Node.js with integrated APIs and cloud databases, focusing on performance, scalability, and exceptional user experiences.</p>
            </div>
          </div>
          <div className="min-h-screen flex items-center text-white">
            <div>
              <p className="text-xs tracking-[0.3em] font-light mb-6 text-white/60 -ml-4">03</p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 tracking-tight ml-4">Web3 & Blockchain</h3>
              <p className="text-base sm:text-lg leading-relaxed font-light text-white/90 ml-4">I create decentralized platforms, NFT marketplaces, and AI-driven blockchain experiences on Solana and Ethereum. Building secure smart contracts and seamless wallet integrations for the next generation of Web3 applications.</p>
            </div>
          </div>
          <div className="min-h-screen flex items-center text-white">
            <div>
              <p className="text-xs tracking-[0.3em] font-light mb-6 text-white/60 -ml-4">04</p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 tracking-tight ml-4">Data Visualization</h3>
              <p className="text-base sm:text-lg leading-relaxed font-light text-white/90 ml-4">I build interactive data dashboards, generative media tools, and immersive 3D user interfaces for digital storytelling. Transforming complex data into engaging visual narratives that drive insights and decision-making.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
