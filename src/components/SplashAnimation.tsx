"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  "> Initializing portfolio...",
  "> Loading Zain Ur Rehman...",
  "> Welcome to my portfolio_"
];

export default function SplashAnimation() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setShow(false);
      return;
    }

    // Sequence the animation using simple timeouts
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1600),
      setTimeout(() => setShow(false), 2400) // Trigger exit at 2.4s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setMounted(false)}>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.6, ease: "easeInOut" } 
          }}
          className="fixed inset-0 w-screen h-screen z-[99999] bg-[#0A0A0F] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle tech background: Grid and glow */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Terminal Window */}
          <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col justify-center">
            <div className="font-mono text-primary-400 text-sm md:text-lg lg:text-xl space-y-3">
              {step >= 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
                  <span>{lines[0]}</span>
                </motion.div>
              )}
              {step >= 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
                  <span>{lines[1]}</span>
                </motion.div>
              )}
              {step >= 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
                  <span>{lines[2]}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-[0.6em] h-[1em] bg-primary-400 ml-1"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
