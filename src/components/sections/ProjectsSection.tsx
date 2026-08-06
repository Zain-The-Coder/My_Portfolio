"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IProject } from "@/models/Project";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            A selection of my recent full-stack applications.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg"
              >
                {/* Image Container */}
                <div className="relative w-full pt-[56.25%] overflow-hidden bg-surface-elevated">
                  {/* Fallback pattern if image is not ready yet */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-secondary-900/40 flex items-center justify-center text-foreground/50 z-0">
                    <span className="font-mono text-sm tracking-widest uppercase">{project.title} mockup</span>
                  </div>
                  
                  {/* <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110 z-10" /> */}
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-wrap items-center justify-center gap-3 p-4">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 flex items-center gap-2 bg-primary-500 rounded-full text-white text-sm font-medium hover:bg-primary-600 transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-75">
                      <FiExternalLink size={16} /> Live Demo
                    </a>
                    
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 flex items-center gap-2 bg-surface rounded-full text-foreground text-sm font-medium hover:bg-white/20 transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-100">
                        <FiGithub size={16} /> GitHub
                      </a>
                    )}

                    {project.frontendRepoUrl && (
                      <a href={project.frontendRepoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 flex items-center gap-2 bg-surface rounded-full text-foreground text-sm font-medium hover:bg-white/20 transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-125">
                        <FiGithub size={16} /> Frontend Repo
                      </a>
                    )}

                    {project.backendRepoUrl && (
                      <a href={project.backendRepoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 flex items-center gap-2 bg-surface rounded-full text-foreground text-sm font-medium hover:bg-white/20 transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-150">
                        <FiGithub size={16} /> Backend Repo
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-secondary-500 text-sm font-semibold tracking-wider uppercase mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-foreground/70 mb-6 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
