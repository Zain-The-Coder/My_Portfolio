"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { IProject } from "@/models/Project";
import { IReview } from "@/models/Review";

// --- Sub-components (Internal to this file) ---

const rateMeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  projectId: z.string().min(1, "Please select a project"),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Feedback must be at least 10 characters"),
});

type RateMeFormValues = z.infer<typeof rateMeSchema>;

function StarRating({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          className="focus:outline-none"
        >
          <FaStar
            size={32}
            className={`transition-colors ${
              star <= (hover || value) ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" : "text-gray-600 dark:text-gray-400"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
}

function ReviewsGrid({ reviews, projects }: { reviews: IReview[], projects: IProject[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {reviews.map((review, index) => {
        const project = projects.find(p => p.id === review.projectId);
        return (
          <motion.div
            key={review.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-6 rounded-xl border border-white/5 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg">{review.name}</h4>
                <p className="text-xs text-foreground/50">{review.date}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} className={i < review.rating ? "text-yellow-400" : "text-gray-600"} />
                ))}
              </div>
            </div>
            
            {project && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-secondary-500 hover:text-secondary-400 transition-colors mb-4 group w-fit"
              >
                Project: {project.title} <FiExternalLink className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            <p className="text-sm text-foreground/80 italic line-clamp-4">
              &quot;{review.comment}&quot;
            </p>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fetchError, setFetchError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<RateMeFormValues>({
    resolver: zodResolver(rateMeSchema),
    defaultValues: {
      rating: 0,
    }
  });

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
          if (fetchedProjects.length === 0) {
            console.warn("No projects found in database.");
          }
        } else {
          setFetchError("Couldn't load projects — try refreshing");
        }
        if (revRes.ok) setReviews(await revRes.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setFetchError("Couldn't load projects — try refreshing");
      } finally {
        setIsLoadingData(false);
      }
    };
    
    fetchData();
  }, []);

  const selectedProjectId = watch("projectId");
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const onSubmit = async (data: RateMeFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to submit review');
      
      const newReview = await res.json();
      
      // Add new review to the top of the list
      setReviews([newReview, ...reviews]);
      setIsSuccess(true);
      reset();
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Client <span className="text-gradient">Feedback</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Reviews Grid on Top */}
        <div className="mb-12">
          {isLoadingData ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
          ) : reviews.length > 0 ? (
            <ReviewsGrid reviews={reviews} projects={projects} />
          ) : (
            <p className="text-center text-foreground/60 mb-16">No reviews yet. Be the first to leave one!</p>
          )}
        </div>

        {/* Rate Me Form on Bottom */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Leave a Review</h3>
            <p className="text-foreground/70">
              Did I build something for you? I&apos;d love to hear your thoughts. Select a project and leave a rating!
            </p>
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-2xl flex flex-col items-center justify-center text-center border border-green-500/30"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <FaCheckCircle className="text-green-500 mb-6" size={64} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Thanks for the feedback!</h3>
              <p className="text-foreground/70">Your review has been successfully submitted and added above.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 px-6 py-2 bg-surface rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Submit another review
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit(onSubmit)} 
              className="glass p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/80">Your Name</label>
                  <input
                    {...register("name")}
                    className="w-full bg-surface-elevated/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/80">What did I build for you?</label>
                  <select
                    {...register("projectId")}
                    className="w-full bg-surface-elevated/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none"
                    disabled={isLoadingData || !!fetchError}
                  >
                    {isLoadingData ? (
                      <option value="">Loading projects...</option>
                    ) : fetchError ? (
                      <option value="">{fetchError}</option>
                    ) : (
                      <>
                        <option value="">Select a project...</option>
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                        <option value="other">Other / General</option>
                      </>
                    )}
                  </select>
                  {errors.projectId && <p className="text-red-400 text-xs mt-1">{errors.projectId.message}</p>}
                </div>
              </div>

              {selectedProject && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 bg-primary-500/5 border border-primary-500/20 rounded-lg flex items-center gap-3 overflow-hidden"
                >
                  <FiExternalLink className="text-primary-500 flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-xs text-foreground/60 mb-1">Project URL</p>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-400 hover:underline truncate">
                      {selectedProject.liveUrl}
                    </a>
                  </div>
                </motion.div>
              )}

              <div className="mb-8 flex flex-col items-center py-4">
                <label className="block text-sm font-medium mb-4 text-foreground/80">Rate the project</label>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <StarRating value={field.value} onChange={field.onChange} />
                  )}
                />
                {errors.rating && <p className="text-red-400 text-xs mt-2">{errors.rating.message}</p>}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium mb-2 text-foreground/80">Your Feedback</label>
                <textarea
                  {...register("comment")}
                  rows={4}
                  className="w-full bg-surface-elevated/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                  placeholder="How was your experience working with me?"
                ></textarea>
                {errors.comment && <p className="text-red-400 text-xs mt-1">{errors.comment.message}</p>}
              </div>
              
              {submitError && (
                <p className="text-red-400 text-sm mb-4 text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-primary-500/25 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
