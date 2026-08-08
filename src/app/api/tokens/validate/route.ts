import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ReviewToken from '@/models/ReviewToken';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    await connectToDatabase();

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

    return NextResponse.json({
      valid: true,
      clientName: reviewToken.clientName,
      projectId: reviewToken.projectId,
      projectName: reviewToken.projectName,
    });
  } catch (error) {
    console.error('Failed to validate token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
