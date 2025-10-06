"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useRef } from "react"

const projects = [
  {
    title: "Kai",
    tags: "PORTFOLIO",
    gradient: "from-pink-500 to-purple-600",
    align: "center",
    image: "/index/panacea.png",
  },
  {
    title: "SweetLife",
    tags: "WEB, FRONTEND",
    gradient: "from-rose-500 to-pink-600",
    align: "right",
    image: "/index/sweetlife.png",
  },
  {
    title: "Flipside",
    tags: "WEB3, DATA",
    gradient: "from-orange-500 to-red-600",
    align: "left",
    image: "/index/flipside.png",
  },
  {
    title: "VOID",
    tags: "AI, WEB3",
    gradient: "from-purple-600 to-blue-500",
    align: "center",
    image: "/index/void.png",
  },
  {
    title: "N.OVA",
    tags: "AI, WEB3",
    gradient: "from-cyan-400 to-teal-600",
    align: "right",
    image: "/index/n-ova.png",
  },
  {
    title: "Genie",
    tags: "AI, DATA",
    gradient: "from-green-500 to-emerald-600",
    align: "left",
    image: "/index/genie.png",
  },
  {
    title: "LongChau PMS",
    tags: "WEB, E-COMMERCE",
    gradient: "from-emerald-500 to-teal-600",
    align: "center",
    image: "/index/longchau-pms.png",
  },
  {
    title: "Tribalyn",
    tags: "AI, VTON",
    gradient: "from-indigo-500 to-violet-600",
    align: "right",
    image: "/index/tribalyn.png",
  },
  {
    title: "ClimaLens",
    tags: "AI, DATA",
    gradient: "from-blue-500 to-cyan-500",
    align: "left",
    image: "/index/climalens.png",
  },
]

export function WorksSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const hoveredProjectData = projects.find(p => p.title === hoveredProject)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.05 })

  // Build marquee text
  const marqueeText = hoveredProject ? `${hoveredProject} • `.repeat(8) : ""
  const marqueeChars = marqueeText.split("")

  return (
    <>
      {/* ═══ FIXED OVERLAYS — rendered OUTSIDE the overflow-hidden section ═══ */}

      {/* 1. Full-viewport blurred background */}
      <AnimatePresence>
        {hoveredProject && hoveredProjectData && isInView && (
          <motion.div
            key={`bg-${hoveredProject}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "black" }} />
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${hoveredProjectData.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(60px) saturate(1.4)",
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Full-viewport scrolling title band — centered on screen */}
      <AnimatePresence mode="wait">
        {hoveredProject && isInView && (
          <motion.div
            key={`marquee-${hoveredProject}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              pointerEvents: "none",
              mixBlendMode: "difference",
            }}
          >
            <div
              style={{
                whiteSpace: "nowrap",
                animation: "works-marquee 25s linear infinite",
              }}
            >
              {marqueeChars.map((char, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    lineHeight: 1,
                  }}
                >
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.7,
                      delay: (i % (hoveredProject?.length || 1)) * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: "inline-block",
                      fontSize: "clamp(100px, 20vw, 350px)",
                      fontWeight: 200,
                      letterSpacing: "-0.03em",
                      color: "white",
                      lineHeight: 1,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </div>

            <style>{`
              @keyframes works-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ SECTION — has overflow-hidden, only contains project cards ═══ */}
      <section ref={sectionRef} className="relative py-32 overflow-hidden">
        {/* Vertical lines pattern */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none opacity-30 overflow-hidden z-[2]">
          <div className="absolute left-[10%] top-0 bottom-0 w-[0.5px] bg-white h-full" />
          <div className="absolute left-[30%] top-0 bottom-0 w-[0.5px] bg-white h-full" />
          <div className="absolute left-[50%] top-0 bottom-0 w-[0.5px] bg-white h-full" />
          <div className="absolute left-[70%] top-0 bottom-0 w-[0.5px] bg-white h-full" />
          <div className="absolute left-[90%] top-0 bottom-0 w-[0.5px] bg-white h-full" />
        </div>

        {/* Content */}
        <div className="relative z-[10]">
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

          {/* Projects */}
          <div className="space-y-48">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.15 }}
                className="relative"
              >
                {/* Image container */}
                <div
                  className={`relative w-full sm:w-[80%] lg:w-[40%] group cursor-pointer mx-auto lg:mx-0 z-[2] ${
                    project.align === "left" ? "lg:ml-[10%]" :
                    project.align === "right" ? "lg:ml-auto lg:mr-[10%]" :
                    "lg:mx-auto"
                  }`}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  data-cursor-text={`VIEW ${project.title.toUpperCase()}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full aspect-[16/9] overflow-hidden shadow-2xl bg-black"
                  >
                    <motion.img
                      src={project.image}
                      alt={`${project.title} project`}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </motion.div>

                  {/* Title and tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className={`mt-6 ${
                      project.align === "right" ? "text-right" :
                      project.align === "center" ? "text-center" : ""
                    }`}
                  >
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 group-hover:opacity-60 transition-opacity duration-500">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/60 tracking-wider">{project.tags}</p>
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="aspect-[16/9]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
