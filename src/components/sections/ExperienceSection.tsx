"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { FaBriefcase, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            My professional journey building production-ready applications, scalable backends, and modern web solutions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-primary-500/40 transition-all duration-300 relative group overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]"
            >
              {/* Subtle accent bar on the left edge */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500 rounded-l-2xl opacity-80 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="p-2 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      <FaBriefcase className="text-sm" />
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-surface border border-border/60 text-secondary-500">
                      {exp.type}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground/90 pl-11 md:pl-0">
                    <span className="text-gradient">{exp.company}</span>
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/70 pl-11 md:pl-0">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/60 border border-border/50 font-medium">
                    <FaCalendarAlt className="text-primary-400 text-xs" />
                    <span>{exp.period}</span>
                    {exp.isCurrent && (
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-3 mb-6 pl-2">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground/80 leading-relaxed">
                    <FaCheckCircle className="text-primary-500 mt-1 shrink-0 text-sm opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-border/40 flex flex-wrap gap-2 items-center">
                <span className="text-xs uppercase tracking-wider font-semibold text-foreground/50 mr-2">
                  Technologies:
                </span>
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs rounded-md bg-surface/80 border border-border/60 text-foreground/80 font-medium hover:border-primary-500/40 hover:text-primary-400 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
