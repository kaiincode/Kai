"use client"

import { useMemo, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { MenuOverlay } from "@/components/menu-overlay"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { FixedUIElements } from "@/components/fixed-ui-elements"
import { CustomCursor } from "@/components/custom-cursor"

const projects = [
  { 
    id: 1, 
    title: "Kai", 
    category: "PORTFOLIO", 
    type: "PLAY",
    span: "col-span-1 sm:col-span-2 lg:col-span-3 row-span-1 lg:row-span-2",
    image: "/works/panacea/panacea.png"
  },
  { 
    id: 2, 
    title: "SweetLife", 
    category: "WEB, FRONTEND", 
    type: "PROJECT",
    span: "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 sm:row-span-2",
    image: "/works/sweetlife/sweetlife.png"
  },
  { 
    id: 3, 
    title: "Flipside", 
    category: "WEB3, DATA", 
    type: "PROJECT",
    span: "col-span-1 sm:col-span-2 lg:col-span-1 row-span-1 sm:row-span-2 lg:row-span-2",
    image: "/works/flipside/flipside.png"
  },
  { 
    id: 4, 
    title: "VOID", 
    category: "AI, WEB3", 
    type: "PROJECT",
    span: "col-span-1 row-span-1 lg:row-span-1",
    image: "/works/void/void.png"
  },
  { 
    id: 5, 
    title: "N.OVA", 
    category: "AI, WEB3", 
    type: "PROJECT",
    span: "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1",
    image: "/works/n-ova/n-ova.png"
  },
  { 
    id: 6, 
    title: "Genie", 
    category: "AI, DATA", 
    type: "PROJECT",
    span: "col-span-1 row-span-1 sm:row-span-2 lg:row-span-2",
    image: "/works/genie/genie.png"
  },
  { 
    id: 7, 
    title: "LongChau PMS", 
    category: "WEB, E-COMMERCE", 
    type: "PROJECT",
    span: "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 sm:row-span-2 lg:row-span-2",
    image: "/works/longchau-pms/longchau-pms.png"
  },
  { 
    id: 8, 
    title: "Tribalyn", 
    category: "AI, VTON", 
    type: "PROJECT",
    span: "col-span-1 sm:col-span-2 row-span-1 lg:row-span-1",
    image: "/works/tribalyn/tribalyn.png"
  },
  { 
    id: 9, 
    title: "ClimaLens", 
    category: "AI, DATA", 
    type: "PROJECT",
    span: "col-span-1 row-span-1 lg:row-span-1",
    image: "/works/climalens/climalens.png"
  },
]

export default function WorksPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedType, setSelectedType] = useState("ALL")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
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

          {/* Works Content with Background */}
          <WorksWithBackground selectedType={selectedType} setSelectedType={setSelectedType} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setIsFooterOpen={setIsFooterOpen} />
        </>
      )}
    </>
  )
}

interface WorksWithBackgroundProps {
  selectedType: string
  setSelectedType: (type: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  setIsFooterOpen: (isOpen: boolean) => void
}

function WorksWithBackground({ selectedType, setSelectedType, selectedCategory, setSelectedCategory, setIsFooterOpen }: WorksWithBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] })
  
  const footerTransition = useTransform(scrollYProgress, [0.98, 1], [0, 1])
  
  // Auto-derived categories from projects (e.g., WEB, FRONTEND, etc.)
  const categories = useMemo(() => {
    const categorySet = new Set<string>(["ALL"]) // Always include ALL
    projects.forEach((project) => {
      if (!project.category) return
      project.category
        .split(",")
        .map(part => part.trim().toUpperCase())
        .filter(Boolean)
        .forEach(cat => categorySet.add(cat))
    })
    return Array.from(categorySet)
  }, [])
  
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
        {/* Works section with white text */}
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
              {/* Content container with proper alignment */}
              <div className="relative mb-20 px-4 sm:px-6 lg:px-8 xl:px-[10%]">
                {/* Works Heading and Filters on same line */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0">
                  {/* Works Heading - aligned to left */}
                  <div className="overflow-hidden">
                    <motion.h2 
                      className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-light tracking-tight leading-none"
                      initial="hidden"
                      animate="visible"
                      transition={{ staggerChildren: 0.03, delayChildren: 0.8 }}
                    >
                      {"Works".split("").map((char, i) => (
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

                  {/* Filters - aligned to right */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm"
                  >
                  <div>
                    <p className="text-white mb-4 font-serif not-italic">Type</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedType("ALL")}
                        className={`block transition-colors ${
                          selectedType === "ALL" ? "text-white" : "text-white/40 hover:text-white/60"
                        }`}
                      >
                        ALL
                      </button>
                      <button
                        onClick={() => setSelectedType("PROJECT")}
                        className={`block transition-colors ${
                          selectedType === "PROJECT" ? "text-white" : "text-white/40 hover:text-white/60"
                        }`}
                      >
                        PROJECT
                      </button>
                      <button
                        onClick={() => setSelectedType("PLAY")}
                        className={`block transition-colors ${
                          selectedType === "PLAY" ? "text-white" : "text-white/40 hover:text-white/60"
                        }`}
                      >
                        PLAY
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-white mb-4 font-serif not-italic">Category</p>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`block transition-colors ${
                            selectedCategory === category ? "text-white" : "text-white/40 hover:text-white/60"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  </motion.div>
                </div>
              </div>

              <div className="relative px-4 sm:px-6 lg:px-8 xl:px-[10%]">
                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px] gap-0 mb-32">
                  {projects
                    .filter(project => {
                      // Filter by category
                      const categoryMatch = selectedCategory === "ALL" || 
                        project.category.toUpperCase().includes(selectedCategory.toUpperCase())
                      
                      // Filter by type
                      const typeMatch = selectedType === "ALL" || 
                        (project.type && project.type.toUpperCase() === selectedType.toUpperCase())
                      
                      return categoryMatch && typeMatch
                    })
                    .map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`${project.span} group relative overflow-hidden`}
                    >
                      <Link 
                        href={`/works/${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                        className="block w-full h-full"
                      >
                        <div className={`relative w-full h-full flex items-center justify-center ${(project.title === "Flipside" || project.title === "LongChau PMS") ? "bg-white" : "bg-black"}`}>
                          {(() => {
                            const isLongChau = project.title === "LongChau PMS"
                            return (
                              <img
                                src={project.image}
                                alt={project.title}
                                className={isLongChau
                                  ? "w-full h-full object-contain transition-all duration-500"
                                  : "h-full w-auto min-w-full object-cover transition-all duration-500 group-hover:blur-md group-hover:scale-110"}
                              />
                            )
                          })()}

                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-start justify-end text-left p-8">
                            <h3 className="text-3xl font-light mb-2 text-white">{project.title}</h3>
                            <p className="text-sm text-white/60 tracking-wider">{project.category}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
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
