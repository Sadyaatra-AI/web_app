import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/chat/conversations/{conversation_id}:
 *   get:
 *     summary: Get conversation history
 *     description: Returns messages for a specific conversation.
 *     parameters:
 *       - in: path
 *         name: conversation_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversation_id:
 *                   type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Conversation not found
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const conversation = await prisma.webChatConversation.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!conversation) {
    return NextResponse.json({ error: "conversation not found" }, { status: 404 });
  }

  const messages = conversation.messages.map((m) => ({
    role: m.role,
    message: m.message,
  }));

  return NextResponse.json({
    conversation_id: conversation.id,
    messages,
  });
}