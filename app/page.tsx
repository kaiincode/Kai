"use client"

import { useState, useRef } from "react"
import { useScroll, motion, useTransform, useMotionTemplate } from "framer-motion"
import { MenuOverlay } from "@/components/menu-overlay"
import { HeroSection } from "@/components/sections/hero-section"
import { ProfileSection } from "@/components/sections/profile-section"
import { ExpressionSection } from "@/components/sections/expression-section"
import { ServiceSection } from "@/components/sections/service-section"
import { WorksSection } from "@/components/sections/works-section"
import { GetInTouchSection } from "@/components/sections/get-in-touch-section"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { FixedUIElements } from "@/components/fixed-ui-elements"
import { CustomCursor } from "@/components/custom-cursor"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFooterOpen, setIsFooterOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      {/* Custom Cursor */}
      <CustomCursor />

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} isFooterOpen={isFooterOpen} />

      {/* Fixed UI elements with color transition */}
      <FixedUIElements onMenuClick={() => setIsMenuOpen(true)} scrollToTop={scrollToTop} />

      {/* Hero + Profile + Expression wrapper with scoped rotating sphere */}
      <HeroProfileWithSphere>
        <div className="relative z-10 text-white">
        <HeroSection onMenuClick={() => setIsMenuOpen(true)} isLoadingComplete={!isLoading} />
        <ProfileSection />
        <ExpressionSection />
        </div>
      </HeroProfileWithSphere>

      {/* Services to Get In Touch + Footer with /background.png (scoped sticky) */}
      <ServicesGetInTouchFooterWithBackground setIsFooterOpen={setIsFooterOpen} />
    </>
  )
}

function HeroProfileWithSphere({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  // Map the sphere evolution across hero -> profile -> expression
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1.5, 3.0, 4.2, 1.2])
  const blurPx = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 8, 22, 28])
  const filter = useMotionTemplate`blur(${blurPx}px)`
  const opacity = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [1, 1, 0.6, 0])

  return (
    <div ref={wrapperRef} className="relative bg-black">
      <motion.div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0" style={{ opacity }}>
        <motion.img
          src="/index/gradient-sphere.png"
          alt="Gradient Sphere"
          className="w-[66vmin] h-[66vmin] object-contain"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          style={{ scale, filter, willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        />
      </motion.div>
      {children}
      </div>
  )
}

interface ServicesGetInTouchFooterWithBackgroundProps {
  setIsFooterOpen: (isOpen: boolean) => void
}

function ServicesGetInTouchFooterWithBackground({ setIsFooterOpen }: ServicesGetInTouchFooterWithBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })
  
  // Quick transition at 98%+
  const footerTransition = useTransform(scrollYProgress, [0.98, 1], [0, 1])
  
  return (
    <div ref={wrapperRef} className="relative">
      {/* Sticky background image */}
      <div className="sticky top-0 h-0 z-0">
        <div
          className="h-screen w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background.png')" }}
        />
      </div>
      
      <div className="relative z-10">
        {/* Service, Works, GetInTouch with white text */}
        <div className="text-white">
          <ServiceSection />
          <WorksSection />
          <GetInTouchSection />
        </div>
        
        {/* Footer with transition at 98% */}
        <motion.div 
          className="relative"
          style={{
            backgroundColor: useTransform(footerTransition, (v) => `rgba(255, 255, 255, ${v})`),
          }}
        >
          <Footer transitionProgress={footerTransition} onFooterOpen={setIsFooterOpen} />
        </motion.div>
      </div>
    </div>
  )
}
