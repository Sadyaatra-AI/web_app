import { NextResponse } from 'next/server';
import { savePlanPreview } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const {
      mood,
      budget,
      duration,
      destination,
      previewData,
    } = await request.json();

    const result = await savePlanPreview({
      destination: destination || 'Gokarna',
      travelStyle: mood,
      budget: budget ? parseInt(budget) : 20000,
      previewData: {
        mood,
        budget,
        duration,
        previewData,
      },
    });

    return NextResponse.json({
      success: true,
      preview: result,
    });
  } catch (error) {
    console.error('Error saving quiz match:', error);

    return NextResponse.json(
      { error: 'Failed to process quiz match' },
      { status: 500 }
    );
  }
}
