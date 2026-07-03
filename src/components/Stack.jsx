import { useState , useRef } from "react"
import { useInView  , motion} from "framer-motion"


const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const STACK = [
  'JavaScript', 'ES6 +' , 'TypeScript', 'MongoDB', 'Node JS', 'React JS', 'Express JS',
  'Firebase', 'Supabase', 'Bootstrap', 'TailwindCss',"Next Auth" , "PostgreSQL" , "GIT & Github" ,
   "JWT" , "React Redux Toolkit" , "RestAPIs" ,  "Prisma" ,
  "Vercel" , "Netlify" , "Railway" , "Render" , "Back4app" ,
  "Responsive Design" , "HTML5" , "CSS3" ,
]


function SectionEyebrow({ index, label, color = '#7F77DD' }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-display text-xs font-medium tracking-widest" style={{ color }}>
        {index}
      </span>
      <div className="w-5 h-px" style={{ background: color }} />
      <span className="text-xs text-white/40 tracking-widest uppercase">{label}</span>
    </div>
  )
}



function StackSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stack" ref={ref} className="py-24 px-6 border-t border-white/5 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7F77DD]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionEyebrow index="03" label="Tech stack" color="#D85A30" />
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-wrap gap-3 max-w-4xl mt-8">
          {STACK.map((s) => (
            <motion.span
              key={s}
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(127, 119, 221, 0.4)', color: '#fff' }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-white/50 text-sm font-medium backdrop-blur-sm transition-colors duration-300 cursor-pointer select-none"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StackSection ;