import { NextResponse } from 'next/server';
import { toggleSavedDestination } from '@/lib/db';

export async function POST(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }

  const updated = toggleSavedDestination(id);

  return NextResponse.json({
    saved: updated,
  });
}
