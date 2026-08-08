"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import { FaCheckCircle, FaLinkedin, FaExclamationCircle } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
      reset();
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setSubmitError("Something went wrong, please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In <span className="text-gradient">Touch</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            Have a project in mind or looking for a full-stack developer? I&apos;m currently available for full-time roles and freelance projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6 mb-8">
                <a href="mailto:zain015976@gmail.com" className="flex items-center gap-4 text-foreground/80 hover:text-primary-500 transition-colors group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-secondary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
                    <MdEmail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50">Email</p>
                    <p className="font-medium">zain015976@gmail.com</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 text-foreground/80 group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-secondary-500 transition-all">
                    <MdPhone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50">Phone</p>
                    <p className="font-medium">0318-2622266</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-foreground/80 group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-secondary-500 transition-all">
                    <MdLocationOn size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50">Location</p>
                    <p className="font-medium">Karachi, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <a href="https://github.com/Zain-The-Coder" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-foreground hover:bg-primary-500 hover:text-white transition-colors border border-border/50">
                  <SiGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/hafiz-zain-022680354/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-foreground hover:bg-primary-500 hover:text-white transition-colors border border-border/50">
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>

            <a href="https://drive.google.com/file/d/1-G5i4vcP5T_Bw0_7DUHdCbYV5UzO5f1U/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-primary-500 text-primary-500 font-bold hover:bg-primary-500 hover:text-white transition-colors w-fit">
              View Resume
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3 glass p-8 rounded-2xl border border-white/5"
          >
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <FaCheckCircle className="text-green-500 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-foreground/70">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/80">Name</label>
                  <input
                    {...register("name")}
                    className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/80">Email</label>
                  <input
                    {...register("email")}
                    className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/80">Message</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {submitError && (
                  <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-400/10 rounded-lg">
                    <FaExclamationCircle />
                    <p>{submitError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold text-lg transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
