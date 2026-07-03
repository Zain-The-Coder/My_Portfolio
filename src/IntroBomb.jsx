import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INK = '#D85A30'
const INK_DARK = '#7A2E14'
const PURPLE = '#7F77DD'
const GREEN = '#1D9E75'

function useSplatterDrops(count = 16) {
  return useMemo(() => {
    const drops = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = 12 + Math.random() * 34
      drops.push({
        id: i,
        size: 14 + Math.random() * 54,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist * 0.55,
        delay: Math.random() * 0.12,
        hasDrip: Math.random() > 0.45,
      })
    }
    return drops
  }, [count])
}

export default function IntroBomb({ onComplete, name = "Zain's Portfolio" }) {
  const [phase, setPhase] = useState('falling')
  const [visible, setVisible] = useState(true)
  const drops = useSplatterDrops()

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('boom'), 950)
    const t2 = setTimeout(() => setPhase('exit'), 2750)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const skip = () => setPhase('exit')

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[#080808]"
          initial={{ opacity: 1 }}
          animate={
            phase === 'exit'
              ? { opacity: 0, scale: 1.04 }
              : phase === 'boom'
              ? { x: [0, -10, 8, -6, 6, -3, 0], y: [0, 4, -6, 6, -4, 2, 0] }
              : { opacity: 1 }
          }
          transition={
            phase === 'exit'
              ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              : phase === 'boom'
              ? { duration: 0.45, ease: 'easeOut' }
              : {}
          }
          onAnimationComplete={() => {
            if (phase === 'exit') setVisible(false)
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {phase === 'falling' && (
            <motion.div
              className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2"
              style={{ background: `linear-gradient(to bottom, transparent, ${PURPLE}80)` }}
              initial={{ height: 0 }}
              animate={{ height: '46vh' }}
              transition={{ duration: 0.95, ease: [0.55, 0, 0.85, 0.35] }}
            />
          )}

          {phase === 'falling' && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 text-6xl"
              style={{ filter: 'drop-shadow(0 0 14px rgba(0,0,0,.6))' }}
              initial={{ top: '-10%' }}
              animate={{ top: '46%' }}
              transition={{ duration: 0.95, ease: [0.55, 0, 0.85, 0.35] }}
            >
              <motion.span
                className="inline-block"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
              >
                💣
              </motion.span>
            </motion.div>
          )}

          {phase === 'boom' && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[#fff4e0]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.45, times: [0, 0.15, 1], ease: 'easeOut' }}
            />
          )}

          {phase === 'boom' && (
            <div className="pointer-events-none absolute inset-0">
              {drops.map((d) => (
                <motion.div
                  key={d.id}
                  className="absolute rounded-full"
                  style={{
                    width: d.size,
                    height: d.size,
                    left: `calc(50% + ${d.x}%)`,
                    top: `calc(48% + ${d.y}%)`,
                    background: `radial-gradient(circle at 35% 30%, ${INK} 0%, ${INK_DARK} 75%)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.15, 1], opacity: 1 }}
                  transition={{ duration: 0.5, delay: d.delay, ease: [0.2, 1.6, 0.4, 1] }}
                >
                  {d.hasDrip && (
                    <motion.div
                      className="absolute left-1/2 top-full w-[45%] -translate-x-1/2 rounded-b-full"
                      style={{ background: `linear-gradient(to bottom, ${INK_DARK}, transparent)` }}
                      initial={{ height: 0, opacity: 0.9 }}
                      animate={{ height: 60, opacity: 0 }}
                      transition={{ duration: 1.1, delay: 0.55, ease: 'easeIn' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {phase === 'boom' && (
            <motion.div
              className="relative z-10 px-6 text-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            >
              <div className="mb-3 text-xs font-medium uppercase tracking-[0.3em]" style={{ color: GREEN }}>
                Loading experience
              </div>
              <h1 className="font-display text-[clamp(30px,6vw,64px)] font-bold leading-[1.05] text-white">
                Welcome to <span style={{ color: INK }}>{name}</span>
              </h1>
            </motion.div>
          )}

          <button
            onClick={skip}
            className="absolute bottom-7 right-7 z-20 rounded-full border border-white/15 px-4 py-2 text-xs tracking-wide text-white/50 transition-colors hover:border-white/40 hover:text-white/90"
          >
            Skip intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
