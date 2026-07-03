import { useState , useRef } from "react"
import { useInView , motion } from "framer-motion"


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


function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const highlights = ['Clean architecture', 'Performance-minded', 'Design-literate', 'Ships fast']

  return (
    <section id="about" ref={ref} className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <SectionEyebrow index="02" label="About" color="#1D9E75" />
          <h2 className="font-display font-bold text-3xl text-white mb-4 leading-tight">
            A developer who cares as much about the details as the deadline.
          </h2>
          <div className="flex flex-wrap gap-2 mt-6">
            {highlights.map((h) => (
              <span
                key={h}
                className="text-xs border border-white/10 text-white/50 px-3 py-1.5 rounded-full bg-white/[0.02]"
              >
                {h}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-3 space-y-6 text-white/50 text-[15px] leading-relaxed"
        >
          <p>
            I'm a MERN stack developer who enjoys taking a product from a rough idea to something
            people actually use. My day-to-day spans React and Next.js on the frontend, Node and
            Express on the backend, and MongoDB or Firebase for data — with a strong opinion that
            interfaces should feel as solid as the code behind them.
          </p>
          <p>
            Recent work includes an e-commerce clone, a real-time messaging app, a community help
            platform, and a hospital management SaaS built with a team — each one pushed me to get
            better at structuring larger codebases and shipping under real constraints.
          </p>
          <p className="text-white/35">
            Outside of client work, I'm usually deep in a side project, testing a new stack, or
            refining this very portfolio.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection ;