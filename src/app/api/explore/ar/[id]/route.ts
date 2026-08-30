import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const assets = await prisma.arAsset.findMany({
    where: { attraction: { destinationId: id } },
  });

  const experiences = assets.map((a) => ({
    attraction_id: a.attractionId,
    name: "AR Experience",
    experience_type: a.assetType,
  }));

  return NextResponse.json({
    destination_id: id,
    available: experiences.length > 0,
    preview_experiences: experiences,
  });
}