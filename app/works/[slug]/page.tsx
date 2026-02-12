"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MenuOverlay } from "@/components/menu-overlay"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { FixedUIElements } from "@/components/fixed-ui-elements"
import { CustomCursor } from "@/components/custom-cursor"

// Project data - you can expand this with more details
const projects = {
  "sweetlife": {
    id: 9,
    title: "SweetLife",
    category: "WEB, FRONTEND",
    type: "PROJECT",
    image: "/works/sweetlife/sweetlife.png",
    description: "A responsive website for an ice cream restaurant, built with semantic HTML, modern CSS, and vanilla JavaScript. Focused on delightful UI, accessibility, and performance.",
    credits: "Frontend: Kai",
    visitLink: "https://sweetlife.vercel.app"
  },
  "panacea": {
    id: 6,
    title: "Kai",
    category: "PORTFOLIO",
    type: "PLAY",
    image: "/works/panacea/panacea.png",
    description: "A modern portfolio website showcasing AI engineering and web development projects. Built with Next.js, TypeScript, and Framer Motion for smooth animations and interactions.",
    credits: "Design & Development: Kai",
    visitLink: "https://iamkai.vercel.app"
  },
  "flipside": {
    id: 1,
    title: "Flipside",
    category: "WEB3, DATA",
    type: "PROJECT",
    image: "/works/flipside/flipside.png",
    description: "A comprehensive blockchain analytics platform providing insights into DeFi protocols, NFT markets, and Web3 ecosystem data visualization.",
    credits: "Lead Developer: Kai",
    visitLink: "https://flipside-crypto.netlify.app"
  },
  "void": {
    id: 2,
    title: "VOID",
    category: "AI, WEB3",
    type: "PROJECT",
    image: "/works/void/void.png",
    description: "An AI-powered NFT platform that combines machine learning with blockchain technology to create intelligent digital art and gaming experiences.",
    credits: "AI Engineer: Kai",
    visitLink: "https://void-resonance.vercel.app"
  },
  "n-ova": {
    id: 3,
    title: "N.OVA",
    category: "AI, WEB3",
    type: "PROJECT",
    image: "/works/n-ova/n-ova.png",
    description: "An AI-native Web3 identity platform that leverages machine learning for decentralized identity verification and management.",
    credits: "AI Engineer: Kai",
    visitLink: "https://n-ova.vercel.app"
  },
  "genie": {
    id: 4,
    title: "Genie",
    category: "AI, DATA",
    type: "PROJECT",
    image: "/works/genie/genie.png",
    description: "An AI-powered mental health companion using RAG (Retrieval-Augmented Generation) to provide personalized support and guidance.",
    credits: "AI Engineer: Kai",
    visitLink: "https://genie.vercel.app"
  },
  "longchau-pms": {
    id: 8,
    title: "LongChau PMS",
    category: "WEB, E-COMMERCE",
    type: "PROJECT",
    image: "/works/longchau-pms/longchau-pms.png",
    description: "A comprehensive pharmacy management and e-commerce platform for Long Chau Pharmacy built with Next.js, TypeScript, and Supabase, covering inventory, orders, and storefront.",
    credits: "Full-stack: Kai",
    visitLink: "https://long-chau-pms.vercel.app"
  },
    "tribalyn": {
      id: 7,
      title: "Tribalyn",
      category: "AI, VTON",
      type: "PROJECT",
      image: "/works/tribalyn/tribalyn.png",
      description: "A virtual try-on tool for countries' traditional costumes using AI technology. Experience cultural heritage through immersive virtual fitting experiences.",
      credits: "AI Engineer: Kai",
      visitLink: "https://tribalyn.vercel.app"
    },
    "climalens": {
      id: 5,
      title: "ClimaLens",
      category: "AI, DATA",
      type: "PROJECT",
      image: "/works/climalens/climalens.png",
      description: "A climate data analytics platform using AI to analyze environmental data and provide insights for sustainability initiatives.",
      credits: "Data Scientist: Kai",
      visitLink: "https://climalens.vercel.app"
    }
}

// Project order for navigation
const projectOrder = ["panacea", "sweetlife", "flipside", "void", "n-ova", "genie", "longchau-pms", "tribalyn", "climalens"]

export default function ProjectDetailPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFooterOpen, setIsFooterOpen] = useState(false)
  const params = useParams()
  const slug = params.slug as string
  const project = projects[slug as keyof typeof projects]

  // Get current project index and calculate next/previous
  const currentIndex = projectOrder.indexOf(slug)
  const nextIndex = (currentIndex + 1) % projectOrder.length
  const prevIndex = currentIndex === 0 ? projectOrder.length - 1 : currentIndex - 1
  
  const nextProject = projectOrder[nextIndex]
  const prevProject = projectOrder[prevIndex]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Project Not Found</h1>
          <Link href="/works" className="text-white/60 hover:text-white transition-colors">
            ← Back to Works
          </Link>
        </div>
      </div>
    )
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

          {/* Project Detail Content with Background */}
          <ProjectDetailWithBackground 
            project={project} 
            setIsFooterOpen={setIsFooterOpen}
            nextProject={nextProject}
            prevProject={prevProject}
          />
        </>
      )}
    </>
  )
}

interface ProjectDetailWithBackgroundProps {
  project: typeof projects[keyof typeof projects]
  setIsFooterOpen: (isOpen: boolean) => void
  nextProject: string
  prevProject: string
}

function ProjectDetailWithBackground({ project, setIsFooterOpen, nextProject, prevProject }: ProjectDetailWithBackgroundProps) {
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
        {/* Project section with white text */}
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
              {/* Project Heading */}
              <div className="mb-16 sm:mb-24 lg:mb-32 overflow-hidden px-4 sm:px-6 lg:px-8 xl:px-[10%]">
                <motion.h2 
                  className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-light tracking-tight"
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.03, delayChildren: 0.8 }}
                >
                  {project.title.split("").map((char, i) => (
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

              {/* Project Hero Image - Full Website Width */}
              <div className="relative mb-16 sm:mb-24 lg:mb-32 w-full px-4 sm:px-6 lg:px-8 xl:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden w-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>

              {/* Project Details Section */}
              <div className="relative px-4 sm:px-6 lg:px-8 xl:px-[10%]">
                <div className="pt-8 sm:pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 mb-16 sm:mb-24 lg:mb-32">
                  {/* Left Column - Project Info - Left aligned */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8 text-left"
                  >
                    <div>
                      <h3 className="text-sm tracking-wider font-light text-white/60 mb-2 font-serif not-italic">CATEGORY</h3>
                      <p className="text-lg font-light">{project.category}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm tracking-wider font-light text-white/60 mb-2 font-serif not-italic">TYPE</h3>
                      <p className="text-lg font-light">{project.type}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm tracking-wider font-light text-white/60 mb-2 font-serif not-italic">CREDITS</h3>
                      <p className="text-lg font-light">{project.credits}</p>
                    </div>
                  </motion.div>

                  {/* Right Column - Description and Link - Left aligned to center line */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-8 text-left"
                  >
                    <div>
                      <h3 className="text-sm tracking-wider font-light text-white/60 mb-4 font-serif not-italic">DESCRIPTION</h3>
                      <p className="text-lg font-light leading-relaxed">{project.description}</p>
                    </div>
                    
                    <div>
                      <a
                        href={project.visitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg font-light hover:opacity-60 transition-opacity"
                        data-cursor-text="VISIT PROJECT"
                      >
                        VISIT PROJECT <span className="text-sm">↗</span>
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Project Images Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-16"
                >
                  <h3 className="text-sm tracking-wider font-light text-white/60 mb-8">PROJECT IMAGES</h3>
                  
                  {/* Project images - Full width each */}
                  <div className="space-y-8">
                    {(() => {
                      // Get the project slug for image paths
                      const projectSlug = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
                      
                      // Define image counts for each project
                      const imageCounts: { [key: string]: number } = {
                        'climalens': 8,
                        'flipside': 7,
                        'genie': 6,
                        'longchau-pms': 11,
                        'n-ova': 14,
                        'panacea': 8,
                        'sweetlife': 7,
                        'tribalyn': 5,
                        'void': 7
                      }
                      
                      const imageCount = imageCounts[projectSlug] || 3 // Default to 3 if not found
                      
                      return Array.from({ length: imageCount }, (_, index) => (
                        <div key={index} className="w-full overflow-hidden aspect-video">
                          <img
                            src={`/works/${projectSlug}/${index + 1}.png`}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    })()}
                  </div>

                  {/* Navigation Section */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-8 sm:pt-12 lg:pt-16 gap-4 sm:gap-0">
                    {/* Previous Project */}
                    <Link 
                      href={`/works/${prevProject}`}
                      className="flex items-center gap-2 text-sm sm:text-lg font-light hover:opacity-60 transition-opacity"
                      data-cursor-text="PREVIOUS PROJECT"
                    >
                      <span className="text-sm">←</span>
                      <span className="hidden sm:inline">PREVIOUS WORKS</span>
                      <span className="sm:hidden">PREV</span>
                    </Link>

                    {/* Back to Works - Centered */}
                    <div className="flex-1 flex justify-center">
                      <Link 
                        href="/works"
                        className="flex items-center gap-2 text-sm sm:text-lg font-light hover:opacity-60 transition-opacity"
                        data-cursor-text="BACK TO WORKS"
                      >
                        <span className="hidden sm:inline">BACK TO ALL WORKS</span>
                        <span className="sm:hidden">ALL WORKS</span>
                      </Link>
                    </div>

                    {/* Next Project */}
                    <Link 
                      href={`/works/${nextProject}`}
                      className="flex items-center gap-2 text-sm sm:text-lg font-light hover:opacity-60 transition-opacity"
                      data-cursor-text="NEXT PROJECT"
                    >
                      <span className="hidden sm:inline">NEXT WORKS</span>
                      <span className="sm:hidden">NEXT</span>
                      <span className="text-sm">→</span>
                    </Link>
                  </div>
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
