import { 
  SiJavascript, SiTypescript, SiHtml5, 
  SiReact, SiNextdotjs, SiRedux, SiTailwindcss, SiBootstrap, 
  SiNodedotjs, SiExpress, SiSocketdotio, 
  SiMongodb, SiPostgresql, SiPrisma, SiSupabase, SiFirebase, SiRedis,
  SiJsonwebtokens, SiDocker, SiVercel, SiRailway, SiRender,
  SiGit, SiGithub, SiPostman
} from 'react-icons/si';
import { FaCss3Alt, FaProjectDiagram, FaAws } from 'react-icons/fa';

import { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon: IconType;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript (ES6+)", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Redux", icon: SiRedux },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Responsive Design", icon: FaCss3Alt }, // using css3 icon as placeholder
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs", icon: SiNodedotjs }, // placeholder icon
      { name: "MVC Architecture", icon: SiNodedotjs }, // placeholder icon
      { name: "Socket.IO", icon: SiSocketdotio },
    ]
  },
  {
    title: "Databases & ORMs",
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Prisma", icon: SiPrisma },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "Redis", icon: SiRedis },
    ]
  },
  {
    title: "Auth & Security",
    skills: [
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "NextAuth", icon: SiNextdotjs }, // using Next icon for NextAuth
      { name: "RBAC", icon: SiJsonwebtokens }, // placeholder icon
      { name: "Secure API Design", icon: SiJsonwebtokens }, // placeholder icon
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "AWS", icon: FaAws },
      { name: "Vercel", icon: SiVercel },
      { name: "Railway", icon: SiRailway },
      { name: "Render", icon: SiRender },
      { name: "CI/CD", icon: SiGithub }, // placeholder icon
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Agile/Scrum", icon: FaProjectDiagram },
      { name: "Postman", icon: SiPostman },
    ]
  }
];
