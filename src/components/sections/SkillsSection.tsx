"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-surface-elevated/50 relative">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical <span className="text-gradient">Skills</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            My arsenal of languages, frameworks, and tools that I use to build high-performance applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => {
            const isAI = category.title === "AI / Generative AI";
            return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className={`glass p-6 rounded-2xl flex flex-col h-full border transition-all duration-300 group ${isAI ? 'border-primary-500/40 shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] bg-primary-500/5 hover:border-primary-500/60' : 'border-white/5 hover:border-primary-500/30'}`}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className={`h-1 rounded-full group-hover:w-12 transition-all duration-300 ${isAI ? 'w-10 bg-gradient-to-r from-primary-500 to-secondary-500' : 'w-8 bg-primary-500'}`}></span>
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3 mt-auto">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/50 border border-border/50 text-sm font-medium hover:bg-primary-500/10 hover:border-primary-500/30 transition-colors cursor-default shadow-sm"
                    >
                      <Icon className="text-lg text-primary-400 group-hover/skill:animate-spin" />
                      <span>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
