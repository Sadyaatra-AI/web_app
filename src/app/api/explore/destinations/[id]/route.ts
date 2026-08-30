import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const destination = await prisma.destination.findUnique({
    where: { id },
    include: {
      attractions: true,
      localExperiences: true,
      media: true,
    },
  });

  if (!destination) {
    return NextResponse.json({ error: "Destination not found" }, { status: 404 });
  }

  return NextResponse.json({
    destination_id: destination.id,
    name: destination.name,
    description: destination.description,
    location: destination.country,
    attractions: destination.attractions,
    local_experiences: destination.localExperiences,
    preview_images: destination.media,
  });
}