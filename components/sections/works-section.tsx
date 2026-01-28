"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const projects = [
  {
    title: "Panacea",
    tags: "PORTFOLIO",
    gradient: "from-pink-500 to-purple-600",
    align: "center", // 30% to 70%
    image: "/index/panacea.png",
  },
  {
    title: "SweetLife",
    tags: "WEB, FRONTEND",
    gradient: "from-rose-500 to-pink-600",
    align: "left", // 10% to 50%
    image: "/index/sweetlife.png",
  },
  {
    title: "Flipside",
    tags: "WEB3, DATA",
    gradient: "from-orange-500 to-red-600",
    align: "left", // 10% to 50%
    image: "/index/flipside.png",
  },
  {
    title: "VOID",
    tags: "AI, WEB3",
    gradient: "from-purple-600 to-blue-500",
    align: "right", // 50% to 90%
    image: "/index/void.png",
  },
  {
    title: "N.OVA",
    tags: "AI, WEB3",
    gradient: "from-cyan-400 to-teal-600",
    align: "center", // 30% to 70%
    image: "/index/n-ova.png",
  },
  {
    title: "Genie",
    tags: "AI, DATA",
    gradient: "from-green-500 to-emerald-600",
    align: "left", // 10% to 50%
    image: "/index/genie.png",
  },
  {
    title: "LongChau PMS",
    tags: "WEB, E-COMMERCE",
    gradient: "from-emerald-500 to-teal-600",
    align: "right", // 50% to 90%
    image: "/index/longchau-pms.png",
  },
  {
    title: "Tribalyn",
    tags: "AI, VTON",
    gradient: "from-indigo-500 to-violet-600",
    align: "center", // 30% to 70%
    image: "/index/tribalyn.png",
  },
  {
    title: "ClimaLens",
    tags: "AI, DATA",
    gradient: "from-blue-500 to-cyan-500",
    align: "right", // 50% to 90%
    image: "/index/climalens.png",
  },
]

export function WorksSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const hoveredProjectData = projects.find(p => p.title === hoveredProject)

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dark overlay to hide original background on hover */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black z-0"
            style={{ opacity: 0.7 }}
          />
        )}
      </AnimatePresence>

      {/* Blurred background image on hover - using project image */}
      <AnimatePresence>
        {hoveredProject && hoveredProjectData && (
          <motion.div
            key={hoveredProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundImage: `url('${hoveredProjectData.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(60px) brightness(1.2)",
                opacity: 0.4
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical lines pattern - continuing from service */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden z-0">
        <div className="absolute left-[10%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[30%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[70%] top-0 bottom-0 w-[0.5px] bg-white" />
        <div className="absolute left-[90%] top-0 bottom-0 w-[0.5px] bg-white" />
      </div>
      
      {/* Scrolling text - always centered in viewport, below images */}
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <AnimatePresence mode="wait">
          {!hoveredProject ? (
            <motion.div
              key="default-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ x: [0, -2000] }}
                transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="whitespace-nowrap text-[80px] sm:text-[120px] lg:text-[150px] xl:text-[200px] font-light opacity-5"
              >
                WORKS • PORTFOLIO • PROJECTS • WORKS • PORTFOLIO • PROJECTS •
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={hoveredProject}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ x: [1200, -1200] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="whitespace-nowrap text-[100px] sm:text-[140px] lg:text-[180px] xl:text-[240px] font-light tracking-tight"
                style={{
                  WebkitTextStroke: "2px rgba(255, 255, 255, 0.6)",
                  color: "transparent",
                  textShadow: "0 0 40px rgba(255, 255, 255, 0.3)",
                }}
              >
                {hoveredProject} • {hoveredProject} • {hoveredProject} • {hoveredProject}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-24"
          style={{ paddingRight: '10%' }}
        >
          <p className="text-xs tracking-wider font-light text-right">[WORKS]</p>
        </motion.div>

        {/* Vertical stacked projects */}
        <div className="space-y-32">
          {projects.map((project, i) => {
            // Calculate position based on alignment
            const getPosition = () => {
              if (project.align === "left") {
                return { left: "10%" } // Desktop: 10% to 50%
              } else if (project.align === "right") {
                return { left: "50%" } // Desktop: 50% to 90%
              } else {
                return { left: "30%" } // Desktop: 30% to 70%
              }
            }

            const position = getPosition()

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Image container - 40% width on desktop, full width on mobile */}
                <div 
                  className={`relative w-full sm:w-[80%] lg:w-[40%] group cursor-pointer mx-auto lg:mx-0 ${
                    project.align === "left" ? "lg:left-[10%]" : 
                    project.align === "right" ? "lg:left-[50%]" : 
                    "lg:left-[30%]"
                  } lg:absolute`}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  data-cursor-text={`VIEW ${project.title.toUpperCase()}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full aspect-[16/9] overflow-hidden shadow-2xl bg-black"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} project`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Title and tags below image */}
                  <div className={`mt-6 ${project.align === "right" ? "lg:text-right" : project.align === "center" ? "lg:text-center" : ""}`}>
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 group-hover:opacity-60 transition-opacity">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/60 tracking-wider">{project.tags}</p>
                  </div>
                </div>
                
                {/* Spacer for layout */}
                <div className="aspect-[16/9]" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
