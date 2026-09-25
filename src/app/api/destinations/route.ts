import { NextRequest, NextResponse } from 'next/server';
import { getDestinations } from '@/lib/db';
import { Region, FilterState } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate region query parameter
    const regionParam = searchParams.get('region');

    const validRegions: Region[] = [
      'All',
      'North',
      'South',
      'West',
      'East',
      'Central',
      'International',
    ];

    const region = validRegions.includes(regionParam as Region)
      ? (regionParam as Region)
      : undefined;

    // Validate sortBy query parameter
    const sortByParam = searchParams.get('sortBy');

    const validSortOptions: FilterState['sortBy'][] = [
      'recommended',
      'budget-asc',
      'budget-desc',
      'duration',
    ];

    const sortBy = validSortOptions.includes(
      sortByParam as FilterState['sortBy']
    )
      ? (sortByParam as FilterState['sortBy'])
      : undefined;

    const filters = {
      search: searchParams.get('search') || undefined,
      region,
      maxBudget: searchParams.get('maxBudget')
        ? Number(searchParams.get('maxBudget'))
        : undefined,
      mood: searchParams.get('mood') || undefined,
      type: searchParams.get('type') || undefined,
      duration: searchParams.get('duration') || undefined,
      sortBy,
    };

    const destinations = await getDestinations(filters);

    return NextResponse.json({
      destinations,
      count: destinations.length,
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);

    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}