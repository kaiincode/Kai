"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show image first
    const imageTimer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(imageTimer)
  }, [])

  useEffect(() => {
    if (!showContent) return

    // Counter from 1 to 100 with easing (fast at start, slow at end)
    const startTime = Date.now()
    const duration = 3000
    
    // Ease out cubic function
    const easeOutCubic = (t: number) => {
      return 1 - Math.pow(1 - t, 3)
    }
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Apply easing and map to 1-100
      const easedProgress = easeOutCubic(progress)
      const currentCount = Math.floor(easedProgress * 99) + 1 // 1 to 100
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Ensure we hit 100
        setCount(100)
        // Wait a bit before completing
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(() => {
            onLoadingComplete()
          }, 600) // Wait for exit animation
        }, 400)
      }
    }
    
    requestAnimationFrame(animate)
  }, [onLoadingComplete, showContent])

  // Calculate progress for circle animation (0 to 1)
  const progress = (count - 1) / 99

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Central container with background-circle.png */}
          <div className="relative flex items-center justify-center">
            {/* Static background circle image - slightly larger than ring */}
            <motion.div
              className="absolute w-[280px] h-[280px]"
              initial={{ opacity: 0, scale: 1.0 }}
              animate={{ 
                opacity: 0.6,
                scale: 1
              }}
              transition={{ 
                opacity: { duration: 0.6, ease: "easeOut" },
                scale: { duration: 0.6, ease: "easeOut" }
              }}
              style={{
                backgroundImage: "url('/background-circle.png')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Animated white circle ring - draws from left and right points clockwise */}
            <motion.div
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
                {/* Upper arc - starts from left (180°), goes clockwise to right (0°/360°) */}
                <motion.path
                  d="M 5,110 A 105,105 0 0,1 215,110"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: showContent ? progress : 0 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
                
                {/* Lower arc - starts from right (0°), goes clockwise to left (180°) */}
                <motion.path
                  d="M 215,110 A 105,105 0 0,1 5,110"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: showContent ? progress : 0 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            {/* Counter text in the center - smaller font */}
            <motion.div
              className="relative z-10 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.span
                key={count}
                className="text-xl font-light text-white tabular-nums"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05 }}
              >
                {count}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

