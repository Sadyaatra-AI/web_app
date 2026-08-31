import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { groq } from "@/lib/groq";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const body = await request.json();
  const { conversation_id, message } = body;

  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  let conversation;
  if (conversation_id) {
    conversation = await prisma.webChatConversation.findUnique({
      where: { id: conversation_id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
    if (!conversation) {
      return NextResponse.json({ error: "conversation not found" }, { status: 404 });
    }
  } else {
    conversation = await prisma.webChatConversation.create({
      data: { visitorId: randomUUID(), status: "active" },
      include: { messages: true },
    });
  }

  await prisma.webChatMessage.create({
    data: { conversationId: conversation.id, role: "user", message },
  });

  const history = conversation.messages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.message,
  }));

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content:
          "You are Sadyaatra's travel assistant. Help visitors explore Indian destinations, answer questions about attractions, budgets, safety and transport. Keep answers concise and friendly.",
      },
      ...history,
      { role: "user", content: message },
    ],
  });

  const reply = completion.choices[0].message.content || "";

  await prisma.webChatMessage.create({
    data: { conversationId: conversation.id, role: "assistant", message: reply },
  });

  return NextResponse.json({
    conversation_id: conversation.id,
    message: reply,
    suggestions: [],
  });
}