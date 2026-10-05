import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
  try {
    await connectToDatabase();
    
    const projects = await Project.find().sort({ displayOrder: 1 }); 

    return NextResponse.json(projects);
    
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      secret, 
      id, 
      title, 
      description, 
      stack, 
      liveUrl, 
      githubUrl, 
      frontendRepoUrl,
      backendRepoUrl,
      image, 
      category 
    } = body;

    // 1. Server-side PIN validation against environment variable
    if (!process.env.ADD_PROJECT_SECRET || secret !== process.env.ADD_PROJECT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized: Invalid PIN' }, { status: 401 });
    }

    // 2. Validate required fields
    if (!title || !description || !stack || !liveUrl || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    // Ensure array of strings for stack if it came as a comma-separated string
    const stackArray = Array.isArray(stack) ? stack : stack.split(',').map((s: string) => s.trim());

    // Generate an ID if one wasn't explicitly provided
    const projectId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newProject = new Project({
      id: projectId,
      title,
      description,
      stack: stackArray,
      liveUrl,
      githubUrl,
      frontendRepoUrl,
      backendRepoUrl,
      image: image || '/projects/placeholder.jpg',
      category,
    });

    await newProject.save();

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to add project:', error);
    // Handle uniqueness errors gracefully
    if (error && typeof error === 'object' && 'code' in error && (error as { code: number }).code === 11000) {
       return NextResponse.json({ error: 'A project with this ID already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}
