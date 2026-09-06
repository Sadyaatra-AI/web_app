import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/explore/hidden-gems:
 *   get:
 *     summary: Get hidden gems
 *     description: Returns a list of hidden gem experiences for a specific destination.
 *     parameters:
 *       - in: query
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
 *                 experiences:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: destination_id is required
 */
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