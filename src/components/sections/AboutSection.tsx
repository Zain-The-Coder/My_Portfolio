"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// --- Sub-components (Internal to this file) ---

function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

const educationData = [
  {
    degree: "Diploma in MERN Stack Development",
    institution: "Saylani Mass IT Training (SMIT)",
    date: "Feb 2025 – Apr 2026",
  },
  {
    degree: "Intermediate (Pre-Engineering)",
    institution: "Adamjee Government Science College",
    date: "Aug 2025",
  },
  {
    degree: "Matriculation (Computer Science)",
    institution: "Metropolis Academy",
    date: "Aug 2023 – Apr 2025",
  }
];

function EducationTimeline() {
  return (
    <div className="relative border-l border-primary-500/30 ml-4 md:ml-0 mt-12 md:mt-0">
      {educationData.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="mb-8 pl-8 relative"
        >
          <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[8.5px] top-1.5 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
          <h4 className="text-xl font-bold text-foreground">{edu.degree}</h4>
          <p className="text-secondary-500 font-medium my-1">{edu.institution}</p>
          <p className="text-sm text-foreground/60">{edu.date}</p>
        </motion.div>
      ))}
    </div>
  );
}

// --- Main Section Component ---

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-4">About <span className="text-gradient">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="prose prose-lg dark:prose-invert text-foreground/80 font-light leading-relaxed mb-8">
              <p>
                Hello! I&apos;m Zain, a Full-Stack MERN Developer who loves transforming ideas into functional, scalable, and visually appealing web applications. 
                I specialize in <strong>Node.js, Express.js, and building robust REST APIs</strong>, while designing seamless and responsive user interfaces with <strong>React.js and Next.js</strong>.
              </p>
              <p>
                My expertise includes implementing secure authentication systems (JWT, NextAuth, RBAC) and structuring scalable databases across MongoDB, PostgreSQL, Prisma, and Supabase. 
                I hold a Diploma in MERN Stack Development from Saylani Mass IT Training (SMIT).
              </p>
              <p>
                My project portfolio spans financial ledgers, social media platforms, healthcare systems, and e-commerce applications. I am actively seeking full-time opportunities where I can contribute to impactful projects.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Projects Built", value: 15, suffix: "+" },
                { label: "Years Experience", value: 2, suffix: "+" },
                { label: "Technologies", value: 20, suffix: "+" },
                { label: "Cups of Coffee", value: 500, suffix: "+" },
              ].map((stat, i) => (
                <div key={i} className="glass p-4 rounded-xl text-center border border-white/5">
                  <h4 className="text-3xl font-bold text-primary-400 mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </h4>
                  <p className="text-xs text-foreground/60 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-foreground/90">Education Journey</h3>
            <EducationTimeline />
          </div>
        </div>

      </div>
    </section>
  );
}
