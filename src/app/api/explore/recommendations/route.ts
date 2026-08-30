import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const interests = searchParams.get("interests")?.split(",") || [];
  const budget = searchParams.get("budget");

  const destinations = await prisma.destination.findMany({
    where: {
      status: "active",
      ...(budget ? { averageBudget: { lte: parseFloat(budget) } } : {}),
      ...(interests.length > 0
        ? { interests: { some: { interest: { in: interests } } } }
        : {}),
    },
    orderBy: { popularityScore: "desc" },
    take: 10,
  });

  const recommendations = destinations.map((d) => ({
    destination_id: d.id,
    name: d.name,
    match_score: d.popularityScore,
    reason: "Matches your interests and budget",
  }));

  return NextResponse.json({ recommendations });
}