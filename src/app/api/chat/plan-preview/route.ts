import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";
import { randomUUID } from "crypto";

/**
 * @swagger
 * /api/chat/plan-preview:
 *   post:
 *     summary: Generate a trip plan preview
 *     description: Creates a short, multi-day itinerary preview using AI.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - destination
 *             properties:
 *               conversation_id:
 *                 type: string
 *               destination:
 *                 type: string
 *               duration_days:
 *                 type: integer
 *               budget:
 *                 type: number
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Destination is required
 */
export async function POST(request: Request) {
  const body = await request.json();
  const { conversation_id, destination, duration_days, budget, interests } = body;

  if (!destination) {
    return NextResponse.json({ error: "destination is required" }, { status: 400 });
  }

  let conversation;
  if (conversation_id) {
    conversation = await prisma.webChatConversation.findUnique({ where: { id: conversation_id } });
  }
  if (!conversation) {
    conversation = await prisma.webChatConversation.create({
      data: { visitorId: randomUUID(), status: "active" },
    });
  }

  const prompt = `Create a ${duration_days || 3}-day trip preview for ${destination}.
Budget: ${budget ? `INR ${budget}` : "not specified"}.
Interests: ${interests?.join(", ") || "general sightseeing"}.
Respond ONLY with valid JSON in this exact shape, no extra text:
{
  "estimated_cost": <number>,
  "days": [
    { "day": 1, "summary": "<short summary>", "activities": ["<activity>", "<activity>"] }
  ]
}`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [{ role: "user", content: prompt }],
  });

  let parsed;
  try {
    const raw = completion.choices[0].message.content || "{}";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  } catch {
    parsed = { estimated_cost: null, days: [] };
  }

  const preview = await prisma.webPlanPreview.create({
    data: {
      conversationId: conversation.id,
      destination,
      durationDays: duration_days || 3,
      budget: budget || null,
      interests: interests || [],
      previewData: parsed,
    },
  });

  return NextResponse.json({
    preview_id: preview.id,
    destination,
    estimated_cost: parsed.estimated_cost,
    days: parsed.days,
    message: "This is a preview. Full itinerary generation and booking are available in the mobile app.",
  });
}