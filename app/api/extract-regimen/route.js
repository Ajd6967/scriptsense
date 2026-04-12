export async function POST(request) {
  const { messages } = await request.json();

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
          content: `You are a medication schedule extractor. Given a conversation, extract or generate a daily medication schedule based on the medications discussed. Return ONLY a JSON object with exactly these keys: "morning", "afternoon", "evening", "bedtime". Each key maps to an array of objects with:
- medication (string): medication name and dosage
- notes (string, optional): e.g. "take with food", "avoid grapefruit"

Only include medications that were discussed. If a time was not recommended for any medications, use an empty array. Return {} if no medications were discussed.`,
        },
        {
          role: "user",
          content: `Conversation:\n${conversationText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return Response.json({ regimen: null });
  }

  const json = await response.json();
  const text = json.choices?.[0]?.message?.content ?? "{}";

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const regimen = JSON.parse(cleaned);
    return Response.json({ regimen });
  } catch {
    return Response.json({ regimen: null });
  }
}
