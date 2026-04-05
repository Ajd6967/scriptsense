import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  const { messages, currentMedications } = await request.json();

  const conversationText = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
    .join("\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: `You are a medication data extractor. Given a conversation, extract any medications the user has mentioned they are taking. Return ONLY a JSON array of medication objects. Each object must have:
- name (string, required): medication name
- dosage (string, optional): e.g. "500mg", "10mg"
- frequency (string, optional): e.g. "Once daily", "Twice daily", "Every morning"
- notes (string, optional): any other relevant notes like "with food" or "at bedtime"

Only include medications the user explicitly said they take. Do not include medications mentioned in any other context (e.g. allergies, past medications they stopped). Do not suggest medications. Return [] if none found.

Only return medications that are NEW or CHANGED compared to the current list. Do not return medications that already exist with the same name, dosage, and frequency.`,
    messages: [
      {
        role: "user",
        content: `Current medications: ${JSON.stringify(currentMedications)}\n\nConversation:\n${conversationText}`,
      },
    ],
  });

  const text = response.content.find((b) => b.type === "text")?.text ?? "[]";

  try {
    const extracted = JSON.parse(text);
    return Response.json({ extracted: Array.isArray(extracted) ? extracted : [] });
  } catch {
    return Response.json({ extracted: [] });
  }
}
