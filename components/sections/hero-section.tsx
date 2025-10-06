"use client"

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface HeroSectionProps {
  onMenuClick: () => void
  isLoadingComplete?: boolean
}

// Glitch animation for labels
const glitchVariants = {
  hidden: { 
    opacity: 0,
    filter: "blur(10px)",
  },
  glitch: {
    opacity: [0, 0.3, 0, 0.7, 0, 1],
    x: [0, -2, 3, -1, 2, 0],
    y: [0, 2, -3, 1, -2, 0],
    filter: ["blur(10px)", "blur(5px)", "blur(8px)", "blur(3px)", "blur(5px)", "blur(0px)"],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
  }
}

export function HeroSection({ onMenuClick, isLoadingComplete = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.9])
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 14])
  const filter = useMotionTemplate`blur(${blurPx}px)`
  
  // Fade out pattern when scrolling out of hero section
  const patternOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.3, 0.15, 0])

  useEffect(() => {
    // Trigger loading animation only after main loading is complete
    if (isLoadingComplete) {
      const timer = setTimeout(() => setIsLoaded(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isLoadingComplete])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
        {/* Black background overlay - 50% left side, above sphere but below text/pattern - ONLY IN HERO */}
        <motion.div 
          className="fixed left-0 top-0 h-screen w-1/2 bg-black z-[1]"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]) }}
        />
        
        {/* Vertical and horizontal lines with intersection circles - white pattern - FIXED with fade out and draw animation */}
       <motion.div className="fixed inset-0 pointer-events-none overflow-hidden z-10" style={{ opacity: patternOpacity }}>
         {/* 5 vertical lines - draw from top to bottom */}
         {[10, 30, 50, 70, 90].map((left, i) => (
           <motion.div
             key={`v-${left}`}
             className="absolute top-0 bottom-0 w-[0.5px] bg-white"
             style={{ left: `${left}%` }}
             initial={{ scaleY: 0, originY: 0 }}
             animate={isLoaded ? { scaleY: 1 } : {}}
             transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeInOut" }}
           />
         ))}
         
         {/* 5 horizontal lines - draw from left to right */}
         {[10, 30, 50, 70, 90].map((top, i) => (
           <motion.div
             key={`h-${top}`}
             className="absolute left-0 right-0 h-[0.5px] bg-white"
             style={{ top: `${top}%` }}
             initial={{ scaleX: 0, originX: 0 }}
             animate={isLoaded ? { scaleX: 1 } : {}}
             transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: "easeInOut" }}
           />
         ))}
         
         {/* Large overlapping circles - draw stroke animation */}
         {[10, 30, 50, 70, 90].map((left, i) => (
           <motion.div
             key={`circle-${left}`}
             className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-white"
             style={{ left: `${left}%`, width: '80vh', height: '80vh' }}
             initial={{ pathLength: 0, opacity: 0 }}
             animate={isLoaded ? { pathLength: 1, opacity: 1 } : {}}
             transition={{ duration: 1.5, delay: 1.3 + i * 0.15, ease: "easeInOut" }}
           />
         ))}
         
         {/* Additional circles at 30% and 70% height */}
         {[30, 50, 70].map((left, i) => (
           <motion.div
             key={`circle-top-${left}`}
             className="absolute top-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-white"
             style={{ left: `${left}%`, width: '60vh', height: '60vh' }}
             initial={{ pathLength: 0, opacity: 0 }}
             animate={isLoaded ? { pathLength: 1, opacity: 1 } : {}}
             transition={{ duration: 1.5, delay: 2.0 + i * 0.15, ease: "easeInOut" }}
           />
         ))}
         
         {[30, 50, 70].map((left, i) => (
           <motion.div
             key={`circle-bottom-${left}`}
             className="absolute top-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-white"
             style={{ left: `${left}%`, width: '60vh', height: '60vh' }}
             initial={{ pathLength: 0, opacity: 0 }}
             animate={isLoaded ? { pathLength: 1, opacity: 1 } : {}}
             transition={{ duration: 1.5, delay: 2.5 + i * 0.15, ease: "easeInOut" }}
           />
         ))}
       </motion.div>

      {/* Category Labels - glitch effect animation - responsive */}
      {[
        { text: "[AI/ML SOLUTIONS]", left: "8%", cursor: "AI & MACHINE LEARNING", delay: 2.8 },
        { text: "[WEB DEVELOPMENT]", left: "32%", cursor: "FULL-STACK DEVELOPMENT", delay: 3.0 },
        { text: "[WEB3 & BLOCKCHAIN]", left: "60%", cursor: "DECENTRALIZED APPS", delay: 3.2 },
        { text: "[DATA VISUALIZATION]", right: "8%", cursor: "INTERACTIVE DASHBOARDS", delay: 3.4 },
      ].map((label, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={isLoaded ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(2px)" }}
          transition={{ delay: label.delay, duration: 0.8, ease: "easeOut" }}
          className="absolute top-[50%] -translate-y-[100%] text-[9px] sm:text-[10px] lg:text-xs tracking-wider font-light z-20 hidden sm:block"
          style={label.left ? { left: label.left } : { right: label.right }}
          data-cursor-text={label.cursor}
        >
          {label.text}
        </motion.div>
      ))}

      {/* Right-side mission statement - smooth fade in - responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 3.8, duration: 1 }}
        className="absolute right-4 sm:right-8 lg:right-12 top-16 sm:top-24 lg:top-40 max-w-[200px] sm:max-w-xs lg:max-w-md text-right z-20 hidden sm:block"
      >
        <p className="text-[8px] sm:text-[9px] lg:text-[11px] leading-relaxed tracking-wide font-light">
          I CREATE INTELLIGENT, INTERACTIVE, AND DECENTRALIZED DIGITAL EXPERIENCES COMBINING AI REASONING,
          BLOCKCHAIN TECHNOLOGY, AND MODERN WEB FRAMEWORKS TO BUILD PRODUCTS THAT EMPOWER CREATIVITY.
        </p>
      </motion.div>

      {/* Main Content - smooth fade in - responsive */}
      <main className="relative z-20 px-4 sm:px-8 lg:px-12 flex items-center min-h-[calc(100vh-100px)]">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 4.2, duration: 1.2 }}
            className="max-w-4xl mt-8 sm:mt-16 lg:mt-32 xl:mt-92"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight font-light tracking-tight">
              Building <em className="font-serif not-italic">Intelligent</em> Solutions,
              <br />
              <em className="font-serif not-italic">Empowering</em> the Future <em className="font-serif not-italic">of</em> Tech.
            </h1>
          </motion.div>
        </div>
      </main>
    </section>
  )
}
