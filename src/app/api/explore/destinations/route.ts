import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/explore/destinations:
 *   get:
 *     summary: Get destinations
 *     description: Returns a paginated list of destinations.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 page:
 *                   type: integer
 *                 total:
 *                   type: integer
 */
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