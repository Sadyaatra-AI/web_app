import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destinationId = searchParams.get("destination_id");

  if (!destinationId) {
    return NextResponse.json(
      { error: "destination_id is required" },
      { status: 400 }
    );
  }

  const experiences = await prisma.localExperience.findMany({
    where: {
      destinationId,
      isHiddenGem: true,
    },
  });

  const data = experiences.map((e) => ({
    experience_id: e.id,
    name: e.name,
    description: e.description,
    estimated_cost: e.estimatedCost,
  }));

  return NextResponse.json({ experiences: data });
}