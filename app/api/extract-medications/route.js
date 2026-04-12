export async function POST(request) {
  const { messages, currentMedications } = await request.json();

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
          content: `You are a medication data extractor. Given a conversation, extract any medications the user has mentioned they are taking. Return ONLY a JSON array of medication objects. Each object must have:
- name (string, required): medication name
- dosage (string, optional): e.g. "500mg", "10mg"
- frequency (string, optional): e.g. "Once daily", "Twice daily", "Every morning"
- notes (string, optional): any other relevant notes like "with food" or "at bedtime"

Only include medications the user explicitly said they take. Do not include medications mentioned in any other context. Do not suggest medications. Return [] if none found. Only return medications that are NEW or CHANGED compared to the current list.`,
        },
        {
          role: "user",
          content: `Current medications: ${JSON.stringify(currentMedications)}\n\nConversation:\n${conversationText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return Response.json({ extracted: [] });
  }

  const json = await response.json();
  const text = json.choices?.[0]?.message?.content ?? "[]";

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const extracted = JSON.parse(cleaned);
    return Response.json({ extracted: Array.isArray(extracted) ? extracted : [] });
  } catch {
    return Response.json({ extracted: [] });
  }
}
