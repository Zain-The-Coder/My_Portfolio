import { useState , useRef } from "react"
import { useInView , motion } from "framer-motion"
import { AiFillGithub , AiFillLinkedin } from "react-icons/ai"
import { HiOutlineMail } from "react-icons/hi"



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


function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const socials = [
    { label: 'GitHub', href: 'https://github.com/Zain-The-Coder', icon: AiFillGithub },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hafiz-zain-022680354/', icon: AiFillLinkedin },
  ]

  return (
    <section id="contact" ref={ref} className="py-28 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-5 h-px bg-[#1D9E75]" />
            <span className="text-xs text-[#1D9E75] font-medium tracking-widest uppercase">Available For Work</span>
            <div className="w-5 h-px bg-[#1D9E75]" />
          </div>

          <h2 className="font-display font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
            Let's build<br />something great.
          </h2>

          <p className="text-white/35 text-lg max-w-md mx-auto mb-12">Open to backend and also frontend roles.</p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Magnetic strength={12}>
              <a href="mailto:zain015976@gmail.com" className="bg-white text-black text-sm font-medium px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-200 inline-flex items-center gap-2">
                <HiOutlineMail className="text-base" />
                Contact Me On Gmail
              </a>
            </Magnetic>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/10 text-white/40 text-sm px-5 py-3.5 rounded-full hover:border-white/25 hover:text-white/60 transition-all duration-200 inline-flex items-center gap-2"
                >
                  <Icon className="text-base" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection ;