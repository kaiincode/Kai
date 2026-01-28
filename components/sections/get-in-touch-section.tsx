"use client"

import { motion, useAnimate } from "framer-motion"
import { useState, useEffect } from "react"

export function GetInTouchSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  // When hover state changes, trigger a new animation cycle
  useEffect(() => {
    if (isHovered) {
      setAnimationKey(prev => prev + 1)
    }
  }, [isHovered])

  return (
    <section className="relative min-h-[150vh] flex items-center justify-center overflow-hidden py-32">
      {/* Vertical lines pattern - continuing to footer */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute left-[10%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[30%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[70%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[90%] top-0 bottom-0 w-[0.5px] bg-white" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Radar ripple effect - 3 waves per loop */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`${animationKey}-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: ['0px', '1000px'],
                height: ['0px', '1000px'],
                opacity: [0, 0.7, 0.5, 0],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.35,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.55,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          ))}
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[13rem] font-light tracking-tight cursor-pointer select-none" data-cursor-text="LET'S TALK">
          Get in Touch
        </h2>
      </motion.div>
    </section>
  )
}
