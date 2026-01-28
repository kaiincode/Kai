"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { MenuOverlay } from "@/components/menu-overlay"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { FixedUIElements } from "@/components/fixed-ui-elements"
import { CustomCursor } from "@/components/custom-cursor"

export default function ProfilePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTextHovered, setIsTextHovered] = useState(false)
  const [isFooterOpen, setIsFooterOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {!isLoading && (
        <>
          {/* Custom Cursor */}
          <CustomCursor />

          <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} isFooterOpen={isFooterOpen} />

          {/* Fixed UI Elements */}
          <FixedUIElements onMenuClick={() => setIsMenuOpen(true)} scrollToTop={scrollToTop} />

          {/* Profile Content with Background */}
          <ProfileWithBackground isTextHovered={isTextHovered} setIsTextHovered={setIsTextHovered} setIsFooterOpen={setIsFooterOpen} />
        </>
      )}
    </>
  )
}

interface ProfileWithBackgroundProps {
  isTextHovered: boolean
  setIsTextHovered: (value: boolean) => void
  setIsFooterOpen: (isOpen: boolean) => void
}

function ProfileWithBackground({ isTextHovered, setIsTextHovered, setIsFooterOpen }: ProfileWithBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })
  
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
        {/* Profile section with white text */}
        <div className="text-white">
          <section className="relative min-h-screen bg-transparent py-32">
            {/* Vertical lines pattern - animated from top to bottom */}
            <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
              {[10, 30, 50, 70, 90].map((left, i) => (
                <motion.div
                  key={`v-${left}`}
                  className="absolute left-0 top-0 bottom-0 w-[0.5px] bg-white origin-top"
                  style={{ left: `${left}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                />
              ))}
            </div>

            <div className="relative z-10">
              {/* Top section with Quote, Image, and Profile heading */}
              <div className="relative mb-12 sm:mb-18 lg:mb-24 px-4 sm:px-6 lg:px-8 xl:px-[10%]">
                {/* Quote Section - at the top right */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden mb-16"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-right"
                  >
                    <h3 className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl leading-tight font-light">
                      <em className="font-serif not-italic">Unforgettable</em> impact and emotion
                      <br />
                      Touching in the <em className="font-serif not-italic">heart</em>,
                      <br />
                      Like a <em className="font-serif not-italic">blue flame</em> igniting.
                    </h3>
                  </motion.div>
                </motion.div>

                {/* Image (left) and Profile Heading (right, aligned to bottom of image) */}
                <div className="relative flex flex-col lg:flex-row items-end gap-8 lg:gap-0">
                  {/* Image - left side, spans to center line (50%) */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative w-full lg:w-1/2"
                  >
                    <div className="overflow-hidden shadow-2xl">
                      <img
                        src="/profile/profile.jpg"
                        alt="Profile visual"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Profile Heading - right side, aligned to bottom */}
                  <div className="flex-1 overflow-hidden flex justify-center lg:justify-end items-end pb-0">
                    <motion.h2 
                      className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-none"
                      initial="hidden"
                      animate="visible"
                      transition={{ staggerChildren: 0.03, delayChildren: 0.8 }}
                    >
                      {"Profile".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.h2>
                  </div>
                </div>
              </div>

              {/* Bio Section - full width like before */}
              <div className="relative px-4 sm:px-6 lg:px-8 xl:px-[10%]">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden mb-16"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <p className="text-lg leading-relaxed font-light">
                      Panacea, AI Engineer and Web Developer. Born in 2005. I'm a Computer Science student at Swinburne University of Technology majoring in Artificial Intelligence, with hands-on experience across AI systems, Web3 platforms, and full-stack development. My journey began with a deep curiosity for how intelligent systems can shape user experiences — leading me to build projects that merge AI with blockchain, data visualization, and creative media.
                    </p>

                    <p className="text-sm leading-relaxed font-light text-white/80">
                      I've developed and led several innovative applications, including VOID, an award-winning AI-powered NFT platform (Best AI App – Solana Swinburne Hackathon 2025), and N.OVA, an AI-native Web3 identity platform showcased at the Solana Colosseum Breakout Hackathon 2025. My recent work explores agentic AI systems and Retrieval-Augmented Generation (RAG) pipelines for mental health and personal identity applications.
                    </p>
                  </motion.div>
                </motion.div>

              </div>

              {/* Large scrolling text - full width, like works section */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center overflow-hidden my-64 w-full"
                style={{ height: '200px', marginLeft: 0, marginRight: 0 }}
                onMouseEnter={() => setIsTextHovered(true)}
                onMouseLeave={() => setIsTextHovered(false)}
              >
                <motion.div
                  animate={{ x: isTextHovered ? 0 : [0, -2000] }}
                  transition={{ 
                    duration: isTextHovered ? 0.5 : 30, 
                    repeat: isTextHovered ? 0 : Infinity, 
                    ease: isTextHovered ? "easeOut" : "linear" 
                  }}
                  className="whitespace-nowrap text-[40px] sm:text-[60px] md:text-[100px] lg:text-[150px] xl:text-[200px] font-light text-white opacity-100"
                >
                  AI ENGINEER AND WEB DEVELOPER • AI ENGINEER AND WEB DEVELOPER •
                </motion.div>
              </motion.div>

              {/* Sections container - full width, but content aligned to center line */}
              <div className="relative px-4 sm:px-6 lg:px-8 xl:px-[10%]">

                {/* Skills Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden"
                  style={{ height: '60vh' }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="border-t-2 border-white/60 origin-left"
                  />
                  <div className="pt-8 sm:pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
                    <div className="overflow-hidden">
                      <motion.h3 
                        className="text-3xl font-light mb-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.02, delayChildren: 0.6 }}
                      >
                        {"Skills".split("").map((char, i) => (
                          <motion.span
                            key={i}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            style={{ display: "inline-block" }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </motion.h3>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="text-lg leading-relaxed font-light"
                    >
                      <p>
                        Python / JavaScript / TypeScript / Kotlin / C++ / C# / PHP / SQL / React.js / Next.js / Node.js / Tailwind CSS / LangChain / PyTorch / Hugging Face / Solana / Ethereum / Web3.js / Solidity
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Tools Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden"
                  style={{ height: '60vh' }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="border-t-2 border-white/60 origin-left"
                  />
                  <div className="pt-8 sm:pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
                    <div className="overflow-hidden">
                      <motion.h3 
                        className="text-3xl font-light mb-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.02, delayChildren: 0.7 }}
                      >
                        {"Tools".split("").map((char, i) => (
                          <motion.span
                            key={i}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            style={{ display: "inline-block" }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </motion.h3>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="text-lg leading-relaxed font-light"
                    >
                      <p>Git / GitHub Actions / Docker / VS Code / Supabase / Pinata / IPFS / GroqCloud / Replicate / D3.js / Three.js</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Awards Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden"
                  style={{ height: '60vh' }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="border-t-2 border-white/60 origin-left"
                  />
                  <div className="pt-8 sm:pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
                    <div className="overflow-hidden">
                      <motion.h3 
                        className="text-3xl font-light mb-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.02, delayChildren: 0.8 }}
                      >
                        {"Awards".split("").map((char, i) => (
                          <motion.span
                            key={i}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            style={{ display: "inline-block" }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </motion.h3>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="text-lg leading-relaxed font-light space-y-2"
                    >
                      <p>Best AI App – Solana Swinburne Hackathon 2025 (VOID)</p>
                      <p>Solana Colosseum Breakout Hackathon 2025 Participant (N.OVA)</p>
                      <p>NASA Space Apps Challenge 2025 Participant (ClimaLens)</p>
                      <p>Best Performance – Computing Technology Innovative Project (Flipside)</p>
                      <p>Best Performance – Big Data Architecture and Application</p>
                    </motion.div>
                  </div>
                </motion.div>

              {/* Final Quote */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="border-t-2 border-white/60 origin-left"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="pt-32 mt-16"
                >
                  <h3 className="text-2xl sm:text-4xl lg:text-6xl leading-tight font-light">
                    Building the <em className="font-serif not-italic">future</em>,
                    <br />
                    one <em className="font-serif not-italic">intelligent</em> solution at a time.
                  </h3>
                </motion.div>
              </motion.div>
              </div>
            </div>
          </section>
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
