import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
  id: string; // Keep string ID for backward compatibility with existing components
  title: string;
  description: string;
  stack: string[];
  liveUrl: string;
  githubUrl?: string;
  frontendRepoUrl?: string;
  backendRepoUrl?: string;
  image: string;
  category: string;
}

const ProjectSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  stack: { type: [String], required: true },
  liveUrl: { type: String, required: true },
  githubUrl: { type: String, required: false },
  frontendRepoUrl: { type: String, required: false },
  backendRepoUrl: { type: String, required: false },
  image: { type: String, required: true },
  category: { type: String, required: true },
}, {
  timestamps: true,
});

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
