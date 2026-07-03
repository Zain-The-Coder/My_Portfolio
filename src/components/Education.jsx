import React from 'react';
import { motion } from 'framer-motion';

const EDUCATION_DATA = [
      {
    type: 'COURSE',
    title: 'Web Development — Full-Stack MERN Program',
    institution: 'Saylani Mass IT Training (SMIT)',
    duration: 'Feb 2025 – Apr 2026',
    color: '#1D9E75', // Green accent
  },
  {
    type: 'EDUCATION',
    title: 'FSc — Pre-Engineering',
    institution: 'Board of Intermediate Education Karachi (BIEK)',
    duration: 'Expected 2027',
    color: '#7F77DD', // Purple accent
  },
  {
    type: 'EDUCATION',
    title: 'Matriculation — Computer Science',
    institution: 'Metropolis Academy',
    duration: 'Aug 2023 - Apr 2025',
    color: '#D85A30', // Orange/Red accent
  },
];

const EducationSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#0a0a0c]">
      {/* Subtle Background Glow to match Hero */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7F77DD 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-6 h-px bg-[#7F77DD]" />
          <h2 className="text-xs text-[#7F77DD] font-medium tracking-widest uppercase">
            Timeline / Background
          </h2>
        </motion.div>

        {/* Education/Courses Timeline Cards */}
        <div className="space-y-6">
          {EDUCATION_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 8 }}
              className="relative group border border-white/5 rounded-2xl p-6 md:p-8 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300"
            >
              {/* Dynamic Left Border Accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-2xl transition-all duration-300"
                style={{ backgroundColor: item.color }}
              />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pl-2">
                <div>
                  {/* Badge */}
                  <span 
                    className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border mb-4 inline-block"
                    style={{ 
                      borderColor: `${item.color}30`, 
                      color: item.color,
                      backgroundColor: `${item.color}08` 
                    }}
                  >
                    {item.type}
                  </span>
                  
                  {/* Title & School */}
                  <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1.5 font-medium">
                    {item.institution}
                  </p>
                </div>

                {/* Duration Tag */}
                <div className="md:text-right shrink-0">
                  <span className="text-xs font-mono text-white/30 group-hover:text-white/50 transition-colors bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/5">
                    {item.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;