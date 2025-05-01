import { NextRequest, NextResponse } from 'next/server';
import { generateRecommendations } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const auditData = await request.json();
    
    if (!auditData || !auditData.url) {
      return NextResponse.json(
        { error: 'Invalid audit data' },
        { status: 400 }
      );
    }

    const recommendations = await generateRecommendations(auditData);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('GPT recommendation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
