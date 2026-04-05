// Extracts health profile data from a chat conversation using Claude
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  const { messages, currentProfile } = await request.json();

  const conversationText = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
    .join("\n");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: `You are a health data extractor. Given a conversation, extract any health profile information the user has mentioned. Return ONLY a JSON object with these exact keys (omit a key entirely if no information was found for it):
- birthday (ISO date string YYYY-MM-DD, only if a specific date of birth was mentioned)
- weight (string, e.g. "160 lbs" or "72 kg")
- primary_conditions (string, comma-separated list of conditions)
- known_allergies (string, comma-separated list of allergies)
- kidney_function (string, e.g. "Normal", "Reduced", "Stage 3 CKD")
- liver_function (string, e.g. "Normal", "Reduced")

Only extract information the user explicitly stated about themselves. Do not infer or guess. Return {} if nothing relevant was found.`,
    messages: [
      {
        role: "user",
        content: `Current profile: ${JSON.stringify(currentProfile)}\n\nConversation:\n${conversationText}`,
      },
    ],
  });

  const text = response.content.find((b) => b.type === "text")?.text ?? "{}";

  try {
    const extracted = JSON.parse(text);
    return Response.json({ extracted });
  } catch {
    return Response.json({ extracted: {} });
  }
}
