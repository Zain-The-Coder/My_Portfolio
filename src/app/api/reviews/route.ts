import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all reviews, sorted by creation date descending (newest first)
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, projectId, rating, comment } = body;

    if (!name || !projectId || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    const newReview = new Review({
      id: `rev-${Date.now()}`, // fallback id for backward compatibility
      name,
      projectId,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    });

    await newReview.save();

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Failed to add review:', error);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}
