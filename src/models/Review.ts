import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IReview extends Document {
  id: string; // Maintain ID format for backwards compatibility
  name: string;
  projectId: string;
  rating: number;
  comment: string;
  date: string;
  clientPhoto?: string;
  designation?: string;
  status: 'approved' | 'hidden' | 'pending';
}

const ReviewSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  projectId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: String, required: true },
  clientPhoto: { type: String },
  designation: { type: String },
  status: { type: String, enum: ['approved', 'hidden', 'pending'], default: 'approved' },
}, {
  timestamps: true,
});

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
