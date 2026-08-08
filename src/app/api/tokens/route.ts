import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import ReviewToken from '@/models/ReviewToken';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { secret, clientName, projectId, projectName } = body;

    // Server-side PIN validation
    if (!process.env.ADD_PROJECT_SECRET || secret !== process.env.ADD_PROJECT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized: Invalid PIN' }, { status: 401 });
    }

    if (!clientName || !projectId || !projectName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    // Generate unique token
    const token = crypto.randomUUID();

    // Set expiration to 14 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14);

    const newToken = new ReviewToken({
      token,
      clientName,
      projectId,
      projectName,
      expiresAt,
    });

    await newToken.save();

    return NextResponse.json({ token: newToken.token, expiresAt: newToken.expiresAt }, { status: 201 });
  } catch (error) {
    console.error('Failed to generate token:', error);
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
  }
}
