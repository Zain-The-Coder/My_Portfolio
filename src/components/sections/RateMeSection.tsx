"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaStar, FaUser } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { IProject } from "@/models/Project";
import { IReview } from "@/models/Review";

// --- Sub-components (Internal to this file) ---

function ReviewsGrid({ reviews, projects }: { reviews: IReview[], projects: IProject[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review, index) => {
        const project = projects.find(p => p.id === review.projectId);
        return (
          <motion.div
            key={review.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-6 rounded-xl border border-white/5 flex flex-col h-full hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden border border-border/50 bg-surface/50 flex-shrink-0 flex items-center justify-center">
                {review.clientPhoto ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={review.clientPhoto} alt={review.name} className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="text-foreground/30" size={20} />
                )}
              </div>
              
              {/* Client Info */}
              <div className="flex-grow">
                <h4 className="font-bold text-lg leading-tight">{review.name}</h4>
                {review.designation && (
                  <p className="text-xs text-primary-400 font-medium truncate">{review.designation}</p>
                )}
                <p className="text-[10px] text-foreground/50">{review.date}</p>
              </div>

              {/* Rating */}
              <div className="flex flex-col items-end">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={12} className={i < review.rating ? "text-yellow-400" : "text-gray-600"} />
                  ))}
                </div>
                <span className="text-xs font-bold mt-1 text-yellow-400">{review.rating}.0</span>
              </div>
            </div>
            
            {project && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-elevated/50 text-xs text-foreground/80 hover:text-primary-400 transition-colors mb-4 group w-fit border border-white/5"
              >
                <FiExternalLink className="group-hover:scale-110 transition-transform" /> {project.title}
              </a>
            )}

            <div className="relative flex-grow">
              <span className="text-4xl text-primary-500/20 absolute -top-2 -left-2 leading-none font-serif">&quot;</span>
              <p className="text-sm text-foreground/80 italic relative z-10 pl-4">
                {review.comment}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// --- Main Section Component ---

export default function RateMeSection() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, revRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/reviews')
        ]);
        
        if (projRes.ok) {
          const fetchedProjects = await projRes.json();
          setProjects(fetchedProjects);
        } else {
          setFetchError("Couldn't load projects — try refreshing");
        }
        
        if (revRes.ok) {
          setReviews(await revRes.json());
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setFetchError("Couldn't load data — try refreshing");
      } finally {
        setIsLoadingData(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <section id="rate-me" className="py-24 bg-surface-elevated/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary-500/10 rounded-full mix-blend-screen filter blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Client <span className="text-gradient">Feedback</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            What the people I&apos;ve worked with have to say about my work.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="max-w-6xl mx-auto">
          {isLoadingData ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
          ) : fetchError ? (
            <p className="text-center text-red-400 mb-16">{fetchError}</p>
          ) : reviews.length > 0 ? (
            <ReviewsGrid reviews={reviews} projects={projects} />
          ) : (
            <div className="text-center py-12 glass rounded-2xl border border-white/5">
              <p className="text-foreground/60 mb-2">No verified client feedback yet.</p>
              <p className="text-sm text-foreground/40">Only verified clients can leave reviews.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
