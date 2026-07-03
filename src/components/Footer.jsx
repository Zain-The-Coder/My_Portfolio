import { footer } from "framer-motion/client"
import { useState , useRef } from "react"
import { useInView } from "framer-motion"



function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <footer className="border-t border-white/5 py-6 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-display text-sm text-white/20">Zain Ur Rehman</span>
        <span className="text-white/15 text-xs">© 2026 · Built with React JS & TailwindCss</span>
        <button onClick={scrollTop} className="text-white/25 hover:text-white/60 text-xs transition-colors">
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}

export default Footer ;