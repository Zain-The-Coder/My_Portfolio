import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { HiOutlineExternalLink, HiOutlineMail } from 'react-icons/hi'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import IntroBomb from './IntroBomb.jsx'
import AboutSection from './components/About.jsx'
import ContactSection from './components/Content.jsx'
import Footer from './components/Footer.jsx'
import HeroSection from './components/Hero.jsx'
import NavBar from './components/NavBar.jsx'
import StackSection from './components/Stack.jsx'
import WorkSection from './components/Work.jsx'
import EducationSection from './components/Education.jsx'

function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { damping: 28, stiffness: 200, mass: 0.4 })
  const sy = useSpring(y, { damping: 28, stiffness: 200, mass: 0.4 })

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed z-40 hidden lg:block"
      style={{
        left: sx,
        top: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: 420,
        height: 420,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(127,119,221,0.10) 0%, transparent 70%)',
      }}
    />
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <IntroBomb onComplete={() => setIntroDone(true)} name="Zain's Portfolio" />
      {introDone && <CursorGlow />}

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: introDone ? 1 : 0 }} transition={{ duration: 0.6 }}>
        <NavBar />
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <StackSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </motion.main>
    </>
  )
}
