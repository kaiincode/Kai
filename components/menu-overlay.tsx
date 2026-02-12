"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  isFooterOpen?: boolean
}

const menuItems = [
  { name: "INDEX", href: "/", number: "01" },
  { name: "PROFILE", href: "/profile", number: "02" },
  { name: "WORKS", href: "/works", number: "03" },
  { name: "CONTACT", href: "/contact", number: "04" },
]

const socialLinks = [
  { name: "GitHub", url: "https://github.com/kaiincode" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/kaiisme" },
  { name: "X", url: "https://x.com/panacea___005" },
  { name: "YouTube", url: "https://www.youtube.com/@Panacea2005" },
  { name: "Instagram", url: "https://www.instagram.com/__tthien/" },
]

export function MenuOverlay({ isOpen, onClose, isFooterOpen = false }: MenuOverlayProps) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Text color based on footer state
  const textColor = isFooterOpen ? 'text-black' : 'text-white'
  const textColorSecondary = isFooterOpen ? 'text-black/40' : 'text-white/40'
  const textColorTertiary = isFooterOpen ? 'text-black/30' : 'text-white/30'
  const textColorHover = isFooterOpen ? 'text-black/60' : 'text-white/60'
  const textColorNumber = isFooterOpen ? 'text-black/40' : 'text-white/40'
  const textColorNumberHover = isFooterOpen ? 'text-black/60' : 'text-white/60'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Menu panel sliding from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 w-1/2 z-[100] backdrop-blur-2xl bg-white/5 border-l border-white/10"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className={`absolute top-12 right-12 text-xs tracking-wider font-light ${textColor} hover:opacity-60 transition-opacity`}
              data-cursor-text="CLOSE"
            >
              [CLOSE]
            </motion.button>

            {/* Menu Content */}
            <div className="flex flex-col justify-between h-full py-24 px-16">
              {/* Navigation */}
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6"
              >
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-6 hover:opacity-60 transition-opacity"
                      data-cursor-text={item.name}
                    >
                      <span className={`text-xs tracking-wider font-light ${textColorNumber} group-hover:${textColorNumberHover} transition-colors`}>
                        {item.number}
                      </span>
                      <span className={`text-5xl font-light tracking-tight ${textColor}`} data-cursor-text={item.name}>
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-3"
              >
                <p className={`text-xs tracking-wider font-light ${textColorSecondary} mb-4`}>CONNECT</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm font-light ${textColorHover} hover:${textColor} transition-colors`}
                      data-cursor-text={link.name.toUpperCase()}
                    >
                      {link.name}
                      <span className="text-xs opacity-60">↗</span>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className={`text-xs font-light ${textColorTertiary} tracking-wider`}
              >
                <p>© 2025 KAI</p>
                <p className="mt-1">HO CHI MINH CITY, VIETNAM</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
