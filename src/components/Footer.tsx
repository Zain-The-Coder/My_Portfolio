"use client";

import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface-elevated/30 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <a href="#home" className="text-2xl font-bold font-space-grotesk tracking-tighter mb-4 block">
              Zain<span className="text-primary-500">.</span>
            </a>
            <p className="text-foreground/60 text-sm max-w-xs">
              MERN Stack Developer building scalable, high-performance web applications with modern technologies.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li><a href="#about" className="hover:text-primary-500 transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-primary-500 transition-colors">Projects</a></li>
              <li><a href="#rate-me" className="hover:text-primary-500 transition-colors">Client Feedback</a></li>
              <li><a href="#contact" className="hover:text-primary-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/Zain-The-Coder" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-surface hover:bg-primary-500 hover:text-white transition-colors border border-border/50">
                <SiGithub size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-surface hover:bg-primary-500 hover:text-white transition-colors border border-border/50">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
          <p>&copy; {new Date().getFullYear()} Zain Ur Rehman. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-foreground/80 font-medium">Next.js</span> & <span className="text-foreground/80 font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
