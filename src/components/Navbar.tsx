"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Rate Me", href: "#rate-me" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  //nav bar sec
  //hello
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      // Simple active section logic
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header
        className={`absolute top-0 left-0 w-full z-[100] transition-all duration-300 py-6 bg-transparent`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold font-space-grotesk tracking-tighter">
            Zain<span className="text-primary-500">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                  activeSection === link.href.substring(1) ? "text-primary-500" : "text-foreground/80"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-surface-elevated transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <a
              href="/Zain_Ur-Rehman(1)(1).pdf"
              download
              className="px-5 py-2 text-sm font-medium rounded-lg bg-primary-500/10 text-primary-500 border border-primary-500/20 hover:bg-primary-500 hover:text-white transition-all"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-surface-elevated transition-colors"
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-24 pb-6 px-6 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center text-lg mt-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium transition-colors ${
                    activeSection === link.href.substring(1) ? "text-primary-500" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/Zain_Ur-Rehman(1)(1).pdf"
                download
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-6 py-3 mx-auto max-w-xs w-full text-center rounded-lg bg-primary-500 text-white font-medium"
              >
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
