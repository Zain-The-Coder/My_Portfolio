import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';
import ReviewToken from '@/models/ReviewToken';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all approved reviews, sorted by creation date descending (newest first)
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, name, projectId, rating, comment, clientPhoto, designation } = body;

    if (!token || !name || !projectId || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    // Re-validate token server-side to prevent race conditions
    const reviewToken = await ReviewToken.findOne({ token });
    if (!reviewToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
    }
    if (reviewToken.used) {
      return NextResponse.json({ error: 'Token has already been used' }, { status: 400 });
    }
    if (new Date() > new Date(reviewToken.expiresAt)) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    const newReview = new Review({
      id: `rev-${Date.now()}`, // fallback id for backward compatibility
      name,
      projectId,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      clientPhoto,
      designation,
      status: 'approved', // Auto-approve tokenized reviews
    });

    await newReview.save();

    // Mark token as used
    reviewToken.used = true;
    reviewToken.usedAt = new Date();
    await reviewToken.save();

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Failed to add review:', error);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}
