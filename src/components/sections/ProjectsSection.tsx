"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IProject } from "@/models/Project";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { FaCode } from "react-icons/fa";

function ProjectCard({ project, index }: { project: IProject; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 hover:-translate-y-2 relative bg-surface/50"
    >
      {/* Image Container */}
      <div className="relative w-full pt-[56.25%] overflow-hidden bg-surface-elevated rounded-t-2xl">
        {/* Fallback Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-secondary-900/30 flex items-center justify-center text-foreground/50 z-0">
          <FaCode size={48} className="opacity-20" />
        </div>
        
        {/* Actual Image */}
        {!imgError && project.image && (project.image.startsWith('/') || project.image.startsWith('http')) && (
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105 z-10" 
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        
        {/* Gradient Overlay for smooth blend */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/90 to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="p-8 pt-4 flex flex-col flex-grow relative z-30">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-secondary-500/10 text-secondary-400 border border-secondary-500/20">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">{project.title}</h3>
        
        <p className="text-foreground/70 mb-6 text-sm leading-relaxed flex-grow line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map(tech => (
            <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-surface-elevated/80 text-foreground/80 border border-white/5">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons (Always Visible) */}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-white/5">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 flex items-center gap-2 bg-primary-600 rounded-xl text-white text-sm font-medium hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20 active:scale-95">
              <FiExternalLink size={16} /> Live Demo
            </a>
          )}
          
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 flex items-center gap-2 bg-surface rounded-xl text-foreground text-sm font-medium hover:bg-white/10 transition-colors border border-white/10 active:scale-95">
              <FiGithub size={16} /> GitHub
            </a>
          )}

          {project.frontendRepoUrl && (
            <a href={project.frontendRepoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 flex items-center gap-2 bg-surface rounded-xl text-foreground text-xs font-medium hover:bg-white/10 transition-colors border border-white/10 active:scale-95">
              <FiGithub size={14} /> Frontend
            </a>
          )}

          {project.backendRepoUrl && (
            <a href={project.backendRepoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 flex items-center gap-2 bg-surface rounded-xl text-foreground text-xs font-medium hover:bg-white/10 transition-colors border border-white/10 active:scale-95">
              <FiGithub size={14} /> Backend
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

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
              <ProjectCard key={project.id || index} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
