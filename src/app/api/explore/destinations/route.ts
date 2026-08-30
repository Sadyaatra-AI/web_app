import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  const [destinations, total] = await Promise.all([
    prisma.destination.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { popularityScore: "desc" },
    }),
    prisma.destination.count(),
  ]);

  const data = destinations.map((d) => ({
    destination_id: d.id,
    name: d.name,
    location: d.country,
    description: d.description,
  }));

  return NextResponse.json({ data, page, total });
}