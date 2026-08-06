import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Note: since this is executed via tsx, we import the raw models directly
// We load env vars manually
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Must import using file paths relative to script execution context
import Project from '../src/models/Project';
import Review from '../src/models/Review';

// Original hardcoded data
const seedProjects = [
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

const seedReviews = [
  {
    id: "rev-1",
    name: "Sarah Jenkins",
    projectId: "apex-wallet",
    rating: 5,
    comment: "Zain built an incredibly secure and scalable ledger system for our startup. The MongoDB schema design was flawless, and the real-time API integrations worked exactly as promised. Highly recommend for any complex Node.js backend work!",
    date: "2024-03-15",
  },
  {
    id: "rev-2",
    name: "Ahmed Hassan",
    projectId: "med-connect",
    rating: 5,
    comment: "The hospital management system exceeded our expectations. Zain's use of Next.js and Prisma ensured the platform was fast and type-safe. The RBAC implementation was robust and exactly what we needed to maintain patient data security.",
    date: "2024-01-22",
  },
  {
    id: "rev-3",
    name: "Emily Chen",
    projectId: "instakilo",
    rating: 4,
    comment: "Great work on the social media platform! The real-time features with Socket.IO are smooth, and the personalized feed logic is solid. Very communicative and easy to work with throughout the project lifecycle.",
    date: "2023-11-05",
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI not set in .env.local');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected!');

    console.log('Clearing existing collections...');
    await Project.deleteMany({});
    await Review.deleteMany({});
    console.log('Collections cleared.');

    console.log('Inserting seed projects...');
    await Project.insertMany(seedProjects);
    
    console.log('Inserting seed reviews...');
    await Review.insertMany(seedReviews);

    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
