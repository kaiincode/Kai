"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="relative z-20 flex items-center justify-between px-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xs tracking-wider font-light"
      >
        <Link href="/" className="hover:opacity-60 transition-opacity" data-cursor-text="HOME">
          KAI
        </Link>
      </motion.div>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        onClick={onMenuClick}
        className="text-xs tracking-wider font-light hover:opacity-60 transition-opacity"
        data-cursor-text="OPEN MENU"
      >
        [MENU]
      </motion.button>
    </header>
  )
}

