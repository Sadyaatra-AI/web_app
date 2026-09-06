import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/explore/trending:
 *   get:
 *     summary: Get trending destinations
 *     description: Returns a list of currently trending travel destinations.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destinations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       destination_id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       trend_score:
 *                         type: number
 */
export async function GET() {
  const trending = await prisma.trendingDestination.findMany({
    orderBy: { rank: "asc" },
    include: { destination: true },
  });

  const destinations = trending.map((t: any) => ({
    destination_id: t.destinationId,
    name: t.destination.name,
    trend_score: t.trendScore,
  }));

  return NextResponse.json({ destinations });
}