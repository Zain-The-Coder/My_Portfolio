"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaStar, FaCheckCircle, FaSpinner, FaUpload } from "react-icons/fa";

const feedbackSchema = z.object({
  designation: z.string().min(2, "Company or Role is required"),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Feedback must be at least 10 characters"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

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

function FeedbackContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const [tokenError, setTokenError] = useState("");
  const [tokenData, setTokenData] = useState<{ clientName: string; projectId: string; projectName: string } | null>(null);

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { register, handleSubmit, control, formState: { errors } } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { rating: 0 }
  });

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTokenError("No feedback token provided in URL.");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoadingToken(false);
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch(`/api/tokens/validate?token=${token}`);
        const data = await res.json();
        
        if (res.ok && data.valid) {
          setTokenData(data);
        } else {
          setTokenError(data.error || "This link is invalid, expired, or has already been used.");
        }
      } catch (err) {
        setTokenError("Something went wrong validating your link. Please try again later.");
      } finally {
        setIsLoadingToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadError("");
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setImageUploadError("Invalid file type. Only JPG, PNG, and WebP are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageUploadError("File is too large. Max size is 5MB.");
      return;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image");

      setUploadedImageUrl(data.url);
    } catch (err) {
      if (err instanceof Error) {
        setImageUploadError(err.message);
      } else {
        setImageUploadError("Upload failed.");
      }
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (data: FeedbackFormValues) => {
    if (!tokenData || !token) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          name: tokenData.clientName,
          projectId: tokenData.projectId,
          designation: data.designation,
          rating: data.rating,
          comment: data.comment,
          clientPhoto: uploadedImageUrl || undefined
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to submit review');
      
      setIsSuccess(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingToken) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 relative bg-background flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 relative bg-background flex flex-col items-center">
        <div className="max-w-md w-full glass p-10 rounded-2xl text-center border border-red-500/30">
          <FaCheckCircle className="text-red-500 mb-6 mx-auto" size={48} />
          <h2 className="text-2xl font-bold mb-4 text-white">Invalid Link</h2>
          <p className="text-foreground/70">{tokenError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Client Feedback</h1>
          <p className="text-foreground/70">
            Welcome back, <span className="text-primary-400 font-semibold">{tokenData?.clientName}</span>! I&apos;d love to hear your thoughts on <span className="text-primary-400 font-semibold">{tokenData?.projectName}</span>.
          </p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-2xl flex flex-col items-center justify-center text-center border border-green-500/30"
          >
            <FaCheckCircle className="text-green-500 mb-6" size={64} />
            <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
            <p className="text-foreground/70">Your feedback has been submitted successfully.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl space-y-8">
            {/* Photo & Designation Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground/80">Profile Photo (Optional)</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-border/50 bg-surface/50 flex-shrink-0 relative group cursor-pointer">
                    {uploadedImageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={uploadedImageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {isUploadingImage ? <FaSpinner className="animate-spin text-primary-500" /> : <FaUpload className="text-foreground/50" />}
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/jpeg, image/png, image/webp" 
                      onChange={handleImageUpload}
                      disabled={isUploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    />
                  </div>
                  <div className="text-xs text-foreground/50">
                    <p>Add a photo to build trust.</p>
                    <p className="mt-1">JPG/PNG/WebP, up to 5MB.</p>
                  </div>
                </div>
                {imageUploadError && <p className="text-red-400 text-xs mt-2">{imageUploadError}</p>}
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Company / Role</label>
                <input
                  {...register("designation")}
                  className="w-full bg-surface-elevated/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  placeholder="e.g. CEO @ Acme Corp"
                />
                {errors.designation && <p className="text-red-400 text-xs mt-1">{errors.designation.message}</p>}
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-center py-4 border-t border-border/50">
              <label className="block text-sm font-medium mb-4 text-foreground/80">Rate the Project</label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarRating value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.rating && <p className="text-red-400 text-xs mt-2">{errors.rating.message}</p>}
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">Your Feedback</label>
              <textarea
                {...register("comment")}
                rows={5}
                className="w-full bg-surface-elevated/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                placeholder="How was your experience working with me?"
              ></textarea>
              {errors.comment && <p className="text-red-400 text-xs mt-1">{errors.comment.message}</p>}
            </div>

            {submitError && <p className="text-red-400 text-sm text-center">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-primary-500/25 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 pb-24 px-6 relative bg-background flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    }>
      <FeedbackContent />
    </Suspense>
  );
}
