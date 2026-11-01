export interface Experience {
  company: string;
  role: string;
  type: string;
  period: string;
  isCurrent?: boolean;
  responsibilities: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    company: "Jupiter Technologies",
    role: "Full Stack (MERN) Developer",
    type: "Full-Time",
    period: "July 2026 – Present",
    isCurrent: true,
    responsibilities: [
      "Develop and build modern, responsive, high-quality websites and full-stack web applications with a focus on performance, scalability, and user experience.",
      "Build eCommerce applications with essential features and smooth user experiences.",
      "Develop interactive dashboards and admin panels for efficient data management and application control.",
      "Integrate frontend and backend functionality, writing clean, maintainable code with sound application architecture.",
    ],
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Dashboards",
      "eCommerce",
    ],
  },
  {
    company: "Grow Elite",
    role: "Next.js Developer",
    type: "Part-Time, Project-Based",
    period: "September 2026 – Present",
    isCurrent: true,
    responsibilities: [
      "Build and deliver Next.js web applications on a project basis, from requirements to deployment.",
      "Develop responsive, performance- and SEO-optimized user interfaces using Next.js and Tailwind CSS.",
    ],
    skills: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "TypeScript",
      "SEO",
      "Responsive UI",
    ],
  },
];
