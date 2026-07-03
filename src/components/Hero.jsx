import { useState , useRef , useEffect} from "react";
import { motion  , AnimatePresence} from "framer-motion";

const downloadCV = () => {
  console.log("function fire")
  const link = document.createElement('a');
  link.href = '/zain-cv.docx'; 
  link.download = 'Zain_Ur_Rehman_CV.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);  
};

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

const SKILLS = [
  { name: 'React JS / Next JS' , color: '#7F77DD' },
  { name: 'Node JS / Express JS',  color: '#1D9E75' },
  { name: 'MongoDB ', color: '#D85A30' },
]

function HeroSection() {
  const words = ['products', 'systems', 'interfaces', 'experiences']
  const [wordIdx, setWordIdx] = useState(0)
  const heroWord = 'Building'

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="min-h-screen flex items-center pt-16 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, #7F77DD18 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, #1D9E7510 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-[#7F77DD]" />
            <span className="text-xs text-[#7F77DD] font-medium tracking-widest uppercase">MERN Stack / Developer</span>
          </motion.div>

          <h1
            className="font-display font-bold text-white mb-6 leading-[0.95]"
            style={{ fontSize: 'clamp(52px, 8vw, 88px)' }}
          >
            {heroWord.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch}
              </motion.span>
            ))}
            <br />
            <span className="relative inline-block text-[#AFA9EC]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {words[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              that scale.
            </motion.span>
          </h1>
<motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="text-white/40 text-lg leading-relaxed max-w-md mb-10"
          >
            I architect and build high-performance web applications specializing in the MERN stack. From secure financial ledgers to real-time collaboration hubs, I craft scalable full-stack experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="flex items-center gap-5"
          >
            <Magnetic strength={14}>
              <a
                href="https://github.com/Zain-The-Coder"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 inline-block bg-[#7F77DD] text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#6b63c9] transition-colors duration-200"
              >
                View Github
              </a>
            </Magnetic>
            <a
                href="https://drive.google.com/file/d/1G7VOQYtPcM7bDX7o9fOWacIaGZLJzK7P/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 inline-block bg-[#7F77DD] text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#6b63c9] transition-colors duration-200"
              >
                View CV
              </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2"
        >
          <div className="border border-white/8 rounded-2xl p-6 bg-white/[0.02]">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white/5">
                  <img src="/images/myphoto.png" alt="Zain Ur Rehman" className="w-full h-full object-cover" />
                </div>
                <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#1D9E75] border-2 border-[#0d0d0d]" />
              </div>
              <div>
                <p className="text-white font-medium">Zain Ur Rehman</p>
                <p className="text-white/40 text-sm">1.5 yrs exp.</p>
              </div>
              <div className="ml-auto bg-[#1D9E7515] border border-[#1D9E7530] rounded-full px-3 py-1 shrink-0">
                <span className="text-[#1D9E75] text-xs font-medium">Open to work</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-white/25 text-xs tracking-widest uppercase mb-4">CORE EXPERTISE</p>
              {SKILLS.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">{s.name}</span>
                    <span className="text-white/30">{s.pct}</span>
                  </div>
                  <div className="h-[3px] rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 100 }}
                      animate={{ width: `100%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: s.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection ;