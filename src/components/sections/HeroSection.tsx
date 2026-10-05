"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SiGithub } from "react-icons/si";
import { MdEmail, MdLocationOn } from "react-icons/md";

const roles = [
  "MERN Stack Developer",
  "Full-Stack AI Engineer",
  "React.js & Next.js Expert",
  "Generative AI Engineer" ,
  "Node.js and Python Backend Developer",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="object-cover w-full h-full opacity-40 dark:opacity-30"
        >
          <source src="/videos/coding-bg.mp4" type="video/mp4" />
        </video>
        {/* Fallback image carousel can be implemented here if video is unavailable 
        <div className="absolute inset-0 bg-[url('/projects/placeholder.jpg')] bg-cover bg-center animate-pulse opacity-20"></div>
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-full glass text-foreground/80"
        >
          <MdLocationOn className="text-secondary-500" />
          <span>Karachi, Pakistan</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Hi, I&apos;m <span className="text-gradient">Zain Ur Rehman</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-12 mb-6"
        >
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg md:text-3xl text-foreground/80 font-light"
          >
            {roles[roleIndex]}
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl text-foreground/70 mb-10 text-base md:text-lg"
        >
          I build scalable web applications with a focus on seamless user experiences and robust backend architectures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/25"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl glass hover:bg-white/10 dark:hover:bg-white/5 font-medium transition-all hover:scale-105 active:scale-95 border border-foreground/10"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex gap-6"
        >
          <a
            href="https://github.com/Zain-The-Coder"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-foreground/80 hover:text-primary-500"
            aria-label="GitHub"
          >
            <SiGithub size={24} />
          </a>
          <a
            href="mailto:hafizzain.mail@gmail.com"
            className="p-3 rounded-full glass hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-foreground/80 hover:text-secondary-500"
            aria-label="Email"
          >
            <MdEmail size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
