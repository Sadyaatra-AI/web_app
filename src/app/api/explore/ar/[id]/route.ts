import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/explore/ar/{destination_id}:
 *   get:
 *     summary: Get AR experiences
 *     description: Returns available AR experiences for a destination.
 *     parameters:
 *       - in: path
 *         name: destination_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the destination
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination_id:
 *                   type: string
 *                 available:
 *                   type: boolean
 *                 preview_experiences:
 *                   type: array
 *                   items:
 *                     type: object
 */
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