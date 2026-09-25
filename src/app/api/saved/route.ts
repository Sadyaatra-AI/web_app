import { NextResponse } from 'next/server';
import { getSavedDestinations } from '@/lib/db';

export async function GET() {
  return NextResponse.json({
    saved: getSavedDestinations(),
  });
}
