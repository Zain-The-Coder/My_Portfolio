import { useState , useRef , useEffect } from "react"
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'Contact', id: 'contact' },
]

function Magnetic({ children, strength = 18 }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    setPos({ x: (relX / rect.width) * strength, y: (relY / rect.height) * strength })
  }
  const onLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}


function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const zain = '< / Zain Ur Rehman >'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-[#080808]/80 border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <span className="font-display text-lg font-bold tracking-tight text-white">{zain}</span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <span
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="nav-link text-sm text-white/40 hover:text-white/80 cursor-pointer transition-colors duration-200"
            >
              {link.label}
            </span>
          ))}
        </div>
        <Magnetic strength={10}>
          <button
            onClick={() => window.open('https://wa.me/923182622266', '_blank')}
            className="bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-white/90 transition-colors duration-200"
          >
            Let's talk
          </button>
        </Magnetic>
      </div>
    </motion.nav>
  )
}

export default NavBar ;