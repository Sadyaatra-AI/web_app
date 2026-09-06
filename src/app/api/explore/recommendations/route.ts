import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/explore/recommendations:
 *   get:
 *     summary: Get recommendations
 *     description: Returns a list of recommended destinations based on interests and budget.
 *     parameters:
 *       - in: query
 *         name: interests
 *         schema:
 *           type: string
 *         description: Comma-separated list of interests
 *       - in: query
 *         name: budget
 *         schema:
 *           type: number
 *         description: Maximum budget
 *       - in: query
 *         name: travel_style
 *         schema:
 *           type: string
 *         description: Travel style (e.g., explorer)
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 */
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