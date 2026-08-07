"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaCheckCircle, FaExclamationCircle, FaSpinner, FaUpload } from "react-icons/fa";

const projectSchema = z.object({
  secret: z.string().min(1, "PIN is required"),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  stack: z.string().min(2, "Tech stack is required (comma separated)"),
  liveUrl: z.string().url("Must be a valid URL"),
  githubUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  frontendRepoUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  backendRepoUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  category: z.string().min(2, "Category is required"),
  image: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function AddProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [repoType, setRepoType] = useState<"single" | "separate" | "none">("single");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      image: ""
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadError("");

    // Client-side validation
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setImageUploadError("Invalid file type. Only JPG, PNG, and WebP are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setImageUploadError("File is too large. Max size is 5MB.");
      return;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image");

      setUploadedImageUrl(data.url);
      // We don't automatically set the form value here if we want to rely on the hidden input or state,
      // but let's just keep track of it in state and inject it during onSubmit.
    } catch (err: unknown) {
      if (err instanceof Error) {
        setImageUploadError(err.message || "Something went wrong uploading.");
      } else {
        setImageUploadError("Something went wrong uploading.");
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    // 1. Frontend UX Gate (Hardcoded PIN check)
    if (data.secret !== "9509") {
      setSubmitError("Invalid PIN.");
      return;
    }

    if (repoType === "single") {
      data.frontendRepoUrl = undefined;
      data.backendRepoUrl = undefined;
    } else if (repoType === "separate") {
      data.githubUrl = undefined;
    } else {
      data.githubUrl = undefined;
      data.frontendRepoUrl = undefined;
      data.backendRepoUrl = undefined;
    }

    if (uploadedImageUrl) {
      data.image = uploadedImageUrl;
    }

    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to add project");
      }

      setIsSuccess(true);
      reset();
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmitError(error.message || "Something went wrong.");
      } else {
        setSubmitError("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative bg-background">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Add New Project</h1>
          <p className="text-foreground/70 text-sm">
            Hidden admin route to add new projects to the portfolio database.
          </p>
        </div>

        {isSuccess ? (
          <div className="glass p-12 rounded-2xl flex flex-col items-center justify-center text-center border border-green-500/30">
            <FaCheckCircle className="text-green-500 mb-6" size={64} />
            <h3 className="text-2xl font-bold mb-2">Project Added!</h3>
            <p className="text-foreground/70">Your project has been successfully saved to MongoDB.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="mt-8 px-6 py-2 bg-surface rounded-lg hover:bg-white/10 transition-colors text-sm border border-border/50"
            >
              Add another project
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 md:p-10 rounded-2xl border border-white/5 space-y-6 shadow-2xl">
            
            {/* Security PIN Field */}
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-8">
              <label className="block text-sm font-bold mb-2 text-red-400 uppercase tracking-wider">Admin PIN Required</label>
              <input
                type="password"
                {...register("secret")}
                className="w-full bg-surface-elevated/80 border border-red-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-center tracking-[0.5em] font-mono text-xl"
                placeholder="****"
                maxLength={4}
              />
              {errors.secret && <p className="text-red-400 text-xs mt-1">{errors.secret.message}</p>}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Project Title</label>
                <input
                  {...register("title")}
                  className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder="e.g. Next.js Portfolio"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Category</label>
                <input
                  {...register("category")}
                  className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder="e.g. Full-Stack Web App"
                />
                {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Description</label>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                  placeholder="Describe the project..."
                ></textarea>
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground/80">Tech Stack (comma separated)</label>
                <input
                  {...register("stack")}
                  className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder="e.g. Next.js, Tailwind, MongoDB"
                />
                {errors.stack && <p className="text-red-400 text-xs mt-1">{errors.stack.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground/80">Live URL</label>
                  <input
                    {...register("liveUrl")}
                    className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    placeholder="https://..."
                  />
                  {errors.liveUrl && <p className="text-red-400 text-xs mt-1">{errors.liveUrl.message}</p>}
                </div>
              </div>

              {/* Repo Links Sub-section */}
              <div className="p-4 border border-border/50 rounded-lg bg-surface/30">
                <label className="block text-sm font-medium mb-3 text-foreground/80">Repository Links</label>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="repoType" 
                      value="single" 
                      checked={repoType === "single"} 
                      onChange={() => setRepoType("single")} 
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm">Single Repo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="repoType" 
                      value="separate" 
                      checked={repoType === "separate"} 
                      onChange={() => setRepoType("separate")} 
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm">Separate Frontend/Backend</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="repoType" 
                      value="none" 
                      checked={repoType === "none"} 
                      onChange={() => setRepoType("none")} 
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm">No Repo Links</span>
                  </label>
                </div>

                {repoType === "single" && (
                  <div>
                    <label className="block text-xs font-medium mb-1 text-foreground/70">GitHub URL</label>
                    <input
                      {...register("githubUrl")}
                      className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                      placeholder="https://github.com/..."
                    />
                    {errors.githubUrl && <p className="text-red-400 text-xs mt-1">{errors.githubUrl.message}</p>}
                  </div>
                )}

                {repoType === "separate" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-foreground/70">Frontend Repo URL</label>
                      <input
                        {...register("frontendRepoUrl")}
                        className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        placeholder="https://github.com/.../frontend"
                      />
                      {errors.frontendRepoUrl && <p className="text-red-400 text-xs mt-1">{errors.frontendRepoUrl.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-foreground/70">Backend Repo URL</label>
                      <input
                        {...register("backendRepoUrl")}
                        className="w-full bg-surface/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                        placeholder="https://github.com/.../backend"
                      />
                      {errors.backendRepoUrl && <p className="text-red-400 text-xs mt-1">{errors.backendRepoUrl.message}</p>}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border border-border/50 rounded-lg bg-surface/30">
                <label className="block text-sm font-medium mb-3 text-foreground/80">Project Image</label>
                <div className="flex flex-col gap-4">
                  {uploadedImageUrl ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={uploadedImageUrl} alt="Uploaded project" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setUploadedImageUrl("")}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/jpeg, image/png, image/webp" 
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className={`w-full border-2 border-dashed ${imageUploadError ? 'border-red-400/50 bg-red-400/5' : 'border-border/50 bg-surface/30 hover:bg-surface/50'} rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors`}>
                        {isUploadingImage ? (
                          <FaSpinner className="animate-spin text-primary-500 mb-2" size={24} />
                        ) : (
                          <FaUpload className="text-foreground/50 mb-2" size={24} />
                        )}
                        <p className="text-sm font-medium text-foreground/80">
                          {isUploadingImage ? "Uploading to ImageKit..." : "Click or drag image to upload"}
                        </p>
                        <p className="text-xs text-foreground/50 mt-1">JPG, PNG, WebP up to 5MB</p>
                      </div>
                    </div>
                  )}
                  {imageUploadError && <p className="text-red-400 text-xs">{imageUploadError}</p>}
                </div>
              </div>
            </div>

            {submitError && (
              <div className="flex items-center justify-center gap-2 text-red-400 text-sm p-3 bg-red-400/10 rounded-lg">
                <FaExclamationCircle />
                <p>{submitError}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-lg font-bold transition-all shadow-lg shadow-primary-500/25 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? "Saving..." : "Add Project"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
