export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "apex-wallet",
    title: "Apex Wallet",
    description: "Built a digital ledger app with Express.js REST APIs for secure peer-to-peer transfers and real-time balance tracking. Designed a scalable MongoDB schema to prevent race conditions and ensure data consistency across high-volume transactions.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    liveUrl: "https://example.com/apex-wallet",
    githubUrl: "https://github.com/Zain-The-Coder/apex-wallet",
    image: "/projects/apex-wallet.jpg",
    category: "Full-Stack Financial Ledger Application",
  },
  {
    id: "instakilo",
    title: "InstaKilo",
    description: "Developed an Instagram-inspired platform with JWT-based authentication and personalized content feeds. Implemented real-time likes, comments, and notifications with Socket.IO, backed by scalable MongoDB.",
    stack: ["Node.js", "React.js", "MongoDB", "Express.js", "Socket.IO"],
    liveUrl: "https://example.com/instakilo",
    githubUrl: "https://github.com/Zain-The-Coder/instakilo",
    image: "/projects/instakilo.jpg",
    category: "Full-Stack Social Media Platform",
  },
  {
    id: "med-connect",
    title: "Med Connect",
    description: "Built a role-based hospital system for patient registration, EHR, scheduling, and billing. Enforced Role-Based Access Control (RBAC) with NextAuth and a type-safe Prisma/PostgreSQL schema.",
    stack: ["Next.js", "TypeScript", "NextAuth", "Prisma", "Supabase"],
    liveUrl: "https://example.com/med-connect",
    githubUrl: "https://github.com/Zain-The-Coder/med-connect",
    image: "/projects/med-connect.jpg",
    category: "Hospital Management System",
  },
  {
    id: "nn-tech",
    title: "NN TECH",
    description: "Built an SSR e-commerce platform with a MongoDB-backed catalog and cart, optimized for performance and SEO.",
    stack: ["Next.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://example.com/nn-tech",
    githubUrl: "https://github.com/Zain-The-Coder/nn-tech",
    image: "/projects/nn-tech.jpg",
    category: "E-Commerce Platform",
  },
  {
    id: "taskflow-ai",
    title: "TaskFlow AI",
    description: "AI-powered task management dashboard integrating OpenAI APIs for automatic task prioritization and intelligent suggestions.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
    liveUrl: "https://example.com/taskflow-ai",
    githubUrl: "https://github.com/Zain-The-Coder/taskflow-ai",
    image: "/projects/taskflow-ai.jpg",
    category: "AI Productivity Tool",
  }
];
