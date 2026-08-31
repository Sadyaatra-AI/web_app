import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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