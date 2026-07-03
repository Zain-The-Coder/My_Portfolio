import { useState , useRef } from "react"
import { useInView , motion } from "framer-motion"
import { HiOutlineExternalLink } from "react-icons/hi"
import { AiFillGithub } from "react-icons/ai"

function SectionEyebrow({ index, label, color = '#7F77DD' }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-display text-xs font-medium tracking-widest" style={{ color }}>
        {index}
      </span>
      <div className="w-5 h-px" style={{ background: color }} />
      <span className="text-xs text-white/40 tracking-widest uppercase">{label}</span>
    </div>
  )
}


const PROJECTS = [
  {
    name: 'Apex Wallet',
    desc: 'A secure financial ledger and banking transaction system featuring real-time fund tracking, secure transfers, and comprehensive transaction histories.',
    tags: ['MongoDB', 'React JS', 'Express JS', 'Node JS', 'TailwindCss'],
    accent: '#1D9E75',
    bg: '#0a1a16',
    label: 'Banking Transaction System',
    src: '/public/images/apex-wallet-thumbnail.png',
    stats: [
      { label: 'Live Demo', value: 'Live Demo', icon: HiOutlineExternalLink, link: 'https://apex-wallet-frontend.vercel.app/' },
      { label: 'Frontend GitHub', value: 'Frontend GitHub', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/Apex_Wallet_frontend' },
      { label: 'Backend GitHub', value: 'Backend GitHub', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/Apex_Wallet_Backend' },
    ],
  },
  {
    name: 'Sonic Stream',
    desc: 'A dynamic audio streaming application designed for seamless music playback, interactive user playlists, and a highly responsive, immersive UI.',
    tags: ['MongoDB', 'React JS', 'Express JS', 'Node JS', 'TailwindCss'],
    accent: '#1D9E75',
    bg: '#0a1a16',
    label: 'Song Application',
    src: '/images/sonic-stream.png',
    stats: [
      { label: 'Live Demo', value: 'Live Demo', icon: HiOutlineExternalLink, link: 'https://sonic-stream-pi.vercel.app/' },
      { label: 'Frontend GitHub', value: 'Frontend GitHub', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/SonicStream' },
      { label: 'Backend GitHub', value: 'Backend GitHub', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/Sonic_Stream_frontend' },
    ],
  },
  {
    name: 'NN Tech',
    desc: 'A high-performance e-commerce marketplace utilizing server-side rendering for lightning-fast product browsing, cart management, and fluid user experiences.',
    tags: ['Next JS', 'MongoDB', 'TailwindCss'],
    accent: '#1D9E75',
    bg: '#0a1a16',
    label: 'E Commerce Platform',
    src: '/images/nn-tech.png',
    stats: [
      { label: 'Live Demo', value: 'Live Demo', icon: HiOutlineExternalLink, link: 'https://nn-tech.vercel.app/' },
      { label: 'Github', value: 'Github', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/NN_Tech' },
    ],
  },
    {
    name: 'Med Connect',
    desc: 'A robust healthcare SaaS and hospital management platform built collaboratively to streamline patient scheduling, authentication, and medical workflows.',
    tags: ['Next JS', 'Next Auth', 'TypeScript', 'SupaBase', 'Prisma', 'TailwindCss'],
    accent: '#1D9E75',
    label: 'Hospital Management System',
    src: '/images/med-connect.png',
    bg: '#0a1a12',
    stats: [
      { label: 'Live Demo', value: 'Live Demo', icon: HiOutlineExternalLink, link: 'https://med-connect-zeta.vercel.app/' },
      { label: 'Github', value: 'Github', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/MedConnect/tree/main/med-connect' },
    ],
  },
  {
    name: 'Help Hub AI',
    desc: 'A community-driven support hub where users can post technical or personal challenges and receive instant, real-time solutions from active global members.',
    tags: ['MongoDB', 'React JS', 'Express JS', 'Node JS', 'TailwindCss'],
    accent: '#1D9E75',
    bg: '#0a1a12',
    label: 'Problem Solving Platform',
    src: '/images/help-hub.png',
    stats: [
      { label: 'Live Demo', value: 'Live Demo', icon: HiOutlineExternalLink, link: 'https://the-final-hackathon.vercel.app/' },
      { label: 'Github', value: 'Github', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/The-Final_hackathon' },
    ],
  },
  {
    name: 'Daraz Clone',
    desc: 'A fully responsive e-commerce storefront clone featuring real-time product listings, active database sync, and a familiar, intuitive shopping cart experience.',
    tags: ['React.JS', 'TailwindCss', 'FireBase'],
    accent: '#1D9E75',
    label: 'E Commerce Store',
    src: '/images/daraz.png',
    bg: '#0a1a12',
    stats: [
      { label: 'Live Demo', value: 'Live Demo', icon: HiOutlineExternalLink, link: 'https://darazcloone.netlify.app/' },
      { label: 'Github', value: 'Github', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/React.JS_Projects/tree/main/Daraz%20App' },
    ],
  },
  {
    name: 'World Messenger',
    desc: 'A real-time global public square chat application leveraging cloud databases to connect worldwide users in a single, open messaging stream.',
    tags: ['JavaScript', 'TailwindCss', 'FireBase', 'HTML'],
    accent: '#1D9E75',
    bg: '#0a1a12',
    label: 'Chat application',
    src: '/images/messanger.png',
    featured: true,
    stats: [
      { label: 'Live Demo', value: 'Live Demo', icon: HiOutlineExternalLink, link: 'https://worldmesanger.netlify.app/' },
      { label: 'Github', value: 'Github', icon: AiFillGithub, link: 'https://github.com/Zain-The-Coder/FireBase-Projects/tree/main/Project%205%20.%20World%20Messanger' },
    ],
  },
];
function WorkSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" ref={ref} className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8 md:mb-12"
        >
          <div>
            {/* <SectionEyebrow index="01" label="Selected work" /> */}
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white">Projects</h2>
          </div>
          <span className="text-white/20 text-sm hidden sm:block">{PROJECTS.length} projects</span>
        </motion.div>

        <div className="flex flex-col gap-6 md:gap-8">
          {PROJECTS.map((project, i) => {
            const mainLink = project.stats?.[0]?.link || '#'
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.01] hover:border-white/15 transition-colors duration-300 group relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
                  {/* Image Container Mobile Optimized */}
                  <a
                    href={mainLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-56 sm:h-64 lg:h-auto min-h-[240px] lg:min-h-[340px] w-full flex items-center justify-center relative overflow-hidden cursor-pointer"
                    style={{ background: project.bg }}
                  >
                    {/* Grid Effect */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(${project.accent} 1px, transparent 1px), linear-gradient(90deg, ${project.accent} 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                      }}
                    />
                    
                    {/* Project Number (Mobile scale down) */}
                    <span
                      className="absolute -bottom-4 -right-2 font-display font-bold select-none pointer-events-none text-[80px] sm:text-[120px]"
                      style={{ color: `${project.accent}12`, lineHeight: 1 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Badge */}
                    <div
                      className="absolute top-3 left-3 sm:top-4 sm:left-4 border rounded-lg px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs z-20"
                      style={{ borderColor: `${project.accent}40`, color: project.accent, background: `${project.accent}10` }}
                    >
                      {project.label}
                    </div>

                    {/* Image handling */}
                    <img
                      src={project.src}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 z-10 group-hover:scale-105 group-hover:opacity-55 transition-all duration-500 ease-out"
                    />
                  </a>

                  {/* Content Container Mobile Responsive Padding */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 sm:mb-4 leading-tight">
                        {project.name}
                      </h3>
                      <p className="text-white/40 leading-relaxed mb-5 sm:mb-6 text-xs sm:text-sm">
                        {project.desc}
                      </p>
                      
                      {/* Tags spacing fix */}
                      <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                        {project.tags.map((t) => (
                          <span key={t} className="text-[10px] sm:text-xs border border-white/10 text-white/40 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Stats Link Grid for Small Screens */}
                    <div className="grid grid-cols-2 gap-4 lg:flex lg:gap-8 mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-white/5 relative z-20">
                      {project.stats?.map((s) => (
                        <a key={s.label} href={s.link} target="_blank" rel="noopener noreferrer" className="group/link block cursor-pointer">
                          <p className="font-display font-bold text-base sm:text-lg text-white group-hover/link:text-[#7F77DD] flex items-center gap-1.5 transition-colors">
                            {s.icon && <s.icon className="text-lg sm:text-xl text-white/60 group-hover/link:text-[#7F77DD]" />}
                            {s.value}
                          </p>
                          <p className="text-white/30 text-[11px] sm:text-xs mt-0.5">{s.label}</p>
                        </a>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WorkSection;
