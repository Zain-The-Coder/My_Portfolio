export interface Review {
  id: string;
  name: string;
  projectId: string;
  rating: number;
  comment: string;
  date: string;
}

export const initialReviews: Review[] = [
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
