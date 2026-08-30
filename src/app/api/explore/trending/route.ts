import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const trending = await prisma.trendingDestination.findMany({
    orderBy: { rank: "asc" },
    include: { destination: true },
  });

  const destinations = trending.map((t) => ({
    destination_id: t.destinationId,
    name: t.destination.name,
    trend_score: t.trendScore,
  }));

  return NextResponse.json({ destinations });
}