import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IReviewToken extends Document {
  token: string;
  clientName: string;
  projectId: string;
  projectName: string;
  used: boolean;
  usedAt?: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewTokenSchema: Schema = new Schema({
  token: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  projectId: { type: String, required: true },
  projectName: { type: String, required: true },
  used: { type: Boolean, default: false },
  usedAt: { type: Date },
  expiresAt: { type: Date, required: true },
}, {
  timestamps: true,
});

const ReviewToken: Model<IReviewToken> = mongoose.models.ReviewToken || mongoose.model<IReviewToken>('ReviewToken', ReviewTokenSchema);

export default ReviewToken;
