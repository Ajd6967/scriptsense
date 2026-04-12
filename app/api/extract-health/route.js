export async function POST(request) {
  const { messages, currentProfile } = await request.json();

  const conversationText = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
    .join("\n");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://scriptsense.vercel.app",
      "X-Title": "ScriptSense",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are a health data extractor. Given a conversation, extract any health profile information the user has mentioned. Return ONLY a JSON object with these exact keys (omit a key entirely if no information was found):
- birthday (ISO date string YYYY-MM-DD, only if a specific date of birth was mentioned)
- weight (string, e.g. "160 lbs")
- primary_conditions (string, comma-separated list of conditions)
- known_allergies (string, comma-separated list of allergies)
- kidney_function (string, e.g. "Normal", "Reduced")
- liver_function (string, e.g. "Normal", "Reduced")

Only extract information the user explicitly stated about themselves. Do not infer or guess. Return {} if nothing relevant was found.`,
        },
        {
          role: "user",
          content: `Current profile: ${JSON.stringify(currentProfile)}\n\nConversation:\n${conversationText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return Response.json({ extracted: {} });
  }

  const json = await response.json();
  const text = json.choices?.[0]?.message?.content ?? "{}";

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const extracted = JSON.parse(cleaned);
    return Response.json({ extracted });
  } catch {
    return Response.json({ extracted: {} });
  }
}
